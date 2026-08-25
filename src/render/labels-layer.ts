/**
 * Labels, as pooled HTML elements projected over the canvas.
 *
 * HTML rather than sprites, for three reasons: text stays crisp at any DPI,
 * styling is plain CSS, and hiding a label costs one class toggle. With a few
 * hundred nodes only a few dozen labels can ever be legible at once, so the
 * layer sorts candidates by on-screen size, greedily places the biggest ones and
 * rejects anything that would collide with a label already placed.
 */

import type { PerspectiveCamera } from 'three'
import { Vector3 } from 'three'
import type { TreeNode } from '../model/types'
import type { Stage } from './stage'

export interface LabelsOptions {
  /** Hard cap on labels drawn at once. */
  maxLabels: number
  /** Nodes smaller than this (in ball units) never get a label. */
  minRadius: number
  /** Always label the root, the selection and the path to it. */
  alwaysShowPath: boolean
  /** Extra padding used by the collision test, in CSS pixels. */
  padding: number
  text: (node: TreeNode) => string
  /** Secondary text, rendered smaller. Return '' to omit. */
  detail: (node: TreeNode) => string
}

export const defaultLabelsOptions: LabelsOptions = {
  maxLabels: 44,
  minRadius: 0.0045,
  alwaysShowPath: true,
  padding: 3,
  text: (n) => n.data.name,
  detail: (n) => (typeof n.data.year === 'number' ? String(n.data.year) : ''),
}

interface Rect {
  x0: number
  y0: number
  x1: number
  y1: number
}

export class LabelsLayer {
  readonly element: HTMLDivElement
  private readonly options: LabelsOptions
  private readonly pool: HTMLDivElement[] = []
  private readonly world = new Vector3()
  private readonly placed: Rect[] = []
  private readonly projection = { x: 0, y: 0, depth: 0 }

  constructor(container: HTMLElement, options: Partial<LabelsOptions> = {}) {
    this.options = { ...defaultLabelsOptions, ...options }
    this.element = document.createElement('div')
    this.element.className = 'ct-labels'
    container.appendChild(this.element)
  }

  private acquire(index: number): HTMLDivElement {
    let el = this.pool[index]
    if (!el) {
      el = document.createElement('div')
      el.className = 'ct-label'
      el.innerHTML = '<span class="ct-label__name"></span><span class="ct-label__detail"></span>'
      this.element.appendChild(el)
      this.pool[index] = el
    }
    return el
  }

  update(nodes: TreeNode[], stage: Stage, radii: Float32Array): void {
    const { maxLabels, minRadius, alwaysShowPath, padding, text, detail } = this.options
    const { width, height } = stage.size
    const camera = stage.camera as PerspectiveCamera

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
    let used = 0

    for (const node of candidates) {
      if (used >= maxLabels) break

      this.world.set(node.view.x, node.view.y, node.view.z)
      const cameraDistance = this.world.distanceTo(camera.position)
      stage.project(this.world, this.projection)
      const { x, y, depth } = this.projection

      if (depth < -1 || depth > 1) continue
      if (x < -80 || y < -30 || x > width + 80 || y > height + 30) continue

      const r = radii[node.index]
      const fontSize = Math.max(10, Math.min(19, 9 + node.screenSize * 92))
      const label = text(node)
      const sub = detail(node)

      // Rough metrics are enough for collision: the labels are one short line.
      const w = label.length * fontSize * 0.53 + (sub ? sub.length * fontSize * 0.4 + 6 : 0)
      const h = fontSize * 1.35
      const offset = r * 0.5 * (height / (2 * Math.tan((camera.fov * Math.PI) / 360) * cameraDistance))
      const cx = x
      const cy = y - offset - h * 0.62

      const rect: Rect = {
        x0: cx - w / 2 - padding,
        y0: cy - h / 2 - padding,
        x1: cx + w / 2 + padding,
        y1: cy + h / 2 + padding,
      }

      const forced = node.state.selected || node.depth === 0
      if (!forced && this.collides(rect)) continue
      this.placed.push(rect)

      const el = this.acquire(used++)
      const nameEl = el.firstElementChild as HTMLElement
      const detailEl = el.lastElementChild as HTMLElement
      if (nameEl.textContent !== label) nameEl.textContent = label
      if (detailEl.textContent !== sub) detailEl.textContent = sub

      // Behind the ball's centre reads as further away.
      const behind = Math.max(0, Math.min(1, (cameraDistance - stage.distance) / 1.1))
      el.style.transform = `translate(-50%,-50%) translate(${cx.toFixed(1)}px,${cy.toFixed(1)}px)`
      el.style.fontSize = `${fontSize.toFixed(2)}px`
      el.style.opacity = (1 - behind * 0.72).toFixed(3)
      el.dataset.state = node.state.selected
        ? 'selected'
        : node.state.hovered
          ? 'hovered'
          : node.state.onPath
            ? 'path'
            : 'normal'
      el.hidden = false
    }

    for (let i = used; i < this.pool.length; i++) this.pool[i].hidden = true
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
  }
}
