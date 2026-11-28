branch: agents/portrait-finder-2026-11-25
reviewed-head: 029fe891113023ea00b97327df31f9dc282896ce
verdict: approve

25 portrait entries added to `src/data/portraits.ts`. Each points at the right person's Wikipedia article, each name is a credited creator on `main`, each lead image is a picture of one person, and each face box lands on the face.

## Checked

- Diff against `main`: `src/data/portraits.ts` (+25 lines, in alphabetical order) and the agent's report. Nothing else.
- One commit, authored and committed as `makio-san <killbillbeatrixx@gmail.com>`, message `feat(data): add portraits for 25 more creators.` No trailer, no Claude co-author, no em or en dashes.
- Branch tip: `tsc --noEmit` clean, vitest 148 of 148, demo build ok. The branch is behind `main`; a trial merge with `main` (not committed) was clean, and type check, tests (148 of 148) and the demo build pass on the merged tree.
- All 25 names are spelled exactly as in `creators.ts` on `main`, so every entry is used: Samuel Morse and William Cooke (`electric-telegraph`), Stanislaw Ulam and Nicholas Metropolis (`monte-carlo`), Edsger W. Dijkstra (`dijkstra-algorithm`), Tony Hoare (`quicksort`), Kenneth E. Iverson (`apl`), Victor Scheinman (`stanford-arm`, `puma`), Charles H. Moore (`forth`), Dov Frohman (`eprom`), Charles Simonyi (`bravo`, `microsoft-word`), Stephen Bourne (`bourne-shell`), Mitch Kapor (`lotus-1-2-3`), Cleve Moler (`matlab`), Alexey Pajitnov (`tetris`), David L. Mills (`ntp`), Takashi Tezuka (`super-mario-bros`), Charles Goldfarb (`sgml`), Stephen Wolfram (`mathematica`), Brian Fox (`bash`), John Gilmore (`cypherpunks`), Irwin Jacobs (`cdma`), Ajay Bhatt (`usb`), Sepp Hochreiter and Jürgen Schmidhuber (`lstm`).
- Articles: all 25 titles checked in one batched Wikipedia API request (lead image, description, disambiguation flag). None redirects, none is a disambiguation page, and each description fits the credit: for example `Brian Fox (programmer)` is the American programmer, `John Gilmore (activist)` the American activist born 1955, `Irwin M. Jacobs` the founder of Qualcomm, `Stephen R. Bourne` the British computer scientist, `William Fothergill Cooke` the telegraph pioneer.
- Pictures: all 25 lead images downloaded at thumbnail size (two seconds apart, no 429) and looked at with the face box drawn on. Every one shows a single person and no machine, logo, signature alone or group. The Iverson file is a crop of a picture with a second person, and the crop shows one man only. The Cooke picture has his signature under a seated full length photograph; the box is on the face.
- Face boxes: all 25 sit on the face. The four the report calls small are small (Cooke, Scheinman, Bourne, Jacobs) but centred. Nothing is off by enough to show the wrong part of the picture.

## Notes

- The lead images are served by Wikipedia as free pictures; I did not open each Commons file page for its licence, as the dataset stores titles only and never copies the image.
- It merges cleanly with `agents/lineage-curator-2026-11-25-2`.
