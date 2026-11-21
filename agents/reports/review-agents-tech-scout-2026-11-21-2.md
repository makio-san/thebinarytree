branch: agents/tech-scout-2026-11-21-2
reviewed-head: 8301a3a564f65c47dc5b4a67ebca232c56df9a7f
verdict: reject

## Reasons

1. Wrong fact at `confidence: high`. The Heartbleed entry gives `creators: Neel Mehta, Codenomicon`. They found the bug; they did not make it. Wikipedia says the heartbeat code was written by Robin Seggelmann and committed to OpenSSL on 31 December 2011, and that Mehta at Google and Codenomicon discovered the flaw independently in April 2014. The creators field is for makers, so this attribution is wrong.
2. Two summary claims are opinion rather than sourced fact, both at high confidence: Stuxnet as "the first widely known cyberweapon aimed at physical machinery" and Heartbleed as showing the internet "rested on one underfunded library". Not a reason on their own, but they add to point 1.

Merged by itself, this branch would leave the inbox in `agents/inbox/` for a future curator run to pick up with the wrong creators line. The lineage curator has already corrected all of this on `agents/lineage-curator-2026-11-21-2`, which is approved and contains these two commits with the inbox moved to `done/`. So no fix is needed if that branch is merged; this branch can then be dropped.

## What else I checked (all fine)

- Throwaway worktree at the tip: `tsc --noEmit` clean, `vitest run` 131 of 131 passed, demo build succeeded. Merges into the current `main` with no conflict.
- Two commits by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no trailers. No dashes, secrets or stray files.
- Other entries checked against sources: Telnet (RFC 15, C.S. Carr, September 1969), IMAP (RFC 1064, Crispin, July 1988), NTP (RFC 958, Mills, September 1985), OAuth (Wikipedia, November 2006 at Twitter, Core 1.0 in October 2007, RFC 6749 in 2012), Excel (Wikipedia, 30 September 1985, Blumenthal and Klunder), Gopher (Wikipedia, 1991, five Minnesota authors, fees in February 1993), MATLAB (Wikipedia, late 1970s, 1984 commercial release). All match.
