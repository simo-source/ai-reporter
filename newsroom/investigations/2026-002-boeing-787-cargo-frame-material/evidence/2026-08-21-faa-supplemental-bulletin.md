# E3 — FAA docket now lists the Boeing bulletin

- URL: https://api.regulations.gov/v4/documents?filter%5BdocketId%5D=FAA-2026-8784&page%5Bsize%5D=50&api_key=DEMO_KEY
- Related URLs:
  - https://api.regulations.gov/v4/documents/FAA-2026-8784-0002?api_key=DEMO_KEY
  - https://api.regulations.gov/v4/documents/FAA-2026-8784-0002/attachments?api_key=DEMO_KEY
  - https://downloads.regulations.gov/FAA-2026-8784-0002/attachment_1.pdf
- Retrieved: 2026-08-21T07:08:00Z
- Filename: `attachment_1.pdf` (not committed; the download endpoint returned HTTP 403 during this run)
- Locator: Docket query `data[1]`; document `FAA-2026-8784-0002`; attachment response `data[0]`.
- Captured excerpt: The docket now lists a second public document, `FAA-2026-8784-0002`, titled “U.S. DOT/FAA - Supplemental AD Documents.” Its attachment is titled “B787-81205-SB530106-00 RB Issue 001 reduced,” is identified as a PDF, and has a listed size of 4,617,647 bytes.
- Why it matters: E3 establishes that the incorporated bulletin was added to the public docket after E2. The metadata identifies the bulletin but does not expose Appendix A or permit the affected-batch comparison; C3 remains untested.
