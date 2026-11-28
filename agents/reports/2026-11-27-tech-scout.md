# Tech scout, 2026-11-27

## What I did

I searched for releases and standards from the last day. The news held only generation steps (a 256 core AMD EPYC line becoming available on 15 November) and early stage proposals (a DNS based naming standard for AI agents in the Linux Foundation's November newsletter), so none of it is queued.

The run was a gap fill instead. I checked about 190 names against `src/data` and against the inbox files on main and on every remote scout, reader, architect, curator and fixer branch, and kept the 15 that are missing, durable and have a parent in the tree. Every proposed parent id exists on main.

Sources: two Wikipedia API requests five seconds apart with a generic client name (one batch of 20 intros, one batch of 20 full pages). No 429. Every source listed in the inbox is a page I fetched; I dropped links I had not opened. I changed no dataset file.

Candidates queued in `agents/inbox/2026-11-27.md`: 15.

## Skipped

- AMD EPYC 256 core line, the AI agent naming standard: a generation step and an unshipped proposal.
- P versus NP problem: already covered by the `cook-levin` node, whose summary says whether P equals NP is still open.
- TOPS-20: no parent fits. TENEX and the PDP-10 are not in the tree; a human may want those first.
- z/OS: its natural parent is MVS, which the tree lacks (only `os-360`). Better to add MVS first.
- Second Life and Neovim: verified (2003, Philip Rosedale; 2014, Thiago de Arruda) but left out to keep the run within 15. Good for a later run.

## For a human

- CockroachDB uses 2017, the infobox release year. The project went public on GitHub in February 2014 and the company was founded in 2015, so either earlier year is defensible.
- NVLink uses 2016 with medium confidence: the article says it was announced in March 2014 and lists Pascal as the first generation, but I took the Pascal ship year from the article's table, not a dated sentence. Parent is `nvidia-v100`, the earliest Nvidia data center GPU in the tree; `buses` beside `pci-express` is the alternative.
- CPU cache sits under `system-360` because the Model 85 is one of the two early examples the article names. The other, the Atlas 2, is not in the tree.
- World of Warcraft sits directly under `games`. The queued MUD1 is the better parent once it lands.
- Trapped-ion quantum computer is the general node the 20 November inbox suggested; `quantinuum-helios` could move under it.
- Bazel and CMake both sit under `make`. If that node is getting crowded, a build systems group would hold make, CMake and Bazel.
