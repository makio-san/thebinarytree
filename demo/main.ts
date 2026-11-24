/**
 * The Binary Tree explorer.
 *
 * The library owns the ball, the layout and the navigation. This file wires it
 * to a search field, a year filter, a detail panel, a legend, and on a phone to
 * a tab bar and a drag-to-expand sheet.
 */

import {
  BinaryTree,
  ERAS,
  computerHistory,
  creatorsOf,
  fold,
  formatYear,
  loaders,
  walk,
  wikiTitle,
  type TreeNode,
} from 'the-binary-tree'
import { mountAgentsIndicator, openAgents } from './ui/agents'
import { blogRoute, hasPosts, openBlog } from './ui/blog'
import { Panel } from './ui/panel'
import { Search } from './ui/search'
import { Sheet } from './ui/sheet'
import { prefetch } from './wiki'
import './style.css'

const $ = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T

const stageEl = $<HTMLDivElement>('stage')
const panelEl = $<HTMLElement>('panel')
const panelGrab = $<HTMLElement>('panel-grab')
const panelPeek = $<HTMLElement>('panel-peek')
const panelBody = $<HTMLElement>('panel-body')
const walkEl = $<HTMLElement>('panel-walk')
const searchEl = $<HTMLElement>('search')
const searchInput = $<HTMLInputElement>('search-input')
const searchResults = $<HTMLUListElement>('search-results')
const yearInput = $<HTMLInputElement>('year')
const yearOutput = $<HTMLOutputElement>('year-out')
const legendList = $<HTMLUListElement>('legend')
const bottomEl = $<HTMLElement>('bottom')
const taglineEl = $<HTMLElement>('tagline')
const tourButton = $<HTMLButtonElement>('tour')
const tourTab = $<HTMLButtonElement>('tab-tour')
const tourLabel = tourButton.querySelector('.btn__label') as HTMLElement
const tourIcon = tourButton.querySelector('[class^="icon-"]') as HTMLElement
// The tab button is an icon above a word; the word is the second span.
const tourTabLabel = tourTab.querySelector('span:last-of-type') as HTMLElement

/** The walk itself, and enough state to stop it between any two steps. */
let tourWalk: TreeNode[] = []
let tourAt = 0
let touring = false
/** Bumped on every start and stop, so a suspended step knows it is stale. */
let tourRun = 0
let tourNap = 0
let tourWake: (() => void) | null = null

const isPhone = (): boolean => matchMedia('(max-width: 860px)').matches

/**
 * Reveal the chrome. Held back by the inline critical styles in index.html until
 * the tree has laid out, so the first frame is the tree rather than a set of
 * unstyled controls.
 */
let readyWatchdog = 0
function markReady(): void {
  clearTimeout(readyWatchdog)
  if (document.body.dataset.ready) return
  document.body.dataset.ready = 'true'
}
// If initialisation throws, the controls still have to appear: a failure should
// look like an app with an empty canvas, not like a page that did not load.
readyWatchdog = window.setTimeout(markReady, 2500)

let yearLimit = Number(yearInput.max)
let dark = true

/** Dim anything that had not appeared yet at the year on the slider. */
const yearFilter = (node: TreeNode): boolean => {
  const year = node.data.year
  return typeof year !== 'number' || year <= yearLimit
}

/** "Ken Thompson, Dennis Ritchie" or "Federico Faggin +3": short enough for a label. */
function creditLine(id: string): string {
  const names = creatorsOf(id)
  if (names.length <= 2) return names.join(', ')
  return `${names[0]} +${names.length - 1}`
}

/** The credited name a query matches, if any. */
function creditMatch(node: TreeNode, query: string): string | undefined {
  const needle = fold(query)
  if (!needle) return undefined
  return creatorsOf(node.id).find((name) => fold(name).includes(needle))
}

/**
 * Search by name and by maker. The library ranks names and summaries; people
 * are this dataset's own, so they are matched here and slotted in after the
 * name hits and ahead of the looser summary ones.
 */
function searchTree(query: string, limit: number): TreeNode[] {
  const needle = fold(query)
  const byText = tree.api.search(query, limit)
  const named = byText.filter((n) => fold(n.data.name).includes(needle))
  const credited = tree.api
    .nodes()
    .filter((n) => creditMatch(n, query))
    .sort((a, b) => ((a.data.year as number) ?? 0) - ((b.data.year as number) ?? 0))
  return [...new Set([...named, ...credited, ...byText])].slice(0, limit)
}

