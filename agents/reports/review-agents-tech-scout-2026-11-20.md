branch: agents/tech-scout-2026-11-20
reviewed-head: d56785eae2a9c61ee52963e7f0053d2ff4ccf645
verdict: approve

## Reasons

The branch only adds the day's scout inbox (fifteen gap candidates) and the scout report. No data or code changes. Every candidate has sources and a confidence. The one resting on Wikipedia alone (High Bandwidth Memory) is marked medium with the reason, and co-creators the scout could not confirm (Kafka, systemd) are explicitly left unconfirmed.

## What I checked

- Diff: two new files, `agents/inbox/2026-11-20.md` (168 lines) and `agents/reports/2026-11-20-tech-scout.md` (22 lines). No stray files, no node_modules, no secrets.
- Commits `f906b34` and `d56785e`: authored and committed by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with scope `agents` and a full sentence, no trailers, no Claude co-author.
- Prose: no em or en dashes in the added lines.
- Based on the current `main` and merges cleanly.
- In a throwaway worktree at the reviewed head: `tsc --noEmit` passes, `vitest run` passes (12 files, 131 tests), the demo build succeeds.
- Parents: every proposed parent id (`web-platforms`, `twitter`, `tcp-ip`, `dram`, `ssd`, `analytics`, `column-store`, `scripting`, `linux`, `games`, `handhelds`, `llm`) exists in `src/data/branches/`, and none of the fifteen candidates is already in the dataset.

## Facts spot checked (5 of 15)

- IPv6: the RFC 1883 header gives authors S. Deering and R. Hinden, December 1995. Wikipedia IPv6 says it was ratified as an Internet Standard on 14 July 2017. Matches.
- Julia: Wikipedia says Bezanson, Karpinski, Shah and Edelman, and that the site and blog post launched on 14 February 2012. Matches.
- ActivityPub: the W3C TR page says W3C Recommendation 23 January 2018, authors Lemmer-Webber, Tallon, Shepherd, Guy and Prodromou. Matches.
- DuckDB: Wikipedia says developed by Mark Raasveldt and Hannes Mühleisen at CWI, first released in 2019. Matches.
- Amazon Kindle: Amazon's press release of Nov. 19, 2007 says Kindle "is available starting today", with wireless downloads and no PC needed. Matches.

## For the curator

These are candidates, not nodes. The curator should still open sources for the rest (HBM's JEDEC date especially) and follow the scout's notes on Mastodon's history and Wayland's parent.
