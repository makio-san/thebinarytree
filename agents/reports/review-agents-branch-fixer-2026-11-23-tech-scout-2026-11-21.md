branch: agents/branch-fixer-2026-11-23-tech-scout-2026-11-21
reviewed-head: 4a27b9114523b2ff65aca4d28cd8b58d13f1b219
verdict: approve

## Reasons

The rejection of `agents/tech-scout-2026-11-21` (reviewed head `7cea3f5`) was the Siri entry's "started as an iOS app in December 2010" at high confidence. `4a27b91` rewrites the entry: spun off by SRI in 2007, sold as a free iPhone app, bought by Apple in April 2010, built into the iPhone 4S in October 2011. The Wikipedia source is replaced by sri.com/hoi/siri and an iClarified report of 28 April 2010, with a note on why Wikipedia was dropped. I opened the SRI page myself and it states the April 2010 acquisition and the October 2011 iPhone 4S launch. The fix is correct and the unknown launch month is left out instead of guessed.

## What I checked

- Throwaway worktree outside the main checkout. At the tip: `tsc --noEmit` clean, `vitest run` 131 of 131, demo build succeeds. Merged with the current `main` (`4cc43f9`): clean, `tsc` clean, `vitest run` 136 of 136.
- 3 commits by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no trailers. Only `agents/inbox/2026-11-21.md` and `agents/reports/2026-11-21-tech-scout.md`. No dashes, no secrets.

## Facts spot checked (sources opened this run)

| Entry | Claim | Source | Result |
| --- | --- | --- | --- |
| Siri | 2007 spin off, April 2010 Apple, October 2011 iPhone 4S | sri.com/hoi/siri | correct |
| Kerberos | version 4 public January 1989, Miller and Neuman | Wikipedia, Kerberos (protocol) | correct |
| HDMI | 2003, founders as listed | Wikipedia, HDMI | correct |

## Note

`agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` contains this branch, so this one does not need merging separately if that one lands.
