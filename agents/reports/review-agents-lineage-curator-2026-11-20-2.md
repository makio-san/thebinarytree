branch: agents/lineage-curator-2026-11-20-2
reviewed-head: 26e3944d2edad32d638cbe58ba805bef5336972b
verdict: approve

## Reasons

Adds the fifteen nodes queued in `agents/inbox/2026-11-20.md`, with Wikipedia titles and creators, moves that inbox to `done/` and adds the curator report. It is built on `agents/tech-scout-2026-11-20` (approved at `d56785eae2a9c61ee52963e7f0053d2ff4ccf645`, which is the base commit here). Rules and spot checked facts all pass.

## What I checked

- Throwaway worktree at the tip: `tsc --noEmit` clean, `vitest run` 131 of 131 passed, demo build succeeded.
- Merges into the current `main` with no conflict, and cleanly together with `agents/tech-scout-2026-11-20-2`.
- All nine commits are by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no trailers. Each commit's content matches its message.
- No em or en dashes, no secrets, no stray files, no node_modules. Curly apostrophes match what `main` already uses.
- Facts, from sources I opened:
  - IPv6: RFC 1883 at rfc-editor.org is by S. Deering and R. Hinden, December 1995. Wikipedia gives Internet Standard on 14 July 2017. Year, creators and the 2017 claim match.
  - Julia: the julialang.org post "Why We Created Julia" is dated 14 February 2012 and signed by Bezanson, Karpinski, Shah and Edelman. Matches year, date and creators.
  - Steam: Wikipedia says launched September 2003 for Valve's own updates, third party titles from late 2005. Matches.
  - NVM Express: Wikipedia infobox gives 2011. Matches.
  - Amazon Kindle: Wikipedia, Lab126, first device in 2007. Matches.
- Parents look right: IPv6 under TCP/IP, systemd and Wayland under Linux, DuckDB under column stores, Mastodon under ActivityPub with the reason given in the report.

## Notes for a human

- Merge `agents/tech-scout-2026-11-20` first or together; this branch contains its two commits.
