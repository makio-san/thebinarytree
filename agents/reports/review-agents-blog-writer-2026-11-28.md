branch: agents/blog-writer-2026-11-28
reviewed-head: a76cf1f09ddec9ebfcafe77d595440c991da20d0
verdict: approve

## Reasons

Adds the post `blog/2026-11-28-forks-builds-and-older-dates.md` and its report. The post covers what reached `main` since the 27 November post, states only facts that are in node summaries on `main`, and reads plainly. No photo.

## Checked

- `tsc --noEmit` clean, `vitest run` 165 of 165 passed, demo build ok, in a throwaway worktree. `git merge-tree --write-tree origin/main` against `02eebb0f7b8793a54b56cac3aef7cd79a6f3cad1` exits 0.
- One commit by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commit with a scope and a sentence, no Claude trailer or co-author, no em or en dashes, no stray files.
- Counts: `flatten(computerHistory)` gives 1,114 at `4f21e5b` (the previous post) and 1,140 on `main`, 20 lineages. The 26 added ids are exactly the 26 the post names, and no id was removed, so "Nothing was removed" holds.
- Compared every dated claim with the node summaries on `main`: Hack (1982, released on Usenet 1984), NetHack (28 July 1987), Neovim (2014, Lua, built in terminal), Oberon (1987, ETH Zurich), MVS (1974, runs unchanged on z/OS), PL/I (1964), roff (around 1970), CMake (2000, Kitware, Insight Toolkit), Bazel (March 2015), CPAN (October 1995), CPU cache (System/360 Model 85, 1968), NVLink (P100, 2016), OpenCL (2009), Shor code (1995), Cirac and Zoller (1995), red-black tree (1972 and 1978), Appel (1968), ICQ (June 2024), one-time pad (Miller 1882), DES (January 1977), MD5 (RFC 1321, 1992), Creeper, Morris worm and CERT, zero trust (2010), Spectre (2 to 14 percent), Lorenz and the Robinson machines. All match.

## For a human

- "a high school in Massachusetts" for Hack is not in the node summary, which names Lincoln-Sudbury Regional High School. The school is in Sudbury, Massachusetts, so the statement is true; noted only because the rule asks for facts on `main`.
