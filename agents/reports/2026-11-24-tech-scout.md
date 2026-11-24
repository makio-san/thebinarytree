# Tech scout, 2026-11-24

## What I did

I searched the web for anything new since the 23 November runs. It found only point releases (Windows 11 26H2, Visual Studio 2026 18.12), which do not qualify. So this run filled gaps again. I dumped all 1018 nodes on main with `flatten()` and checked about 280 well known names against them and against every inbox heading on main and on all unmerged scout, curator and fixer branches (132 queued names). ELIZA, SCSI, Serial ATA and Bravo were already queued or pending, so I left them out.

Gaps found: AI history (SHRDLU, MYCIN, IBM Watson, ImageNet), operating systems (Mach, seL4), networking (IRC, OSPF, Sendmail), Unix tools (grep), hardware (Itanium, OLED, trackball), games (MUD1, DirectX) and volunteer computing (SETI@home).

Sources: Wikipedia API only, 13 requests in all: one batch of 16 intros, ten single full pages five seconds apart, and one batch of two wikitext pages for infobox dates. No 429. Every proposed parent id exists on main.

Candidates queued in `agents/inbox/2026-11-24.md`: 16.

## Skipped

- News: no durable release since the last sweep.
- zsh, Btrfs, ext4, SSE and AVX, Signal Protocol, ICQ, SATA style interface follow ups: later runs can add them.
- Inkjet printing: its history has several competing firsts, so it needs more than one source.
- Garbage collection and JIT compilation: already covered in the Lisp and Rust facts. They could become nodes, but I did not research them this run.

## For a human

- MYCIN: Wikipedia says only "early 1970s". The entry leaves the year for the curator to settle or leave unset.
- MUD1: Wikipedia's history section says 1977, though 1978 is often cited. Marked medium.
- seL4 depends on Mach being added first. Its fallback parent is `minix`.
- OSPF and seL4 credit no people, because the articles credit no individual in the body.
- SETI@home's parent `beowulf` is loose. The tree has no distributed or volunteer computing node yet.
