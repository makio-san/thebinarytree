/**
 * Labels, as pooled HTML elements projected over the canvas.
 *
 * HTML rather than sprites, for three reasons: text stays crisp at any DPI,
 * styling is plain CSS, and hiding a label costs one attribute write. With a few
 * hundred nodes only a few dozen labels can ever be legible at once, so the
 * layer sorts candidates by on-screen size, greedily places the biggest ones and
 * rejects anything that would collide with a label already placed.
 *
 * Detail is progressive. Far out a label is a name. Closer in it gains a year,
 * then an origin line, then a sentence of summary. The card that appears when
 * you are right on top of a node is the same element, just allowed to say more,
 * so nothing pops in or out as you fly.
 */

import type { PerspectiveCamera } from 'three'
import { Vector3 } from 'three'
import type { TreeNode } from '../model/types'
import type { Stage } from './stage'

export type LabelTier = 'name' | 'meta' | 'card'

export interface LabelsOptions {
  /** Hard cap on labels drawn at once. */
  maxLabels: number
  /** Nodes with a smaller conformal radius than this never get a label. */
  minRadius: number
  /** Always label the root, the selection and the path to it. */
  alwaysShowPath: boolean
  /** Extra padding used by the collision test, in CSS pixels. */
  padding: number
  text: (node: TreeNode) => string
  /** Secondary text, rendered smaller next to the name. Return '' to omit. */
  detail: (node: TreeNode) => string
  /** Third line, shown from the `meta` tier up. Return '' to omit. */
  meta: (node: TreeNode) => string
  /** Body text, shown only at the `card` tier. Return '' to omit. */
  body: (node: TreeNode) => string
  /**
   * Conformal radius above which a label is promoted to the next tier. The
   * defaults are tuned so a node you have flown to gets a card and its
   * immediate neighbours get meta lines.
   */
  metaThreshold: number
  cardThreshold: number
  /**
   * Hard cap on full cards. Without it, sitting back far enough that ten
   * top-level branches all clear the card threshold fills the screen with
   * paragraphs and the tree disappears behind its own annotations.
   */
  maxCards: number
  /**
   * Multiplier on every computed font size. Label size is driven by the node's
   * conformal radius, which is viewport independent, so on a 375pt screen the
   * same label eats three times the proportional width it does on a desktop.
   */
  fontScale: number
}

export const defaultLabelsOptions: LabelsOptions = {
  maxLabels: 44,
  minRadius: 0.0045,
  alwaysShowPath: true,
  padding: 3,
  text: (n) => n.data.name,
  detail: (n) => (typeof n.data.year === 'number' ? String(n.data.year) : ''),
  meta: () => '',
  body: () => '',
  metaThreshold: 0.026,
  cardThreshold: 0.062,
  maxCards: 3,
  fontScale: 1,
}

interface Rect {
  x0: number
  y0: number
  x1: number
  y1: number
}

/**
 * One pooled label and what was last written to it.
 *
 * Every write to the page is compared against this first. A label that has not
 * changed costs nothing, and during a flight the only things that change on
 * most frames are its place, its scale and its opacity, all three of which the
 * compositor applies without the page being laid out or painted again.
 */
interface Slot {
  el: HTMLDivElement
  nameEl: HTMLElement
  detailEl: HTMLElement
  metaEl: HTMLElement
  bodyEl: HTMLElement
  /** Font size the text is laid out at, in CSS pixels. 0 before the first use. */
  font: number
  width: number
  tier: string
  state: string
  hidden: boolean
}

/**
 * Font sizes a label is laid out at. A label's size follows its node and
 * changes on every frame of a flight; setting that as the font size made the
 * browser shape, lay out and repaint the text of every label on every frame,
 * which cost more than drawing the whole tree. Instead the text is laid out at
 * the nearest of these steps and the difference is made up by a scale on the
 * element, which is free. The steps are close enough that the scale stays
 * within a few percent, so the glyphs never look stretched.
 */
const FONT_STEP = 1.14
/** How far the scale may drift before the label is laid out again at a new step. */
const SCALE_MIN = 0.9
const SCALE_MAX = 1.12

const stepFont = (size: number): number => {
  const k = Math.round(Math.log(size / 10) / Math.log(FONT_STEP))
  return Math.round(10 * Math.pow(FONT_STEP, k) * 100) / 100
}

/** Region of the canvas labels may occupy, in CSS pixels from each edge. */
export interface LabelInset {
  top: number
  right: number
  bottom: number
  left: number
}

export class LabelsLayer {
  readonly element: HTMLDivElement
  private readonly options: LabelsOptions
  private inset: LabelInset = { top: 0, right: 0, bottom: 0, left: 0 }
  private readonly pool: Slot[] = []
  private readonly world = new Vector3()
  private readonly placed: Rect[] = []
  private readonly projection = { x: 0, y: 0, depth: 0 }
  private onActivate: ((node: TreeNode) => void) | null = null
  private readonly bound = new Map<HTMLDivElement, TreeNode>()
  private shown = 0

