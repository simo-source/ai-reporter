#!/usr/bin/env node
import { readFile, writeFile, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { appendRun, lastRunBody } from "./lib/journal.mjs";
import { utcStamp } from "./lib/horizon.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const incomingPath = path.join(root, "newsroom/journal/_incoming.md");

async function main() {
  if (!existsSync(incomingPath)) {
    console.error("Missing newsroom/journal/_incoming.md — write this run there, then rerun.");
    process.exit(1);
  }
  const incoming = await readFile(incomingPath, "utf8");
  const day = utcStamp();
  const datedPath = path.join(root, "newsroom/journal", `${day}.md`);
  const existing = existsSync(datedPath) ? await readFile(datedPath, "utf8") : "";
  const combined = appendRun(existing, incoming);
  await writeFile(datedPath, combined);
  await writeFile(path.join(root, "newsroom/journal/latest.md"), `${lastRunBody(combined)}\n`);
  await unlink(incomingPath);
  console.log(`Appended run to newsroom/journal/${day}.md`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
