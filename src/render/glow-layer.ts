/**
 * Additive glow around each node, so a node reads as a light source rather than
 * a painted ball.
 *
 * Instanced camera-facing quads with a radial falloff texture. Cheaper and far
 * more controllable than a bloom pass alone: the halo scales with the node's own
 * conformal radius, so the thing at the centre of the ball blazes and the rim
 * becomes a dust of faint points. That gradient is what makes the picture read
 * as depth rather than as a flat scatter.
 */

import {
  AdditiveBlending,
  CanvasTexture,
  Color,
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  type Quaternion,
  type Texture,
} from 'three'
import type { TreeNode } from '../model/types'
import type { Theme } from './theme'

export interface GlowOptions {
  /** Halo radius as a multiple of the node radius. */
  scale: number
  /** Overall strength. */
  intensity: number
  /** Halo radius floor, so distant nodes still register as specks of light. */
  minScale: number
  color: (node: TreeNode, theme: Theme) => number
}

export const defaultGlowOptions: GlowOptions = {
  scale: 4.2,
  intensity: 0.55,
  minScale: 0.011,
  color: (n, theme) => theme.eraColor(n.data.era as string | undefined),
}

function haloTexture(size = 128): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const half = size / 2
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half)
  // A tight bright core with a long tail reads as glow; a linear ramp reads as
  // a grey disc.
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.12, 'rgba(255,255,255,0.62)')
  gradient.addColorStop(0.3, 'rgba(255,255,255,0.2)')
  gradient.addColorStop(0.62, 'rgba(255,255,255,0.05)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return new CanvasTexture(canvas)
}

export class GlowLayer {
  readonly mesh: InstancedMesh

  private readonly options: GlowOptions
  private readonly dummy = new Object3D()
  private readonly color = new Color()
  private readonly texture: Texture

  constructor(
    private readonly nodes: TreeNode[],
    options: Partial<GlowOptions> = {},
  ) {
    this.options = { ...defaultGlowOptions, ...options }
    this.texture = haloTexture()

    const material = new MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
      // Depth tested, so a halo behind a node in front does not bleed over it.
      depthTest: true,
      opacity: this.options.intensity,
    })

    this.mesh = new InstancedMesh(new PlaneGeometry(1, 1), material, nodes.length)
    this.mesh.frustumCulled = false
    // Behind the node spheres but in front of the links.
    this.mesh.renderOrder = 2
  }

  /**
   * `radii` is the drawn node radius per node, `pulse` a 0..1 breathing value
   * shared with the link flow so the whole scene beats together.
   */
  update(theme: Theme, radii: Float32Array, faceCamera: Quaternion, pulse: number): void {
    const { scale, minScale, color, intensity } = this.options

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i]
      const p = node.view

      if (!node.visible || node.state.dimmed) {
        this.dummy.position.set(p.x, p.y, p.z)
        this.dummy.scale.setScalar(1e-5)
        this.dummy.quaternion.copy(faceCamera)
        this.dummy.updateMatrix()
        this.mesh.setMatrixAt(i, this.dummy.matrix)
        continue
      }

      let size = Math.max(radii[i] * scale, minScale)
      if (node.state.selected) size *= 1.7 + pulse * 0.28
      else if (node.state.hovered) size *= 1.3
      else if (node.state.onPath) size *= 1.16

      this.dummy.position.set(p.x, p.y, p.z)
      this.dummy.quaternion.copy(faceCamera)
      this.dummy.scale.setScalar(size)
      this.dummy.updateMatrix()
      this.mesh.setMatrixAt(i, this.dummy.matrix)

      this.color.setHex(color(node, theme))
      // Nodes near the centre are the ones being read; let them burn brighter
      // and keep the rim quiet so it stays a backdrop.
      const focus = 1 - (p.x * p.x + p.y * p.y + p.z * p.z)
      let strength = 0.35 + focus * 0.65
      if (node.state.selected) strength = 1.15 + pulse * 0.2
      else if (node.state.hovered || node.state.onPath) strength *= 1.35
      this.color.multiplyScalar(strength)
      this.mesh.setColorAt(i, this.color)
    }

    this.mesh.instanceMatrix.needsUpdate = true
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true
    ;(this.mesh.material as MeshBasicMaterial).opacity = intensity
  }

  setIntensity(intensity: number): void {
    this.options.intensity = intensity
  }

  dispose(): void {
    this.mesh.geometry.dispose()
    ;(this.mesh.material as MeshBasicMaterial).dispose()
    this.texture.dispose()
    this.mesh.dispose()
  }
}