  constructor(container: HTMLElement, options: Partial<LabelsOptions> = {}) {
    this.options = { ...defaultLabelsOptions, ...options }
    this.element = document.createElement('div')
    this.element.className = 'bt-labels'
    container.appendChild(this.element)
  }

  /**
   * Make labels clickable. Cards carry real text, and on a touch screen a word
   * is a much easier target than a sphere a few pixels across.
   */
  setActivateHandler(handler: (node: TreeNode) => void): void {
    this.onActivate = handler
    this.element.classList.add('bt-labels--interactive')
  }

  /**
   * Keep labels out of the given margins. Used for the bottom sheet on a phone:
   * a label placed behind it is not hidden, it is invisible and still occupying
   * a collision slot that a readable label could have had.
   */
  setInset(inset: Partial<LabelInset>): void {
    this.inset = { ...this.inset, ...inset }
  }

  private acquire(index: number): Slot {
    let slot = this.pool[index]
    if (!slot) {
      const el = document.createElement('div')
      el.className = 'bt-label'
      el.hidden = true
      el.innerHTML =
        '<span class="bt-label__line">' +
        '<span class="bt-label__name"></span>' +
        '<span class="bt-label__detail"></span>' +
        '</span>' +
        '<span class="bt-label__meta"></span>' +
        '<span class="bt-label__body"></span>'
      el.addEventListener('pointerdown', (event) => {
        const node = this.bound.get(el)
        if (!node || !this.onActivate) return
        event.stopPropagation()
        event.preventDefault()
        this.onActivate(node)
      })
      this.element.appendChild(el)
      const line = el.firstElementChild as HTMLElement
      slot = {
        el,
        nameEl: line.firstElementChild as HTMLElement,
        detailEl: line.lastElementChild as HTMLElement,
        metaEl: line.nextElementSibling as HTMLElement,
        bodyEl: el.lastElementChild as HTMLElement,
        font: 0,
        width: 0,
        tier: '',
        state: '',
        hidden: true,
      }
      this.pool[index] = slot
    }
    return slot
  }

