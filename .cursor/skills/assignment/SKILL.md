---
name: assignment
description: Scores and selects investigative leads from primary-document horizon intake. Use when choosing what to investigate, ranking leads, starting a new investigation, or rejecting news-derived or recap pitches.
---

# Assignment

Pick work that can become a discovery or an argued view after days of reading. Not volume. Not “the report says what the report says.”

## Scoring a lead

Score 1–5 on each, then write one sentence for “what would be new”:

- public interest (money, power, safety, rights, environment)
- originality versus `published/`, `killfile.md`, and the source’s own summary
- document-nativeness (can this be proven without a news article?)
- room to grow (series, more documents, a pivot)
- legal risk (subtract)

Originality is 1 if a careful reader of the first PDF’s summary already has the finding. Cap originality at 2 unless you can name the **second** document or the pattern across time.

Reject immediately if:

- the best URL is a newspaper, blog, or aggregator
- the finding sentence could be written from a homepage or from page 1 of one report
- the entity cannot be uniquely identified
- it duplicates an open investigation

## Output

Write `newsroom/leads/inbox/<id>.md` with:

- hypothesis (testable)
- primary documents to fetch first
- human stake in one line
- why it might be wrong
- whether it could be a series

Start at most one new investigation per day. Prefer `CONTINUE`. Cap open investigations at three.
