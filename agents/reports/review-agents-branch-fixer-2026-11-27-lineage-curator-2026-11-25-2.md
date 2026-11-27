branch: agents/branch-fixer-2026-11-27-lineage-curator-2026-11-25-2
reviewed-head: 27bb66e6d8ebaed3504249a51669f452be867815
verdict: approve

Fixer branch for `agents/lineage-curator-2026-11-25-2` (tip `9d07b7f`), whose content was approved on 25 November and which was rejected on 26 November only because it no longer merged into `main` (conflict in `src/data/branches/operating-systems.ts`).

## Original rejection dealt with

- The fixer merged `main` (`d6557e1`) into the rejected tip in one merge commit, `fa2a653`. The ext4 node sits beside cgroups and io_uring under Linux; nothing from either side was dropped.
- The added and removed lines of `d6557e1..fa2a653` are identical, line for line, to those of the approved `merge-base..9d07b7f`. So the branch adds exactly the approved content plus the fixer report, and nothing else.
- The branch now merges cleanly into `main`.

## Checked

- Every commit by `makio-san <killbillbeatrixx@gmail.com>` as author and committer, Conventional Commits with scope and sentence, no trailers, no co-authors, no Claude mention. No em or en dashes in added lines. No secrets, stray files or node_modules.
- Throwaway worktree on the tip: `tsc --noEmit` clean, `vitest run` 157 of 157, demo build ok.
- `git merge-tree --write-tree origin/main` clean against `main` at `d6557e1`; tests on the merged result 157 of 157.
- Paths: `agents/reports/`, `src/data/branches/*.ts`, `src/data/creators.ts`, `src/data/wiki.ts`.
- Parents from the built tree, each later than its parent: ext4 under linux, chroot under research-unix-v6, infiniband under beowulf, signal-protocol under diffie-hellman, perlin-noise under graphics-documents, tsmc under integrated-circuit, hypercard under hypertext, webrtc under websocket.
- Facts re-verified against Wikipedia opened in this run: Signal Protocol, Open Whisper Systems 2013 in TextSecure. Perlin noise, Ken Perlin 1983. InfiniBand, formed in 1999 from the merger of Future I/O and NGIO, spec 1.0 in 2000. All correct.

## For a human

- `lineage-curator-2026-11-27` also adds data to the same files; whichever merges second may need the fixer again. The layout test tolerance the fixer report describes may also bite on a later merge.
