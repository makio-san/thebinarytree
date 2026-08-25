import { describe, expect, it } from 'vitest'
import { SpikeField, defaultSpikeOptions, potential } from '../src/render/spikes'
import { coneLayout } from '../src/layout/cone-layout'
import { hierarchy } from '../src/model/hierarchy'
import { computerHistory } from '../src/data'

const build = () => {
  const tree = hierarchy(computerHistory)
  coneLayout(tree)
  return tree
}

const opts = defaultSpikeOptions

describe('the action potential shape', () => {
  it('rests at zero before the spike arrives', () => {
    expect(potential(-0.1, opts)).toBe(0)
    expect(potential(0, opts)).toBe(0)
  })

  it('rises to a peak of 1, far faster than it falls', () => {
    expect(potential(opts.rise, opts)).toBeCloseTo(1, 6)
    expect(potential(opts.rise / 2, opts)).toBeCloseTo(0.5, 6)
    // The asymmetry is the point, not the absolute duration. A real action
    // potential rises in about a millisecond, which at any watchable speed is a
    // single frame and reads as a display fault rather than as a cell firing.
    expect(opts.rise).toBeLessThan(opts.decay / 2)
  })

  it('decays after the peak', () => {
    const a = potential(opts.rise + 0.02, opts)
    const b = potential(opts.rise + 0.08, opts)
    const c = potential(opts.rise + 0.2, opts)
    expect(a).toBeGreaterThan(b)
    expect(b).toBeGreaterThan(c)
  })

  it('undershoots rest, then recovers toward it', () => {
    // The refractory dip is what makes an arrival read as an event rather than
    // as a fade out. Without it the trailing edge is just a ramp.
    let lowest = 0
    let lowestAt = 0
    for (let t = opts.rise; t < 2; t += 0.005) {
      const v = potential(t, opts)
      if (v < lowest) {
        lowest = v
        lowestAt = t
      }
    }
    expect(lowest).toBeLessThan(-0.02)
    expect(lowestAt).toBeGreaterThan(opts.rise)
    // And it comes back up afterwards.
    expect(potential(lowestAt + 1.2, opts)).toBeGreaterThan(lowest)
  })

  it('never exceeds the peak', () => {
    for (let t = 0; t < 3; t += 0.004) {
      expect(potential(t, opts)).toBeLessThanOrEqual(1 + 1e-12)
    }
  })
})

describe('spike propagation', () => {
  it('reaches the root first and the tips last', () => {
    const tree = build()
    const field = new SpikeField(tree, { jitter: 0 })
    // Sampled at the root's own peak: the signal has had no time to travel, so
    // nothing far out should be excited yet.
    field.update(defaultSpikeOptions.rise)
    const deepest = tree.nodes.reduce((a, b) => (a.pathLength > b.pathLength ? a : b))
    expect(tree.root.fire).toBeCloseTo(1, 3)
    expect(deepest.fire).toBeLessThan(0.2)
  })

  it('travels outward at the conduction velocity', () => {
    const tree = build()
    const speed = 5
    const field = new SpikeField(tree, { jitter: 0, speed })
    const node = tree.nodes.find((n) => n.pathLength > 4 && n.pathLength < 6)!
    const arrival = node.pathLength / speed

    field.update(arrival + defaultSpikeOptions.rise)
    const atArrival = node.fire
    field.update(arrival - 0.4)
    const before = node.fire

    expect(atArrival).toBeCloseTo(1, 3)
    expect(before).toBeLessThan(atArrival)
  })

  it('follows the branches, not the straight distance', () => {
    // Two nodes at a similar distance through the ball but very different
    // distances along the tree must not fire together.
    const tree = build()
    const field = new SpikeField(tree, { jitter: 0 })
    const shallow = tree.nodes.find((n) => n.depth === 1)!
    const deep = tree.nodes.find((n) => n.depth >= 7)!
    field.update(shallow.pathLength / field.settings.speed + field.settings.rise)
    expect(shallow.fire).toBeCloseTo(1, 3)
    expect(deep.fire).toBeLessThan(0.5)
  })

  it('repeats on its period', () => {
    const tree = build()
    const field = new SpikeField(tree, { jitter: 0 })
    const { period } = field.settings
    field.update(0.5)
    const first = tree.root.fire
    field.update(0.5 + period)
    expect(tree.root.fire).toBeCloseTo(first, 9)
  })

  it('jitters siblings so they do not fire in lockstep', () => {
    const tree = build()
    const field = new SpikeField(tree)
    const siblings = tree.nodes.find((n) => n.children.length > 4)!.children
    const offsets = siblings.map((s) => field.offsetOf(s))
    expect(new Set(offsets).size).toBe(offsets.length)
    for (const offset of offsets) {
      expect(Math.abs(offset)).toBeLessThanOrEqual(field.settings.jitter)
    }
  })

  it('is deterministic across instances', () => {
    const tree = build()
    const a = new SpikeField(tree)
    const b = new SpikeField(tree)
    for (const node of tree.nodes.slice(0, 60)) {
      expect(a.offsetOf(node)).toBe(b.offsetOf(node))
    }
  })
})
