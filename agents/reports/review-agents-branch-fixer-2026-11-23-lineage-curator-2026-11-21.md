branch: agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21
reviewed-head: 4f88415692cdbf3117441e3c95835a545afdceb1
verdict: approve

## Reasons

Every reason in the rejection of `agents/lineage-curator-2026-11-21` (reviewed head `d2458332`) is dealt with:

1. Siri date. `77434e8` changes the `siri` summary in `src/data/branches/mobile.ts` to "spun off from SRI International in 2007, sold as a free iPhone app, bought by Apple in April 2010 and built into the iPhone 4S in October 2011". I opened sri.com/hoi/siri myself: it says Siri was spun off in 2007 and "In April 2010, Apple acquired Siri, and in October 2011, Siri was unveiled as an integrated feature of the Apple iPhone 4S." Correct. The app's launch month is left out, which is right, since the Wikipedia article still contradicts itself (December 2010 app, then an April 2011 acquisition).
2. Stray file. `4f88415` removes `agents/inbox/2026-11-20-2.md`. The diff against `main` no longer touches that path, so `main`'s copy is kept. The misleading message of `d2458332` stays in history, which cannot be changed without a rewrite; the content is now right, so I accept it.
3. Rejected base. `93af109` merges `agents/branch-fixer-2026-11-23-tech-scout-2026-11-21`, which I approve in this run.

## What I checked

- Throwaway worktree outside the main checkout. At the tip: `tsc --noEmit` clean, `vitest run` 131 of 131, demo build succeeds. The branch is 56 commits behind `main`; merged with the current `main` (`4cc43f9`) in the worktree it merges cleanly, `tsc` is clean and `vitest run` passes 136 of 136.
- 11 commits ahead of `main`, all authored and committed by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no trailers or Claude lines. No em or en dashes, no secrets, no node_modules, no stray files. Paths: `agents/inbox/done`, `agents/reports`, `src/data/branches/*`, `src/data/creators.ts`, `src/data/wiki.ts`.

## Facts spot checked (sources opened this run)

| Node | Claim | Source | Result |
| --- | --- | --- | --- |
| siri | SRI spin off 2007, Apple April 2010, iPhone 4S October 2011 | sri.com/hoi/siri | correct |
| kerberos | MIT Project Athena, Needham and Schroeder, version 4 public January 1989, Miller and Neuman | Wikipedia, Kerberos (protocol) | correct (24 January 1989) |
| hdmi | founders Hitachi, Panasonic, Sanyo, Philips, Silicon Image, Sony, Thomson, Toshiba | Wikipedia, HDMI | correct |
| eliza | Joseph Weizenbaum, MIT, 1966 | Wikipedia, ELIZA (developed 1964 to 1967) | correct |
| turing-test | imitation game, "Computing Machinery and Intelligence", 1950 | Wikipedia, Turing test | correct |

## Notes

- This branch contains `agents/branch-fixer-2026-11-23-tech-scout-2026-11-21`. Merging this one brings in both.
- The fixer's report for this branch is on `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-22`, not here.
- The earlier small note (some `creators.ts` and `wiki.ts` lines sitting above the next section comment) is still open; not a reason to reject.
