#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { lastRunBody } from "./lib/journal.mjs";
import { canStartInvestigation, slotCounts, slotLimits, slotViolations } from "./lib/slots.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function print(title, body) {
  console.log(`\n## ${title}\n`);
  console.log(body.trimEnd());
}

async function main() {
  const statePath = path.join(root, "newsroom/state.json");
  const state = JSON.parse(await readFile(statePath, "utf8"));

  const limits = slotLimits(state);
  const counts = slotCounts(state);
  const openList = (state.open_investigations || []).join(", ") || "(none)";
  const parkedList = (state.parked_investigations || []).join(", ") || "(none)";

  console.log("# Desk status — previous run\n");
  console.log(`last_run: ${state.last_run ?? "(none)"}`);
  console.log(`last_mode: ${state.last_mode ?? "(none)"}`);
  console.log(`last_horizon: ${state.last_horizon ?? "(none)"}`);
  console.log(`last_published_at: ${state.last_published_at ?? "(none)"}`);
  console.log(`open_investigations: ${openList} (${counts.open}/${limits.maxOpen} active)`);
  console.log(`parked_investigations: ${parkedList} (${counts.parked}/${limits.maxParked} parked)`);
  console.log(`max_active_workstreams_per_run: ${state.max_active_workstreams_per_run ?? 2}`);
  console.log(`next_action: ${state.next_action ?? "(none)"}`);
  if (state.handoff) print("Handoff", state.handoff);

  const violations = slotViolations(state);
  if (violations.length) {
    print("Slot violations", violations.map((v) => `- ${v}`).join("\n"));
  }

  const latestJournal = path.join(root, "newsroom/journal/latest.md");
  const datedJournal = state.last_journal
    ? path.join(root, state.last_journal)
    : null;
  const journalPath = existsSync(latestJournal)
    ? latestJournal
    : datedJournal && existsSync(datedJournal)
      ? datedJournal
      : null;
  if (journalPath) {
    print(`Last journal run (${path.relative(root, journalPath)})`, lastRunBody(await readFile(journalPath, "utf8")));
  } else {
    print("Journal", "No previous journal found. This is the first run, or continuity was not written.");
  }

  for (const id of state.open_investigations || []) {
    const statusPath = path.join(root, "newsroom/investigations", id, "status.yml");
    const gapsPath = path.join(root, "newsroom/investigations", id, "gaps.md");
    const hypothesisPath = path.join(root, "newsroom/investigations", id, "hypothesis.md");
    if (!existsSync(statusPath)) {
      print(`Investigation ${id}`, "status.yml missing — treat as unknown, do not invent progress.");
      continue;
    }
    const status = parseYaml(await readFile(statusPath, "utf8"));
    const parts = [
      `status: ${status.status}`,
      `mode: ${status.mode}`,
      `next_action: ${status.next_action}`,
      `consecutive_continue_without_new_primary: ${status.consecutive_continue_without_new_primary ?? 0}`,
      `last_decision: ${status.last_decision ?? "(none)"}`,
    ];
    if (existsSync(hypothesisPath)) {
      parts.push("", await readFile(hypothesisPath, "utf8"));
    }
    if (existsSync(gapsPath)) {
      parts.push("", await readFile(gapsPath, "utf8"));
    }
    print(`Investigation ${id}`, parts.join("\n"));
  }

  if ((state.open_investigations || []).length) {
    console.log("\n## Decision required\n");
    console.log("For each open investigation: continue, park, or kill in writing before repeating yesterday's fetch. Work at most two threads. Do not treat an open id as a life sentence.");
  } else if (canStartInvestigation(state)) {
    console.log("\n## Capacity\n");
    console.log("No active investigations. Parked files do not occupy the three active slots. A strong inbox lead may be opened. If parked is at cap, kill the weakest parked before parking another.");
  }

  if (violations.length) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
