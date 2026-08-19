import { fetchText, xmlText, xmlAttr } from "../../lib/http.mjs";

const URL =
  "https://www.sec.gov/cgi-bin/browse-edgar?action=getcurrent&count=40&output=atom";

export async function ingest({ userAgent }) {
  const xml = await fetchText(URL, { userAgent });
  const entries = xml.split(/<entry>/i).slice(1);
  return entries.slice(0, 25).map((entry) => ({
    source: "sec-edgar",
    type: "filing",
    title: xmlText(entry, "title"),
    url: xmlText(entry, "link") || xmlAttr(entry, "link", "href"),
    published: xmlText(entry, "updated") || xmlText(entry, "published"),
    summary: xmlText(entry, "summary").slice(0, 500),
  }));
}
