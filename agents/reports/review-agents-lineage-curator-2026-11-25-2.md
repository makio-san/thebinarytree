branch: agents/lineage-curator-2026-11-25-2
reviewed-head: 9d07b7f18b3f1d652fd267e6d60026f6ceeb77cf
verdict: approve

16 nodes added. Built on `agents/tech-scout-2026-11-25-2`, whose two commits it contains; that branch is approved in this run too.

## Checked

- Whole diff against `main`: ten branch files, `wiki.ts`, `creators.ts`, two inbox files moved to `done/` and the two reports. No stray files, no secrets, no node_modules.
- All 5 commits authored and committed as `makio-san <killbillbeatrixx@gmail.com>`; Conventional Commits with a scope and a sentence; no Claude trailer or co-author; no em or en dashes in added lines.
- Branch tip: `tsc --noEmit` clean, vitest 148 of 148, demo build ok. The branch sits directly on the current `main`, so the tip is the merged result.
- All 14 parent ids exist and none of the 16 new ids was in the tree before.
- Inbox housekeeping: the fifteen entries of `2026-11-25-2.md` and the one entry of `2026-11-25-web-reader.md` are all nodes now. The curator did not go oldest first and says why (the older file is rewritten by a waiting branch); that is a fair reason.
- Facts, opened on Wikipedia in this run (one batched request for the intros of all 16 titles, one for the wikitext of eight):
  - dBase: one of the first database management systems for microcomputers and the most successful in its day, released as Vulcan for PTDOS in 1978, licensed by Ashton-Tate in 1980 and sold as dBASE II, written by Wayne Ratliff. Matches. The infobox says 1979, the intro says 1978; the node follows the intro.
  - InfiniBand: originated in 1999 from the merger of Future I/O and Next Generation I/O; most used interconnect on the TOP500 list between 2014 and June 2016. Matches.
  - chroot: introduced during development of Version 7 Unix in 1979; FreeBSD expanded the concept into the jail in its 4.0 release in 2000. Matches. Leaving Bill Joy out is right, the text only says one source suggests it.
  - ext4: Theodore Ts'o announced the plan on 28 June 2006, stable in Linux 2.6.28 released on 25 December 2008, Google chose it for Android 2.3. Matches.
  - WebRTC: infobox 2011, Google source code release of 31 May 2011, Global IP Solutions bought in May 2010, WebRTC 1.0 a W3C Recommendation in January 2021. Matches.
  - HyperCard: Bill Atkinson, Dan Winkler on HyperTalk from 1986, released on 11 August 1987, free with new Macs, flat file database. Matches.
  - Signal Protocol: started by Trevor Perrin and Moxie Marlinspike at Open Whisper Systems in 2013, introduced in TextSecure, adopted by WhatsApp, elliptic curve Diffie-Hellman handshake. Matches.
  - TSMC: established in 1987, founder Morris Chang, dedicated contract chipmaker supplying Nvidia and Qualcomm. Matches.
  - ALOHAnet (operational June 1971, first public demonstration of a wireless packet data network, resend without acknowledgement, later in Ethernet and Wi-Fi), X.25 (CCITT, 1976, public data networks, cash machines and card payments), Minitel (Saint-Malo July 1980, France 1982, ended 30 June 2012), NFS (Sun, 1984, every version after the first is an RFC), actor model (1973), CSP (Hoare, 1978 article, occam, Erlang, Go), Perlin noise (Ken Perlin, 1983), support vector machine (AT&T Bell Laboratories, kernel trick). All match the intros.
- No wrong fact found.

## Not re-verified from a page I opened

- The start of ALOHAnet in 1968 under Abramson and Kuo, the three names on the actor model, and the 1992 and 1995 papers on the support vector machine are in the article bodies, which I did not fetch. They agree with what I know of those articles and nothing in the intros contradicts them.

## For the merger and a human

- The branch merges cleanly into `main` today, but it conflicts with three other approved branches: with `agents/lineage-curator-2026-11-25` in `operating-systems.ts`, with `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2` in `frontier.ts`, and with `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` in `peripherals.ts`. Putting the side table sections elsewhere kept `wiki.ts` and `creators.ts` clear, as intended. Whichever data branch lands first, the others will need the branch fixer.
- Loose parents, all named by the curator: dBase under `relational`, WebRTC under `websocket`, InfiniBand under `beowulf`.
- It merges cleanly with `agents/portrait-finder-2026-11-25`.
