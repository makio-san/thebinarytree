/**
 * The agents that look after the tree, for the Agents view.
 *
 * Kept in step with `.claude/agents/` and `agents/README.md`. The numbers beside
 * them come from `agents-status.json`, which is built from the reports the
 * agents leave in the repository.
 */

import live from '../agents/live.json'

export interface AgentInfo {
  id: string
  name: string
  job: string
  schedule: string
  /** When the scheduled task fires, as a 5 field cron in local time. */
  cron: string
  leaves: string
}

export const AGENTS: readonly AgentInfo[] = [
  {
    id: 'tech-scout',
    name: 'Tech scout',
    job: 'Searches for new technologies, releases and standards worth a place in the tree, and queues them with sources.',
    schedule: 'Twice a day, morning and afternoon',
    cron: '5 7,15 * * *',
    leaves: 'A sourced candidate list',
  },
  {
    id: 'lineage-curator',
    name: 'Lineage curator',
    job: 'Turns confirmed candidates into nodes and branches, with creators and Wikipedia links.',
    schedule: 'Twice a day, after each scout',
    cron: '12 9,17 * * *',
    leaves: 'New nodes on a branch',
  },
  {
    id: 'lineage-architect',
    name: 'Lineage architect',
    job: 'Looks at the shape of the whole tree and plans the lineages it lacks, with a root and a first set of sourced nodes.',
    schedule: 'Saturdays, before the curator',
    cron: '20 8 * * 6',
    leaves: 'A planned new lineage',
  },
  {
    id: 'fact-checker',
    name: 'Fact checker',
    job: 'Audits existing nodes against independent sources: years, creators, parents and summaries.',
    schedule: 'Tuesdays and Fridays',
    cron: '0 11 * * 2,5',
    leaves: 'Fixes and a list of doubts',
  },
  {
    id: 'portrait-finder',
    name: 'Portrait finder',
    job: 'Finds freely licensed portraits for creators who have none, checking each by eye.',
    schedule: 'Wednesdays',
    cron: '13 13 * * 3',
    leaves: 'Verified portraits',
  },
  {
    id: 'ui-qa',
    name: 'Interface QA',
    job: 'Runs the app at desktop and phone sizes and checks scrolling, zoom, themes and console errors.',
    schedule: 'Mondays',
    cron: '12 10 * * 1',
    leaves: 'Bug fixes and a bug list',
  },
  {
    id: 'code-health',
    name: 'Code health',
    job: 'Type check, tests, build and safe dependency updates.',
    schedule: 'Sundays',
    cron: '7 15 * * 0',
    leaves: 'Maintenance commits',
  },
  {
    id: 'blog-writer',
    name: 'Blog writer',
    job: 'Writes a short post on what reached the tree since the last one, as soon as enough has changed, linking every node it names.',
    schedule: 'Every evening',
    cron: '30 18 * * *',
    leaves: 'A blog post',
  },
  {
    id: 'web-reader',
    name: 'Web reader',
    job: 'Reads Medium, tech magazines and openly licensed sites like Wikipedia, NASA and The Conversation. Once four new pieces are worth reading it posts them as short notes with a link and a free photo, and it queues the technologies they mention that the tree lacks.',
    schedule: 'Every morning',
    cron: '30 9 * * *',
    leaves: 'A reading list and candidates',
  },
  {
    id: 'preview-refresher',
    name: 'Preview refresher',
    job: 'Redraws the picture shown when the site is shared, whenever the node, lineage or agent count changes.',
    schedule: 'Every night, after the merger',
    cron: '0 23 * * *',
    leaves: 'A fresh link preview',
  },
  {
    id: 'branch-fixer',
    name: 'Branch fixer',
    job: 'Takes branches the reviewer rejected, fixes what the review found with sources, and sends them back for review.',
    schedule: 'Twice a day, between reviews',
    cron: '40 11,19 * * *',
    leaves: 'Fixed branches',
  },
  {
    id: 'release-reviewer',
    name: 'Release reviewer',
    job: 'Reviews every agent branch, spot checks facts, and approves or rejects the exact commit.',
    schedule: 'Twice a day, afternoon and evening',
    cron: '4 13,21 * * *',
    leaves: 'A verdict per branch',
  },
  {
    id: 'release-merger',
    name: 'Release merger',
    job: 'Merges only approved, unchanged branches that stay green, then publishes main.',
    schedule: 'Twice a day, after each review',
    cron: '12 14,22 * * *',
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

/**
 * The next time a cron of the simple shapes used above fires: fixed minute,
 * a list of hours, and either every day or a list of weekdays.
 */
export function nextRun(cron: string, from = new Date()): Date | null {
  const [minute, hours, dom, month, dow] = cron.split(' ')
  if (dom !== '*' || month !== '*') return null
  const mins = Number(minute)
  const hourList = hours.split(',').map(Number)
  const days = dow === '*' ? null : dow.split(',').map(Number)
  for (let offset = 0; offset < 8; offset++) {
    const day = new Date(from)
    day.setDate(from.getDate() + offset)
    if (days && !days.includes(day.getDay())) continue
    for (const hour of hourList) {
      const at = new Date(day)
      at.setHours(hour, mins, 0, 0)
      if (at > from) return at
    }
  }
  return null
}


export type LiveState = 'running' | 'done' | 'failed' | 'stale'

export interface LiveRun {
  startedAt: string
  finishedAt: string | null
  state: 'running' | 'done' | 'failed'
  summary: string
  branch: string | null
}

export interface LiveAgent {
  id: string
  state: LiveState
  startedAt: string | null
  finishedAt: string | null
  summary: string
  branch: string | null
  runs: LiveRun[]
}

export interface LiveSnapshot {
  agents: Record<string, LiveAgent>
  fetchedAt: Date
}

/** A run that has said nothing for this long has almost certainly died. */
const STALE_MS = 3 * 60 * 60 * 1000
const POLL_MS = 45_000
const BACKOFF_MS = 10 * 60_000

const GIST: string = (live as { gist?: string }).gist ?? ''

type Listener = (snapshot: LiveSnapshot | null) => void
const listeners = new Set<Listener>()
let latest: LiveSnapshot | null = null
let etag = ''
let timer: ReturnType<typeof setTimeout> | undefined
let started = false

function parse(files: Record<string, { content?: string }>): Record<string, LiveAgent> {
  const out: Record<string, LiveAgent> = {}
  for (const info of AGENTS) {
    const raw = files[`${info.id}.json`]?.content
    if (!raw) continue
    try {
      const agent = JSON.parse(raw) as LiveAgent
      if (
        agent.state === 'running' &&
        agent.startedAt &&
        Date.now() - new Date(agent.startedAt).getTime() > STALE_MS
      ) {
        agent.state = 'stale'
      }
      agent.runs = Array.isArray(agent.runs) ? agent.runs : []
      out[info.id] = agent
    } catch {
      // A half written file: skip it until the next poll.
    }
  }
  return out
}

async function poll(): Promise<void> {
  let wait = POLL_MS
  try {
    // An ETag answer of 304 does not count against GitHub's hourly limit for
    // anonymous callers, so polling this often costs almost nothing.
    const response = await fetch(`https://api.github.com/gists/${GIST}`, {
      cache: 'no-store',
      headers: etag ? { 'If-None-Match': etag, Accept: 'application/vnd.github+json' } : { Accept: 'application/vnd.github+json' },
    })
    if (response.status === 200) {
      etag = response.headers.get('ETag') ?? ''
      const body = (await response.json()) as { files: Record<string, { content?: string }> }
      latest = { agents: parse(body.files ?? {}), fetchedAt: new Date() }
    } else if (response.status === 304 && latest) {
      // Re-run the stale check: time passes even when the file does not change.
      for (const agent of Object.values(latest.agents)) {
        if (agent.state === 'running' && agent.startedAt && Date.now() - new Date(agent.startedAt).getTime() > STALE_MS) {
          agent.state = 'stale'
        }
      }
      latest = { ...latest, fetchedAt: new Date() }
    } else if (response.status === 403 || response.status === 429) {
      wait = BACKOFF_MS
    }
  } catch {
    wait = POLL_MS * 2
  }
  for (const listener of listeners) listener(latest)
  timer = setTimeout(() => void poll(), wait)
}

/** Whether this build knows where the live status is. */
export const liveEnabled = (): boolean => GIST.length > 0

/** Calls back with every new snapshot, and once right away if one is in hand. */
export function subscribeLive(listener: Listener): () => void {
  listeners.add(listener)
  if (latest) listener(latest)
  if (!started && liveEnabled()) {
    started = true
    void poll()
    // A tab in the background does not need to poll; catch up on return.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearTimeout(timer)
        timer = undefined
      } else if (timer === undefined) {
        void poll()
      }
    })
  }
  return () => listeners.delete(listener)
}

/** Short relative time: "just now", "12 min ago", "in 3 h". */
export function ago(iso: string | Date, now = new Date()): string {
  const t = typeof iso === 'string' ? new Date(iso) : iso
  const diff = now.getTime() - t.getTime()
  const future = diff < 0
  const s = Math.abs(diff) / 1000
  let text: string
  if (s < 60) return future ? 'in under a minute' : 'just now'
  else if (s < 3600) text = `${Math.round(s / 60)} min`
  else if (s < 86_400) text = `${Math.round(s / 3600)} h`
  else text = `${Math.round(s / 86_400)} d`
  return future ? `in ${text}` : `${text} ago`
}
