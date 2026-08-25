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
  expOrigin,
  geodesicPoint,
  hyperbolicDistance,
  length,
  mobiusAdd,
  negate,
  outwardDirection,
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

export interface GlideOptions {
  /** Speed halves roughly every `1/decay` seconds. Higher stops sooner. */
  decay: number
  /** Below this hyperbolic speed the glide ends. */
  minSpeed: number
  /** Cap, so a jittery pointer sample cannot launch the tree out of sight. */
  maxSpeed: number
}

export const defaultGlideOptions: GlideOptions = {
  decay: 4.6,
  minSpeed: 0.05,
  // Deliberately low. Speed here is *hyperbolic*, and a point grabbed near the
  // rim covers enormous hyperbolic distance for a few pixels of pointer travel,
  // so an honest reading of the release velocity launches the tree out of the
  // frame. The glide is meant to be a flourish that lets go, not a throw.
  maxSpeed: 3.2,
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

  /**
   * A released drag continuing under its own momentum.
   *
   * `from` and the snapshot stay fixed, so every frame is still one exact
   * isometry; only the target point moves on. Without this a drag stops dead
   * the instant the finger lifts, which is the single thing that makes a
   * direct manipulation surface feel like it is not really being held.
   */
  private glide: {
    from: Vec3
    at: Vec3
    direction: Vec3
    speed: number
    last: number
  } | null = null
  private glideOptions: GlideOptions = defaultGlideOptions

  constructor(
    private readonly tree: Tree,
    private readonly options: FlightOptions = defaultFlightOptions,
  ) {}

  get animating(): boolean {
    return this.flight !== null || this.glide !== null
  }

  setGlideOptions(options: Partial<GlideOptions>): void {
    this.glideOptions = { ...this.glideOptions, ...options }
  }

  /**
   * Carry a released drag on. `previous` and `to` are two samples of the grab
   * point and `seconds` the time between them, which together give a direction
   * and a hyperbolic speed.
   */
  startGlide(from: Vec3, previous: Vec3, to: Vec3, seconds: number): void {
    this.cancelGlide()
    if (seconds <= 0) return
    const travelled = hyperbolicDistance(previous, to)
    const speed = Math.min(travelled / seconds, this.glideOptions.maxSpeed)
    if (speed < this.glideOptions.minSpeed) return

    this.glide = {
      from: clone(from),
      at: clone(to),
      direction: outwardDirection(previous, to),
      speed,
      last: Number.NaN,
    }
  }

  cancelGlide(): void {
    this.glide = null
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
    this.cancelGlide()
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
    if (this.glide) return this.tickGlide(now)

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

  private tickGlide(now: number): boolean {
    const glide = this.glide!
    if (Number.isNaN(glide.last)) glide.last = now
    // Clamped: a stall must not teleport the tree across the ball in one frame.
    const dt = Math.min(0.05, (now - glide.last) / 1000)
    glide.last = now
    if (dt <= 0) return true

    const { decay, minSpeed } = this.glideOptions
    const step = glide.speed * dt
    const next = mobiusAdd(glide.at, expOrigin(glide.direction, step))
    // Parallel transport the heading: in curved space, continuing "the same way"
    // means following the geodesic, and its direction at the new point is not
    // the direction it had at the old one.
    glide.direction = outwardDirection(glide.at, next)
    glide.at = Navigator.clampGrab(next)
    glide.speed *= Math.exp(-decay * dt)

    this.applyMove(glide.from, glide.at)

    if (glide.speed < minSpeed) {
      this.glide = null
      return false
    }
    return true
  }
}
