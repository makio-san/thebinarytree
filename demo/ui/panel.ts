/**
 * The detail panel: a card on desktop, a bottom sheet on a phone.
 *
 * The same renderer feeds both. Content arrives in two waves - everything from
 * the dataset paints immediately, and the Wikipedia image and extract fill in
 * when they land. The layout reserves space for the image up front so the text
 * does not jump when it arrives.
 */

import {
  ERA_BY_ID,
  creatorsOf,
  creditsOf,
  descendants,
  formatYear,
  portraitOf,
  wikiFile,
  wikiTitle,
  wikiUrl,
} from 'the-binary-tree'
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
  /** A credited name was clicked: show what else carries it. */
  onCreator: (name: string) => void
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

function eraHex(era: string | undefined): string {
  return `#${(ERA_BY_ID[era ?? '']?.color ?? 0x7c8798).toString(16).padStart(6, '0')}`
}

function eraDot(era: string | undefined): HTMLElement {
  const dot = el('i', 'dot')
  dot.style.setProperty('--c', eraHex(era))
  return dot
}

/**
 * Show a picture large, over the page, until the next click or Escape.
 *
 * The small version is shown at once and the full one swapped in when it has
 * loaded, so a multi-megabyte original never leaves the reader looking at an
 * empty frame.
 */
function lightbox(full: string, preview: string, alt: string, caption: HTMLElement): void {
  const overlay = el('div', 'lightbox')
  overlay.setAttribute('role', 'dialog')
  overlay.setAttribute('aria-modal', 'true')
  overlay.setAttribute('aria-label', alt)
  const img = el('img')
  img.alt = alt
  img.src = preview
  if (full !== preview) {
    const large = new Image()
    large.addEventListener('load', () => {
      img.src = full
    })
    large.src = full
  }
  const note = el('p', 'lightbox__caption')
  note.append(...[...caption.childNodes].map((n) => n.cloneNode(true)))
  const close = el('button', 'icon-btn lightbox__close')
  close.type = 'button'
  close.setAttribute('aria-label', 'Close')
  close.append(el('span', 'icon-x'))
  overlay.append(img, note, close)

  const dismiss = (): void => {
    overlay.remove()
    document.removeEventListener('keydown', onKey, true)
  }
  const onKey = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape') return
    event.stopPropagation()
    dismiss()
  }
  overlay.addEventListener('click', (event) => {
    // The source link in the caption is the one thing that should not close it.
    if ((event.target as HTMLElement).closest('a')) return
    dismiss()
  })
  document.addEventListener('keydown', onKey, true)
  document.body.append(overlay)
  close.focus()
}

/** Two letters to stand in for a portrait: first and last initial. */
function initials(name: string): string {
  // Drop a parenthetical title, so "William Thomson (Lord Kelvin)" is WT.
  const words = name.replace(/\(.*?\)/g, '').split(/[\s-]+/).filter((w) => /^\p{L}/u.test(w))
  if (!words.length) return '?'
  const first = words[0][0]
  const last = words.length > 1 ? words[words.length - 1][0] : ''
  return (first + last).toUpperCase()
}

/**
 * Size and place a photograph inside its round frame so the face is what shows.
 *
 * Everything is in percent of the frame, so the same numbers hold at any avatar
 * size. Without a measured face this is an ordinary cover crop biased to the
 * upper part of the picture, which is where a portrait keeps its subject. With
 * one, the picture is enlarged until the face fills about half the frame and
 * slid so the face sits in the middle: that is what turns a photograph of
 * someone at a lectern into a picture of them.
 */
