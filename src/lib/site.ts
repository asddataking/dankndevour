/**
 * Base URL for canonical links, sitemap, and OG. Prefer NEXT_PUBLIC_SITE_URL;
 * fallback to VERCEL_URL in production.
 */
export function getBaseUrl(): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site) return site.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "https://dankndevour.com";
}
