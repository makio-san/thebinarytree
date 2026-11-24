/**
 * Bottom sheet, the way a native mobile app does it.
 *
 * The sheet is always at full height and translated down; only the offset
 * changes. That keeps its content layout stable, so expanding it does not reflow
 * the text and nothing jumps.
 *
 * Dragging is confined to the grab area (handle and header). Letting the whole
 * sheet be a drag surface fights the scroll of its own content, and the usual
 * workaround, watching scrollTop to decide whether a gesture is a scroll or a
 * drag, misfires constantly with momentum scrolling.
 */

export type SheetState = 'hidden' | 'peek' | 'half' | 'full'

export interface SheetOptions {
  /** Visible height in the peek state, in pixels. */
  peek: number
  /** Fraction of sheet height still hidden in the half state. */
  half: number
  /** Pixels of travel past the midpoint needed to change state. */
  threshold: number
  /** Velocity in px/ms above which a flick decides the state regardless. */
  flick: number
  onStateChange?: (state: SheetState) => void
}

const defaults: SheetOptions = {
  peek: 116,
  half: 0.45,
  threshold: 48,
  flick: 0.55,
}

export class Sheet {
  private state: SheetState = 'hidden'
  private readonly options: SheetOptions
  private height = 1
  private dragging = false
  private pointerId: number | null = null
  private startY = 0
  private startOffset = 0
  private lastY = 0
  private lastTime = 0
  private velocity = 0
  private enabled = false
  private readonly detach: (() => void)[] = []

  constructor(
    private readonly element: HTMLElement,
    private readonly grab: HTMLElement,
    options: Partial<SheetOptions> = {},
  ) {
    this.options = { ...defaults, ...options }

    const down = (event: PointerEvent) => this.onDown(event)
    const move = (event: PointerEvent) => this.onMove(event)
    const up = (event: PointerEvent) => this.onUp(event)

    this.grab.addEventListener('pointerdown', down)
    globalThis.addEventListener('pointermove', move)
    globalThis.addEventListener('pointerup', up)
    globalThis.addEventListener('pointercancel', up)
    this.detach.push(
      () => this.grab.removeEventListener('pointerdown', down),
      () => globalThis.removeEventListener('pointermove', move),
      () => globalThis.removeEventListener('pointerup', up),
      () => globalThis.removeEventListener('pointercancel', up),
    )

    // Tapping the handle toggles, which is what most people try first.
    this.grab.addEventListener('click', () => {
      if (!this.enabled || this.moved) return
      this.setState(this.state === 'full' ? 'peek' : this.state === 'peek' ? 'half' : 'full')
    })
  }

  private moved = false

  /** Turn the sheet behaviour on. Off means the element is laid out by CSS. */
  setEnabled(enabled: boolean): void {
    if (this.enabled === enabled) return
    this.enabled = enabled
    this.element.classList.toggle('is-sheet', enabled)
    if (!enabled) {
      this.element.style.transform = ''
      this.element.style.transition = ''
    } else {
      this.measure()
      this.apply(this.offsetFor(this.state === 'hidden' ? 'hidden' : this.state), true)
    }
  }

  measure(): void {
    this.height = Math.max(1, this.element.offsetHeight)
  }

  /** Change the visible height of the peek state, in pixels. */
  setPeek(pixels: number): void {
    if (pixels === this.options.peek) return
    this.options.peek = pixels
    if (this.enabled && this.state === 'peek') {
      this.measure()
      this.apply(this.offsetFor('peek'), false)
    }
  }

  get current(): SheetState {
    return this.state
  }

  setState(state: SheetState): void {
    this.state = state
    this.element.dataset.sheet = state
    if (this.enabled) {
      this.measure()
      this.apply(this.offsetFor(state), true)
    }
    this.options.onStateChange?.(state)
  }

  private offsetFor(state: SheetState): number {
    switch (state) {
      case 'hidden':
        return this.height
      case 'peek':
        return Math.max(0, this.height - this.options.peek)
      case 'half':
        return this.height * this.options.half
      case 'full':
      default:
        return 0
    }
  }

  private apply(offset: number, animated: boolean): void {
    this.element.style.transition = animated
      ? 'transform 340ms cubic-bezier(0.22, 1, 0.36, 1)'
      : 'none'
    this.element.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
  }

  private onDown(event: PointerEvent): void {
    if (!this.enabled || this.pointerId !== null) return
    this.pointerId = event.pointerId
    this.dragging = true
    this.moved = false
    this.measure()
    this.startY = this.lastY = event.clientY
    this.lastTime = event.timeStamp
    this.velocity = 0
    this.startOffset = this.offsetFor(this.state)
    this.grab.setPointerCapture?.(event.pointerId)
  }

  private onMove(event: PointerEvent): void {
    if (!this.dragging || event.pointerId !== this.pointerId) return
    const dy = event.clientY - this.startY
    if (Math.abs(dy) > 3) this.moved = true

    const dt = Math.max(1, event.timeStamp - this.lastTime)
    this.velocity = (event.clientY - this.lastY) / dt
    this.lastY = event.clientY
    this.lastTime = event.timeStamp

    // Rubber band past the top so the sheet feels physical rather than clamped,
    // but only by a few pixels: the top bar is right above a fully open sheet,
    // and a sheet that follows the finger further slides underneath it.
    let offset = this.startOffset + dy
    if (offset < 0) offset = Math.max(-6, offset * 0.12)
    const max = this.offsetFor('peek')
    if (offset > max) offset = max + (offset - max) * 0.45

    this.apply(offset, false)
  }

  private onUp(event: PointerEvent): void {
    if (!this.dragging || event.pointerId !== this.pointerId) return
    this.dragging = false
    this.pointerId = null
    this.grab.releasePointerCapture?.(event.pointerId)
    if (!this.moved) {
      this.apply(this.offsetFor(this.state), true)
      return
    }

    const dy = this.lastY - this.startY
    const { threshold, flick } = this.options

    let next = this.state
    if (this.velocity > flick) next = this.state === 'full' ? 'half' : 'peek'
    else if (this.velocity < -flick) next = this.state === 'peek' ? 'half' : 'full'
    else if (dy > threshold) next = this.state === 'full' ? 'half' : 'peek'
    else if (dy < -threshold) next = this.state === 'peek' ? 'half' : 'full'

    this.setState(next)
  }

  dispose(): void {
    for (const off of this.detach) off()
    this.detach.length = 0
  }
}
