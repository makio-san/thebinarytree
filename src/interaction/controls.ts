/**
 * Pointer, wheel and keyboard input.
 *
 * The gesture vocabulary is deliberately small:
 *
 *   drag inside the ball  pull that point through hyperbolic space; the rest of
 *                         the tree follows rigidly, and a release with speed
 *                         keeps gliding
 *   drag outside it       orbit the camera around the ball
 *   shift or right drag   orbit from anywhere
 *   wheel / pinch         move the camera in and out
 *   click a node          select it and fly it to the centre
 *   double tap            closer on a node, back out on the backdrop
 *   arrows / Enter        walk the tree without a mouse
 *
 * Grabbing is the default and orbiting is the deliberate gesture, not the other
 * way round. Requiring an exact hit on a node before a drag would move anything
 * made most of the surface feel dead: you aimed at a branch, missed by three
 * pixels, and the camera swung instead.
 */

import { Vector2 } from 'three'
import type { Vec3 } from '../math'
import { ZERO, clone } from '../math'
import type { TreeNode } from '../model/types'
import type { Stage } from '../render/stage'
import { Navigator } from './navigator'
import { insideBall, pointerOnPlane } from './pointer-ray'

export type KeyCommand = 'parent' | 'child' | 'prev' | 'next' | 'home' | 'focus' | 'clear'

/** State of a drag at the moment it was released, enough to continue it. */
export interface DragThrow {
  /** The point that was grabbed, in ball coordinates. */
  from: Vec3
  /** Where it had reached. */
  to: Vec3
  /** Where it was one sample earlier, which gives the direction and the speed. */
  previous: Vec3
  /** Seconds between those two samples. */
  seconds: number
}

export interface ControlsHandlers {
  /** `tolerance` is a hit slop in CSS pixels; 0 means an exact ray test. */
  pick: (ndc: Vector2, tolerance: number) => TreeNode | null
  onHover: (node: TreeNode | null) => void
  onSelect: (node: TreeNode | null) => void
  /** Second tap on the same spot. `null` means the backdrop was tapped. */
  onDoubleTap?: (node: TreeNode | null) => void
  onDragStart: () => void
  onDrag: (from: Vec3, to: Vec3) => void
  /** `throw` is present when the pointer was still moving at release. */
  onDragEnd: (thrown?: DragThrow) => void
  onKey: (command: KeyCommand) => void
  requestRender: () => void
}

export interface ControlsOptions {
  orbitSpeed: number
  zoomSpeed: number
  /** Pointer travel in CSS pixels below which a drag counts as a click. */
  clickSlop: number
  enableKeyboard: boolean
  /**
   * Hit slop for touch and pen, in CSS pixels. A fingertip is about 8mm and a
   * node away from the centre of the ball is a few pixels across, so an exact
   * ray test leaves most of the tree untappable. A mouse keeps an exact test,
   * because a cursor really is a point.
   */
  touchTolerance: number
  /** Milliseconds within which a second tap counts as a double tap. */
  doubleTapWindow: number
}

export const defaultControlsOptions: ControlsOptions = {
  orbitSpeed: 0.0062,
  zoomSpeed: 0.0013,
  clickSlop: 5,
  enableKeyboard: true,
  touchTolerance: 24,
  doubleTapWindow: 300,
}

type Mode = 'idle' | 'pull' | 'orbit' | 'pinch'

export class Controls {
  private mode: Mode = 'idle'
  private readonly pointers = new Map<number, { x: number; y: number }>()
  private startX = 0
  private startY = 0
  private lastX = 0
  private lastY = 0
  private travelled = 0
  private grabbedFrom: Vec3 = clone(ZERO)
  private grabbedNode: TreeNode | null = null
  private hovered: TreeNode | null = null
  private pinchDistance = 0
  private lastTapTime = 0
  private lastTapX = 0
  private lastTapY = 0
  /** Recent motion of the grab point, for the throw on release. */
  private velocityFrom: Vec3 = clone(ZERO)
  private velocityTo: Vec3 | null = null
  private velocityAt = 0
  private velocityDt = 16

  private readonly ndc = new Vector2()
  private readonly detach: (() => void)[] = []

