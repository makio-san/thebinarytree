/**
 * Hyperbolic geometry in the Poincare ball model B^3 (curvature -1).
 *
 * Every point of hyperbolic 3-space is represented as a Euclidean point strictly
 * inside the unit ball. The model is conformal, so angles look right and only
 * distances are distorted: a fixed hyperbolic step gets visually shorter and
 * shorter as you approach the boundary sphere. That is exactly the property that
 * lets a tree with thousands of nodes fit on screen at once, with the branch you
 * are looking at rendered large in the middle.
 *
 * The algebra used here is Ungar's Mobius gyrovector space. Two facts do all the
 * work:
 *
 *   1. Mobius addition `a (+) b` is the ball's translation operation, and every
 *      left translation `x -> t (+) x` is an isometry.
 *   2. Left cancellation holds: `(-a) (+) (a (+) b) = b`. Which means the
 *      isometry carrying point `g` to point `w` is simply
 *      `x -> w (+) ((-g) (+) x)` - the whole navigation model of this library.
 */

import type { Vec3 } from './vec3'
import { ZERO, add, clamp, dot, length, lengthSq, negate, normalize, scale, v3 } from './vec3'

/** Points are kept strictly inside the ball; the boundary itself is at infinity. */
export const MAX_RADIUS = 1 - 1e-9

const EPS = 1e-12

/** Push a point back inside the open unit ball if float error escaped it. */
export function clampToBall(p: Vec3, maxRadius = MAX_RADIUS): Vec3 {
  const l2 = lengthSq(p)
  if (l2 <= maxRadius * maxRadius) return p
  return scale(p, maxRadius / Math.sqrt(l2))
}

/**
 * Mobius addition. Non commutative and non associative, which is the price of
 * doing translations in curved space.
 *
 *   a (+) b = ((1 + 2<a,b> + |b|^2) a + (1 - |a|^2) b) / (1 + 2<a,b> + |a|^2 |b|^2)
 */
export function mobiusAdd(a: Vec3, b: Vec3): Vec3 {
  const a2 = lengthSq(a)
  const b2 = lengthSq(b)
  const ab = dot(a, b)

  const ca = 1 + 2 * ab + b2
  const cb = 1 - a2
  const den = 1 + 2 * ab + a2 * b2

  if (Math.abs(den) < EPS) return clampToBall(normalize(add(a, b)))

  return clampToBall(scale(add(scale(a, ca), scale(b, cb)), 1 / den))
}

/** Mobius subtraction, `a (-) b = a (+) (-b)`. */
export const mobiusSub = (a: Vec3, b: Vec3): Vec3 => mobiusAdd(a, negate(b))

/**
 * Mobius scalar multiplication `r (x) v = tanh(r * artanh|v|) * v/|v|`.
 *
 * `r (x) v` walks along the geodesic through the origin and `v`, and is linear
 * in hyperbolic arc length: `0 (x) v = 0`, `1 (x) v = v`, `2 (x) v` is twice as
 * far from the origin in hyperbolic terms.
 */
export function mobiusScale(r: number, v: Vec3): Vec3 {
  const n = length(v)
  if (n < EPS) return v3()
  const t = Math.tanh(r * Math.atanh(clamp(n, 0, MAX_RADIUS)))
  return clampToBall(scale(v, t / n))
}

/**
 * Hyperbolic distance between two points of the ball.
 *
 *   d(a,b) = 2 asinh( |a-b| / sqrt((1-|a|^2)(1-|b|^2)) )
 *
 * Deliberately *not* computed as `2 artanh|(-a) (+) b|`, even though that is the
 * shorter identity. Mobius addition of two points that both sit near the
 * boundary evaluates `1 + 2<a,b> + ...`, where the terms nearly cancel: for a
 * node fourteen levels deep that costs about five significant digits. The form
 * above only ever loses digits to `1 - |p|^2`, which is the irreducible cost of
 * storing hyperbolic points in a unit ball, and it stays accurate for tiny
 * distances too because asinh does not cancel near zero.
 */
