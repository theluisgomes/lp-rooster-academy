export type AnalyticsEventName =
  | "cta_click"
  | "scroll_depth"
  | "section_view"
  | "form_start"
  | "form_submit"
  | "generate_lead"
  | "form_error";

export type AnalyticsEventParams = {
  cta_click: {
    cta_id: string;
    cta_label: string;
    cta_location: string;
  };
  scroll_depth: {
    percent: 25 | 50 | 75 | 100;
  };
  section_view: {
    section_id: string;
  };
  form_start: {
    form_id: string;
  };
  form_submit: {
    form_id: string;
  };
  generate_lead: {
    form_id: string;
    value?: number;
    currency?: string;
  };
  form_error: {
    form_id: string;
    error_type: string;
  };
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Pushes a typed custom event into `window.dataLayer` for GTM.
 * No-ops on the server and when `window` is unavailable.
 */
export function pushEvent<T extends AnalyticsEventName>(
  event: T,
  params: AnalyticsEventParams[T],
): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...params,
  });
}
