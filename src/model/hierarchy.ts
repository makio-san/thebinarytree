import { ZERO, clone, identityFrame } from '../math'
import type { Tree, TreeDatum, TreeNode } from './types'

function slug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[İı]/g, 'i')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Turn nested plain data into a linked tree, in breadth first order.
 *
 * Breadth first matters downstream: the layout walks the array once from index
 * 0 and can rely on every parent already having been placed.
 */
export function hierarchy(datum: TreeDatum): Tree {
  const nodes: TreeNode[] = []
  const links: Tree['links'] = []
  const byId = new Map<string, TreeNode>()
  let maxDepth = 0

  const makeNode = (data: TreeDatum, parent: TreeNode | null): TreeNode => {
    let id = data.id ?? (parent ? `${parent.id}/${slug(data.name)}` : slug(data.name) || 'root')
    if (byId.has(id)) {
      let n = 2
      while (byId.has(`${id}~${n}`)) n++
      id = `${id}~${n}`
    }

    const node: TreeNode = {
      id,
      data,
      parent,
      children: [],
      depth: parent ? parent.depth + 1 : 0,
      index: nodes.length,
      weight: 1,
      maxDepth: 0,
      caliber: 1,
      pathLength: 0,
      position: clone(ZERO),
      view: clone(ZERO),
      viewStart: clone(ZERO),
      frame: identityFrame(),
      cone: Math.PI,
      visible: true,
      screenSize: 0,
      state: { selected: false, hovered: false, onPath: false, dimmed: false },
    }

    nodes.push(node)
    byId.set(id, node)
    if (node.depth > maxDepth) maxDepth = node.depth
    if (parent) {
      parent.children.push(node)
      links.push({ source: parent, target: node })
    }
    return node
  }

  const root = makeNode(datum, null)
  const queue: { node: TreeNode; data: TreeDatum }[] = [{ node: root, data: datum }]

  while (queue.length) {
    const { node, data } = queue.shift()!
    for (const childData of data.children ?? []) {
      const child = makeNode(childData, node)
      queue.push({ node: child, data: childData })
    }
  }

  // Leaf counts, subtree depths and vessel calibres, computed bottom up
  // (children always sit later in the array than their parent, so a reverse
  // sweep is enough).
  for (let i = nodes.length - 1; i >= 0; i--) {
    const n = nodes[i]
    if (n.children.length === 0) {
      n.weight = 1
      n.maxDepth = n.depth
      n.caliber = 1
    } else {
      let w = 0
      let d = n.depth
      let cubes = 0
      for (const c of n.children) {
        w += c.weight
        if (c.maxDepth > d) d = c.maxDepth
        cubes += c.caliber * c.caliber * c.caliber
      }
      n.weight = w
      n.maxDepth = d
      // Murray's law, r_parent^3 = sum of r_child^3.
      n.caliber = Math.cbrt(cubes)
    }
  }

  return { root, nodes, links, byId, maxDepth }
}

/** Root to node path, root first. */
export function pathToRoot(node: TreeNode): TreeNode[] {
  const out: TreeNode[] = []
  for (let n: TreeNode | null = node; n; n = n.parent) out.push(n)
  return out.reverse()
}

/** Depth first walk from `node` (inclusive). Return `false` to prune a subtree. */
export function walk(node: TreeNode, visit: (n: TreeNode) => void | false): void {
  const stack: TreeNode[] = [node]
  while (stack.length) {
    const n = stack.pop()!
    if (visit(n) === false) continue
    for (let i = n.children.length - 1; i >= 0; i--) stack.push(n.children[i])
  }
}

/** All descendants of `node`, including itself. */
export function descendants(node: TreeNode): TreeNode[] {
  const out: TreeNode[] = []
  walk(node, (n) => void out.push(n))
  return out
}
