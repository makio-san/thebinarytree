branch: agents/lineage-curator-2026-11-28-2
reviewed-head: 684a9f0628e1b323c9a680789beb2118a8fb66aa
verdict: approve

## Reasons

Adds sixteen nodes (Snowflake, Apache Iceberg, Apache Flink, Caffe, ONNX, LangChain, OpenMP, BeagleBoard, KaiOS, Zephyr, GNU Guix, Apache Maven, Gradle, ESLint, RDRAND, Microsoft HoloLens) with Wikipedia titles and creators, and files the processed inbox entries into `agents/inbox/done/`. It is built on `agents/tech-scout-2026-11-28-2` (approved in this run) and merges in `agents/lineage-curator-2026-11-28` (approved this morning for `c389356`), so the whole diff against `main` is those two plus commit `b1f9e61` and the report.

## Checked

- At the tip: `tsc --noEmit` clean, `vitest run` 161 of 161 passed, demo build ok, in a throwaway worktree.
- On the merged result with `main` `02eebb0f7b8793a54b56cac3aef7cd79a6f3cad1` (`git merge-tree --write-tree` exits 0): `tsc --noEmit` clean and `vitest run` 161 of 161, including the layout precision test that has blocked other stacked runs. The same holds for `agents/lineage-curator-2026-11-28` merged on its own.
- All seven commits by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no Claude trailer or co-author, no em or en dashes in the changed files, no stray files. The two deleted inbox files are the ones the approved first curator run moved to `done/`.
- Facts opened on Wikipedia on 2026-11-28: Snowflake (founders Dageville, Cruanes and Żukowski, 23 July 2012, San Mateo), ESLint (Zakas, 30 June 2013), Gradle (21 April 2008, the seven developers in `creators.ts` match the infobox), Zephyr (26 July 2016, Linux Foundation and Wind River), Microsoft HoloLens (Development Edition 30 March 2016, 3,000 dollars), BeagleBoard (introduced 28 July 2008), RDRAND (Intel around 2012 in Ivy Bridge, AMD June 2015), KaiOS (2017, KaiOS Technologies, Hong Kong). All match.
- Parents printed from the merged tree: no new node is older than its parent (RDRAND 2012 under Intel Core i 2008, Gradle 2008 under Maven 2004, ONNX 2017 under PyTorch 2016, HoloLens 2016 under Kinect 2010).

## For a human

- Loose parents, as the curator says: KaiOS under Firefox the browser (there is no Firefox OS node), Zephyr under the Linux Foundation as host, BeagleBoard and OpenMP in groups. None is wrong; a real time systems group would be a better home for Zephyr.
- This branch contains `agents/lineage-curator-2026-11-28` and `agents/tech-scout-2026-11-28-2`; merging this tip brings all three in.
