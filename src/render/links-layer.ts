/**
 * Parent/child links, drawn as geodesic arcs of the Poincare ball.
 *
 * A straight Euclidean line between two ball points is wrong: hyperbolic
 * geodesics bow away from the boundary. Sampling `geodesicPoint` gives the
 * correct arc, and gives the whole picture its characteristic curved-web look.
 *
 * On top of the geometry there are two temporal effects, both computed in JS
 * into the colour buffer rather than in a shader. The buffer is rewritten every
 * frame anyway, so a custom material would buy nothing and cost portability:
 *
 * - **Flow.** A bright pulse travels from parent to child along every link, at a
 *   speed set per link by a hash of its index. Read together they look like sap
 *   moving up a tree, or blood through a vessel: the direction of inheritance
 *   made visible, since every pulse runs from ancestor to descendant.
 * - **Growth.** A reveal front sweeps outward by depth on first load, so the
 *   tree grows from the root instead of appearing all at once.
 *
 * All arcs live in one BufferGeometry. Visible links are packed to the front of
 * the buffer each frame and `setDrawRange` hides the rest.
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
  /** Pulses per second along a link. 0 disables the flow entirely. */
  flowSpeed: number
  /** How much brighter the pulse is than the link. */
  flowStrength: number
  /** Fraction of the arc the pulse occupies. */
  flowLength: number
  color: (node: TreeNode, theme: Theme) => number
}

export const defaultLinksOptions: LinksOptions = {
  segments: 14,
  minExtent: 0.0012,
  opacity: 0.92,
  flowSpeed: 0.22,
  flowStrength: 0.85,
  flowLength: 0.26,
  color: (n, theme) => theme.eraColor(n.data.era as string | undefined),
}

/** Deterministic per-link phase offset, so pulses do not march in lockstep. */
const phaseOf = (i: number): number => {
  const x = Math.sin(i * 78.233) * 43758.5453
  return x - Math.floor(x)
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
  private readonly pulseColor = new Color()

  constructor(
    private readonly tree: Tree,
    theme: Theme,
    options: Partial<LinksOptions> = {},
  ) {
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

  /**
   * @param seconds monotonic clock driving the flow
   * @param reveal  growth front in depth units; Infinity means fully grown
   */
  update(theme: Theme, seconds: number, reveal = Number.POSITIVE_INFINITY): void {
    const { segments, minExtent, flowSpeed, flowStrength, flowLength } = this.options
    const flowing = flowSpeed > 0
    let v = 0 // vertex cursor

    for (let li = 0; li < this.tree.links.length; li++) {
      const link = this.tree.links[li]
      const source = link.source
      const target = link.target
      if (!source.visible && !target.visible) continue

      // Growth: a link appears only once the front has passed its child, and
      // fades in over one depth unit so the front is soft rather than a wall.
      let grow = 1
      if (reveal !== Number.POSITIVE_INFINITY) {
        grow = reveal - target.depth
        if (grow <= 0) continue
        if (grow < 1) grow = grow * grow * (3 - 2 * grow)
        else grow = 1
      }

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
      const strengthFrom = Math.min(1, Math.pow(1 - lengthSq(from), 0.25) * 1.16) * grow
      const strengthTo = Math.min(1, Math.pow(1 - lengthSq(to), 0.25) * 1.16) * grow

      this.a.setHex(this.options.color(source, theme))
      this.b.setHex(this.options.color(target, theme))
      this.a.lerp(this.background, 1 - strengthFrom)
      this.b.lerp(this.background, 1 - strengthTo)

      const dimmed = target.state.dimmed
      const lit = target.state.onPath || target.state.selected
      if (dimmed) {
        this.a.lerp(this.background, 0.8)
        this.b.lerp(this.background, 0.8)
      } else if (lit) {
        this.a.lerp(this.highlight, 0.45)
        this.b.lerp(this.highlight, 0.45)
      }

      // The pulse head, in arc units, running parent -> child.
      const head = flowing && !dimmed ? (seconds * flowSpeed + phaseOf(li)) % 1 : -10
      // Near the centre a pulse is worth showing; on the rim it is noise.
      const pulseGain =
        flowStrength * grow * (lit ? 1.35 : 1) * Math.min(1, Math.pow(1 - lengthSq(to), 0.3) * 1.4)

      let prev = from
      for (let s = 1; s <= segments; s++) {
        const t = s / segments
        const next = s === segments ? to : geodesicPoint(from, to, t)
        const tPrev = (s - 1) / segments

        this.writeVertex(v++, prev, tPrev, head, flowLength, pulseGain)
        this.writeVertex(v++, next, t, head, flowLength, pulseGain)

        prev = next
      }
    }

    this.geometry.setDrawRange(0, v)
    this.positionAttribute.needsUpdate = true
    this.colorAttribute.needsUpdate = true
  }

  private writeVertex(
    index: number,
    point: { x: number; y: number; z: number },
    t: number,
    head: number,
    flowLength: number,
    pulseGain: number,
  ): void {
    const p = this.positions
    const c = this.colors
    p[index * 3] = point.x
    p[index * 3 + 1] = point.y
    p[index * 3 + 2] = point.z

    let r = this.a.r + (this.b.r - this.a.r) * t
    let g = this.a.g + (this.b.g - this.a.g) * t
    let b = this.a.b + (this.b.b - this.a.b) * t

    if (pulseGain > 0) {
      // Distance behind the head, wrapped, so the pulse trails rather than
      // straddling the head symmetrically.
      let behind = head - t
      if (behind < 0) behind += 1
      if (behind < flowLength) {
        const k = 1 - behind / flowLength
        const amount = k * k * pulseGain
        this.pulseColor.setRGB(r, g, b).lerp(this.highlight, 0.75)
        r += (this.pulseColor.r - r) * amount
        g += (this.pulseColor.g - g) * amount
        b += (this.pulseColor.b - b) * amount
      }
    }

    c[index * 3] = r
    c[index * 3 + 1] = g
    c[index * 3 + 2] = b
  }

  dispose(): void {
    this.geometry.dispose()
    this.material.dispose()
  }
}
