import { describe, expect, it } from 'vitest'
import { Navigator } from '../src/interaction/navigator'
import { coneLayout } from '../src/layout/cone-layout'
import { hierarchy } from '../src/model/hierarchy'
import { hyperbolicDistance, length, v3 } from '../src/math'
import { computerHistory } from '../src/data'

const build = () => {
  const tree = hierarchy(computerHistory)
  coneLayout(tree)
  return tree
}

/** Feed frames until the glide stops, returning how many it took. */
const run = (nav: Navigator, from = 0, step = 16, limit = 600): number => {
  let frames = 0
  let t = from
  while (nav.animating && frames < limit) {
    nav.tick(t)
    t += step
    frames++
  }
  return frames
}

describe('released drags keep moving', () => {
  it('carries on after the pointer lifts', () => {
    const tree = build()
    const nav = new Navigator(tree)
    const watched = tree.byId.get('unix')!

    nav.snapshot()
    const from = v3(0, 0, 0)
    const previous = v3(0.1, 0, 0)
    const to = v3(0.16, 0, 0)
    nav.applyMove(from, to)
    const atRelease = { ...watched.view }

    nav.startGlide(from, previous, to, 0.016)
    expect(nav.animating).toBe(true)
    run(nav)

    // It kept going in the same direction rather than stopping under the finger.
    expect(hyperbolicDistance(atRelease, watched.view)).toBeGreaterThan(0.05)
  })

  it('slows down and stops', () => {
    const tree = build()
    const nav = new Navigator(tree)
    nav.snapshot()

    nav.startGlide(v3(0, 0, 0), v3(0.1, 0, 0), v3(0.2, 0, 0), 0.016)
    const frames = run(nav)

    expect(nav.animating).toBe(false)
    // A glide is a flourish, not a journey: about a second at 60fps.
    expect(frames).toBeGreaterThan(5)
    expect(frames).toBeLessThan(140)
  })

  it('ignores a release that was not moving', () => {
    const tree = build()
    const nav = new Navigator(tree)
    nav.snapshot()
    const still = v3(0.2, 0.1, 0)
    nav.startGlide(v3(0, 0, 0), still, still, 0.016)
    expect(nav.animating).toBe(false)
  })

  it('caps a jittery sample instead of launching the tree away', () => {
    const tree = build()
    const nav = new Navigator(tree)
    nav.snapshot()
    // One bad sample claiming a huge jump in a single frame.
    nav.startGlide(v3(0, 0, 0), v3(-0.99, 0, 0), v3(0.99, 0, 0), 0.004)
    run(nav)
    for (const node of tree.nodes) {
      expect(length(node.view)).toBeLessThan(1)
      expect(Number.isFinite(node.view.x)).toBe(true)
    }
  })

  it('stays a rigid motion the whole way', () => {
    // The glide must not deform the tree: it is still one isometry per frame,
    // just with a target point that keeps moving.
    const tree = build()
    const nav = new Navigator(tree)
    const a = tree.byId.get('eniac')!
    const b = tree.byId.get('mos-6502')!
    const span = hyperbolicDistance(a.view, b.view)

    nav.snapshot()
    nav.startGlide(v3(0, 0, 0), v3(0.05, 0.02, 0), v3(0.12, 0.05, 0), 0.016)
    let t = 0
    while (nav.animating && t < 4000) {
      nav.tick(t)
      expect(hyperbolicDistance(a.view, b.view)).toBeCloseTo(span, 5)
      t += 16
    }
  })

  it('is cancelled by taking a new snapshot', () => {
    const tree = build()
    const nav = new Navigator(tree)
    nav.snapshot()
    nav.startGlide(v3(0, 0, 0), v3(0.1, 0, 0), v3(0.2, 0, 0), 0.016)
    nav.tick(0)
    expect(nav.animating).toBe(true)

    // Grabbing again mid-glide must take over, not fight it.
    nav.snapshot()
    expect(nav.animating).toBe(false)
  })

  it('survives a stalled frame without taking a giant step', () => {
    const tree = build()
    const nav = new Navigator(tree)
    nav.snapshot()
    nav.startGlide(v3(0, 0, 0), v3(0.1, 0, 0), v3(0.25, 0, 0), 0.016)

    nav.tick(0)
    // A hidden tab resuming: one frame, ten seconds later. The step has to be
    // clamped, or the glide crosses the whole ball between two frames.
    nav.tick(10_000)

    // The root started at the origin, so wherever it is now is exactly how far
    // the applied translation moved its axis. maxSpeed 9 over a dt clamped to
    // 50ms bounds that at 0.45, plus the 0.31 the release already carried.
    expect(hyperbolicDistance(v3(0, 0, 0), tree.root.view)).toBeLessThan(1)
  })

  it('displaces distant nodes further than near ones, which is correct', () => {
    // Worth pinning because it looks like a bug the first time you measure it.
    // A hyperbolic translation moves points on its axis by exactly its length
    // and points far off the axis by much more, without ceasing to be rigid. Any
    // assertion of the form "no node moved more than the step" is wrong.
    const tree = build()
    const nav = new Navigator(tree)
    const near = tree.root
    const far = tree.nodes.reduce((a, b) => (a.pathLength > b.pathLength ? a : b))

    const nearBefore = { ...near.view }
    const farBefore = { ...far.view }
    nav.snapshot()
    nav.applyMove(v3(0, 0, 0), v3(0.3, 0, 0))

    const nearMoved = hyperbolicDistance(nearBefore, near.view)
    const farMoved = hyperbolicDistance(farBefore, far.view)
    expect(nearMoved).toBeCloseTo(2 * Math.atanh(0.3), 6)
    expect(farMoved).toBeGreaterThan(nearMoved)
  })
})
