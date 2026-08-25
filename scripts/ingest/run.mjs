#!/usr/bin/env node
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { horizonIsFresh, utcStamp } from "../lib/horizon.mjs";
import { ingest as secEdgar } from "./sources/sec-edgar.mjs";
import { ingest as federalRegister } from "./sources/federal-register.mjs";
import { ingest as gao } from "./sources/gao.mjs";
import { ingest as courtlistener } from "./sources/courtlistener.mjs";
import { ingest as ukLegislation } from "./sources/uk-legislation.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SOURCES = [
  ["sec-edgar", secEdgar],
  ["federal-register", federalRegister],
  ["gao", gao],
  ["courtlistener", courtlistener],
  ["uk-legislation", ukLegislation],
];

async function userAgent() {
  const raw = await readFile(path.join(root, "newsroom/masthead.yml"), "utf8");
  const masthead = parseYaml(raw);
  return masthead.user_agent || "ThePrimaryRecord/0.1 (autonomous investigative desk)";
}

function stamp() {
  return utcStamp();
}

function toBrief(bundles) {
  const lines = [
    `# Horizon brief — ${stamp()}`,
    "",
    "Primary-source intake only. News articles are not listed here. Pick leads from documents, not coverage.",
    "",
  ];
  for (const { name, items, error } of bundles) {
    lines.push(`## ${name}`);
    if (error) {
      lines.push(`Ingest failed: ${error}`);
      lines.push("");
      continue;
    }
    if (!items.length) {
      lines.push("No items.");
      lines.push("");
      continue;
    }
    for (const item of items.slice(0, 12)) {
      lines.push(`- **${item.title || "(untitled)"}**`);
      if (item.published) lines.push(`  - when: ${item.published}`);
      if (item.url) lines.push(`  - url: ${item.url}`);
      if (item.pdf_url) lines.push(`  - pdf: ${item.pdf_url}`);
      if (item.summary) lines.push(`  - ${item.summary.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

async function main() {
  if (existsSync(path.join(root, "newsroom/KILL"))) {
    console.error("KILL file present. Skipping ingest.");
    process.exit(10);
  }

  const force = process.argv.includes("--force");
  const day = stamp();
  const latestPath = path.join(root, "newsroom/horizon/latest.json");
  if (!force && existsSync(latestPath)) {
    try {
      const latest = JSON.parse(await readFile(latestPath, "utf8"));
      if (horizonIsFresh(latest, day)) {
        console.log(`Horizon already ${day}. Skip ingest (pass --force to refresh).`);
        return;
      }
    } catch {
      // stale or unreadable latest.json — ingest
    }
  }

  const ua = await userAgent();
  const outDir = path.join(root, "newsroom/horizon", day);
  await mkdir(outDir, { recursive: true });

  const bundles = [];
  for (const [name, fn] of SOURCES) {
    try {
      const items = (await fn({ userAgent: ua })).filter((item) => item.title && item.url);
      bundles.push({ name, items });
      await writeFile(path.join(outDir, `${name}.json`), JSON.stringify(items, null, 2));
      console.log(`${name}: ${items.length} items`);
    } catch (err) {
      bundles.push({ name, items: [], error: err.message });
      console.error(`${name}: FAILED ${err.message}`);
    }
  }

  const brief = toBrief(bundles);
  await writeFile(path.join(outDir, "BRIEF.md"), brief);
  await writeFile(path.join(root, "newsroom/horizon/latest.md"), brief);

  const summary = {
    date: day,
    generated_at: new Date().toISOString(),
    sources: bundles.map((b) => ({
      name: b.name,
      count: b.items.length,
      error: b.error ?? null,
    })),
  };
  await writeFile(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2));
  await writeFile(
    path.join(root, "newsroom/horizon/latest.json"),
    JSON.stringify(summary, null, 2),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
