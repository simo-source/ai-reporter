import { fetchJson } from "../../lib/http.mjs";

const URL =
  "https://www.federalregister.gov/api/v1/documents.json?per_page=20&order=newest";

export async function ingest({ userAgent }) {
  const data = await fetchJson(URL, { userAgent });
  const results = data.results ?? [];
  return results.map((doc) => ({
    source: "federal-register",
    type: "gazette",
    title: doc.title,
    url: doc.html_url || doc.pdf_url,
    published: doc.publication_date,
    summary: [doc.agencies?.map((a) => a.name).join(", "), doc.type, doc.abstract]
      .filter(Boolean)
      .join(" — ")
      .slice(0, 500),
    document_number: doc.document_number,
  }));
}
