import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { marked } from "marked";

const deskDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../newsroom/desk",
);

function splitFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  return { data: parseYaml(match[1]) ?? {}, body: match[2] };
}

export function isDeskNoteName(name) {
  return /^\d{4}-\d{2}-\d{2}-r\d+\.md$/.test(name);
}

export async function listDeskNotes() {
  if (!existsSync(deskDir)) return [];
  const names = (await readdir(deskDir)).filter(isDeskNoteName);
  const notes = [];
  for (const name of names) {
    const raw = await readFile(path.join(deskDir, name), "utf8");
    const { data, body } = splitFrontmatter(raw);
    const slug = name.replace(/\.md$/, "");
    notes.push({
      ...data,
      slug,
      date: data.date || slug.slice(0, 10),
      time: data.time || data.date,
      mode: data.mode || "SCAN",
      run: Number(data.run) || Number((slug.match(/r(\d+)$/) || [])[1]) || 1,
      body,
      html: marked.parse(body, { async: false }),
      filename: name,
    });
  }
  return notes.sort((a, b) => {
    const tb = String(b.time || b.date).localeCompare(String(a.time || a.date));
    if (tb) return tb;
    return b.run - a.run;
  });
}

export async function getDeskNote(slug) {
  const all = await listDeskNotes();
  return all.find((note) => note.slug === slug) ?? null;
}
