/**
 * The The Binary Tree explorer.
 *
 * Everything here is application code: the library owns the ball, the layout and
 * the navigation, and this file wires it to a search box, a year filter, an info
 * panel and a legend.
 */

import {
  BinaryTree,
  ERAS,
  ERA_BY_ID,
  computerHistory,
  formatYear,
  loaders,
  pathToRoot,
  type TreeNode,
} from 'the-binary-tree'
import './style.css'

const KIND_LABELS: Record<string, string> = {
  machine: 'machine',
  processor: 'processor',
  os: 'operating system',
  language: 'language',
  network: 'network',
  device: 'device',
  component: 'component',
  concept: 'concept',
  group: 'lineage',
}

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

const stage = document.getElementById('stage') as HTMLDivElement
const panel = document.getElementById('panel') as HTMLElement
const searchInput = document.getElementById('search') as HTMLInputElement
const resultsList = document.getElementById('results') as HTMLUListElement
const yearInput = document.getElementById('year') as HTMLInputElement
const yearOutput = document.getElementById('year-out') as HTMLOutputElement
const legendList = document.getElementById('legend') as HTMLUListElement
const homeButton = document.getElementById('home') as HTMLButtonElement
const tourButton = document.getElementById('tour') as HTMLButtonElement
const themeButton = document.getElementById('theme') as HTMLButtonElement

let yearLimit = Number(yearInput.max)
let tourTimer: number | null = null
let tourIndex = 0
let dark = true

/** Dim anything that had not appeared yet at the year on the slider. */
const yearFilter = (node: TreeNode): boolean => {
  const year = node.data.year
  return typeof year !== 'number' || year <= yearLimit
}

const tree = new BinaryTree(
  { parent: stage },
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
        maxLabels: 40,
        detail: (n) => formatYear(n.data.year as number | undefined),
      },
    },
    interaction: {
      onNodeClick: () => stopTour(),
      onSelectionChange: (node) => renderPanel(node),
      onInit: () => {
        renderLegend()
        void tree.api.select('root', false)
      },
    },
  },
)

// --- info panel ------------------------------------------------------------

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text != null) node.textContent = text
  return node
}

function eraSwatch(era: string | undefined): HTMLElement {
  const dot = el('i')
  dot.style.background = `#${(ERA_BY_ID[era ?? '']?.color ?? 0x7c8798).toString(16).padStart(6, '0')}`
  return dot
}

function renderPanel(node: TreeNode | null): void {
  panel.replaceChildren()

  if (!node) {
    panel.append(el('p', 'panel__hint', 'Click a node to bring it to the centre.'))
    return
  }

  const data = node.data
  const era = ERA_BY_ID[(data.era as string) ?? '']

  if (era) {
    const badge = el('div', 'panel__era')
    badge.append(eraSwatch(data.era as string), document.createTextNode(era.label))
    panel.append(badge)
  }

  panel.append(el('h2', undefined, data.name))

  const meta = [
    formatYear(data.year as number | undefined),
    (data.origin as string) ?? '',
    KIND_LABELS[(data.kind as string) ?? ''] ?? '',
  ].filter(Boolean)
  if (meta.length) panel.append(el('p', 'panel__meta', meta.join(' · ')))

  if (data.summary) panel.append(el('p', 'panel__summary', data.summary as string))

  const facts = data.facts as string[] | undefined
  if (facts?.length) {
    const list = el('ul', 'panel__facts')
    for (const fact of facts) list.append(el('li', undefined, fact))
    panel.append(list)
  }

  const ancestors = pathToRoot(node).slice(0, -1)
  if (ancestors.length) {
    const path = el('ul', 'panel__path')
    for (const ancestor of ancestors) {
      const item = el('li')
      const button = el('button', undefined, ancestor.data.name)
      button.type = 'button'
      button.addEventListener('click', () => {
        stopTour()
        void tree.api.select(ancestor)
      })
      item.append(button)
      path.append(item)
    }
    panel.append(path)
  }

  if (node.children.length) {
    const wrap = el('ul', 'panel__children')
    wrap.append(el('li', 'panel__children-title', `Branches (${node.children.length})`))
    for (const child of node.children) {
      const item = el('li')
      const button = el('button')
      button.type = 'button'
      button.append(
        eraSwatch(child.data.era as string | undefined),
        el('span', 'result__name', child.data.name),
        el('span', 'result__year', formatYear(child.data.year as number | undefined)),
      )
      button.addEventListener('click', () => {
        stopTour()
        void tree.api.select(child)
      })
      item.append(button)
      wrap.append(item)
    }
    panel.append(wrap)
  }
}