// --- the tree --------------------------------------------------------------

const tree = new BinaryTree(
  { parent: stageEl },
  {
    dataloader: loaders.fromObject(computerHistory),
    theme: 'dark',
    filter: yearFilter,
    layout: {
      // The dataset has a few very long chains (x86, Windows NT). A slightly
      // shorter step keeps their tails inside a workable range while the wide
      // upper levels still get room.
      linkLength: (n) => (n.depth <= 1 ? 1.5 : n.depth <= 3 ? 1.1 : 0.95),
      spread: 0.94,
      weightExponent: 0.52,
      maxCone: 1.1,
    },
    geometry: {
      labels: {
        // A phone has a third of the width and a sheet covering the bottom half,
        // so it gets fewer labels, smaller type, and one card at a time.
        maxLabels: isPhone() ? 16 : 42,
        fontScale: isPhone() ? 0.74 : 1,
        maxCards: isPhone() ? 1 : 3,
        detail: (n) => formatYear(n.data.year as number | undefined),
        // Who and where. The kind is on the detail panel, and on a branch
        // heading it only ever said "group".
        meta: (n) => [creditLine(n.id), (n.data.origin as string) ?? ''].filter(Boolean).join(' · '),
        // One sentence, so a card stays a card and not an essay.
        body: (n) => {
          const summary = n.data.summary as string | undefined
          if (!summary) return ''
          const stop = summary.indexOf('. ')
          return stop > 0 ? summary.slice(0, stop + 1) : summary
        },
      },
    },
    interaction: {
      onNodeClick: () => stopTour(),
      onNodeHover: (node) => {
        if (node) prefetch(wikiTitle(node.id))
      },
      onSelectionChange: (node) => {
        panel.show(node)
        syncWalk(node)
        if (sheetEnabled() && node) {
          // A short buzz on selection. The nodes are small and the confirmation
          // that you hit the one you aimed at is worth more on a phone than
          // anywhere else. Android only; iOS Safari ignores it.
          navigator.vibrate?.(8)
          if (sheet.current === 'peek') sheet.setState('half')
        }
      },
      onInit: () => {
        renderLegend()
        void tree.api.select('root', false)
        markReady()
      },
    },
  },
)

// --- panel and sheet -------------------------------------------------------

const panel = new Panel(panelEl, panelBody, panelPeek, {
  onNavigate: (node) => {
    stopTour()
    void tree.api.select(node)
  },
  onCreator: (name) => search.query(name),
})

/** Height of the sheet's own header: the handle and the line with the name. */
const SHEET_HEADER = 64

const sheet = new Sheet(panelEl, panelGrab, {
  peek: SHEET_HEADER + 58,
  half: 0.46,
  onStateChange: (state) => {
    document.body.dataset.sheet = state
    syncSafeArea()
  },
})

const sheetEnabled = (): boolean => isPhone()

/**
 * Tell the tree how much of the canvas is covered, so it draws the centre of
 * the ball in the part you can still see and keeps labels out of the rest.
 * Without this, tapping a node flies it to a point behind the sheet.
 */
function syncSafeArea(): void {
  if (!isPhone()) {
    // The detail card sits over the right of the window, so reserve its column.
    const covered = panelEl.getBoundingClientRect()
    const right = Math.max(0, Math.round(globalThis.innerWidth - covered.left + 12))
    tree.api.setSafeArea({ top: 64, right, bottom: 96, left: 0 })
    return
  }
  const height = globalThis.innerHeight
  const state = sheet.current
  const tabbar = document.getElementById('tabbar')?.offsetHeight ?? 0
  const covered =
    state === 'full'
      ? height * 0.5
      : state === 'half'
        ? Math.min(height * 0.42, panelEl.offsetHeight * (1 - 0.46)) + tabbar * 0.35
        : SHEET_HEADER + tabbar
  tree.api.setSafeArea({ top: 56, bottom: Math.round(covered), right: 0, left: 0 })
}

function syncLayout(): void {
  const phone = isPhone()
  document.body.dataset.mode = phone ? 'phone' : 'desktop'
  // The peek shows the sheet's header above the tab bar, and the tab bar is
  // taller on a phone with a home indicator. A fixed number left a sliver.
  sheet.setPeek(SHEET_HEADER + (document.getElementById('tabbar')?.offsetHeight ?? 58))
  sheet.setEnabled(phone)
  if (phone && sheet.current === 'hidden') sheet.setState('peek')
  if (!phone) bottomEl.dataset.open = 'true'
  tree.api.resize()
  syncSafeArea()
}

