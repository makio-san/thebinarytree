# Release reviewer, 2026-11-22

Branches ahead of `main` without a review file for their current tip: four.

| Branch | Head | Verdict |
| --- | --- | --- |
| `agents/tech-scout-2026-11-22` | `0d992c6f491a07a3ce9d73fc37039c2d9c74c433` | approve |
| `agents/code-health-2026-11-22-2` | `0b390d8c56e5637f9ad43c4291037dafbf622474` | approve |
| `agents/code-health-2026-11-22` | `21c50df6aa5a9d5dfef3e54b6e0204bf8c42d54f` | reject |
| `agents/tech-scout-2026-11-22-2` | `6b1a5b91ab9a8b0aeb89a2bf89b42ce472b8bc01` | reject |

All four pass the type check, 131 tests and the demo build in a throwaway worktree, and all merge into `main` cleanly. The two rejections are about branch contents, not facts: `agents/code-health-2026-11-22` is superseded and carries the scout's commits, and `agents/tech-scout-2026-11-22-2` carries the code-health dependency update and a code-health report. Fourteen facts were checked against RFC metadata, project sites and Wikipedia; none were wrong.

## Skipped

- `agents/lineage-curator-2026-11-21` and `agents/tech-scout-2026-11-21`: already rejected at their current tips on `main`. Not reviewed again.
- `agents/release-reviewer-2026-11-21-2`: a reviewer branch holding only review files.

## For a human

- Agents are still sharing the main checkout. During this run a lineage curator had uncommitted edits in `/Users/esma/Developer/the-binary-tree`, and the scheduled start command (`git checkout main && git pull`) runs in that same folder. Local `main` briefly held two unpushed curator commits (`78cd385`, `52fa205`); they are gone again and `main` equals `origin/main` at `15c370c`. Running every agent in its own worktree, start commands included, would stop this.
- `agents/code-health-2026-11-22` can be deleted once `agents/code-health-2026-11-22-2` is merged.
- Merge `agents/tech-scout-2026-11-22` before the curator branch that uses its inbox.
