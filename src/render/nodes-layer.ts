/**
 * Node spheres, drawn as a single InstancedMesh.
 *
 * The radius of every sphere is multiplied by the conformal factor of its
 * position, `1 - |p|^2`. That single term is what makes the picture read as
 * hyperbolic: whatever you navigate to the middle is big and legible, and the
 * rest of the tree tapers smoothly into the boundary instead of being clipped.
 */

import {
  Color,
  InstancedBufferAttribute,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  Object3D,
  type PerspectiveCamera,
  type Quaternion,
  Raycaster,
  SphereGeometry,
  TorusGeometry,
  Vector2,
  Vector3,
} from 'three'
import { lengthSq } from '../math'
import type { TreeNode } from '../model/types'
import type { Theme } from './theme'

export type NodeRadiusFn = (node: TreeNode) => number
export type NodeColorFn = (node: TreeNode, theme: Theme) => number

export interface NodesOptions {
  /** Radius in ball units at the very centre of the ball. */
  baseRadius: number
  /** Multiplier per node before the conformal factor. Default tapers by depth. */
  radius: NodeRadiusFn
  color: NodeColorFn
  /**
   * Floor on the drawn radius, *not* a cull threshold. Whatever you bring to the
   * centre pushes the rest of the tree hard against the boundary, where the
   * conformal factor takes it to a millionth of a pixel. Clamping instead of
   * dropping turns that into the fine speckled fringe a hyperbolic browser is
   * supposed to have, so the tree recedes rather than disappearing.
   */
  minRadius: number
  /** How node bodies are drawn. Can be changed later with `setStyle`. */
  style: NodeStyle
  /** Only nodes numerically pinned to the boundary are dropped. */
  cullRadius: number
}

const defaultRadius: NodeRadiusFn = (n) => Math.max(0.34, 1 - n.depth * 0.16)

const defaultColor: NodeColorFn = (n, theme) => theme.eraColor(n.data.era as string | undefined)

export const defaultNodesOptions: NodesOptions = {
  baseRadius: 0.082,
  radius: defaultRadius,
  color: defaultColor,
  minRadius: 0.0017,
  style: 'neuron',
  cullRadius: 0.999985,
}

const HIDDEN_SCALE = 1e-4

/**
 * How a node's body is drawn.
 *
 * - `cell`    an uneven, matte cell body
 * - `neuron`  a pale, translucent body with a nucleus, as under a microscope
 * - `fruit`   a fruit on a branch, with a stalk hollow, blush and speckles
 * - `model`   a clean painted ball, as in a desk model
 * - `planet`  banded and rocky worlds lit by a single sun
 */
export type NodeStyle = 'cell' | 'neuron' | 'fruit' | 'model' | 'planet'

export const NODE_STYLES: readonly NodeStyle[] = ['cell', 'neuron', 'fruit', 'model', 'planet']

const STYLE_SETTINGS: Record<
  NodeStyle,
  { index: number; lump: number; dimple: number; roughness: number; transparent: boolean }
> = {
  cell: { index: 0, lump: 1, dimple: 0, roughness: 0.95, transparent: false },
  neuron: { index: 1, lump: 0.85, dimple: 0, roughness: 1, transparent: true },
  fruit: { index: 2, lump: 0.22, dimple: 1, roughness: 0.62, transparent: false },
  model: { index: 3, lump: 0, dimple: 0, roughness: 0.78, transparent: false },
  planet: { index: 4, lump: 0, dimple: 0, roughness: 1, transparent: false },
}

export class NodesLayer {
  readonly mesh: InstancedMesh
  readonly selectionHalo: Mesh
  readonly hoverHalo: Mesh

  private readonly options: NodesOptions
  private readonly material: MeshPhysicalMaterial
  private readonly uniforms = { style: { value: 0 }, lump: { value: 1 }, dimple: { value: 0 } }
  private styleName: NodeStyle = 'neuron'
  private readonly dummy = new Object3D()
  private readonly matrix = new Matrix4()
  private readonly color = new Color()
  private readonly background = new Color()
  private readonly highlight = new Color()
  private readonly raycaster = new Raycaster()
  private readonly projected = new Vector3()
  /** Euclidean radius actually used per node, needed for hit testing and labels. */
  readonly radii: Float32Array

