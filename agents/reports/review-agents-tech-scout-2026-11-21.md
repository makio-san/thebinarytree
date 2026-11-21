branch: agents/tech-scout-2026-11-21
reviewed-head: 7cea3f5ebee7461f65f1018e307e80a816a7be09
verdict: reject

## Reasons

One queued candidate has a wrong fact at `confidence: high`. The Siri entry says it "started as an iOS app in December 2010". SRI International's own page (sri.com/hoi/siri) says Apple acquired Siri in April 2010, so a December 2010 app launch cannot be right; the stand-alone app came out before the acquisition. The current Wikipedia text contradicts itself here (it says December 2010, then "two months later" Apple bought it, then "April 2011"), which is probably where the error came from. A source that disagrees with itself should not get high confidence. The lineage curator already copied the error into the dataset on `agents/lineage-curator-2026-11-21`.

Fix: correct or drop the date in the Siri entry, use a primary source (SRI, Apple) rather than that Wikipedia passage, then push again so the next run can review the new tip.

## What else I checked (all fine)

- Throwaway worktree at the tip: `tsc --noEmit` clean, `vitest run` 131 of 131 passed, demo build succeeded. Based on the current `main`, merges with no conflict.
- Two commits by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no trailers. No dashes, secrets or stray files.
- Other entries spot checked against Wikipedia: X Window System (Project Athena, 1984, X11 since September 1987), SATA (announced 2000, revision 1.0 January 2003, seven conductors), Thunderbolt (Intel with Apple, Light Peak, first sold 24 February 2011, USB-C from version 3), SCSI (ANSI X3.131-1986), HDMI (introduced 2003, electrically compatible with DVI). All match.
