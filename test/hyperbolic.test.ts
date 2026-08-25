import { describe, expect, it } from 'vitest'
import {
  ZERO,
  conformalScale,
  expOrigin,
  geodesicPoint,
  hyperbolicDistance,
  isometryFromTo,
  isometryToOrigin,
  length,
  logOrigin,
  mobiusAdd,
  mobiusScale,
  negate,
  normalize,
  outwardDirection,
  radius,
  v3,
} from '../src/math'

const SAMPLES = [
  v3(0, 0, 0),
  v3(0.3, 0, 0),
  v3(-0.12, 0.44, 0.2),
  v3(0.5, -0.5, 0.5),
  v3(0.001, -0.002, 0.9),
  v3(-0.62, -0.31, 0.55),
  v3(0.97, 0.02, -0.03),
]

const near = (a: number, b: number, tol = 1e-9) => expect(Math.abs(a - b)).toBeLessThan(tol)

const nearPoint = (a: { x: number; y: number; z: number }, b: typeof a, tol = 1e-9) => {
  near(a.x, b.x, tol)
  near(a.y, b.y, tol)
  near(a.z, b.z, tol)
}

describe('mobius addition', () => {
  it('has the origin as identity on both sides', () => {
    for (const p of SAMPLES) {
      nearPoint(mobiusAdd(ZERO, p), p)
      nearPoint(mobiusAdd(p, ZERO), p)
    }
  })

  it('obeys the left cancellation law', () => {
    for (const a of SAMPLES) {
      for (const b of SAMPLES) {
        nearPoint(mobiusAdd(negate(a), mobiusAdd(a, b)), b, 1e-8)
      }
    }
  })

  it('never leaves the open unit ball', () => {
    for (const a of SAMPLES) {
      for (const b of SAMPLES) {
        expect(length(mobiusAdd(a, b))).toBeLessThan(1)
      }
    }
  })

  it('is not commutative in general', () => {
    // Documenting the property rather than asserting a bug: a gyrovector space
    // is only commutative up to a rotation.
    const a = v3(0.4, 0.1, 0)
    const b = v3(0, 0.5, 0.2)
    expect(length(mobiusAdd(a, b))).toBeCloseTo(length(mobiusAdd(b, a)), 12)
    expect(mobiusAdd(a, b).x).not.toBeCloseTo(mobiusAdd(b, a).x, 6)
  })
})

describe('distance and scaling', () => {
  it('measures the origin distance as 2 artanh|p|', () => {
    for (const p of SAMPLES) near(hyperbolicDistance(ZERO, p), radius(p), 1e-10)
  })

  it('is symmetric', () => {
    for (const a of SAMPLES) {
      for (const b of SAMPLES) {
        near(hyperbolicDistance(a, b), hyperbolicDistance(b, a), 1e-8)
      }
    }
  })

  it('makes scalar multiplication linear in arc length', () => {
    const v = v3(0.2, -0.1, 0.35)
    const base = radius(v)
    for (const r of [0, 0.25, 0.5, 1, 2, 3.5]) {
      near(radius(mobiusScale(r, v)), r * base, 1e-9)
    }
  })

  it('round trips exp and log at the origin', () => {
    for (const distance of [0.1, 1, 2.5, 8]) {
      const direction = normalize(v3(1, 2, -3))
      const p = expOrigin(direction, distance)
      const back = logOrigin(p)
      near(back.distance, distance, 1e-9)
      nearPoint(back.direction, direction, 1e-9)
    }
  })

  it('reports a conformal factor of 1/2 at the centre and 0 at the rim', () => {
    near(conformalScale(ZERO), 0.5)
    expect(conformalScale(v3(0.999999, 0, 0))).toBeLessThan(1e-5)
  })
})

describe('geodesics', () => {
  it('hits both endpoints', () => {
    const a = v3(0.2, 0.1, -0.3)
    const b = v3(-0.5, 0.25, 0.1)
    nearPoint(geodesicPoint(a, b, 0), a)
    nearPoint(geodesicPoint(a, b, 1), b)
  })

  it('splits the distance in proportion to the parameter', () => {
    const a = v3(0.2, 0.1, -0.3)
    const b = v3(-0.7, 0.25, 0.1)
    const total = hyperbolicDistance(a, b)
    for (const t of [0.1, 0.25, 0.5, 0.75, 0.9]) {
      const p = geodesicPoint(a, b, t)
      near(hyperbolicDistance(a, p), total * t, 1e-7)
      near(hyperbolicDistance(p, b), total * (1 - t), 1e-7)
    }
  })

  it('bows toward the centre instead of running straight', () => {
    // Two points near the rim, mirrored across the y axis. The geodesic is the
    // circular arc orthogonal to the unit sphere through both, which for this
    // pair crosses x = 0 at y = 2.4625 - sqrt(2.4625^2 - 1) = 0.212188...
    // Travelling near the boundary is expensive, so the shortest path cuts
    // inward rather than following the Euclidean straight line at y = 0.4.
    const a = v3(0.9, 0.4, 0)
    const b = v3(-0.9, 0.4, 0)
    const mid = geodesicPoint(a, b, 0.5)
    expect(Math.abs(mid.x)).toBeLessThan(1e-9)
    near(mid.y, 2.4625 - Math.sqrt(2.4625 * 2.4625 - 1), 1e-9)
    expect(mid.y).toBeLessThan(0.4)
  })
})

describe('isometries', () => {
  it('carries the requested point to the requested place', () => {
    for (const from of SAMPLES) {
      for (const to of SAMPLES) {
        nearPoint(isometryFromTo(from, to)(from), to, 1e-8)
      }
    }
  })

  it('preserves hyperbolic distance', () => {
    const from = v3(0.42, -0.18, 0.3)
    const to = v3(-0.05, 0.6, -0.2)
    const move = isometryFromTo(from, to)
    for (const a of SAMPLES) {
      for (const b of SAMPLES) {
        near(hyperbolicDistance(move(a), move(b)), hyperbolicDistance(a, b), 1e-6)
      }
    }
  })

  it('brings a point to the centre', () => {
    for (const p of SAMPLES) {
      expect(length(isometryToOrigin(p)(p))).toBeLessThan(1e-9)
    }
  })

  it('stays stable when applied to a point close to the boundary', () => {
    const deep = v3(0.999999, 0, 0)
    const move = isometryToOrigin(deep)
    const moved = move(deep)
    expect(Number.isFinite(moved.x)).toBe(true)
    expect(length(moved)).toBeLessThan(1e-6)
  })
})

describe('outward direction', () => {
  it('returns a unit vector pointing away from the parent', () => {
    const parent = v3(0.1, 0.2, 0)
    const child = mobiusAdd(parent, expOrigin(v3(0, 0, 1), 1.2))
    const out = outwardDirection(parent, child)
    near(length(out), 1, 1e-9)
    // Stepping further along `out` must increase the distance from the parent.
    const further = mobiusAdd(child, expOrigin(out, 0.5))
    expect(hyperbolicDistance(parent, further)).toBeGreaterThan(
      hyperbolicDistance(parent, child),
    )
  })

  it('continues a chain in a straight line', () => {
    // Three collinear steps: total distance must equal the sum of the steps.
    let p = ZERO
    let direction = v3(0, 0, 1)
    let previous = ZERO
    const step = 0.9
    for (let i = 0; i < 3; i++) {
      const next = mobiusAdd(p, expOrigin(direction, step))
      direction = outwardDirection(p, next)
      previous = p
      p = next
    }
    void previous
    near(hyperbolicDistance(ZERO, p), step * 3, 1e-7)
  })
})