  constructor(private nodes: TreeNode[], theme: Theme, options: Partial<NodesOptions> = {}) {
    this.options = { ...defaultNodesOptions, ...options }
    this.radii = new Float32Array(nodes.length)

    // Dense enough that the displaced surface below stays smooth on the centred
    // node, which is the one being looked at.
    const geometry = new SphereGeometry(1, 48, 32)
    // Every cell body gets its own seed, so no two are the same lump. It is an
    // instance attribute rather than something derived from position, because
    // positions move with every navigation and the shape must not.
    const seeds = new Float32Array(nodes.length)
    for (let i = 0; i < nodes.length; i++) {
      const x = Math.sin((i + 1) * 91.3458) * 47453.5453
      seeds[i] = x - Math.floor(x)
    }
    geometry.setAttribute('seed', new InstancedBufferAttribute(seeds, 1))

    // One material, five looks, switched by uniforms so the choice can change
    // while the tree is on screen. Matte throughout: none of them rely on gloss.
    const material = new MeshPhysicalMaterial({ roughness: 0.95, metalness: 0 })
    this.material = material
    const noise = `
float btHash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float btNoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(btHash(i), btHash(i + vec3(1, 0, 0)), f.x),
        mix(btHash(i + vec3(0, 1, 0)), btHash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(btHash(i + vec3(0, 0, 1)), btHash(i + vec3(1, 0, 1)), f.x),
        mix(btHash(i + vec3(0, 1, 1)), btHash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}
float btFbm(vec3 x) {
  return btNoise(x) * 0.5 + btNoise(x * 2.1) * 0.27 + btNoise(x * 4.3) * 0.15 + btNoise(x * 8.9) * 0.08;
}`
    material.onBeforeCompile = (shader) => {
      shader.uniforms.btStyle = this.uniforms.style
      shader.uniforms.btLump = this.uniforms.lump
      shader.uniforms.btDimple = this.uniforms.dimple
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
attribute float seed;
uniform float btLump;
uniform float btDimple;
varying vec3 vLocal;
varying float vSeed;
varying float vSwell;
${noise}
// Signed offset of the surface along its normal: a broad lobe that makes the
// body lopsided, a finer one that keeps the outline from being smooth, and for
// fruit the two hollows at the stalk and the base.
float btSwell(vec3 q) {
  vec3 o = vec3(seed * 37.0, seed * 91.0, seed * 53.0);
  float lumps = (btNoise(q * 1.5 + o) - 0.5) * 0.3 + (btNoise(q * 3.6 + o) - 0.5) * 0.1;
  float hollows = exp(-(1.0 - q.y) * 9.0) * 0.3 + exp(-(1.0 + q.y) * 12.0) * 0.12;
  return lumps * btLump - hollows * btDimple;
}
vec3 btSurface(vec3 q) {
  q = normalize(q);
  return q * (1.0 + btSwell(q));
}`,
        )
        // The normal has to follow the displaced surface or the lumps would be
        // lit as if they were still a sphere. Two neighbours on the tangent
        // plane give it by finite difference.
        .replace(
          '#include <beginnormal_vertex>',
          `#include <beginnormal_vertex>
vec3 btP = normalize(position);
vec3 btT = normalize(cross(btP, abs(btP.y) < 0.95 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
vec3 btB = cross(btP, btT);
vec3 btHere = btSurface(btP);
vec3 btN = normalize(cross(btSurface(btP + btT * 0.06) - btHere, btSurface(btP + btB * 0.06) - btHere));
objectNormal = dot(btN, btP) < 0.0 ? -btN : btN;`,
        )
        .replace(
          '#include <begin_vertex>',
          `vec3 transformed = btHere;
vLocal = btP;
vSeed = seed;
vSwell = btSwell(btP);`,
        )
      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
uniform float btStyle;
varying vec3 vLocal;
varying float vSeed;
varying float vSwell;
${noise}`,
        )
        // The surface colour of each look. 0 cell, 1 neuron, 2 fruit, 3 model,
        // 4 planet.
        .replace(
          '#include <color_fragment>',
          `#include <color_fragment>
{
  vec3 o = vec3(vSeed * 19.0, vSeed * 7.0, vSeed * 31.0);
  vec3 base = diffuseColor.rgb;
  if (btStyle < 0.5) {
    // Cell: uneven colour, darker in the hollows.
    float m = btNoise(vLocal * 3.2 + o) * 0.55 + btNoise(vLocal * 8.5 + o) * 0.3 + btNoise(vLocal * 21.0 + o) * 0.15;
    float hollow = smoothstep(-0.16, 0.14, vSwell);
    diffuseColor.rgb = base * (0.72 + 0.4 * m) * (0.62 + 0.38 * hollow);
  } else if (btStyle < 1.5) {
    // Neuron under a microscope: a pale, grainy, stained body. The membrane
    // and nucleus are added below, where the view direction is known.
    float grain = btNoise(vLocal * 26.0 + o) * 0.6 + btNoise(vLocal * 60.0 + o) * 0.4;
    vec3 pale = mix(base, vec3(0.86, 0.84, 0.8), 0.5);
    diffuseColor.rgb = pale * (0.82 + 0.3 * grain);
  } else if (btStyle < 2.5) {
    // Fruit: a blush that runs from one side to the other, fine pale speckles,
    // and a darker hollow at the stalk.
    float blush = smoothstep(0.25, 0.75, btFbm(vLocal * 1.3 + o));
    vec3 ripe = mix(base * 0.78, mix(base, vec3(0.95, 0.8, 0.45), 0.3), blush);
    float streak = btNoise(vec3(atan(vLocal.z, vLocal.x) * 9.0, vLocal.y * 1.5, vSeed * 40.0));
    ripe *= 0.9 + 0.16 * streak;
    float speck = smoothstep(0.86, 0.93, btNoise(vLocal * 34.0 + o));
    ripe = mix(ripe, ripe * 1.3 + 0.08, speck * 0.6);
    float stalk = smoothstep(0.8, 1.0, vLocal.y);
    diffuseColor.rgb = mix(ripe, vec3(0.2, 0.14, 0.08), stalk * 0.75);
  } else if (btStyle < 3.5) {
    // Model: an evenly painted ball, shaded underneath as if it sat in a room.
    float under = 0.62 + 0.38 * smoothstep(-1.0, 0.5, vLocal.y);
    diffuseColor.rgb = base * under;
  } else {
    // Planet: every third one is banded like a gas giant, the rest are rock
    // with land, lowland and craters.
    float kind = fract(vSeed * 7.31);
    if (kind < 0.36) {
      float warp = btFbm(vLocal * 2.4 + o) - 0.5;
      float band = sin((vLocal.y + warp * 0.3) * (9.0 + vSeed * 9.0));
      float fine = btNoise(vec3(vLocal.y * 34.0, warp * 3.0, vSeed * 9.0));
      vec3 light = mix(base, vec3(0.93, 0.88, 0.78), 0.45);
      diffuseColor.rgb = mix(base * 0.52, light, band * 0.5 + 0.5) * (0.86 + 0.24 * fine);
    } else {
      float land = btFbm(vLocal * 2.3 + o);
      float rough = btFbm(vLocal * 9.0 + o);
      vec3 low = base * 0.4;
      vec3 high = mix(base, vec3(0.8, 0.76, 0.7), 0.35);
      vec3 ground = mix(low, high, smoothstep(0.38, 0.6, land + (rough - 0.5) * 0.22));
      float crater = smoothstep(0.7, 0.76, btNoise(vLocal * 6.5 + o * 1.7));
      diffuseColor.rgb = ground * (0.82 + 0.3 * rough) * (1.0 - crater * 0.3);
    }
  }
}`,
        )
        // What depends on the lit result and the view direction.
        .replace(
          '#include <opaque_fragment>',
          `{
  vec3 btView = normalize(vViewPosition);
  float facing = clamp(dot(normal, btView), 0.0, 1.0);
  if (btStyle > 0.5 && btStyle < 1.5) {
    // A thin body seen in transmitted light: the edge is where the membrane
    // stacks up, so it is darker and more opaque; the middle lets light
    // through; the nucleus is a dense, darker patch inside it.
    vec3 o = vec3(vSeed * 19.0, vSeed * 7.0, vSeed * 31.0);
    vec3 even = diffuseColor.rgb * 0.92;
    outgoingLight = mix(outgoingLight, even, 0.65);
    float membrane = pow(1.0 - facing, 2.2);
    outgoingLight *= 1.0 - membrane * 0.55;
    vec3 core = normalize(vec3(vSeed - 0.5, fract(vSeed * 3.7) - 0.5, 0.0) * 0.5 + vec3(0.0, 0.0, 1.0));
    vec3 viewLocal = normalize(normal + (btNoise(vLocal * 5.0 + o) - 0.5) * 0.25);
    float nucleus = smoothstep(0.86, 0.95, dot(viewLocal, core));
    outgoingLight *= 1.0 - nucleus * 0.42;
    float spot = smoothstep(0.985, 0.995, dot(viewLocal, core));
    outgoingLight *= 1.0 - spot * 0.35;
    diffuseColor.a = 0.55 + 0.4 * membrane + 0.25 * nucleus;
  } else if (btStyle > 3.5) {
    // One sun and nothing else: a hard day side and a night side that is
    // nearly black, which is what makes a ball read as a planet.
    vec3 sun = normalize((viewMatrix * vec4(2.0, 3.0, 4.0, 0.0)).xyz);
    float day = smoothstep(-0.12, 0.22, dot(normal, sun));
    outgoingLight = diffuseColor.rgb * (0.035 + 1.25 * day * max(0.0, dot(normal, sun) * 0.85 + 0.15));
    float air = pow(1.0 - facing, 3.0) * day;
    outgoingLight = mix(outgoingLight, diffuseColor.rgb * 0.6 + vec3(0.25, 0.32, 0.42), air * 0.28);
  }
}
#include <opaque_fragment>`,
        )
    }
    material.customProgramCacheKey = () => 'bt-cell-v4'
    this.mesh = new InstancedMesh(geometry, material, nodes.length)
    this.mesh.frustumCulled = false

    // Rings rather than glowing shells: a translucent sphere around the centred
    // node reads as fog and hides the very thing it is pointing at.
    const ringMaterial = (opacity: number) =>
      new MeshBasicMaterial({ transparent: true, opacity, depthWrite: false, depthTest: false })
    this.selectionHalo = new Mesh(new TorusGeometry(1, 0.052, 8, 64), ringMaterial(0.95))
    this.hoverHalo = new Mesh(new TorusGeometry(1, 0.04, 8, 44), ringMaterial(0.6))
    this.selectionHalo.visible = false
    this.hoverHalo.visible = false
    this.selectionHalo.renderOrder = 3
    this.hoverHalo.renderOrder = 3

    this.setStyle(this.options.style)
    this.setTheme(theme)
  }

  get style(): NodeStyle {
    return this.styleName
  }

  setStyle(style: NodeStyle): void {
    const settings = STYLE_SETTINGS[style]
    if (!settings) return
    this.styleName = style
    this.uniforms.style.value = settings.index
    this.uniforms.lump.value = settings.lump
    this.uniforms.dimple.value = settings.dimple
    this.material.roughness = settings.roughness
    this.material.transparent = settings.transparent
    this.material.needsUpdate = true
  }

  setTheme(theme: Theme): void {
    this.background.setHex(theme.background)
    this.highlight.setHex(theme.highlight)
    ;(this.selectionHalo.material as MeshBasicMaterial).color.setHex(theme.highlight)
    ;(this.hoverHalo.material as MeshBasicMaterial).color.setHex(theme.highlight)
  }

  /**
   * Recompute every instance transform and colour from the current `view`.
   *
   * @param faceCamera keeps the selection and hover rings square to the eye
   * @param reveal     growth front in depth units; Infinity means fully grown
   */
  update(
    theme: Theme,
    faceCamera?: Quaternion,
    reveal = Number.POSITIVE_INFINITY,
  ): void {
    const { baseRadius, radius, color, minRadius, cullRadius } = this.options
    const cull2 = cullRadius * cullRadius
    let selected: TreeNode | null = null
    let hovered: TreeNode | null = null

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i]
      const p = node.view
      const r2 = lengthSq(p)

      // Growth: nodes swell into place as the front passes their depth, with an
      // overshoot so they arrive with a little weight instead of just fading in.
      let grow = 1
      if (reveal !== Number.POSITIVE_INFINITY) {
        const t = reveal - node.depth
        if (t <= 0) {
          node.visible = false
          node.screenSize = 0
          this.radii[i] = 0
          this.dummy.position.set(p.x, p.y, p.z)
          this.dummy.scale.setScalar(HIDDEN_SCALE)
          this.dummy.updateMatrix()
          this.mesh.setMatrixAt(i, this.dummy.matrix)
          continue
        }
        grow = t >= 1 ? 1 : 1 - Math.pow(1 - t, 3) * (1 - Math.sin(t * Math.PI) * 0.22)
      }

      // 1 - |p|^2 is twice the conformal factor; using it directly keeps a
      // centred node at exactly `baseRadius`.
      const conformal = 1 - r2
      // A soma swells a little as it fires. Small on purpose: the flare in the
      // glow layer carries the event, and a node that visibly inflates reads as
      // a bouncing ball rather than as a cell.
      const fire = Math.max(0, node.fire)
      let r = baseRadius * radius(node) * conformal * grow * (1 + fire * 0.07)
      if (node.state.selected) r *= 1.3
      else if (node.state.hovered) r *= 1.16

      const dropped = r2 > cull2
      node.visible = !dropped
      // `screenSize` stays the true conformal size: it is what ranks labels, and
      // flooring it would make every node on the rim tie for attention.
      node.screenSize = dropped ? 0 : r
      const drawRadius = dropped ? 0 : Math.max(r, minRadius)
      this.radii[i] = drawRadius

      this.dummy.position.set(p.x, p.y, p.z)
      this.dummy.scale.setScalar(dropped ? HIDDEN_SCALE : drawRadius)
      this.dummy.updateMatrix()
      this.mesh.setMatrixAt(i, this.dummy.matrix)

      this.color.setHex(color(node, theme))
      if (node.state.dimmed) this.color.lerp(this.background, 0.82)
      if (node.state.selected) this.color.lerp(this.highlight, 0.35)
      else if (node.state.onPath) this.color.offsetHSL(0, 0.05, 0.12)
      else if (node.state.hovered) this.color.offsetHSL(0, 0, 0.16)
      // Firing brightens the soma itself, so the event is legible even with the
      // glow layer switched off.
      if (fire > 0 && !node.state.dimmed) this.color.lerp(this.highlight, fire * 0.22)
      this.mesh.setColorAt(i, this.color)

      if (node.state.selected) selected = node
      if (node.state.hovered) hovered = node
    }

