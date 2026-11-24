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
 * Geometry is one camera-facing ribbon with three vertices across (edge, core,
 * edge), drawn once per filament by instancing. Brightening the core is what
 * makes a flat ribbon read as round and what lets a spike travel inside the
 * filament rather than over it.
 *
 * Everything that varies along a filament is worked out in the vertex shader:
 * the geodesic between the two ends, the taper, the beads, the wander, the turn
 * toward the eye and the passing spike. The processor only hands over the two
 * end points of each filament, which is a few thousand numbers a frame however
 * large the tree is. Sampling every filament on the processor instead costs more
 * than everything else on the page put together once the tree passes a thousand
 * nodes, and that cost is paid on every frame the signal is moving, which is all
 * of them.
 */

import {
  BufferAttribute,
  Color,
  DoubleSide,
  DynamicDrawUsage,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  type Vector3,
} from 'three'
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
  opacity: 1,
  // The edges are shaded again in the fragment shader, by the profile of a
  // cylinder, so this only sets how far the vertex colours fall toward them.
  edgeShade: 0.85,
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

/**
 * Below this squared length a filament is drawn as a straight thread.
 *
 * Two reasons, and they agree. A filament this short is a few pixels long, so
 * its arc and its chord are the same picture. And it only gets this short by
 * sitting against the boundary, which is exactly where single precision can no
 * longer subtract two nearly equal points of the ball: the geodesic formula
 * would return noise there, and noise in a vertex position is a stray line
 * across the screen.
 */
const STRAIGHT_BELOW = 1e-4
const CURVED_ABOVE = 4e-4

/** Deterministic per-filament wander phase. */
const phaseOf = (i: number): number => {
  const x = Math.sin(i * 53.1287) * 43758.5453
  return (x - Math.floor(x)) * Math.PI * 2
}

/** Deterministic value in [0, 1) for a filament and a salt. */
const unit = (i: number, salt: number): number => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

const VERTEX_PARS = /* glsl */ `
attribute vec3 iFrom;
attribute vec3 iTo;
attribute vec2 iLive;
attribute vec3 iColorA;
attribute vec3 iColorB;
attribute vec3 iShape;
attribute vec3 iBeads;
attribute vec4 iSignal;
uniform float btTime;
uniform vec4 btSpike;
uniform float btRefractory;
uniform vec4 btRibbon;
uniform vec3 btLook;
uniform vec3 btRecede;
uniform vec3 btHighlight;
uniform vec3 btLimits;
varying float vAcross;
varying vec3 vSide;
varying vec3 vBtColor;

// Mobius addition, the translation of the ball. See math/hyperbolic.ts.
vec3 btAdd(vec3 a, vec3 b) {
  float a2 = dot(a, a);
  float b2 = dot(b, b);
  float ab = dot(a, b);
  float den = max(1.0 + 2.0 * ab + a2 * b2, 1e-9);
  return ((1.0 + 2.0 * ab + b2) * a + (1.0 - a2) * b) / den;
}

// Point at parameter t on the geodesic from a to b, even in hyperbolic length.
// The step along it is tanh(t * atanh(n)), written here as a single power:
// e^(2 atanh n) is (1 + n) / (1 - n), and some phone graphics drivers lose
// precision in their own tanh and atanh.
vec3 btGeodesic(vec3 a, vec3 b, float t) {
  vec3 d = btAdd(-a, b);
  float n = length(d);
  if (n < 1e-6) return a;
  float m = min(n, 0.999999);
  float p = pow((1.0 + m) / (1.0 - m), t);
  return btAdd(a, d * ((p - 1.0) / ((p + 1.0) * n)));
}

vec3 btPoint(float t, float curved) {
  vec3 straight = mix(iFrom, iTo, t);
  if (curved <= 0.0) return straight;
  return mix(straight, btGeodesic(iFrom, iTo, t), curved);
}

// The action potential. Mirrors potential() in spikes.ts.
float btPotential(float elapsed) {
  float rise = btSpike.z;
  float decay = btSpike.w;
  if (elapsed < rise) {
    float k = elapsed / rise;
    return k * k * (3.0 - 2.0 * k);
  }
  float after = elapsed - rise;
  float fall = exp(-after / decay);
  float dip = -btRefractory * (1.0 - fall) * exp(-after / (decay * 3.0));
  return fall + dip;
}
`

