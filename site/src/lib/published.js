import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { marked } from "marked";

const publishedDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../newsroom/published",
);

function splitFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  return { data: parseYaml(match[1]) ?? {}, body: match[2] };
}

export async function listPublished() {
  if (!existsSync(publishedDir)) return [];
  const names = (await readdir(publishedDir)).filter((n) => n.endsWith(".md"));
  const articles = [];
  for (const name of names) {
    const raw = await readFile(path.join(publishedDir, name), "utf8");
    const { data, body } = splitFrontmatter(raw);
    if (data.status && data.status !== "published") continue;
    articles.push({
      ...data,
      slug: data.slug || name.replace(/\.md$/, ""),
      body,
      html: marked.parse(body, { async: false }),
      filename: name,
    });
  }
  return articles.sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

export async function getPublished(slug) {
  const all = await listPublished();
  return all.find((a) => a.slug === slug) ?? null;
}
