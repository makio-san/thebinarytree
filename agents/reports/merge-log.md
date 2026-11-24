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

## 2026-11-21

- `agents/tech-scout-2026-11-20` at `d56785eae2a9c61ee52963e7f0053d2ff4ccf645`: merged as `611d3744d94726f4d9887c8df1b598e67fbaf1b7`. Review approved this exact tip; two makio-san commits with scoped Conventional subjects and no trailers; adds only the inbox file and its report under `agents/`; clean merge; type check, tests (131 passed) and demo build pass on the merged result.
- `agents/lineage-curator-2026-11-20-2` at `26e3944d2edad32d638cbe58ba805bef5336972b`: merged as `36fbc510b685393e8a1dc5492e2e94b19a73d9af`. Review approved this exact tip; seven new makio-san commits (plus the two scout commits already in `main`) with scoped Conventional subjects and no trailers; touches only `src/data/**` (+190, -1, the one removed line is a reformat to add a child node) and `agents/**`; clean merge; type check, tests (131 passed) and demo build pass on the merged result.
- `agents/tech-scout-2026-11-20-2` at `3c23b910be0e0d1d41b5f98977c4f00392e34d34`: merged as `28d77bb080c871b2c4b3357d23248b11d58ab0cd`. Review approved this exact tip; two makio-san commits with scoped Conventional subjects and no trailers; adds only the inbox file and its report under `agents/`; clean merge; type check, tests (131 passed) and demo build pass on the merged result. An untracked, truncated copy of its report in the local working tree (an exact prefix of the committed file) was moved aside so the merge could proceed.
- `agents/release-reviewer-2026-11-20-2` at `be7d7497cc732b5e52e74c24ea33dad28e3558f2`: skipped. Per run limit reached; left for the next run.
- `agents/tech-scout-2026-11-21` at `7cea3f5ebee7461f65f1018e307e80a816a7be09`: skipped. Review verdict for this tip is `reject`.
- `agents/lineage-curator-2026-11-21` at `d2458332cb5e1e5efd5605c1893be3fceb46f17c`: skipped. Review verdict for this tip is `reject`.
- `agents/release-reviewer-2026-11-21` at `c22578878844b8e7aff25333b0873f99323650e6`: skipped. Per run limit reached; left for the next run.

## 2026-11-21 (second run)

- `agents/release-reviewer-2026-11-20-2` at `be7d7497cc732b5e52e74c24ea33dad28e3558f2`: merged as `dec681ecac310d6ac1b256c357ffa43fae87a450`. Adds only three review and report files under `agents/reports/`, so gates 2, 3 and 4 apply; two makio-san commits, no trailers; nothing outside `agents/` changed; clean merge; type check, tests (131 passed) and demo build also pass.
- `agents/release-reviewer-2026-11-21` at `c22578878844b8e7aff25333b0873f99323650e6`: merged as `3618b29607e8749960aeb7dfec8bbbf55a305d15`. Adds only five review and report files under `agents/reports/`, so gates 2, 3 and 4 apply; three makio-san commits, no trailers; nothing outside `agents/` changed; clean merge; type check, tests (131 passed) and demo build also pass.
- `agents/lineage-curator-2026-11-21-2` at `ed413a6cb99aa1c797d33c11d5ad6a3330be0c62`: merged as `4fe6a6bec1688e2f5098dee3d4c1f7edd5b10512`. Review approved this exact tip; four makio-san commits with scoped Conventional subjects and no trailers; touches only `src/data/**` (+156, no deletions) and `agents/**`; clean merge; type check, tests (131 passed) and demo build pass on the merged result. It carries the two commits of the rejected `agents/tech-scout-2026-11-21-2`; the review approved that explicitly, since their inbox only lands in `agents/inbox/done/` and the curator corrected the Heartbleed creators in the data.
- `agents/tech-scout-2026-11-21` at `7cea3f5ebee7461f65f1018e307e80a816a7be09`: skipped. Review verdict for this tip is `reject`.
- `agents/lineage-curator-2026-11-21` at `d2458332cb5e1e5efd5605c1893be3fceb46f17c`: skipped. Review verdict for this tip is `reject`.
- `agents/tech-scout-2026-11-21-2` at `8301a3a564f65c47dc5b4a67ebca232c56df9a7f`: skipped. Review verdict for this tip is `reject`; its commits are now in `main` through the curator branch, so it has nothing left to merge.
- `agents/release-reviewer-2026-11-21-2` at `b12baa293ef6665623b8f72dd1402b6e18602c51`: skipped. Per run limit reached; left for the next run.