const VERTEX_MAIN = /* glsl */ `
float btT = position.x;
float btAcross = position.y;
float btGrow = iLive.x;
float btState = iLive.y;
vec3 btChord = iTo - iFrom;
float btExtent = dot(btChord, btChord);
float btHide = (btGrow <= 0.0 || btExtent < btLimits.x) ? 1.0 : 0.0;
float btCurved = smoothstep(${STRAIGHT_BELOW.toExponential()}, ${CURVED_ABOVE.toExponential()}, btExtent);

vec3 btHere = btPoint(btT, btCurved);
vec3 btTangent = btPoint(min(1.0, btT + btLimits.y), btCurved) - btPoint(max(0.0, btT - btLimits.y), btCurved);

// Billboard about the filament's own axis: the ribbon turns to face the eye but
// keeps its direction, which is what a thread looks like.
vec3 btSide = cross(btTangent, cameraPosition - btHere);
if (dot(btSide, btSide) < 1e-18) {
  btSide = vec3(btTangent.y, -btTangent.x, 0.0);
  if (dot(btSide, btSide) < 1e-18) btSide = vec3(1.0, 0.0, 0.0);
}
btSide = normalize(btSide);

// Membrane potential here, interpolating the jitter of the two ends so the
// filament agrees with the somata it connects.
float btArrival = mix(iSignal.x, iSignal.y, btT) / btSpike.y + mix(iSignal.z, iSignal.w, btT);
float btFire = btPotential(mod(btTime - btArrival, btSpike.x));
float btCrest = max(0.0, btFire);

// Thickest where it leaves the parent body, in a short cone like the hillock a
// real fibre grows out of, thinning toward the tip, with a small foot where it
// lands on the child. Then the beads, then the swell of the passing spike.
float btTaper = 1.35;
float btForm = iShape.x * (btTaper + (1.0 - btTaper) * btT)
  * (1.0 + 1.5 * exp(-btT * 11.0) + 0.6 * exp(-(1.0 - btT) * 14.0));
float btWide = btRibbon.x * btForm * (1.0 - dot(btHere, btHere)) * btGrow;
vec3 btBead = (vec3(btT) - iBeads) * 9.0;
btWide *= 1.0 + iShape.z * (exp(-btBead.x * btBead.x) + exp(-btBead.y * btBead.y) + exp(-btBead.z * btBead.z));
btWide *= 1.0 + btLook.z * btCrest;
btWide = max(btWide, btRibbon.y);

// Grown, not extruded. The wander is anchored at both ends so filaments still
// meet their somata exactly, and it scales with the local width so a capillary
// wobbles by a capillary's worth.
float btAnchor = sin(btT * PI);
float btWander = btRibbon.z * btWide * btAnchor
  * (sin(iShape.y + btT * 5.4 + iShape.y * 0.31) + 0.45 * sin(iShape.y * 1.7 + btT * 12.6));

vec3 transformed = btHere + btSide * (btWander + btAcross * btWide);

// Colour ramps parent to child, each end faded by its own hyperbolic depth. The
// fourth root matters: the conformal factor falls off exponentially, so a
// linear ramp erases level three while level one is still at full strength.
float btLitA = min(1.0, pow(max(0.0, 1.0 - dot(iFrom, iFrom)), 0.25) * 1.16) * btGrow;
float btLitB = min(1.0, pow(max(0.0, 1.0 - dot(iTo, iTo)), 0.25) * 1.16) * btGrow;
vec3 btA = mix(iColorA, btRecede, min(btLimits.z, 1.0 - btLitA));
vec3 btB = mix(iColorB, btRecede, min(btLimits.z, 1.0 - btLitB));
bool btDimmed = btState > 0.5 && btState < 1.5;
if (btDimmed) {
  btA = mix(btA, btRecede, 0.8);
  btB = mix(btB, btRecede, 0.8);
} else if (btState > 1.5) {
  btA = mix(btA, btHighlight, 0.36);
  btB = mix(btB, btHighlight, 0.36);
}
vec3 btBase = mix(btA, btB, btT);

// The signal rides in the core and barely touches the walls, which is what
// reads as charge inside a filament rather than a glowing outline. The
// refractory dip is drawn as well as the spike: a filament that has just fired
// goes quiet, which is what makes the arrival read as an event.
float btShade = mix(1.0, btRibbon.w, abs(btAcross));
float btBoost = btDimmed ? 0.0 : btFire * btLook.x;
vec3 btTint = mix(btBase, btHighlight, btLook.y);
vec3 btLit = btBase * btShade;
btLit += (btTint - btLit) * (btBoost * btShade);
vBtColor = max(btLit, vec3(0.0));

vAcross = btAcross;
vSide = normalize((modelViewMatrix * vec4(btSide, 0.0)).xyz);
`

