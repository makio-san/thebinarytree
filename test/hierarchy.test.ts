import { describe, expect, it } from 'vitest'
import { descendants, hierarchy, pathToRoot, walk } from '../src/model/hierarchy'
import { fromFlat, nTree } from '../src/model/loaders'
import type { TreeDatum } from '../src/model/types'

const sample: TreeDatum = {
  name: 'Root',
  children: [
    { name: 'Left', children: [{ name: 'Left Lower' }, { name: 'Left Upper' }] },
    { name: 'Right' },
  ],
}

describe('hierarchy', () => {
  it('walks breadth first and indexes match array position', () => {
    const tree = hierarchy(sample)
    expect(tree.nodes.map((n) => n.data.name)).toEqual([
      'Root',
      'Left',
      'Right',
      'Left Lower',
      'Left Upper',
    ])
    tree.nodes.forEach((node, i) => expect(node.index).toBe(i))
  })

  it('derives ids from the path', () => {
    const tree = hierarchy(sample)
    expect(tree.byId.has('root')).toBe(true)
    expect(tree.byId.has('root/right')).toBe(true)
    expect(tree.byId.has('root/left/left-upper')).toBe(true)
  })

  it('folds diacritics when deriving an id', () => {
    // The dataset carries names like Gödel and Zürich, and generated ids have to
    // stay usable in a URL and typeable from a plain keyboard.
    const tree = hierarchy({
      name: 'Theory',
      children: [{ name: 'Gödel' }, { name: 'Zürich' }, { name: 'Işık' }],
    })
    expect([...tree.byId.keys()]).toEqual([
      'theory',
      'theory/godel',
      'theory/zurich',
      'theory/isik',
    ])
  })

  it('disambiguates repeated names instead of losing a node', () => {
    const tree = hierarchy({
      name: 'r',
      children: [{ name: 'x', children: [{ name: 'dup' }] }, { name: 'x' }],
    })
    expect(tree.nodes).toHaveLength(4)
    expect(new Set(tree.nodes.map((n) => n.id)).size).toBe(4)
  })

  it('counts leaves as weight and tracks subtree depth', () => {
    const tree = hierarchy(sample)
    expect(tree.root.weight).toBe(3)
    expect(tree.byId.get('root/left')!.weight).toBe(2)
    expect(tree.byId.get('root/right')!.weight).toBe(1)
    expect(tree.root.maxDepth).toBe(2)
    expect(tree.byId.get('root/right')!.maxDepth).toBe(1)
    expect(tree.maxDepth).toBe(2)
  })

  it('builds a path back to the root', () => {
    const tree = hierarchy(sample)
    const leaf = tree.byId.get('root/left/left-lower')!
    expect(pathToRoot(leaf).map((n) => n.data.name)).toEqual(['Root', 'Left', 'Left Lower'])
  })

  it('collects descendants and supports pruning during a walk', () => {
    const tree = hierarchy(sample)
    expect(descendants(tree.root)).toHaveLength(5)

    const visited: string[] = []
    walk(tree.root, (n) => {
      visited.push(n.data.name)
      if (n.data.name === 'Left') return false
      return undefined
    })
    expect(visited).toEqual(['Root', 'Left', 'Right'])
  })
})

describe('loaders', () => {
  it('stratifies a flat list', async () => {
    const rows = [
      { key: 'a', parent: null, title: 'A' },
      { key: 'b', parent: 'a', title: 'B' },
      { key: 'c', parent: 'a', title: 'C' },
      { key: 'd', parent: 'c', title: 'D' },
    ]
    const datum = await fromFlat(rows, {
      id: (r) => r.key,
      parentId: (r) => r.parent,
      datum: (r) => ({ name: r.title }),
    })()

    const tree = hierarchy(datum)
    expect(tree.nodes).toHaveLength(4)
    expect(tree.byId.get('d')!.depth).toBe(2)
  })

  it('rejects a flat list with no root', async () => {
    const loader = fromFlat([{ key: 'a', parent: 'b' }], {
      id: (r) => r.key,
      parentId: (r) => r.parent,
    })
    await expect(async () => loader()).rejects.toThrow(/unknown parent/)
  })

  it('generates a complete n-ary tree', async () => {
    const tree = hierarchy(await nTree(3, 4)())
    // 1 + 3 + 9 + 27 + 81
    expect(tree.nodes).toHaveLength(121)
    expect(tree.maxDepth).toBe(4)
  })
})
