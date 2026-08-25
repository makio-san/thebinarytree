/**
 * BinaryTree - a 3D hyperbolic tree browser.
 *
 *   const tree = new BinaryTree(
 *     { parent: document.getElementById('app')! },
 *     { dataloader: loaders.fromObject(computerHistory) },
 *   )
 *   await tree.initPromise
 *   tree.api.gotoNode('root/mikroislemciler/intel-4004')
 *
 * The two-argument shape follows d3-hypertree: the first object says *where* the
 * component lives, the second says *what* it shows and how it behaves.
 */

import { lengthSq } from './math'
import { hierarchy, pathToRoot } from './model/hierarchy'
import type { DataLoader } from './model/loaders'
import type { Tree, TreeDatum, TreeNode } from './model/types'
import { type LayoutOptions, coneLayout } from './layout/cone-layout'
import { type FlightOptions, Navigator } from './interaction/navigator'
import {
  type ControlsOptions,
  type KeyCommand,
  Controls,
  defaultControlsOptions,
} from './interaction/controls'
import { GlowLayer, type GlowOptions } from './render/glow-layer'
import { LabelsLayer, type LabelsOptions } from './render/labels-layer'
import { LinksLayer, type LinksOptions } from './render/links-layer'
import { NodesLayer, type NodesOptions } from './render/nodes-layer'
import { Stage, type StageOptions } from './render/stage'
import { type Theme, type ThemeName, themes } from './render/theme'
import './render/the-binary-tree.css'

export interface ComponentConfig {
  /** Element the component is mounted into. Sized by CSS; it is not resized. */
  parent: HTMLElement
  id?: string
  /** Extra class names on the component root. */
  classes?: string
}

export interface InteractionConfig {
  onNodeClick?: (node: TreeNode, tree: BinaryTree) => void
  onNodeHover?: (node: TreeNode | null, tree: BinaryTree) => void
  onSelectionChange?: (node: TreeNode | null, tree: BinaryTree) => void
  /** Fires when the node nearest the centre of the ball changes. */
  onCenterNodeChange?: (node: TreeNode, tree: BinaryTree) => void
  /** Fires once, after the first layout and paint. */
  onInit?: (tree: BinaryTree) => void
  /** Fly to a node when it is clicked. Default true. */
  focusOnClick?: boolean
  controls?: Partial<ControlsOptions>
  flight?: Partial<FlightOptions>
}

export interface MotionConfig {
  /**
   * Keep painting when nothing has changed, so the link flow and the stars stay
   * alive. Off means frames are produced only on interaction, which is cheaper
   * but loses the pulse. Automatically off under `prefers-reduced-motion`.
   */
  ambient: boolean
  /** Seconds for the tree to grow out from the root on first load. 0 skips it. */
  growth: number
  /** Beats per second of the shared pulse driving glow and selection. */
  pulseRate: number
}

export const defaultMotionConfig: MotionConfig = {
  ambient: true,
  growth: 2.4,
  pulseRate: 0.5,
}

export interface TreeConfig {
  dataloader: DataLoader
  layout?: Partial<LayoutOptions>
  geometry?: {
    nodes?: Partial<NodesOptions>
    links?: Partial<LinksOptions>
    labels?: Partial<LabelsOptions>
    glow?: Partial<GlowOptions> | false
  }
  stage?: Partial<StageOptions>
  interaction?: InteractionConfig
  motion?: Partial<MotionConfig>
  theme?: ThemeName | Theme
  /**
   * Return false to dim a node. Dimmed nodes stay in place - the layout is not
   * recomputed - so filtering never rearranges the tree under the reader.
   */
  filter?: (node: TreeNode) => boolean
}

export interface BinaryTreeApi {
  /** Fly a node to the centre. Accepts a node or an id. */
  gotoNode(target: TreeNode | string, options?: Partial<FlightOptions>): Promise<void>
  /** Fly the root back to the centre. */
  gotoHome(options?: Partial<FlightOptions>): Promise<void>
  /** Select (and by default focus) a node. Pass null to clear. */
  select(target: TreeNode | string | null, focus?: boolean): Promise<void>
  /** Node currently nearest the centre. */
  centerNode(): TreeNode
  selectedNode(): TreeNode | null
  node(id: string): TreeNode | undefined
  nodes(): readonly TreeNode[]
  root(): TreeNode
  find(predicate: (node: TreeNode) => boolean): TreeNode | undefined
  search(query: string, limit?: number): TreeNode[]
  /** Re-run the dim filter. Call after your predicate's inputs change. */
  refilter(filter?: (node: TreeNode) => boolean): void
  relayout(options?: Partial<LayoutOptions>): void
  setTheme(theme: ThemeName | Theme): void
  /** Force one frame. Rendering is otherwise on demand. */
  render(): void
  resize(): void
  /** Replay the growth animation from the root. */
  regrow(seconds?: number): void
  /** Camera closeness, 0 far out and 1 pressed against the centre. */
  zoom(): number
  destroy(): void
}

