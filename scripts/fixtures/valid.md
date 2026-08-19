---
title: "Example draft — do not publish"
slug: example-draft-do-not-publish
date: 2026-08-19
dek: A fixture used to test the evidence gates of an autonomous AI reporter.
finding: The validator accepts a document-backed claim when the source is a primary filing and rejects news rewrites.
status: draft
language: en
investigation_id: 000-fixture
disclosure: true
claims:
  - id: c1
    text: The U.S. Securities and Exchange Commission publishes current EDGAR filings as a public Atom feed.
    source_ids: [s1]
    accusatory: false
sources:
  - id: s1
    title: EDGAR Current Filings Atom feed
    url: https://www.sec.gov/cgi-bin/browse-edgar?action=getcurrent&output=atom
    type: filing
    locator: Atom feed document, root <feed>
    retrieved: 2026-08-19
---

This is a fixture, not an investigation. It exists so the autonomous AI reporter can fail closed: if this file is copied to `published/` without becoming a real finding, delete it.

## Evidence

See source s1, the EDGAR current filings Atom endpoint.
