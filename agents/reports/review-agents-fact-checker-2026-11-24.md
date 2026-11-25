branch: agents/fact-checker-2026-11-24
reviewed-head: 0c0c87ac57fe4bbcb2af416545378ea98e712c50
verdict: approve

## Why

A careful audit of the `machines` branch. The diff changes only `src/data/branches/machines.ts` (17 nodes, summaries and facts, one year), the audit log and the report. Every change I re-checked moves the text closer to its source, and the doubts are listed, not acted on.

## What passed

Type check (`tsc --noEmit`), tests (`vitest run`) and the demo build all pass in a throwaway worktree. Every commit is authored and committed by `makio-san <killbillbeatrixx@gmail.com>`, with Conventional Commit messages that have a scope and a sentence, no trailers, no co-authors. No em or en dashes in the added lines, no secrets, no stray files. The branch merges cleanly into `main` at `fa50624`.

## Facts spot checked (all fine)

Opened myself on English Wikipedia:

- `zuse-z3`: "first working programmable, fully automatic digital computer", 2,600 relays, addition 0.8 seconds, destroyed on 21 December 1943 in a bombardment of Berlin. Matches.
- `mesm`: "became operational in 1950", first test launch 6 November 1950, first useful calculations 4 January 1951, "first universally programmable electronic computer in the Soviet Union", built at Feofania near Kyiv. The year change to 1950 and the new summary match.
- `pdp-8`: introduced at 18,500 dollars, "first minicomputer to sell for under 20,000 dollars", over 50,000 sold, about the size of a small household refrigerator. Matches.
- `system-370`: lacked virtual memory at its introduction; added in 1972 with dynamic address translation. Matches.
- `apollo-guidance`: "first computer based on silicon integrated circuits", 2,048 words of erasable memory. Matches.
- `whirlwind`: "among the first" real time computers and the second to use core memory after the Memory Test Computer. Matches.

## For a human

The report's doubt list is worth reading: `bombe` sits under the electronic group, six creators have no confirming source, and several nodes point at a person or company article although the machine has its own.
