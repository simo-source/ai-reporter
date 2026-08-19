import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";

export const PRIMARY_TYPES = new Set([
  "government",
  "court",
  "filing",
  "dataset",
  "official_release",
  "gazette",
  "transcript",
  "contract",
  "archive",
]);

export const BANNED_SOURCE_TYPES = new Set([
  "news",
  "blog",
  "social",
  "wikipedia",
  "encyclopedia",
  "model",
]);

const REQUIRED_FIELDS = [
  "title",
  "slug",
  "date",
  "dek",
  "finding",
  "status",
  "language",
  "investigation_id",
  "claims",
  "sources",
  "disclosure",
];

export function parseArticle(raw, filePath = "article.md") {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { ok: false, errors: [`${filePath}: missing YAML frontmatter`], data: null, body: "" };
  }
  let data;
  try {
    data = parseYaml(match[1]);
  } catch (err) {
    return { ok: false, errors: [`${filePath}: YAML parse error: ${err.message}`], data: null, body: "" };
  }
  return { ok: true, errors: [], data: data ?? {}, body: match[2] };
}

export function validateArticle(data, body, filePath = "article.md") {
  const errors = [];
  if (!data || typeof data !== "object") {
    return [`${filePath}: frontmatter is not an object`];
  }

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      errors.push(`${filePath}: missing ${field}`);
    }
  }

  if (data.language && data.language !== "en") {
    errors.push(`${filePath}: language must be en`);
  }

  if (data.status && !["draft", "published"].includes(data.status)) {
    errors.push(`${filePath}: status must be draft or published`);
  }

  if (data.disclosure !== true) {
    errors.push(`${filePath}: disclosure must be true`);
  }

  if (typeof data.finding === "string" && data.finding.trim().split(/\s+/).length < 8) {
    errors.push(`${filePath}: finding is too thin — say what is new, in one specific sentence`);
  }

  const claims = Array.isArray(data.claims) ? data.claims : [];
  const sources = Array.isArray(data.sources) ? data.sources : [];
  const sourceById = new Map(sources.map((s) => [s.id, s]));

  if (claims.length < 1) {
    errors.push(`${filePath}: at least one claim is required`);
  }

  if (sources.length < 1) {
    errors.push(`${filePath}: at least one source is required`);
  }

  for (const source of sources) {
    if (!source?.id) errors.push(`${filePath}: source missing id`);
    if (!source?.url || !/^https?:\/\//i.test(source.url)) {
      errors.push(`${filePath}: source ${source?.id ?? "?"} needs an http(s) url`);
    }
    if (!source?.type) {
      errors.push(`${filePath}: source ${source?.id ?? "?"} missing type`);
    } else if (BANNED_SOURCE_TYPES.has(source.type)) {
      errors.push(`${filePath}: source ${source.id} type '${source.type}' cannot prove a claim`);
    } else if (!PRIMARY_TYPES.has(source.type)) {
      errors.push(`${filePath}: source ${source.id} unknown type '${source.type}'`);
    }
    if (!source?.locator) {
      errors.push(`${filePath}: source ${source.id} missing locator`);
    }
    if (!source?.retrieved) {
      errors.push(`${filePath}: source ${source.id} missing retrieved date`);
    }
  }

  for (const claim of claims) {
    if (!claim?.id) errors.push(`${filePath}: claim missing id`);
    if (!claim?.text || String(claim.text).trim().length < 12) {
      errors.push(`${filePath}: claim ${claim?.id ?? "?"} text is too short`);
    }
    const ids = claim?.source_ids ?? [];
    if (!Array.isArray(ids) || ids.length < 1) {
      errors.push(`${filePath}: claim ${claim?.id ?? "?"} needs source_ids`);
      continue;
    }
    for (const id of ids) {
      const source = sourceById.get(id);
      if (!source) {
        errors.push(`${filePath}: claim ${claim.id} points to missing source ${id}`);
        continue;
      }
      if (!PRIMARY_TYPES.has(source.type)) {
        errors.push(`${filePath}: claim ${claim.id} is not backed by a primary source`);
      }
    }
    if (claim.accusatory && ids.length < 2) {
      errors.push(`${filePath}: accusatory claim ${claim.id} needs two independent primary sources`);
    }
  }

  const lower = `${data.title ?? ""}\n${body}`.toLowerCase();
  if (/\baccording to (?:a |the )?(?:report|article|story) in\b/.test(lower)) {
    errors.push(`${filePath}: news attribution in the lede — use the underlying document`);
  }

  if (data.byline && /staff writer|correspondent|editor/i.test(String(data.byline))) {
    errors.push(`${filePath}: fake human byline`);
  }

  if (!/autonomous ai reporter/i.test(body) && !/autonomous ai reporter/i.test(String(data.dek ?? ""))) {
    errors.push(`${filePath}: body or dek must identify an autonomous AI reporter`);
  }

  return errors;
}

export async function validateFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  const parsed = parseArticle(raw, filePath);
  if (!parsed.ok) return parsed.errors;
  return validateArticle(parsed.data, parsed.body, filePath);
}

export async function collectMarkdown(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await collectMarkdown(full)));
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}
