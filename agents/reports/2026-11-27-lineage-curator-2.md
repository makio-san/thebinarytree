# Lineage curator, 2026-11-27 (second run)

Branch `agents/lineage-curator-2026-11-27-2`, built on the unmerged `agents/tech-scout-2026-11-27-2` so its inbox could be read. 9 nodes added, 2 entries skipped, 1 confirmed and queued. Type check clean and all 157 tests pass.

## Inbox files

- `agents/inbox/2026-11-27-2.md`: nine of twelve added and moved to `done/2026-11-27-2.md`. SHA-1 is queued, SimCity and Second Life are skipped, all three with notes in the inbox file.
- Left alone: every older inbox file. They are handled on the waiting `agents/lineage-curator-2026-11-27` branch, on older waiting curator or fixer branches, or have no honest parent (Minecraft).

## Added

Sources: one batched Wikipedia request for the intros of the 12 titles, one batched request for the wikitext of 8 articles five seconds later, the arXiv abstract page for Mamba (2312.00752, submitted 1 December 2023), and one final batched request to check the 9 stored titles. All returned 200, no 429. All 9 titles resolve without redirects.

| Node | Parent | Year |
| --- | --- | --- |
| `mvs` | `os-360` | 1974 |
| `pl-i` | `algol-60` | 1964 |
| `oberon` | `modula-2` | 1987 |
| `hack` | `rogue` | 1984 |
| `nethack` | `hack` | 1987 |
| `google-search` | `pagerank` | 1998 |
| `mpls` | `tcp-ip` | 2001 |
| `neovim` | `vim` | 2014 |
| `mamba` | `transformer` | 2023 |

Titles and creators are in a new `Scout inbox 2026-11-27 (second run)` section placed before the `2026-11-22, 2026-11-24 (second run) and 2026-11-25` section of `WIKI_TITLES` and `CREATORS`, not at the end, so it does not touch the lines the waiting `agents/lineage-curator-2026-11-27` appends to. For the same reason MPLS is the first child of `tcp-ip` (that branch appends NAT as the last one), and PL/I and Mamba are first children of their parents. No portraits touched.

## Changes from the inbox

- MVS: "the base that z/OS grew from" became the article's claim that MVS programs run on z/OS unchanged, through OS/390. No creators entry: the article names IBM only.
- PL/I: the summary follows the article's history (IBM and SHARE tried to extend Fortran, could not, and designed NPL based loosely on ALGOL; first definition April 1964, first compiler 1966). No creators entry: the article names a committee of IBM and SHARE members, no designers.
- Oberon: kept the scout's wording, from the article's lead.
- Hack: dated 1984, the Usenet release; begun in 1982 at Lincoln-Sudbury Regional High School. Credited to the five names the article gives.
- NetHack: credited to the NetHack Development Team. The scout's Mike Stephenson is not in the text I read, so he is left out.
- Google Search: "the main way people find things" became the article's claim that Google.com is the most visited website.
- MPLS: "now carries most carrier traffic engineering" became the article's "today more often used for traffic engineering ... and VPNs". The Ipsilon and Cisco origins and RFC 3031 (January 2001) are from the article. No creators entry.
- Neovim: "built in terminal" added from the article.
- Mamba: "started a family of state space and hybrid models" is dropped; the summary uses the abstract instead (no attention, linear scaling, Mamba-3B matching Transformers twice its size).

## Skipped

- SimCity and Second Life: both confirmed, but no honest parent, as with Minecraft and World of Warcraft in earlier runs. `games` holds hardware and techniques, and its top level holds only groups.

## Queued, not skipped

- SHA-1: confirmed (FIPS 180-1 in 1995, a revision of the withdrawn 1993 SHA-0, designed by the NSA, collision shown in 2017, NIST phase out by 2030). With all ten confirmed nodes in, the layout precision test failed (off by 7.6e-10 against a 5e-10 tolerance). I tried holding back each leaf node in turn: five single drops pass on this branch, but only dropping SHA-1 also passes when this branch is merged with `agents/lineage-curator-2026-11-27`. So SHA-1 waits in the inbox.

## For a human

- The layout precision test in `test/layout.test.ts` is again the limit on what a run can add, and which nodes pass is unpredictable. It still wants a `code-health` look.
- A trial apply of this branch's data onto `agents/lineage-curator-2026-11-27` (merged with `agents/tech-scout-2026-11-27-2`) applied without conflicts and passed the layout test. I did not trial the older waiting curator and fixer branches.
- This branch depends on `agents/tech-scout-2026-11-27-2`, which is not reviewed yet.
- Loose parents: Mamba under `transformer` (it is an alternative to attention, built on the S4 state space model, which the tree lacks), MPLS under `tcp-ip`, Google Search under `pagerank`.
