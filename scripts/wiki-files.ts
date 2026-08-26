/**
 * Finds a picture for the cards the summary endpoint cannot illustrate.
 *
 * `npm run audit:wiki` leaves a residue of nodes whose article is correct but
 * whose panel stays blank. The cause is not that the article has no picture:
 * English Wikipedia's pageimages runs lead-section-only, so when the infobox
 * holds a non-free logo or screenshot, the free diagram, logo or photograph
 * further down the page is never offered. The REST summary sees nothing and the
 * card shows text.
 *
 * So ask the article for its file list instead, keep the Commons-hosted ones,
 * and name the file. File *names* are stable and are what gets stored; the URL
 * is resolved live through imageinfo, never assembled by hand, because Wikimedia
 * thumbnail paths are content hashed.
 *
 *   npm run wiki:files -- --scan   shortlist candidates per gap, for picking
 *   npm run wiki:files             verify the picks in FILES, print the merge
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { computerHistory, flatten } from '../src/data'
import { WIKI_TITLES } from '../src/data/wiki'

const API = 'https://en.wikipedia.org/w/api.php'
const COMMONS = 'https://commons.wikimedia.org/w/api.php'
const AGENT =
  'the-binary-tree/0.1 (dataset image audit; https://github.com/svarts/the-binary-tree)'
const BATCH = 50
const PAUSE_MS = 250

/**
 * Hand-picked, one Commons file per node. Every one has to be *about* the node:
 * its logo, its screen, its hardware, its diagram. A file that merely appears in
 * the article does not qualify, which is why this is a list and not a heuristic.
 */
export const FILES: Record<string, string> = {
  // Operating systems and platforms.
  bsd: 'File:4.3 BSD UWisc VAX Emulation Login.png',
  android: 'File:Android robot 2014.svg',
  'app-store': 'File:App Store Logo (iOS 27).webp',

  // Languages: the language's own diagram, not a portrait of its author.
  haskell: 'File:Base-classes.svg',
  kotlin: 'File:Kodee-mascot-regular.svg',
  'objective-c': 'File:Objective-C metaclass.png',

  // Processors.
  mips: 'File:MIPS Architecture (Pipelined).svg',
  'arm-cortex-a': 'File:ARM-Cortex-A8.gif',

  // Infrastructure and data stores.
  kubernetes: 'File:Kubernetes logo without workmark.svg',
  elasticsearch: 'File:Elasticsearch logo.svg',
  hbase: 'File:Apache HBase Logo.svg',
  vulkan: 'File:Vulkan logo.svg',

  // Concepts, where a diagram is the honest illustration.
  'complexity-theory': 'File:Complexity subsets pspace.svg',
  'codd-model': 'File:Relational database terms.svg',
  firewall: 'File:Firewall.png',
  'grover-algorithm': "File:Grover's algorithm circuit.svg",
  'post-quantum': 'File:Cloudflare Post-Quantum Key Agreement on Firefox 135.0 screenshot.webp',
  alphago: 'File:AlphaGo computer rack.jpg',
  'dartmouth-workshop':
    'File:A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence, by John McCarthy et al, 1955.pdf',
}

/**
 * The gaps left deliberately blank, and why. Recorded so the next pass does not
 * spend another afternoon rediscovering them.
 *
 * Two searches were run for each: the article's own file list, then Commons by
 * name. Nothing either turned up was a picture of the node.
 *
 *   swift, yacc, rpg, sandbox, cvs,   short names that collide with something
 *   rcs, sccs, cpl, ml, bcpl,         far more photographed. Commons offers
 *   column-store, church-turing       Taylor Swift, a rocket-propelled grenade,
 *                                     a children's sandpit, a pharmacy chain, a
 *                                     Polish cardiac hospital and the Canadian
 *                                     Premier League. None of them belong here
 *   autocode, bigtable, memcached,    the article holds only pictures of
 *   mesm, ubiquitous-computing,       something adjacent, or graphs from an
 *   zero-trust                        unrelated deployment
 *   modula-2, delphi                  only Wirth's portrait, which is already
 *                                     the picture on the Pascal card
 *   bsd-4-2                           the free BSD screenshots are all 4.3, and
 *                                     labelling one 4.2 would be a lie
 *   ebcdic                            the punched card belongs to the
 *                                     punched-cards node, and UTF-EBCDIC is a
 *                                     different encoding
 *
 * Nodes the summary endpoint illustrates on its own are absent from both lists:
 * the Windows family, the arcade games, Netscape and the rest were candidates
 * only while the audit measured free images instead of what the app displays.
 */

