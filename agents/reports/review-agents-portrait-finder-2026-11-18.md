branch: agents/portrait-finder-2026-11-18
reviewed-head: ce54e72bc10ae0d9fb4a5b55a3421ca69abf4b11
verdict: approve

## Reasons

Five portrait entries were added to `src/data/portraits.ts`. Each one points at the right person's Wikipedia article, the person is a credited creator in the dataset, and the face crops put the face inside the round frame.

## What I checked

- Diff: `src/data/portraits.ts` (+5 lines, in alphabetical order) and the agent's report. No other files, no node_modules, no secrets.
- Commit: one commit, authored `makio-san <killbillbeatrixx@gmail.com>`, message `feat(data): add portraits for 5 more creators.` No trailers, no Claude co-author.
- Prose: no em or en dashes in the diff.
- Tests in a throwaway worktree at the reviewed head: `tsc --noEmit` passes, `vitest run` passes (12 files, 131 tests), the demo build succeeds.
- The branch is 4 commits behind `main` (the agents view and live status work). A trial merge with `main` (not committed) went through with no conflicts, and type check, tests (131 passed) and the demo build all pass on the merged tree.
- Facts: all five checked in one batched Wikipedia API request (pageimages and descriptions), then the lead images opened and looked at:
  - Adrian Holovaty: article describes an American web developer; credited on `django` in `creators.ts`. Lead image is him.
  - Hedy Lamarr: actress and inventor; credited on `frequency-hopping`. Lead image is her 1944 publicity photo.
  - John Lasseter: filmmaker and animator; credited on `toy-story`. Lead image is him (2011).
  - Marc Raibert: chairman of Boston Dynamics; credited on `bigdog`. Lead image is him.
  - Mendel Rosenblum: computer scientist; credited on `vmware`. Lead image shows two people, and he is the one on the right. The crop (x 64) frames the right-hand man and cuts out the left one when worked through `frame()` in `demo/ui/panel.ts`.
- Face boxes: Lamarr, Lasseter, Raibert and Rosenblum match what I see within a few points. Holovaty's y of 41 is about 10 points above where his face actually is (around 50%). The frame clamps to the image's top edge at this zoom (about 1.1x), so the whole face still shows. Not a reason to reject, but a later pass could set it to about 50.
