# Code health, 2026-11-22

Branch: `agents/code-health-2026-11-22`, from `main` at `15c370c`.

## Baseline and result

| Check | Before | After |
| --- | --- | --- |
| `tsc --noEmit` | pass, 2 s | pass, 2 s |
| `vitest run` | 131 tests in 12 files pass, about 1 s | 131 pass, about 1 s |
| `npm run build:demo` | pass, about 1 s | pass, about 1 s |
| Demo JS bundle | 934.51 kB (268.07 kB gzip) | 934.31 kB (268.03 kB gzip) |
| Demo CSS | 37.73 kB (7.97 kB gzip) | unchanged |
| `npm audit` | 4 (2 high, 2 moderate) | 2 moderate |

The demo bundle is still over Vite's 800 kB warning. three.js is most of it; code splitting would be a design change, not a cleanup, so it is left alone.

## Dependency updates applied

Each one installed on its own, then type check, tests and demo build re-run. All green.

- `@types/node` 26.3.0 to 26.6.6
- `tsx` 4.23.12 to 4.23.15
- `vite` 8.2.2 to 8.3.8. This clears both high advisories (Vite dev server advisories, `launch-editor`, and `source-map-js`).
- `vite-plugin-dts` 5.0.3 to 5.1.2

## Skipped

- `vitest` 4.1.11 to 4.1.12 (patch). npm 11.4.2 crashes while resolving it: `TypeError: Cannot read properties of null (reading 'edgesOut')` in arborist `#loadPeerSet`, both with `npm install -D vitest@4.1.12` and `npm update vitest`. The tree was restored and reinstalled with `npm ci`. This patch is what fixes the two remaining moderate advisories (`@vitest/mocker`, GHSA-qxg6-89mg-rqv8 and GHSA-xp26-3454-mjgp). I did not use `--legacy-peer-deps` because it changes how every peer dependency in the lockfile resolves. A human could try a newer npm, or deleting the lockfile entries for `vitest` and `@vitest/*` and reinstalling.
- `three` and `@types/three` 0.185 to 0.187. In 0.x, a minor bump is a breaking release, and the range `^0.185.1` does not allow it. Not applied. What to check before upgrading: read the r186 and r187 migration notes for changes to shader chunks, since `nodes-layer.ts` and `neurites-layer.ts` patch materials with `onBeforeCompile` and break silently if a chunk name or include they replace changes; then run the demo on desktop and phone, look at node glow, neurite lines, labels and picking, and run the full test suite.
- `vitest` 5.1.1 (major). Not applied. Check the Vitest 5 migration guide for config and API changes; the test files use only `describe`, `it` and `expect`, so the risk is mostly in config and the `@vitest/*` peer set.

## Dead code

Scanned every `export` in `src` for uses elsewhere. Nothing is clearly unused:

- `MAX_RADIUS`, `clampToBall`, `mobiusSub`, `geodesicPolyline`, `gyration`, `UNIT_X/Y/Z` and `rotateFromTo` have no callers inside the repo but are public API through `export * as hyperbolic from './math'`.
- `DragThrow`, `GlideOptions`, `defaultGlideOptions` and `LabelInset` are used in their own files.

Nothing removed.

## For a human

- The vitest 4.1.12 install crash above, which keeps two moderate advisories open.
- `GlideOptions`, `LabelInset` and `DragThrow` appear in public method signatures (`Navigator.setGlideOptions`, `LabelsLayer.setInset`, `ControlsHandlers.onDragEnd`) but are not re-exported from `src/index.ts`, so library users cannot name those types. Exporting them would be a small API addition, left for a decision.
- At the start of the run, `git pull --ff-only origin main` failed with "Cannot fast-forward to multiple branches". `main` already matched `origin/main` after the fetch, and `git merge --ff-only origin/main` said "Already up to date", so the run went on from there.
