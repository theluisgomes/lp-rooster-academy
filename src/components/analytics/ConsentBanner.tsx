"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { landingContent } from "@/content/landing-content";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  storeConsent,
  subscribeConsent,
  updateConsent,
  type ConsentChoice,
} from "@/lib/analytics/consent";

export function ConsentBanner() {
  const { consent } = landingContent;
  const stored = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (stored) updateConsent(stored);
  }, [stored]);

  if (!hydrated || stored) return null;

  function choose(choice: ConsentChoice) {
    storeConsent(choice);
    updateConsent(choice);
  }

  return (
    <div
      role="dialog"
      aria-label="Preferências de cookies"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-cream p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] sm:p-5"
    >
      <div className="container-page flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm text-black/85 sm:text-base">
          {consent.message}{" "}
          <Link
            href="/privacidade"
            className="font-semibold text-orange underline-offset-2 hover:underline"
          >
            {consent.privacyLinkLabel}
          </Link>
          .
        </p>
        <div className="flex flex-shrink-0 flex-wrap gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="min-h-11 rounded-full border-2 border-black/20 bg-white px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-white/80"
          >
            {consent.declineLabel}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="min-h-11 rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-dark"
          >
            {consent.acceptLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