// --- tree walker ----------------------------------------------------------

type Walk = 'parent' | 'prev' | 'next' | 'child'

function neighbour(node: TreeNode | null, move: Walk): TreeNode | null {
  if (!node) return null
  const siblings = node.parent?.children ?? []
  const at = siblings.indexOf(node)
  switch (move) {
    case 'parent':
      return node.parent
    case 'child':
      return node.children[0] ?? null
    case 'prev':
      return at > 0 ? siblings[at - 1] : null
    case 'next':
      return at >= 0 && at < siblings.length - 1 ? siblings[at + 1] : null
  }
}

const walkButtons = [...walkEl.querySelectorAll<HTMLButtonElement>('button[data-walk]')]

function syncWalk(node: TreeNode | null): void {
  for (const button of walkButtons) {
    button.disabled = !neighbour(node, button.dataset.walk as Walk)
  }
}

for (const button of walkButtons) {
  button.addEventListener('click', () => {
    const target = neighbour(tree.api.selectedNode(), button.dataset.walk as Walk)
    if (!target) return
    stopTour()
    void tree.api.select(target)
  })
}

// --- search ----------------------------------------------------------------

const search = new Search(searchEl, searchInput, searchResults, {
  search: searchTree,
  where: creditMatch,
  onPick: (node) => {
    stopTour()
    void tree.api.select(node)
    if (sheetEnabled()) sheet.setState('half')
  },
})

$('search-open').addEventListener('click', () => search.open())
$('search-close').addEventListener('click', () => search.close())

// --- legend ---------------------------------------------------------------

function renderLegend(): void {
  legendList.replaceChildren()
  for (const era of ERAS) {
    const item = document.createElement('li')
    const swatch = document.createElement('i')
    swatch.className = 'dot'
    swatch.style.setProperty('--c', `#${era.color.toString(16).padStart(6, '0')}`)
    item.append(swatch, document.createTextNode(era.label))
    item.title = era.span
    legendList.append(item)
  }
  renderTagline()
  searchInput.placeholder = `Search ${tree.api.nodes().length} nodes and their creators`
}

/** The header subtitle, which the tour borrows to show its progress. */
function renderTagline(): void {
  taglineEl.textContent = `${tree.api.nodes().length} nodes · ${tree.api.root().children.length} lineages`
}

// --- year filter ---------------------------------------------------------

yearInput.addEventListener('input', () => {
  yearLimit = Number(yearInput.value)
  const atMax = yearLimit >= Number(yearInput.max)
  yearOutput.textContent = atMax ? 'all' : String(yearLimit)
  tree.api.refilter(atMax ? () => true : yearFilter)
  // A tour in progress is walking a list built under the old filter.
  resyncTour()
})

// --- actions --------------------------------------------------------------

function recentre(): void {
  stopTour()
  void tree.api.select('root')
}

function toggleTheme(): void {
  dark = !dark
  document.body.classList.toggle('theme-light', !dark)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#050506' : '#f3f5f9')
  tree.api.setTheme(dark ? 'dark' : 'light')
}

/**
 * The tour walks the entire tree, one node at a time, and stops the moment you
 * touch anything.
 *
 * Order is pre-order depth first: descend a lineage to its tip, then take the
 * next one. Every step is then a short hop between neighbours, which reads as a
 * walk through one family at a time rather than a series of teleports across
 * the ball. A chronological order would be defensible but it would throw the
 * view from Manchester to Cupertino and back on consecutive steps.
 *
 * Each step waits for its own flight to land before the dwell begins, so the
 * pace never runs ahead of the animation the way a fixed interval does.
 */
function tourOrder(): TreeNode[] {
  const order: TreeNode[] = []
  walk(tree.api.root(), (node) => {
    // Skip what the year filter has dimmed, but keep descending rather than
    // pruning: the filter is by year, and a branch can post-date the parent
    // that carries it.
    if (yearFilter(node)) order.push(node)
  })
  return order
}

/**
 * How long to hold once the flight lands. Long enough to read what is on the
 * card, and no longer: six hundred nodes at five seconds each is fifty minutes.
 */
function tourDwell(node: TreeNode): number {
  const summary = (node.data.summary as string | undefined) ?? ''
  const facts = (node.data.facts as string[] | undefined)?.length ?? 0
  return 1400 + Math.min(1900, summary.length * 4 + facts * 200)
}

