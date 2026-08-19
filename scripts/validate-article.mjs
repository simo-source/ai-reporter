#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectMarkdown, validateFile } from "./lib/article.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

async function main() {
  const targets = [];
  if (args.includes("--all")) {
    targets.push(
      ...(await collectMarkdown(path.join(root, "newsroom/published"))),
      ...(await collectMarkdown(path.join(root, "newsroom/drafts"))),
    );
  } else {
    const files = args.filter((a) => !a.startsWith("--"));
    if (files.length === 0) {
      console.error("Usage: node scripts/validate-article.mjs <file.md> | --all");
      process.exit(2);
    }
    targets.push(...files.map((f) => path.resolve(f)));
  }

  if (targets.length === 0) {
    console.log("No articles to validate.");
    return;
  }

  let failed = 0;
  for (const file of targets) {
    const errors = await validateFile(file);
    if (errors.length) {
      failed += 1;
      console.error(`FAIL ${path.relative(root, file)}`);
      for (const err of errors) console.error(`  - ${err}`);
    } else {
      console.log(`OK   ${path.relative(root, file)}`);
    }
  }

  if (failed) {
    console.error(`\n${failed} article(s) failed validation.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
