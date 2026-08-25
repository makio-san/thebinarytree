/**
 * The detail panel: a card on desktop, a bottom sheet on a phone.
 *
 * The same renderer feeds both. Content arrives in two waves - everything from
 * the dataset paints immediately, and the Wikipedia image and extract fill in
 * when they land. The layout reserves space for the image up front so the text
 * does not jump when it arrives.
 */

import { ERA_BY_ID, descendants, formatYear, wikiTitle, wikiUrl } from 'the-binary-tree'
import type { TreeNode } from 'the-binary-tree'
import { fetchSummary, type WikiSummary } from '../wiki'

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

export interface PanelHandlers {
  onNavigate: (node: TreeNode) => void
}

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

function eraDot(era: string | undefined): HTMLElement {
  const dot = el('i', 'dot')
  const hex = (ERA_BY_ID[era ?? '']?.color ?? 0x7c8798).toString(16).padStart(6, '0')
  dot.style.background = `#${hex}`
  return dot
}

/** A node's own row in a list: colour, name, year. */
function nodeRow(node: TreeNode, onNavigate: (n: TreeNode) => void): HTMLLIElement {
  const item = el('li')
  const button = el('button')
  button.type = 'button'
  button.append(
    eraDot(node.data.era as string | undefined),
    el('span', 'row__name', node.data.name),
    el('span', 'row__year', formatYear(node.data.year as number | undefined)),
  )
  button.addEventListener('click', () => onNavigate(node))
  item.append(button)
  return item
}

export class Panel {
  private node: TreeNode | null = null
  /** Cancels an in-flight lookup when the selection moves on. */
  private pending: AbortController | null = null

  constructor(
    private readonly root: HTMLElement,
    private readonly body: HTMLElement,
    private readonly summaryLine: HTMLElement,
    private readonly handlers: PanelHandlers,
  ) {}

  /** The short line shown in the sheet's peek state. */
  private renderPeek(node: TreeNode | null): void {
    this.summaryLine.replaceChildren()
    if (!node) {
      this.summaryLine.append(el('span', 'peek__hint', 'Tap a node to open it'))
      return
    }
    const era = ERA_BY_ID[(node.data.era as string) ?? '']
    this.summaryLine.append(
      eraDot(node.data.era as string | undefined),
      el('span', 'peek__name', node.data.name),
      el(
        'span',
        'peek__meta',
        [formatYear(node.data.year as number | undefined), era?.label].filter(Boolean).join(' · '),
      ),
    )
  }

