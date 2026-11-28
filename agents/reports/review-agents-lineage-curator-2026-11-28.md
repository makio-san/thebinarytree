branch: agents/lineage-curator-2026-11-28
reviewed-head: c38935665230e15c91e00d40792b4cf87c7746bb
verdict: approve

## Reasons

Adds twenty nodes (RocksDB, Bloom filter, consistent hashing, the Euclidean algorithm, PyPI, Theano, Keras, GPT-3, llama.cpp, ESP32, THE multiprogramming system, Linux namespaces, ChromeOS, Inferno, TOPS-20, VxWorks, GNU Hurd, FreeRTOS, RISC OS and others) with Wikipedia titles and creators, and files the processed inbox entries into `agents/inbox/done/`. The branch is built on `agents/tech-scout-2026-11-28` and contains its two commits, reviewed separately and approved.

## Checked

- `tsc --noEmit` clean, `vitest run` 161 of 161 passed, demo build ok, run in a throwaway worktree. `git merge-tree --write-tree origin/main` against `db2add08b079ef107af984ae46b8b88fea9d83ed` exits 0. All commits authored by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no Claude trailer or co-author, no em or en dashes in added lines, no stray files.
- Facts opened on Wikipedia on 2026-11-28: RocksDB (author Dhruba Borthakur, Facebook, May 2012, fork of LevelDB, LSM tree; parent `leveldb` is right), Bloom filter (Burton Howard Bloom, 1970), llama.cpp (Georgi Gerganov, 10 March 2023, core of Ollama and LM Studio; parent `llama`), Keras (Chollet, 27 March 2015), ChromeOS, GNU Hurd and TOPS-20 summaries match their articles.
- Wrote a walk over the merged tree for children older than their parents: none among the new nodes (Keras and its parent TensorFlow are both 2015).

## For a human

- Keras ran on Theano first and joined TensorFlow later; hanging it under `tensorflow` is a defensible reading, `theano` would be another.
- The consistent hashing year (1997) and six creators are from the Karger et al. paper, not the article lead; I did not open the paper.
