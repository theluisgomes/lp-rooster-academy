import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

export type CTAVariant =
  | "white"
  | "maroon"
  | "yellowOutline"
  | "yellowSolid"
  | "orange"
  | "black";

export type CTASize = "sm" | "md" | "lg" | "xl";

interface CTAButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  href: string;
  variant?: CTAVariant;
  /** Pill scale: sm = compact secondary, md = default, lg/xl = hero/offer. */
  size?: CTASize;
  /** Display (chunky brand font) vs bold sans, mirroring the reference art. */
  typeface?: "display" | "sans";
  /** Stretches to 100% width below the `sm` breakpoint, per spec. */
  fullWidthOnMobile?: boolean;
}

const VARIANT_CLASSES: Record<CTAVariant, string> = {
  white:
    "bg-white text-orange hover:bg-cream active:bg-cream/80",
  maroon:
    "bg-red text-white hover:bg-orange-dark active:bg-orange-dark/90",
  yellowOutline:
    "bg-yellow text-black border-2 border-black hover:bg-pale-yellow active:bg-yellow/80",
  yellowSolid:
    "bg-yellow text-red hover:bg-pale-yellow active:bg-yellow/80",
  orange:
    "bg-orange text-white hover:bg-orange-dark active:bg-orange-dark/90",
  black: "bg-black text-white hover:bg-black/80 active:bg-black/70",
};

const SIZE_CLASSES: Record<CTASize, string> = {
  sm: "px-6 py-2.5 text-base",
  md: "px-7 py-3 text-base",
  lg: "px-10 py-4 text-xl lg:text-2xl",
  xl: "px-10 py-5 text-xl lg:text-2xl",
};

const TYPEFACE_CLASSES = {
  display: "font-display font-normal tracking-wide",
  sans: "font-sans font-bold",
} as const;

/**
 * Shared pill CTA used across every section. Always renders a real anchor
 * (in-page anchors scroll smoothly via `html { scroll-behavior: smooth }`
 * in globals.css; the checkout placeholder is a normal external-style link
 * too), never a JS-only button, so it keeps working without JavaScript.
 */
export function CTAButton({
  label,
  href,
  variant = "orange",
  size = "md",
  typeface = "display",
  fullWidthOnMobile = false,
  className = "",
  ...rest
}: CTAButtonProps) {
  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-full text-center transition-colors duration-150 focus-visible:outline-3 focus-visible:outline-offset-2 ${
        SIZE_CLASSES[size]
      } ${TYPEFACE_CLASSES[typeface]} ${
        fullWidthOnMobile ? "w-full sm:w-auto" : ""
      } ${VARIANT_CLASSES[variant]} ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {label}
    </Link>
  );
}
