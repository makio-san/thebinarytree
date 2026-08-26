/**
 * The detail panel: a card on desktop, a bottom sheet on a phone.
 *
 * The same renderer feeds both. Content arrives in two waves - everything from
 * the dataset paints immediately, and the Wikipedia image and extract fill in
 * when they land. The layout reserves space for the image up front so the text
 * does not jump when it arrives.
 */

import { ERA_BY_ID, descendants, formatYear, wikiFile, wikiTitle, wikiUrl } from 'the-binary-tree'
import type { TreeNode } from 'the-binary-tree'
import { fetchFile, fetchSummary, type WikiImage, type WikiSummary } from '../wiki'

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

/** "Image from <article>", linked to where the picture actually came from. */
function sourceCaption(name: string, href: string): HTMLElement {
  const caption = el('figcaption')
  // File names run long - the Dartmouth proposal's is over a hundred characters
  // - and a caption three lines deep pushes the text off the card. Trim the
  // label, keep the whole thing on hover.
  const label = name.length > 64 ? `${name.slice(0, 63).trimEnd()}…` : name
  const link = el('a', undefined, label)
  if (label !== name) link.title = name
  link.href = href
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  caption.append(document.createTextNode('Image from '), link)
  return caption
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
    // Nodes whose article has no usable lead image carry a named Commons file
    // instead, so the slot is worth reserving for those too.
    const file = wikiFile(node.id)
    const figure = el('figure', 'figure')
    if (title || file) {
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

    if (!title && !file) return

    // --- second wave ---
    const controller = new AbortController()
    this.pending = controller
    if (!title) {
      void this.fillFile(node, file as string, figure, controller)
      return
    }
    void fetchSummary(title, controller.signal).then((summary) => {
      if (controller.signal.aborted || this.node !== node) return
      this.fillWiki(node, title, summary, figure, extract, file)
    })
  }

  /**
   * Paint a picture into the reserved slot: linked to where it came from, eager
   * rather than lazy, and captioned with its source.
   */
  private paint(
    figure: HTMLElement,
    image: { url: string; width: number; height: number },
    alt: string,
    href: string,
    caption: HTMLElement,
  ): void {
    figure.dataset.state = 'ready'
    const img = el('img')
    img.src = image.url
    if (image.width) img.width = image.width
    if (image.height) img.height = image.height
    img.alt = alt
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
    link.href = href
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.append(img)
    figure.replaceChildren(link, caption)
  }

  /** The named-file path, for articles whose lead image is not free. */
  private async fillFile(
    node: TreeNode,
    file: string,
    figure: HTMLElement,
    controller: AbortController,
  ): Promise<void> {
    const image = await fetchFile(file, controller.signal)
    if (controller.signal.aborted || this.node !== node) return
    if (!image) {
      figure.dataset.state = 'empty'
      figure.replaceChildren()
      return
    }
    this.paintFile(node, image, figure)
  }

  private paintFile(node: TreeNode, image: WikiImage, figure: HTMLElement): void {
    // Name the file, not the article: this picture was chosen from further down
    // the page than the summary looks, so the article title would misdescribe it.
    this.paint(figure, image, node.data.name as string, image.source, sourceCaption(image.name, image.source))
  }

  private fillWiki(
    node: TreeNode,
    title: string,
    summary: WikiSummary | null,
    figure: HTMLElement,
    extract: HTMLElement,
    file?: string,
  ): void {
    figure.replaceChildren()
    extract.replaceChildren()

    if (!summary) {
      figure.dataset.state = 'empty'
      extract.dataset.state = 'empty'
      return
    }

    if (summary.image) {
      // Name the source article rather than the repository. Many of these
      // pictures come from a person's or a machine's page rather than the node's
      // own, because that is where the free image lives, so an unlabelled
      // portrait on an algorithm's card reads as a mistake. "Image from Toru
      // Iwatani" makes the substitution legible instead.
      this.paint(
        figure,
        summary.image,
        node.data.name as string,
        summary.original ?? summary.url,
        sourceCaption(summary.title, summary.url || wikiUrl(title)),
      )
    } else if (file && this.pending) {
      // The article is right but its lead image is not free. Fall back to the
      // file chosen for this node, which lives further down the same page.
      void this.fillFile(node, file, figure, this.pending)
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