    this.mesh.instanceMatrix.needsUpdate = true
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true
    this.mesh.computeBoundingSphere()

    this.placeRing(this.selectionHalo, selected, 1.62, faceCamera)
    this.placeRing(this.hoverHalo, hovered, 1.34, faceCamera)
  }

  private placeRing(
    ring: Mesh,
    node: TreeNode | null,
    factor: number,
    faceCamera?: Quaternion,
  ): void {
    if (!node || !node.visible) {
      ring.visible = false
      return
    }
    ring.visible = true
    ring.position.set(node.view.x, node.view.y, node.view.z)
    ring.scale.setScalar(this.radii[node.index] * factor)
    if (faceCamera) ring.quaternion.copy(faceCamera)
  }

  /**
   * Node under the pointer, or null. `ndc` is in normalised device coordinates.
   * Ties are broken toward the node nearest the camera.
   *
   * `tolerance` widens the hit test to the nearest node within that many CSS
   * pixels when the ray misses everything. A fingertip is about 8mm across and a
   * node away from the centre of the ball is a few pixels, so an exact ray test
   * makes most of the tree untouchable on a phone. It is opt-in because on a
   * mouse an exact test is what the user expects: the cursor is a point.
   */
  pick(
    ndc: Vector2,
    camera: PerspectiveCamera,
    tolerance = 0,
    viewport?: { width: number; height: number },
  ): TreeNode | null {
    this.raycaster.setFromCamera(ndc, camera)
    const hits = this.raycaster.intersectObject(this.mesh, false)
    for (const hit of hits) {
      const id = hit.instanceId
      if (id == null) continue
      const node = this.nodes[id]
      if (node?.visible) return node
    }

    if (tolerance <= 0 || !viewport) return null

    const halfHeight = viewport.height / 2
    const tapX = (ndc.x * 0.5 + 0.5) * viewport.width
    const tapY = (-ndc.y * 0.5 + 0.5) * viewport.height

    let best: TreeNode | null = null
    let bestScore = Number.POSITIVE_INFINITY

    for (const node of this.nodes) {
      if (!node.visible || node.state.dimmed) continue
      this.projected.set(node.view.x, node.view.y, node.view.z).project(camera)
      if (this.projected.z < -1 || this.projected.z > 1) continue

      const sx = (this.projected.x * 0.5 + 0.5) * viewport.width
      const sy = (-this.projected.y * 0.5 + 0.5) * viewport.height
      const dx = sx - tapX
      const dy = sy - tapY
      const distance = Math.hypot(dx, dy)
      if (distance > tolerance) continue

      // Prefer the closest to the finger, but let a visibly bigger node win a
      // near tie: the large one is almost certainly what was aimed at.
      const score = distance - Math.min(tolerance * 0.5, this.radii[node.index] * halfHeight * 0.6)
      if (score < bestScore) {
        bestScore = score
        best = node
      }
    }
    return best
  }

  /** World position of a node's centre, for projection to screen. */
  worldPosition(node: TreeNode, out = new Vector3()): Vector3 {
    return out.set(node.view.x, node.view.y, node.view.z)
  }

  /** Read back an instance's world matrix (used by tests and debugging). */
  matrixAt(index: number): Matrix4 {
    this.mesh.getMatrixAt(index, this.matrix)
    return this.matrix
  }

  dispose(): void {
    this.mesh.geometry.dispose()
    ;(this.mesh.material as MeshPhysicalMaterial).dispose()
    this.mesh.dispose()
    this.selectionHalo.geometry.dispose()
    ;(this.selectionHalo.material as MeshBasicMaterial).dispose()
    this.hoverHalo.geometry.dispose()
    ;(this.hoverHalo.material as MeshBasicMaterial).dispose()
  }
}
