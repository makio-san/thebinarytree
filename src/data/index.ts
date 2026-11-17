/**
 * The bundled dataset: the history of computing as one tree.
 *
 * Twenty top level branches, chosen so that each one is a real lineage rather
 * than a bucket. Where something genuinely descends from something else it is
 * nested under it, even when that crosses branch boundaries in spirit: MINIX
 * sits under Unix and Linux sits under MINIX, because that is what happened.
 *
 * Dates are the year a thing first worked or first shipped, whichever the
 * sources agree on more clearly. Where the two differ the summary says so.
 */

import { blockchain } from './branches/blockchain'
import { dataStores } from './branches/data-stores'
import { foundations } from './branches/foundations'
import { frontier } from './branches/frontier'
import { games } from './branches/games'
import { languages } from './branches/languages'
import { machines } from './branches/machines'
import { media } from './branches/media'
import { mobile } from './branches/mobile'
import { networks } from './branches/networks'
import { openSource } from './branches/open-source'
import { operatingSystems } from './branches/operating-systems'
import { peripherals } from './branches/peripherals'
import { personal } from './branches/personal'
import { processors } from './branches/processors'
import { robotics } from './branches/robotics'
import { security } from './branches/security'
import { telecom } from './branches/telecom'
import { tools } from './branches/tools'
import { webPlatform } from './branches/web-platform'
import type { ComputerDatum } from './types'

export type { ComputerDatum, ComputerKind } from './types'

export const computerHistory: ComputerDatum = {
  id: 'root',
  name: 'The Binary Tree',
  era: 'theory',
  kind: 'group',
  summary:
    'The family tree of computing, from the abacus to the quantum processor. Click a branch to bring it to the centre.',
  facts: ['Twenty main lineages', 'Around 5000 years'],
  children: [
    foundations,
    machines,
    processors,
    peripherals,
    personal,
    operatingSystems,
    languages,
    tools,
    openSource,
    dataStores,
    networks,
    telecom,
    webPlatform,
    security,
    blockchain,
    games,
    media,
    mobile,
    robotics,
    frontier,
  ],
}

/** Every node of the dataset, depth first. */
export function flatten(datum: ComputerDatum = computerHistory): ComputerDatum[] {
  const out: ComputerDatum[] = []
  const stack: ComputerDatum[] = [datum]
  while (stack.length) {
    const node = stack.pop()!
    out.push(node)
    const children = node.children
    if (children) for (let i = children.length - 1; i >= 0; i--) stack.push(children[i])
  }
  return out
}

/** Smallest and largest year present in the dataset. */
export function yearRange(datum: ComputerDatum = computerHistory): [number, number] {
  let min = Number.POSITIVE_INFINITY
  let max = Number.NEGATIVE_INFINITY
  for (const node of flatten(datum)) {
    if (typeof node.year !== 'number') continue
    if (node.year < min) min = node.year
    if (node.year > max) max = node.year
  }
  return [min, max]
}

const ERA_BOUNDS: { era: string; until: number }[] = [
  { era: 'mechanical', until: 1936 },
  { era: 'tube', until: 1954 },
  { era: 'transistor', until: 1963 },
  { era: 'integrated', until: 1970 },
  { era: 'micro', until: 1989 },
  { era: 'modern', until: Number.POSITIVE_INFINITY },
]

/**
 * Rough era for a year, for data that does not carry one.
 * The dataset sets `era` explicitly almost everywhere, because a thing's era is
 * about what it was made of, not only when it appeared.
 */
export function eraOf(year: number | undefined): string {
  if (typeof year !== 'number') return 'theory'
  for (const bound of ERA_BOUNDS) if (year <= bound.until) return bound.era
  return 'modern'
}

/** Year label. Negative years are BCE. */
export function formatYear(year: number | undefined): string {
  if (typeof year !== 'number') return ''
  return year < 0 ? `${Math.abs(year)} BC` : String(year)
}
