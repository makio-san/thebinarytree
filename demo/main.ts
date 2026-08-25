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
  formatYear,
  loaders,
  wikiTitle,
  type TreeNode,
} from 'the-binary-tree'
import { Panel } from './ui/panel'
import { Search } from './ui/search'
import { Sheet } from './ui/sheet'
import { prefetch } from './wiki'
import './style.css'

const TOUR = [
  'root',
  'analytical-engine',
  'turing-machine',
  'colossus',
  'eniac',
  'manchester-baby',
  'transistor',
  'ibm-650',
  'turkey-first-computer',
  'system-360',
  'pdp-11',
  'unix',
  'intel-4004',
  'mos-6502',
  'apple-ii',
  'ibm-pc-5150',
  'c-language',
  'commodore-64',
  'arm1',
  'macintosh',
  'web',
  'linux',
  'iphone',
  'apple-m1',
  'transformer',
  'frontier-machine',
]

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

const isPhone = (): boolean => matchMedia('(max-width: 860px)').matches

let yearLimit = Number(yearInput.max)
let tourTimer: number | null = null
let tourIndex = 0
let dark = true

/** Dim anything that had not appeared yet at the year on the slider. */
const yearFilter = (node: TreeNode): boolean => {
  const year = node.data.year
  return typeof year !== 'number' || year <= yearLimit
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
        meta: (n) =>
          [(n.data.origin as string) ?? '', (n.data.kind as string) ?? '']
            .filter(Boolean)
            .join(' · '),
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
})

const sheet = new Sheet(panelEl, panelGrab, {
  peek: 118,
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
  const covered =
    state === 'full'
      ? height * 0.5
      : state === 'half'
        ? Math.min(height * 0.42, panelEl.offsetHeight * (1 - 0.46))
        : 118
  const tabbar = document.getElementById('tabbar')?.offsetHeight ?? 0
  tree.api.setSafeArea({ top: 56, bottom: Math.round(covered + tabbar * 0.35), right: 0, left: 0 })
}

function syncLayout(): void {
  const phone = isPhone()
  document.body.dataset.mode = phone ? 'phone' : 'desktop'
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
  search: (query, limit) => tree.api.search(query, limit),
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
    swatch.style.background = `#${era.color.toString(16).padStart(6, '0')}`
    item.append(swatch, document.createTextNode(era.label))
    item.title = era.span
    legendList.append(item)
  }
  const count = tree.api.nodes().length
  taglineEl.textContent = `${count} nodes · 14 lineages`
  searchInput.placeholder = `Search ${count} nodes`
}

// --- year filter ---------------------------------------------------------

yearInput.addEventListener('input', () => {
  yearLimit = Number(yearInput.value)
  const atMax = yearLimit >= Number(yearInput.max)
  yearOutput.textContent = atMax ? 'all' : String(yearLimit)
  tree.api.refilter(atMax ? () => true : yearFilter)
})

// --- actions --------------------------------------------------------------

function recentre(): void {
  stopTour()
  void tree.api.select('root')
}

function toggleTheme(): void {
  dark = !dark
  document.body.classList.toggle('theme-light', !dark)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#080a11' : '#f3f5f9')
  tree.api.setTheme(dark ? 'dark' : 'light')
}

function stopTour(): void {
  if (tourTimer == null) return
  clearInterval(tourTimer)
  tourTimer = null
  setTourPressed(false)
}

function setTourPressed(on: boolean): void {
  for (const id of ['tour', 'tab-tour']) {
    document.getElementById(id)?.setAttribute('aria-pressed', String(on))
  }
}

function startTour(): void {
  setTourPressed(true)
  const step = () => {
    const id = TOUR[tourIndex % TOUR.length]
    void tree.api.select(id, true)
    // Warm the next stop while this one is being read.
    prefetch(wikiTitle(TOUR[(tourIndex + 1) % TOUR.length]))
    tourIndex++
  }
  step()
  tourTimer = window.setInterval(step, 5200)
}

function toggleTour(): void {
  if (tourTimer == null) startTour()
  else stopTour()
}

$('home').addEventListener('click', recentre)
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
document.addEventListener('gesturestart', (event) => event.preventDefault())

syncLayout()
panel.show(null)
syncWalk(null)

// Handy from the console: `binaryTree.api.gotoNode('unix')`.
Object.assign(globalThis, { binaryTree: tree })
