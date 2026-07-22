/**
 * Canonical site URL used by metadata, robots, sitemap and JSON-LD.
 * Falls back to localhost so local builds never crash without .env.
 */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
  return raw.replace(/\/$/, "");
}
