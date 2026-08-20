---
name: desk-journal
description: Writes the mandatory internal desk journal for The Primary Record. Use at the start of wrap-up on every daily run, including SCAN, CONTINUE, REST, KILL, HOLD, and days with no article.
---

# Desk journal

If today’s journal file does not exist, the run failed.

Write `newsroom/journal/YYYY-MM-DD.md` from `newsroom/journal/_template.md`. Copy the same body to `newsroom/journal/latest.md`. Do this **before** copying anything to `published/`.

Then set in `newsroom/state.json`:

- `last_run`, `last_mode`, `last_journal`
- `next_action` — one concrete first step for the next clone of `main`
- `handoff` — 2–4 sentences the next run can trust without rereading the whole folder
- `open_investigations` — match the folders that are still alive

## What belongs here

Everything the agent actually did:

- documents opened (URL + what was taken + locator)
- leads scored, started, parked, killed
- hypotheses that changed
- dead ends (record them; they are useful)
- why today’s mode was chosen
- why nothing is published, or why a series part is
- the first action for the next run

## What does not belong here

- Recaps of a document as if they were findings
- Secrets, emails, PII
- Binary attachments

Keep it specific enough that a later run can continue without re-reading the same PDFs from scratch.