/** A wait that the stop button can cut short. */
function tourPause(ms: number): Promise<void> {
  return new Promise((resolve) => {
    tourWake = resolve
    tourNap = window.setTimeout(() => {
      tourWake = null
      resolve()
    }, ms)
  })
}

function setTourPressed(on: boolean): void {
  for (const element of [tourButton, tourTab]) {
    element.setAttribute('aria-pressed', String(on))
  }
  tourLabel.textContent = on ? 'Stop' : 'Tour'
  tourIcon.className = on ? 'icon-stop' : 'icon-play'
  tourButton.title = on ? 'Stop the tour' : 'Walk the whole tree'
}

function showTourStep(index: number, node: TreeNode): void {
  taglineEl.textContent = `Tour ${index + 1} / ${tourWalk.length} · ${node.data.name}`
  // The tagline is hidden on a narrow phone, so the tab bar carries the count.
  tourTabLabel.textContent = `${index + 1}/${tourWalk.length}`
}

function stopTour(): void {
  if (!touring) return
  touring = false
  tourRun++
  clearTimeout(tourNap)
  // Wake the suspended step so it can see that it is stale and return, rather
  // than leaving a promise pending for the life of the page.
  tourWake?.()
  tourWake = null
  setTourPressed(false)
  tourTabLabel.textContent = 'Tour'
  renderTagline()
}

async function startTour(): Promise<void> {
  const run = ++tourRun
  touring = true
  setTourPressed(true)
  tourWalk = tourOrder()
  if (!tourWalk.length) {
    stopTour()
    return
  }

  // Carry on from wherever the reader already is, so pressing Tour on a node
  // continues the walk from there instead of jumping back to the root.
  const current = tree.api.selectedNode()
  const found = current ? tourWalk.indexOf(current) : -1
  tourAt = found >= 0 ? found : 0

  while (touring && run === tourRun) {
    const at = tourAt % tourWalk.length
    const node = tourWalk[at]
    showTourStep(at, node)
    try {
      // Resolves when the flight lands, so the pace can never run ahead of the
      // animation. A backgrounded tab stops firing frames and the tour waits
      // here until it comes back, which is the behaviour we want: do not swap
      // this for a timer that walks the whole tree while nobody is looking.
      await tree.api.select(node, true)
    } catch {
      // A step that cannot land would otherwise kill the loop silently and
      // leave the button stuck reading "Stop".
      stopTour()
      return
    }
    if (!touring || run !== tourRun) return
    // Warm the next stop's article while this one is being read.
    prefetch(wikiTitle(tourWalk[(at + 1) % tourWalk.length].id))
    await tourPause(tourDwell(node))
    if (!touring || run !== tourRun) return
    tourAt = at + 1
  }
}

function toggleTour(): void {
  if (touring) stopTour()
  else void startTour()
}

/** Keep the walk in step with the year filter without losing our place. */
function resyncTour(): void {
  if (!touring) return
  const current = tree.api.selectedNode()
  tourWalk = tourOrder()
  const found = current ? tourWalk.indexOf(current) : -1
  if (found >= 0) tourAt = found + 1
}

$('home').addEventListener('click', recentre)
// The blog, at #blog and #blog/<slug> so a post can be linked to.
const showNode = (id: string): void => void tree.api.select(id, true)
const blogLink = hasPosts() ? { label: 'Read what they wrote on the blog', open: () => openBlog(null, showNode) } : undefined
const showAgents = (): void => void openAgents(blogLink)
$('agents').addEventListener('click', showAgents)
mountAgentsIndicator($<HTMLButtonElement>('agents'), showAgents)

// The top bar button is for a desktop window; on a phone the same view is the
// Blog tab. Both are hidden together when there is nothing to read.
for (const id of ['blog', 'tab-blog']) {
  const button = $<HTMLButtonElement>(id)
  button.hidden = !hasPosts()
  button.addEventListener('click', () => openBlog(null, showNode))
}
const routeBlog = (): void => {
  const slug = blogRoute()
  if (slug !== null && hasPosts()) openBlog(slug, showNode)
}
window.addEventListener('hashchange', routeBlog)
routeBlog()
$('tour').addEventListener('click', toggleTour)
$('theme').addEventListener('click', toggleTheme)
$('tab-home').addEventListener('click', recentre)
$('tab-search').addEventListener('click', () => search.open())
$('tab-tour').addEventListener('click', toggleTour)
$('tab-theme').addEventListener('click', toggleTheme)

