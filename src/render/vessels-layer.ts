/**
 * The connections, drawn as tapering vessels rather than as lines.
 *
 * This is the layer that decides what the whole picture is. Three readings are
 * meant to hold at once, and each one comes from a specific decision here:
 *
 * - **Tree.** Thickness follows Murray's law, `r_parent^3 = sum r_child^3`. That
 *   is the rule real branching systems obey - limbs, arteries, bronchi - because
 *   it minimises the cost of moving something through a network. A trunk that
 *   splits into thinner limbs is not a stylistic flourish, it is the geometry
 *   the law produces.
 * - **Vein.** A single heartbeat leaves the root and travels outward. Its phase
 *   is a function of `pathLength`, distance *along the tree*, so the wavefront
 *   follows the branches instead of expanding as a sphere. Each vessel also
 *   swells slightly as the wave passes, which is peristalsis, and that is what
 *   separates a pulse in a vessel from a light running along a wire.
 * - **Space.** Vessels also taper by the conformal factor, so they thin into the
 *   boundary and the far tree becomes a dust of capillaries under the starfield.
 *
 * Geometry is one merged, camera-facing ribbon strip with three vertices across:
 * edge, core, edge. Shading the core brighter than the edges is what makes a
 * flat ribbon read as a round tube, and it is what lets the pulse travel *inside*
 * the vessel rather than over it. Indices are built once, since visible links
 * are packed into fixed slots; only positions and colours are rewritten.
 */

import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  DynamicDrawUsage,
  MeshBasicMaterial,
  Mesh,
  Vector3,
} from 'three'
import { geodesicPoint, lengthSq } from '../math'
import type { Tree, TreeNode } from '../model/types'
import type { Theme } from './theme'

export interface VesselsOptions {
  /** Samples along each vessel. Cost is linear in this; 12 already looks round. */
  segments: number
  /** Half width of the thickest vessel at the centre of the ball, in ball units. */
  width: number
  /**
   * Width floor, so distant capillaries stay a visible thread. Same reasoning as
   * the node radius floor: without it the outer tree stops existing rather than
   * receding.
   */
  minWidth: number
  /** Skip a vessel whose on-screen extent is below this. */
  minExtent: number
  opacity: number
  /** How dark the vessel edge is relative to its core. Lower is rounder. */
  edgeShade: number
  /** Heartbeats per second. 0 stops the pulse. */
  pulseRate: number
  /** Length of one heartbeat in path-length units. Larger is a longer wave. */
  pulseLength: number
  /** How much brighter the wave crest is. */
  pulseStrength: number
  /** How far the crest colour moves toward the highlight. 1 is white. */
  pulseTint: number
  /** How much the vessel swells at the crest. 0 is a light with no peristalsis. */
  pulseSwell: number
  color: (node: TreeNode, theme: Theme) => number
}

export const defaultVesselsOptions: VesselsOptions = {
  segments: 12,
  width: 0.021,
  minWidth: 0.00085,
  minExtent: 0.0012,
  opacity: 0.95,
  edgeShade: 0.28,
  pulseRate: 0.34,
  pulseLength: 3.4,
  // Deliberately short of white. The crest should read as the vessel's own
  // colour running hot, the way a lit vein does; pushed further it turns into a
  // white streak and the era colouring stops meaning anything at the centre,
  // which is exactly where it matters most.
  pulseStrength: 0.55,
  pulseTint: 0.5,
  pulseSwell: 0.26,
  color: (n, theme) => theme.eraColor(n.data.era as string | undefined),
}

/** Vertices across the ribbon: left edge, core, right edge. */
const ACROSS = 3

export class VesselsLayer {
  readonly mesh: Mesh

  private readonly options: VesselsOptions
  private readonly positionAttribute: BufferAttribute
  private readonly colorAttribute: BufferAttribute
  private readonly positions: Float32Array
  private readonly colors: Float32Array
  private readonly geometry: BufferGeometry
  private readonly material: MeshBasicMaterial

  private readonly a = new Color()
  private readonly b = new Color()
  private readonly background = new Color()
  private readonly highlight = new Color()
  private readonly tint = new Color()

  private readonly samples: { x: number; y: number; z: number }[]
  private readonly side = new Vector3()
  private readonly tangent = new Vector3()
  private readonly toEye = new Vector3()
  private readonly fallback = new Vector3()

  /** Largest calibre in the tree, so widths are a fraction of the trunk. */
  private readonly trunk: number

