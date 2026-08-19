import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArticle, validateArticle } from "./lib/article.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));

describe("article gates", () => {
  it("accepts a primary-source fixture", async () => {
    const raw = await readFile(path.join(here, "fixtures/valid.md"), "utf8");
    const parsed = parseArticle(raw, "valid.md");
    assert.equal(parsed.ok, true);
    assert.deepEqual(validateArticle(parsed.data, parsed.body, "valid.md"), []);
  });

  it("rejects a news rewrite", async () => {
    const raw = await readFile(path.join(here, "fixtures/invalid.md"), "utf8");
    const parsed = parseArticle(raw, "invalid.md");
    const errors = validateArticle(parsed.data, parsed.body, "invalid.md");
    assert.ok(errors.some((e) => /disclosure/.test(e)));
    assert.ok(errors.some((e) => /news/.test(e)));
    assert.ok(errors.some((e) => /byline/.test(e)));
    assert.ok(errors.some((e) => /news attribution/.test(e)));
    assert.ok(errors.some((e) => /two independent/.test(e)));
  });
});
