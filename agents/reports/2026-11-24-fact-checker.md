# Fact-checker, 2026-11-24

Slice: the whole `machines` branch (`src/data/branches/machines.ts`, 55 nodes including 6 groups), with its entries in `creators.ts` and `wiki.ts`. Not listed in the audit log before.

## Method

- Wikipedia titles: all 59 titles used by the branch, plus a few candidate titles, in two batched `action=query` requests (40 titles each, `redirects=1`, disambiguation page prop). All resolve to standard articles; none is a disambiguation page. `Atanasoff-Berry computer` and `AN/FSQ-7` redirect, which is fine.
- Facts: the full plain text of 47 articles (every machine with its own article), one request every 5 seconds. Four HTTP 429 answers came back; each time the script waited for the Retry-After value and carried on. Then `Gordon Bell` and `Wesley A. Clark` for creator checks.
- Tone: no em or en dashes and no marketing words in the branch after the edits. Every leaf has a summary.
- `tsc --noEmit` passes and `vitest run` passes (136 tests).

## Fixed

| Node | Was | Now | Source |
| --- | --- | --- | --- |
| `zuse-z3` | 2000 relays; "The first reliable automatic computer" | 2600 relays; first working programmable, fully automatic computer; destroyed in 1943 | https://en.wikipedia.org/wiki/Z3_(computer) |
| `zuse-z3` fact | "About 5 additions per second" | "An addition took about 0.8 seconds" | same |
| `plankalkul` | "never got a compiler" | Never implemented by Zuse, republished in 1972, first compiler 1975 (Hohmann) | https://en.wikipedia.org/wiki/Plankalk%C3%BCl |
| `whirlwind` | "The first computer to work in real time"; "First serious use of magnetic core memory" | One of the first; the second machine with core memory, after the Memory Test Computer | https://en.wikipedia.org/wiki/Whirlwind_I |
| `mesm` | year 1951; "continental Europe's first working stored program computer" | year 1950 (became operational, first test run November 1950); first universally programmable electronic computer in the USSR. The source says the continental Europe claim is made "by some authors" | https://en.wikipedia.org/wiki/MESM |
| `leo-i` | "Lyons tea company"; first commercial application "payroll and stock" | Lyons catering company; first business work was bakery valuations from September 1951, payroll later | https://en.wikipedia.org/wiki/LEO_(computer) |
| `ibm-701` | "its exit from tabulating machines" (not supported) | first commercial scientific computer and first series built mainframe, based on the IAS machine, announced 1952 | https://en.wikipedia.org/wiki/IBM_701 |
| `ibm-704` | "an index register" | three index registers; first mass produced computer with floating point hardware | https://en.wikipedia.org/wiki/IBM_704 |
| `ibm-650` | year 1953 with no other date | summary says announced 1953, first installed late 1954; "almost 2000 built" | https://en.wikipedia.org/wiki/IBM_650 |
| `system-360` | year 1964 with no other date | summary says announced 1964, delivered from 1965 | https://en.wikipedia.org/wiki/IBM_System/360 |
| `system-370` | "Virtual memory and multiprocessing arrived on the mainframe" | announced 1970 without virtual memory, added in 1972 with dynamic address translation | https://en.wikipedia.org/wiki/IBM_System/370 |
| `system-390` | "Fibre channel and clustering" | fibre optic ESCON channels and Sysplex clustering (Fibre Channel is a different, later standard) | https://en.wikipedia.org/wiki/IBM_System/390 |
| `apollo-guidance` | "2 KB of writable memory"; "first flight computer to use integrated circuits" | 2048 words (16 bit words, so about 4 KB); first computer based on silicon integrated circuits | https://en.wikipedia.org/wiki/Apollo_Guidance_Computer |
| `spacewar` | "The starting point of computer games" | spread to other PDP-1 sites and led to the first commercial arcade games | https://en.wikipedia.org/wiki/Spacewar! |
| `pdp-1` | "The first commercial computer with a display and keyboard"; "A tenth of the price of a mainframe" (neither in the source) | sold for 120,000 dollars; prototype December 1959, first delivery November 1960 | https://en.wikipedia.org/wiki/PDP-1 |
| `pdp-8` | 18,000 dollars; "first commercially successful minicomputer" | 18,500 dollars; first minicomputer under 20,000 dollars | https://en.wikipedia.org/wiki/PDP-8 |
| `pdp-11` | "Over 600,000 sold"; "shaped every processor that followed" | about 600,000; inspired the Intel x86 and the Motorola 68000 | https://en.wikipedia.org/wiki/PDP-11 |
| `data-general-nova` | "single board" | processor on two large circuit boards (the single board plan grew to two) | https://en.wikipedia.org/wiki/Data_General_Nova |

(17 nodes; `zuse-z3` has two rows.)

## Doubts, not changed

- `bombe` sits in the "First Electronic Machines" group, but its own summary and Wikipedia call it electromechanical. Consider moving it to `electromechanical`.
- `ibm-701` is not a child of `ias-machine`, although Wikipedia says it was based on the IAS machine. Lineage question for a human.
- `edvac` year 1949: Wikipedia gives delivery to the Ballistic Research Laboratory in 1949; it is often said to have begun operation only in 1951, which the article I opened does not state.
- `manchester-mark-1` "First use of magnetic drum backing store": the article describes the drum but does not call it the first.
- `ibm-1401` "it moved the punched card world onto magnetic tape": the article says it replaced unit record equipment and worked alongside punched card equipment. Suggest rewording.
- `system-360` era `integrated`: the article says System/360 used Solid Logic Technology and not integrated circuits. Same question for `pdp-8` (diode transistor logic). The era field may be a coarse band, so left alone.
- `alpha-21064` "cut short when DEC was sold": not in the article. It was the highest performing microprocessor until 1993.
- `zuse-z4` "leased to ETH Zürich": the article says ETH acquired it and it was delivered in 1950; it does not mention a lease.
- Creators not confirmed by the articles opened: `bell-relay` Samuel Williams, `pdp-8` Gordon Bell (his article lists PDP-4, PDP-5, PDP-6 and PDP-11 work, not PDP-8), `vax-11-780` Bill Strecker (Bell oversaw VAX as VP of engineering), `alpha-21064` Richard Sites, `ibm-1401` Francis Underwood, `ibm-650` Frank Hamilton. None of these people has an English Wikipedia article under the obvious title; a human should source or drop them.
- `ibm-704` creators list only Gene Amdahl; Wikipedia says designed by John Backus and Gene Amdahl.
- `ibm-701` creators order: Wikipedia names Jerrier Haddad first, then Nathaniel Rochester.

## Wikipedia titles worth a look

All resolve, but several nodes point at a person or company although the machine has its own article: `plankalkul` (Konrad Zuse, article `Plankalkül` exists), `binac` (J. Presper Eckert, `BINAC` exists), `manchester-mark-1` (Manchester Baby, `Manchester Mark 1` exists), `leo-i` (J. Lyons and Co., `LEO (computer)` exists), `sage` (AN/FSQ-7, `Semi-Automatic Ground Environment` exists), `burroughs-b5000` (Burroughs Corporation, `Burroughs B5000` redirects to `Burroughs Large Systems`). Not changed, because the current titles may have been chosen for their lead images; run `npm run audit:wiki` before switching.

## Not checked

The other branches. Next run could take `processors` or `operating-systems`.

Note for code-health: `scripts/audit-wiki.ts` uses 50 titles per batch and a 250 ms pause, which is above the shared rule of 40 titles and 4 to 5 seconds. I did not run it for that reason and used my own batched queries instead.
