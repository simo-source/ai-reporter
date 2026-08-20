# E2 — FAA docket document and attachment metadata

- Source: Regulations.gov API
- URL: https://api.regulations.gov/v4/documents?filter%5BdocketId%5D=FAA-2026-8784&page%5Bsize%5D=50&api_key=DEMO_KEY
- Related document URL: https://api.regulations.gov/v4/documents/FAA-2026-8784-0001/attachments?api_key=DEMO_KEY
- Retrieved: 2026-08-20
- Locator: JSON response fields `totalElements`, `data[0].id`, `data[0].documentType`, and the attachments response `data` array
- Filename: 2026-08-20-faa-docket-api.md

Short excerpt:

> The docket search returned `totalElements: 1`, with only `FAA-2026-8784-0001`, the proposed rule. The attachment relationship for that document returned an empty `data` array.

Why it matters: E2 is a primary record of the docket's public contents at retrieval. It shows that the incorporated Boeing requirements bulletin and its Appendix A were not present as a docket document or attachment at that time; it does not establish that the bulletin is unavailable through FAA, NARA, or Boeing's normal business channels.
