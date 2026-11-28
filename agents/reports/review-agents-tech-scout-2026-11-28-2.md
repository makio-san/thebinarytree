branch: agents/tech-scout-2026-11-28-2
reviewed-head: 1beb658b2fef5e3dc5bd2d8b3cb0e17d81374e29
verdict: approve

## Reasons

Adds the inbox file `agents/inbox/2026-11-28-2.md` with 14 candidates and its report. Every entry names a Wikipedia source, a year, a parent id and a confidence; loose placements are marked medium and explained in the report.

## Checked

- `git merge-tree --write-tree origin/main` against `02eebb0f7b8793a54b56cac3aef7cd79a6f3cad1` exits 0. Two commits by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no Claude trailer or co-author, no em or en dashes, only allowed paths.
- Spot checks on Wikipedia (one batched request): Snowflake Inc. founded 23 July 2012 in San Mateo by Benoît Dageville, Thierry Cruanes and Marcin Żukowski; ESLint by Nicholas C. Zakas, released 30 June 2013; Gradle released 21 April 2008; Zephyr released 26 July 2016 by the Linux Foundation and Wind River; KaiOS released 2017 by KaiOS Technologies (Hong Kong). All match the inbox.

## For a human

- Some proposed parents were changed by the curator (Iceberg to `hadoop`, Flink to the `analytics` group, Gradle under Maven, RDRAND under `intel-core-i`) with reasons; those changes are judged in the curator review.
