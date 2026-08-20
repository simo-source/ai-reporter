---
name: desk-journal
description: Writes the mandatory internal desk journal for The Primary Record. Use at the start of wrap-up on every daily run, including SCAN, CONTINUE, REST, KILL, HOLD, and days with no article.
---

# Desk journal

If today’s journal file does not exist, the run failed.

Write `newsroom/journal/YYYY-MM-DD.md` from `newsroom/journal/_template.md`. Do this **before** copying anything to `published/`.

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
