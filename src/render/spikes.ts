/**
 * The signal model: action potentials, not a sine wave.
 *
 * A spike is emitted at the root and travels outward at a fixed conduction
 * velocity along `pathLength`, so it follows the branches rather than expanding
 * as a sphere. What arrives at a point is not a smooth swell but the shape a real
 * membrane makes: an almost vertical rise, then an exponential decay, then a
 * refractory dip below rest before it recovers.
 *
 * That shape is the whole difference between this reading as a nervous system and
 * reading as fluid in a pipe. A sinusoid has no direction and no event; a spike
 * arrives, and you can see it arrive.
 *
 * Every layer reads its intensity from here, so the filaments, the somata and
 * their halos all fire on the same signal instead of animating independently.
 */

import type { Tree, TreeNode } from '../model/types'

export interface SpikeOptions {
  /** Seconds between emissions at the root. */
  period: number
  /** Path units per second. Sets how long the signal takes to cross the tree. */
  speed: number
  /** Seconds from rest to peak. Very short: this is the depolarising edge. */
  rise: number
  /** Decay time constant in seconds. */
  decay: number
  /**
   * Depth of the refractory dip, as a fraction of peak. A neuron is briefly
   * harder to excite after firing, and drawing that keeps the trailing edge from
   * looking like a fade out.
   */
  refractory: number
  /**
   * Random spread in arrival time, in seconds, per node. Real conduction is not
   * uniform, and without a little jitter every sibling fires in lockstep, which
   * looks mechanical.
   */
  jitter: number
}

export const defaultSpikeOptions: SpikeOptions = {
  period: 2.6,
  speed: 7,
  rise: 0.045,
  decay: 0.19,
  refractory: 0.22,
  jitter: 0.09,
}

/** Deterministic per-node offset, so the pattern is stable across reloads. */
const jitterOf = (index: number): number => {
  const x = Math.sin(index * 91.7351) * 43758.5453
  return (x - Math.floor(x)) * 2 - 1
}

/**
 * Membrane potential relative to rest, for a point that last received a spike
 * `elapsed` seconds ago. Returns roughly -refractory..1.
 */
export function potential(elapsed: number, options: SpikeOptions): number {
  if (elapsed < 0) return 0
  const { rise, decay, refractory } = options
  if (elapsed < rise) return elapsed / rise
  const after = elapsed - rise
  const fall = Math.exp(-after / decay)
  // Undershoot: the decay overshoots rest and creeps back up.
  const dip = -refractory * Math.exp(-after / (decay * 2.4)) * (1 - Math.exp(-after / decay))
  return fall + dip
}

/**
 * Tracks the firing state of every node. One instance is advanced once per frame
 * and read by every layer, which is what keeps them in step.
 */
export class SpikeField {
  private options: SpikeOptions
  private readonly offsets: Float32Array

  constructor(
    private readonly tree: Tree,
    options: Partial<SpikeOptions> = {},
  ) {
    this.options = { ...defaultSpikeOptions, ...options }
    this.offsets = new Float32Array(tree.nodes.length)
    for (let i = 0; i < tree.nodes.length; i++) {
      this.offsets[i] = jitterOf(i) * this.options.jitter
    }
  }

  setOptions(options: Partial<SpikeOptions>): void {
    this.options = { ...this.options, ...options }
  }

  get settings(): SpikeOptions {
    return this.options
  }

  /** Seconds since the most recent spike reached `pathLength`. */
  elapsedAt(pathLength: number, seconds: number, offset = 0): number {
    const { period, speed } = this.options
    const arrival = pathLength / speed + offset
    const since = seconds - arrival
    // Modulo, biased positive, so a point the signal has not reached yet still
    // sees the previous emission rather than a gap.
    return ((since % period) + period) % period
  }

  /** Membrane potential at an arbitrary path position. Used along a filament. */
  at(pathLength: number, seconds: number, offset = 0): number {
    return potential(this.elapsedAt(pathLength, seconds, offset), this.options)
  }

  /** Advance every node's `fire` value. Call once per frame, before the layers. */
  update(seconds: number): void {
    for (const node of this.tree.nodes) {
      node.fire = this.at(node.pathLength, seconds, this.offsets[node.index])
    }
  }

  /** Jitter offset for a node, so a filament can match its endpoints exactly. */
  offsetOf(node: TreeNode): number {
    return this.offsets[node.index]
  }
}
