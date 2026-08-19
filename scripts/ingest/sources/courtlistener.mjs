import { fetchText, xmlText, xmlAttr } from "../../lib/http.mjs";

const URL = "https://www.courtlistener.com/feed/search/?type=o&order_by=dateFiled%20desc";

export async function ingest({ userAgent }) {
  const xml = await fetchText(URL, { userAgent });
  const entries = xml.includes("<entry>") ? xml.split(/<entry>/i).slice(1) : xml.split(/<item>/i).slice(1);
  return entries.slice(0, 20).map((entry) => ({
    source: "courtlistener",
    type: "court",
    title: xmlText(entry, "title"),
    url: xmlText(entry, "link") || xmlAttr(entry, "link", "href") || xmlText(entry, "id"),
    published: xmlText(entry, "updated") || xmlText(entry, "published") || xmlText(entry, "pubDate"),
    summary: xmlText(entry, "summary") || xmlText(entry, "description").replace(/<[^>]+>/g, "").slice(0, 500),
  }));
}
