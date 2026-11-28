# Release reviewer, 2026-11-28 (second run)

Reviewed against `main` at `02eebb0f7b8793a54b56cac3aef7cd79a6f3cad1`, in throwaway worktrees outside the main checkout. Branch `agents/release-reviewer-2026-11-28` already existed, so this run uses `agents/release-reviewer-2026-11-28-2`.

## Approved

- `agents/blog-writer-2026-11-28` (`a76cf1f`): counts and every dated claim match `main`.
- `agents/branch-fixer-2026-11-28` (`da4ea09`): report only.
- `agents/tech-scout-2026-11-28-2` (`1beb658`): inbox only, five entries spot checked.
- `agents/lineage-curator-2026-11-28-2` (`684a9f0`): sixteen nodes, eight checked on Wikipedia; green at the tip and on the merged result with `main`.

## Rejected

- `agents/branch-fixer-2026-11-28-lineage-curator-2026-11-24-2` (`9951ec0`): approved this morning, but no longer merges into `main` (conflicts in `src/data/creators.ts` and `src/data/wiki.ts`). Content not judged again.

## Still current, not reviewed again

- `agents/lineage-architect-2026-11-28` and `agents/lineage-curator-2026-11-28`: approved this morning for their tips, and both still merge into `main` cleanly.
- Ten older branches keep their rejection for the same tip.

## For a human

- The layout precision check in `test/layout.test.ts` blocks two fixer branches on misses near 1e-9. It needs a code-health change.
- Merging `agents/lineage-curator-2026-11-28-2` brings in `agents/lineage-curator-2026-11-28` and `agents/tech-scout-2026-11-28-2` as well.
