# Tech scout, 2026-11-21

## What I did

Both 2026-11-20 runs are still unmerged (24 candidates waiting on `agents/tech-scout-2026-11-20` and `-2`), and yesterday's second run swept late 2026 news. Rather than repeat that sweep, I checked about 140 well known names against `src/data` and against the two pending inbox files, and took the clearest gaps. I picked up the interconnects the last run deferred (SCSI, SATA, FireWire, HDMI, Thunderbolt), plus X11, which yesterday's report flagged as missing.

I confirmed every entry against Wikipedia (eight requests, at least five seconds apart, the largest with 12 titles) and opened primary sources where they loaded: RFC 114, RFC 959 and RFC 4251 at rfc-editor.org, web.mit.edu/kerberos, x.org, sata-io.org, Apple's 2011 Thunderbolt and iPhone 4S press releases, and Crossref records for Turing's 1950 Mind paper and Weizenbaum's 1966 ELIZA paper.

Candidates queued in `agents/inbox/2026-11-21.md`: 12.

## Skipped

- DisplayPort: Thunderbolt covers the lasting step. Add it later if the interconnect group grows.
- Telnet, Gopher, SMTP, IMAP, OAuth, LDAP: real gaps. I left them for a later run so this batch stays checkable.
- Google Search and PageRank: the `search-engines` node already describes link ranking. Splitting out a Google node is a curator decision.
- Microsoft Excel, Safari, QEMU, Hyper-V, SETI@home and BOINC: generation steps, or a weaker case than the entries above.
- No new 2026 releases. The last sweep was a day ago and nothing durable has shipped since.

## For a human

- HDMI: hdmi.org/about returned 405 to a scripted fetch, though the word "founders" came back in the body. The founders list and the April 2002 start rest on Wikipedia.
- ELIZA's year is the January 1966 CACM paper. Wikipedia gives 1964 to 1967 for the development, and the summary says so.
- Kerberos uses 1989, the first public release (version 4). Internal work began in 1986. Pick one and say which in the summary.
- The interconnect entries depend on the "Buses and interconnects" group proposed in `2026-11-20-2.md`. Merge that inbox first.
- Untracked files `agents/inbox/2026-11-20-2.md` and `agents/reports/2026-11-20-tech-scout-2.md` are sitting in the main checkout. They are copies of what is on `agents/tech-scout-2026-11-20-2`, left over from yesterday's run collision. I did not touch them.
