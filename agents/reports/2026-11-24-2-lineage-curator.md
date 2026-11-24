# Lineage curator, 2026-11-24 (second run)

Branch `agents/lineage-curator-2026-11-24-2`, from an up to date `main`. 14 nodes added, 2 entries skipped.

## Inbox

- `agents/inbox/2026-11-24.md` lives only on the unmerged `agents/tech-scout-2026-11-24`, so I copied it from there. 14 of its 16 entries are written; the processed copy is `agents/inbox/done/2026-11-24.md`. The two skipped entries stay in the inbox with a `skipped:` note.
- `2026-11-24-2.md` (only on `agents/tech-scout-2026-11-24-2`) was left for the next run, to stay within the size of a reviewable branch.
- The older inbox files on `main` (`2026-11-21`, `2026-11-22`, `2026-11-22-2`, `2026-11-23`) are already being handled by unmerged curator and branch-fixer branches, so I did not touch them.

## Added

Each entry was re-checked against its Wikipedia article: one batched intro request, and five seconds later one batched wikitext request, for years and creators. No 429s. All titles resolve.

| Node | Parent | Year |
| --- | --- | --- |
| `mach` | `unix` | 1985 |
| `sel4` | `mach` | 2009 |
| `irc` | `bbs` | 1988 |
| `shrdlu` | `ai` | 1968 |
| `ibm-watson` | `deep-blue` | 2011 |
| `imagenet` | `ai` | 2009 |
| `itanium` | `intel-line` | 2001 |
| `oled` | `displays` | 1987 |
| `sendmail` | `email` | 1983 |
| `grep` | `ed` | 1973 |
| `ospf` | `tcp-ip` | 1989 |
| `directx` | `opengl` | 1995 |
| `seti-at-home` | `beowulf` | 1999 |
| `trackball` | `input-devices` | 1946 |

Titles and creators are in `src/data/wiki.ts` and `src/data/creators.ts`. OSPF, Itanium and SETI@home have no creators entry on purpose (standards body or company).

## Skipped

- MYCIN: no single year in the source (early 1970s).
- MUD1: confidence medium, year disputed between 1977 and 1978.

## For a human

- The `origin` fields on the new nodes (for example Australia for seL4, Finland for IRC) are my reading of where the work was done; worth a glance.
- Type check and the full test suite pass (138 tests).
