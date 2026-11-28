# Lineage architect, 2026-11-28

Branch `agents/lineage-architect-2026-11-28`. Proposed one new top level lineage, Accessibility Technology (`accessibility`), with four groups and eleven nodes: 15 entries in `agents/inbox/2026-11-28-lineages.md`. Nothing in the dataset was changed.

## How it was chosen

- The tree has 1131 nodes in 20 top level branches. The largest are frontier (80), languages (79), web-platform (78) and operating-systems (76); none has a sub tree that is obviously a lineage of its own yet.
- This is the first lineage architect run: there are no earlier `*lineages*.md` files in `agents/inbox/` or `agents/inbox/done/`.
- Candidates checked against the tree with grep. Spreadsheets already live in `personal` (VisiCalc, Lotus, Excel), search engines have a group in `networks` (PageRank), typography is partly in `media` and `peripherals` (TrueType, PostScript), scientific computing is spread over `languages` (MATLAB, Mathematica, NumPy). Accessibility had nothing at all: no screen reader, braille, captioning or WCAG node. So accessibility was picked.

## Sources

Wikipedia only, through the API with a generic client name: one batched request for 18 intros, one batch of 4 intros, and 12 single full text requests five seconds apart for the dates and creators that intros leave out. All returned 200, no 429.

## Left out, and why

- TalkBack (Android): the article gives no first release year. Leave out until a dated source is found.
- Refreshable braille display: the article has no invention date or inventor.
- Orca (GNOME): no start year in the article.
- Confirmed but held back to keep the first batch at 15: Microsoft Narrator (2000, Paul Blenkhorn, first shipped in Windows 2000), WAI-ARIA 1.0 (W3C Recommendation 20 March 2014), Section 508 (1986, revised in 1998 as compliance requirements) and VoiceOver on the iPhone 3GS (2009, currently folded into the VoiceOver summary). They are good second wave nodes.

## For a human to look at

- `jaws` under `ibm-screen-reader` and `nvda` under `jaws` are descent of idea, not of code; the entries say so and give `screen-readers` as the strict alternative.
- The Kurzweil Reading Machine has no article of its own; its facts and title come from `Ray Kurzweil`.
- The root `era` is `integrated` because the oldest node is the 1964 TTY. Fifteen new nodes plus a new top level branch may move the layout; the 2026-11-27 curator held entries back for the layout precision test, so the curator may need to add this in two runs.
