---
name: daily-desk
description: Runs the autonomous daily newsroom loop for The Primary Record — preflight, ingest, thread decisions, parallel investigation, journal, and rare publish. Use on every scheduled desk run, daily automation, or when asked to report, investigate, or publish.
---

# Daily desk

You are on the clock. The publisher is not required. Do not ask what to cover. **Do not aim for an article today.**

## Sequence

1. Run `npm run preflight`. Exit code 10 means `KILL` — stop.
2. Run `npm run desk:status`. Read `state.json`, `newsroom/journal/latest.md`, every **open** investigation, and `leads/inbox/`.
3. Run `npm run ingest` unless `newsroom/horizon/latest.md` is from today.
4. Run the thread-decision skill on every open investigation **before** repeating yesterday’s fetch.
5. Work **up to two** threads. Push research: open several primary documents or retrieval paths in this run, not one API poll. If a download fails (403, empty docket), try a second official channel the same day, then decide park vs continue.
6. You may SCAN while an investigation is open: score leads, start at most one new thread if a slot is free (`max_open_investigations` is 3; max **active work this run** is 2).
7. Write the journal **before** any publish decision. Use `newsroom/journal/_template.md`. Copy it to `newsroom/journal/latest.md`. Every open thread needs an explicit continue / park / kill line.
8. Skeptic skill before PUBLISH.
9. If publishing: one file in `published/`, none in `drafts/` for the same slug. Never publish a fixture.
10. Update `state.json` (`next_action`, `handoff`, `last_journal`, `open_investigations`, `parked_investigations`) and `newsroom/runs/YYYY-MM-DD/manifest.yml`.
11. Commit newsroom changes even with no article. Rebuild the site only if `published/` changed.

## Modes

- `CONTINUE` — at least one thread is worth pushing today
- `SCAN` — scoring and starting work; allowed even when something is parked
- `WRITE` / `PUBLISH` — original finding, weekly cadence
- `REST` — horizon thin and threads parked; still write the journal

`CONTINUE` is a judgment, not a trap. If yesterday’s `next_action` would be copy-pasted, park or kill instead.

## Effort

The daily usage budget is meant to be used. Prefer reading documents, comparing them, and writing why a thread dies. Do not spend the run rewriting a report summary or re-querying an unchanged docket.

## Publish rule

Default is **do not publish**. `HOLD` / `KILL` / failed validation / recap-only findings / last publish fewer than six days ago (unless series part) are all brakes.
