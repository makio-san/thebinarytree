import type { Frame, Vec3 } from '../math'

/**
 * Input shape. Anything with a `name` and optional `children` works; the extra
 * fields are what the bundled computer history dataset fills in and what the
 * demo's info panel reads back out.
 */
export interface TreeDatum {
  /** Stable identifier. Generated from the path if omitted. */
  id?: string
  name: string
  /** Year the thing appeared. Drives the timeline filter and the era colouring. */
  year?: number
  /** Era key, matched against the palette (see `src/data/eras.ts`). */
  era?: string
  /** Free form category: machine, processor, os, language, network, concept... */
  kind?: string
  /** Country or lab of origin. */
  origin?: string
  /** One or two sentences of context. */
  summary?: string
  /** Short standalone facts, rendered as a list. */
  facts?: string[]
  /** Reference link. */
  href?: string
  children?: TreeDatum[]
  /** Anything else you want to carry through to the callbacks. */
  [key: string]: unknown
}

/**
 * A node of the laid out tree.
 *
 * Three position-ish fields, and the difference between them matters:
 *
 * - `position` is where the layout put the node. It never changes.
 * - `view` is where the node currently is after navigation, i.e. the layout
 *   position pushed through the accumulated isometry. This is what gets drawn.
 * - `viewStart` is a snapshot of `view` taken when a gesture begins, so that a
 *   drag or a flight applies one single isometry instead of compounding a
 *   transform every frame (which would drift badly near the boundary).
 */
export interface TreeNode {
  readonly id: string
  readonly data: TreeDatum
  readonly parent: TreeNode | null
  readonly children: TreeNode[]
  readonly depth: number
  /** Root first, then breadth first. Also the node's index in `tree.nodes`. */
  readonly index: number
  /** Number of leaves at or below this node. */
  weight: number
  /** Deepest depth in this subtree, relative to the whole tree. */
  maxDepth: number
  /**
   * Vessel calibre, by Murray's law: a parent's cube equals the sum of its
   * children's cubes. A leaf is 1. This is what a real branching system does -
   * arteries, bronchi, tree limbs all obey it, because it minimises the work of
   * pushing something through the network. Using it to set link thickness is why
   * the picture reads as vasculature rather than as a wire diagram.
   */
  caliber: number
  /**
   * Hyperbolic distance from the root, measured along the tree rather than
   * straight through the ball. Drives the heartbeat: the pulse wavefront is a
   * function of this, so it leaves the trunk and travels outward coherently
   * instead of every link blinking on its own.
   */
  pathLength: number

  position: Vec3
  view: Vec3
  viewStart: Vec3
  /** Local orthonormal frame; `w` points away from the parent. */
  frame: Frame
  /** Half angle of the cone this subtree is allowed to occupy, in radians. */
  cone: number

  /** Set by the filter each frame. */
  visible: boolean
  /** Euclidean screen-ish size, used to decide label priority. */
  screenSize: number
  state: NodeState
}

export interface NodeState {
  selected: boolean
  hovered: boolean
  /** On the path from the root to the selected node. */
  onPath: boolean
  /** Excluded by the demo's timeline / search filters. */
  dimmed: boolean
}

export interface Tree {
  root: TreeNode
  /** Breadth first order. `nodes[i].index === i`. */
  nodes: TreeNode[]
  /** Parent/child pairs, in the same order as `nodes` minus the root. */
  links: { source: TreeNode; target: TreeNode }[]
  byId: Map<string, TreeNode>
  maxDepth: number
}
