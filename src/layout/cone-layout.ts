/**
 * Cone layout for the Poincare ball.
 *
 * The 2D hyperbolic tree browsers (H3, d3-hypertree) give each child an angular
 * wedge of its parent's wedge, sized by the weight of its subtree. The 3D
 * version of a wedge is a cone, and the quantity to share out is solid angle:
 *
 *   - The root owns the whole sphere.
 *   - A node with cone half angle `alpha` owns a spherical cap of area
 *     proportional to `1 - cos(alpha)`.
 *   - Each child takes a slice of that cap proportional to its weight, and its
 *     own half angle is read back from the slice area.
 *   - The child is aimed at the centre of its slice, with azimuths walked around
 *     by the golden angle so siblings spiral instead of stacking in a line.
 *
 * The child is then placed one hyperbolic step away in that direction. Because
 * hyperbolic space grows exponentially, a constant step keeps every level's
 * siblings roughly the same apparent size no matter how wide the tree gets -
 * which is the whole reason to use this geometry.
 */

import {
  ZERO,
  type Frame,
  type Vec3,
  applyFrame,
  capAngle,
  capFraction,
  clamp,
  clone,
  expOrigin,
  identityFrame,
  mobiusAdd,
  normalize,
  orthonormalize,
  outwardDirection,
  rotateFrame,
  sphericalDirection,
} from '../math'
import type { Tree, TreeNode } from '../model/types'

/** Complement of the golden ratio, in radians. Spreads siblings evenly. */
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

export type WeightMode = 'leaves' | 'uniform' | 'depth'
export type WeightFn = (node: TreeNode) => number
export type LinkLengthFn = (node: TreeNode) => number

export interface LayoutOptions {
  /**
   * Hyperbolic distance from a node to each of its children. A number, or a
   * function of the *child* so you can stretch the top of the tree.
   * Default: 1.45 at depth 1, 1.0 below.
   */
  linkLength: number | LinkLengthFn
  /**
   * How much of its fair share of the parent cone a child actually claims.
   * Below 1 leaves gaps between subtrees; above 1 packs them tighter and lets
   * neighbours overlap. Default 0.92.
   */
  spread: number
  /**
   * Weight exponent applied to leaf counts before sharing out solid angle.
   * 1 is proportional (a 400 leaf subtree gets 400x the cone of a leaf, which
   * squeezes small branches into slivers), 0 is fully uniform. Default 0.5.
   */
  weightExponent: number
  /** How subtree weight is measured before the exponent. Default `leaves`. */
  weight: WeightMode | WeightFn
  /** Half angle the root may use. Default PI, the full sphere. */
  rootCone: number
  /**
   * Upper bound on any descendant's cone half angle. Stops a lone child of the
   * root from claiming a hemisphere and folding back over its parent.
   * Default 1.15 rad, about 66 degrees.
   */
  maxCone: number
  /** Extra azimuth turn per sibling. Default: the golden angle. */
  azimuthStep: number
}

export const defaultLayoutOptions: LayoutOptions = {
  linkLength: (n) => (n.depth <= 1 ? 1.45 : 1.0),
  spread: 0.92,
  weightExponent: 0.5,
  weight: 'leaves',
  rootCone: Math.PI,
  maxCone: 1.15,
  azimuthStep: GOLDEN_ANGLE,
}

function resolveWeightFn(weight: WeightMode | WeightFn): WeightFn {
  if (typeof weight === 'function') return weight
  switch (weight) {
    case 'uniform':
      return () => 1
    case 'depth':
      return (n) => 1 + (n.maxDepth - n.depth)
    case 'leaves':
    default:
      return (n) => n.weight
  }
}

/**
 * Place every node of `tree` in the Poincare ball.
 *
 * Writes `position`, `frame` and `cone` on each node, and resets `view` to
 * `position`. Safe to call again with different options; it is a pure rewrite.
 */
export function coneLayout(tree: Tree, options: Partial<LayoutOptions> = {}): void {
  const opts = { ...defaultLayoutOptions, ...options }
  const weightOf = resolveWeightFn(opts.weight)
  const linkLengthOf: LinkLengthFn =
    typeof opts.linkLength === 'function' ? opts.linkLength : () => opts.linkLength as number

  const root = tree.root
  root.position = clone(ZERO)
  root.frame = identityFrame()
  root.cone = clamp(opts.rootCone, 1e-3, Math.PI)
  root.pathLength = 0

  // `tree.nodes` is breadth first, so a single forward sweep guarantees each
  // parent is already positioned when we reach it.
  for (const node of tree.nodes) {
    const children = node.children
    const count = children.length
    if (count === 0) continue

    const shares = children.map((c) => Math.pow(Math.max(weightOf(c), 1e-9), opts.weightExponent))
    const total = shares.reduce((a, b) => a + b, 0) || 1

    // Fraction of the whole sphere this node has to give away.
    const parentCap = capFraction(node.cone)

    let cumulative = 0

    for (let i = 0; i < count; i++) {
      const child = children[i]
      const fraction = shares[i] / total

      // The child's own cone, read back from the area it was allotted.
      const allotted = parentCap * fraction * opts.spread
      child.cone = Math.min(capAngle(allotted), opts.maxCone)

      // Aim at the centre of its slice of the parent cap. A single child stays
      // on the axis so that chains run straight instead of corkscrewing.
      let local: Vec3
      if (count === 1) {
        local = { x: 0, y: 0, z: 1 }
      } else {
        const t = cumulative + fraction / 2
        const theta = capAngle(t * parentCap)
        const phi = i * opts.azimuthStep + node.index * 0.7
        local = sphericalDirection(theta, phi)
      }
      cumulative += fraction

      const direction = normalize(applyFrame(node.frame, local))

      // One hyperbolic step, taken in the chart centred on the parent, then
      // translated back: parent (+) exp_0(direction, len).
      const length = Math.max(linkLengthOf(child), 1e-3)
      const step = expOrigin(direction, length)
      child.position = mobiusAdd(node.position, step)
      // Distance along the tree, not through the ball. The pulse wavefront is a
      // function of this, so it has to follow the branches.
      child.pathLength = node.pathLength + length

      // Transport the frame: first tilt the parent's axis onto the direction we
      // actually travelled, then correct for the rotation the curvature applied
      // along the way (the outward tangent at the child is not `direction`).
      const outward = outwardDirection(node.position, child.position)
      const tilted: Frame = rotateFrame(node.frame, node.frame.w, direction)
      child.frame = orthonormalize(rotateFrame(tilted, direction, outward))
    }
  }

  for (const node of tree.nodes) {
    node.view = clone(node.position)
    node.viewStart = clone(node.position)
  }
}
