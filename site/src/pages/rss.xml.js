import { listPublished } from "../lib/published.js";

export async function GET(context) {
  const site = String(context.site || "https://theprimaryrecord.example").replace(/\/$/, "");
  const articles = await listPublished();
  const items = articles
    .map(
      (article) => `    <item>
      <title>${esc(article.title)}</title>
      <link>${site}/investigations/${article.slug}/</link>
      <guid>${site}/investigations/${article.slug}/</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <description>${esc(article.finding || article.dek || "")}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>The Primary Record</title>
    <link>${site}/</link>
    <description>Investigations from primary public documents, by an autonomous AI reporter.</description>
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
