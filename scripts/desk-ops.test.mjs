import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { horizonIsFresh } from "./lib/horizon.mjs";
import { appendRun, lastRunBody, nextRunNumber } from "./lib/journal.mjs";
import { gaoPdfCandidates, gaoProductId } from "./lib/gao.mjs";
import {
  canParkWithoutKill,
  canStartInvestigation,
  slotViolations,
} from "./lib/slots.mjs";
import { countWords, parseRunHeading } from "./lib/desk-note.mjs";

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

describe("investigation slots", () => {
  const parkedThree = {
    max_open_investigations: 3,
    max_parked_investigations: 10,
    open_investigations: [],
    parked_investigations: ["a", "b", "c"],
  };

  it("lets a new investigation start while others are parked", () => {
    assert.equal(canStartInvestigation(parkedThree), true);
    assert.equal(canParkWithoutKill(parkedThree), true);
    assert.deepEqual(slotViolations(parkedThree), []);
  });

  it("blocks a fourth active investigation", () => {
    const full = {
      ...parkedThree,
      open_investigations: ["one", "two", "three"],
    };
    assert.equal(canStartInvestigation(full), false);
  });

  it("requires a kill before parking an eleventh thread", () => {
    const fullGarage = {
      open_investigations: ["active"],
      parked_investigations: Array.from({ length: 10 }, (_, i) => `p${i}`),
    };
    assert.equal(canParkWithoutKill(fullGarage), false);
    assert.equal(canStartInvestigation(fullGarage), true);
    assert.ok(slotViolations({ ...fullGarage, parked_investigations: [...fullGarage.parked_investigations, "p10"] }).length);
  });
});

describe("desk notes", () => {
  it("parses the journal run heading", () => {
    const heading = parseRunHeading("## Run 3 — 2026-08-30T19:20:23.542Z\n\nbody");
    assert.equal(heading.run, 3);
    assert.match(heading.time, /2026-08-30/);
  });

  it("rejects a journal dump by word count", () => {
    assert.ok(countWords("one two three") < 10);
    const long = Array.from({ length: 300 }, () => "word").join(" ");
    assert.equal(countWords(long), 300);
  });
});

describe("gao pdf candidates", () => {
  it("derives asset URLs from a product page", () => {
    assert.equal(gaoProductId("https://www.gao.gov/products/gao-26-108019"), "gao-26-108019");
    assert.ok(gaoPdfCandidates("gao-26-108019").includes("https://www.gao.gov/assets/gao-26-108019.pdf"));
  });
});