  constructor(
    private readonly root: HTMLElement,
    private readonly stage: Stage,
    private readonly handlers: ControlsHandlers,
    private readonly options: ControlsOptions = defaultControlsOptions,
  ) {
    const canvas = stage.canvas
    this.on(canvas, 'pointerdown', this.onPointerDown as EventListener)
    this.on(canvas, 'pointermove', this.onPointerMove as EventListener)
    this.on(canvas, 'pointerup', this.onPointerUp as EventListener)
    this.on(canvas, 'pointercancel', this.onPointerUp as EventListener)
    this.on(canvas, 'pointerleave', this.onPointerLeave as EventListener)
    this.on(canvas, 'wheel', this.onWheel as EventListener, { passive: false })
    this.on(canvas, 'contextmenu', ((e: Event) => e.preventDefault()) as EventListener)

    if (options.enableKeyboard !== false) {
      root.tabIndex = root.tabIndex >= 0 ? root.tabIndex : 0
      this.on(root, 'keydown', this.onKeyDown as EventListener)
    }
  }

  private on(
    target: EventTarget,
    type: string,
    listener: EventListener,
    opts?: AddEventListenerOptions,
  ): void {
    target.addEventListener(type, listener, opts)
    this.detach.push(() => target.removeEventListener(type, listener, opts))
  }

