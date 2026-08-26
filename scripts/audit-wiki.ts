/**
 * Audits image coverage against the live Wikipedia API.
 *
 * The panel shows a photograph when, and only when, the node's article has a lead
 * image. There is no way to know that from the title alone, so guessing titles
 * and hoping produces cards with an empty frame. This asks.
 *
 * Uses the batched `action=query` API, fifty titles per request, rather than the
 * per-page REST summary endpoint the demo uses at runtime. Sweeping six hundred
 * titles one at a time earns an HTTP 429 within seconds, and every one of those
 * looks exactly like a broken title in the report.
 *
 * Four outcomes per node:
 *   ok       a standard article with a lead image
 *   noimage  a real article with no lead image; needs a different title
 *   bad      missing, or a disambiguation page
 *   untitled no mapping in WIKI_TITLES at all
 *
 *   npm run audit:wiki            report to stdout, writes .wiki-audit.json
 *   npm run audit:wiki -- --gaps  only the ones needing work
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { computerHistory, flatten } from '../src/data'
import { WIKI_FILES, WIKI_TITLES } from '../src/data/wiki'

const API = 'https://en.wikipedia.org/w/api.php'
// Wikimedia asks for a descriptive agent with a contact route. Being a good
// citizen here is not optional; anonymous bulk readers get blocked.
const AGENT =
  'the-binary-tree/0.1 (dataset image audit; https://github.com/svarts/the-binary-tree)'
const BATCH = 50
const PAUSE_MS = 250

type Verdict = 'ok' | 'noimage' | 'bad' | 'untitled'

interface Row {
  id: string
  name: string
  kind: string
  title?: string
  verdict: Verdict
  /** What the API redirected or normalised the request to. */
  resolved?: string
  note?: string
}

interface Page {
  title: string
  missing?: boolean
  thumbnail?: { source: string }
  pageprops?: Record<string, string>
}

interface QueryResponse {
  query?: {
    normalized?: { from: string; to: string }[]
    redirects?: { from: string; to: string }[]
    pages?: Page[]
  }
}

const nodes = flatten(computerHistory)
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function fetchBatch(titles: string[], attempt = 0): Promise<QueryResponse> {
  // pilicense=any is essential, not a nicety. PageImages keeps two properties
  // per article: page_image_free, and page_image which also considers non-free
  // files. This API defaults to the free one; the REST summary endpoint the demo
  // calls at runtime uses the other. Auditing without this flag measures free
  // image availability and reports empty cards that in fact show a picture -
  // Windows 95 among them.
  const url =
    `${API}?action=query&format=json&formatversion=2&redirects=1` +
    `&prop=pageimages|pageprops&piprop=thumbnail&pithumbsize=320&pilicense=any` +
    `&ppprop=disambiguation&titles=${encodeURIComponent(titles.join('|'))}`

  const response = await fetch(url, { headers: { 'User-Agent': AGENT } })
  if (response.status === 429 && attempt < 5) {
    const wait = 1500 * 2 ** attempt
    process.stderr.write(`  rate limited, waiting ${wait}ms\n`)
    await sleep(wait)
    return fetchBatch(titles, attempt + 1)
  }
  if (!response.ok) throw new Error(`HTTP ${response.status} for a batch of ${titles.length}`)
  return (await response.json()) as QueryResponse
}

/** Everything with a mapping, deduplicated by title. */
const mapped = nodes.filter((n) => WIKI_TITLES[n.id])
const uniqueTitles = [...new Set(mapped.map((n) => WIKI_TITLES[n.id]))]

/** requested title -> what the API actually served. */
const outcome = new Map<string, { page?: Page; finalTitle: string }>()

for (let i = 0; i < uniqueTitles.length; i += BATCH) {
  const slice = uniqueTitles.slice(i, i + BATCH)
  const data = await fetchBatch(slice)
  const q = data.query ?? {}

  // Follow normalisation then redirects to find which returned page belongs to
  // which requested title.
  const hop = new Map<string, string>()
  for (const n of q.normalized ?? []) hop.set(n.from, n.to)
  for (const r of q.redirects ?? []) hop.set(r.from, r.to)
  const follow = (title: string): string => {
    let at = title
    for (let step = 0; step < 6; step++) {
      const next = hop.get(at)
      if (!next || next === at) break
      at = next
    }
    return at
  }

  const pages = new Map((q.pages ?? []).map((p) => [p.title, p]))
  for (const title of slice) {
    const finalTitle = follow(title)
    outcome.set(title, { page: pages.get(finalTitle), finalTitle })
  }
  process.stderr.write(`  ${Math.min(i + BATCH, uniqueTitles.length)}/${uniqueTitles.length}\n`)
  await sleep(PAUSE_MS)
}

const rows: Row[] = nodes.map((node) => {
  const base = { id: node.id, name: node.name, kind: node.kind ?? '' }
  const title = WIKI_TITLES[node.id]
  if (!title) return { ...base, verdict: 'untitled' as Verdict }

  const result = outcome.get(title)
  const page = result?.page
  const resolved = result && result.finalTitle !== title ? result.finalTitle : undefined

  if (!page || page.missing) {
    return { ...base, title, verdict: 'bad', note: 'missing', ...(resolved ? { resolved } : {}) }
  }
  if (page.pageprops && 'disambiguation' in page.pageprops) {
    return { ...base, title, verdict: 'bad', note: 'disambiguation', ...(resolved ? { resolved } : {}) }
  }
  return {
    ...base,
    title,
    verdict: page.thumbnail ? 'ok' : 'noimage',
    ...(resolved ? { resolved } : {}),
  }
})

rows.sort((a, b) => a.id.localeCompare(b.id))

const by = (v: Verdict) => rows.filter((r) => r.verdict === v)
// A card is illustrated either by its article's lead image or by the Commons
// file named for it, so both count towards what a reader actually sees.
const viaFile = rows.filter((r) => r.verdict !== 'ok' && WIKI_FILES[r.id]).length
const counts = {
  total: rows.length,
  ok: by('ok').length,
  viaFile,
  noimage: by('noimage').length,
  bad: by('bad').length,
  untitled: by('untitled').length,
}

writeFileSync(
  resolve(import.meta.dirname, '../.wiki-audit.json'),
  JSON.stringify({ counts, rows }, null, 2),
)

console.log('\n=== image coverage ===')
console.log(counts)
const illustrated = counts.ok + counts.viaFile
console.log(
  `with a picture: ${((illustrated / counts.total) * 100).toFixed(1)}% ` +
    `(${counts.ok} from the article, ${counts.viaFile} from a named file)`,
)

const show = (label: string, list: Row[]) => {
  if (!list.length) return
  console.log(`\n--- ${label} (${list.length}) ---`)
  for (const r of list) {
    const extra = [r.title && `"${r.title}"`, r.resolved && `-> ${r.resolved}`, r.note]
      .filter(Boolean)
      .join(' ')
    console.log(`${r.id.padEnd(26)} ${r.name.slice(0, 32).padEnd(33)} ${extra}`)
  }
}

show('bad titles', by('bad'))
show('no lead image', by('noimage'))
show('no title at all', by('untitled'))
if (!process.argv.includes('--gaps')) show('ok', by('ok'))
