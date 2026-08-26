/**
 * Candidate titles for nodes whose card has no picture, and the resolver that
 * picks between them.
 *
 * Two kinds of gap came out of `npm run audit:wiki`:
 *
 *   - Lineage nodes with no mapping at all. These are organisational ("Home
 *     Consoles", "Storage") and almost every one has a real overview article
 *     behind it, usually with a good lead image.
 *   - Nodes whose article exists but carries no lead image. Often the only
 *     picture is a non-free screenshot or logo, which the pageimages API rightly
 *     excludes. The fix there is a closely related article that does have a free
 *     one - the machine rather than the operating system, the person rather than
 *     the algorithm.
 *
 * Every candidate below has to be *about* the node. The resolver picks the first
 * one that actually has an image, and anything that resolves to nothing keeps no
 * picture rather than borrowing an unrelated one. The panel caption names the
 * article the image came from, so a portrait on an algorithm's card reads as the
 * person who devised it rather than as a picture of the algorithm.
 *
 *   npm run wiki:candidates
 */

import { computerHistory, flatten } from '../src/data'
import { WIKI_TITLES } from '../src/data/wiki'

const API = 'https://en.wikipedia.org/w/api.php'
const AGENT =
  'the-binary-tree/0.1 (dataset image audit; https://github.com/svarts/the-binary-tree)'
const BATCH = 50
const PAUSE_MS = 250

