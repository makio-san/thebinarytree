# Lineage curator, 2026-11-23

Branch `agents/lineage-curator-2026-11-23`, built on the unmerged `agents/tech-scout-2026-11-23` so the inbox is readable. Processed `agents/inbox/2026-11-23.md`: 16 of 17 entries added, 1 skipped.

## Added

Every entry was re-checked against its Wikipedia article (fetched through the API, batched, 5 seconds between requests, no 429s). All 16 titles resolve; two resolve through the hyphen to en dash redirect, which is what the table wants.

| Node | Parent | Year |
| --- | --- | --- |
| `hamming-code` | `information-theory` | 1950 |
| `reed-solomon` | `hamming-code` | 1960 |
| `dijkstra-algorithm` | `theory` | 1956 |
| `quicksort` | `theory` | 1959 |
| `cooley-tukey-fft` | `theory` | 1965 |
| `monte-carlo` | `eniac` | 1946 |
| `pagerank` | `search-engines` | 1996 |
| `bourne-shell` | `research-unix-v6` | 1979 |
| `ntfs` | `windows-nt` | 1993 |
| `file-allocation-table` | `floppy-disk` | 1977 |
| `creeper` | `systems-security` | 1971 |
| `wannacry` | `systems-security` | 2017 |
| `x509` | `rsa` | 1988 |
| `mathematica` | `lisp` | 1988 |
| `tetris` | `early-games` | 1984 |
| `super-mario-bros` | `nes` | 1985 |

Titles and creators are in new `Scout inbox 2026-11-23` sections at the end of `wiki.ts` and `creators.ts`. No portraits touched.

## Changes from the inbox

- X.509: the inbox said first published on 25 November 1988. Wikipedia says initially issued on 3 July 1988. The summary says July 1988.
- NTFS: the inbox listed no creators. Wikipedia names the original developers Tom Miller, Gary Kimura, Brian Andrew and David Goebel; they are credited. Encryption and shadow copies came in later NTFS versions, so the summary says "over its versions".
- X.509 has no creators entry: the inbox named ITU-T, a standards body, and the creators table is people first.
- WannaCry has no creators entry (attribution to North Korea is a government claim, not a credit).
- The five algorithm and coding nodes use the `theory` era like every other node in the Theoretical Foundations branch, not the tube, transistor and integrated eras the inbox suggested.
- Reed-Solomon sits under the new Hamming code node, the inbox's alternative parent, so the error correcting codes read as one line.
- Super Mario Bros.: the inbox's "set the form of the platform game" is not in the article lead; the summary instead says World 1-1 was built as a tutorial and that it started the series, both sourced.

## Skipped

- Minecraft: year (17 May 2009 alpha) and creator confirmed, but the proposed parent `rogue` is not its lineage. Wikipedia credits Infiniminer and Persson's RubyDung (inspired by Dwarf Fortress). Neither is in the tree. Left in the inbox with a `skipped:` note.

## Checks

`tsc --noEmit` clean, `vitest run` 131 of 131 passed. No em or en dashes in prose.

## For a human

- Tetris is dated 1984, the start of the article's "Creation (1984 to 1985)" section; the article lead only says mid 1980s.
- Monte Carlo sits under ENIAC because the first automated runs were on it in 1948; the idea itself (1946) is a year after ENIAC, inside the ten year rule.
