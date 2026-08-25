export function lastRunBody(markdown) {
  if (!markdown || !markdown.trim()) return "";
  const parts = markdown.split(/\n---\n/);
  return (parts[parts.length - 1] || markdown).trim();
}

export function nextRunNumber(existing) {
  if (!existing || !existing.trim()) return 1;
  const nums = [...existing.matchAll(/^## Run (\d+)/gm)].map((m) => Number(m[1]));
  if (nums.length) return Math.max(...nums) + 1;
  return 2;
}

export function appendRun(existing, incoming, { at = new Date() } = {}) {
  const body = incoming.trim();
  if (!body) throw new Error("incoming journal is empty");
  if (!existing || !existing.trim()) {
    if (/^## Run \d+/m.test(body)) return `${body}\n`;
    return `# Journal — ${at.toISOString().slice(0, 10)}\n\n## Run 1 — ${at.toISOString()}\n\n${body.replace(/^# Journal — .+\n+/, "")}\n`;
  }
  const n = nextRunNumber(existing);
  return `${existing.trimEnd()}\n\n---\n\n## Run ${n} — ${at.toISOString()}\n\n${body.replace(/^# Journal — .+\n+/, "")}\n`;
}