/** id -> candidate titles, most preferred first. */
export const CANDIDATES: Record<string, string[]> = {
  // --- lineage nodes with no mapping ---
  root: ['Computer'],
  foundations: ['History of computing', 'Mechanical calculator'],
  'mechanical-calculators': ['Mechanical calculator'],
  'punched-cards': ['Punched card'],
  'babbage-line': ['Charles Babbage'],
  'analog-computing': ['Analog computer'],
  theory: ['Theory of computation', 'Alan Turing'],
  machines: ['History of computing hardware', 'Computer'],
  electromechanical: ['Relay', 'Electromechanics'],
  'first-electronic': ['Vacuum-tube computer', 'History of computing hardware'],
  'stored-program': ['Stored-program computer', 'Von Neumann architecture'],
  mainframes: ['Mainframe computer'],
  minicomputers: ['Minicomputer'],
  processors: ['Central processing unit', 'Microprocessor'],
  components: ['Electronic component', 'Transistor'],
  'intel-line': ['X86', 'Intel'],
  'eight-bit-processors': ['8-bit computing', 'Microprocessor'],
  'motorola-68k': ['Motorola 68000 series', 'Motorola 68000'],
  risc: ['Reduced instruction set computer'],
  'amd-line': ['AMD'],
  peripherals: ['Peripheral', 'Computer hardware'],
  'input-devices': ['Input device', 'Computer keyboard'],
  displays: ['Computer monitor', 'Display device'],
  storage: ['Computer data storage'],
  interfaces: ['Graphical user interface', 'Human-computer interaction'],
  personal: ['Personal computer'],
  'first-personal': ['History of personal computers', 'Personal computer'],
  'apple-line': ['Apple Inc.'],
  'home-computers': ['Home computer'],
  'ibm-pc-line': ['IBM Personal Computer', 'IBM PC compatible'],
  workstations: ['Workstation'],
  'operating-systems': ['Operating system'],
  'early-os': ['History of operating systems', 'Operating system'],
  'unix-line': ['History of Unix', 'Unix'],
  'dos-windows': ['Microsoft Windows', 'MS-DOS'],
  'other-os': ['Timeline of operating systems', 'Operating system'],
  languages: ['Programming language'],
  'early-languages': ['History of programming languages', 'Programming language'],
  'fortran-line': ['Fortran'],
  'lisp-line': ['John McCarthy (computer scientist)', 'Lisp (programming language)'],
  'algol-line': ['ALGOL'],
  'business-languages': ['Data processing', 'COBOL'],
  'teaching-languages': ['Educational programming language', 'BASIC'],
  'functional-logic': ['Functional programming', 'Logic programming'],
  scripting: ['Scripting language'],
  tools: ['Programming tool', 'Software development'],
  'compilers-tools': ['Compiler'],
  'dragon-book': ['Compilers: Principles, Techniques, and Tools', 'Parsing'],
  editors: ['Text editor'],
  'version-control': ['Version control'],
  encoding: ['Character encoding'],
  data: ['Database'],
  'pre-relational': ['Hierarchical database model', 'IBM Information Management System'],
  relational: ['Relational database', 'Edgar F. Codd'],
  analytics: ['Data warehouse', 'Business intelligence'],
  nosql: ['NoSQL'],
  'file-processing': ['Batch processing', 'Magnetic-tape data storage'],
  networks: ['Computer network', 'Internet'],
  'packet-switching': ['Paul Baran', 'Donald Davies'],
  'local-networks': ['Local area network', 'Ethernet'],
  'online-services': ['Cloud computing'],
  security: ['Cryptography', 'Computer security'],
  'classical-crypto': ['Classical cipher', 'Cryptography'],
  symmetric: ['Symmetric-key algorithm', 'Block cipher'],
  'public-key': ['Public-key cryptography'],
  integrity: ['Cryptographic hash function', 'Digital signature'],
  'systems-security': ['Computer security'],
  games: ['Video game'],
  'early-games': ['Early history of video games', 'Video game'],
  arcade: ['Arcade video game', 'Arcade cabinet'],
  consoles: ['Home video game console', 'Video game console'],
  'game-tech': ['Video game graphics', '3D computer graphics'],
  'scanline-racing': ['Raster scan', 'Cathode-ray tube'],
  mobile: ['Mobile computing', 'Mobile device'],
  portables: ['Laptop', 'Portable computer'],
  handhelds: ['Personal digital assistant', 'Handheld PC'],
  phones: ['Mobile phone', 'Smartphone'],
  wearables: ['Wearable computer', 'Smartwatch'],
  frontier: ['Supercomputer'],
  supercomputers: ['Supercomputer'],
  graphics: ['Graphics processing unit'],
  ai: ['Artificial intelligence'],
  quantum: ['Quantum computing'],
  'turkey-first-computer': ['IBM 650'],

  // --- articles that exist but carry no lead image ---
  // Machines and hardware: the machine itself usually has a photograph even when
  // the abstraction does not.
  'ferranti-mark-1': ['Ferranti Mark 1', 'Manchester Mark 1'],
  'manchester-mark-1': ['Manchester Mark 1', 'Manchester Baby'],
  binac: ['BINAC', 'J. Presper Eckert'],
  mesm: ['MESM', 'Sergei Lebedev'],
  'leo-i': ['LEO (computer)', 'J. Lyons and Co.'],
  'burroughs-b5000': ['Burroughs Large Systems', 'Burroughs Corporation'],
  'micral-n': ['Micral', 'Intel 8008'],
  'next-computer': ['NeXT Computer', 'NeXT'],
  'symbolics-lisp-machine': ['Symbolics', 'Lisp machine'],
  'earth-simulator': ['Earth Simulator', 'NEC SX architecture'],
  'ibm-quantum': ['IBM Quantum Platform', 'IBM Q System One'],
  'winchester-drive': ['IBM 3340', 'Hard disk drive'],
  'magnetic-tape': ['Magnetic-tape data storage', 'IBM 729'],
  sage: ['Semi-Automatic Ground Environment', 'AN/FSQ-7'],
  'psion-organiser': ['Psion Organiser', 'Psion (company)'],
  sketchpad: ['Sketchpad', 'Ivan Sutherland'],
  'ibm-801': ['IBM 801', 'IBM RT PC'],
  'berkeley-risc': ['Berkeley RISC', 'David Patterson (computer scientist)'],
  mips: ['MIPS architecture', 'R2000 (microprocessor)'],
  power: ['IBM POWER architecture', 'IBM RS/6000'],
  arm1: ['ARM architecture family', 'Acorn Computers'],
  arm2: ['Acorn Archimedes', 'ARM architecture family'],
  arm6: ['Apple Newton', 'ARM architecture family'],
  'arm-cortex-a': ['ARM Cortex-A', 'ARM architecture family'],
  'amd-zen': ['Zen (microarchitecture)', 'Ryzen'],
  'nvidia-a100': ['Ampere (microarchitecture)', 'Nvidia DGX'],
  'amiga-os': ['AmigaOS', 'Amiga 1000'],
  // qnx: dropped, the present owner is not the system.
  irix: ['IRIX', 'SGI Indy'],
  // xenix: dropped, a company logo is not the system.
  vms: ['OpenVMS', 'VAX-11'],
  sunos: ['SunOS', 'Sun-1'],
  nextstep: ['NeXTSTEP', 'NeXT Computer'],
  'mac-system-1': ['System 1', 'Macintosh 128K'],
  'mac-os-9': ['Mac OS 9', 'Classic Mac OS'],
  // 'mac-os-x': dropped, one Mac model is not the operating system.
  macos: ['MacOS', 'Aqua (user interface)'],
  watchos: ['WatchOS', 'Apple Watch'],
  netscape: ['Netscape Navigator', 'Netscape'],
  // 'internet-explorer': dropped, a company logo is not the browser.

  // People, where the node's own summary already names them. The caption says
  // whose article the picture came from, so this cannot be mistaken for a
  // photograph of the idea itself.
  'boolean-algebra': ['George Boole'],
  'hilbert-program': ['David Hilbert'],
  'godel-incompleteness': ['Kurt Gödel'],
  'church-turing': ['Alonzo Church', 'Alan Turing'],
  'information-theory': ['Claude Shannon'],
  'complexity-theory': ['Computational complexity theory', 'Stephen Cook'],
  'cook-levin': ['Stephen Cook', 'Leonid Levin'],
  'dartmouth-workshop': ['Dartmouth workshop', 'John McCarthy (computer scientist)'],
  perceptron: ['Frank Rosenblatt', 'Mark I Perceptron'],
  backpropagation: ['Geoffrey Hinton', 'Backpropagation'],
  // alphago: dropped, a portrait of the human player is not a picture of the program.
  llm: ['Large language model', 'ChatGPT'],
  'baran-davies': ['Paul Baran', 'Donald Davies'],
  'tcp-ip': ['Vint Cerf', 'Bob Kahn'],
  dns: ['Paul Mockapetris', 'Domain Name System'],
  nsfnet: ['NSFNET', 'National Science Foundation'],
  rsa: ['Ron Rivest', 'Adi Shamir'],
  'shor-algorithm': ['Peter Shor'],
  'grover-algorithm': ['Lov Grover'],
  'post-quantum': ['Post-quantum cryptography', 'Lattice-based cryptography'],
  pgp: ['Phil Zimmermann'],
  'morris-worm': ['Robert Tappan Morris', 'Morris worm'],
  'caesar-cipher': ['Caesar cipher', 'Substitution cipher'],
  bcpl: ['Martin Richards (computer scientist)', 'BCPL'],
  cpl: ['Christopher Strachey', 'CPL (programming language)'],
  'b-language': ['Ken Thompson', 'B (programming language)'],
  lisp: ['John McCarthy (computer scientist)', 'Lisp (programming language)'],
  ml: ['Robin Milner', 'ML (programming language)'],
  prolog: ['Alain Colmerauer', 'Prolog'],
  pascal: ['Niklaus Wirth', 'Pascal (programming language)'],
  'modula-2': ['Niklaus Wirth', 'Modula-2'],
  haskell: ['Haskell', 'Haskell Curry'],
  ocaml: ['OCaml', 'Xavier Leroy'],
  swift: ['Swift (programming language)', 'Chris Lattner'],
  java: ['Java (programming language)', 'James Gosling'],
  kotlin: ['Kotlin (programming language)', 'JetBrains'],
  elixir: ['Elixir (programming language)', 'Erlang (programming language)'],
  'algol-60': ['ALGOL 60', 'ALGOL', 'Peter Naur'],
  autocode: ['Autocode', 'Ferranti Mark 1'],
  'a-0': ['Grace Hopper', 'A-0 System'],
  plankalkul: ['Konrad Zuse', 'Plankalkül'],
  'turbo-pascal': ['Turbo Pascal', 'Anders Hejlsberg'],
  delphi: ['Delphi (software)', 'Anders Hejlsberg'],
  // 'visual-basic': dropped, the IDE it shipped in is not the language.
  'objective-c': ['Objective-C', 'Brad Cox'],
  'system-r': ['IBM System R', 'IBM San Jose Research Laboratory'],
  'codd-model': ['Edgar F. Codd'],
  isam: ['ISAM', 'IBM 305 RAMAC'],
  mumps: ['MUMPS', 'Massachusetts General Hospital'],
  codasyl: ['CODASYL', 'Charles Bachman'],
  'oracle-db': ['Oracle Database', 'Larry Ellison'],
  'sql-server': ['Microsoft SQL Server', 'Sybase'],
  sql: ['SQL', 'Donald D. Chamberlin'],
  acid: ['ACID', 'Jim Gray (computer scientist)'],
  mapreduce: ['MapReduce', 'Jeffrey Dean'],
  hadoop: ['Apache Hadoop', 'Doug Cutting'],
  // bigtable: dropped, a data centre photograph says nothing about the data model.
  hbase: ['Apache HBase', 'Apache Hadoop'],
  dynamo: ['Dynamo (storage system)', 'Werner Vogels'],
  redis: ['Redis', 'Salvatore Sanfilippo'],
  mongodb: ['MongoDB', 'MongoDB Inc.'],
  elasticsearch: ['Elasticsearch', 'Apache Lucene'],
  // memcached: dropped, the site it was written for is not the cache.
  olap: ['Online analytical processing', 'OLAP cube'],
  'column-store': ['Column-oriented DBMS', 'Data orientation'],
  // kubernetes: dropped, a company logo is not the orchestrator.
  raid: ['RAID', 'Disk array'],
  make: ['Make (software)', 'Stuart Feldman'],
  yacc: ['Yacc', 'Stephen C. Johnson'],
  llvm: ['LLVM', 'Chris Lattner'],
  sccs: ['Source Code Control System', 'Marc Rochkind'],
  rcs: ['Revision Control System', 'Walter F. Tichy'],
  cvs: ['Concurrent Versions System', 'Dick Grune'],
  bitkeeper: ['BitKeeper', 'Larry McVoy'],
  json: ['JSON', 'Douglas Crockford'],
  'utf-8': ['UTF-8', 'Rob Pike'],
  ebcdic: ['EBCDIC', 'Punched card'],
  'ieee-754': ['IEEE 754', 'William Kahan'],
  posix: ['POSIX', 'Unix'],
  'http-2': ['HTTP/2', 'Hypertext Transfer Protocol'],
  tls: ['Transport Layer Security', 'HTTPS'],
  md5: ['MD5', 'Ronald Rivest'],
  firewall: ['Firewall (computing)', 'Network security'],
  // sandbox: dropped, a virtual machine is a different mechanism.
  // 'zero-trust': dropped, the general field is not this idea.
  nls: ['NLS (computer system)', 'Douglas Engelbart'],
  dynabook: ['Dynabook', 'Alan Kay'],
  'ubiquitous-computing': ['Mark Weiser', 'Ubiquitous computing'],
  symbian: ['Symbian', 'Nokia N8'],
  android: ['Android version history', 'Android (operating system)'],
  // 'app-store': dropped, the store is not the phone.
  'gm-naa-io': ['GM-NAA I/O', 'IBM 704'],
  'bell-relay': ['George Stibitz', 'Bell Labs'],
  zork: ['Zork', 'Infocom'],
  rogue: ['Rogue (video game)', 'Roguelike'],
  // 'pac-man': dropped, the publisher is not the game.
  // 'space-invaders': dropped, the publisher is not the game.
  // 'donkey-kong': dropped, the publisher is not the game.
  doom: ['Doom (1993 video game)', 'Id Software'],
  quake: ['Quake (video game)', 'John Carmack'],
  'wolfenstein-3d': ['Wolfenstein 3D', 'Id Software'],
  'video-game-crash': ['Video game crash of 1983', 'Atari, Inc.'],
  'game-engine': ['Game engine', 'Unreal Engine'],
  direct3d: ['Direct3D', 'DirectX'],
  vulkan: ['Vulkan', 'Khronos Group'],
}

