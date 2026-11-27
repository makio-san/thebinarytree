branch: agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21
reviewed-head: 4f88415692cdbf3117441e3c95835a545afdceb1
verdict: reject

## Reason

Does not merge into main. `git merge-tree --write-tree origin/main origin/agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` exits non-zero against `main` at `0643f7982c7bcc487d6631a5062aaaba8b859f67`.

Conflicting files:

- `src/data/branches/peripherals.ts`

The content was not judged again. The earlier approval of this same tip (on `main`, 23 November) still describes the content; this rejection only records the conflict so the branch fixer can merge `main` into the branch and send it back.
