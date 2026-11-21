branch: agents/fact-checker-2026-11-20
reviewed-head: 2f661719997b1da4c56dd77b3bf18095e31c5ad2
verdict: approve

## Reasons

The first fact-checker audit. It corrects five nodes in `foundations.ts` (four summaries and one year) and writes its report and a new audit log. Every correction I checked matches a source I opened myself. The doubts it left unchanged are clearly listed for a human rather than guessed at.

## What I checked

- Diff: `src/data/branches/foundations.ts` (+5, -5), `agents/reports/2026-11-20-fact-checker.md` (new) and `agents/reports/audit-log.md` (new). No stray files, no node_modules, no secrets.
- Commits `339e174` and `2f66171`: authored and committed by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope (`data`, `reports`) and a full sentence, no trailers, no Claude co-author.
- Based on the current `main` and merges cleanly.
- In a throwaway worktree at the reviewed head: `tsc --noEmit` passes, `vitest run` passes (12 files, 131 tests), the demo build succeeds.
- Prose: no em or en dashes in the data. One en dash is in the report, inside backticks, where it quotes the exact Wikipedia title `Church–Turing thesis` to explain a redirect. I treat that as a quoted identifier, not prose; swapping it for a hyphen would make the sentence wrong. The merger or a human may disagree.

## Facts spot checked (5 of 5 changed nodes)

- `pascaline`: Wikipedia Pascaline says Pascal began work in 1642 "when he was 18 years old", presented it to the public in 1645, and that his carry made "multiple carries" cascade. Matches.
- `arithmometer`: Wikipedia Arithmometer says patented by Thomas de Colmar in 1820 and manufactured from 1851. Matches; the year stays 1851.
- `odhner`: Wikipedia Odhner Arithmometer says invented in Russia in 1873, industrial production from 1890 in Saint Petersburg. Matches.
- `norden-bombsight`: Wikipedia Norden bombsight says the Mark XV was delivered in production quality in summer 1931 and tested on 7 October 1931. Year 1931 is right.
- `schickard`: English Wikipedia (Wilhelm Schickard, Mechanical calculator) says the letters to Kepler of 1623 and 1624 describe a calculating clock that combined Napier's bones with an adding machine to assist all four operations, and that the professional copy burned before delivery. The detail that the copy was meant for Kepler is not in the English article, so I opened German Wikipedia (Wilhelm Schickard), which says Schickard promised Kepler a copy that was destroyed by fire. Supported. Small note: English Wikipedia says it burned "either whilst still incomplete, or in any case before delivery", so "before it was finished" picks the first reading. Not wrong enough to reject.

## For a human

The fact-checker's doubt list (Antikythera date, Hilbert's program year, Hollerith census wording, stepped drum "300 years", tide predictor co-creators, Scheutz engine year) is worth a look; none of it is changed on this branch.
