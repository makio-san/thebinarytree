# Release reviewer, 2026-11-28

Reviewed against `main` at `db2add0`, each branch checked out in a throwaway worktree.

## Approved

- `agents/tech-scout-2026-11-28` (`0f630de`): fifteen inbox candidates, six spot checked on Wikipedia.
- `agents/lineage-architect-2026-11-28` (`5002b83`): accessibility technology lineage proposal, four entries spot checked.
- `agents/lineage-curator-2026-11-28` (`c389356`): twenty new nodes, seven spot checked; contains the tech scout branch above.
- `agents/branch-fixer-2026-11-28-lineage-curator-2026-11-24-2` (`9951ec0`): merges current `main` into the branch rejected for a conflict; resolutions keep both sides.
- `agents/preview-refresher-2026-11-27` (`577368f`): link preview redrawn for 1131 nodes, image checked by eye.
- `agents/web-reader-2026-11-28` (`d6ad384`): no list this run, one sourced inbox entry (RDRAND).

## Rejected

- `agents/branch-fixer-2026-11-27-lineage-curator-2026-11-25-2` (`27bb66e`): approved earlier, but no longer merges into `main` (conflict in `src/data/branches/networks.ts`). Content not judged again.

## Still approved and merging cleanly

- `agents/lineage-curator-2026-11-27-2` (`16c7082`), approved on `agents/release-reviewer-2026-11-27-2`.

## Unchanged rejections, not reviewed again

`agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21`, `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2`, `agents/code-health-2026-11-22`, `agents/lineage-curator-2026-11-21`, `agents/lineage-curator-2026-11-24-2`, `agents/lineage-curator-2026-11-25-2`, `agents/tech-scout-2026-11-22-2`: tips still match their reviewed heads.

## For a human

- Several approved data branches touch the same files (`networks.ts`, `operating-systems.ts`, `creators.ts`, `wiki.ts`). Whichever merges first may push the others into conflict; the next run will check again.
- The layout test tolerance that holds back `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` (see the 2026-11-28 branch fixer report) still needs a code-health fix.
