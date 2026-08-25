import { describe, expect, it } from 'vitest'
import { coneLayout } from '../src/layout/cone-layout'
import { hierarchy } from '../src/model/hierarchy'
import { hyperbolicDistance } from '../src/math'
import { computerHistory } from '../src/data'
import type { TreeDatum } from '../src/model/types'

const build = (datum: TreeDatum = computerHistory) => {
  const tree = hierarchy(datum)
  coneLayout(tree)
  return tree
}

describe("vessel calibre, by Murray's law", () => {
  it('gives every leaf a calibre of 1', () => {
    const tree = build()
    for (const node of tree.nodes) {
      if (node.children.length === 0) expect(node.caliber, node.id).toBe(1)
    }
  })

  it("satisfies r_parent^3 = sum of r_child^3 at every branch", () => {
    const tree = build()
    for (const node of tree.nodes) {
      if (!node.children.length) continue
      const cubes = node.children.reduce((sum, c) => sum + c.caliber ** 3, 0)
      expect(node.caliber ** 3, node.id).toBeCloseTo(cubes, 8)
    }
  })

  it('makes the root calibre the cube root of the leaf count', () => {
    // Follows from the law: every leaf contributes exactly 1 to the cube sum.
    const tree = build()
    const leaves = tree.nodes.filter((n) => n.children.length === 0).length
    expect(tree.root.caliber).toBeCloseTo(Math.cbrt(leaves), 8)
  })

  it('never lets a child be thicker than its parent', () => {
    const tree = build()
    for (const { source, target } of tree.links) {
      expect(target.caliber, `${target.id} vs ${source.id}`).toBeLessThanOrEqual(
        source.caliber + 1e-9,
      )
    }
  })

  it('tapers a binary chain by the cube root of two per split', () => {
    const tree = build({
      name: 'r',
      children: [
        { name: 'a', children: [{ name: 'a1' }, { name: 'a2' }] },
        { name: 'b', children: [{ name: 'b1' }, { name: 'b2' }] },
      ],
    })
    expect(tree.root.caliber).toBeCloseTo(Math.cbrt(4), 10)
    expect(tree.byId.get('r/a')!.caliber).toBeCloseTo(Math.cbrt(2), 10)
    expect(tree.byId.get('r/a/a1')!.caliber).toBe(1)
  })
})

describe('path length, which drives the heartbeat', () => {
  it('is zero at the root', () => {
    expect(build().root.pathLength).toBe(0)
  })

  it('accumulates the link length of each step', () => {
    const tree = hierarchy(computerHistory)
    coneLayout(tree, { linkLength: 0.8 })
    for (const node of tree.nodes) {
      expect(node.pathLength, node.id).toBeCloseTo(node.depth * 0.8, 9)
    }
  })

  it('follows a per-node link length function', () => {
    const tree = hierarchy(computerHistory)
    coneLayout(tree, { linkLength: (n) => (n.depth === 1 ? 2 : 0.5) })
    for (const node of tree.nodes) {
      if (node.depth === 0) continue
      const expected = 2 + (node.depth - 1) * 0.5
      expect(node.pathLength, node.id).toBeCloseTo(expected, 9)
    }
  })

  it('measures along the tree, not straight through the ball', () => {
    // The distinction is the whole point: a wavefront keyed on the straight
    // hyperbolic distance would expand as a sphere and ignore the branches.
    const tree = build()
    const bent = tree.nodes.filter(
      (n) => n.depth >= 3 && n.pathLength - hyperbolicDistance(tree.root.view, n.view) > 0.05,
    )
    expect(bent.length).toBeGreaterThan(50)
  })

  it('never decreases from parent to child', () => {
    const tree = build()
    for (const { source, target } of tree.links) {
      expect(target.pathLength).toBeGreaterThan(source.pathLength)
    }
  })
})
