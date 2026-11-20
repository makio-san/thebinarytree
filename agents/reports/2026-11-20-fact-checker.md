# Fact-checker, 2026-11-20

First audit run, so no log existed. Slice: the whole `foundations` branch (`src/data/branches/foundations.ts`, 41 nodes including groups), with its entries in `creators.ts` and `wiki.ts`.

## Method

- Wikipedia titles: all 35 distinct titles in one batched `action=query` with `redirects=1` and the disambiguation page prop. All resolve to standard articles; none is a disambiguation page. `Church-Turing thesis` and `Pascal's calculator` redirect to `Church–Turing thesis` and `Pascaline`, which is fine.
- Facts: the lead extracts of all 35 articles in two batches, then the full text of Abacus, Slide rule, Wilhelm Schickard, Pascaline, Norden bombsight and Tabulating machine, one request every five seconds. No 429s.
- Tone: no em or en dashes and no marketing words in the branch. Every leaf has a summary.
- `tsc --noEmit` and `vitest run` (131 tests) pass.

## Fixed

| Node | Was | Now | Source |
| --- | --- | --- | --- |
| `schickard` | "built the first known mechanical calculator to handle all four operations. Its only copy was lost in a fire." | Described a calculating clock that paired an adding mechanism with rotating Napier rods to help with all four operations; the copy being built for Kepler burned before it was finished. The machine was never completed, and the stepped reckoner is the one Wikipedia calls the first to perform all four. | https://en.wikipedia.org/wiki/Wilhelm_Schickard |
| `pascaline` | "designed it at nineteen" | Began it at eighteen (1642), shown publicly in 1645. Carry claim reworded to match the source: the first calculator able to propagate multiple carries. | https://en.wikipedia.org/wiki/Pascaline |
| `arithmometer` | Year 1851 with no mention of the earlier date | Summary now says patented 1820, series production 1851 (year stays 1851, first shipped). | https://en.wikipedia.org/wiki/Arithmometer |
| `odhner` | Year 1890 with no mention of the earlier date | Summary now says invented in Saint Petersburg in 1873, production from 1890. | https://en.wikipedia.org/wiki/Odhner_Arithmometer |
| `norden-bombsight` | 1932 | 1931: the Mark XV was delivered in production quality in summer 1931 and tested in October 1931. | https://en.wikipedia.org/wiki/Norden_bombsight |

## Doubts, not changed

- `antikythera` year -100. Wikipedia's lead says built in the 2nd century BC; datings in the literature range from about 205 BC to the early 1st century BC. -100 sits at the edge of that range. A human should pick a date and source it.
- `hilbert-program` year 1928. Hilbert's program dates from the early 1920s; 1928 is the Entscheidungsproblem (Hilbert and Ackermann), which is what the summary actually describes. Either rename the node to the Entscheidungsproblem or move the year. Its Wikipedia title is `David Hilbert`, although an article `Hilbert's program` exists.
- `hollerith` "Cut the US census from years to months". The source says the 1880 census took eight years to process and the 1890 one finished months ahead of schedule, which is not the same as taking months. Suggest rewording; left as is because the processing time of the 1890 census was not in the article I opened.
- `stepped-reckoner` fact "The stepped drum stayed in use for 300 years". Wikipedia says used for 200 years, and into the 1970s with the Curta. 1673 to the 1970s is about 300 years, so the claim is defensible but disagrees with the source's wording.
- `tide-predictor` creators list only Kelvin. Wikipedia says the first machine was designed with Edward Roberts and built by Alexander Légé. Consider adding them.
- `scheutz-engine` year 1853 not verified: only the lead of `Per Georg Scheutz` was opened, which gives no date for the engine.

## Not checked

The rest of the tree. Next run should take another branch, for example `machines` or `processors`.
