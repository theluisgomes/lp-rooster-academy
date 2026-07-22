"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Optional stagger, in milliseconds, for sequential card grids. */
  delayMs?: number;
}

/**
 * Discrete fade/slide-up entrance animation, driven by IntersectionObserver.
 *
 * The `.reveal` class (opacity: 0) is only applied AFTER mount. Without JS,
 * or before hydration, the content stays fully visible — no blank sections.
 * Under `prefers-reduced-motion: reduce`, the CSS rules are a no-op anyway.
 */
export function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const alreadyInView =
      rect.top < window.innerHeight * 0.85 && rect.bottom > 0;

    if (alreadyInView) {
      setIsVisible(true);
      return;
    }

    setEnabled(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${enabled ? "reveal" : ""} ${isVisible ? "is-visible" : ""} ${className}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
