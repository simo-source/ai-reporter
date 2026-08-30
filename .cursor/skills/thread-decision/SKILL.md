---
name: thread-decision
description: Decides whether to continue, park, or kill each open investigation. Use at the start of every desk run before doing more document fetches, and whenever a thread looks blocked or repetitive.
---

# Thread decision

Abandoning a weak thread is a success. Repeating yesterday’s query is a failure.

For **each** open investigation, write `continue` | `park` | `kill` in that run’s journal **before** fetching more of the same URLs.

## Continue — only if all of these are true

- There is a **new** public primary to open today (a URL or series not already in `evidence/`), **or** a comparison between two already-captured primaries that has not been done
- The next action is not a copy of yesterday’s `next_action`
- Public interest still justifies days of work
- The missing piece is plausibly in a **public** record, not behind operator credentials, a paywall, or “wait for the final rule”

## Park — blocked, not disproven

Park when:

- two consecutive days would do the same fetch (same docket, same API, same search)
- three consecutive `CONTINUE` days add no new primary excerpt
- the missing document is incorporated-by-reference, operator-only, or otherwise not public
- a better lead is sitting in `leads/inbox/` and this thread cannot move without a future filing
- a GAO (or similar) HTML product page returns 403 **and** the official PDF candidates were tried the same day and still failed, or the PDF is only the report’s own summary

Write why in `gaps.md`. Set `status: parked`. Remove the id from `state.open_investigations`; add it to `state.parked_investigations`. A parked thread may be reopened if a new primary appears.

If `parked_investigations` is already at 10, **kill** the weakest parked investigation first, then park. Do not refuse the park because the parked list is full.

## Kill — the hypothesis is spent

Kill when:

- the finding is the source’s own summary
- identity cannot be joined from public primaries
- legal risk exceeds public interest
- the desk is generating hypotheses without documents
- the parked list is at cap and this parked thread is the weakest (no remaining public path, reopen condition unmet, or lower public interest than the thread that needs the slot)
- a parked thread has no remaining public reopen path — even below the cap. Do not keep dead files to fill the ten slots.

Write why in `gaps.md`. Set `status: killed`. Remove the id from both `open_investigations` and `parked_investigations`. Keep the folder. Do not reopen without a new hypothesis and a new first document.

Killing to make room is authorized. Prefer killing the parked thread with the least remaining public path, not the newest or the one you remember last.

## Capacity

- **Active** (`open_investigations`): max 3. This is the only cap that blocks starting a new investigation.
- **Parked** (`parked_investigations`): max 10. Does not block starting a new investigation.
- An inbox lead may become an investigation while other threads are parked, if an active slot is free.
- Work **at most two** threads in one run. Do not work a third the same day. Do not let one stuck thread consume the whole run.

## Parallelism

Typical split:

1. Decide every open thread (cheap). Review parked threads only if you might reopen one or need to kill for parked-list space.
2. Push the most promising one with real reading
3. Spend remaining budget on a second thread: reopen a parked lead, or start **one** new investigation if an active slot is free
