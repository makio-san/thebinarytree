/**
 * The numbers printed on the link preview image, and whether the image is
 * out of date.
 *
 *   tsx scripts/og-counts.ts          prints current and drawn counts, exits 0
 *   tsx scripts/og-counts.ts --json   prints only the current counts as JSON
 *
 * `public/og-image.json` records the counts the image was last drawn with.
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { computerHistory, flatten } from '../src/data'

const root = join(import.meta.dirname, '..')

export interface OgCounts {
  nodes: number
  lineages: number
  agents: number
}

export function currentCounts(): OgCounts {
  return {
    nodes: flatten(computerHistory).length,
    lineages: computerHistory.children?.length ?? 0,
    agents: readdirSync(join(root, '.claude', 'agents')).filter((f) => f.endsWith('.md')).length,
  }
}

const drawnFile = join(root, 'public', 'og-image.json')
const drawn: OgCounts | null = existsSync(drawnFile) ? JSON.parse(readFileSync(drawnFile, 'utf8')) : null
const now = currentCounts()

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(now))
} else {
  const same = drawn !== null && drawn.nodes === now.nodes && drawn.lineages === now.lineages && drawn.agents === now.agents
  console.log(`current: ${now.nodes} nodes, ${now.lineages} lineages, ${now.agents} agents`)
  console.log(drawn ? `drawn:   ${drawn.nodes} nodes, ${drawn.lineages} lineages, ${drawn.agents} agents` : 'drawn:   unknown')
  console.log(same ? 'up to date' : 'needs a redraw')
}
