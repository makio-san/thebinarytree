/**
 * Renderer, camera, lights, backdrop, and the boundary of the ball.
 *
 * The ball itself never moves or rotates: navigation happens by transforming the
 * node positions with a hyperbolic isometry, not by turning the object. The
 * camera orbits purely so you can look at the 3D structure from another side,
 * and dollies all the way inside the ball so you can fly through the tree.
 */

import {
  AmbientLight,
  BufferGeometry,
  Color,
  DirectionalLight,
  Float32BufferAttribute,
  FogExp2,
  Group,
  LineBasicMaterial,
  LineLoop,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { Starfield, type StarfieldOptions } from './starfield'
import type { Theme } from './theme'

const RIM_SEGMENTS = 128

export interface StageOptions {
  /**
   * Closest the camera may get to the centre. Below 1 the camera is inside the
   * ball, which is the point: at 0.4 a centred node fills a third of the screen
   * and its neighbours are still in frame.
   */
  minDistance: number
  maxDistance: number
  distance: number
  /**
   * Bloom pass. Expensive on weak GPUs, so it defaults off for coarse pointers
   * and small viewports; the additive glow layer carries the look without it.
   */
  bloom: boolean
  bloomStrength: number
  bloomRadius: number
  bloomThreshold: number
  /** Star backdrop. Disabled automatically on the light theme. */
  stars: boolean | Partial<StarfieldOptions>
  /** Cap on device pixel ratio. Lower is faster on dense phone screens. */
  maxPixelRatio: number
}

const coarsePointer = (): boolean =>
  typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches

export const defaultStageOptions: StageOptions = {
  minDistance: 0.38,
  maxDistance: 7,
  // Close enough that the populated part of the ball fills the frame. The
  // outermost levels crowd the rim, so framing the whole unit sphere wastes
  // most of the viewport on empty space.
  distance: 2.6,
  bloom: !coarsePointer(),
  // Tuned against the vessels: they cover real area now, and a low threshold
  // blooms their whole surface into a white mass instead of just their crests.
  bloomStrength: 0.44,
  bloomRadius: 0.55,
  bloomThreshold: 0.52,
  stars: true,
  maxPixelRatio: 2,
}

export class Stage {
  readonly renderer: WebGLRenderer
  readonly scene = new Scene()
  readonly camera: PerspectiveCamera
  readonly world = new Group()
  readonly canvas: HTMLCanvasElement
  readonly starfield: Starfield | null

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
  private composer: EffectComposer | null = null
  private bloomPass: UnrealBloomPass | null = null
  private theme: Theme
  private width = 1
  private height = 1

  constructor(container: HTMLElement, theme: Theme, options: Partial<StageOptions> = {}) {
    this.options = { ...defaultStageOptions, ...options }
    this.theme = theme
    this.distance = this.options.distance

    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })
    this.renderer.setPixelRatio(
      Math.min(globalThis.devicePixelRatio ?? 1, this.options.maxPixelRatio),
    )
    this.canvas = this.renderer.domElement
    this.canvas.className = 'bt-canvas'
    container.appendChild(this.canvas)

    // A near plane this close is what lets the camera sit inside the ball
    // without clipping the node it is looking at.
    this.camera = new PerspectiveCamera(42, 1, 0.004, 200)
    this.scene.add(this.world)

    if (this.options.stars) {
      const starOptions = typeof this.options.stars === 'object' ? this.options.stars : {}
      this.starfield = new Starfield(starOptions)
      this.scene.add(this.starfield.group)
    } else {
      this.starfield = null
    }

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

    if (this.options.bloom) this.setupComposer()

    this.applyTheme(theme)
    this.updateCamera()
  }

  private setupComposer(): void {
    const composer = new EffectComposer(this.renderer)
    composer.addPass(new RenderPass(this.scene, this.camera))
    const bloom = new UnrealBloomPass(
      new Vector2(this.width, this.height),
      this.options.bloomStrength,
      this.options.bloomRadius,
      this.options.bloomThreshold,
    )
    composer.addPass(bloom)
    composer.addPass(new OutputPass())
    this.composer = composer
    this.bloomPass = bloom
  }

  applyTheme(theme: Theme): void {
    this.theme = theme
    const bg = new Color(theme.background)
    this.scene.background = bg
    // Exponential fog rather than linear: with the camera able to sit inside the
    // ball, a linear near/far pair either clips the foreground or flattens the
    // distance. Density is retuned per zoom in updateCamera.
    this.scene.fog = new FogExp2(theme.background, 0.24)
    ;(this.shell.material as MeshBasicMaterial).color = new Color(theme.boundary)
    ;(this.rim.material as LineBasicMaterial).color = new Color(theme.boundary)
    this.renderer.setClearColor(bg, 1)
    // Stars only make sense against a dark ground.
    this.starfield?.setVisible(bg.r * 0.299 + bg.g * 0.587 + bg.b * 0.114 < 0.22)
    this.updateCamera()
  }

  get currentTheme(): Theme {
    return this.theme
  }

  get bloomEnabled(): boolean {
    return this.composer !== null
  }

  resize(width: number, height: number): void {
    this.width = Math.max(1, width)
    this.height = Math.max(1, height)
    this.renderer.setSize(this.width, this.height, false)
    this.camera.aspect = this.width / this.height
    // Pull back on narrow viewports so the ball still fits.
    this.camera.fov = this.camera.aspect < 0.85 ? 56 : 42
    this.camera.updateProjectionMatrix()
    this.composer?.setSize(this.width, this.height)
    this.bloomPass?.setSize(this.width, this.height)
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

  /** 0 far out, 1 pressed right up against the centre. Drives label detail. */
  get zoom(): number {
    const { minDistance, maxDistance } = this.options
    const t = (maxDistance - this.distance) / (maxDistance - minDistance)
    return Math.max(0, Math.min(1, t))
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
    // Fog density tracks the inverse of the viewing distance, so the depth cue
    // stays the same strength relative to what is on screen. A fixed density
    // either fogs out the whole ball when you pull back or does nothing once you
    // are inside it. The starfield opts out of fog entirely; at a radius of 26
    // any usable density would erase it.
    // Kept deliberately gentle. The links already fade by their own hyperbolic
    // law (the 1 - |p|^2 term), so fog is only here to separate front from back;
    // stacking a strong camera-depth fade on top of that erases the web.
    const fog = this.scene.fog as FogExp2 | null
    if (fog) fog.density = 0.3 / Math.max(0.45, this.distance)
    // The rim is a useful frame from outside and clutter from inside.
    const inside = this.distance < 1.05
    this.rim.visible = !inside
    this.shell.visible = !inside
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
    if (this.composer) this.composer.render()
    else this.renderer.render(this.scene, this.camera)
  }

  dispose(): void {
    this.shell.geometry.dispose()
    ;(this.shell.material as MeshBasicMaterial).dispose()
    this.rim.geometry.dispose()
    ;(this.rim.material as LineBasicMaterial).dispose()
    this.starfield?.dispose()
    this.composer?.dispose()
    this.renderer.dispose()
    this.canvas.remove()
  }
}