/** Wikipedia furniture: navigation icons, badges, banners. Never content. */
const CHROME =
  /(commons-logo|wiki(pedia|data|books|source|quote|versity|voyage)|wiktionary|oojs|symbol[_ ]|question[_ ]book|edit-clear|semi-protection|protection-shackle|padlock|cscr-featured|ambox|crystal|gnome-mime|octicons|text[_ ]document|folder[_ ]|people[_ ]icon|blue[_ ]pencil|magnify-clip|portal|nuvola|emblem-|flag[_ ]of|red[_ ]pencil|office-book|open[_ ]book|globe|disambig)/i

interface FileInfo {
  title: string
  repository?: string
  width?: number
  height?: number
  url?: string
  thumb?: string
}

const nodes = flatten(computerHistory)
const byId = new Map(nodes.map((n) => [n.id, n]))
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function query(params: Record<string, string>, attempt = 0, host = API): Promise<any> {
  const search = new URLSearchParams({ action: 'query', format: 'json', formatversion: '2', ...params })
  const response = await fetch(`${host}?${search}`, { headers: { 'User-Agent': AGENT } })
  if (response.status === 429 && attempt < 5) {
    const wait = 1500 * 2 ** attempt
    process.stderr.write(`  rate limited, waiting ${wait}ms\n`)
    await sleep(wait)
    return query(params, attempt + 1, host)
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}

/**
 * The cards the runtime endpoint leaves blank, from the last audit.
 *
 * "Blank" has to mean blank *in the app*, which is why the audit passes
 * pilicense=any: the REST summary serves a non-free lead image where one exists,
 * so a card can be illustrated even though no free picture is available. Filling
 * those would be dead weight.
 */
function blankNodes(): { id: string; name: string; title?: string }[] {
  try {
    const audit = JSON.parse(
      readFileSync(resolve(import.meta.dirname, '../.wiki-audit.json'), 'utf8'),
    )
    return audit.rows.filter((r: { verdict: string }) => r.verdict === 'noimage')
  } catch {
    console.error('No .wiki-audit.json. Run `npm run audit:wiki` first.')
    process.exit(1)
  }
}

/** Resolve file names to a Commons thumbnail, in batches. */
async function fileInfo(names: string[]): Promise<Map<string, FileInfo>> {
  const found = new Map<string, FileInfo>()
  for (let i = 0; i < names.length; i += BATCH) {
    const slice = names.slice(i, i + BATCH)
    const data = await query({
      titles: slice.join('|'),
      prop: 'imageinfo',
      iiprop: 'url|size',
      iiurlwidth: '640',
    })
    for (const page of data.query?.pages ?? []) {
      const info = page.imageinfo?.[0]
      found.set(page.title, {
        title: page.title,
        repository: page.imagerepository,
        width: info?.width,
        height: info?.height,
        url: info?.descriptionurl,
        thumb: info?.thumburl,
      })
    }
    await sleep(PAUSE_MS)
  }
  return found
}

// --- search: ask Commons directly for the nodes the scan could not fill ------

async function searchCommons(): Promise<void> {
  const gaps = blankNodes().filter((g) => !FILES[g.id])
  console.log(`\n=== Commons search for ${gaps.length} unfilled cards ===\n`)

  for (const gap of gaps) {
    const node = byId.get(gap.id)
    const terms = [`${gap.name} logo`, gap.name, gap.title ?? '']
    const hits = new Set<string>()
    for (const term of terms.filter(Boolean)) {
      const data = await query(
        { list: 'search', srsearch: term, srnamespace: '6', srlimit: '5' },
        0,
        COMMONS,
      )
      for (const hit of data.query?.search ?? []) hits.add(hit.title)
      await sleep(PAUSE_MS)
      if (hits.size >= 8) break
    }
    // Searched on Commons, but resolved through en.wikipedia: there a Commons
    // file reports imagerepository "shared", which is the check that keeps a
    // local fair-use upload out.
    const info = await fileInfo([...hits])
    const usable = [...info.values()]
      .filter((f) => f.repository === 'shared' && f.thumb)
      .filter((f) => (f.width ?? 0) >= 120 && (f.height ?? 0) >= 90 && !CHROME.test(f.title))
    console.log(`${gap.id.padEnd(22)} ${gap.name.slice(0, 26).padEnd(27)} ${node?.origin ?? ''}`)
    for (const f of usable.slice(0, 6)) {
      console.log(`    ${f.title.replace(/^File:/, '').slice(0, 62).padEnd(63)} ${f.width}x${f.height}`)
    }
    if (!usable.length) console.log('    -')
  }
}

// --- scan: what free pictures does each blank article actually hold? ---------

async function scan(): Promise<void> {
  let audit: { rows: { id: string; name: string; title?: string; verdict: string }[] }
  try {
    audit = JSON.parse(readFileSync(resolve(import.meta.dirname, '../.wiki-audit.json'), 'utf8'))
  } catch {
    console.error('No .wiki-audit.json. Run `npm run audit:wiki` first.')
    process.exit(1)
  }
  const gaps = audit.rows.filter((r) => r.verdict === 'noimage' && r.title)

  // Article -> its file list.
  const articleFiles = new Map<string, string[]>()
  const titles = [...new Set(gaps.map((g) => g.title!))]
  for (let i = 0; i < titles.length; i += BATCH) {
    const slice = titles.slice(i, i + BATCH)
    const data = await query({ titles: slice.join('|'), redirects: '1', prop: 'images', imlimit: '500' })
    const hop = new Map<string, string>()
    for (const n of data.query?.normalized ?? []) hop.set(n.from, n.to)
    for (const r of data.query?.redirects ?? []) hop.set(r.from, r.to)
    const pages = new Map((data.query?.pages ?? []).map((p: any) => [p.title, p]))
    for (const title of slice) {
      const page: any = pages.get(hop.get(title) ?? title)
      const list = (page?.images ?? [])
        .map((f: { title: string }) => f.title)
        .filter((f: string) => /\.(jpg|jpeg|png|svg|gif|webp)$/i.test(f) && !CHROME.test(f))
      articleFiles.set(title, list)
    }
    process.stderr.write(`  files ${Math.min(i + BATCH, titles.length)}/${titles.length}\n`)
    await sleep(PAUSE_MS)
  }

  const info = await fileInfo([...new Set([...articleFiles.values()].flat())])

  const words = (s: string) =>
    new Set(s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2))

  console.log(`\n=== candidate pictures for ${gaps.length} blank cards ===\n`)
  let withAny = 0
  for (const gap of gaps) {
    const node = byId.get(gap.id)
    const want = words(`${gap.name} ${node?.origin ?? ''} ${gap.title}`)
    const ranked = (articleFiles.get(gap.title!) ?? [])
      .map((f) => info.get(f))
      .filter((f): f is FileInfo => !!f && f.repository === 'shared' && !!f.thumb)
      // An icon at 48px is furniture; a picture is not.
      .filter((f) => (f.width ?? 0) >= 120 && (f.height ?? 0) >= 90)
      .map((f) => {
        const name = f.title.replace(/^File:/, '')
        const overlap = [...words(name)].filter((w) => want.has(w)).length
        const logo = /logo|wordmark|icon/i.test(name) ? 1 : 0
        return { file: f, score: overlap * 3 + logo, name }
      })
      .sort((a, b) => b.score - a.score || (b.file.width ?? 0) - (a.file.width ?? 0))
    if (ranked.length) withAny++
    const picked = FILES[gap.id]
    console.log(
      `${gap.id.padEnd(22)} ${gap.name.slice(0, 28).padEnd(29)} ${ranked.length ? '' : 'NOTHING'}${picked ? `[picked ${picked}]` : ''}`,
    )
    for (const { file, score } of ranked.slice(0, 6)) {
      console.log(`    ${String(score).padStart(2)}  ${file.title}  ${file.width}x${file.height}`)
    }
  }
  console.log(`\n${withAny} of ${gaps.length} blank cards have at least one free picture in the article.`)
}

