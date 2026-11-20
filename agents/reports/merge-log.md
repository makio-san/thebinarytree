# Merge log

Decisions by the release merger, newest last.

## 2026-11-18

- `agents/portrait-finder-2026-11-18` at `ce54e72bc10ae0d9fb4a5b55a3421ca69abf4b11`: merged as `ebede675e5b853158d1f6fd19ef304fb29ca40a9`. Review approved this exact tip; one makio-san commit with a scoped Conventional subject and no trailers; touches only `src/data/portraits.ts` (+5) and its report; clean merge; type check, tests (131 passed) and demo build pass on the merged result.
- `agents/lineage-curator-2026-11-18` at `f80b8d602d6d3468ac53d86ba6f8e21c231bfe4c`: merged as `4b4a24033bbd90eaad0727a9f95c950a9588a16e`. Review approved this exact tip; one makio-san commit, no trailers; adds only its report under `agents/reports/`; clean merge; type check, tests and demo build pass.
- `agents/release-reviewer-2026-11-18` at `3e369a06f7817be0a97a535b9a1a4e498f51b8b9`: merged. Adds only two review files under `agents/reports/`, so gates 2, 3 and 4 apply; one makio-san commit, no trailers; nothing outside `agents/` changed; clean merge; type check, tests and demo build also pass.

## 2026-11-19

- `agents/tech-scout-2026-11-19` at `f9c7cd46b7ef8621c17a4321fa007a86c5d925df`: merged as `cff1d99400f5d8464ed818b8eae8c0a056e5b7d7`. Review approved this exact tip; two makio-san commits with scoped Conventional subjects and no trailers; adds only the inbox file and its report under `agents/`; clean merge; type check, tests (131 passed) and demo build pass on the merged result.
- `agents/lineage-curator-2026-11-19` at `68b90078bb71acd6c0a75ea7f430d86fdc065193`: merged as `1815afc47c83a7c1b82d961232a428b33e15dc31`. Review approved this exact tip; four makio-san commits (two are the scout commits already in `main`), no trailers; touches only `src/data/**` (+179, no deletions) and `agents/**`; clean merge; type check, tests (131 passed) and demo build pass.
- `agents/release-reviewer-2026-11-19` at `590a8903b7725460e4bf379ed8e6440bfd184c8b`: merged as `0bdb0ee`. Adds only three review and report files under `agents/reports/`, so gates 2, 3 and 4 apply; one makio-san commit, no trailers; nothing outside `agents/` changed; clean merge; type check, tests and demo build also pass.
- `agents/tech-scout-2026-11-19-2` at `a9656bdbf1e9bf045370ae4647102b084d8e0199`: merged as `61aac436784ba417c13aa400592ce601e42f19db`. Review approved this exact tip; two makio-san commits with scoped Conventional subjects and no trailers; adds only the inbox file and its report under `agents/`; clean merge; type check, tests (131 passed) and demo build pass on the merged result.
- `agents/lineage-curator-2026-11-19-2` at `814e66dc68e407a85ef594e23c0f441ae521d95b`: merged as `c93098fe39635f0a8d519c49016ee0cd92617134`. Review approved this exact tip; four makio-san commits (two are the scout commits already in `main`), no trailers; touches only `src/data/**` (+180, no deletions) and `agents/**`; clean merge; type check, tests (131 passed) and demo build pass.
- `agents/release-reviewer-2026-11-19-2` at `dbd9dec01f61f0386259f5676c68337876de48b9`: merged as `6ab4bdbf80c9d5c8412c81c3bfa63436fc165b5e`. Adds only three review and report files under `agents/reports/`, so gates 2, 3 and 4 apply; two makio-san commits, no trailers; nothing outside `agents/` changed; clean merge; type check, tests and demo build also pass.

## 2026-11-20

- `agents/lineage-curator-2026-11-20` at `080a07f7004e15160cd25eaafe50444071aacca3`: merged as `5681b8cdcc26ccd0ab93d71d4feaaf49dc8d6721`. Review approved this exact tip; one makio-san commit with a scoped Conventional subject and no trailers; adds only its report under `agents/reports/`; clean merge; type check and tests (131 passed) pass on the merged result. Process note: the demo build ran before the push but its exit status was hidden by a pipe, and a mistyped log path stopped the confirming run, so the push went out before a clean build result was confirmed. The build was rerun on the pushed tip straight after and passed, so no revert was needed. Later merges in this run use a script that pushes only after every check exits zero.
- `agents/release-reviewer-2026-11-20` at `13b6d7d878cefbd31b230f86d2a331729fd530df`: merged as `80c1e35f8d95e9165d578096ad33457b3b8a97ee`. Adds only two review and report files under `agents/reports/`, so gates 2, 3 and 4 apply; one makio-san commit, no trailers; nothing outside `agents/` changed; clean merge; type check, tests (131 passed) and demo build also pass.
- `agents/fact-checker-2026-11-20` at `2f661719997b1da4c56dd77b3bf18095e31c5ad2`: merged as `22710dd`. Review approved this exact tip; two makio-san commits with scoped Conventional subjects and no trailers; touches only `src/data/branches/foundations.ts` (+5, -5, five corrected nodes) and `agents/reports/**`; clean merge; type check, tests (131 passed) and demo build pass on the merged result.
- `agents/tech-scout-2026-11-20` at `d56785eae2a9c61ee52963e7f0053d2ff4ccf645`: skipped for now. Approved for this exact tip, but this run already merged three branches; it is next in line.
- `agents/lineage-curator-2026-11-20-2` at `26e3944d2edad32d638cbe58ba805bef5336972b`: skipped. No review file for it yet, and the per run limit was reached.
- `agents/tech-scout-2026-11-20-2` at `3c23b910be0e0d1d41b5f98977c4f00392e34d34`: skipped. No review file for it yet, and the per run limit was reached.
- `agents/release-reviewer-2026-11-20-2` at `be7d7497cc732b5e52e74c24ea33dad28e3558f2`: skipped. Per run limit reached; left for the next run.
