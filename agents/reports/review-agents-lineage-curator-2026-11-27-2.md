branch: agents/lineage-curator-2026-11-27-2
reviewed-head: 16c708234ba9fdab6f34a21e9bb69aeb8ce85979
verdict: approve

Built on `agents/tech-scout-2026-11-27-2` (both of its commits included, reviewed separately and approved). Adds nine nodes (MVS, PL/I, Oberon, Hack, NetHack, Google Search, MPLS, Neovim, Mamba), their creators and Wikipedia titles, moves the processed inbox entries to `done/`, and adds the report. SHA-1 is left queued and SimCity and Second Life skipped, with reasons.

## Checked

- All five commits by `makio-san <killbillbeatrixx@gmail.com>` as author and committer, Conventional Commits with scope and sentence, no trailers, no co-author, no Claude mention. No em or en dashes in added lines. No secrets, stray files or node_modules.
- Paths: `agents/inbox/`, `agents/inbox/done/`, `agents/reports/`, `src/data/branches/{frontier,games,languages,networks,operating-systems,tools}.ts`, `src/data/creators.ts`, `src/data/wiki.ts`.
- Throwaway worktree on the tip: `tsc --noEmit` clean, `vitest run` 157 of 157, demo build ok. The branch contains `main` at `2c9cff6` and `git merge-tree --write-tree origin/main` is clean.
- Also merged with the approved `agents/lineage-curator-2026-11-27`: no conflicts, `tsc` clean, 157 of 157 including the layout precision test. Pairwise merge-tree is clean against `agents/fact-checker-2026-11-27` and `agents/branch-fixer-2026-11-27-lineage-curator-2026-11-25-2` too.
- Parents from the built tree, each later than its parent: mvs under os-360, pl-i under algol-60, oberon under modula-2, hack under rogue, nethack under hack, google-search under pagerank, mpls under tcp-ip, neovim under vim, mamba under transformer.
- Facts re-verified against sources opened in this run (Wikipedia API, one batched intro request and single page requests five seconds apart, no 429; arXiv abstract):
  - Hack: created 1982 by Jay Fenlason with Kenny Woodland, Mike Thome and Jonathan Payne at Lincoln-Sudbury Regional High School; extended version released on Usenet in 1984 by Andries Brouwer. Year and the five creators correct.
  - NetHack: first released 28 July 1987 as a fork of Hack by the NetHack Development Team, one of the oldest games still in development, cited as an influence on Diablo. Correct.
  - MVS: first released 1974, successor to OS/360, most used system on IBM mainframes, extended through OS/390 to z/OS. Correct.
  - PL/I: IBM and SHARE committee of October 1963 could not extend Fortran, first definition April 1964. Correct.
  - Oberon: published 1987 by Niklaus Wirth, successor to Modula-2, type extension of records, built with the Oberon system at ETH Zurich. Correct.
  - Mamba: Gu and Dao, submitted 1 December 2023; Mamba-3B matches Transformers twice its size. Correct.
  - Neovim and MPLS summaries match their article leads.

## For a human

- `mamba` under `transformer` is a loose fit: Wikipedia says it is based on the S4 state space model and was built to address limits of transformers, so it is a rival rather than a descendant. The tree has no S4 node. Not wrong as a placement in the sequence model line, but a judgement call.
- `mpls` under `tcp-ip` and `google-search` under `pagerank` are also loose, as the curator report says.
- Separate from this branch: the two approved branches `agents/branch-fixer-2026-11-27-lineage-curator-2026-11-25-2` and `agents/lineage-curator-2026-11-27` conflict with each other in `src/data/branches/networks.ts`. Whichever reaches `main` second will stop merging, and the next review run will reject it for the conflict.
