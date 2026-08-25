import { describe, expect, it } from 'vitest'
import { coneLayout } from '../src/layout/cone-layout'
import { hierarchy } from '../src/model/hierarchy'
import { nTree } from '../src/model/loaders'
import { hyperbolicDistance, length, lengthSq } from '../src/math'
import type { TreeDatum } from '../src/model/types'
import { computerHistory } from '../src/data'

const chain = (depth: number): TreeDatum => {
  const build = (i: number): TreeDatum =>
    i >= depth ? { id: `n${i}`, name: `n${i}` } : { id: `n${i}`, name: `n${i}`, children: [build(i + 1)] }
  return build(0)
}

describe('cone layout', () => {
  it('puts the root at the centre and everything else inside the ball', () => {
    const tree = hierarchy(computerHistory)
    coneLayout(tree)

    expect(lengthSq(tree.root.position)).toBe(0)
    for (const node of tree.nodes) {
      expect(length(node.position)).toBeLessThan(1)
      expect(Number.isFinite(node.position.x)).toBe(true)
      expect(Number.isFinite(node.position.y)).toBe(true)
      expect(Number.isFinite(node.position.z)).toBe(true)
    }
  })

  it('places every child exactly one link length from its parent', () => {
    const tree = hierarchy(computerHistory)
    coneLayout(tree, { linkLength: 1.1 })

    // Tight on purpose. The deepest chain in the dataset (x86, fourteen levels)
    // sits about 4e-7 from the boundary, so this doubles as a regression guard
    // on the numerics in `hyperbolicDistance`.
    for (const { source, target } of tree.links) {
      expect(hyperbolicDistance(source.position, target.position)).toBeCloseTo(1.1, 9)
    }
  })

  it('honours a per-node link length function', () => {
    const tree = hierarchy(computerHistory)
    coneLayout(tree, { linkLength: (n) => (n.depth === 1 ? 2 : 0.8) })

    for (const { source, target } of tree.links) {
      const expected = target.depth === 1 ? 2 : 0.8
      expect(hyperbolicDistance(source.position, target.position)).toBeCloseTo(expected, 5)
    }
  })

  it('keeps an only child on its parent axis, so chains stay straight', () => {
    const tree = hierarchy(chain(6))
    coneLayout(tree, { linkLength: 0.8 })

    const leaf = tree.nodes[tree.nodes.length - 1]
    // Six straight steps of 0.8 from the origin.
    expect(hyperbolicDistance(tree.root.position, leaf.position)).toBeCloseTo(0.8 * 6, 5)
  })

  it('separates siblings', () => {
    const tree = hierarchy(computerHistory)
    coneLayout(tree)

    for (const node of tree.nodes) {
      for (let i = 0; i < node.children.length; i++) {
        for (let j = i + 1; j < node.children.length; j++) {
          const d = hyperbolicDistance(node.children[i].position, node.children[j].position)
          expect(d).toBeGreaterThan(1e-4)
        }
      }
    }
  })

  it('gives a heavier subtree a wider cone', () => {
    const tree = hierarchy({
      id: 'r',
      name: 'r',
      children: [
        { id: 'heavy', name: 'heavy', children: Array.from({ length: 40 }, (_, i) => ({ id: `h${i}`, name: `h${i}` })) },
        { id: 'light', name: 'light' },
      ],
    })
    coneLayout(tree)

    const heavy = tree.byId.get('heavy')!
    const light = tree.byId.get('light')!
    expect(heavy.weight).toBe(40)
    expect(light.weight).toBe(1)
    expect(heavy.cone).toBeGreaterThan(light.cone)
  })

  it('is deterministic', () => {
    const a = hierarchy(computerHistory)
    const b = hierarchy(computerHistory)
    coneLayout(a)
    coneLayout(b)

    for (let i = 0; i < a.nodes.length; i++) {
      expect(a.nodes[i].position).toEqual(b.nodes[i].position)
    }
  })

  it('resets the view to the layout position', () => {
    const tree = hierarchy(computerHistory)
    coneLayout(tree)
    for (const node of tree.nodes) {
      expect(node.view).toEqual(node.position)
      expect(node.viewStart).toEqual(node.position)
    }
  })

  it('handles a wide synthetic tree without producing NaN', async () => {
    const tree = hierarchy(await nTree(4, 5)())
    coneLayout(tree)
    expect(tree.nodes.length).toBe(1365)
    for (const node of tree.nodes) {
      expect(Number.isNaN(node.position.x + node.position.y + node.position.z)).toBe(false)
      expect(length(node.position)).toBeLessThan(1)
    }
  })
})
