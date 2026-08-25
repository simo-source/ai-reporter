const PRODUCT = /gao-\d+-\d+/i;

export function gaoProductId(urlOrId) {
  const match = String(urlOrId || "").match(PRODUCT);
  return match ? match[0].toLowerCase() : "";
}

export function gaoPdfCandidates(urlOrId) {
  const id = gaoProductId(urlOrId);
  if (!id) return [];
  return [
    `https://www.gao.gov/assets/${id}.pdf`,
    `https://files.gao.gov/assets/${id}.pdf`,
    `https://www.gao.gov/assets/880/${id}.pdf`,
  ];
}
