branch: agents/lineage-curator-2026-11-27
reviewed-head: 0e7b2f68838c4fa36056208367032c2413d3aaf2
verdict: approve

Built on `agents/tech-scout-2026-11-27` (both of its commits included, reviewed separately and approved). Adds 17 nodes from the 26 and 27 November inboxes and the 26 November web reader inbox, moves processed entries to `done/`, adds the report.

## Checked

- Every commit by `makio-san <killbillbeatrixx@gmail.com>` as author and committer, Conventional Commits with scope and sentence, no trailers, no co-authors, no Claude mention. No em or en dashes in added lines. No secrets, stray files or node_modules.
- Throwaway worktree on the tip: `tsc --noEmit` clean, `vitest run` 157 of 157, demo build ok.
- `git merge-tree --write-tree origin/main` clean against `main` at `d6557e1`; tests on the merged result 157 of 157.
- Paths: `agents/inbox/done/`, `agents/reports/`, `src/data/branches/{data-stores,foundations,frontier,languages,machines,networks,operating-systems,tools}.ts`, `src/data/creators.ts`, `src/data/wiki.ts`. No stray files.
- Parents from the built tree, each later than its parent: opencl and nvlink under cuda, red-black-tree under b-tree, cockroachdb under newsql, nat under tcp-ip, cpan under perl, cmake and bazel under make, strassen-algorithm under complexity-theory, kolmogorov-complexity under information-theory, cpu-cache under system-360, roff under unix, lean under ml, icq under online-services.
- Facts re-verified against Wikipedia opened in this run:
  - OpenCL: Apple's initial proposal, Khronos approved 1.0 on 8 December 2008, shipped with Snow Leopard on 28 August 2009. Correct.
  - CockroachDB: three ex-Google engineers (Kimball, Mattis, Darnell) who had used Bigtable and Spanner; Kimball began the GitHub project in February 2014; PostgreSQL wire compatible. Correct. The 2017 year is the infobox release year, as the report says.
  - ICQ: released November 1996 by Mirabilis, founders as listed in `creators.ts`, centralized service with one to one chats. Correct.
  - Bazel: open source port of Blaze (begun 2006), first released March 2015, Starlark rules. Correct.
  - CMake: work began at Kitware in 1999 for the Insight toolkit, first released 2000. Correct.
  - Strassen algorithm: published 1969, proved the cubic algorithm not optimal. Correct.

## For a human

- `lean` under `ml` and `nvlink` under `cuda` are loose fits; the curator report names alternatives. Not wrong, just a judgement call.
- Touches the same data files as the branch-fixer branch for `lineage-curator-2026-11-25-2`; merge order matters.
