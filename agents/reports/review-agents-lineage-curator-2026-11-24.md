branch: agents/lineage-curator-2026-11-24
reviewed-head: ed542af5b7d926f9c6159b6e9eca1e543f309af6
verdict: approve

## Why

Thirteen nodes with titles and creators, two processed inbox copies and the report. All paths are the curator's. None of the thirteen ids exists on `main` or on the three approved, unmerged curator and fixer branches, so nothing is added twice. The report explains each change from the inbox, including moving Verilog and VHDL to parents their articles name.

## What passed

Type check (`tsc --noEmit`), tests (`vitest run`) and the demo build all pass in a throwaway worktree. Every commit is authored and committed by `makio-san <killbillbeatrixx@gmail.com>`, with Conventional Commit messages that have a scope and a sentence, no trailers, no co-authors. No em or en dashes in the added lines, no secrets, no stray files. The branch merges cleanly into `main` at `fa50624`.

136 of 136 tests pass on this branch alone, including the layout precision test the report says is near its tolerance.

## Facts spot checked (all fine)

Opened myself on English Wikipedia:

- `verilog`: created by Prabhu Goel, Phil Moorby and Chi-Lai Huang between late 1983 and early 1984; the designers wanted a syntax similar to C; IEEE 1364, merged into SystemVerilog in 2009. Year 1984, creators and the parent `c-language` match.
- `tor`: onion routing from the US Naval Research Laboratory in the mid 1990s (Syverson, Reed, Goldschlag); alpha by Syverson, Dingledine and Mathewson launched on 20 September 2002. Matches.
- `fpga`: Xilinx produced the first commercially viable one, the XC2064, in 1985, with 64 configurable logic blocks. Matches.
- `smb`: developed in 1983 by Barry A. Feigenbaum at IBM for IBM PC DOS; Microsoft and 3Com put it in LAN Manager in 1987. Matches.
- `parquet`: joint effort of Twitter and Cloudera on the Dremel record shredding algorithm, version 1.0 in July 2013, top level Apache project since 27 April 2015. Matches, and the parent `column-store` fits.

## For a human or the next curator

- `agents/inbox/2026-11-22-2.md` reached `main` after this branch was cut (merge `7ad6a77`). This branch adds `agents/inbox/done/2026-11-22-2.md` but does not remove the inbox file, so after the merge both exist. Delete the inbox copy, or the next curator will meet ten entries that are already nodes. The same goes for `agents/inbox/2026-11-23-2.md` once `agents/lineage-curator-2026-11-23-2` lands, as the report says.
- The `verilog` block in `languages.ts` is indented two spaces deeper than its siblings. Cosmetic only.
- The layout precision test is at its edge once more hardware is added under `integrated-circuit`. The merger re-runs the tests on the merged result, so a failure there would stop the merge, not reach production.
- The WebKit start date of June 2001 rests on a source Wikipedia marks as unreliable, as the report says. I did not re-check it.
