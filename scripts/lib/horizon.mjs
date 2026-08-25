export function utcStamp(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function horizonIsFresh(latest, today = utcStamp()) {
  if (!latest || typeof latest !== "object") return false;
  return latest.date === today;
}
