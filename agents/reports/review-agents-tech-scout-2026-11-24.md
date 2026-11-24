branch: agents/tech-scout-2026-11-24
reviewed-head: 49698e058402192ee148382ed39b48c01e3b62be
verdict: approve

## Why

Two files only: `agents/inbox/2026-11-24.md` with sixteen candidates and the scout's report. Every proposed parent id exists on `main`, every entry has a source, and the two uncertain ones (MYCIN's year, MUD1's year) are marked and left to the curator.

## What passed

Type check (`tsc --noEmit`), tests (`vitest run`) and the demo build all pass in a throwaway worktree. Every commit is authored and committed by `makio-san <killbillbeatrixx@gmail.com>`, with Conventional Commit messages that have a scope and a sentence, no trailers, no co-authors. No em or en dashes in the added lines, no secrets, no stray files. The branch merges cleanly into `main` at `fa50624`.

## Facts spot checked (all fine)

Opened myself on English Wikipedia:

- Mach: developed at Carnegie Mellon by Richard Rashid and Avie Tevanian, project from 1985, a replacement for the BSD kernel, derivatives in GNU Hurd and XNU. Matches.
- Trackball: invented by Ralph Benjamin in 1946 for the Royal Navy's Comprehensive Display System; Ferranti Canada's DATAR from 1952 used a five-pin bowling ball. Matches.
- Sendmail: Eric Allman derived it from delivermail at UC Berkeley; shipped with 4.1c BSD in 1983, the first BSD with TCP/IP. Matches.
- SHRDLU: Terry Winograd, MIT, 1968 to 1970, Micro Planner and Lisp on a PDP-6. Matches.
- Also read in the article intros: IBM Watson (DeepQA, David Ferrucci, Jeopardy! 2011), Itanium (began at HP, launched June 2001), SETI@home (released 17 May 1999), MYCIN (early 1970s, Shortliffe under Buchanan and Cohen). All match.

## For the curator

MYCIN has no numeric year in the inbox, and seL4 needs Mach added first. Both are said in the entry itself.
