branch: agents/branch-fixer-2026-11-28-lineage-curator-2026-11-24-2
reviewed-head: 9951ec0443fba4f3f2a99f97ada820ea955571bf
verdict: reject

## Reasons

- does not merge into main

## Checked

- This tip was approved this morning. Tested again with `git merge-tree --write-tree origin/main origin/agents/branch-fixer-2026-11-28-lineage-curator-2026-11-24-2` against `main` at `02eebb0f7b8793a54b56cac3aef7cd79a6f3cad1`: exit 1, content conflicts in `src/data/creators.ts` and `src/data/wiki.ts`.
- Content was not judged again; the earlier approval stands for content. The fixer should merge `main` into the branch, keep both sides of the appended sections, and rerun the type check and the tests, including the layout precision test.
