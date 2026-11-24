# Agents for The Binary Tree

Thirteen agents keep the tree growing, correct, written about and deployed. Their definitions are in `.claude/agents/`. Twelve of them work on branches named `agents/<agent>-<date>` and never touch `main`. One, the `release-merger`, merges only reviewed branches and is the only agent that pushes `main`, which deploys.

| Agent | Job | Output |
| --- | --- | --- |
| `tech-scout` | Finds new technologies, releases and standards worth adding | `agents/inbox/<date>.md` |
| `lineage-curator` | Writes the queued candidates into the dataset | nodes, titles, creators |
| `fact-checker` | Audits existing nodes against sources | fixes and a doubt list |
| `portrait-finder` | Adds verified free portraits for creators | `portraits.ts` entries |
| `ui-qa` | Runs desktop and phone checks | fixes and a bug list |
| `code-health` | Type check, tests, build, dependency updates | `chore` and `test` commits |
| `lineage-architect` | Plans whole new lineages the tree lacks, with first nodes | `agents/inbox/<date>-lineages.md` |
| `branch-fixer` | Fixes branches the reviewer rejected and sends them back | `agents/branch-fixer-*` branches |
| `blog-writer` | Writes a post on what reached `main` since the last one | `blog/<date>-<slug>.md` |
| `web-reader` | Links the best writing from Medium and other sites in a weekly reading list, and queues what it mentions that the tree lacks | `blog/<date>-reading-list.md`, `agents/inbox/<date>-web-reader.md` |
| `preview-refresher` | Redraws the link preview when the counts change | `public/og-image.png` |
| `release-reviewer` | Reviews every agent branch and approves or rejects the exact tip | `agents/reports/review-*.md` |
| `release-merger` | Merges approved branches, re-verifies, pushes `main` | `main`, `agents/reports/merge-log.md` |

## Flow

1. `tech-scout` writes the inbox. Once a week `lineage-architect` adds a planned new lineage to it, and `web-reader` adds what it found while reading Medium and other sites (feeds in `agents/sources.md`).
2. `lineage-curator` turns confirmed entries into nodes, oldest inbox file first.
3. `fact-checker`, `portrait-finder`, `ui-qa` and `code-health` improve what is already there.
4. `release-reviewer` reviews each branch and records `verdict: approve` or `reject` for its exact commit.
5. `branch-fixer` takes rejected branches, fixes what the review found on a branch of its own, and the reviewer looks again.
6. `release-merger` merges only approved, unchanged branches that stay green on the merged result, then pushes `main`.
7. `preview-refresher` redraws the link preview when the counts changed, and `blog-writer` writes up what reached `main` twice a week, and `web-reader` posts a weekly reading list. Both go through review like everything else.

## Gates before anything reaches `main`

Approved for the exact tip, makio-san authorship, Conventional Commit messages, no Claude trailers, allowed paths only, clean merge, then type check, tests and the demo build on the merged result. Any failure means nothing is pushed. At most five merges per run, one at a time, and a single push of `main` at the end of the run, because every push is one Cloudflare Pages build. No force pushes, no rewrites. A broken push is reverted by the merger itself and logged.

## Rules shared by all

Common rules (commit format, sources for every fact, Wikimedia rate limits, reports) are repeated at the end of each agent file so each one is self contained. Reports go in `agents/reports/`.

## Live status on the site

Every agent calls `node scripts/agent-live.mjs <agent> start` when it begins and `done "<summary>"` or `failed "<reason>"` when it ends. The script writes one file per agent to a secret GitHub gist whose id is in `agents/live.json`; the repository is private, so the static site cannot read it directly. The Agents button in the top bar polls that gist: while any agent works it turns green, pulses and shows how many are working, a toast appears when an agent starts or finishes, and the Agents view lists who is working, the next scheduled run and recent activity. A run that says nothing for three hours is shown as stalled. If the gist id is empty the site falls back to the counts built from `agents/reports/`.

## Running them

Scheduled runs are set up in the Claude desktop app (Scheduled tasks). A run happens while the app is open, or on next launch. To stop everything reaching production, disable the `binary-tree-release-merger` task: the other agents then only fill branches. You can also start any agent by hand in a session.
