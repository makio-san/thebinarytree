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
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
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
  cullRadius: 0.999985,
}

const HIDDEN_SCALE = 1e-4

export class NodesLayer {
  readonly mesh: InstancedMesh
  readonly selectionHalo: Mesh
  readonly hoverHalo: Mesh

  private readonly options: NodesOptions
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

    const geometry = new SphereGeometry(1, 24, 16)
    const material = new MeshStandardMaterial({ roughness: 0.42, metalness: 0.08 })
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

    this.setTheme(theme)
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
      let r = baseRadius * radius(node) * conformal * grow * (1 + fire * 0.14)
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
      if (fire > 0 && !node.state.dimmed) this.color.lerp(this.highlight, fire * 0.42)
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
    ;(this.mesh.material as MeshStandardMaterial).dispose()
    this.mesh.dispose()
    this.selectionHalo.geometry.dispose()
    ;(this.selectionHalo.material as MeshBasicMaterial).dispose()
    this.hoverHalo.geometry.dispose()
    ;(this.hoverHalo.material as MeshBasicMaterial).dispose()
  }
}
