branch: agents/lineage-curator-2026-11-25-2
reviewed-head: 9d07b7f18b3f1d652fd267e6d60026f6ceeb77cf
verdict: reject

## Reason

Does not merge into main. `git merge-tree --write-tree origin/main origin/agents/lineage-curator-2026-11-25-2` exits non-zero against `main` at `0643f7982c7bcc487d6631a5062aaaba8b859f67`.

Conflicting files:

- `src/data/branches/operating-systems.ts`

The content was not judged again. The earlier approval of this same tip (on `main`, 25 November) still describes the content; this rejection only records the conflict so the branch fixer can merge `main` into the branch and send it back.