## 2026-11-22

- `agents/release-reviewer-2026-11-21-2` at `b12baa293ef6665623b8f72dd1402b6e18602c51`: merged as `64ba2a0432e0e2bad3f25e97fe0c573881cefb03`. Adds only three review and report files under `agents/reports/`, so gates 2, 3 and 4 apply; two makio-san commits, no trailers; nothing outside `agents/` changed; clean merge; type check, tests (131 passed) and demo build also pass.
- `agents/tech-scout-2026-11-21` at `7cea3f5ebee7461f65f1018e307e80a816a7be09`: skipped. Review verdict for this tip is `reject`.
- `agents/lineage-curator-2026-11-21` at `d2458332cb5e1e5efd5605c1893be3fceb46f17c`: skipped. Review verdict for this tip is `reject`.
- `agents/tech-scout-2026-11-22` at `0d992c6f491a07a3ce9d73fc37039c2d9c74c433`: skipped. No review file for it yet.
- `agents/tech-scout-2026-11-22-2` at `6b1a5b91ab9a8b0aeb89a2bf89b42ce472b8bc01`: skipped. No review file for it yet.
- `agents/code-health-2026-11-22` at `21c50df6aa5a9d5dfef3e54b6e0204bf8c42d54f`: skipped. No review file for it yet.
- `agents/code-health-2026-11-22-2` at `0b390d8c56e5637f9ad43c4291037dafbf622474`: skipped. No review file for it yet.

## 2026-11-22 (second run)

- `agents/tech-scout-2026-11-22` at `0d992c6f491a07a3ce9d73fc37039c2d9c74c433`: merged as `65e463bb54b6f34c006dec08e2edde652caa691c`. Review approved this exact tip; two makio-san commits with scoped Conventional subjects and no trailers; adds only the inbox file and its report under `agents/`; clean merge; type check, tests (131 passed) and demo build pass on the merged result.
- `agents/code-health-2026-11-22-2` at `0b390d8c56e5637f9ad43c4291037dafbf622474`: merged as `d3f6d0ccb00424511519af4c9492ea33e3cf92af`. Review approved this exact tip; two makio-san commits with scoped Conventional subjects and no trailers; touches only `package.json`, `package-lock.json` (minor and patch updates, all resolved from registry.npmjs.org) and its report under `agents/`; clean merge; `npm ci`, then type check, tests (131 passed) and demo build pass on the merged result.
- `agents/release-reviewer-2026-11-22` at `07affdbf115b121fd92dee66021edfa7ce3f1a13`: merged as `196fabfe4a18283a716fbcf68e817a4981827586`. Adds only five review and report files under `agents/reports/`, so gates 2, 3 and 4 apply; two makio-san commits, no trailers; nothing outside `agents/` changed; clean merge; type check, tests (131 passed) and demo build also pass.
- `agents/tech-scout-2026-11-21` at `7cea3f5ebee7461f65f1018e307e80a816a7be09`: skipped. Review verdict for this tip is `reject`.
- `agents/lineage-curator-2026-11-21` at `d2458332cb5e1e5efd5605c1893be3fceb46f17c`: skipped. Review verdict for this tip is `reject`.
- `agents/tech-scout-2026-11-22-2` at `6b1a5b91ab9a8b0aeb89a2bf89b42ce472b8bc01`: skipped. Review verdict for this tip is `reject`.
- `agents/code-health-2026-11-22` at `21c50df6aa5a9d5dfef3e54b6e0204bf8c42d54f`: skipped. Review verdict for this tip is `reject`.
- `agents/lineage-curator-2026-11-22` at `1ea4f849d6cbe4bce84c46352fd38b9a8c1810f9`: skipped. Review verdict for this tip is `reject` (wrong POP3 date and author).
- `agents/release-reviewer-2026-11-22-2` at `d52cfa3d6f029d884e869c166a4dd405d0189798`: skipped. Per run limit reached; left for the next run.

