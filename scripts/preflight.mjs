#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const kill = existsSync(path.join(root, "newsroom/KILL"));
const hold = existsSync(path.join(root, "newsroom/HOLD"));
const publishEnv = (process.env.PUBLISH_ENABLED ?? "true").toLowerCase() !== "false";

const result = {
  kill,
  hold,
  publish_enabled: publishEnv && !kill && !hold,
  action: kill ? "STOP" : hold ? "DRAFT_ONLY" : publishEnv ? "AUTONOMOUS" : "DRAFT_ONLY",
};

console.log(JSON.stringify(result, null, 2));

if (kill) {
  console.error("KILL file present. Daily desk must stop.");
  process.exit(10);
}

process.exit(0);
