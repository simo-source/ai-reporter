import { fetchText, xmlText, xmlAttr } from "../../lib/http.mjs";
import { gaoPdfCandidates, gaoProductId } from "../../lib/gao.mjs";

const URL = "https://www.gao.gov/rss/reports.xml";

export async function ingest({ userAgent }) {
  const xml = await fetchText(URL, { userAgent });
  const items = xml.split(/<item>/i).slice(1);
  return items.slice(0, 20).map((item) => {
    const url = xmlText(item, "link") || xmlAttr(item, "guid", "isPermaLink") || xmlText(item, "guid");
    return {
      source: "gao",
      type: "government",
      title: xmlText(item, "title"),
      url,
      pdf_url: gaoPdfCandidates(url)[0] || "",
      product_id: gaoProductId(url),
      published: xmlText(item, "pubDate"),
      summary: xmlText(item, "description").replace(/<[^>]+>/g, "").slice(0, 500),
    };
  });
}