## 2026-11-23

- `agents/release-reviewer-2026-11-22-2` at `d52cfa3d6f029d884e869c166a4dd405d0189798`: merged as `04334a125f46d3751598a1846b42a6e24b1d6142`. Adds only a review and a report file under `agents/reports/`, so gates 2, 3 and 4 apply; one makio-san commit, no trailers; nothing outside `agents/` changed; clean merge; type check, tests (131 passed) and demo build also pass.
- `agents/tech-scout-2026-11-23` at `0b6e8e5f9c422575cdd1f545b5def33dc37462d0`: merged as `bb00f6ec0a30ead7a09e133f5e2c256cb0c068ac`. Review approved this exact tip; two makio-san commits with scoped Conventional subjects and no trailers; adds only the inbox file and its report under `agents/`; clean merge; type check, tests (131 passed) and demo build pass on the merged result.
- `agents/lineage-curator-2026-11-23` at `8a37dc02b2d852680561878d1ced1ab00eb8e418`: merged as `ce8d8117d4187a45f796eff93986fe8f25e075d0`. Review approved this exact tip; four new makio-san commits (plus the two scout commits already in `main`) with scoped Conventional subjects and no trailers; touches only `src/data/**` (+199, no deletions) and `agents/**` (the inbox moves to `agents/inbox/done/`); clean merge; type check, tests (131 passed) and demo build pass on the merged result.
- `agents/tech-scout-2026-11-21` at `7cea3f5ebee7461f65f1018e307e80a816a7be09`: skipped. Review verdict for this tip is `reject`.
- `agents/lineage-curator-2026-11-21` at `d2458332cb5e1e5efd5605c1893be3fceb46f17c`: skipped. Review verdict for this tip is `reject`.
- `agents/tech-scout-2026-11-22-2` at `6b1a5b91ab9a8b0aeb89a2bf89b42ce472b8bc01`: skipped. Review verdict for this tip is `reject`.
- `agents/code-health-2026-11-22` at `21c50df6aa5a9d5dfef3e54b6e0204bf8c42d54f`: skipped. Review verdict for this tip is `reject`.
- `agents/lineage-curator-2026-11-22` at `1ea4f849d6cbe4bce84c46352fd38b9a8c1810f9`: skipped. Review verdict for this tip is `reject` (wrong POP3 date and author).
- `agents/ui-qa-2026-11-23` at `b64a2bd8ebd9dde3eb6c34f7e56c5d1425cf55b5`: skipped. Approved, but the per run limit was reached; left for the next run.
- `agents/release-reviewer-2026-11-23` at `7305b8577767c5078e09695db0190f47d93c6482`: skipped. Per run limit reached; left for the next run.

## 2026-11-23 (second run)

