---
name: desk-journal
description: Writes the mandatory internal desk journal for The Primary Record. Use at the start of wrap-up on every daily run, including SCAN, CONTINUE, REST, KILL, HOLD, and days with no article.
---

# Desk journal

If today’s journal was not appended, the run failed.

Write this run’s body to `newsroom/journal/_incoming.md` from `newsroom/journal/_template.md`. Then run `npm run journal:append`.

That script **appends** a `## Run N` section to `newsroom/journal/YYYY-MM-DD.md` and copies **only this run** to `newsroom/journal/latest.md`. Do **not** overwrite a dated journal that already exists. Two runs on the same day must both survive.

Do this **before** copying anything to `published/`.

Then set in `newsroom/state.json`:

- `last_run`, `last_mode`, `last_journal`
- `next_action` — one concrete first step for the next clone of `main`
- `handoff` — 2–4 sentences the next run can trust without rereading the whole folder
- `open_investigations` — active threads only (max 3)
- `parked_investigations` — blocked but reopenable (max 10; parked do not occupy active slots)

Include a **Thread decisions** line for each open id. If you killed a parked thread to free a parked slot, record that kill too.

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
