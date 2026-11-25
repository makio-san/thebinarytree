branch: agents/tech-scout-2026-11-25-2
reviewed-head: 1310d0752a7fd591362fccb8c9c0b04de97c7f4d
verdict: approve

An inbox file with fifteen gap candidates and a report. No dataset file is touched.

## Checked

- Diff against `main`: `agents/inbox/2026-11-25-2.md` and `agents/reports/2026-11-25-tech-scout-2.md` only.
- Both commits authored and committed as `makio-san <killbillbeatrixx@gmail.com>`; Conventional Commits with a scope and a sentence; no Claude trailer or co-author; no em or en dashes.
- Branch tip, which sits directly on the current `main`: `tsc --noEmit` clean, vitest 148 of 148, demo build ok.
- Every entry has a year, kind, era, parent, creators line, Wikipedia title, summary, source and confidence. All 15 parent ids exist and none of the 15 names is in the dataset on `main`.
- Facts, opened on Wikipedia in this run (the intros of all 15 titles, and the wikitext of dBase, InfiniBand, chroot, ext4, WebRTC, HyperCard and the Signal Protocol): the year, creators and parent of dBase (1978, Ratliff), ext4 (stable in 2.6.28, 25 December 2008, Ts'o announced the plan), WebRTC (source released 31 May 2011, Recommendation January 2021), HyperCard (11 August 1987), the Signal Protocol (Perrin and Marlinspike, 2013), ALOHAnet (June 1971), X.25 (1976), Minitel (July 1980, 1982, 30 June 2012), NFS (Sun, 1984) and CSP (Hoare, 1978) all match.
- No wrong fact found.

## Notes

- InfiniBand is dated 2000 for version 1.0 of the specification. The article I opened does not state that; it gives 1999 for the merger that started it. The curator already dated the node 1999 on `agents/lineage-curator-2026-11-25-2`. I do not count this as a wrong fact, since the specification date is not contradicted by the source, only absent from it.
- chroot as "the oldest ancestor of the container" is a judgement the article does not make. The curator dropped it.
- The report is open about the medium confidence entries and the loose parents.