const DEFAULT_THEME: ThemeName = 'dark'

export class BinaryTree {
  readonly element: HTMLDivElement
  readonly initPromise: Promise<void>
  readonly api: BinaryTreeApi

  private readonly config: TreeConfig
  private theme: Theme
  private themeName: string = DEFAULT_THEME

  private stage!: Stage
  private nodesLayer!: NodesLayer
  private linksLayer!: LinksLayer
  private labelsLayer!: LabelsLayer
  private glowLayer: GlowLayer | null = null
  private navigator!: Navigator
  private controls!: Controls
  private resizeObserver?: ResizeObserver

  private tree: Tree | null = null
  private selected: TreeNode | null = null
  private hovered: TreeNode | null = null
  private center: TreeNode | null = null

  private motion!: MotionConfig
  private dirty = true
  private frame = 0
  private destroyed = false
  /** Monotonic seconds since the first frame; drives every ambient effect. */
  private clock = 0
  private lastFrame = 0
  private growthStart = Number.NaN
  private reveal = Number.POSITIVE_INFINITY

  constructor(component: ComponentConfig, config: TreeConfig) {
    this.config = config
    this.theme =
      typeof config.theme === 'string'
        ? (themes[config.theme] ?? themes[DEFAULT_THEME])
        : (config.theme ?? themes[DEFAULT_THEME])
    if (typeof config.theme === 'string') this.themeName = config.theme

    this.element = document.createElement('div')
    this.element.className = `bt-root${component.classes ? ` ${component.classes}` : ''}`
    if (component.id) this.element.id = component.id
    this.element.dataset.theme = this.themeName
    this.element.dataset.cursor = 'grab'
    this.element.setAttribute('role', 'application')
    this.element.setAttribute('aria-label', 'Hyperbolic tree browser')
    component.parent.appendChild(this.element)

    this.api = this.buildApi()
    this.initPromise = this.init()
  }

  // -- lifecycle ------------------------------------------------------------

  private async init(): Promise<void> {
    const datum: TreeDatum = await this.config.dataloader()
    if (this.destroyed) return

    this.tree = hierarchy(datum)
    coneLayout(this.tree, this.config.layout)

    const reduced =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
    this.motion = { ...defaultMotionConfig, ...this.config.motion }
    if (reduced) {
      this.motion.ambient = false
      this.motion.growth = 0
    }

    this.stage = new Stage(this.element, this.theme, this.config.stage)
    this.nodesLayer = new NodesLayer(this.tree.nodes, this.theme, this.config.geometry?.nodes)
    this.linksLayer = new LinksLayer(this.tree, this.theme, this.config.geometry?.links)
    this.labelsLayer = new LabelsLayer(this.element, this.config.geometry?.labels)
    if (this.config.geometry?.glow !== false) {
      this.glowLayer = new GlowLayer(this.tree.nodes, this.config.geometry?.glow ?? {})
    }

    this.stage.world.add(this.linksLayer.lines)
    if (this.glowLayer) this.stage.world.add(this.glowLayer.mesh)
    this.stage.world.add(this.nodesLayer.mesh)
    this.stage.world.add(this.nodesLayer.selectionHalo)
    this.stage.world.add(this.nodesLayer.hoverHalo)

    this.labelsLayer.setActivateHandler((node) => this.handleSelect(node))
    if (this.motion.growth > 0) this.reveal = 0

    this.navigator = new Navigator(this.tree, {
      duration: 620,
      easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      ...this.config.interaction?.flight,
    })

    this.controls = new Controls(
      this.element,
      this.stage,
      {
        pick: (ndc) => this.nodesLayer.pick(ndc, this.stage.camera),
        onHover: (node) => this.setHovered(node),
        onSelect: (node) => this.handleSelect(node),
        onDragStart: () => this.navigator.snapshot(),
        onDrag: (from, to) => {
          this.navigator.cancel()
          this.navigator.applyMove(from, to)
          this.dirty = true
        },
        onDragEnd: () => {
          this.dirty = true
        },
        onKey: (command) => void this.handleKey(command),
        requestRender: () => {
          this.dirty = true
        },
      },
      { ...defaultControlsOptions, ...(this.config.interaction?.controls ?? {}) },
    )

    this.refilter(this.config.filter)
    this.observeSize()
    this.loop()

    this.config.interaction?.onInit?.(this)
  }

