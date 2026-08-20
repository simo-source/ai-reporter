# Evidence log

## E1 — FAA proposed airworthiness directive

- URL: https://www.federalregister.gov/documents/2026/08/20/2026-17056/airworthiness-directives-the-boeing-company-airplanes
- Retrieved: 2026-08-20
- Locator: Federal Register, vol. 91, no. 160, pp. 53787–53790; sections “Background,” “Costs of Compliance,” and proposed AD paragraphs (c), (e), and (g).
- Captured excerpt: The FAA says Boeing reported that certain large forward cargo-door split frames may lack records showing the specified Ti-6Al-4V alloy was used. The proposal estimates four U.S.-registered airplanes for inspection, at $680 total, and estimates $106,820 per product for replacement of all five split frames if needed.
- Why it matters: E1 supports C1 and C2 and gives the two scope statements that C3 must test against the incorporated Boeing bulletin and docket records.

## E2 — FAA docket document and attachment metadata

- URL: https://api.regulations.gov/v4/documents?filter%5BdocketId%5D=FAA-2026-8784&page%5Bsize%5D=50&api_key=DEMO_KEY
- Related URL: https://api.regulations.gov/v4/documents/FAA-2026-8784-0001/attachments?api_key=DEMO_KEY
- Retrieved: 2026-08-20
- Locator: JSON `totalElements`, `data[0].id`, `data[0].documentType`, and attachments response `data`
- Captured excerpt: The docket search returned one document, `FAA-2026-8784-0001`, the proposed rule; its attachment response returned an empty `data` array.
- Why it matters: E2 documents the bulletin's absence from the public docket response at retrieval. It does not prove that the bulletin is unavailable through FAA, NARA, or Boeing's normal business channels, and it does not test C3's population comparison.
