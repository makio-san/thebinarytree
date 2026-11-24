# Lineage curator, 2026-11-23 (second run)

Branch `agents/lineage-curator-2026-11-23-2`, built on the unmerged `agents/tech-scout-2026-11-23-2` so its inbox is readable. 20 nodes and 1 group heading added, nothing skipped.

Inbox files processed, oldest first:

- `agents/inbox/2026-11-20-2.md`: all 9 entries. No curator run had touched it (the 2026-11-21 curator report says so). Moved to `done/`.
- `agents/inbox/2026-11-23-2.md`: 11 of 14 entries, to stay near the 20 per run limit. Markdown, WebKit and Tor are left in the inbox for the next run, not skipped. The 11 are in `done/2026-11-23-2.md`.
- `agents/inbox/2026-11-22.md` was left alone: it is processed on the rejected `agents/lineage-curator-2026-11-22`, which is the branch fixer's to repair. Redoing it here would duplicate those nodes.

## Added

Every fact was re-checked against the Wikipedia article (API, batched where possible, 5 seconds between requests). One request (WordStar) got a 429; it was retried once after the wait, with no workaround. Non Wikipedia sources opened: the Samsung newsroom release of 30 June 2022, the EuroHPC JUPITER inauguration page, The Register on JUPITER, the Quantinuum Helios announcement of 5 November 2025, PEP 703 and What's New in Python 3.13. All 20 Wikipedia titles resolve directly, with no redirects.

| Node | Parent | Year |
| --- | --- | --- |
| `buses` (group, Buses and Interconnects) | `peripherals` | |
| `pci` | `buses` | 1992 |
| `pci-express` | `pci` | 2003 |
| `cxl` | `pci-express` | 2019 |
| `usb` | `buses` | 1996 |
| `gaafet` | `finfet` | 2022 |
| `jupiter` | `supercomputers` | 2025 |
| `quantinuum-helios` | `quantum` | 2025 |
| `free-threaded-cpython` | `python` | 2024 |
| `qwen` | `llm` | 2023 |
| `delay-line-memory` | `components` | 1944 |
| `williams-tube` | `components` | 1947 |
| `eprom` | `components` | 1971 |
| `drum-memory` | `storage` | 1932 |
| `tomasulo-algorithm` | `system-360` | 1967 |
| `mmx` | `pentium` | 1997 |
| `bash` | `bourne-shell` | 1989 |
| `zfs` | `solaris` | 2005 |
| `bravo` | `xerox-alto` | 1974 |
| `microsoft-word` | `bravo` | 1983 |
| `wordstar` | `editors` | 1978 |

Titles and creators are in new `Scout inboxes 2026-11-20 (second run) and 2026-11-23 (second run)` sections at the end of `WIKI_TITLES` and `CREATORS`. No portraits touched.

## Changes from the inbox

- Buses and Interconnects: created the group the scout proposed, under Input, Output, and Storage. PCI, PCI Express and CXL form one line; USB sits beside them.
- PCI Express: no creators entry. The inbox named Intel, Dell, HP and IBM, but the Intel press release returned 403 and the Wikipedia article does not name them. Year 2003 is the article's invent date (version 1.0a).
- PCI: year 1992 is the article infobox's invent date (22 June 1992); the prose only says work began around 1990.
- USB: credited to Ajay Bhatt, as the article says he and his team worked on the standard at Intel. The seven companies are named in the summary instead.
- GAAFET: the Intel 18A and Core Ultra Series 3 half of the inbox summary is dropped, since its source was not opened. The summary says "initial production", as the Samsung release does. No creators entry (a company).
- JUPITER: "first outside the United States" dropped; no opened source says it. The 24,000 GH200 figure is from the EuroHPC page.
- Quantinuum Helios: fidelity numbers left out; the summary says Quantinuum reports them. Titled to the company article, as there is no Helios article.
- Free-threaded CPython: "officially supported in later releases" dropped; only the 3.13 docs were opened. Date is the 3.13 release, 7 October 2024.
- Qwen: the "most used base worldwide" claim is softened to what the article says, a common starting point for fine tuned models.
- Delay-line memory: dated 1944, when the article says Eckert developed it for computer memory, not 1949 (EDSAC) as the inbox had. EDSAC's 16 lines are in the summary.
- Williams tube: dated 1947 as the inbox said; the article gives patent filings in December 1946 and October 1947 and says the Baby was built to test it. Creator spelled `Frederic Williams`, matching the existing Manchester entries.
- Drum memory: the IBM 650 example is dropped, the article lead does not name it.
- EPROM: the "leads to flash memory" claim is dropped, the article lead does not make it. It sits beside Flash Memory, not above it.
- ZFS: "checksums every block" dropped, not in the article lead. Dated 2005 (OpenSolaris release); the 2006 Solaris 10 6/06 release is in the summary.
- WordStar: 1978 is the year of WordStar 1.0 in the article's version list; MicroPro began selling it in June 1979.

## Checks

`tsc --noEmit` clean, `vitest run` 131 of 131 passed. No em or en dashes in prose.

## For a human

- Free-threaded CPython and Quantinuum Helios link to broader articles (Global interpreter lock, Quantinuum), so their cards show those articles' pictures.
- `Bill Moore` (ZFS) is a common name; the portrait agent should check it does not resolve to someone else.
- The rejected `agents/lineage-curator-2026-11-21` put SCSI, Serial ATA, FireWire, HDMI and Thunderbolt under fallback parents because no bus group existed. If both branches land, those could move into `buses`.
