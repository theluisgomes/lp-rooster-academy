const UTM_STORAGE_KEY = "rooster_utm_params";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/** Reads UTM/click ids from the current URL and persists them for the session. */
export function captureUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  const search = new URLSearchParams(window.location.search);
  const fromUrl: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = search.get(key);
    if (value) fromUrl[key] = value;
  }

  if (Object.keys(fromUrl).length > 0) {
    try {
      window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
    } catch {
      /* ignore */
    }
    return fromUrl;
  }

  return readStoredUtmParams();
}

export function readStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmParams;
  } catch {
    return {};
  }
}
