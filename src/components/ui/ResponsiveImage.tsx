import Image from "next/image";

type Rounded = "none" | "sm" | "lg" | "full";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  rounded?: Rounded;
  /** Use for background/cover photos inside a positioned wrapper. */
  fill?: boolean;
  width?: number;
  height?: number;
  objectPosition?: string;
}

const ROUNDED_CLASSES: Record<Rounded, string> = {
  none: "",
  sm: "rounded-sm",
  lg: "rounded-lg",
  full: "rounded-full",
};

/**
 * Thin, opinionated wrapper around next/image: sensible `sizes` default,
 * shared rounded-corner scale (24px/36px tokens), and `object-cover` for
 * `fill` usage so every photo in the page is optimized/lazy-loaded by
 * default (only the hero background sets `priority`).
 */
export function ResponsiveImage({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
  rounded = "lg",
  fill = false,
  width,
  height,
  objectPosition = "center",
}: ResponsiveImageProps) {
  const roundedClass = ROUNDED_CLASSES[rounded];

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${roundedClass} ${className}`}
        style={{ objectPosition }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 1200}
      sizes={sizes}
      priority={priority}
      className={`h-auto w-full object-cover ${roundedClass} ${className}`}
      style={{ objectPosition }}
    />
  );
}
