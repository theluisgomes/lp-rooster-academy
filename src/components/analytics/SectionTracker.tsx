"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { pushEvent } from "@/lib/analytics/dataLayer";

type SectionTrackerProps = {
  sectionId: string;
  children: ReactNode;
  className?: string;
};

/**
 * Wraps a section and fires `section_view` once when it enters the viewport.
 */
export function SectionTracker({
  sectionId,
  children,
  className,
}: SectionTrackerProps) {
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || fired.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || fired.current) return;
        fired.current = true;
        pushEvent("section_view", { section_id: sectionId });
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [sectionId]);

  return (
    <section
      id={sectionId}
      ref={ref}
      className={className}
      data-section={sectionId}
    >
      {children}
    </section>
  );
}
