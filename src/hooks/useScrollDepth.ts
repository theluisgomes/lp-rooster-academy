"use client";

import { useEffect, useRef } from "react";
import { pushEvent } from "@/lib/analytics/dataLayer";

const DEPTHS = [25, 50, 75, 100] as const;

/**
 * Fires `scroll_depth` once per threshold (25/50/75/100) for the page.
 * Mount once on the landing page client shell.
 */
export function useScrollDepth(): void {
  const fired = useRef(new Set<number>());

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const percent = Math.min(100, Math.round((scrollTop / scrollable) * 100));

      for (const depth of DEPTHS) {
        if (percent >= depth && !fired.current.has(depth)) {
          fired.current.add(depth);
          pushEvent("scroll_depth", { percent: depth });
        }
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