// --- legend ----------------------------------------------------------------

function renderLegend(): void {
  legendList.replaceChildren()
  for (const era of ERAS) {
    const item = el('li')
    const swatch = el('i')
    swatch.style.background = `#${era.color.toString(16).padStart(6, '0')}`
    item.append(swatch, document.createTextNode(era.label))
    item.title = era.span
    legendList.append(item)
  }
}

// --- search ----------------------------------------------------------------

let searchTimer: number | null = null

function showResults(nodes: TreeNode[]): void {
  resultsList.replaceChildren()
  if (!nodes.length) {
    resultsList.hidden = true
    return
  }

  for (const node of nodes) {
    const item = el('li')
    item.setAttribute('role', 'option')
    const button = el('button')
    button.type = 'button'
    button.append(
      eraSwatch(node.data.era as string | undefined),
      el('span', 'result__name', node.data.name),
      el('span', 'result__year', formatYear(node.data.year as number | undefined)),
    )
    button.addEventListener('click', () => {
      stopTour()
      resultsList.hidden = true
      searchInput.value = ''
      void tree.api.select(node)
    })
    item.append(button)
    resultsList.append(item)
  }
  resultsList.hidden = false
}

searchInput.addEventListener('input', () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = window.setTimeout(() => {
    const query = searchInput.value.trim()
    showResults(query.length < 2 ? [] : tree.api.search(query, 10))
  }, 90)
})

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    searchInput.value = ''
    resultsList.hidden = true
    searchInput.blur()
    return
  }
  if (event.key === 'Enter') {
    const first = resultsList.querySelector('button')
    first?.click()
  }
})

document.addEventListener('pointerdown', (event) => {
  if (resultsList.hidden) return
  const target = event.target as Node
  if (!resultsList.contains(target) && target !== searchInput) resultsList.hidden = true
})

// --- year filter -----------------------------------------------------------

yearInput.addEventListener('input', () => {
  yearLimit = Number(yearInput.value)
  const atMax = yearLimit >= Number(yearInput.max)
  yearOutput.textContent = atMax ? 'all' : String(yearLimit)
  tree.api.refilter(atMax ? () => true : yearFilter)
})

// --- buttons ---------------------------------------------------------------

homeButton.addEventListener('click', () => {
  stopTour()
  void tree.api.select('root')
})

themeButton.addEventListener('click', () => {
  dark = !dark
  document.body.classList.toggle('theme-light', !dark)
  tree.api.setTheme(dark ? 'dark' : 'light')
})

function stopTour(): void {
  if (tourTimer == null) return
  clearInterval(tourTimer)
  tourTimer = null
  tourButton.setAttribute('aria-pressed', 'false')
}

function startTour(): void {
  tourButton.setAttribute('aria-pressed', 'true')
  const step = () => {
    void tree.api.select(TOUR[tourIndex % TOUR.length], true)
    tourIndex++
  }
  step()
  tourTimer = window.setInterval(step, 4200)
}

tourButton.addEventListener('click', () => {
  if (tourTimer == null) startTour()
  else stopTour()
})

// Handy from the console: `binaryTree.api.gotoNode('unix')`.
Object.assign(globalThis, { binaryTree: tree })

void tree.initPromise.then(() => {
  const count = tree.api.nodes().length
  const brand = document.querySelector('.brand__text span')
  if (brand) brand.textContent = `${count} nodes · 3D hyperbolic tree`
})
