/**
 * The connections, drawn as neurites: dendrites and axons rather than pipes.
 *
 * Three readings are meant to hold at once, and each comes from a decision here.
 *
 * - **Neural.** Filaments, not tubes. Thin, with a lit core and near-dark walls,
 *   so what you see is the signal path rather than a surface. Each one wanders
 *   slightly off its geodesic: real neurites are grown, not extruded, and perfect
 *   arcs of even width are the single thing that most makes a graph look
 *   engineered. Signals are action potentials from `SpikeField`, so they arrive
 *   as events with a rise and a decay instead of sliding past as a swell.
 * - **Tree.** Thickness still follows Murray's law, `r_parent^3 = sum r_child^3`.
 *   It is the rule branching transport systems obey, dendrites included, and it
 *   is why a trunk splitting into finer and finer threads looks right rather than
 *   merely tidy.
 * - **Space.** Filaments also taper by the conformal factor, so they thin into
 *   the boundary and the far tree becomes a haze of threads.
 *
 * Geometry is one merged, camera-facing ribbon with three vertices across: edge,
 * core, edge. Brightening the core is what makes a flat ribbon read as round and
 * what lets a spike travel inside the filament rather than over it. Indices are
 * built once, since visible filaments pack into fixed slots; only positions and
 * colours are rewritten.
 */

import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  DynamicDrawUsage,
  MeshBasicMaterial,
  Mesh,
  NormalBlending,
  Vector3,
} from 'three'
import { geodesicPoint, lengthSq } from '../math'
import type { Tree, TreeNode } from '../model/types'
import type { SpikeField } from './spikes'
import type { Theme } from './theme'

export interface NeuritesOptions {
  /** Samples along each filament. Wander needs enough of them to read as a curve. */
  segments: number
  /** Half width of the thickest filament at the centre of the ball, in ball units. */
  width: number
  /**
   * Width floor, so distant threads stay visible. Same reasoning as the node
   * radius floor: without it the outer tree stops existing rather than receding.
   */
  minWidth: number
  /** Skip a filament whose on-screen extent is below this. */
  minExtent: number
  opacity: number
  /**
   * Brightness of the filament wall relative to its core. Low on purpose: a
   * bright wall reads as a pipe, a dark one as a thread carrying light.
   */
  edgeShade: number
  /**
   * Sideways wander, as a multiple of the filament's own width. Zero gives a
   * perfect geodesic, which is the most engineered looking thing on screen.
   */
  wander: number
  /** How much brighter a spike makes the filament. */
  spikeGain: number
  /** How far a spike pushes the colour toward the highlight. 1 is white. */
  spikeTint: number
  /** How much the filament swells at the spike. Small; axons barely move. */
  spikeSwell: number
  color: (node: TreeNode, theme: Theme) => number
}

export const defaultNeuritesOptions: NeuritesOptions = {
  segments: 14,
  width: 0.0115,
  minWidth: 0.0007,
  minExtent: 0.0012,
  opacity: 0.95,
  edgeShade: 0.14,
  wander: 1.5,
  // Kept short of a flash. Pushed harder the crest goes white, and a white
  // streak travelling down a thread reads as a spark or a short circuit rather
  // than as charge moving through tissue.
  spikeGain: 0.62,
  spikeTint: 0.34,
  spikeSwell: 0.1,
  color: (n, theme) => theme.eraColor(n.data.era as string | undefined),
}

/** Vertices across the ribbon: left edge, core, right edge. */
const ACROSS = 3

/** Deterministic per-filament wander phase. */
const phaseOf = (i: number): number => {
  const x = Math.sin(i * 53.1287) * 43758.5453
  return (x - Math.floor(x)) * Math.PI * 2
}

export class NeuritesLayer {
  readonly mesh: Mesh

  private readonly options: NeuritesOptions
  private readonly positionAttribute: BufferAttribute
  private readonly colorAttribute: BufferAttribute
  private readonly positions: Float32Array
  private readonly colors: Float32Array
  private readonly geometry: BufferGeometry
  private readonly material: MeshBasicMaterial

