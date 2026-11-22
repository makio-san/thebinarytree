branch: agents/code-health-2026-11-22
reviewed-head: 21c50df6aa5a9d5dfef3e54b6e0204bf8c42d54f
verdict: reject

## Why

Superseded, and its own tip commit says so. The branch was cut from the unreviewed tech scout tip `0d992c6`, so it carries `933ce7c` and `0d992c6` from `agents/tech-scout-2026-11-22` under the dependency update. The same update without those commits is on `agents/code-health-2026-11-22-2`, which is the one to merge.

## What I checked

- Type check, 131 tests and the demo build pass in a throwaway worktree. The lockfile is identical to `agents/code-health-2026-11-22-2`.
- Author, commit format, no trailers, no dashes, no secrets: all fine.

A human can delete this branch after `agents/code-health-2026-11-22-2` is merged.
