#!/usr/bin/env node
import { readFile, writeFile, unlink, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { utcStamp } from "./lib/horizon.mjs";
import { countWords, deskSlug, parseRunHeading } from "./lib/desk-note.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const incomingPath = path.join(root, "newsroom/desk/_incoming.md");
const latestJournal = path.join(root, "newsroom/journal/latest.md");

function splitFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: raw.trim() };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    data[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { data, body: match[2].trim() };
}

async function main() {
  if (!existsSync(incomingPath)) {
    console.error("Missing newsroom/desk/_incoming.md — write the public note there after the journal, then rerun.");
    process.exit(1);
  }
  if (!existsSync(latestJournal)) {
    console.error("Missing newsroom/journal/latest.md — append the journal first.");
    process.exit(1);
  }
  const incoming = await readFile(incomingPath, "utf8");
  const { data, body } = splitFrontmatter(incoming);
  if (!body) {
    console.error("Desk note body is empty.");
    process.exit(1);
  }
  const words = countWords(body);
  if (words > 280) {
    console.error(`Desk note is ${words} words; keep it under 280. This is not the journal.`);
    process.exit(1);
  }
  const heading = parseRunHeading(await readFile(latestJournal, "utf8"));
  if (!heading) {
    console.error("Could not parse ## Run N from newsroom/journal/latest.md");
    process.exit(1);
  }
  const date = utcStamp();
  const slug = deskSlug(date, heading.run);
  const dir = path.join(root, "newsroom/desk");
  await mkdir(dir, { recursive: true });
  const outPath = path.join(dir, `${slug}.md`);
  if (existsSync(outPath)) {
    console.error(`${outPath} already exists. Do not overwrite a public note.`);
    process.exit(1);
  }
  const mode = (data.mode || "SCAN").toUpperCase();
  const file = `---
date: ${date}
time: ${heading.time}
mode: ${mode}
run: ${heading.run}
---

${body}
`;
  await writeFile(outPath, file.endsWith("\n") ? file : `${file}\n`);
  await unlink(incomingPath);
  console.log(`Wrote newsroom/desk/${slug}.md (${words} words)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
