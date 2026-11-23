# Release reviewer, 2026-11-23

## What I did

I fetched origin and listed the `agents/*` branches ahead of `main`. Every one already had a review file for its current tip (on `main` or on `agents/release-reviewer-2026-11-22-2`), except three. I reviewed those three in throwaway worktrees outside the main checkout.

| Branch | Tip | Verdict |
| --- | --- | --- |
| `agents/tech-scout-2026-11-23` | `0b6e8e5` | approve |
| `agents/ui-qa-2026-11-23` | `b64a2bd` | approve |
| `agents/lineage-curator-2026-11-23` | `8a37dc0` | approve |

## Skipped

- Branches whose tips match an existing review were not reviewed again: `code-health-2026-11-22`, `lineage-curator-2026-11-21`, `lineage-curator-2026-11-22`, `tech-scout-2026-11-21` and `tech-scout-2026-11-22-2`. All of them were rejected earlier.
- `agents/release-reviewer-2026-11-22-2` holds review files only and is not itself reviewed.

## For a human

- The lineage curator branch contains the scout commits, so merging it also merges the scout branch.
- No ui-qa browser pass has run yet, because the preview server needs approval in unattended runs.
