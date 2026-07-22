export const CONSENT_STORAGE_KEY = "rooster_cookie_consent";

export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

const listeners = new Set<() => void>();
let cachedConsent: ConsentChoice | null | undefined;

function emit() {
  listeners.forEach((listener) => listener());
}

/** Ensures dataLayer + stub gtag exist before Consent Mode / GTM run. */
export function ensureGtag(): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // Mirror the official GTM snippet: push the Arguments object.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as Record<string, unknown>);
    };
  }
}

/**
 * Consent Mode v2 defaults — deny until the user interacts with the banner.
 * Must run before GTM loads (see inline script in layout).
 */
export function setConsentDefault(): void {
  ensureGtag();
  window.gtag?.("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });
}

export function updateConsent(choice: ConsentChoice): void {
  ensureGtag();
  const value = choice === "granted" ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

export function readStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    /* ignore quota / private mode */
  }
  return null;
}

export function storeConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* ignore */
  }
  cachedConsent = choice;
  emit();
}

/** useSyncExternalStore helpers for the consent banner. */
export function subscribeConsent(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

export function getConsentSnapshot(): ConsentChoice | null {
  if (cachedConsent === undefined) {
    cachedConsent = readStoredConsent();
  }
  return cachedConsent;
}

export function getConsentServerSnapshot(): null {
  return null;
}
