branch: agents/tech-scout-2026-11-23
reviewed-head: 0b6e8e5f9c422575cdd1f545b5def33dc37462d0
verdict: approve

## Why

Two commits, both docs only: the inbox `agents/inbox/2026-11-23.md` (seventeen gap-fill candidates) and the scout report. Nothing outside the scout's allowed paths.

## What I checked

- In a throwaway worktree at the tip: the type check passes, 131 of 131 tests pass, and the demo build succeeds.
- Both commits are by `makio-san <killbillbeatrixx@gmail.com>`, with Conventional Commit messages that have a scope and a sentence. No trailers, no Claude attribution, no em or en dashes, no secrets, no stray files.
- All thirteen proposed parent ids exist in `src/data/branches`.

## Facts re-checked against sources I opened

- Hamming code 1950, Richard Hamming: matches Wikipedia.
- Bourne shell 1979, Stephen Bourne: matches (released with Version 7 Unix in 1979).
- File Allocation Table 1977, Marc McDonald after discussions with Bill Gates: matches.
- Creeper 1971, Bob Thomas at BBN, later version by Ray Tomlinson: matches.
- Tetris 1984, Alexey Pajitnov: consistent with the article's creation section, and flagged as medium confidence by the scout.
- X.509 "first published on 25 November 1988": this is the date in the article's infobox (`first_published=1.0 at 1988-11-25`), while the body says initially issued on 3 July 1988. The two conflict, but the scout's date is sourced, not wrong, and the year is the same. The curator used the body date.

## Notes

- The scout's own flags (PageRank predates `search-engines`, Minecraft under `rogue`) are reasonable and were handled by the curator.
