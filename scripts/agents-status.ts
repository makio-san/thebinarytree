/**
 * Writes `public/agents-status.json`, the numbers behind the Agents view.
 *
 * Read from the reports the agents leave in `agents/reports/`, so it only ever
 * says what the repository can show: a report dated on a given day is a run that
 * happened. Run before every build, which means the page is current as of the
 * last deploy, not live.
 */

import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const reports = join(root, 'agents', 'reports')

const IDS = [
  'tech-scout',
  'lineage-curator',
  'fact-checker',
  'portrait-finder',
  'ui-qa',
  'code-health',
  'lineage-architect',
  'blog-writer',
  'web-reader',
  'preview-refresher',
  'branch-fixer',
  'release-reviewer',
  'release-merger',
] as const

interface Status {
  runs: number
  last: string | null
}

const files = existsSync(reports) ? readdirSync(reports) : []
const agents: Record<string, Status> = {}

for (const id of IDS) {
  // `<date>-<agent>.md` for the working agents, `review-<branch>.md` for the
  // reviewer, whose files carry the date inside.
  const own = files.filter((f) => f.endsWith(`-${id}.md`) && /^\d{4}-\d{2}-\d{2}-/.test(f))
  const dates = own.map((f) => f.slice(0, 10))

  if (id === 'release-reviewer') {
    for (const f of files.filter((name) => name.startsWith('review-'))) {
      const text = readFileSync(join(reports, f), 'utf8')
      const found = /\b(\d{4}-\d{2}-\d{2})\b/.exec(text)
      if (found) dates.push(found[1])
    }
  }

  if (id === 'release-merger' && existsSync(join(reports, 'merge-log.md'))) {
    const text = readFileSync(join(reports, 'merge-log.md'), 'utf8')
    for (const found of text.matchAll(/\b(\d{4}-\d{2}-\d{2})\b/g)) dates.push(found[1])
  }

  dates.sort()
  agents[id] = { runs: new Set(dates).size, last: dates.at(-1) ?? null }
}

let merged = 0
const log = join(reports, 'merge-log.md')
if (existsSync(log)) {
  merged = (readFileSync(log, 'utf8').match(/\bmerged\b/gi) ?? []).length
}

mkdirSync(join(root, 'public'), { recursive: true })
writeFileSync(
  join(root, 'public', 'agents-status.json'),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), merged, agents }, null, 2)}\n`,
)
