branch: agents/web-reader-2026-11-26
reviewed-head: 0f14850bf678847aa44b16ce2c77cff4d555c3ae
verdict: approve

A reading list of five pieces, two photos and two inbox candidates.

## Checked

- 3 commits authored and committed as `makio-san <killbillbeatrixx@gmail.com>`; Conventional Commits with a scope and a sentence; no Claude trailer or co-author; no em or en dashes.
- Paths: `blog/2026-11-26-reading-list.md`, `agents/inbox/2026-11-26-web-reader.md` and `agents/reports/2026-11-26-web-reader.md`, nothing else.
- Branch tip, which is also the merged result (merge base is the current `main`): clean merge, `tsc --noEmit` clean, vitest 153 of 153 (the list adds five cases, the age test among them), demo build ok.
- The six `node:` links (`cuda`, `alexnet`, `transformer`, `complexity-theory`, `cook-levin`, `dns`) all exist on `main`.

## Posts

All five linked posts were opened in this run, not two. Each byline day is the day in the list and falls inside the seven days before 26 November:

- The Conversation, Jeffrey Young: page says published November 24, 2026. The summary's CUDA 2007, AlexNet 2012 and transformer steps are in the piece. The quoted sentence is in it word for word.
- Computational Complexity, Lance Fortnow: dated Tuesday, November 24, 2026. The summary matches the post: permanent against determinant, the Anthropic proof, and the closing section on what it does not say about P and NP.
- Shtetl-Optimized, Scott Aaronson: posted Tuesday, November 24th, 2026. The two proofs, the diagonalization remark and the minimum spanning tree preprint whose authors credit an AI model are all in the post.
- The Conversation, David Manderscheid: published November 24, 2026. The 45 years, the 250,000 pages, compressed sensing in MRI and the quoted words are in the piece, word for word.
- Quad9 blog: dated November 24, 2026. The post names a sports rights holder, says the courts upheld its demands, and says its own location of users by IP is imprecise and will block some by mistake and miss others.

Summaries are short and in their own words, each names the author and the site and links the original. The two quotes are from The Conversation, an open licence source in `agents/sources.md`, and each names CC BY-ND 4.0. The three link only sources are not quoted.

## Photos

Both file pages were read through the Commons API and both pictures were looked at:

- `File:VisionTek GeForce 256.jpg`: public domain, author Hyins. The credit matches. The picture is a graphics card with a small fan over its chip, as the alt text says.
- `File:Leslie Valiant (34913684313).jpg`: CC BY 2.0, Dennis Hamilton. The credit matches. The picture is a man speaking at a lectern, and the file page describes it as Valiant giving a talk.

## Inbox

- Lean: Wikipedia gives launched in 2013, Leonardo de Moura at Microsoft Research, Lean 4 released in 2021. Matches.
- Strassen algorithm: Wikipedia gives Volker Strassen, 1969. Matches.
- Both entries cite Wikipedia as a source besides the post that led to them, and both proposed parents (`ml`, `complexity-theory`) exist on `main`.

## Remarks, not blocking

- The Fortnow item says Valiant posed the question "in the late 1970s". Fortnow's post gives no date; the phrase is in Aaronson's post, which the list also links, and it is correct.
- Three of the five pieces report results that are two days old. The list reports what the authors say and no more. If a claim is withdrawn the list should be reread, as the author's report says.