  show(node: TreeNode | null): void {
    this.node = node
    this.pending?.abort()
    this.pending = null

    this.renderPeek(node)
    this.body.replaceChildren()
    this.body.scrollTop = 0

    if (!node) {
      this.root.dataset.empty = 'true'
      this.body.append(
        el(
          'p',
          'hint',
          'Drag a node to pull it through hyperbolic space, or drag the backdrop to orbit. Scroll to fly inside the ball.',
        ),
      )
      return
    }
    this.root.dataset.empty = 'false'

    const data = node.data
    const era = ERA_BY_ID[(data.era as string) ?? '']

    // --- header ---
    if (era) {
      const badge = el('div', 'badge')
      badge.append(eraDot(data.era as string | undefined), document.createTextNode(era.label))
      badge.title = era.span
      this.body.append(badge)
    }

    this.body.append(el('h2', undefined, data.name))

    const meta = [
      formatYear(data.year as number | undefined),
      (data.origin as string) ?? '',
      KIND_LABELS[(data.kind as string) ?? ''] ?? '',
    ].filter(Boolean)
    if (meta.length) this.body.append(el('p', 'meta', meta.join(' · ')))

    // --- image slot, filled in later ---
    const title = wikiTitle(node.id)
    const figure = el('figure', 'figure')
    if (title) {
      figure.dataset.state = 'loading'
      figure.append(el('div', 'figure__placeholder'))
      this.body.append(figure)
    }

    // --- our own text ---
    if (data.summary) this.body.append(el('p', 'summary', data.summary as string))

    const facts = data.facts as string[] | undefined
    if (facts?.length) {
      const list = el('ul', 'facts')
      for (const fact of facts) list.append(el('li', undefined, fact))
      this.body.append(list)
    }

    // --- statistics, cheap and genuinely informative ---
    const stats = el('dl', 'stats')
    const subtree = descendants(node)
    const leaves = subtree.filter((n) => n.children.length === 0).length
    // Each stat is its own grid cell holding both terms. A flat run of dt/dd
    // children lets the grid interleave them and the pairing falls apart.
    const addStat = (label: string, value: string) => {
      const cell = el('div', 'stat')
      cell.append(el('dt', undefined, label), el('dd', undefined, value))
      stats.append(cell)
    }
    addStat('Depth', String(node.depth))
    addStat('Branches', String(node.children.length))
    if (subtree.length > 1) addStat('Descendants', String(subtree.length - 1))
    if (leaves > 1) addStat('Leaves', String(leaves))
    this.body.append(stats)

    // --- Wikipedia extract slot ---
    const extract = el('div', 'extract')
    if (title) {
      extract.dataset.state = 'loading'
      extract.append(el('p', 'extract__skeleton'))
      this.body.append(extract)
    }

    // --- lineage ---
    const ancestors: TreeNode[] = []
    for (let n = node.parent; n; n = n.parent) ancestors.unshift(n)
    if (ancestors.length) {
      const section = el('section', 'section')
      section.append(el('h3', undefined, 'Lineage'))
      const path = el('ol', 'path')
      for (const ancestor of ancestors) {
        const item = el('li')
        const button = el('button', undefined, ancestor.data.name)
        button.type = 'button'
        button.addEventListener('click', () => this.handlers.onNavigate(ancestor))
        item.append(button)
        path.append(item)
      }
      section.append(path)
      this.body.append(section)
    }

    // --- children ---
    if (node.children.length) {
      const section = el('section', 'section')
      section.append(el('h3', undefined, `Branches (${node.children.length})`))
      const list = el('ul', 'rows')
      for (const child of node.children) {
        list.append(nodeRow(child, this.handlers.onNavigate))
      }
      section.append(list)
      this.body.append(section)
    }

    // --- siblings, useful for "what else came out of this" ---
    const siblings = node.parent?.children.filter((n) => n !== node) ?? []
    if (siblings.length) {
      const section = el('section', 'section')
      section.append(el('h3', undefined, `Siblings (${siblings.length})`))
      const list = el('ul', 'rows')
      for (const sibling of siblings.slice(0, 12)) {
        list.append(nodeRow(sibling, this.handlers.onNavigate))
      }
      section.append(list)
      this.body.append(section)
    }

    if (!title) return

    // --- second wave ---
    const controller = new AbortController()
    this.pending = controller
    void fetchSummary(title, controller.signal).then((summary) => {
      if (controller.signal.aborted || this.node !== node) return
      this.fillWiki(node, title, summary, figure, extract)
    })
  }

  private fillWiki(
    node: TreeNode,
    title: string,
    summary: WikiSummary | null,
    figure: HTMLElement,
    extract: HTMLElement,
  ): void {
    figure.replaceChildren()
    extract.replaceChildren()

    if (!summary) {
      figure.dataset.state = 'empty'
      extract.dataset.state = 'empty'
      return
    }

    if (summary.image) {
      figure.dataset.state = 'ready'
      const img = el('img')
      img.src = summary.image.url
      if (summary.image.width) img.width = summary.image.width
      if (summary.image.height) img.height = summary.image.height
      img.alt = node.data.name
      // Eager, not lazy: this is the picture of the thing the reader just asked
      // for, and a lazy image inside a panel that is already open never loads at
      // all if the tab is not being composited.
      img.loading = 'eager'
      img.fetchPriority = 'high'
      img.decoding = 'async'
      // An image that fails leaves the frame rather than a broken icon.
      img.addEventListener('error', () => {
        figure.dataset.state = 'empty'
        figure.replaceChildren()
      })
      const link = el('a')
      link.href = summary.original ?? summary.url
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      link.append(img)
      figure.append(link)
      figure.append(el('figcaption', undefined, 'Image: Wikimedia Commons'))
    } else {
      figure.dataset.state = 'empty'
    }

    extract.dataset.state = 'ready'
    extract.append(el('h3', undefined, 'From Wikipedia'))
    extract.append(el('p', undefined, summary.extract))
    const link = el('a', 'extract__link', `Read the full article`)
    link.href = summary.url || wikiUrl(title)
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    extract.append(link)
  }
}
