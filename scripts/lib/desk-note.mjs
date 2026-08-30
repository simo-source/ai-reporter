export function parseRunHeading(latestJournal) {
  const match = String(latestJournal || "").match(/^## Run (\d+) — (\S+)/m);
  if (!match) return null;
  return { run: Number(match[1]), time: match[2] };
}

export function deskSlug(date, run) {
  return `${date}-r${run}`;
}

export function countWords(text) {
  return String(text || "")
    .replace(/---[\s\S]*?---/, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}
