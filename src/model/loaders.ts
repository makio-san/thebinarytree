import type { TreeDatum } from './types'

/**
 * A dataloader hands the tree its data, sync or async.
 * Mirrors the `dataloader` callback style of d3-hypertree.
 */
export type DataLoader = () => TreeDatum | Promise<TreeDatum>

/** Use an in-memory object. */
export const fromObject = (datum: TreeDatum): DataLoader => () => datum

/** Fetch nested JSON over the network. */
export const fromUrl = (url: string, init?: RequestInit): DataLoader => async () => {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`computer-tree: ${res.status} ${res.statusText} for ${url}`)
  return (await res.json()) as TreeDatum
}

/**
 * Build a tree from a flat list of records that name their parent, the way
 * `d3.stratify` does.
 */
export function fromFlat<T extends Record<string, unknown>>(
  rows: T[],
  accessors: {
    id: (row: T) => string
    parentId: (row: T) => string | null | undefined
    datum?: (row: T) => Partial<TreeDatum>
  },
): DataLoader {
  return () => {
    const byId = new Map<string, TreeDatum>()
    let root: TreeDatum | null = null

    for (const row of rows) {
      const id = accessors.id(row)
      const extra = accessors.datum?.(row) ?? {}
      byId.set(id, { id, name: String(extra.name ?? id), ...extra, children: [] })
    }

    for (const row of rows) {
      const id = accessors.id(row)
      const parentId = accessors.parentId(row)
      const node = byId.get(id)!
      if (parentId == null || parentId === '') {
        if (root) throw new Error(`computer-tree: more than one root (${root.id}, ${id})`)
        root = node
        continue
      }
      const parent = byId.get(parentId)
      if (!parent) throw new Error(`computer-tree: unknown parent "${parentId}" for "${id}"`)
      parent.children!.push(node)
    }

    if (!root) throw new Error('computer-tree: no root row (one row must have a null parent)')
    return root
  }
}

/**
 * Synthetic tree, handy for benchmarking the layout without real data.
 * `nTree(3, 6)` is a complete ternary tree of depth 6, so 1093 nodes.
 */
export const nTree = (branching: number, depth: number): DataLoader => () => {
  const build = (level: number, path: string): TreeDatum => ({
    id: path,
    name: path,
    children:
      level >= depth
        ? undefined
        : Array.from({ length: branching }, (_, i) => build(level + 1, `${path}.${i}`)),
  })
  return build(0, 'n')
}

export const loaders = { fromObject, fromUrl, fromFlat, nTree }
