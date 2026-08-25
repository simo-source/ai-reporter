import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { horizonIsFresh } from "./lib/horizon.mjs";
import { appendRun, lastRunBody, nextRunNumber } from "./lib/journal.mjs";
import { gaoPdfCandidates, gaoProductId } from "./lib/gao.mjs";

describe("horizon freshness", () => {
  it("treats today's latest.json as fresh", () => {
    assert.equal(horizonIsFresh({ date: "2026-08-25" }, "2026-08-25"), true);
    assert.equal(horizonIsFresh({ date: "2026-08-24" }, "2026-08-25"), false);
  });
});

describe("journal append", () => {
  it("returns the last run after a separator", () => {
    const md = "# Journal\n\nfirst\n\n---\n\n## Run 2 — t\n\nsecond\n";
    assert.equal(lastRunBody(md), "## Run 2 — t\n\nsecond");
    assert.equal(nextRunNumber(md), 3);
  });

  it("appends instead of replacing", () => {
    const first = appendRun("", "## Mode\n\nSCAN\n");
    const second = appendRun(first, "## Mode\n\nCONTINUE\n", { at: new Date("2026-08-25T15:00:00Z") });
    assert.match(second, /SCAN/);
    assert.match(second, /CONTINUE/);
    assert.match(second, /## Run 2/);
    assert.equal(lastRunBody(second).includes("SCAN"), false);
  });
});

describe("gao pdf candidates", () => {
  it("derives asset URLs from a product page", () => {
    assert.equal(gaoProductId("https://www.gao.gov/products/gao-26-108019"), "gao-26-108019");
    assert.ok(gaoPdfCandidates("gao-26-108019").includes("https://www.gao.gov/assets/gao-26-108019.pdf"));
  });
});
