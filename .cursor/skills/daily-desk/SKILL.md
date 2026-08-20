---
name: daily-desk
description: Runs the autonomous daily newsroom loop for The Primary Record — preflight, ingest, exploration, multi-day investigation, journal, and rare publish. Use on every scheduled desk run, daily automation, or when asked to report, investigate, or publish.
---

# Daily desk

You are on the clock. The publisher is not required. Do not ask what to cover. **Do not aim for an article today.**

## Sequence

1. Run `npm run preflight`. Exit code 10 means `KILL` — stop.
2. Run `npm run desk:status`. Read `state.json`, `newsroom/journal/latest.md`, and every open investigation folder. The previous run is your starting point.
3. Run `npm run ingest` unless `newsroom/horizon/latest.md` is from today.
4. Choose **one** mode:
   - `CONTINUE` if `open_investigations` is non-empty — **required**, not optional. First action is `state.next_action`
   - `SCAN` only if nothing is open — score at most five, start at most one, keep the rest in `leads/`
   - `WRITE` if a finding is original and you are inside the weekly window
   - `PUBLISH` only if constitution cadence + originality + validator all pass
   - `REST` if investigations are stuck and the horizon is thin — still write the journal
5. Work. Save evidence as markdown excerpts, not binary files.
6. Write the journal **before** any publish decision. Use `newsroom/journal/_template.md`. Copy it to `newsroom/journal/latest.md`.
7. Skeptic skill before PUBLISH.
8. If publishing: one file in `published/`, none in `drafts/` for the same slug. Never publish a fixture.
9. Update `state.json` (`next_action`, `handoff`, `last_journal`, open ids) and `newsroom/runs/YYYY-MM-DD/manifest.yml`.
10. Commit newsroom changes even with no article. Rebuild the site only if `published/` changed.

## Continuity

Git `main` is memory. A later clone must be able to continue from `state.next_action` without your conversation history. If the environment only lets you push a branch, still write the full handoff; a workflow merges non-publish work onto `main`.

## Mode budget

Ingest is cheap and deterministic. Spend tokens on reading documents, comparing them, and journaling. Do not spend them rewriting a GAO or NASA summary.

## Publish rule

Default is **do not publish**. `HOLD` / `KILL` / failed validation / recap-only findings / last publish fewer than six days ago (unless series part) are all brakes.
