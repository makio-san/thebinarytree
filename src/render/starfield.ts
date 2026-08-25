/**
 * The background: two shells of stars and a faint nebula wash.
 *
 * It is not decoration for its own sake. The ball has no edges of its own once
 * you fly inside it, and without a fixed backdrop a camera orbit reads as the
 * tree spinning rather than as you moving around it. The stars give the eye a
 * stationary frame, and their parallax is what makes the inside of the ball feel
 * like a space you are travelling through.
 *
 * Two shells at different radii, sizes, and drift rates, so the parallax is
 * layered rather than flat.
 */

import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  Points,
  PointsMaterial,
  Sprite,
  SpriteMaterial,
  type Texture,
} from 'three'

export interface StarfieldOptions {
  /** Stars in the near shell. The far shell gets twice as many, half the size. */
  count: number
  /** Radius of the near shell, in ball units. */
  radius: number
  /** Radians per second of drift on the near shell. */
  drift: number
  /** Peak opacity. Twinkle oscillates below this. */
  opacity: number
  /** Soft coloured wash behind the stars. Set false for a plain black field. */
  nebula: boolean
}

export const defaultStarfieldOptions: StarfieldOptions = {
  count: 900,
  radius: 26,
  drift: 0.006,
  opacity: 0.9,
  nebula: true,
}

/** A soft round dot, so stars are discs with falloff rather than hard squares. */
function dotTexture(size = 64): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const half = size / 2
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.22, 'rgba(255,255,255,0.85)')
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.22)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  const texture = new CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/** A very diffuse blob, used a few times at low opacity as a nebula. */
function cloudTexture(size = 256): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const half = size / 2
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half)
  gradient.addColorStop(0, 'rgba(255,255,255,0.5)')
  gradient.addColorStop(0.45, 'rgba(255,255,255,0.14)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return new CanvasTexture(canvas)
}

/**
 * Deterministic pseudo random in [0,1). The scene must look identical on every
 * load, so `Math.random` is not an option.
 */
function hash(n: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

/** Points spread evenly over a sphere by the Fibonacci lattice. */
function shell(count: number, radius: number, jitter: number): BufferAttribute {
  const positions = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    const scale = radius * (1 - jitter * 0.5 + hash(i) * jitter)
    positions[i * 3] = Math.cos(theta) * r * scale
    positions[i * 3 + 1] = y * scale
    positions[i * 3 + 2] = Math.sin(theta) * r * scale
  }
  return new BufferAttribute(positions, 3)
}

/** Slightly varied star colours: mostly white, some warm, some blue. */
function tint(count: number, base: Color): BufferAttribute {
  const colors = new Float32Array(count * 3)
  const warm = new Color(0xffd9a8)
  const cool = new Color(0x9fc4ff)
  const c = new Color()
  for (let i = 0; i < count; i++) {
    const pick = hash(i + 101)
    c.copy(base)
    if (pick > 0.82) c.lerp(warm, 0.65)
    else if (pick > 0.64) c.lerp(cool, 0.6)
    const brightness = 0.55 + hash(i + 7) * 0.45
    colors[i * 3] = c.r * brightness
    colors[i * 3 + 1] = c.g * brightness
    colors[i * 3 + 2] = c.b * brightness
  }
  return new BufferAttribute(colors, 3)
}

export class Starfield {
  readonly group = new Group()

  private readonly near: Points
  private readonly far: Points
  private readonly nearMaterial: PointsMaterial
  private readonly farMaterial: PointsMaterial
  private readonly clouds: Sprite[] = []
  private readonly dot: Texture
  private readonly cloud: Texture | null
  private readonly options: StarfieldOptions

  constructor(options: Partial<StarfieldOptions> = {}) {
    this.options = { ...defaultStarfieldOptions, ...options }
    const { count, radius, opacity, nebula } = this.options

    this.dot = dotTexture()
    const white = new Color(0xffffff)

    const nearGeometry = new BufferGeometry()
    nearGeometry.setAttribute('position', shell(count, radius, 0.35))
    nearGeometry.setAttribute('color', tint(count, white))

    const farGeometry = new BufferGeometry()
    farGeometry.setAttribute('position', shell(count * 2, radius * 1.9, 0.3))
    farGeometry.setAttribute('color', tint(count * 2, white))

    this.nearMaterial = new PointsMaterial({
      fog: false,
      map: this.dot,
      size: 0.34,
      sizeAttenuation: true,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexColors: true,
    })
    this.farMaterial = new PointsMaterial({
      fog: false,
      map: this.dot,
      size: 0.2,
      sizeAttenuation: true,
      transparent: true,
      opacity: opacity * 0.55,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexColors: true,
    })

    this.near = new Points(nearGeometry, this.nearMaterial)
    this.far = new Points(farGeometry, this.farMaterial)
    this.near.frustumCulled = false
    this.far.frustumCulled = false
    this.near.renderOrder = -20
    this.far.renderOrder = -21
    this.group.add(this.far, this.near)

    this.cloud = nebula ? cloudTexture() : null
    if (this.cloud) {
      // Three widely separated washes, so the field is not uniformly black.
      const palette = [0x2a4a8f, 0x6b2f6e, 0x18566b]
      for (let i = 0; i < palette.length; i++) {
        const sprite = new Sprite(
          new SpriteMaterial({
            fog: false,
            map: this.cloud,
            color: palette[i],
            transparent: true,
            opacity: 0.16,
            depthWrite: false,
            depthTest: false,
            blending: AdditiveBlending,
          }),
        )
        const a = (i / palette.length) * Math.PI * 2
        sprite.position.set(
          Math.cos(a) * radius * 1.2,
          (hash(i + 31) - 0.5) * radius,
          Math.sin(a) * radius * 1.2,
        )
        sprite.scale.setScalar(radius * (1.3 + hash(i + 55) * 0.7))
        sprite.renderOrder = -30
        this.clouds.push(sprite)
        this.group.add(sprite)
      }
    }
  }

  /** `seconds` is a monotonic clock; drift and twinkle are derived from it. */
  update(seconds: number): void {
    this.near.rotation.y = seconds * this.options.drift
    this.near.rotation.x = Math.sin(seconds * 0.03) * 0.05
    this.far.rotation.y = -seconds * this.options.drift * 0.45

    // Whole-layer twinkle. Per-star flicker would mean rewriting a colour
    // buffer every frame for an effect nobody can consciously follow.
    const pulse = 0.86 + Math.sin(seconds * 0.9) * 0.14
    this.nearMaterial.opacity = this.options.opacity * pulse
    this.farMaterial.opacity = this.options.opacity * 0.55 * (1.86 - pulse)
  }

  /** Stars are a dark-theme device; fade them out entirely on a light ground. */
  setVisible(visible: boolean): void {
    this.group.visible = visible
  }

  dispose(): void {
    this.near.geometry.dispose()
    this.far.geometry.dispose()
    this.nearMaterial.dispose()
    this.farMaterial.dispose()
    this.dot.dispose()
    this.cloud?.dispose()
    for (const sprite of this.clouds) (sprite.material as SpriteMaterial).dispose()
  }
}
