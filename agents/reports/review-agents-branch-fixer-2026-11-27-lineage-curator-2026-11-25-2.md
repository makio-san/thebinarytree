branch: agents/branch-fixer-2026-11-27-lineage-curator-2026-11-25-2
reviewed-head: 27bb66e6d8ebaed3504249a51669f452be867815
verdict: reject

## Reason

Does not merge into main. `git merge-tree --write-tree origin/main origin/agents/branch-fixer-2026-11-27-lineage-curator-2026-11-25-2` exits non-zero against `main` at `db2add08b079ef107af984ae46b8b88fea9d83ed`.

Conflicting files:

- `src/data/branches/networks.ts`

The content was not judged again. The earlier approval of this same tip still describes the content; this rejection only records the conflict so the branch fixer can merge `main` into the branch and send it back.