  private observeSize(): void {
    const apply = () => {
      const rect = this.element.getBoundingClientRect()
      this.stage.resize(rect.width, rect.height)
      this.dirty = true
    }
    apply()
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(apply)
      this.resizeObserver.observe(this.element)
    } else {
      globalThis.addEventListener?.('resize', apply)
    }
  }

  private loop = (): void => {
    if (this.destroyed) return
    this.frame = requestAnimationFrame(this.loop)

    const now = performance.now()
    if (this.lastFrame === 0) this.lastFrame = now
    // Clamp the step: a backgrounded tab resumes with a huge gap, and letting
    // that through would teleport the flow and skip the whole growth animation.
    this.clock += Math.min(0.1, (now - this.lastFrame) / 1000)
    this.lastFrame = now

    const flying = this.navigator.tick(now)
    const growing = this.advanceGrowth(now)

    if (!flying && !growing && !this.dirty && !this.motion.ambient) return
    this.dirty = false
    this.draw()
  }

  /**
   * Move the growth front outward. Returns true while it is still travelling.
   *
   * Driven by the wall clock, not by `this.clock`. The accumulated clock is
   * deliberately clamped per frame so the link flow cannot teleport after a
   * stall, but growth is a one-shot intro: if the tab was hidden through it, the
   * right thing is to come back to a grown tree, not to a frozen half-grown one.
   */
  private advanceGrowth(now: number): boolean {
    if (this.reveal === Number.POSITIVE_INFINITY) return false
    const tree = this.tree
    if (!tree) return false

    if (Number.isNaN(this.growthStart)) this.growthStart = now
    const t = Math.min(1, (now - this.growthStart) / (this.motion.growth * 1000))
    // Ease out, so the trunk appears briskly and the outer levels settle.
    const eased = 1 - Math.pow(1 - t, 2.2)
    this.reveal = eased * (tree.maxDepth + 1.6)

    if (t >= 1) {
      this.reveal = Number.POSITIVE_INFINITY
      return false
    }
    return true
  }

  private draw(): void {
    if (!this.tree) return
    // One clock and one pulse shared by every layer, so the glow, the selection
    // ring and the link flow breathe together instead of drifting apart.
    const pulse = 0.5 + 0.5 * Math.sin(this.clock * Math.PI * 2 * this.motion.pulseRate)
    const quaternion = this.stage.camera.quaternion

    this.nodesLayer.update(this.theme, quaternion, pulse, this.reveal)
    this.glowLayer?.update(this.theme, this.nodesLayer.radii, quaternion, pulse)
    this.linksLayer.update(this.theme, this.clock, this.reveal)
    this.labelsLayer.update(this.tree.nodes, this.stage, this.nodesLayer.radii)
    this.stage.starfield?.update(this.clock)
    this.stage.render()
    this.updateCenterNode()
  }

  // -- state ----------------------------------------------------------------

  private setHovered(node: TreeNode | null): void {
    if (this.hovered === node) return
    if (this.hovered) this.hovered.state.hovered = false
    this.hovered = node
    if (node) node.state.hovered = true
    this.dirty = true
    this.config.interaction?.onNodeHover?.(node, this)
  }

  private setSelected(node: TreeNode | null): void {
    if (!this.tree) return
    if (this.selected === node) return

    for (const n of this.tree.nodes) {
      n.state.selected = false
      n.state.onPath = false
    }
    this.selected = node
    if (node) {
      node.state.selected = true
      for (const n of pathToRoot(node)) n.state.onPath = true
    }
    this.dirty = true
    this.config.interaction?.onSelectionChange?.(node, this)
  }

  private handleSelect(node: TreeNode | null): void {
    if (!node) {
      this.setSelected(null)
      return
    }
    this.setSelected(node)
    this.config.interaction?.onNodeClick?.(node, this)
    if (this.config.interaction?.focusOnClick !== false) void this.navigator.flyToNode(node)
  }

  private async handleKey(command: KeyCommand): Promise<void> {
    if (!this.tree) return
    const current = this.selected ?? this.center ?? this.tree.root

    const siblings = current.parent?.children ?? [current]
    const at = siblings.indexOf(current)

    let next: TreeNode | null = current
    switch (command) {
      case 'parent':
        next = current.parent ?? current
        break
      case 'child':
        next = current.children[0] ?? current
        break
      case 'prev':
        next = siblings[(at - 1 + siblings.length) % siblings.length] ?? current
        break
      case 'next':
        next = siblings[(at + 1) % siblings.length] ?? current
        break
      case 'home':
        next = this.tree.root
        break
      case 'focus':
        next = current
        break
      case 'clear':
        this.setSelected(null)
        await this.navigator.flyHome()
        return
    }

    this.setSelected(next)
    if (next) {
      this.config.interaction?.onNodeClick?.(next, this)
      await this.navigator.flyToNode(next)
    }
  }

  private updateCenterNode(): void {
    if (!this.tree) return
    let best = this.tree.root
    let bestDistance = Number.POSITIVE_INFINITY
    for (const node of this.tree.nodes) {
      const d = lengthSq(node.view)
      if (d < bestDistance) {
        bestDistance = d
        best = node
      }
    }
    if (best !== this.center) {
      this.center = best
      this.config.interaction?.onCenterNodeChange?.(best, this)
    }
  }

  private refilter(filter?: (node: TreeNode) => boolean): void {
    if (!this.tree) return
    if (!filter) {
      for (const node of this.tree.nodes) node.state.dimmed = false
    } else {
      for (const node of this.tree.nodes) node.state.dimmed = !filter(node)
    }
    this.dirty = true
  }

  private resolve(target: TreeNode | string): TreeNode | undefined {
    if (typeof target !== 'string') return target
    return this.tree?.byId.get(target)
  }

  // -- public api -----------------------------------------------------------

  private buildApi(): BinaryTreeApi {
    const ready = () => this.initPromise

    return {
      gotoNode: async (target, options) => {
        await ready()
        const node = this.resolve(target)
        if (node) await this.navigator.flyToNode(node, options)
      },
      gotoHome: async (options) => {
        await ready()
        await this.navigator.flyHome(options)
      },
      select: async (target, focus = true) => {
        await ready()
        const node = target === null ? null : (this.resolve(target) ?? null)
        this.setSelected(node)
        if (node && focus) await this.navigator.flyToNode(node)
      },
      centerNode: () => this.center ?? this.mustTree().root,
      selectedNode: () => this.selected,
      node: (id) => this.tree?.byId.get(id),
      nodes: () => this.tree?.nodes ?? [],
      root: () => this.mustTree().root,
      find: (predicate) => this.tree?.nodes.find(predicate),
      search: (query, limit = 12) => this.searchNodes(query, limit),
      refilter: (filter) => this.refilter(filter ?? this.config.filter),
      relayout: (options) => {
        const tree = this.mustTree()
        coneLayout(tree, { ...this.config.layout, ...options })
        this.dirty = true
      },
      setTheme: (theme) => {
        this.theme = typeof theme === 'string' ? (themes[theme] ?? this.theme) : theme
        this.themeName = typeof theme === 'string' ? theme : 'custom'
        this.element.dataset.theme = this.themeName
        this.stage?.applyTheme(this.theme)
        this.nodesLayer?.setTheme(this.theme)
        this.linksLayer?.setTheme(this.theme)
        this.dirty = true
      },
      render: () => {
        this.dirty = true
      },
      resize: () => {
        const rect = this.element.getBoundingClientRect()
        this.stage?.resize(rect.width, rect.height)
        this.dirty = true
      },
      regrow: (seconds) => {
        if (!this.tree) return
        if (seconds !== undefined) this.motion.growth = seconds
        if (this.motion.growth <= 0) return
        this.reveal = 0
        this.growthStart = Number.NaN
        this.dirty = true
      },
      zoom: () => this.stage?.zoom ?? 0,
      destroy: () => this.destroy(),
    }
  }

  /**
   * Diacritic and case insensitive prefix-weighted search over node names.
   * Turkish folding is explicit because `toLowerCase` maps I to i, not to the
   * dotless i, and readers type either.
   */
  private searchNodes(query: string, limit: number): TreeNode[] {
    const tree = this.tree
    if (!tree) return []
    const needle = fold(query)
    if (!needle) return []

    const scored: { node: TreeNode; score: number }[] = []
    for (const node of tree.nodes) {
      const name = fold(node.data.name)
      const at = name.indexOf(needle)
      if (at < 0) {
        const summary = node.data.summary ? fold(node.data.summary) : ''
        if (summary.includes(needle)) scored.push({ node, score: 400 + node.depth })
        continue
      }
      scored.push({ node, score: at * 4 + node.depth + name.length * 0.05 })
    }

    scored.sort((a, b) => a.score - b.score)
    return scored.slice(0, limit).map((s) => s.node)
  }

  private mustTree(): Tree {
    if (!this.tree) throw new Error('the-binary-tree: not initialised yet, await initPromise first')
    return this.tree
  }

  destroy(): void {
    if (this.destroyed) return
    this.destroyed = true
    cancelAnimationFrame(this.frame)
    this.resizeObserver?.disconnect()
    this.controls?.dispose()
    this.labelsLayer?.dispose()
    this.glowLayer?.dispose()
    this.nodesLayer?.dispose()
    this.linksLayer?.dispose()
    this.stage?.dispose()
    this.element.remove()
    this.tree = null
  }
}

/** Case and diacritic folding, Turkish aware. */
export function fold(input: string): string {
  return input
    .replace(/[İIı]/g, 'i')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c')
    .toLowerCase()
    .trim()
}
