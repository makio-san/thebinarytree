# Tech scout, 2026-11-28

## What I did

This is the first run today. No `agents/tech-scout-2026-11-28` branch existed on origin. I worked in a separate worktree on that branch.

News searches for November 2026 found only point releases: .NET 11 with C# 15, Rust 1.100, Go 1.27.4, Scala 3.10.1, Visual Studio 2026 18.12 and Windows 11 26H2. Under the rules none of them is a new lineage step, so I queued none.

This run filled gaps instead. I checked about 330 names against `src/data` and against the inbox files on main and on every remote agent branch. That left 31 that were missing. I kept the 15 whose year, creators and placement I could confirm, and every proposed parent id exists on main.

Sources: two Wikipedia API requests five seconds apart with a generic client name. The first fetched 21 intros and the second fetched 18 full pages for the infobox fields. There was no 429, and I changed no dataset file.

Candidates queued in `agents/inbox/2026-11-28.md`: 15.

## Skipped

- Chubby and vLLM: neither has a Wikipedia article of its own (vLLM redirects to a section of the Transformer page). They are left out until a primary source is read. Chubby has a 2006 paper by Mike Burrows.
- Apache ZooKeeper: this is the second run that found no release year in the article. It is modeled on Chubby and began at Yahoo. The Apache release history should settle the year.
- SPSS: verified (1968, Norman H. Nie, Dale H. Bent and C. Hadlai Hull), but no parent fits. The tree has no statistics software node. `r-language` is the nearest.
- Transmeta Crusoe: verified (2000, x86 compatible, code morphing), but the best parent is unclear. It could go under `intel-line` as an x86 compatible processor, or beside `pentium`.
- Hugging Face: the company was skipped. Its Transformers library would fit under `transformer`, but I found no year for the library in what I read.
- Also missing but not researched this run: Snowflake, Apache Iceberg, Caffe, LangChain, BeagleBoard, KaiOS, Zephyr.

## For a human

- GNU Hurd goes under `other-os` because main has no Mach node. An earlier inbox queued Mach (kernel). If Mach is added, Hurd belongs under it.
- Maple goes under `lisp`, next to `mathematica`, because it began as a cheaper alternative to the Lisp based Macsyma. It was written in B and C, though, so the placement has medium confidence. I could confirm only Gaston Gonnet as co-creator. Keith Geddes probably belongs there too, but I did not confirm it.
- ESP32 under `arduino` and Theano under `ai` both have medium confidence. The tree has no microcontroller node and no group for early deep learning frameworks.
- HoloLens goes under `kinect` because the article traces its tracking to Kinect. `oculus-rift` would also work.
- THE multiprogramming system uses 1965, the infobox year. Dijkstra's paper is from 1968.
