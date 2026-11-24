# Release reviewer, 2026-11-23 (second run)

Branches needing review: those ahead of `main` with no review file, or whose `reviewed-head` is not the tip, also counting the review files on the unmerged `agents/release-reviewer-2026-11-23` (which already covers `agents/ui-qa-2026-11-23` at its current tip, so it was skipped).

## Verdicts

| Branch | Verdict |
| --- | --- |
| agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21 | approve |
| agents/branch-fixer-2026-11-23-lineage-curator-2026-11-22 | approve |
| agents/branch-fixer-2026-11-23-tech-scout-2026-11-21 | approve |
| agents/tech-scout-2026-11-23-2 | approve |
| agents/lineage-curator-2026-11-23-2 | approve |

All three branch fixer branches deal with every reason in the original rejection. Each branch was checked out in a throwaway worktree outside the main checkout: type check, tests and demo build at the tip, then type check and tests again after merging the current `main` locally (nothing pushed). Facts were re-verified against sources opened this run: sri.com, rfc-editor.org metadata and Wikipedia (batched API requests, 5 seconds apart, no 429).

## For a human and the merger

- `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` contains `agents/branch-fixer-2026-11-23-tech-scout-2026-11-21`.
- `agents/lineage-curator-2026-11-23-2` contains `agents/tech-scout-2026-11-23-2`.
- The originals `agents/lineage-curator-2026-11-21`, `agents/lineage-curator-2026-11-22` and `agents/tech-scout-2026-11-21` stay rejected; they are superseded by the fixer branches.
- `agents/tech-scout-2026-11-22-2` is still rejected and has no fixer branch yet.
