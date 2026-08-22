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

## E3 — FAA docket now lists the Boeing bulletin

- URL: https://api.regulations.gov/v4/documents?filter%5BdocketId%5D=FAA-2026-8784&page%5Bsize%5D=50&api_key=DEMO_KEY
- Related URLs: https://api.regulations.gov/v4/documents/FAA-2026-8784-0002?api_key=DEMO_KEY and https://api.regulations.gov/v4/documents/FAA-2026-8784-0002/attachments?api_key=DEMO_KEY
- Retrieved: 2026-08-21
- Locator: Docket query `data[1]`; document `FAA-2026-8784-0002`; attachment response `data[0]`.
- Captured excerpt: The docket now lists a second public document, `FAA-2026-8784-0002`, titled “U.S. DOT/FAA - Supplemental AD Documents.” Its attachment is titled “B787-81205-SB530106-00 RB Issue 001 reduced,” is identified as a PDF, and has a listed size of 4,617,647 bytes. The linked download endpoint returned HTTP 403 during this run, so Appendix A was not read.
- Why it matters: E3 establishes that the incorporated bulletin was added to the public docket after E2. The metadata identifies the bulletin but does not expose Appendix A or permit the affected-batch comparison; C3 remains untested.

## E4 — Boeing requirements bulletin effectivity and affected batches

- URL: https://downloads.regulations.gov/FAA-2026-8784-0002/attachment_1.pdf
- Related URL: https://api.regulations.gov/v4/documents/FAA-2026-8784-0002/attachments?api_key=DEMO_KEY
- Retrieved: 2026-08-22T07:26:26Z
- Locator: Requirements Bulletin B787-81205-SB530106-00 RB, Issue 001, pp. 3–4 and Appendix A, pp. 151–152 of 154.
- Captured excerpt: Page 3 lists line numbers 1115, 1137, 1140, 1143, 1146, 1149, 1154, 1159, and 1162 as the bulletin’s 787-8 effectivity. Pages 151–152, Appendix A Table 1, list affected delivered-part and detail-part batch numbers for the relevant split-frame assemblies.
- Why it matters: E4 supplies the missing scope table. The bulletin’s nine listed aircraft effectivity differs from E1’s four-airplane U.S.-registry cost base, but that difference alone does not establish undercounting or regulatory error.
