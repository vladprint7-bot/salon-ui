export const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

function buildUrl(path: string, qs?: Record<string, string | number>) {
  const url = new URL(`${API_BASE}${path}`);
  if (qs) Object.entries(qs).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  return url.toString();
}

export async function apiGet<T = any>(path: string, qs?: Record<string, string | number>): Promise<T> {
  const r = await fetch(buildUrl(path, qs), { cache: "no-store" });
  if (!r.ok) throw new Error(`GET ${path} ${r.status}`);
  return r.json();
}

export async function apiPost<T = any>(path: string, data: unknown): Promise<T> {
  const r = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await r.json().catch(() => ({}));
  if (!r.ok || json?.ok === false) throw new Error(json?.error || `POST ${path} ${r.status}`);
  return json;
}
