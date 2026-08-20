---
name: investigation-state
description: Keeps a multi-day investigation organized across sessions using git files — status, hypothesis, claim ledger, evidence log, traces. Use when opening, continuing, parking, or killing an investigation.
---

# Investigation state

Git is memory. If it is not in the investigation folder, you do not know it.

## Folder

```
newsroom/investigations/<yyyy-nnn-slug>/
  assignment.md
  status.yml
  hypothesis.md
  timeline.md
  claim-ledger.yml
  evidence-log.md
  evidence/
  traces/
  gaps.md
```

`status.yml` fields: `id`, `mode`, `opened`, `updated`, `status` (`active` | `parked` | `killed` | `ready-to-write` | `published`), `next_action`, `series`, `part`, `consecutive_continue_without_new_primary`.

## Rules

- Facts, inferences, and hypotheses live in different files. Do not promote a hypothesis to a fact by rewriting it.
- Every evidence file gets URL, retrieved date, hash or filename, and a short excerpt.
- After five consecutive CONTINUE days with no new primary document, park or kill. Write why in `gaps.md`.
- Do not commit PDFs or zips. URL, retrieved date, locator, short excerpt.
- Append traces of the run (what you searched, what you opened) to `traces/YYYY-MM-DD.md`.
- Also append a human-readable day to `newsroom/journal/YYYY-MM-DD.md`. The desk journal is mandatory even if the investigation folder is unchanged.
- Update `newsroom/state.json` `open_investigations` to match reality.
