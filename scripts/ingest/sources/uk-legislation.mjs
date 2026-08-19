import { fetchText, xmlText, xmlAttr } from "../../lib/http.mjs";

const URL = "https://www.legislation.gov.uk/new/data.feed";

export async function ingest({ userAgent }) {
  const xml = await fetchText(URL, { userAgent });
  const entries = xml.split(/<entry>/i).slice(1);
  return entries.slice(0, 20).map((entry) => ({
    source: "uk-legislation",
    type: "gazette",
    title: xmlText(entry, "title"),
    url: xmlText(entry, "id") || xmlAttr(entry, "link", "href"),
    published: xmlText(entry, "updated") || xmlText(entry, "published"),
    summary: xmlText(entry, "summary").replace(/<[^>]+>/g, "").slice(0, 500),
  }));
}