function frame(
  img: HTMLImageElement,
  width: number,
  height: number,
  face?: { x: number; y: number; h: number },
): void {
  if (!width || !height) {
    img.style.cssText = 'inset:0;width:100%;height:100%;object-fit:cover'
    return
  }
  const short = Math.min(width, height)
  const zoom = face ? Math.min(6, Math.max(1, (0.5 * short) / ((face.h / 100) * height))) : 1
  const w = (100 * zoom * width) / short
  const h = (100 * zoom * height) / short
  const clamp = (value: number, size: number) => Math.min(0, Math.max(100 - size, value))
  img.style.width = `${w}%`
  img.style.height = `${h}%`
  img.style.left = `${clamp(50 - ((face?.x ?? 50) / 100) * w, w)}%`
  img.style.top = `${clamp(50 - ((face?.y ?? 36) / 100) * h, h)}%`
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

  /** Node names by id, built once: the tree does not change under the panel. */
  private nameIndex: Map<string, string> | null = null

  private names(node: TreeNode): Map<string, string> {
    if (this.nameIndex) return this.nameIndex
    let top = node
    while (top.parent) top = top.parent
    this.nameIndex = new Map(descendants(top).map((n) => [n.id, n.data.name as string]))
    return this.nameIndex
  }

  /** A list of people. Each row searches for everything that carries the name. */
  private people(heading: string, rows: { name: string; note: string }[]): HTMLElement {
    const section = el('section', 'people')
    section.append(el('h3', undefined, heading))
    const list = el('ul', 'people__list')
    for (const { name, note } of rows) {
      const item = el('li')
      const button = el('button', 'person')
      button.type = 'button'
      button.title = `Find everything credited to ${name}`
      const avatar = el('span', 'person__avatar', initials(name))
      avatar.setAttribute('aria-hidden', 'true')
      this.portrait(name, avatar)
      const text = el('span', 'person__text')
      text.append(el('span', 'person__name', name))
      if (note) text.append(el('span', 'person__note', note))
      const arrow = el('span', 'icon-right person__go')
      arrow.setAttribute('aria-hidden', 'true')
      button.append(avatar, text, arrow)
      button.addEventListener('click', () => this.handlers.onCreator(name))
      item.append(button)
      list.append(item)
    }
    section.append(list)
    return section
  }

  /**
   * Lay a photograph over the initials, once it has actually loaded.
   *
   * Only for names in the checked table: looking a bare name up would put a
   * racing driver on the Netscape card. The initials stay underneath, so a slow
   * or failed image costs nothing.
   */
  private portrait(name: string, avatar: HTMLElement): void {
    const portrait = portraitOf(name)
    if (!portrait) return
    const source: Promise<{ url: string; width: number; height: number } | null | undefined> =
      portrait.title.startsWith('File:')
        ? fetchFile(portrait.title)
        : fetchSummary(portrait.title).then((summary) => summary?.image)
    void source.then((image) => {
      if (!image || !avatar.isConnected) return
      const img = el('img')
      img.alt = ''
      img.decoding = 'async'
      if (portrait.logo) avatar.dataset.kind = 'logo'
      else frame(img, image.width, image.height, portrait.face)
      img.addEventListener('load', () => {
        avatar.dataset.photo = 'true'
      })
      img.addEventListener('error', () => img.remove())
      img.src = image.url
      avatar.append(img)
    })
  }

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

    // The card takes its accent from the era, so a tube machine and a present
    // day one do not look like the same page with different words on it.
    this.root.style.setProperty('--era', eraHex(data.era as string | undefined))

    // --- hero: picture, then the name sitting on its lower edge ---
    const title = wikiTitle(node.id)
    // Nodes whose article has no usable lead image carry a named Commons file
    // instead, so the slot is worth reserving for those too.
    const file = wikiFile(node.id)
    const hero = el('header', 'hero')
    const figure = el('figure', 'figure')
    if (title || file) {
      figure.dataset.state = 'loading'
      figure.append(el('div', 'figure__placeholder'))
    } else {
      figure.dataset.state = 'empty'
    }
    const heading = el('div', 'hero__text')
    if (era) {
      const badge = el('div', 'badge')
      badge.append(eraDot(data.era as string | undefined), document.createTextNode(era.label))
      badge.title = era.span
      heading.append(badge)
    }
    heading.append(el('h2', undefined, data.name))
    hero.append(figure, heading)
    this.body.append(hero)

    // --- the three things people ask first ---
    const spec = el('dl', 'spec')
    const addSpec = (label: string, value: string) => {
      if (!value) return
      const cell = el('div', 'spec__cell')
      cell.append(el('dt', undefined, label), el('dd', undefined, value))
      spec.append(cell)
    }
    addSpec('Year', formatYear(data.year as number | undefined))
    addSpec('Origin', (data.origin as string) ?? '')
    addSpec('Type', KIND_LABELS[(data.kind as string) ?? ''] ?? '')
    if (spec.childElementCount) this.body.append(spec)

    // --- who made it ---
    const creators = creatorsOf(node.id)
    if (creators.length) {
      const names = this.names(node)
      const people = creators.map((name) => {
        const others = creditsOf(name)
          .filter((id) => id !== node.id)
          .map((id) => names.get(id))
          .filter((n): n is string => Boolean(n))
        const also =
          others.length > 2
            ? `Also ${others.slice(0, 2).join(', ')} +${others.length - 2}`
            : others.length
              ? `Also ${others.join(', ')}`
              : ''
        return { name, note: also }
      })
      const section = this.people(creators.length > 1 ? 'Created by' : 'Creator', people)
      // Marked so the sheet can lift it above the picture: see style.css.
      section.classList.add('people--own')
      this.body.append(section)
    }

    // --- our own text ---
    if (data.summary) this.body.append(el('p', 'summary', data.summary as string))

    const facts = data.facts as string[] | undefined
    if (facts?.length) {
      const list = el('ul', 'facts')
      for (const fact of facts) list.append(el('li', undefined, fact))
      this.body.append(list)
    }

    // --- a branch's people ---
    if (!creators.length && node.children.length) {
      // A branch has no maker of its own, so it lists whoever appears most
      // often beneath it. On the root that is the short list of people the
      // whole history keeps coming back to.
      const tally = new Map<string, number>()
      for (const n of descendants(node)) {
        for (const name of creatorsOf(n.id)) tally.set(name, (tally.get(name) ?? 0) + 1)
      }
      const top = [...tally].sort((a, b) => b[1] - a[1]).slice(0, 6)
      if (top.length) {
        this.body.append(
          this.people(
            'Key people',
            top.map(([name, count]) => ({ name, note: count === 1 ? '1 work here' : `${count} works here` })),
          ),
        )
      }
    }

    // --- statistics, cheap and genuinely informative ---
    const stats = el('dl', 'stats')
    const subtree = descendants(node)
    const leaves = subtree.filter((n) => n.children.length === 0).length
    // Each stat is its own grid cell holding both terms. A flat run of dt/dd
    // children lets the grid interleave them and the pairing falls apart.
    const addStat = (label: string, value: string, meaning: string) => {
      const cell = el('div', 'stat')
      cell.title = meaning
      cell.append(el('dt', undefined, label), el('dd', undefined, value))
      stats.append(cell)
    }
    // Short labels: four of these share one row on a phone.
    addStat('Depth', String(node.depth), 'Steps from the root of the tree')
    addStat('Branches', String(node.children.length), 'Nodes that come directly from this one')
    if (subtree.length > 1) addStat('Nodes', String(subtree.length - 1), 'Everything that descends from this one')
    if (leaves > 1) addStat('Leaves', String(leaves), 'Descendants with nothing after them')
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
    /** The largest version worth showing when the picture is enlarged. */
    full: string,
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
    // The picture enlarges in place rather than opening its file in a new tab.
    // The caption still links to where it came from, which is where the author
    // and the licence are.
    const zoom = el('button', 'figure__zoom')
    zoom.type = 'button'
    zoom.setAttribute('aria-label', `Enlarge the picture of ${alt}`)
    zoom.append(img)
    zoom.addEventListener('click', () => lightbox(full, image.url, alt, caption))
    figure.replaceChildren(zoom, caption)
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
    this.paint(figure, image, node.data.name as string, image.url, sourceCaption(image.name, image.source))
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
        summary.original ?? summary.image.url,
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
