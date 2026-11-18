#!/usr/bin/env node
/**
 * Tells the live site what an agent is doing right now.
 *
 *   node scripts/agent-live.mjs <agent> start
 *   node scripts/agent-live.mjs <agent> done "<one line summary>" [--branch <name>]
 *   node scripts/agent-live.mjs <agent> failed "<what went wrong>"
 *
 * The site is static and the repository is private, so the status lives in a
 * secret GitHub gist (its id is in `agents/live.json`) that the Agents view
 * reads from the browser. Each agent owns one file in the gist, so two agents
 * running at once never overwrite each other.
 *
 * This must never break an agent's run: any failure is printed and the script
 * still exits 0.
 */

import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const AGENTS = [
  'tech-scout',
  'lineage-curator',
  'fact-checker',
  'portrait-finder',
  'ui-qa',
  'code-health',
  'release-reviewer',
  'release-merger',
]
const STATES = ['start', 'done', 'failed']
const KEEP = 12
const ACCOUNT = 'makio-san'

const root = join(import.meta.dirname, '..')

function fail(message) {
  console.warn(`agent-live: ${message}`)
  process.exit(0)
}

const args = process.argv.slice(2)
const branchAt = args.indexOf('--branch')
const branch = branchAt >= 0 ? args.splice(branchAt, 2)[1] : null
const [agent, action, ...rest] = args
const summary = rest.join(' ').replace(/\s+/g, ' ').trim().slice(0, 240)

if (!AGENTS.includes(agent)) fail(`unknown agent "${agent}", expected one of ${AGENTS.join(', ')}`)
if (!STATES.includes(action)) fail(`unknown action "${action}", expected start, done or failed`)

let gist
try {
  gist = JSON.parse(readFileSync(join(root, 'agents', 'live.json'), 'utf8')).gist
} catch {
  fail('agents/live.json is missing')
}
if (!gist) fail('no gist id in agents/live.json')

// Always as makio-san, whichever gh account happens to be active.
let token = ''
try {
  token = execFileSync('gh', ['auth', 'token', '--user', ACCOUNT], { encoding: 'utf8' }).trim()
} catch {
  // Fall back to the active account.
}
const env = token ? { ...process.env, GH_TOKEN: token } : process.env

function gh(args, input) {
  return execFileSync('gh', args, { encoding: 'utf8', env, input, timeout: 30_000 })
}

const file = `${agent}.json`
let previous = { id: agent, runs: [] }
try {
  const current = JSON.parse(gh(['api', `gists/${gist}`]))
  const content = current.files?.[file]?.content
  if (content) previous = JSON.parse(content)
} catch (error) {
  fail(`could not read the gist: ${error.message.split('\n')[0]}`)
}

const now = new Date().toISOString()
const runs = Array.isArray(previous.runs) ? previous.runs : []
let next

if (action === 'start') {
  runs.unshift({ startedAt: now, finishedAt: null, state: 'running', summary: '', branch: null })
  next = { id: agent, state: 'running', startedAt: now, finishedAt: null, summary: '', branch: null }
} else {
  const state = action === 'done' ? 'done' : 'failed'
  const open = runs[0] && runs[0].state === 'running' ? runs[0] : null
  const run = open ?? { startedAt: previous.startedAt ?? now }
  Object.assign(run, { finishedAt: now, state, summary, branch })
  if (!open) runs.unshift(run)
  next = { id: agent, state, startedAt: run.startedAt, finishedAt: now, summary, branch }
}
next.runs = runs.slice(0, KEEP)
next.updatedAt = now

try {
  gh(['api', '-X', 'PATCH', `gists/${gist}`, '--input', '-'], JSON.stringify({
    files: { [file]: { content: `${JSON.stringify(next, null, 2)}\n` } },
  }))
  console.log(`agent-live: ${agent} ${next.state}`)
} catch (error) {
  fail(`could not update the gist: ${error.message.split('\n')[0]}`)
}
