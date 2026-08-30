export function href(path = "/") {
  const root = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
  if (!path || path === "/") return root;
  return `${root}${String(path).replace(/^\//, "")}`;
}
