import { describe, expect, it } from 'vitest'
import { Navigator } from '../src/interaction/navigator'
import { coneLayout } from '../src/layout/cone-layout'
import { hierarchy } from '../src/model/hierarchy'
import { hyperbolicDistance, length, v3 } from '../src/math'
import { computerHistory } from '../src/data'
import type { Tree } from '../src/model/types'

function build(): Tree {
  const tree = hierarchy(computerHistory)
  coneLayout(tree)
  return tree
}

/** Drive a flight to completion with synthetic timestamps. */
function run(nav: Navigator, ms: number, step = 16): void {
  for (let t = 0; t <= ms; t += step) nav.tick(t)
  nav.tick(ms + step)
}

describe('navigator', () => {
  it('applies a rigid move, so every pairwise distance survives', () => {
    const tree = build()
    const nav = new Navigator(tree)
    const sample = tree.nodes.filter((_, i) => i % 37 === 0)
    const before = sample.map((a) => sample.map((b) => hyperbolicDistance(a.view, b.view)))

    nav.snapshot()
    nav.applyMove(v3(0.2, -0.1, 0.35), v3(-0.4, 0.15, 0.05))

    sample.forEach((a, i) => {
      sample.forEach((b, j) => {
        expect(hyperbolicDistance(a.view, b.view)).toBeCloseTo(before[i][j], 6)
      })
    })
  })

  it('does not compound error when a drag is applied many times', () => {
    const tree = build()
    const nav = new Navigator(tree)
    const target = tree.byId.get('unix')!
    const start = { ...target.view }

    // A real drag calls applyMove once per pointer event against the same
    // snapshot. Two hundred of them must land exactly where one would.
    nav.snapshot()
    for (let i = 0; i < 200; i++) {
      nav.applyMove(v3(0.1, 0.2, -0.3), v3(0.31, -0.02, 0.4))
    }
    const many = { ...target.view }

    target.view = start
    nav.snapshot()
    nav.applyMove(v3(0.1, 0.2, -0.3), v3(0.31, -0.02, 0.4))

    expect(many.x).toBeCloseTo(target.view.x, 12)
    expect(many.y).toBeCloseTo(target.view.y, 12)
    expect(many.z).toBeCloseTo(target.view.z, 12)
  })

  it('flies a node to the centre of the ball', () => {
    const tree = build()
    const nav = new Navigator(tree)
    const node = tree.byId.get('intel-4004')!
    expect(length(node.view)).toBeGreaterThan(0.9)

    let settled = false
    void nav.flyToNode(node).then(() => {
      settled = true
    })
    expect(nav.animating).toBe(true)

    run(nav, 2000)

    expect(nav.animating).toBe(false)
    expect(length(node.view)).toBeLessThan(1e-9)
    return Promise.resolve().then(() => expect(settled).toBe(true))
  })

  it('keeps the tree rigid at every intermediate frame', () => {
    const tree = build()
    const nav = new Navigator(tree)
    const a = tree.byId.get('unix')!
    const b = tree.byId.get('mos-6502')!
    const span = hyperbolicDistance(a.view, b.view)

    void nav.flyToNode(tree.byId.get('macintosh')!)
    for (let t = 0; t <= 1200; t += 40) {
      nav.tick(t)
      expect(hyperbolicDistance(a.view, b.view)).toBeCloseTo(span, 5)
    }
  })

  it('lands immediately when the tab was asleep and time jumped', () => {
    // requestAnimationFrame stops in a hidden tab. The next frame can arrive
    // minutes later; the flight must clamp and settle rather than overshoot.
    const tree = build()
    const nav = new Navigator(tree)
    const node = tree.byId.get('linux')!

    void nav.flyToNode(node)
    nav.tick(0)
    nav.tick(600_000)

    expect(nav.animating).toBe(false)
    expect(length(node.view)).toBeLessThan(1e-9)
  })

  it('cancelling settles the promise and leaves the tree where it is', async () => {
    const tree = build()
    const nav = new Navigator(tree)
    const node = tree.byId.get('web')!

    const flight = nav.flyToNode(node)
    nav.tick(0)
    nav.tick(100)
    const halfway = { ...node.view }

    nav.cancel()
    await flight

    expect(nav.animating).toBe(false)
    expect(node.view).toEqual(halfway)
  })

  it('a new flight overrides the one in progress', async () => {
    const tree = build()
    const nav = new Navigator(tree)
    const first = tree.byId.get('ms-dos')!
    const second = tree.byId.get('c-language')!

    void nav.flyToNode(first)
    nav.tick(0)
    nav.tick(120)

    const flight = nav.flyToNode(second)
    run(nav, 2000)
    await flight

    expect(length(second.view)).toBeLessThan(1e-9)
    expect(length(first.view)).toBeGreaterThan(1e-6)
  })

  it('taking a new snapshot ends the flight instead of fighting it', async () => {
    const tree = build()
    const nav = new Navigator(tree)
    const flying = tree.byId.get('iphone')!
    const grabbed = tree.byId.get('eniac')!

    const flight = nav.flyToNode(flying)
    nav.tick(0)
    nav.tick(150)
    expect(nav.animating).toBe(true)

    // Grab something else, the way Controls does on pointerdown.
    nav.snapshot()
    expect(nav.animating).toBe(false)
    await flight

    nav.applyMove({ ...grabbed.view }, { x: 0, y: 0, z: 0 })
    const landed = { ...grabbed.view }

    // A later frame must not resurrect the abandoned flight.
    nav.tick(400)
    expect(grabbed.view).toEqual(landed)
    expect(length(grabbed.view)).toBeLessThan(1e-9)
  })

  it('clamps a grab to a point we can still navigate from', () => {
    expect(length(Navigator.clampGrab(v3(0.3, 0, 0)))).toBeCloseTo(0.3, 12)
    expect(length(Navigator.clampGrab(v3(4, 0, 0)))).toBeLessThan(0.99)
    expect(length(Navigator.clampGrab(v3(0.999999, 0, 0)))).toBeLessThan(0.99)
  })
})