  constructor(
    private readonly tree: Tree,
    theme: Theme,
    options: Partial<VesselsOptions> = {},
  ) {
    this.options = { ...defaultVesselsOptions, ...options }
    const { segments } = this.options
    this.trunk = Math.max(1e-6, tree.root.caliber)
    this.samples = Array.from({ length: segments + 1 }, () => ({ x: 0, y: 0, z: 0 }))

    const perLink = (segments + 1) * ACROSS
    const vertices = tree.links.length * perLink

    this.positionAttribute = new BufferAttribute(new Float32Array(vertices * 3), 3)
    this.colorAttribute = new BufferAttribute(new Float32Array(vertices * 3), 3)
    this.positionAttribute.setUsage(DynamicDrawUsage)
    this.colorAttribute.setUsage(DynamicDrawUsage)
    this.positions = this.positionAttribute.array as Float32Array
    this.colors = this.colorAttribute.array as Float32Array

    // Indices never change: a vessel always occupies the same slot layout, and
    // visible vessels are packed into slots from the front.
    const indices = new Uint32Array(tree.links.length * segments * 12)
    let w = 0
    for (let link = 0; link < tree.links.length; link++) {
      const base = link * perLink
      for (let s = 0; s < segments; s++) {
        const row = base + s * ACROSS
        const next = row + ACROSS
        for (let k = 0; k < 2; k++) {
          const l = row + k
          const r = l + 1
          const ln = next + k
          const rn = ln + 1
          indices[w++] = l
          indices[w++] = r
          indices[w++] = rn
          indices[w++] = l
          indices[w++] = rn
          indices[w++] = ln
        }
      }
    }

    this.geometry = new BufferGeometry()
    this.geometry.setAttribute('position', this.positionAttribute)
    this.geometry.setAttribute('color', this.colorAttribute)
    this.geometry.setIndex(new BufferAttribute(indices, 1))
    this.geometry.setDrawRange(0, 0)

    this.material = new MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: this.options.opacity,
      depthWrite: false,
      side: DoubleSide,
    })

    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.frustumCulled = false
    this.mesh.renderOrder = 1
    this.setTheme(theme)
  }

  setTheme(theme: Theme): void {
    this.background.setHex(theme.background)
    this.highlight.setHex(theme.highlight)
  }

  /**
   * @param seconds monotonic clock driving the heartbeat
   * @param eye     camera position, for billboarding the ribbons
   * @param reveal  growth front in depth units; Infinity means fully grown
   */
  update(
    theme: Theme,
    seconds: number,
    eye: Vector3,
    reveal = Number.POSITIVE_INFINITY,
  ): void {
    const {
      segments,
      width,
      minWidth,
      minExtent,
      edgeShade,
      pulseRate,
      pulseLength,
      pulseStrength,
      pulseTint,
      pulseSwell,
      color,
    } = this.options

    const perLink = (segments + 1) * ACROSS
    const beating = pulseRate > 0
    // The wave crest, in path-length units, expanding from the root and wrapping.
    const crest = beating ? (seconds * pulseRate * pulseLength) % pulseLength : -1e9
    let slot = 0

    for (const link of this.tree.links) {
      const source = link.source
      const target = link.target
      if (!source.visible && !target.visible) continue

      let grow = 1
      if (reveal !== Number.POSITIVE_INFINITY) {
        grow = reveal - target.depth
        if (grow <= 0) continue
        grow = grow < 1 ? grow * grow * (3 - 2 * grow) : 1
      }

      const from = source.view
      const to = target.view
      const dx = to.x - from.x
      const dy = to.y - from.y
      const dz = to.z - from.z
      if (dx * dx + dy * dy + dz * dz < minExtent * minExtent) continue

      // Sample the geodesic once; the ribbon is built from these points.
      for (let i = 0; i <= segments; i++) {
        const p = i === 0 ? from : i === segments ? to : geodesicPoint(from, to, i / segments)
        const s = this.samples[i]
        s.x = p.x
        s.y = p.y
        s.z = p.z
      }

      // Colour ramps parent to child, each end faded by its own hyperbolic
      // depth. The fourth root matters: the conformal factor falls off
      // exponentially, so a linear ramp erases level three while level one is
      // still at full strength.
      const litFrom = Math.min(1, Math.pow(1 - lengthSq(from), 0.25) * 1.16) * grow
      const litTo = Math.min(1, Math.pow(1 - lengthSq(to), 0.25) * 1.16) * grow
      this.a.setHex(color(source, theme))
      this.b.setHex(color(target, theme))
      this.a.lerp(this.background, 1 - litFrom)
      this.b.lerp(this.background, 1 - litTo)

      const dimmed = target.state.dimmed
      const lit = target.state.onPath || target.state.selected
      if (dimmed) {
        this.a.lerp(this.background, 0.82)
        this.b.lerp(this.background, 0.82)
      } else if (lit) {
        this.a.lerp(this.highlight, 0.4)
        this.b.lerp(this.highlight, 0.4)
      }

      // A vessel carries its *own* calibre for its whole length, not a ramp from
      // the parent's. The parent's calibre is the sum of its children's cubes,
      // and that sum is realised by the bundle of them, not by each one
      // separately. Ramping every child up to the parent width at the junction
      // stacks ten full-width trunks on a single point and the centre saturates
      // to white. A small flare at the parent end is the fillet where limbs
      // meet, and it is the only licence taken with the law.
      const caliber = target.caliber / this.trunk
      const flare = 1.28

      const base = slot * perLink
      for (let i = 0; i <= segments; i++) {
        const t = i / segments
        const p = this.samples[i]

        // Tangent from the neighbouring samples, so the ribbon follows the arc.
        const prev = this.samples[Math.max(0, i - 1)]
        const next = this.samples[Math.min(segments, i + 1)]
        this.tangent.set(next.x - prev.x, next.y - prev.y, next.z - prev.z)

        // Billboard about the vessel's own axis: the ribbon turns to face the
        // eye but keeps its direction, which is what a tube looks like.
        this.toEye.set(eye.x - p.x, eye.y - p.y, eye.z - p.z)
        this.side.crossVectors(this.tangent, this.toEye)
        if (this.side.lengthSq() < 1e-18) {
          // Looking straight down the vessel. Any perpendicular will do.
          this.fallback.set(this.tangent.y, -this.tangent.x, 0)
          if (this.fallback.lengthSq() < 1e-18) this.fallback.set(1, 0, 0)
          this.side.copy(this.fallback)
        }
        this.side.normalize()

        const wave = beating ? this.waveAt(source, target, t, crest, pulseLength) : 0

        const shape = caliber * (flare + (1 - flare) * t)
        const conformal = 1 - (p.x * p.x + p.y * p.y + p.z * p.z)
        let half = width * shape * conformal * grow
        half *= 1 + pulseSwell * wave
        if (half < minWidth) half = minWidth

        const r = this.a.r + (this.b.r - this.a.r) * t
        const g = this.a.g + (this.b.g - this.a.g) * t
        const bl = this.a.b + (this.b.b - this.a.b) * t

        const boost = dimmed ? 0 : wave * pulseStrength
        this.tint.setRGB(r, g, bl).lerp(this.highlight, pulseTint)

        const core = base + i * ACROSS
        this.writeVertex(core, p, this.side, -half, r, g, bl, edgeShade, boost)
        this.writeVertex(core + 1, p, this.side, 0, r, g, bl, 1, boost)
        this.writeVertex(core + 2, p, this.side, half, r, g, bl, edgeShade, boost)
      }

      slot++
    }

    this.geometry.setDrawRange(0, slot * segments * 12)
    this.positionAttribute.needsUpdate = true
    this.colorAttribute.needsUpdate = true
  }

  /**
   * Crest height at parameter `t` along a vessel, from the wave's distance
   * along the tree. Wrapping is handled on both sides so the beat is continuous
   * as the crest recycles past the far tips.
   */
  private waveAt(
    source: TreeNode,
    target: TreeNode,
    t: number,
    crest: number,
    pulseLength: number,
  ): number {
    const here = source.pathLength + (target.pathLength - source.pathLength) * t
    let d = ((here - crest) % pulseLength + pulseLength) % pulseLength
    if (d > pulseLength / 2) d -= pulseLength
    const x = Math.abs(d) / (pulseLength * 0.28)
    if (x >= 1) return 0
    // Smooth crest, steeper on the leading edge, so the beat has a direction.
    const k = 1 - x
    return d >= 0 ? k * k : k * k * k
  }

  private writeVertex(
    index: number,
    p: { x: number; y: number; z: number },
    side: Vector3,
    offset: number,
    r: number,
    g: number,
    b: number,
    shade: number,
    boost: number,
  ): void {
    const pos = this.positions
    const col = this.colors
    const at = index * 3
    pos[at] = p.x + side.x * offset
    pos[at + 1] = p.y + side.y * offset
    pos[at + 2] = p.z + side.z * offset

    let cr = r * shade
    let cg = g * shade
    let cb = b * shade
    if (boost > 0) {
      // The pulse rides in the core and barely touches the walls, which is what
      // reads as fluid inside a vessel rather than a glowing outline.
      const amount = boost * shade
      cr += (this.tint.r - cr) * amount
      cg += (this.tint.g - cg) * amount
      cb += (this.tint.b - cb) * amount
    }
    col[at] = cr
    col[at + 1] = cg
    col[at + 2] = cb
  }

  dispose(): void {
    this.geometry.dispose()
    this.material.dispose()
  }
}
