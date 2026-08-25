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
  NormalBlending,
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

  /** `ink` mode dims rather than adds; see `setTheme`. */
  private mode: Theme['glow'] = 'additive'

  constructor(
    private readonly nodes: TreeNode[],
    theme: Theme,
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
    // Behind the node spheres but in front of the filaments.
    this.mesh.renderOrder = 2
    this.setTheme(theme)
  }

  /**
   * On a dark ground a halo is added light. On a light ground added light can
   * only reach white, so the same halo becomes an ink bleed: the era colour laid
   * over the page at low opacity, which reads as depth rather than as haze.
   */
  setTheme(theme: Theme): void {
    this.mode = theme.glow
    const material = this.mesh.material as MeshBasicMaterial
    material.blending = theme.glow === 'additive' ? AdditiveBlending : NormalBlending
    material.needsUpdate = true
  }

  /**
   * `radii` is the drawn node radius per node. Firing comes from each node's own
   * membrane potential, so a soma flares exactly when the spike reaches it.
   */
  update(theme: Theme, radii: Float32Array, faceCamera: Quaternion): void {
    const { scale, minScale, color, intensity } = this.options
    const ink = this.mode === 'ink'

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i]
      const p = node.view
      const fire = Math.max(0, node.fire)

      if (!node.visible || node.state.dimmed) {
        this.dummy.position.set(p.x, p.y, p.z)
        this.dummy.scale.setScalar(1e-5)
        this.dummy.quaternion.copy(faceCamera)
        this.dummy.updateMatrix()
        this.mesh.setMatrixAt(i, this.dummy.matrix)
        continue
      }

      // The flare is the visible part of the spike arriving at the soma, so it
      // is driven by the potential rather than by a decorative oscillation.
      let size = Math.max(radii[i] * scale, minScale) * (1 + fire * 0.55)
      if (node.state.selected) size *= 1.75
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
      let strength = 0.35 + focus * 0.65 + fire * 0.8
      if (node.state.selected) strength = 1.1 + fire * 0.5
      else if (node.state.hovered || node.state.onPath) strength *= 1.35
      // In ink mode the alpha does the work and a scaled-up colour just washes
      // out, so the colour stays saturated and only the opacity varies.
      this.color.multiplyScalar(ink ? Math.min(1, 0.55 + strength * 0.25) : strength)
      this.mesh.setColorAt(i, this.color)
    }

    this.mesh.instanceMatrix.needsUpdate = true
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true
    ;(this.mesh.material as MeshBasicMaterial).opacity = ink ? intensity * 0.26 : intensity
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