// --- resolver ---------------------------------------------------------------

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

interface Page {
  title: string
  missing?: boolean
  thumbnail?: { source: string }
  pageprops?: Record<string, string>
}

async function fetchBatch(titles: string[], attempt = 0): Promise<Map<string, Page | undefined>> {
  const url =
    `${API}?action=query&format=json&formatversion=2&redirects=1` +
    `&prop=pageimages|pageprops&piprop=thumbnail&pithumbsize=320&ppprop=disambiguation` +
    `&titles=${encodeURIComponent(titles.join('|'))}`
  const response = await fetch(url, { headers: { 'User-Agent': AGENT } })
  if (response.status === 429 && attempt < 5) {
    const wait = 1500 * 2 ** attempt
    process.stderr.write(`  rate limited, waiting ${wait}ms\n`)
    await sleep(wait)
    return fetchBatch(titles, attempt + 1)
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const data = (await response.json()) as {
    query?: {
      normalized?: { from: string; to: string }[]
      redirects?: { from: string; to: string }[]
      pages?: Page[]
    }
  }
  const q = data.query ?? {}
  const hop = new Map<string, string>()
  for (const n of q.normalized ?? []) hop.set(n.from, n.to)
  for (const r of q.redirects ?? []) hop.set(r.from, r.to)
  const pages = new Map((q.pages ?? []).map((p) => [p.title, p]))
  const out = new Map<string, Page | undefined>()
  for (const title of titles) {
    let at = title
    for (let step = 0; step < 6; step++) {
      const next = hop.get(at)
      if (!next || next === at) break
      at = next
    }
    out.set(title, pages.get(at))
  }
  return out
}

const wanted = [...new Set(Object.values(CANDIDATES).flat())]
const resolved = new Map<string, Page | undefined>()

for (let i = 0; i < wanted.length; i += BATCH) {
  const slice = wanted.slice(i, i + BATCH)
  for (const [k, v] of await fetchBatch(slice)) resolved.set(k, v)
  process.stderr.write(`  ${Math.min(i + BATCH, wanted.length)}/${wanted.length}\n`)
  await sleep(PAUSE_MS)
}

const usable = (title: string): boolean => {
  const page = resolved.get(title)
  return Boolean(page && !page.missing && !page.pageprops?.disambiguation && page.thumbnail)
}

const nodeNames = new Map(flatten(computerHistory).map((n) => [n.id, n.name]))

/** Depth per node, so a title contested by two nodes goes to the specific one. */
const depths = new Map<string, number>()
;(function walk(datum: { id: string; children?: { id: string }[] }, depth: number): void {
  depths.set(datum.id, depth)
  for (const child of (datum as { children?: never[] }).children ?? []) {
    walk(child as { id: string }, depth + 1)
  }
})(computerHistory, 0)

/**
 * A title may serve only one node.
 *
 * Two cards side by side showing the same photograph looks like a bug even when
 * both mappings are defensible, and it happens constantly here: a lineage and its
 * principal member want the same article, and half a dozen ideas want the same
 * person. Contests go to the deeper node, since it is the more specific claim,
 * and the loser falls through to its next candidate.
 */
const taken = new Map<string, string>()
const winners: Record<string, string> = {}
const stillNothing: string[] = []

/**
 * Contested titles where depth gives the wrong answer.
 *
 * Depth is a decent tiebreak but it is not judgement: Delphi is deeper than
 * Turbo Pascal and would take Anders Hejlsberg's portrait off the product he is
 * actually remembered for. Where the right owner is a matter of significance
 * rather than structure, it is written down.
 */
const PREFER: Record<string, string> = {
  'Niklaus Wirth': 'pascal',
  'Anders Hejlsberg': 'turbo-pascal',
  'John McCarthy (computer scientist)': 'lisp',
  'Chris Lattner': 'llvm',
  'Stephen Cook': 'cook-levin',
  'Alan Turing': 'theory',
  'Punched card': 'punched-cards',
  Supercomputer: 'supercomputers',
  'Operating system': 'operating-systems',
  'Video game': 'games',
  Cryptography: 'security',
  'Paul Baran': 'baran-davies',
  'ARM architecture family': 'arm1',
  'Ron Rivest': 'rsa',
}

/**
 * Preferred owners first, then deepest first so specific nodes claim before
 * their lineages do.
 */
const preferredIds = new Set(Object.values(PREFER))
const ordered = Object.keys(CANDIDATES).sort((a, b) => {
  const pa = preferredIds.has(a) ? 1 : 0
  const pb = preferredIds.has(b) ? 1 : 0
  if (pa !== pb) return pb - pa
  return (depths.get(b) ?? 0) - (depths.get(a) ?? 0)
})

for (const id of ordered) {
  const pick = CANDIDATES[id].find(
    (title) => usable(title) && !taken.has(title) && (PREFER[title] ?? id) === id,
  )
  if (pick) {
    winners[id] = pick
    taken.set(pick, id)
  } else {
    stillNothing.push(id)
  }
}

// Anything already in WIKI_TITLES and working also holds its title.
for (const [id, title] of Object.entries(WIKI_TITLES)) {
  if (!winners[id] && !taken.has(title)) taken.set(title, id)
}

console.log('\n=== candidate resolution ===')
console.log(`resolved ${Object.keys(winners).length} of ${Object.keys(CANDIDATES).length}`)

console.log('\n--- winners, paste into WIKI_TITLES ---')
for (const [id, title] of Object.entries(winners).sort(([a], [b]) => a.localeCompare(b))) {
  const current = WIKI_TITLES[id]
  const mark = current === title ? '   ' : current ? ' ~ ' : ' + '
  const key = /^[a-z][a-z0-9]*$/.test(id) ? id : `'${id}'`
  console.log(`${mark}${key}: ${JSON.stringify(title)}, // ${nodeNames.get(id) ?? '?'}`)
}

if (stillNothing.length) {
  console.log(`\n--- no candidate had an image (${stillNothing.length}) ---`)
  for (const id of stillNothing) {
    console.log(`${id.padEnd(26)} ${nodeNames.get(id) ?? ''} tried: ${CANDIDATES[id].join(', ')}`)
  }
}
