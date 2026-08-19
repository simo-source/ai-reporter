import { fetchText, xmlText, xmlAttr } from "../../lib/http.mjs";

const URL = "https://eur-lex.europa.eu/EN/display-feed.rss?myRssId=recent";

export async function ingest({ userAgent }) {
  const xml = await fetchText(URL, { userAgent });
  const items = xml.split(/<item>/i).slice(1);
  return items.slice(0, 20).map((item) => ({
    source: "eur-lex",
    type: "gazette",
    title: xmlText(item, "title"),
    url: xmlText(item, "link") || xmlAttr(item, "guid", "isPermaLink") || xmlText(item, "guid"),
    published: xmlText(item, "pubDate"),
    summary: xmlText(item, "description").replace(/<[^>]+>/g, "").slice(0, 500),
  }));
}
