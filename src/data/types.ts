import type { TreeDatum } from '../model/types'

export type ComputerKind =
  | 'concept'
  | 'machine'
  | 'processor'
  | 'os'
  | 'language'
  | 'network'
  | 'device'
  | 'component'
  | 'group'

/** A node of the bundled history dataset. */
export interface ComputerDatum extends TreeDatum {
  id: string
  name: string
  /** Negative values mean BCE. */
  year?: number
  era?: string
  kind?: ComputerKind
  origin?: string
  summary?: string
  facts?: string[]
  children?: ComputerDatum[]
}