  private toNdc(event: { clientX: number; clientY: number }): Vector2 {
    const rect = this.stage.canvas.getBoundingClientRect()
    this.ndc.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -(((event.clientY - rect.top) / rect.height) * 2 - 1),
    )
    return this.ndc
  }

  /** Delegates to the pure helper; see `pointer-ray.ts`. */
  private pointerInBall(event: PointerEvent, reference: Vec3): Vec3 | null {
    return pointerOnPlane(this.toNdc(event), this.stage.camera, reference)
  }

  private onPointerDown = (event: PointerEvent): void => {
    this.stage.canvas.setPointerCapture?.(event.pointerId)
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (this.pointers.size === 2) {
      this.endDrag()
      this.mode = 'pinch'
      this.pinchDistance = this.currentPinchDistance()
      return
    }
    if (this.pointers.size > 2) return

    this.startX = this.lastX = event.clientX
    this.startY = this.lastY = event.clientY
    this.travelled = 0

    // Orbit is the deliberate gesture, not the default. Grabbing the tree and
    // pulling it is the whole point of a hyperbolic browser, and requiring an
    // exact hit on a node first made most of the surface feel dead: you aimed at
    // a branch, missed by three pixels, and the camera swung instead.
    const orbitRequested = event.shiftKey || event.button === 2
    const node = orbitRequested ? null : this.handlers.pick(this.toNdc(event), this.slopFor(event))

    let anchor: Vec3 | null = node ? clone(node.view) : null
    if (!anchor && !orbitRequested) {
      // No node under the pointer: grab whatever point of the ball is there, on
      // the plane through the origin. Outside the silhouette there is nothing to
      // hold, so that falls through to orbit.
      const raw = this.pointerInBall(event, ZERO)
      if (insideBall(raw)) anchor = Navigator.clampGrab(raw!)
    }

    if (anchor) {
      this.mode = 'pull'
      this.grabbedNode = node
      this.grabbedFrom = anchor
      this.velocityFrom = clone(anchor)
      this.velocityAt = event.timeStamp
      this.handlers.onDragStart()
    } else {
      this.mode = 'orbit'
      this.grabbedNode = null
    }
    this.root.dataset.cursor = 'grabbing'
  }

  private onPointerMove = (event: PointerEvent): void => {
    const tracked = this.pointers.get(event.pointerId)
    if (tracked) {
      tracked.x = event.clientX
      tracked.y = event.clientY
    }

    if (this.mode === 'pinch') {
      const d = this.currentPinchDistance()
      if (this.pinchDistance > 0 && d > 0) {
        this.stage.dolly(this.pinchDistance / d)
        this.handlers.requestRender()
      }
      this.pinchDistance = d
      return
    }

    if (this.mode === 'idle') {
      // Hover is a mouse idea, and it should stay exact: a generous hover slop
      // means the highlight jumps to nodes the cursor is not on.
      const node = this.handlers.pick(this.toNdc(event), 0)
      if (node !== this.hovered) {
        this.hovered = node
        this.root.dataset.cursor = node ? 'pointer' : 'grab'
        this.handlers.onHover(node)
      }
      return
    }

    const dx = event.clientX - this.lastX
    const dy = event.clientY - this.lastY
    this.lastX = event.clientX
    this.lastY = event.clientY
    this.travelled += Math.abs(dx) + Math.abs(dy)

    if (this.mode === 'orbit') {
      this.stage.orbit(-dx * this.options.orbitSpeed, -dy * this.options.orbitSpeed)
      this.handlers.requestRender()
      return
    }

    if (this.mode === 'pull') {
      if (this.travelled < this.options.clickSlop) return
      const raw = this.pointerInBall(event, this.grabbedFrom)
      if (!raw) return
      const to = Navigator.clampGrab(raw)
      // Remember where the grab point was a moment ago, so releasing can carry
      // the motion on. Sampled over a short window rather than frame to frame:
      // one frame of pointer noise would otherwise decide the whole throw.
      if (event.timeStamp - this.velocityAt > 40) {
        this.velocityFrom = clone(this.velocityTo ?? this.grabbedFrom)
        this.velocityAt = event.timeStamp
      }
      this.velocityTo = to
      this.velocityDt = Math.max(1, event.timeStamp - this.velocityAt)
      this.handlers.onDrag(this.grabbedFrom, to)
      this.handlers.requestRender()
    }
  }

  private onPointerUp = (event: PointerEvent): void => {
    this.pointers.delete(event.pointerId)
    this.stage.canvas.releasePointerCapture?.(event.pointerId)

    if (this.mode === 'pinch') {
      if (this.pointers.size === 0) this.mode = 'idle'
      return
    }

    const moved =
      Math.abs(event.clientX - this.startX) + Math.abs(event.clientY - this.startY) >=
      this.options.clickSlop

    if (this.mode === 'pull') {
      // Hand the throw over before clearing state, so a release with speed keeps
      // gliding instead of stopping dead under the finger.
      this.handlers.onDragEnd(
        moved && this.velocityTo
          ? {
              from: this.grabbedFrom,
              to: this.velocityTo,
              previous: this.velocityFrom,
              seconds: this.velocityDt / 1000,
            }
          : undefined,
      )
    }
    this.velocityTo = null

    if (!moved) {
      const tapped = this.mode === 'pull' ? this.grabbedNode : null
      const near =
        Math.abs(event.clientX - this.lastTapX) + Math.abs(event.clientY - this.lastTapY) < 34
      const quick = event.timeStamp - this.lastTapTime < this.options.doubleTapWindow

      if (near && quick && this.handlers.onDoubleTap) {
        this.handlers.onDoubleTap(tapped)
        // Consume it, so a triple tap is not read as two double taps.
        this.lastTapTime = 0
      } else {
        this.handlers.onSelect(tapped)
        this.lastTapTime = event.timeStamp
        this.lastTapX = event.clientX
        this.lastTapY = event.clientY
      }
    }

    this.mode = 'idle'
    this.grabbedNode = null
    this.root.dataset.cursor = this.hovered ? 'pointer' : 'grab'
  }

  private onPointerLeave = (): void => {
    if (this.hovered) {
      this.hovered = null
      this.handlers.onHover(null)
    }
    this.root.dataset.cursor = 'grab'
  }

  private onWheel = (event: WheelEvent): void => {
    event.preventDefault()
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 400 : 1
    this.stage.dolly(Math.exp(event.deltaY * unit * this.options.zoomSpeed))
    this.handlers.requestRender()
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    const map: Record<string, KeyCommand> = {
      ArrowUp: 'parent',
      ArrowDown: 'child',
      ArrowLeft: 'prev',
      ArrowRight: 'next',
      Home: 'home',
      Enter: 'focus',
      ' ': 'focus',
      Escape: 'clear',
    }
    const command = map[event.key]
    if (!command) return
    event.preventDefault()
    this.handlers.onKey(command)
  }

  /** Hit slop appropriate to the input device. */
  private slopFor(event: PointerEvent): number {
    return event.pointerType === 'mouse' ? 0 : this.options.touchTolerance
  }

  private currentPinchDistance(): number {
    const [a, b] = [...this.pointers.values()]
    if (!a || !b) return 0
    return Math.hypot(a.x - b.x, a.y - b.y)
  }

  private endDrag(): void {
    if (this.mode === 'pull') this.handlers.onDragEnd()
    this.mode = 'idle'
    this.grabbedNode = null
    this.velocityTo = null
  }

  dispose(): void {
    for (const off of this.detach) off()
    this.detach.length = 0
    this.pointers.clear()
  }
}