- `agents/ui-qa-2026-11-23` at `b64a2bd8ebd9dde3eb6c34f7e56c5d1425cf55b5`: merged as `3cdf17986335e9304644528f0b0321fb1c985514`. Review approved this exact tip; one makio-san commit with a scoped Conventional subject and no trailers; adds only its report under `agents/reports/`; clean merge; type check, tests (136 passed) and demo build pass on the merged result.
- `agents/release-reviewer-2026-11-23` at `7305b8577767c5078e09695db0190f47d93c6482`: merged as `41f1f6656fc3bc4ec26875764fa209a382af850c`. Adds only four review and report files under `agents/reports/`, so gates 2, 3 and 4 apply; three makio-san commits, no trailers; nothing outside `agents/` changed; clean merge; type check, tests (136 passed) and demo build also pass.
- `agents/tech-scout-2026-11-23-2` at `6088f0faef4f94d5c0e3f715b6c22c968acdff75`: merged as `f3540cd664126802ad4707d2ede653236aad6fd5`. Review approved this exact tip; one makio-san commit with a scoped Conventional subject and no trailers; adds only the inbox file and its report under `agents/`; clean merge; type check, tests (136 passed) and demo build pass on the merged result.
- `agents/tech-scout-2026-11-21` at `7cea3f5ebee7461f65f1018e307e80a816a7be09`: skipped. Review verdict for this tip is `reject`.
- `agents/lineage-curator-2026-11-21` at `d2458332cb5e1e5efd5605c1893be3fceb46f17c`: skipped. Review verdict for this tip is `reject`.
- `agents/tech-scout-2026-11-22-2` at `6b1a5b91ab9a8b0aeb89a2bf89b42ce472b8bc01`: skipped. Review verdict for this tip is `reject`.
- `agents/code-health-2026-11-22` at `21c50df6aa5a9d5dfef3e54b6e0204bf8c42d54f`: skipped. Review verdict for this tip is `reject`.
- `agents/lineage-curator-2026-11-22` at `1ea4f849d6cbe4bce84c46352fd38b9a8c1810f9`: skipped. Review verdict for this tip is `reject`.
- `agents/lineage-curator-2026-11-23-2` at `0408e7a75881ac9b4e53d3d6e4ce0a55e15f1c0f`: skipped. Approved, but the per run limit of three was reached; left for the next run.
- `agents/branch-fixer-2026-11-23-tech-scout-2026-11-21` at `4a27b9114523b2ff65aca4d28cd8b58d13f1b219`: skipped. Approved, but the per run limit was reached; left for the next run.
- `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` at `4f88415692cdbf3117441e3c95835a545afdceb1`: skipped. Approved, but the per run limit was reached; left for the next run.
- `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-22` at `82ff3b450caa2d23962df38d13cb581d00e6db17`: skipped. Approved, but the per run limit was reached; left for the next run.
- `agents/release-reviewer-2026-11-23-2` at `d5508c3f849e00e4e92e586817e4e8d314048a0b`: skipped. Per run limit reached; left for the next run.

## 2026-11-24
- agents/lineage-curator-2026-11-23-2 (0408e7a7): merged, approved and green.
- agents/branch-fixer-2026-11-23-tech-scout-2026-11-21 (4a27b911): merged, approved and green.
- agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21 (4f884156): skipped, merge conflict with main.
- agents/branch-fixer-2026-11-23-lineage-curator-2026-11-22 (82ff3b45): merged, approved and green.
- Not reached (three merge limit): fact-checker-2026-11-24, lineage-curator-2026-11-24, tech-scout-2026-11-24, web-reader-2026-11-24.

## 2026-11-24 (second run)

- agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21 (4f884156): skipped, merge conflict in src/data/branches/peripherals.ts.
- agents/fact-checker-2026-11-24 (0c0c87ac): merged, approved and green.
- agents/lineage-curator-2026-11-24 (ed542af5): merged, approved and green.
- agents/tech-scout-2026-11-24 (49698e05): merged, approved and green.
- Not reached (three merge limit): web-reader-2026-11-24 (9a643995), approved.
- Rejected tips, not considered: code-health-2026-11-22, lineage-curator-2026-11-21, tech-scout-2026-11-22-2. No review for: lineage-curator-2026-11-24-2, tech-scout-2026-11-24-2.

## 2026-11-24 (third run)

- agents/web-reader-2026-11-24 (9a643995): merged, approved for this tip and green.
- agents/release-reviewer-2026-11-23-2 (d5508c3f): merged, reports only (gate 6), green.
- agents/release-reviewer-2026-11-24 (2aa96f77): merged, reports only (gate 6), green.
- Skipped: branch-fixer-2026-11-23-lineage-curator-2026-11-21 (4f884156), known merge conflict in src/data/branches/peripherals.ts. Rejected tips not considered: code-health-2026-11-22, lineage-curator-2026-11-21, tech-scout-2026-11-22-2. No review yet: lineage-curator-2026-11-24-2, tech-scout-2026-11-24-2.

## 2026-11-24 (release-merger run)

- agents/tech-scout-2026-11-24-2 (2e65819): merged. Approved for this tip; inbox and report files only.
- agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21 (4f88415): skipped. Approved, but the merge conflicts with main in src/data/branches/peripherals.ts; aborted, not resolved.
