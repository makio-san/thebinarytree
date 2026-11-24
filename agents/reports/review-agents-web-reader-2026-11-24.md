branch: agents/web-reader-2026-11-24
reviewed-head: 9a64399505316b040df4cd3d8a7b863de79a2596
verdict: approve

## Why

The branch adds only `blog/2026-11-24-reading-list.md`, `agents/inbox/2026-11-24-web-reader.md` and its report, all allowed paths. Six short notes, each naming the author and the site and linking the original, in plain words with no hype.

## What passed

Type check (`tsc --noEmit`), tests (`vitest run`) and the demo build all pass in a throwaway worktree. Every commit is authored and committed by `makio-san <killbillbeatrixx@gmail.com>`, with Conventional Commit messages that have a scope and a sentence, no trailers, no co-authors. No em or en dashes in the added lines, no secrets, no stray files. The branch merges cleanly into `main` at `fa50624`.

142 of 142 tests pass (the branch is cut from a newer `main` that has the blog photo tests).

## Linked posts opened

- The Conversation, Doug Jacobson: the author and the title match. The one quote, "Java solved that headache with a clever piece of software called the Java Virtual Machine.", is in the article word for word, and the note names the licence (CC BY-ND 4.0, as listed in `agents/sources.md`). The rest of the note is in the reader's own words.
- Ladybird blog, Andreas Kling, 23 November 2026: the post says the engine is "our own, built from the ground up, and not a fork". The note says the same in its own words, with no copied text.
- Stalwart blog: the post does describe on-premises Exchange being wound down. No copied text.

The two IEEE Spectrum pieces and the O'Reilly Radar lecture were not opened; their notes carry no quotes.

## Photos

Both file pages read through the Commons API, and both pictures opened and looked at:

- `File:Alan Turing Aged 16.jpg`: licence Public domain, artist "Possibly Arthur Reginald Chaffin", described as a passport photo of Turing at 16. The credit matches. The picture is a young man in a suit and tie, as the alt text says.
- `File:Tim O'Reilly - 2017 (38700700672) (cropped).jpg`: licence CC BY 2.0, by Christopher Michel. The credit matches. The picture is a smiling man in a striped shirt, as the alt text says. The URL is the 960px thumbnail on `thumb.wikimedia.org`, exactly as the Commons API returns it, and that host is in `PHOTO_HOSTS`. It answered 200.

## Inbox entries

Each has a primary source besides the post that led to it, and I opened each one:

- Ladybird: Wikipedia says created inside SerenityOS in 2019, standalone since 2022 (spun off in September 2022 by Andreas Kling), alpha released in 2026. Matches.
- Microsoft Exchange Server: the Wikipedia infobox gives the release as 2 April 1996; first version 4.0, successor to Microsoft Mail; MAPI to clients, SMTP to other servers. Matches.
- Web 2.0: coined by Darcy DiNucci in 1999, popularised by Tim O'Reilly and Dale Dougherty at the first Web 2.0 Conference in 2004. Matches.

## For a human

Medium and Ars Technica refused the reader's fetches, so this first list has nothing from either. That is a limit of the sources, not of this branch.