export class NeuritesLayer {
  readonly mesh: Mesh

  private readonly options: NeuritesOptions
  private readonly geometry: InstancedBufferGeometry
  private readonly material: MeshBasicMaterial

  /** The two ends of each filament, rewritten every frame. */
  private readonly fromAttribute: InstancedBufferAttribute
  private readonly toAttribute: InstancedBufferAttribute
  /** Growth and state (0 normal, 1 dimmed, 2 lit) per filament. */
  private readonly liveAttribute: InstancedBufferAttribute
  /** Everything below only changes with the theme or the layout. */
  private readonly colorAAttribute: InstancedBufferAttribute
  private readonly colorBAttribute: InstancedBufferAttribute
  private readonly shapeAttribute: InstancedBufferAttribute
  private readonly beadsAttribute: InstancedBufferAttribute
  private readonly signalAttribute: InstancedBufferAttribute

  private readonly uniforms = {
    time: { value: 0 },
    /** period, speed, rise, decay */
    spike: { value: [3.2, 5.5, 0.11, 0.34] as [number, number, number, number] },
    refractory: { value: 0.3 },
    /** width, minWidth, wander, edgeShade */
    ribbon: { value: [0, 0, 0, 0] as [number, number, number, number] },
    /** spikeGain, spikeTint, spikeSwell */
    look: { value: [0, 0, 0] as [number, number, number] },
    recede: { value: new Color() },
    highlight: { value: new Color() },
    /** minExtent squared, one step along the filament, maxFade */
    limits: { value: [0, 0, 0.94] as [number, number, number] },
  }

  private readonly scratch = new Color()
  /** Theme the static attributes were last written for. */
  private staticFor: Theme | null = null

  /** Largest calibre in the tree, so widths are a fraction of the trunk. */
  private trunk: number

