branch: agents/tech-scout-2026-11-27-2
reviewed-head: e0874d0a79b2008a9b42e7d5ff87cba2d37b8616
verdict: approve

Two commits: `agents/inbox/2026-11-27-2.md` with twelve candidates and the scout report. No dataset file changed.

## Checked

- Both commits by `makio-san <killbillbeatrixx@gmail.com>` as author and committer, Conventional Commits with scope and sentence, no trailers, no co-author, no Claude mention. No em or en dashes. Only the inbox file and the report are touched.
- The branch contains `main` at `2c9cff6`; merge is clean. Its tree was tested as part of `agents/lineage-curator-2026-11-27-2`, which is built on it: `tsc` clean, 157 of 157 tests, demo build ok.
- Every entry has a source link (12 of 12) and every parent id exists on `main`.
- Spot checks against Wikipedia opened in this run (nine of the twelve, the same ones the curator added): MVS first released 1974 as successor to OS/360; PL/I first definition April 1964, IBM and SHARE committee; Oberon published 1987 by Wirth as successor to Modula-2; Hack 1984 Usenet release by Brouwer, begun 1982 by Fenlason and three friends; NetHack 28 July 1987, fork of Hack; Google Search 1998, Page and Brin; MPLS labels and traffic engineering; Neovim fork of Vim with Lua, LSP and a built in terminal; Mamba by Gu and Dao, arXiv 2312.00752 submitted 1 December 2023. All correct.
- The scout's MVS wording ("the base that z/OS grew from") and Mamba wording were tightened by the curator; the inbox is a queue, so that is fine.
