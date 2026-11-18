/**
 * The agents that look after the tree, for the Agents view.
 *
 * Kept in step with `.claude/agents/` and `agents/README.md`. The numbers beside
 * them come from `agents-status.json`, which is built from the reports the
 * agents leave in the repository.
 */

export interface AgentInfo {
  id: string
  name: string
  job: string
  schedule: string
  leaves: string
}

export const AGENTS: readonly AgentInfo[] = [
  {
    id: 'tech-scout',
    name: 'Tech scout',
    job: 'Searches for new technologies, releases and standards worth a place in the tree, and queues them with sources.',
    schedule: 'Every day, morning',
    leaves: 'A sourced candidate list',
  },
  {
    id: 'lineage-curator',
    name: 'Lineage curator',
    job: 'Turns confirmed candidates into nodes and branches, with creators and Wikipedia links.',
    schedule: 'Every day, morning',
    leaves: 'New nodes on a branch',
  },
  {
    id: 'fact-checker',
    name: 'Fact checker',
    job: 'Audits existing nodes against independent sources: years, creators, parents and summaries.',
    schedule: 'Tuesdays and Fridays',
    leaves: 'Fixes and a list of doubts',
  },
  {
    id: 'portrait-finder',
    name: 'Portrait finder',
    job: 'Finds freely licensed portraits for creators who have none, checking each by eye.',
    schedule: 'Wednesdays',
    leaves: 'Verified portraits',
  },
  {
    id: 'ui-qa',
    name: 'Interface QA',
    job: 'Runs the app at desktop and phone sizes and checks scrolling, zoom, themes and console errors.',
    schedule: 'Mondays',
    leaves: 'Bug fixes and a bug list',
  },
  {
    id: 'code-health',
    name: 'Code health',
    job: 'Type check, tests, build and safe dependency updates.',
    schedule: 'Sundays',
    leaves: 'Maintenance commits',
  },
  {
    id: 'release-reviewer',
    name: 'Release reviewer',
    job: 'Reviews every agent branch, spot checks facts, and approves or rejects the exact commit.',
    schedule: 'Every day, evening',
    leaves: 'A verdict per branch',
  },
  {
    id: 'release-merger',
    name: 'Release merger',
    job: 'Merges only approved, unchanged branches that stay green, then publishes main.',
    schedule: 'Every day, night',
    leaves: 'Merges and a merge log',
  },
]

export interface AgentStatus {
  runs: number
  last: string | null
}

export interface StatusFile {
  generatedAt: string
  merged: number
  agents: Record<string, AgentStatus>
}

/** Null when the file is missing, which is normal on a fresh clone. */
export async function loadStatus(): Promise<StatusFile | null> {
  try {
    const response = await fetch('/agents-status.json', { cache: 'no-cache' })
    if (!response.ok) return null
    return (await response.json()) as StatusFile
  } catch {
    return null
  }
}