export function hyperbolicDistance(a: Vec3, b: Vec3): number {
  const da = Math.max(1 - lengthSq(a), Number.MIN_VALUE)
  const db = Math.max(1 - lengthSq(b), Number.MIN_VALUE)
  const dx = a.x - b.x
  const dy = a.y - b.y
  const dz = a.z - b.z
  const separation = Math.sqrt(dx * dx + dy * dy + dz * dz)
  return 2 * Math.asinh(separation / Math.sqrt(da * db))
}

/** Hyperbolic distance from the origin. */
export const radius = (p: Vec3): number => 2 * Math.atanh(clamp(length(p), 0, MAX_RADIUS))

/**
 * Exponential map at the origin: take a direction and a hyperbolic distance,
 * get the ball point that far away.
 */
export function expOrigin(direction: Vec3, distance: number): Vec3 {
  return scale(normalize(direction), Math.tanh(distance / 2))
}

/** Inverse of {@link expOrigin}. */
export function logOrigin(p: Vec3): { direction: Vec3; distance: number } {
  return { direction: normalize(p), distance: radius(p) }
}

/**
 * Point at parameter `t` on the geodesic from `a` to `b`.
 * `t = 0` gives `a`, `t = 1` gives `b`, and `t` is proportional to hyperbolic
 * arc length in between - so sampling it evenly draws a correct geodesic arc.
 */
export function geodesicPoint(a: Vec3, b: Vec3, t: number): Vec3 {
  if (t <= 0) return a
  if (t >= 1) return b
  return mobiusAdd(a, mobiusScale(t, mobiusAdd(negate(a), b)))
}

/** Sample `segments + 1` points along the geodesic from `a` to `b`. */
export function geodesicPolyline(a: Vec3, b: Vec3, segments: number): Vec3[] {
  const out: Vec3[] = new Array(segments + 1)
  for (let i = 0; i <= segments; i++) out[i] = geodesicPoint(a, b, i / segments)
  return out
}

/**
 * The isometry that carries `from` onto `to`, as a reusable function.
 *
 * `T(x) = to (+) ((-from) (+) x)`. Left cancellation gives `T(from) = to`
 * directly. Both drag navigation and "fly to this node" are built from this.
 */
export function isometryFromTo(from: Vec3, to: Vec3): (p: Vec3) => Vec3 {
  const negFrom = negate(from)
  return (p: Vec3) => mobiusAdd(to, mobiusAdd(negFrom, p))
}

/** Shorthand for the isometry that brings `p` to the centre of the ball. */
export const isometryToOrigin = (p: Vec3): ((q: Vec3) => Vec3) => isometryFromTo(p, ZERO)

/**
 * Conformal factor at `p`: the Euclidean length that one unit of hyperbolic
 * length occupies there. Node radii and label sizes are scaled by this, which is
 * what makes deep nodes shrink smoothly into the boundary instead of clipping.
 */
export const conformalScale = (p: Vec3): number => (1 - lengthSq(p)) / 2

/**
 * Unit tangent at `to`, pointing away from `from` along their common geodesic,
 * expressed in the chart centred on `to`.
 *
 * Used by the layout to work out which way a subtree should keep growing after
 * a step: the child's outward axis is not the parent's, because parallel
 * transport in curved space rotates it.
 */
export function outwardDirection(from: Vec3, to: Vec3): Vec3 {
  const backwards = mobiusAdd(negate(to), from)
  return normalize(negate(backwards))
}

/**
 * Gyration `gyr[a,b]v`, the rotation that repairs the non associativity of
 * Mobius addition: `(a (+) b) (+) gyr[a,b]v = a (+) (b (+) v)`.
 *
 * Not needed by the renderer (which composes isometries pointwise) but exposed
 * because it is the piece anyone extending the math will reach for.
 */
export function gyration(a: Vec3, b: Vec3, v: Vec3): Vec3 {
  const ab = mobiusAdd(a, b)
  return mobiusAdd(negate(ab), mobiusAdd(a, mobiusAdd(b, v)))
}

/**
 * Solid angle of a spherical cap with half angle `alpha`, normalised so that the
 * whole sphere is 1. The layout hands out cone budgets in these units.
 */
export const capFraction = (alpha: number): number => (1 - Math.cos(alpha)) / 2

/** Inverse of {@link capFraction}. */
export const capAngle = (fraction: number): number => Math.acos(clamp(1 - 2 * fraction, -1, 1))
