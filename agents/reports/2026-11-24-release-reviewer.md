# Release reviewer, 2026-11-24

Reviewed the four agent branches that were ahead of `main` without a review for their tip. Each was checked out in a throwaway worktree outside the main checkout; type check, tests and the demo build were run there. Nothing was merged.

| Branch | Head | Verdict |
| --- | --- | --- |
| `agents/fact-checker-2026-11-24` | `0c0c87a` | approve |
| `agents/lineage-curator-2026-11-24` | `ed542af` | approve |
| `agents/tech-scout-2026-11-24` | `49698e0` | approve |
| `agents/web-reader-2026-11-24` | `9a64399` | approve |

## Skipped and why

- Four approved branches from 2026-11-23 are still unmerged with unchanged tips, so their approvals stand: `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21`, `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-22`, `agents/branch-fixer-2026-11-23-tech-scout-2026-11-21` and `agents/lineage-curator-2026-11-23-2`. Their review files are on `agents/release-reviewer-2026-11-23-2`.
- Five rejected branches have unchanged tips and keep their rejection: `agents/code-health-2026-11-22`, `agents/lineage-curator-2026-11-21`, `agents/lineage-curator-2026-11-22`, `agents/tech-scout-2026-11-21`, `agents/tech-scout-2026-11-22-2`.

## Sources

Wikipedia and Commons through the API with a generic client name: full text of fifteen articles one at a time, five seconds apart, one batch of nineteen intros, one infobox section and one Commons licence query. No 429. Three linked posts and the two photos were fetched once each.

## For a human

- After `agents/lineage-curator-2026-11-24` merges, delete `agents/inbox/2026-11-22-2.md` from `main`: its processed copy is then in `agents/inbox/done/`, and leaving it invites a second pass over the same entries.
- The curator reports the layout precision test is at its tolerance in the processors branch. Several approved hardware branches are waiting, so the merged result may fail there; the merger's own test run would catch it.
- The fact-checker notes that `scripts/audit-wiki.ts` batches 50 titles with a 250 ms pause, above the shared Wikimedia rule. That is for code-health.
