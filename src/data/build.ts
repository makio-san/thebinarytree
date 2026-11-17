import type { ComputerDatum, ComputerKind } from './types'

interface Extra {
  origin?: string
  facts?: string[]
  children?: ComputerDatum[]
}

/**
 * One dated thing in the tree.
 *
 * The older branch files spell every node out as an object literal, which reads
 * well at fifty nodes and badly at five hundred. These two helpers keep a branch
 * file about the history rather than about the syntax, and they are what new
 * branches are written with. The result is the same plain `ComputerDatum`, so
 * nothing downstream knows or cares which style a branch used.
 */
export function item(
  id: string,
  name: string,
  year: number,
  era: string,
  kind: ComputerKind,
  summary: string,
  extra: Extra = {},
): ComputerDatum {
  return { id, name, year, era, kind, ...extra, summary }
}

/** A heading that names a shelf or a lineage rather than a dated thing. */
export function group(
  id: string,
  name: string,
  era: string,
  summary: string,
  children: ComputerDatum[],
): ComputerDatum {
  return { id, name, era, kind: 'group', summary, children }
}