// --- verify: do the picks in FILES resolve to a real Commons image? ----------

async function verify(): Promise<void> {
  const picks = Object.entries(FILES)
  const info = await fileInfo([...new Set(picks.map(([, f]) => f))])

  const good: [string, string][] = []
  console.log(`\n=== ${picks.length} picks ===\n`)
  for (const [id, file] of picks) {
    const node = byId.get(id)
    const found = info.get(file)
    if (!node) {
      console.log(`  x ${id.padEnd(22)} no such node`)
      continue
    }
    if (!found || !found.thumb) {
      console.log(`  x ${id.padEnd(22)} ${file}  MISSING`)
      continue
    }
    if (found.repository !== 'shared') {
      // A local upload is a fair-use file. Hotlinking one is not ours to do.
      console.log(`  x ${id.padEnd(22)} ${file}  not on Commons (${found.repository})`)
      continue
    }
    good.push([id, file])
    console.log(`  + ${id.padEnd(22)} ${found.title.replace(/^File:/, '').slice(0, 52).padEnd(53)} ${found.width}x${found.height}`)
  }

  console.log(`\nverified ${good.length} of ${picks.length}\n`)
  console.log('--- merge into src/data/wiki.ts ---\n')
  for (const [id, file] of good) {
    const key = /^[a-z][a-z0-9]*$/.test(id) ? id : `'${id}'`
    const node = byId.get(id)
    console.log(`  ${key}: ${JSON.stringify(file)}, // ${node?.name}`)
  }
  const untitled = good.filter(([id]) => !WIKI_TITLES[id])
  if (untitled.length) {
    console.log(`\nnote: ${untitled.length} of these have no article title, so the card has a picture but no extract`)
  }
}

await (process.argv.includes('--scan')
  ? scan()
  : process.argv.includes('--search')
    ? searchCommons()
    : verify())
