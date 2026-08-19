---
name: assignment
description: Scores and selects investigative leads from primary-document horizon intake. Use when choosing what to investigate, ranking leads, starting a new investigation, or rejecting news-derived pitches.
---

# Assignment

Pick work a careful human editor would still want. Not volume.

## Scoring a lead

Score 1–5 on each, then write one sentence for “what would be new”:

- public interest (money, power, safety, rights, environment)
- originality versus `published/` and `killfile.md`
- document-nativeness (can this be proven without a news article?)
- verification cost (hours of documents, not vibes)
- legal risk (subtract)

Reject immediately if:

- the best URL is a newspaper, blog, or aggregator
- the finding sentence could be written from a homepage
- the entity cannot be uniquely identified
- it duplicates an open investigation

## Output

Write `newsroom/leads/inbox/<id>.md` with:

- hypothesis (testable)
- primary documents to fetch first
- human stake in one line
- estimated mode sequence (`SCAN` → `CONTINUE` → `WRITE`)
- why it might be wrong

Start at most one new investigation. Prefer `CONTINUE`. Cap open investigations at two.
