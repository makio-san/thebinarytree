# Release reviewer, 2026-11-27 (second run)

Reviewed against `main` at `2c9cff6`.

## New reviews

- `agents/blog-writer-2026-11-27` at `4f21e5b`: approve. Counts, node links and dated claims match `main`; three claims rechecked on Wikipedia.
- `agents/tech-scout-2026-11-27-2` at `e0874d0`: approve. Inbox only, every entry sourced, nine entries rechecked.
- `agents/lineage-curator-2026-11-27-2` at `16c7082`: approve. Nine nodes, six rechecked against Wikipedia and arXiv, green alone and merged with `agents/lineage-curator-2026-11-27`.

## Approved branches still waiting

`git merge-tree --write-tree origin/main` is clean for `agents/branch-fixer-2026-11-27-lineage-curator-2026-11-25-2`, `agents/fact-checker-2026-11-27` and `agents/lineage-curator-2026-11-27`, so their approvals stand and none was rejected for a conflict.

## Unchanged

Branches whose current review still matches their tip were not looked at again: the rejected `branch-fixer-2026-11-23-lineage-curator-2026-11-21`, `branch-fixer-2026-11-25-lineage-curator-2026-11-24-2`, `code-health-2026-11-22`, `lineage-curator-2026-11-21`, `lineage-curator-2026-11-24-2`, `lineage-curator-2026-11-25-2` and `tech-scout-2026-11-22-2`.

## For a human

- `agents/branch-fixer-2026-11-27-lineage-curator-2026-11-25-2` and `agents/lineage-curator-2026-11-27` conflict with each other in `src/data/branches/networks.ts`. Both merge into `main` today, but the second one to land will need the branch fixer.
- `mamba` under `transformer` is a loose parent; see its review.
