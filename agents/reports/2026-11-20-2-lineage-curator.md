# Lineage curator, 2026-11-20 (second run)

## What I did

I branched from `agents/tech-scout-2026-11-20`, which is not merged yet, so I could read `agents/inbox/2026-11-20.md`. The morning run found no inbox because that scout branch had not landed yet.

I checked every entry against Wikipedia, using two batched API calls: one for the article intros and one for the infobox wikitext. Where the scout listed primary sources, I checked those too: RFC 1883 for the year and authors of IPv6, the Julia launch post for its date and authors, and duckdb.org for the lineage of DuckDB. All fifteen entries were confirmed. All fifteen Wikipedia titles resolve with no redirects.

Nodes added: 15.

| Node | Parent | Year | Creators |
| --- | --- | --- | --- |
| ActivityPub | web-platforms | 2018 | Lemmer-Webber, Tallon, Shepherd, Guy, Prodromou |
| Mastodon | activitypub | 2016 | Eugen Rochko |
| Bluesky | twitter | 2023 | none |
| IPv6 | tcp-ip | 1995 | Steve Deering, Robert Hinden |
| High Bandwidth Memory | dram | 2013 | none |
| NVM Express | ssd | 2011 | none |
| Apache Kafka | analytics | 2011 | Jay Kreps, Neha Narkhede, Jun Rao |
| DuckDB | column-store | 2019 | Mark Raasveldt, Hannes Mühleisen |
| Julia | scripting | 2012 | Bezanson, Karpinski, Shah, Edelman |
| systemd | linux | 2010 | Lennart Poettering, Kay Sievers |
| Wayland | linux | 2008 | Kristian Høgsberg |
| Steam | games | 2003 | none |
| Amazon Kindle | handhelds | 2007 | none |
| Claude | llm | 2023 | none |
| Gemini | llm | 2023 | none |

## Choices worth knowing

- The scout's notes left the co-creators of Kafka and systemd unconfirmed. The cited history sections on Wikipedia name Jay Kreps, Neha Narkhede and Jun Rao for Kafka, and Lennart Poettering with Kay Sievers for systemd, so I credited them.
- Mastodon sits under ActivityPub as the scout suggested, even though Mastodon is two years older. It started on OStatus and moved to ActivityPub later, and its summary says its servers "now" use ActivityPub.
- Social platforms use the kind `concept`, matching their siblings Twitter and Facebook. ActivityPub uses `network`.
- I dropped wording I could not back up. For Wayland, "Major Linux desktops" became "Fedora and other major distributions". DuckDB is "presented in 2019", after its SIGMOD 2019 paper, rather than "first released".
- I left `origin` out wherever I had not confirmed it.

## Skipped

None.

## For a human

- This branch builds on the unmerged `agents/tech-scout-2026-11-20`. Merge that branch first, or together with this one.
- A second tech-scout run (`agents/tech-scout-2026-11-20-2`) ran at the same time in the same checkout. While my edits were still uncommitted, it switched the folder to its own branch, so my first set of commits landed on that branch. They also picked up its untracked `agents/inbox/2026-11-20-2.md` and `agents/reports/2026-11-20-tech-scout-2.md`. That branch was local only and had not been pushed. I reset it to `14edaab`, where it started, and put both of its files back unchanged as untracked files. I then redid my work in a separate worktree, `/Users/esma/Developer/the-binary-tree-lc`. Please check that the scout's branch and push look right. Agents that share one working folder can collide like this again, so each agent should get its own worktree.
- Portraits for the new creators are left to the portrait agent.
