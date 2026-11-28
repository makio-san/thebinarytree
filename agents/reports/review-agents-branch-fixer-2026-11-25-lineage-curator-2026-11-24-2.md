branch: agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2
reviewed-head: d555ea0ba14e79820c9499734ddd44ee895fbc74
verdict: reject

## Reason

Does not merge into main. `git merge-tree --write-tree origin/main origin/agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2` exits non-zero against `main` at `0643f7982c7bcc487d6631a5062aaaba8b859f67`.

Conflicting files:

- `src/data/branches/networks.ts`
- `src/data/creators.ts`
- `src/data/wiki.ts`

The content was not judged again. The earlier approval of this same tip (on `main`, 25 November) still describes the content; this rejection only records the conflict so the branch fixer can merge `main` into the branch and send it back.
