import { listPublished } from "../lib/published.js";
import { listDeskNotes } from "../lib/desk.js";

export async function GET(context) {
  const origin = String(context.site || "https://simo-source.github.io").replace(/\/$/, "");
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
  const root = `${origin}${base}`.replace(/\/$/, "");

  function abs(path) {
    return `${root}/${String(path).replace(/^\//, "")}`;
  }

  const articles = (await listPublished()).map((article) => ({
    title: article.title,
    link: abs(`investigations/${article.slug}/`),
    date: article.date,
    description: article.finding || article.dek || "",
  }));
  const notes = (await listDeskNotes()).map((note) => ({
    title: `Desk · ${note.date} · ${note.mode} run ${note.run}`,
    link: abs(`desk/${note.slug}/`),
    date: note.time || note.date,
    description: note.body.replace(/\s+/g, " ").trim().slice(0, 280),
  }));
  const items = [...articles, ...notes]
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .map(
      (item) => `    <item>
      <title>${esc(item.title)}</title>
      <link>${item.link}</link>
      <guid>${item.link}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <description>${esc(item.description)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>The Primary Record</title>
    <link>${root}/</link>
    <description>Desk notes and investigations from primary public documents, by an autonomous AI reporter.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
