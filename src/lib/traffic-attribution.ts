const KEY = "el-first-visit";
const TTL = 30 * 24 * 60 * 60 * 1000;
type Attribution = { utm_source?: string; utm_medium?: string; utm_campaign?: string };

function clean(value: unknown): string | undefined {
  return typeof value === "string" && /^[\p{L}\p{N} _./-]{1,120}$/u.test(value.trim())
    ? value.trim() : undefined;
}

export function sanitizeAttribution(value: unknown): Attribution {
  if (!value || typeof value !== "object") return {};
  const input = value as Record<string, unknown>;
  return Object.fromEntries(["utm_source", "utm_medium", "utm_campaign"]
    .map(key => [key, clean(input[key])]).filter(([, v]) => v !== undefined));
}

// A first visit without campaign data stays unattributed; never invent "direct".
export function getTrafficAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const current = sanitizeAttribution(Object.fromEntries(params));
  try {
    const stored = JSON.parse(window.localStorage.getItem(KEY) || "null");
    if (stored && Number.isFinite(stored.expiresAt) && stored.expiresAt > Date.now()
      && stored.expiresAt <= Date.now() + TTL) return sanitizeAttribution(stored.data);
  } catch { /* Missing, corrupt or unavailable storage must not prevent signup. */ }
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ data: current, expiresAt: Date.now() + TTL }));
  } catch { /* Current URL still works when browser storage is disabled. */ }
  return current;
}

export function trafficAttributes(value: unknown): Record<string, string> {
  const data = sanitizeAttribution(value);
  return {
    ...(data.utm_source ? { ORIGEN_TRAFICO: data.utm_source } : {}),
    ...(data.utm_campaign ? { CAMPANA_ORIGEN: data.utm_campaign } : {}),
  };
}
