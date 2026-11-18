# Agents for The Binary Tree

Eight agents keep the tree growing, correct and deployed. Their definitions are in `.claude/agents/`. Seven of them work on branches named `agents/<agent>-<date>` and never touch `main`. One, the `release-merger`, merges only reviewed branches and is the only agent that pushes `main`, which deploys.

| Agent | Job | Output |
| --- | --- | --- |
| `tech-scout` | Finds new technologies, releases and standards worth adding | `agents/inbox/<date>.md` |
| `lineage-curator` | Writes the queued candidates into the dataset | nodes, titles, creators |
| `fact-checker` | Audits existing nodes against sources | fixes and a doubt list |
| `portrait-finder` | Adds verified free portraits for creators | `portraits.ts` entries |
| `ui-qa` | Runs desktop and phone checks | fixes and a bug list |
| `code-health` | Type check, tests, build, dependency updates | `chore` and `test` commits |
| `release-reviewer` | Reviews every agent branch and approves or rejects the exact tip | `agents/reports/review-*.md` |
| `release-merger` | Merges approved branches, re-verifies, pushes `main` | `main`, `agents/reports/merge-log.md` |

## Flow

1. `tech-scout` writes the inbox.
2. `lineage-curator` turns confirmed entries into nodes.
3. `fact-checker`, `portrait-finder`, `ui-qa` and `code-health` improve what is already there.
4. `release-reviewer` reviews each branch and records `verdict: approve` or `reject` for its exact commit.
5. `release-merger` merges only approved, unchanged branches that stay green on the merged result, then pushes `main`.

## Gates before anything reaches `main`

Approved for the exact tip, makio-san authorship, Conventional Commit messages, no Claude trailers, allowed paths only, clean merge, then type check, tests and the demo build on the merged result. Any failure means nothing is pushed. At most three merges per run, one at a time. No force pushes, no rewrites. A broken push is reverted by the merger itself and logged.

## Rules shared by all

Common rules (commit format, sources for every fact, Wikimedia rate limits, reports) are repeated at the end of each agent file so each one is self contained. Reports go in `agents/reports/`.

## Running them

Scheduled runs are set up in the Claude desktop app (Scheduled tasks). A run happens while the app is open, or on next launch. To stop everything reaching production, disable the `binary-tree-release-merger` task: the other agents then only fill branches. You can also start any agent by hand in a session.
