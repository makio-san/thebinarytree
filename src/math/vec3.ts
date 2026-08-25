/**
 * Minimal, dependency free 3D vector helpers.
 *
 * Kept separate from three.js on purpose: the geometry core of this library is
 * pure math and must stay testable in plain node, without a WebGL context.
 * Conversion to `THREE.Vector3` happens only in `src/render`.
 */

export interface Vec3 {
  x: number
  y: number
  z: number
}

export const v3 = (x = 0, y = 0, z = 0): Vec3 => ({ x, y, z })

export const ZERO: Vec3 = Object.freeze({ x: 0, y: 0, z: 0 })
export const UNIT_X: Vec3 = Object.freeze({ x: 1, y: 0, z: 0 })
export const UNIT_Y: Vec3 = Object.freeze({ x: 0, y: 1, z: 0 })
export const UNIT_Z: Vec3 = Object.freeze({ x: 0, y: 0, z: 1 })

export const clone = (a: Vec3): Vec3 => ({ x: a.x, y: a.y, z: a.z })

export const add = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z })

export const sub = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z })

export const scale = (a: Vec3, s: number): Vec3 => ({ x: a.x * s, y: a.y * s, z: a.z * s })

export const negate = (a: Vec3): Vec3 => ({ x: -a.x, y: -a.y, z: -a.z })

export const dot = (a: Vec3, b: Vec3): number => a.x * b.x + a.y * b.y + a.z * b.z

export const cross = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
})

export const lengthSq = (a: Vec3): number => a.x * a.x + a.y * a.y + a.z * a.z

export const length = (a: Vec3): number => Math.sqrt(lengthSq(a))

export const distance = (a: Vec3, b: Vec3): number => length(sub(a, b))

export function normalize(a: Vec3, fallback: Vec3 = UNIT_Z): Vec3 {
  const l = length(a)
  return l < 1e-12 ? clone(fallback) : scale(a, 1 / l)
}

export const lerp = (a: Vec3, b: Vec3, t: number): Vec3 => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
  z: a.z + (b.z - a.z) * t,
})

export const clamp = (x: number, lo: number, hi: number): number => (x < lo ? lo : x > hi ? hi : x)

/** Any unit vector perpendicular to `a`, chosen deterministically. */
export function perpendicular(a: Vec3): Vec3 {
  const n = normalize(a)
  // Cross with whichever world axis is least aligned with `n`, so the result
  // never degenerates to the zero vector.
  const ax = Math.abs(n.x)
  const ay = Math.abs(n.y)
  const az = Math.abs(n.z)
  const helper = ax <= ay && ax <= az ? UNIT_X : ay <= az ? UNIT_Y : UNIT_Z
  return normalize(cross(n, helper))
}

/**
 * Rotate `v` by the shortest rotation that takes unit vector `from` onto unit
 * vector `to` (Rodrigues' formula). Used to transport a node's local frame down
 * to its children without introducing spurious roll.
 */
export function rotateFromTo(from: Vec3, to: Vec3, v: Vec3): Vec3 {
  const a = normalize(from)
  const b = normalize(to)
  const c = clamp(dot(a, b), -1, 1)

  if (c > 1 - 1e-9) return clone(v)

  if (c < -1 + 1e-9) {
    // Antiparallel: a 180 degree turn about any perpendicular axis.
    const axis = perpendicular(a)
    return sub(scale(axis, 2 * dot(axis, v)), v)
  }

  const axis = cross(a, b)
  const s = length(axis)
  const k = scale(axis, 1 / s)
  const angle = Math.atan2(s, c)
  const cosA = Math.cos(angle)
  const sinA = Math.sin(angle)

  // v*cos + (k x v)*sin + k*(k.v)*(1-cos)
  return add(
    add(scale(v, cosA), scale(cross(k, v), sinA)),
    scale(k, dot(k, v) * (1 - cosA)),
  )
}

/** Orthonormal right handed frame. `w` is the "growth" axis of a subtree. */
export interface Frame {
  u: Vec3
  v: Vec3
  w: Vec3
}

export const identityFrame = (): Frame => ({ u: clone(UNIT_X), v: clone(UNIT_Y), w: clone(UNIT_Z) })

/** Map a direction given in frame coordinates into world coordinates. */
export const applyFrame = (f: Frame, local: Vec3): Vec3 =>
  add(add(scale(f.u, local.x), scale(f.v, local.y)), scale(f.w, local.z))

/** Rotate a whole frame by the shortest rotation taking `from` onto `to`. */
export const rotateFrame = (f: Frame, from: Vec3, to: Vec3): Frame => ({
  u: rotateFromTo(from, to, f.u),
  v: rotateFromTo(from, to, f.v),
  w: rotateFromTo(from, to, f.w),
})

/** Gram-Schmidt, to stop accumulated float error from skewing a frame. */
export function orthonormalize(f: Frame): Frame {
  const w = normalize(f.w)
  const u = normalize(sub(f.u, scale(w, dot(f.u, w))), perpendicular(w))
  const v = cross(w, u)
  return { u, v, w }
}

/** Direction on the unit sphere from polar angle `theta` and azimuth `phi`. */
export const sphericalDirection = (theta: number, phi: number): Vec3 => {
  const st = Math.sin(theta)
  return { x: st * Math.cos(phi), y: st * Math.sin(phi), z: Math.cos(theta) }
}
