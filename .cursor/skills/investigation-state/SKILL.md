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

`status.yml` fields: `id`, `mode`, `opened`, `updated`, `status` (`active` | `parked` | `killed` | `ready-to-write` | `published`), `next_action`, `last_decision` (`continue` | `park` | `kill`), `series`, `part`, `consecutive_continue_without_new_primary`.

## Rules

- Facts, inferences, and hypotheses live in different files. Do not promote a hypothesis to a fact by rewriting it.
- Every evidence file gets URL, retrieved date, hash or filename, and a short excerpt.
- After **three** consecutive CONTINUE days with no new primary excerpt, or two days with the same `next_action`, park or kill. Write why in `gaps.md`. Repeating an unchanged API query is not new evidence.
- Do not commit PDFs or zips. URL, retrieved date, locator, short excerpt.
- Append traces of the run (what you searched, what you opened) to `traces/YYYY-MM-DD.md`.
- Also write this run to `newsroom/journal/_incoming.md` and run `npm run journal:append`. Never overwrite a dated journal that already exists.
- Copy `status.yml` `next_action` into `newsroom/state.json` `next_action` (or a short portfolio sentence if two threads are active). Write a 2–4 sentence `handoff` the next clone can trust.
- Update `newsroom/state.json` `open_investigations` (active only, max 3) and `parked_investigations` (max 10) to match reality. Parked do not occupy active slots.
- To kill: set `status: killed`, `last_decision: kill`, write why in `gaps.md`, remove the id from both `open_investigations` and `parked_investigations`. Keep the folder. Killing a parked thread to make room when the parked list is full is required, not optional.
