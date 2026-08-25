/**
 * the-binary-tree
 *
 * A 3D hyperbolic tree browser, and a dataset of the history of computing to
 * put in it. Inspired by d3-hypertree, moved from the Poincare disc to the
 * Poincare ball and from SVG to three.js.
 *
 *   import { BinaryTree, loaders, computerHistory } from 'the-binary-tree'
 *
 *   const tree = new BinaryTree(
 *     { parent: document.body },
 *     { dataloader: loaders.fromObject(computerHistory) },
 *   )
 */

export { BinaryTree, fold, defaultMotionConfig } from './the-binary-tree'
export type {
  ComponentConfig,
  BinaryTreeApi,
  InteractionConfig,
  MotionConfig,
  TreeConfig,
} from './the-binary-tree'

// Data model
export { hierarchy, pathToRoot, walk, descendants } from './model/hierarchy'
export { loaders, fromObject, fromUrl, fromFlat, nTree } from './model/loaders'
export type { DataLoader } from './model/loaders'
export type { NodeState, Tree, TreeDatum, TreeNode } from './model/types'

// Layout
export { coneLayout, defaultLayoutOptions } from './layout/cone-layout'
export type { LayoutOptions, LinkLengthFn, WeightFn, WeightMode } from './layout/cone-layout'

// Rendering
export { ERAS, ERA_BY_ID, darkTheme, lightTheme, themes } from './render/theme'
export type { EraStyle, GlowMode, Theme, ThemeName } from './render/theme'
export { Stage, defaultStageOptions } from './render/stage'
export type { StageOptions } from './render/stage'
export { NodesLayer, defaultNodesOptions } from './render/nodes-layer'
export type { NodeColorFn, NodeRadiusFn, NodesOptions } from './render/nodes-layer'
export { NeuritesLayer, defaultNeuritesOptions } from './render/neurites-layer'
export type { NeuritesOptions } from './render/neurites-layer'
export { LabelsLayer, defaultLabelsOptions } from './render/labels-layer'
export type { LabelsOptions, LabelTier } from './render/labels-layer'
export { GlowLayer, defaultGlowOptions } from './render/glow-layer'
export type { GlowOptions } from './render/glow-layer'
export { Starfield, defaultStarfieldOptions } from './render/starfield'
export type { StarfieldOptions } from './render/starfield'
export { SpikeField, defaultSpikeOptions, potential } from './render/spikes'
export type { SpikeOptions } from './render/spikes'

// Navigation
export { Navigator, defaultFlightOptions } from './interaction/navigator'
export type { FlightOptions } from './interaction/navigator'
export { Controls, defaultControlsOptions } from './interaction/controls'
export type { ControlsHandlers, ControlsOptions, KeyCommand } from './interaction/controls'

/** The geometry core, namespaced so it does not crowd the main surface. */
export * as hyperbolic from './math'
export type { Frame, Vec3 } from './math'

// The bundled dataset
export { computerHistory, eraOf, flatten, formatYear, yearRange } from './data'
export type { ComputerDatum, ComputerKind } from './data'
export { WIKI_TITLES, wikiTitle, wikiUrl } from './data/wiki'
