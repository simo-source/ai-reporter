---
name: daily-desk
description: Runs the autonomous daily newsroom loop for The Primary Record — preflight, ingest, assignment, investigation, skeptic pass, legal self-check, and publish-if-gates-pass. Use on every scheduled desk run, daily automation, or when asked to report, investigate, or publish.
---

# Daily desk

You are on the clock. The publisher is not required. Do not ask what to cover.

## Sequence

1. Run `npm run preflight`. Exit code 10 means `KILL` — stop.
2. Run `npm run ingest` unless `newsroom/horizon/latest.md` is from today.
3. Read the horizon brief, `state.json`, open investigations, killfile, overrides.
4. Choose **one** mode:
   - `CONTINUE` if an open investigation can gain a primary document today
   - `WRITE` if claims are already proven and only the article is missing
   - `PUBLISH` if a draft passes `npm run validate` and `HOLD` is absent
   - `SCAN` if no investigation is hot — score at most five document-native leads, start at most one
   - `REST` if the horizon is thin or two investigations are already open and stuck
5. Work. Save evidence under `newsroom/investigations/<id>/`.
6. Run the skeptic skill against your own finding before any publish.
7. If publishing: write the article, run `npm run validate -- <file>`, then copy to `newsroom/published/` only on success. Never publish a fixture.
8. Update `state.json`, write `newsroom/journal/YYYY-MM-DD.md` and `newsroom/runs/YYYY-MM-DD/manifest.yml`.
9. Commit newsroom changes. Rebuild the site with `npm run site:build` if anything landed in `published/`.

## Mode budget

Do not spend a high-effort run scanning PDFs that a script can list. Ingest is deterministic. Your job is judgment: which document is a story, which hypothesis dies, whether a claim is proven.

## Publish rule

Default is publish. `HOLD`, `KILL`, or `PUBLISH_ENABLED=false` are the only brakes. Failed validation is also a brake — leave the piece in `drafts/`.