  private readonly a = new Color()
  private readonly b = new Color()
  private readonly recede = new Color()
  private readonly highlight = new Color()
  private readonly tint = new Color()
  private maxFade = 0.94

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
    options: Partial<NeuritesOptions> = {},
  ) {
    this.options = { ...defaultNeuritesOptions, ...options }
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

    // Indices never change: a filament always occupies the same slot layout, and
    // visible filaments are packed into slots from the front.
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
    this.recede.setHex(theme.recede)
    this.highlight.setHex(theme.highlight)
    this.maxFade = theme.maxFade
    // On a dark ground overlapping filaments should sum into a brighter web. On
    // a light one adding can only reach white, so they blend normally and stack
    // as ink instead.
    this.material.blending = theme.glow === 'additive' ? AdditiveBlending : NormalBlending
    this.material.needsUpdate = true
  }

  /**
   * @param seconds monotonic clock
   * @param spikes  shared signal field; filaments read it along their length
   * @param eye     camera position, for billboarding the ribbons
   * @param reveal  growth front in depth units; Infinity means fully grown
   */
  update(
    theme: Theme,
    seconds: number,
    spikes: SpikeField,
    eye: Vector3,
    reveal = Number.POSITIVE_INFINITY,
  ): void {
    const {
      segments,
      width,
      minWidth,
      minExtent,
      edgeShade,
      wander,
      spikeGain,
      spikeTint,
      spikeSwell,
      color,
    } = this.options

    const perLink = (segments + 1) * ACROSS
    let slot = 0

    for (let li = 0; li < this.tree.links.length; li++) {
      const link = this.tree.links[li]
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
      this.a.lerp(this.recede, Math.min(this.maxFade, 1 - litFrom))
      this.b.lerp(this.recede, Math.min(this.maxFade, 1 - litTo))

      const dimmed = target.state.dimmed
      const lit = target.state.onPath || target.state.selected
      if (dimmed) {
        this.a.lerp(this.recede, 0.8)
        this.b.lerp(this.recede, 0.8)
      } else if (lit) {
        this.a.lerp(this.highlight, 0.36)
        this.b.lerp(this.highlight, 0.36)
      }

      // A filament carries its own calibre for its whole length, not a ramp from
      // the parent's. The parent's calibre is the sum of its children's cubes and
      // that sum is realised by the bundle, not by each branch separately;
      // ramping every child up to the parent width stacks full-width trunks on a
      // single point and the centre saturates. The flare is the swelling where a
      // neurite leaves the soma.
      const caliber = target.caliber / this.trunk
      const flare = 1.3

      const wanderPhase = phaseOf(li)
      const sourceOffset = spikes.offsetOf(source)
      const targetOffset = spikes.offsetOf(target)
      const base = slot * perLink

      for (let i = 0; i <= segments; i++) {
        const t = i / segments
        const p = this.samples[i]

        const prev = this.samples[Math.max(0, i - 1)]
        const next = this.samples[Math.min(segments, i + 1)]
        this.tangent.set(next.x - prev.x, next.y - prev.y, next.z - prev.z)

        // Billboard about the filament's own axis: the ribbon turns to face the
        // eye but keeps its direction, which is what a thread looks like.
        this.toEye.set(eye.x - p.x, eye.y - p.y, eye.z - p.z)
        this.side.crossVectors(this.tangent, this.toEye)
        if (this.side.lengthSq() < 1e-18) {
          this.fallback.set(this.tangent.y, -this.tangent.x, 0)
          if (this.fallback.lengthSq() < 1e-18) this.fallback.set(1, 0, 0)
          this.side.copy(this.fallback)
        }
        this.side.normalize()

        // Membrane potential at this point, interpolating the endpoints' jitter
        // so the filament agrees with the somata it connects.
        const here =
          source.pathLength + (target.pathLength - source.pathLength) * t
        const offset = sourceOffset + (targetOffset - sourceOffset) * t
        const fire = spikes.at(here, seconds, offset)
        const spike = Math.max(0, fire)

        const shape = caliber * (flare + (1 - flare) * t)
        const conformal = 1 - (p.x * p.x + p.y * p.y + p.z * p.z)
        let half = width * shape * conformal * grow
        half *= 1 + spikeSwell * spike
        if (half < minWidth) half = minWidth

        // Grown, not extruded. The wander is anchored at both ends so filaments
        // still meet their somata exactly, and it scales with the local width so
        // a capillary wobbles by a capillary's worth.
        const anchor = Math.sin(t * Math.PI)
        const offsetAcross =
          wander * half * anchor * Math.sin(wanderPhase + t * 5.4 + wanderPhase * 0.31)

        const r = this.a.r + (this.b.r - this.a.r) * t
        const g = this.a.g + (this.b.g - this.a.g) * t
        const bl = this.a.b + (this.b.b - this.a.b) * t

        // The refractory dip is drawn as well as the spike: a filament that has
        // just fired goes quiet, which is what makes the arrival read as an event.
        const boost = dimmed ? 0 : fire * spikeGain
        this.tint.setRGB(r, g, bl).lerp(this.highlight, spikeTint)

        const core = base + i * ACROSS
        this.writeVertex(core, p, offsetAcross - half, r, g, bl, edgeShade, boost)
        this.writeVertex(core + 1, p, offsetAcross, r, g, bl, 1, boost)
        this.writeVertex(core + 2, p, offsetAcross + half, r, g, bl, edgeShade, boost)
      }

      slot++
    }

    this.geometry.setDrawRange(0, slot * segments * 12)
    this.positionAttribute.needsUpdate = true
    this.colorAttribute.needsUpdate = true
  }

  private writeVertex(
    index: number,
    p: { x: number; y: number; z: number },
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
    pos[at] = p.x + this.side.x * offset
    pos[at + 1] = p.y + this.side.y * offset
    pos[at + 2] = p.z + this.side.z * offset

    let cr = r * shade
    let cg = g * shade
    let cb = b * shade
    if (boost !== 0) {
      // The signal rides in the core and barely touches the walls, which is what
      // reads as charge inside a filament rather than a glowing outline.
      const amount = boost * shade
      cr += (this.tint.r - cr) * amount
      cg += (this.tint.g - cg) * amount
      cb += (this.tint.b - cb) * amount
    }
    col[at] = Math.max(0, cr)
    col[at + 1] = Math.max(0, cg)
    col[at + 2] = Math.max(0, cb)
  }

  dispose(): void {
    this.geometry.dispose()
    this.material.dispose()
  }
}