  update(nodes: TreeNode[], stage: Stage, radii: Float32Array): void {
    const {
      maxLabels,
      minRadius,
      alwaysShowPath,
      padding,
      text,
      detail,
      meta,
      body,
      metaThreshold,
      cardThreshold,
      maxCards,
      fontScale,
    } = this.options
    const { width, height } = stage.size
    const camera = stage.camera as PerspectiveCamera

    // Zoom loosens the thresholds: pressing in should reveal more, not just
    // magnify what was already there. Cards are loosened far less than meta
    // lines, because a card is a paragraph and ten of them is a wall of text.
    const zoom = stage.zoom
    const metaCut = metaThreshold * (1 - zoom * 0.55)
    const cardCut = cardThreshold * (1 - zoom * 0.15)

    // Rank by apparent size, with the current path forced to the front so the
    // thing you just clicked never loses its label to a bigger neighbour.
    // `screenSize` rather than `radii`: the drawn radius is floored so the rim
    // stays visible, and a floored value would put the whole fringe in a tie.
    const candidates: TreeNode[] = []
    for (const node of nodes) {
      if (!node.visible) continue
      const forced =
        alwaysShowPath && (node.state.selected || node.state.onPath || node.depth === 0)
      if (!forced && (node.screenSize < minRadius || node.state.dimmed)) continue
      candidates.push(node)
    }

    candidates.sort((a, b) => {
      const fa = a.state.selected ? 3 : a.state.onPath || a.depth === 0 ? 2 : a.state.hovered ? 1 : 0
      const fb = b.state.selected ? 3 : b.state.onPath || b.depth === 0 ? 2 : b.state.hovered ? 1 : 0
      if (fa !== fb) return fb - fa
      return b.screenSize - a.screenSize
    })

    this.placed.length = 0
    this.bound.clear()
    let used = 0
    let cards = 0

    for (const node of candidates) {
      if (used >= maxLabels) break

      this.world.set(node.view.x, node.view.y, node.view.z)
      const cameraDistance = this.world.distanceTo(camera.position)
      stage.project(this.world, this.projection)
      const { x, y, depth } = this.projection

      if (depth < -1 || depth > 1) continue
      // Allowance for a label whose anchor is just off screen. Scaled to the
      // viewport, or on a phone every edge label is a clipped fragment.
      //
      // Cheap early cull on the anchor: anything well off canvas cannot produce
      // a visible label whatever its size. The inset is checked later against
      // the label's own box, because a label is drawn *above* its node and an
      // anchor that clears the app bar can still put its text underneath it.
      const slackX = Math.min(140, width * 0.1)
      const slackY = Math.min(60, height * 0.06)
      if (x < -slackX || x > width + slackX || y < -slackY || y > height + slackY) continue

      const r = radii[node.index]
      const size = node.screenSize
      // Candidates are sorted largest first, so the cap always spends its cards
      // on the nodes that dominate the view.
      const wantsCard = size >= cardCut || node.state.selected
      const tier: LabelTier =
        wantsCard && cards < maxCards ? 'card' : size >= metaCut || wantsCard ? 'meta' : 'name'

      const fontSize =
        Math.max(10, Math.min(tier === 'card' ? 21 : 18, 9 + size * 92 + zoom * 3)) * fontScale
      const label = text(node)
      const sub = detail(node)
      const metaText = tier === 'name' ? '' : meta(node)
      const bodyText = tier === 'card' ? body(node) : ''

      // Rough metrics are enough for collision: labels are one to four short
      // lines and the cost of being slightly wrong is a hidden neighbour.
      const nameWidth = label.length * fontSize * 0.53 + (sub ? sub.length * fontSize * 0.4 + 6 : 0)
      const bodyWidth = bodyText ? Math.min(320, fontSize * 17) : 0
      const w = Math.max(nameWidth, metaText ? metaText.length * fontSize * 0.4 : 0, bodyWidth)
      const bodyLines = bodyText ? Math.ceil((bodyText.length * fontSize * 0.46) / (bodyWidth || 1)) : 0
      const h = fontSize * (1.35 + (metaText ? 0.95 : 0) + bodyLines * 1.35)

      const projectedRadius =
        r * 0.5 * (height / (2 * Math.tan((camera.fov * Math.PI) / 360) * cameraDistance))
      const cx = x
      const cy = y - projectedRadius - h * 0.5 - 6

      const rect: Rect = {
        x0: cx - w / 2 - padding,
        y0: cy - h / 2 - padding,
        x1: cx + w / 2 + padding,
        y1: cy + h / 2 + padding,
      }

      // Hard boundary, applied to the box rather than the anchor. Something is
      // covering that region of the canvas, so a label there is not merely
      // cropped, it is invisible and still holding a collision slot a readable
      // label could have used.
      const { top, right, bottom, left } = this.inset
      if (rect.y0 < top || rect.y1 > height - bottom) continue
      if (rect.x1 < left || rect.x0 > width - right) continue

      const forced = node.state.selected || node.depth === 0
      if (!forced && this.collides(rect)) continue
      this.placed.push(rect)
      // Counted only once placed: a card rejected for collision must not use up
      // the budget of one that would have fitted.
      if (tier === 'card') cards++

      const slot = this.acquire(used++)
      const el = slot.el
      this.bound.set(el, node)

      if (slot.nameEl.textContent !== label) slot.nameEl.textContent = label
      if (slot.detailEl.textContent !== sub) slot.detailEl.textContent = sub
      if (slot.metaEl.textContent !== metaText) slot.metaEl.textContent = metaText
      if (slot.bodyEl.textContent !== bodyText) slot.bodyEl.textContent = bodyText

      // Lay the text out at a step and scale the rest of the way. See FONT_STEP.
      let scale = slot.font > 0 ? fontSize / slot.font : 0
      if (scale < SCALE_MIN || scale > SCALE_MAX) {
        slot.font = stepFont(fontSize)
        el.style.fontSize = `${slot.font}px`
        scale = fontSize / slot.font
      }
      const laidWidth = bodyWidth ? Math.round(Math.min(320, slot.font * 17)) : 0
      if (laidWidth && laidWidth !== slot.width) {
        slot.width = laidWidth
        el.style.setProperty('--bt-label-width', `${laidWidth}px`)
      }

      // Behind the ball's centre reads as further away.
      const behind = Math.max(0, Math.min(1, (cameraDistance - stage.distance) / 1.1))
      el.style.transform = `translate(-50%,-50%) translate(${cx.toFixed(1)}px,${cy.toFixed(1)}px) scale(${scale.toFixed(3)})`
      el.style.opacity = (1 - behind * 0.72).toFixed(2)
      if (slot.tier !== tier) {
        slot.tier = tier
        el.dataset.tier = tier
      }
      const state = node.state.selected
        ? 'selected'
        : node.state.hovered
          ? 'hovered'
          : node.state.onPath
            ? 'path'
            : 'normal'
      if (slot.state !== state) {
        slot.state = state
        el.dataset.state = state
      }
      if (slot.hidden) {
        slot.hidden = false
        el.hidden = false
      }
    }

    // Only the slots that were showing a moment ago can need hiding.
    for (let i = used; i < this.shown; i++) {
      const slot = this.pool[i]
      if (!slot.hidden) {
        slot.hidden = true
        slot.el.hidden = true
      }
    }
    this.shown = used
  }

  private collides(rect: Rect): boolean {
    for (const other of this.placed) {
      if (rect.x0 < other.x1 && rect.x1 > other.x0 && rect.y0 < other.y1 && rect.y1 > other.y0) {
        return true
      }
    }
    return false
  }

  dispose(): void {
    this.element.remove()
    this.pool.length = 0
    this.bound.clear()
  }
}
