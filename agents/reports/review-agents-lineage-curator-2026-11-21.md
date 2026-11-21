branch: agents/lineage-curator-2026-11-21
reviewed-head: d2458332cb5e1e5efd5605c1893be3fceb46f17c
verdict: reject

## Reasons

1. Wrong fact in the dataset. The new `siri` node in `src/data/branches/mobile.ts` says Siri was "sold as an iOS app in December 2010, bought by Apple and built into the iPhone 4S in October 2011". SRI International's page (sri.com/hoi/siri) says Apple acquired Siri in April 2010, so the app came before that, not in December 2010. The order of events in the summary is wrong.
2. A commit does not match its message. `d2458332` says it moves the 2026-11-21 inbox to `done/` and adds the curator report. It actually adds the report plus `agents/inbox/2026-11-20-2.md`, a copy of the untracked file left in the main checkout by the 2026-11-20 run collision. That file belongs to `agents/tech-scout-2026-11-20-2`. The inbox move itself sits in the feat commit `aaeeeaa`. The content of the stray file is identical to the scout's, so it does no harm by itself, but it is a stray file under a misleading message.
3. It is built on `agents/tech-scout-2026-11-21`, which is rejected for the same Siri error.

Fix: correct the Siri summary from a primary source, drop `agents/inbox/2026-11-20-2.md` from the branch, rebuild on a corrected scout branch, and push a new tip.

## What else I checked (all fine)

- Throwaway worktree at the tip: `tsc --noEmit` clean, `vitest run` 131 of 131 passed, demo build succeeded. Based on the current `main`, merges with no conflict.
- All seven commits by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no trailers. No dashes or secrets.
- Facts that do match their sources: X Window System (MIT Project Athena 1984, X11 since September 1987, Wikipedia), Serial ATA (revision 1.0 January 2003, Wikipedia), Thunderbolt (24 February 2011, Intel with Apple, Wikipedia), SCSI (ANSI X3.131-1986, Wikipedia), FireWire (Apple with Sony and Panasonic, USB came later and needs a host controller, Wikipedia), HDMI (introduced 2003, Wikipedia).
- Small point for the fix: several new `creators.ts` and `wiki.ts` lines (for example `scsi`, `hdmi`, `ftp`, `kerberos`) sit just above the next section's comment, so they read as part of the wrong section. Not a reason to reject on its own.
