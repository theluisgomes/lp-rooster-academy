import type { ElementType, ReactNode } from "react";

interface SectionTitleProps {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  size?: "xl" | "lg" | "ml" | "md";
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<SectionTitleProps["size"]>, string> = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  ml: "text-display-ml",
  md: "text-display-md",
};

/**
 * Reusable display heading. Owns only typography (font + clamp() size);
 * color and text-align are passed in via `className` so each section can
 * match its own background (e.g. white on orange, orange on cream).
 */
export function SectionTitle({
  as = "h2",
  children,
  size = "lg",
  className = "",
}: SectionTitleProps) {
  const Tag = as as ElementType;

  return <Tag className={`${SIZE_CLASSES[size]} ${className}`}>{children}</Tag>;
}
