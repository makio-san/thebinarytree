/**
 * Parent/child links, drawn as geodesic arcs of the Poincare ball.
 *
 * A straight Euclidean line between two ball points is wrong: hyperbolic
 * geodesics bow away from the boundary. Sampling `geodesicPoint` gives the
 * correct arc, and gives the whole picture its characteristic curved-web look.
 *
 * All arcs live in one BufferGeometry. Visible links are packed to the front of
 * the buffer each frame and `setDrawRange` hides the rest, so culled subtrees
 * cost nothing to skip.
 */

import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DynamicDrawUsage,
  LineBasicMaterial,
  LineSegments,
} from 'three'
import { geodesicPoint, lengthSq } from '../math'
import type { Tree, TreeNode } from '../model/types'
import type { Theme } from './theme'

export interface LinksOptions {
  /** Sub-segments per arc. More is smoother; 14 is already hard to fault. */
  segments: number
  /** Skip links whose visible extent is below this, in ball units. */
  minExtent: number
  opacity: number
  color: (node: TreeNode, theme: Theme) => number
}

export const defaultLinksOptions: LinksOptions = {
  segments: 14,
  minExtent: 0.0012,
  opacity: 0.92,
  color: (n, theme) => theme.eraColor(n.data.era as string | undefined),
}

export class LinksLayer {
  readonly lines: LineSegments

  private readonly options: LinksOptions
  private readonly positionAttribute: BufferAttribute
  private readonly colorAttribute: BufferAttribute
  private readonly positions: Float32Array
  private readonly colors: Float32Array
  private readonly geometry: BufferGeometry
  private readonly material: LineBasicMaterial
  private readonly a = new Color()
  private readonly b = new Color()
  private readonly background = new Color()
  private readonly highlight = new Color()

  constructor(private readonly tree: Tree, theme: Theme, options: Partial<LinksOptions> = {}) {
    this.options = { ...defaultLinksOptions, ...options }
    const vertices = tree.links.length * this.options.segments * 2

    // Own the attributes rather than the raw arrays: `Float32BufferAttribute`
    // copies whatever you hand it, so writing to a separate array would upload
    // nothing and draw no links at all.
    this.positionAttribute = new BufferAttribute(new Float32Array(vertices * 3), 3)
    this.colorAttribute = new BufferAttribute(new Float32Array(vertices * 3), 3)
    this.positionAttribute.setUsage(DynamicDrawUsage)
    this.colorAttribute.setUsage(DynamicDrawUsage)
    this.positions = this.positionAttribute.array as Float32Array
    this.colors = this.colorAttribute.array as Float32Array

    this.geometry = new BufferGeometry()
    this.geometry.setAttribute('position', this.positionAttribute)
    this.geometry.setAttribute('color', this.colorAttribute)
    this.geometry.setDrawRange(0, 0)

    this.material = new LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: this.options.opacity,
      depthWrite: false,
    })

    this.lines = new LineSegments(this.geometry, this.material)
    this.lines.frustumCulled = false
    this.lines.renderOrder = 1
    this.setTheme(theme)
  }

  setTheme(theme: Theme): void {
    this.background.setHex(theme.background)
    this.highlight.setHex(theme.highlight)
  }

  update(theme: Theme): void {
    const { segments, minExtent } = this.options
    const pos = this.positions
    const col = this.colors
    let v = 0 // vertex cursor

    for (const link of this.tree.links) {
      const source = link.source
      const target = link.target
      if (!source.visible && !target.visible) continue

      const from = source.view
      const to = target.view

      const dx = to.x - from.x
      const dy = to.y - from.y
      const dz = to.z - from.z
      if (dx * dx + dy * dy + dz * dz < minExtent * minExtent) continue

      // Fade with distance from the centre: the crowded rim stays quiet and the
      // branch you navigated to reads clearly. The fourth root matters - the
      // conformal factor falls off exponentially with depth, so a linear ramp
      // erases level three while level one is still at full strength.
      const strengthFrom = Math.min(1, Math.pow(1 - lengthSq(from), 0.25) * 1.16)
      const strengthTo = Math.min(1, Math.pow(1 - lengthSq(to), 0.25) * 1.16)

      this.a.setHex(this.options.color(source, theme))
      this.b.setHex(this.options.color(target, theme))
      this.a.lerp(this.background, 1 - strengthFrom)
      this.b.lerp(this.background, 1 - strengthTo)

      if (target.state.dimmed) {
        this.a.lerp(this.background, 0.8)
        this.b.lerp(this.background, 0.8)
      } else if (target.state.onPath || target.state.selected) {
        this.a.lerp(this.highlight, 0.45)
        this.b.lerp(this.highlight, 0.45)
      }

      let prev = from
      for (let s = 1; s <= segments; s++) {
        const t = s / segments
        const next = s === segments ? to : geodesicPoint(from, to, t)
        const tPrev = (s - 1) / segments

        pos[v * 3] = prev.x
        pos[v * 3 + 1] = prev.y
        pos[v * 3 + 2] = prev.z
        col[v * 3] = this.a.r + (this.b.r - this.a.r) * tPrev
        col[v * 3 + 1] = this.a.g + (this.b.g - this.a.g) * tPrev
        col[v * 3 + 2] = this.a.b + (this.b.b - this.a.b) * tPrev
        v++

        pos[v * 3] = next.x
        pos[v * 3 + 1] = next.y
        pos[v * 3 + 2] = next.z
        col[v * 3] = this.a.r + (this.b.r - this.a.r) * t
        col[v * 3 + 1] = this.a.g + (this.b.g - this.a.g) * t
        col[v * 3 + 2] = this.a.b + (this.b.b - this.a.b) * t
        v++

        prev = next
      }
    }

    this.geometry.setDrawRange(0, v)
    this.positionAttribute.needsUpdate = true
    this.colorAttribute.needsUpdate = true
  }

  dispose(): void {
    this.geometry.dispose()
    this.material.dispose()
  }
}
