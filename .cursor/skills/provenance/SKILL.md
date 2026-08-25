---
name: provenance
description: Enforces primary-source locators on every claim to prevent fact laundering. Use when citing documents, writing claims, attaching evidence, or converting a draft into a published article.
---

# Provenance

A true fact with the wrong source is still a failure.

## Required locator

For each source: URL + one of page, paragraph, section heading, Bates/accession number, table row, or timestamp. “See filing” is not a locator.

## Independence

Two stories quoting one 8-K are one source. Two filings from the same issuer can be independent. A press release plus the filing it describes are not independent for the fact the filing contains — use the filing.

## Capture

When you open a document, store in `evidence/`:

- original URL
- retrieval timestamp
- local excerpt (short)
- why it matters to a claim id

Never commit full dumps of personal data. Prefer public permalinks.

Do not commit PDFs, zips, or other binaries. URL + retrieved date + locator + a short excerpt is the evidence record.

## Blocked official pages

`gao.gov/products/...` often returns HTTP 403. Same day, before parking:

1. `https://www.gao.gov/assets/<gao-id>.pdf`
2. `https://files.gao.gov/assets/<gao-id>.pdf`
3. the RSS item’s `pdf_url` from today’s horizon, if present

If those fail or the PDF is only the report’s own “What GAO Found” summary, park. Do not spend the next morning retrying the HTML product page.