const filterTab = $('tab-filter')
filterTab.addEventListener('click', () => {
  const open = bottomEl.dataset.open !== 'true'
  bottomEl.dataset.open = String(open)
  filterTab.setAttribute('aria-pressed', String(open))
  // The drawer and an expanded sheet would stack on top of each other and leave
  // no canvas at all, so opening one collapses the other.
  if (open && sheetEnabled() && sheet.current !== 'peek') sheet.setState('peek')
})

$('menu').addEventListener('click', () => {
  const open = bottomEl.dataset.open !== 'true'
  bottomEl.dataset.open = String(open)
})

// --- layout sync ----------------------------------------------------------

matchMedia('(max-width: 860px)').addEventListener('change', syncLayout)
globalThis.addEventListener('resize', () => {
  if (sheetEnabled()) sheet.measure()
  syncSafeArea()
})
// A phone keyboard resizes the visual viewport but not the layout viewport, so
// this is the only event that fires when it opens or closes.
globalThis.visualViewport?.addEventListener('resize', syncSafeArea)
// Stop the page itself from bouncing on a phone; the canvas handles gestures.
for (const gesture of ['gesturestart', 'gesturechange', 'gestureend']) {
  document.addEventListener(gesture, (event) => event.preventDefault())
}
// WebKit can still start a page level pan from a touch that lands on the chrome.
// Anything that is not one of the few things meant to scroll or slide is held
// still. Non passive, because a passive listener cannot cancel a gesture.
//
// The scrollable parts get less than a free pass. A horizontal move is never
// allowed inside them, and a vertical one only while that element can really
// scroll that way. At the top or bottom of the content the gesture would chain
// to the page, which is exactly the rubber band that makes the menu feel loose.
const SCROLLERS = '.panel__body, .search__results, .agents__body, textarea'
let touchX = 0
let touchY = 0
document.addEventListener(
  'touchstart',
  (event) => {
    const touch = event.touches[0]
    if (!touch) return
    touchX = touch.clientX
    touchY = touch.clientY
  },
  { passive: true },
)
document.addEventListener(
  'touchmove',
  (event) => {
    if (event.touches.length > 1) {
      event.preventDefault()
      return
    }
    const target = event.target as Element | null
    // The year slider moves its own thumb.
    if (target?.closest('input[type="range"]')) return

    const scroller = target?.closest<HTMLElement>(SCROLLERS)
    const touch = event.touches[0]
    if (scroller && touch) {
      const dx = touch.clientX - touchX
      const dy = touch.clientY - touchY
      const vertical = Math.abs(dy) >= Math.abs(dx)
      const top = scroller.scrollTop <= 0
      const bottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1
      const canScroll = scroller.scrollHeight > scroller.clientHeight + 1
      if (vertical && canScroll && !(dy > 0 && top) && !(dy < 0 && bottom)) return
    }
    event.preventDefault()
  },
  { passive: false },
)
// The visual viewport can slide away from the page when a keyboard opens or a
// zoom slips through. Nothing here is meant to be panned, so put it back.
const holdViewport = (): void => {
  const viewport = globalThis.visualViewport
  if (viewport && viewport.scale <= 1.001 && (viewport.offsetLeft !== 0 || viewport.pageLeft !== 0)) {
    globalThis.scrollTo(0, 0)
  }
  if (document.documentElement.scrollLeft || document.documentElement.scrollTop) {
    globalThis.scrollTo(0, 0)
  }
}
globalThis.visualViewport?.addEventListener('scroll', holdViewport)
globalThis.addEventListener('scroll', holdViewport, { passive: true })

// Any hand on the canvas ends the tour. Without this it keeps pulling the view
// away every couple of seconds while you are trying to look at something, and
// the flight fights the drag. Escape works from anywhere, including the phone
// keyboard.
for (const event of ['pointerdown', 'wheel'] as const) {
  stageEl.addEventListener(event, () => stopTour(), { passive: true })
}
globalThis.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') stopTour()
  // "/" jumps to search, as it does nearly everywhere else.
  const typing = event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement
  if (event.key === '/' && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault()
    search.open()
  }
})

syncLayout()
panel.show(null)
syncWalk(null)

// Handy from the console: `binaryTree.api.gotoNode('unix')`.
Object.assign(globalThis, { binaryTree: tree })
