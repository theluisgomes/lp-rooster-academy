"use client";

import { useEffect } from "react";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { captureUtmParams } from "@/lib/analytics/utm";

/**
 * Client-only landing instrumentation: scroll depth + UTM capture.
 */
export function LandingAnalytics() {
  useScrollDepth();

  useEffect(() => {
    captureUtmParams();
  }, []);

  return null;
}