  constructor(
    private readonly tree: Tree,
    theme: Theme,
    options: Partial<NeuritesOptions> = {},
  ) {
    this.options = { ...defaultNeuritesOptions, ...options }
    const { segments } = this.options
    this.trunk = Math.max(1e-6, tree.root.caliber)
    const links = tree.links.length

    // One ribbon, in its own coordinates: x runs along it from 0 to 1 and y is
    // -1 at one wall, 0 on the axis and 1 at the other. The vertex shader turns
    // that into a place in the ball, per filament.
    const strip = new Float32Array((segments + 1) * ACROSS * 3)
    for (let s = 0; s <= segments; s++) {
      for (let k = 0; k < ACROSS; k++) {
        const at = (s * ACROSS + k) * 3
        strip[at] = s / segments
        strip[at + 1] = k - 1
      }
    }
    const indices = new Uint16Array(segments * 12)
    let w = 0
    for (let s = 0; s < segments; s++) {
      const row = s * ACROSS
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

    const instanced = (size: number, dynamic: boolean): InstancedBufferAttribute => {
      const attribute = new InstancedBufferAttribute(new Float32Array(links * size), size)
      if (dynamic) attribute.setUsage(DynamicDrawUsage)
      return attribute
    }
    this.fromAttribute = instanced(3, true)
    this.toAttribute = instanced(3, true)
    this.liveAttribute = instanced(2, true)
    this.colorAAttribute = instanced(3, false)
    this.colorBAttribute = instanced(3, false)
    this.shapeAttribute = instanced(3, false)
    this.beadsAttribute = instanced(3, false)
    this.signalAttribute = instanced(4, false)

    this.geometry = new InstancedBufferGeometry()
    this.geometry.setAttribute('position', new BufferAttribute(strip, 3))
    this.geometry.setIndex(new BufferAttribute(indices, 1))
    this.geometry.setAttribute('iFrom', this.fromAttribute)
    this.geometry.setAttribute('iTo', this.toAttribute)
    this.geometry.setAttribute('iLive', this.liveAttribute)
    this.geometry.setAttribute('iColorA', this.colorAAttribute)
    this.geometry.setAttribute('iColorB', this.colorBAttribute)
    this.geometry.setAttribute('iShape', this.shapeAttribute)
    this.geometry.setAttribute('iBeads', this.beadsAttribute)
    this.geometry.setAttribute('iSignal', this.signalAttribute)
    this.geometry.instanceCount = links

    // Solid, so a near fibre hides a far one. Fibres that add up as light are
    // the glowing-wire look; real ones occlude each other.
    this.material = new MeshBasicMaterial({ side: DoubleSide })

    // A flat ribbon lit as the front of a round fibre. The surface normal is
    // rebuilt from the position across the strip, then lit by the same key light
    // as the cell bodies, so a fibre has a lit side and a shadowed side that
    // agree with the bodies it joins. Matte: diffuse only, no highlight.
    this.material.onBeforeCompile = (shader) => {
      shader.uniforms.btTime = this.uniforms.time
      shader.uniforms.btSpike = this.uniforms.spike
      shader.uniforms.btRefractory = this.uniforms.refractory
      shader.uniforms.btRibbon = this.uniforms.ribbon
      shader.uniforms.btLook = this.uniforms.look
      shader.uniforms.btRecede = this.uniforms.recede
      shader.uniforms.btHighlight = this.uniforms.highlight
      shader.uniforms.btLimits = this.uniforms.limits
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>\n${VERTEX_PARS}`)
        .replace('#include <begin_vertex>', VERTEX_MAIN)
        // A filament that is hidden, or too short to see, is sent outside the
        // clip volume in one piece, so it costs no pixels.
        .replace(
          '#include <fog_vertex>',
          '#include <fog_vertex>\nif (btHide > 0.5) gl_Position = vec4(2.0, 2.0, 2.0, 1.0);',
        )
      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          '#include <common>\nvarying float vAcross;\nvarying vec3 vSide;\nvarying vec3 vBtColor;',
        )
        .replace(
          '#include <color_fragment>',
          `#include <color_fragment>
diffuseColor.rgb *= vBtColor;
{
  float a = clamp(vAcross, -1.0, 1.0);
  float height = sqrt(max(0.0, 1.0 - a * a));
  vec3 n = normalize(normalize(vSide) * a + vec3(0.0, 0.0, 1.0) * height);
  vec3 keyDir = normalize((viewMatrix * vec4(2.0, 3.0, 4.0, 0.0)).xyz);
  vec3 fillDir = normalize((viewMatrix * vec4(-3.0, -1.5, -2.0, 0.0)).xyz);
  float key = max(0.0, dot(n, keyDir) * 0.6 + 0.4);
  float fill = max(0.0, dot(n, fillDir));
  float occlusion = 0.55 + 0.45 * height;
  diffuseColor.rgb *= (0.3 + 0.78 * key * key + 0.12 * fill) * occlusion;
}`,
        )
    }
    this.material.customProgramCacheKey = () => 'bt-neurite-v4'

    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.frustumCulled = false
    this.mesh.renderOrder = 1
    this.setTheme(theme)
  }

  setTheme(theme: Theme): void {
    this.uniforms.recede.value.setHex(theme.recede)
    this.uniforms.highlight.value.setHex(theme.highlight)
    this.uniforms.limits.value[2] = theme.maxFade
    this.staticFor = null
  }

  /**
   * Forget what was written for the layout. Call after anything that changes a
   * filament's calibre or its length along the tree, which a relayout does.
   */
  invalidate(): void {
    this.trunk = Math.max(1e-6, this.tree.root.caliber)
    this.staticFor = null
  }

  /**
   * What a filament is, as opposed to where it is: its colours, calibre, beads,
   * wander and the timing of the signal along it. None of it moves with the
   * view, so it is written once per theme and layout.
   */
  private writeStatic(theme: Theme, spikes: SpikeField): void {
    const { color } = this.options
    const colorA = this.colorAAttribute.array as Float32Array
    const colorB = this.colorBAttribute.array as Float32Array
    const shape = this.shapeAttribute.array as Float32Array
    const beads = this.beadsAttribute.array as Float32Array
    const signal = this.signalAttribute.array as Float32Array

    for (let li = 0; li < this.tree.links.length; li++) {
      const { source, target } = this.tree.links[li]
      const at3 = li * 3
      const at4 = li * 4

      this.scratch.setHex(color(source, theme))
      colorA[at3] = this.scratch.r
      colorA[at3 + 1] = this.scratch.g
      colorA[at3 + 2] = this.scratch.b
      this.scratch.setHex(color(target, theme))
      colorB[at3] = this.scratch.r
      colorB[at3 + 1] = this.scratch.g
      colorB[at3 + 2] = this.scratch.b

      // A filament carries its own calibre for its whole length, not a ramp from
      // the parent's. The parent's calibre is the sum of its children's cubes and
      // that sum is realised by the bundle, not by each branch separately;
      // ramping every child up to the parent width stacks full-width trunks on a
      // single point and the centre saturates.
      shape[at3] = target.caliber / this.trunk
      shape[at3 + 1] = phaseOf(li)
      // Varicosities: the small beads along a real axon where it releases
      // signal. Three per filament, at fixed places, each a narrow swelling.
      // Without them a thread is a perfectly even line, which is the single most
      // synthetic thing left once the shading is right.
      shape[at3 + 2] = 0.14 + unit(li, 4) * 0.16
      beads[at3] = 0.18 + unit(li, 1) * 0.2
      beads[at3 + 1] = 0.46 + unit(li, 2) * 0.2
      beads[at3 + 2] = 0.74 + unit(li, 3) * 0.16

      signal[at4] = source.pathLength
      signal[at4 + 1] = target.pathLength
      signal[at4 + 2] = spikes.offsetOf(source)
      signal[at4 + 3] = spikes.offsetOf(target)
    }

    this.colorAAttribute.needsUpdate = true
    this.colorBAttribute.needsUpdate = true
    this.shapeAttribute.needsUpdate = true
    this.beadsAttribute.needsUpdate = true
    this.signalAttribute.needsUpdate = true
    this.staticFor = theme
  }

  /**
   * @param seconds monotonic clock
   * @param spikes  shared signal field; filaments read it along their length
   * @param _eye    camera position. Unused now that the shader billboards; kept
   *                so callers written against the earlier layer still compile
   * @param reveal  growth front in depth units; Infinity means fully grown
   */
  update(
    theme: Theme,
    seconds: number,
    spikes: SpikeField,
    _eye?: Vector3,
    reveal = Number.POSITIVE_INFINITY,
  ): void {
    const { segments, width, minWidth, minExtent, edgeShade, wander } = this.options
    const { spikeGain, spikeTint, spikeSwell } = this.options
    const signal = spikes.settings

    if (this.staticFor !== theme) this.writeStatic(theme, spikes)

    // The clock is folded into one period here, in double precision. Handed to
    // the shader whole it would lose a millisecond of resolution within the
    // hour, and the signal would start to stutter on a page left open.
    this.uniforms.time.value = seconds % signal.period
    const spike = this.uniforms.spike.value
    spike[0] = signal.period
    spike[1] = signal.speed
    spike[2] = signal.rise
    spike[3] = signal.decay
    this.uniforms.refractory.value = signal.refractory
    const ribbon = this.uniforms.ribbon.value
    ribbon[0] = width
    ribbon[1] = minWidth
    ribbon[2] = wander
    ribbon[3] = edgeShade
    const look = this.uniforms.look.value
    look[0] = spikeGain
    look[1] = spikeTint
    look[2] = spikeSwell
    const limits = this.uniforms.limits.value
    limits[0] = minExtent * minExtent
    limits[1] = 1 / segments

    const from = this.fromAttribute.array as Float32Array
    const to = this.toAttribute.array as Float32Array
    const live = this.liveAttribute.array as Float32Array
    const growing = reveal !== Number.POSITIVE_INFINITY

    for (let li = 0; li < this.tree.links.length; li++) {
      const { source, target } = this.tree.links[li]
      const at2 = li * 2

      let grow = source.visible || target.visible ? 1 : 0
      if (grow > 0 && growing) {
        const t = reveal - target.depth
        grow = t <= 0 ? 0 : t < 1 ? t * t * (3 - 2 * t) : 1
      }
      live[at2] = grow
      const state = target.state
      live[at2 + 1] = state.dimmed ? 1 : state.onPath || state.selected ? 2 : 0
      if (grow <= 0) continue

      const at3 = li * 3
      const a = source.view
      const b = target.view
      from[at3] = a.x
      from[at3 + 1] = a.y
      from[at3 + 2] = a.z
      to[at3] = b.x
      to[at3 + 1] = b.y
      to[at3 + 2] = b.z
    }

    this.fromAttribute.needsUpdate = true
    this.toAttribute.needsUpdate = true
    this.liveAttribute.needsUpdate = true
  }

  dispose(): void {
    this.geometry.dispose()
    this.material.dispose()
  }
}
