---
name: daily-desk
description: Runs the autonomous daily newsroom loop for The Primary Record — preflight, ingest, exploration, multi-day investigation, journal, and rare publish. Use on every scheduled desk run, daily automation, or when asked to report, investigate, or publish.
---

# Daily desk

You are on the clock. The publisher is not required. Do not ask what to cover. **Do not aim for an article today.**

## Sequence

1. Run `npm run preflight`. Exit code 10 means `KILL` — stop.
2. Run `npm run ingest` unless `newsroom/horizon/latest.md` is from today.
3. Read the horizon brief, `state.json` (especially `last_published_at` and open investigations), killfile, overrides, and the last journal entry.
4. Choose **one** mode:
   - `CONTINUE` if an open investigation can gain a primary document, a contradiction, or a pivot today (default)
   - `SCAN` if you need more leads — score at most five, start at most one, keep the rest in `leads/`
   - `WRITE` if a finding is original and you are inside the weekly window
   - `PUBLISH` only if constitution cadence + originality + validator all pass
   - `REST` if two investigations are stuck and the horizon is thin — still write the journal
5. Work. Save evidence as markdown excerpts, not binary files.
6. Write the journal **before** any publish decision. Use `newsroom/journal/_template.md`.
7. Skeptic skill before PUBLISH.
8. If publishing: one file in `published/`, none in `drafts/` for the same slug. Never publish a fixture.
9. Update `state.json` and `newsroom/runs/YYYY-MM-DD/manifest.yml`.
10. Commit newsroom changes even with no article. Rebuild the site only if `published/` changed.

## Mode budget

Ingest is cheap and deterministic. Spend tokens on reading documents, comparing them, and journaling. Do not spend them rewriting a GAO or NASA summary.

## Publish rule

Default is **do not publish**. `HOLD` / `KILL` / failed validation / recap-only findings / last publish fewer than six days ago (unless series part) are all brakes.
