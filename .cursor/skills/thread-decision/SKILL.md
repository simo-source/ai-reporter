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

Write why in `gaps.md`. Set `status: parked`. Remove the id from `state.open_investigations`; add it to `state.parked_investigations`. A parked thread may be reopened if a new primary appears.

## Kill — the hypothesis is spent

Kill when:

- the finding is the source’s own summary
- identity cannot be joined from public primaries
- legal risk exceeds public interest
- the desk is generating hypotheses without documents

Write why. Do not reopen without a new hypothesis and a new first document.

## Parallelism

Work **up to two** active threads in one run. Typical split:

1. Decide every open thread (cheap)
2. Push the most promising one with real reading
3. Spend remaining budget on a second thread: reopen a parked lead, or start **one** new investigation if a slot is free

Do not open a third. Do not let one stuck thread consume the whole run.
