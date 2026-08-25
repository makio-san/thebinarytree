/**
 * Renderer, camera, lights and the boundary sphere of the ball.
 *
 * The ball itself never moves or rotates: navigation happens by transforming the
 * node positions with a hyperbolic isometry, not by turning the object. The
 * camera orbits purely so you can look at the 3D structure from another side.
 */

import {
  AmbientLight,
  BufferGeometry,
  Color,
  DirectionalLight,
  Float32BufferAttribute,
  Fog,
  Group,
  LineBasicMaterial,
  LineLoop,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from 'three'
import type { Theme } from './theme'

const RIM_SEGMENTS = 128

export interface StageOptions {
  minDistance: number
  maxDistance: number
  distance: number
}

export const defaultStageOptions: StageOptions = {
  minDistance: 1.45,
  maxDistance: 7,
  // Close enough that the populated part of the ball fills the frame. The
  // outermost levels crowd the rim, so framing the whole unit sphere wastes
  // most of the viewport on empty space.
  distance: 2.6,
}

export class Stage {
  readonly renderer: WebGLRenderer
  readonly scene = new Scene()
  readonly camera: PerspectiveCamera
  readonly world = new Group()
  readonly canvas: HTMLCanvasElement

  /** Camera orbit, spherical around the origin. */
  yaw = 0.35
  pitch = 0.22
  distance: number

  private readonly shell: Mesh
  private readonly rim: LineLoop
  private readonly ambient: AmbientLight
  private readonly key: DirectionalLight
  private readonly fill: DirectionalLight
  private readonly options: StageOptions
  private theme: Theme
  private width = 1
  private height = 1

  constructor(container: HTMLElement, theme: Theme, options: Partial<StageOptions> = {}) {
    this.options = { ...defaultStageOptions, ...options }
    this.theme = theme
    this.distance = this.options.distance

    this.renderer = new WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio ?? 1, 2))
    this.canvas = this.renderer.domElement
    this.canvas.className = 'bt-canvas'
    container.appendChild(this.canvas)

    this.camera = new PerspectiveCamera(42, 1, 0.01, 100)
    this.scene.add(this.world)

    // A faint inward facing shell reads as glass and gives the eye a horizon.
    this.shell = new Mesh(
      new SphereGeometry(1, 64, 48),
      new MeshBasicMaterial({ transparent: true, opacity: 0.05, depthWrite: false }),
    )
    this.shell.renderOrder = -2
    this.world.add(this.shell)

    // The ball's silhouette: a unit circle kept perpendicular to the view.
    const rimPositions: number[] = []
    for (let i = 0; i < RIM_SEGMENTS; i++) {
      const a = (i / RIM_SEGMENTS) * Math.PI * 2
      rimPositions.push(Math.cos(a), Math.sin(a), 0)
    }
    const rimGeometry = new BufferGeometry()
    rimGeometry.setAttribute('position', new Float32BufferAttribute(rimPositions, 3))
    this.rim = new LineLoop(
      rimGeometry,
      new LineBasicMaterial({ transparent: true, opacity: 0.35, depthWrite: false }),
    )
    this.rim.renderOrder = -1
    this.world.add(this.rim)

    this.ambient = new AmbientLight(0xffffff, 1.15)
    this.key = new DirectionalLight(0xffffff, 1.5)
    this.key.position.set(2, 3, 4)
    this.fill = new DirectionalLight(0x88a4ff, 0.55)
    this.fill.position.set(-3, -1.5, -2)
    this.scene.add(this.ambient, this.key, this.fill)

    this.applyTheme(theme)
    this.updateCamera()
  }

  applyTheme(theme: Theme): void {
    this.theme = theme
    const bg = new Color(theme.background)
    this.scene.background = bg
    this.scene.fog = new Fog(theme.background, this.options.minDistance, this.options.maxDistance + 2.5)
    ;(this.shell.material as MeshBasicMaterial).color = new Color(theme.boundary)
    ;(this.rim.material as LineBasicMaterial).color = new Color(theme.boundary)
    this.renderer.setClearColor(bg, 1)
  }

  get currentTheme(): Theme {
    return this.theme
  }

  resize(width: number, height: number): void {
    this.width = Math.max(1, width)
    this.height = Math.max(1, height)
    this.renderer.setSize(this.width, this.height, false)
    this.camera.aspect = this.width / this.height
    // Pull back on narrow viewports so the ball still fits.
    this.camera.fov = this.camera.aspect < 0.85 ? 54 : 42
    this.camera.updateProjectionMatrix()
  }

  get size(): { width: number; height: number } {
    return { width: this.width, height: this.height }
  }

  orbit(deltaYaw: number, deltaPitch: number): void {
    this.yaw += deltaYaw
    this.pitch = Math.max(-1.45, Math.min(1.45, this.pitch + deltaPitch))
    this.updateCamera()
  }

  dolly(factor: number): void {
    this.distance = Math.max(
      this.options.minDistance,
      Math.min(this.options.maxDistance, this.distance * factor),
    )
    this.updateCamera()
  }

  updateCamera(): void {
    const cp = Math.cos(this.pitch)
    this.camera.position.set(
      this.distance * cp * Math.sin(this.yaw),
      this.distance * Math.sin(this.pitch),
      this.distance * cp * Math.cos(this.yaw),
    )
    this.camera.lookAt(0, 0, 0)
    this.camera.updateMatrixWorld()
    // Keep the silhouette circle square to the eye.
    this.rim.quaternion.copy(this.camera.quaternion)
    // Track the fog to the current zoom so the front/back cue stays readable at
    // every distance instead of washing out when you pull away.
    const fog = this.scene.fog as Fog | null
    if (fog) {
      fog.near = Math.max(0.05, this.distance - 1.05)
      fog.far = this.distance + 1.75
    }
  }

  /** Project a ball point to CSS pixel coordinates inside the container. */
  project(point: Vector3, out = { x: 0, y: 0, depth: 0 }): { x: number; y: number; depth: number } {
    const p = point.clone().project(this.camera)
    out.x = (p.x * 0.5 + 0.5) * this.width
    out.y = (-p.y * 0.5 + 0.5) * this.height
    out.depth = p.z
    return out
  }

  render(): void {
    this.renderer.render(this.scene, this.camera)
  }

  dispose(): void {
    this.shell.geometry.dispose()
    ;(this.shell.material as MeshBasicMaterial).dispose()
    this.rim.geometry.dispose()
    ;(this.rim.material as LineBasicMaterial).dispose()
    this.renderer.dispose()
    this.canvas.remove()
  }
}
