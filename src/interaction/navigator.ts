/**
 * Navigation: moving the tree through the ball.
 *
 * Every gesture, drag or flight, reduces to one question - "which point should
 * end up where?" - and one answer, the isometry `x -> to (+) ((-from) (+) x)`.
 *
 * Two details matter for stability:
 *
 * 1. The isometry is always applied to `viewStart`, a snapshot taken when the
 *    gesture began, never to `view`. Composing a fresh transform onto the live
 *    positions every frame would accumulate float error extremely fast near the
 *    boundary, where the coordinates crowd into the last few digits of a double.
 * 2. Interpolation runs on the *target point* along a geodesic, not on the node
 *    positions. So every intermediate frame is still a rigid motion of the whole
 *    tree; the layout never deforms mid-flight.
 */

import {
  ZERO,
  type Vec3,
  clone,
  geodesicPoint,
  hyperbolicDistance,
  length,
  mobiusAdd,
  negate,
  scale,
} from '../math'
import type { Tree, TreeNode } from '../model/types'

/** Keep grabbed points off the boundary, where a pixel is worth infinite space. */
const MAX_GRAB_RADIUS = 0.988

export interface FlightOptions {
  /** Milliseconds. Scaled up a little for long journeys. */
  duration: number
  easing: (t: number) => number
}

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export const defaultFlightOptions: FlightOptions = {
  duration: 620,
  easing: easeInOutCubic,
}

export class Navigator {
  private flight: {
    from: Vec3
    to: Vec3
    start: number
    duration: number
    easing: (t: number) => number
    resolve: () => void
  } | null = null

  constructor(
    private readonly tree: Tree,
    private readonly options: FlightOptions = defaultFlightOptions,
  ) {}

  get animating(): boolean {
    return this.flight !== null
  }

  /**
   * Freeze the current positions as the base for the gesture about to start.
   *
   * Ends any flight in progress. A flight interpolates against the snapshot it
   * took when it started, so re-baselining underneath it would let it overwrite
   * the new gesture on the next frame - which is exactly what happens when you
   * grab a node mid-flight. Taking a new baseline means taking over.
   */
  snapshot(): void {
    this.cancel()
    for (const node of this.tree.nodes) node.viewStart = clone(node.view)
  }

  /**
   * Move the tree rigidly so that whatever was at `from` sits at `to`.
   * Applied to the snapshot, so calling it repeatedly during a drag is exact.
   */
  applyMove(from: Vec3, to: Vec3): void {
    const negFrom = negate(from)
    for (const node of this.tree.nodes) {
      node.view = mobiusAdd(to, mobiusAdd(negFrom, node.viewStart))
    }
  }

  /** Clamp a raw pointer-derived point to somewhere we can safely grab. */
  static clampGrab(p: Vec3): Vec3 {
    const l = length(p)
    return l <= MAX_GRAB_RADIUS ? p : scale(p, MAX_GRAB_RADIUS / l)
  }

  /** Cancel any flight in progress and settle where we are. */
  cancel(): void {
    if (!this.flight) return
    const flight = this.flight
    this.flight = null
    flight.resolve()
  }

  /**
   * Fly the point currently at `from` to `to`. Resolves when it lands.
   * Duration grows with hyperbolic distance so short hops stay snappy while a
   * jump across the tree still reads as a journey.
   */
  flyFromTo(from: Vec3, to: Vec3, options: Partial<FlightOptions> = {}): Promise<void> {
    this.cancel()
    const opts = { ...this.options, ...options }
    const span = hyperbolicDistance(from, to)
    const duration = Math.max(140, opts.duration * Math.min(1.9, 0.45 + span * 0.3))

    this.snapshot()

    if (duration <= 16 || span < 1e-6) {
      this.applyMove(from, to)
      return Promise.resolve()
    }

    return new Promise<void>((resolve) => {
      this.flight = {
        from: clone(from),
        to: clone(to),
        start: Number.NaN, // stamped on the first tick, so no clock reads here
        duration,
        easing: opts.easing,
        resolve,
      }
    })
  }

  /** Bring a node to the centre of the ball. */
  flyToNode(node: TreeNode, options: Partial<FlightOptions> = {}): Promise<void> {
    return this.flyFromTo(node.view, ZERO, options)
  }

  /** Bring the root back to the centre. */
  flyHome(options: Partial<FlightOptions> = {}): Promise<void> {
    return this.flyToNode(this.tree.root, options)
  }

  /**
   * Advance any flight. Returns true while it still needs frames.
   * `now` comes from the render loop so the whole library reads one clock.
   */
  tick(now: number): boolean {
    const flight = this.flight
    if (!flight) return false

    if (Number.isNaN(flight.start)) flight.start = now

    const t = Math.min(1, (now - flight.start) / flight.duration)
    const eased = flight.easing(t)
    const target = geodesicPoint(flight.from, flight.to, eased)
    this.applyMove(flight.from, target)

    if (t >= 1) {
      this.flight = null
      flight.resolve()
      return false
    }
    return true
  }
}
