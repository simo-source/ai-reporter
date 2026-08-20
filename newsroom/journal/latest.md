# Journal — 2026-08-20

## Mode

`CONTINUE`

An active investigation remains in `state.json`, so the desk continued 2026-002 instead of scanning for a new subject. Preflight exited 0 with autonomous operation; dependencies were installed because `yaml` was missing, and the primary-document horizon was refreshed. The investigation's first action was to inspect FAA-2026-8784 and determine whether the incorporated Boeing bulletin was publicly present.

## What I read

- `newsroom/horizon/2026-08-20/BRIEF.md` and refreshed source JSON — primary-document intake from SEC EDGAR, Federal Register, GAO, CourtListener, and UK legislation; used for discovery and continuity, not as proof of a new finding.
- Federal Register document 2026-17056, https://www.federalregister.gov/documents/2026/08/20/2026-17056/airworthiness-directives-the-boeing-company-airplanes — the proposal identifies Boeing Requirements Bulletin B787-81205-SB530106-00 RB, Issue 001, and says its Appendix A contains affected batch numbers; “Material Incorporated by Reference,” pp. 53788 and 53790.
- Federal Register full text, https://www.federalregister.gov/documents/full_text/text/2026/08/20/2026-17056.txt — confirms the proposal's four-airplane U.S.-registry estimate and the incorporation language; pp. 53788–53790, “Costs of Compliance,” proposed AD paragraphs (c), (g), and (k).
- Regulations.gov docket API, https://api.regulations.gov/v4/documents?filter%5BdocketId%5D=FAA-2026-8784&page%5Bsize%5D=50&api_key=DEMO_KEY — returned one document, `FAA-2026-8784-0001`, the NPRM; JSON `totalElements` and `data[0]`.
- Regulations.gov attachment API, https://api.regulations.gov/v4/documents/FAA-2026-8784-0001/attachments?api_key=DEMO_KEY — returned an empty `data` array, so no bulletin attachment was captured; this is a docket-state observation, not proof that the bulletin is unavailable through all channels.

## Leads

- No new lead was started. The existing Boeing investigation remains the only active thread.
- The parked nuclear-fuel, Army-network, SBA-size-standard, and DSCA-workforce leads remain parked because their needed appendices, tables, or implementation records were not examined and a recap would not be original.
- The NASA OIG subject remains killed under the publisher override and killfile.

## Investigation work

`2026-002-boeing-787-cargo-frame-material` now has E2, a primary docket-metadata record. It establishes that the public FAA-2026-8784 docket response contained only the NPRM and no attachment at retrieval, but it does not supply the Boeing bulletin's Appendix A and does not test whether the affected population is broader than the four-aircraft cost estimate. C3 remains an untested hypothesis; no claim of undercounting or regulatory error is warranted.

## Pivots and dead ends

The docket search did not yield the incorporated requirements bulletin, so the batch-population comparison could not be performed. I did not treat search snippets or secondary coverage as evidence, and I did not pursue the killed NASA recap or turn the FAA proposal's own summary into a finding.

## Publish decision

Not publishing this week. The investigation has two primary records but still lacks the affected-batch table or an official availability record sufficient to reconcile scope. A publishable result would require Appendix A or equivalent primary batch data, a reproducible comparison to the four-aircraft estimate, and a skeptic review. No article was copied to `drafts/` or `published/`.

## Next run

Recheck FAA-2026-8784 for the incorporated Boeing bulletin or locate an official FAA/NARA availability record; if the bulletin appears, capture Appendix A and compare its affected batches with the four-aircraft cost estimate.
