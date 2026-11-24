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
  DynamicDrawUsage,
  InstancedBufferAttribute,
  InstancedMesh,
  Matrix4,
  MeshBasicMaterial,
  NormalBlending,
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
  intensity: 0.22,
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
  private readonly turn = new Matrix4()
  private readonly color = new Color()
  private readonly texture: Texture
  /** Each node's colour for the current theme, in the renderer's working space. */
  private readonly baseColors: Float32Array
  private colorsFor: Theme | null = null

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

    this.baseColors = new Float32Array(nodes.length * 3)
    this.mesh = new InstancedMesh(new PlaneGeometry(1, 1), material, nodes.length)
    this.mesh.frustumCulled = false
    // Behind the node spheres but in front of the filaments.
    this.mesh.renderOrder = 2
    this.mesh.instanceMatrix.setUsage(DynamicDrawUsage)
    this.mesh.instanceColor = new InstancedBufferAttribute(new Float32Array(nodes.length * 3), 3)
    this.mesh.instanceColor.setUsage(DynamicDrawUsage)
    this.mesh.count = 0
    this.setTheme(theme)
  }

  /**
   * On a dark ground a halo is added light. On a light ground added light can
   * only reach white, so the same halo becomes an ink bleed: the era colour laid
   * over the page at low opacity, which reads as depth rather than as haze.
   */
  setTheme(theme: Theme): void {
    this.colorsFor = null
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

    const base = this.baseColors
    if (this.colorsFor !== theme) {
      for (let i = 0; i < this.nodes.length; i++) {
        this.color.setHex(color(this.nodes[i], theme))
        base[i * 3] = this.color.r
        base[i * 3 + 1] = this.color.g
        base[i * 3 + 2] = this.color.b
      }
      this.colorsFor = theme
    }

    // Every halo faces the eye the same way, so the rotation is worked out once
    // and each instance is that rotation scaled, plus its place.
    const e = this.turn.makeRotationFromQuaternion(faceCamera).elements
    const matrix = this.mesh.instanceMatrix.array as Float32Array
    const colors = this.mesh.instanceColor!.array as Float32Array
    let count = 0

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i]
      const state = node.state
      // A hidden halo is left out rather than drawn at no size.
      if (!node.visible || state.dimmed) continue
      const p = node.view
      const fire = Math.max(0, node.fire)

      let size = Math.max(radii[i] * scale, minScale) * (1 + fire * 0.26)
      if (state.selected) size *= 1.75
      else if (state.hovered) size *= 1.3
      else if (state.onPath) size *= 1.16

      const m = count * 16
      matrix[m] = e[0] * size
      matrix[m + 1] = e[1] * size
      matrix[m + 2] = e[2] * size
      matrix[m + 3] = 0
      matrix[m + 4] = e[4] * size
      matrix[m + 5] = e[5] * size
      matrix[m + 6] = e[6] * size
      matrix[m + 7] = 0
      matrix[m + 8] = e[8] * size
      matrix[m + 9] = e[9] * size
      matrix[m + 10] = e[10] * size
      matrix[m + 11] = 0
      matrix[m + 12] = p.x
      matrix[m + 13] = p.y
      matrix[m + 14] = p.z
      matrix[m + 15] = 1

      const focus = 1 - (p.x * p.x + p.y * p.y + p.z * p.z)
      let strength = 0.35 + focus * 0.65 + fire * 0.42
      if (state.selected) strength = 1.1 + fire * 0.28
      else if (state.hovered || state.onPath) strength *= 1.35
      const k = ink ? Math.min(1, 0.55 + strength * 0.25) : strength
      const c = count * 3
      colors[c] = base[i * 3] * k
      colors[c + 1] = base[i * 3 + 1] * k
      colors[c + 2] = base[i * 3 + 2] * k
      count++
    }

    this.mesh.count = count
    this.mesh.instanceMatrix.needsUpdate = true
    this.mesh.instanceColor!.needsUpdate = true
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
