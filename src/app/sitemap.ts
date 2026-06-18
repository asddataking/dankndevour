import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/site";
import { getReviewsList } from "@/lib/reviews";

const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
}> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/reviews", priority: 0.9, changeFrequency: "daily" },
  { path: "/certified-dank", priority: 0.8, changeFrequency: "weekly" },
  { path: "/hidden-gems", priority: 0.8, changeFrequency: "weekly" },
  { path: "/worth-the-drive", priority: 0.8, changeFrequency: "weekly" },
  { path: "/dispo-pairings", priority: 0.8, changeFrequency: "weekly" },
  { path: "/cities", priority: 0.7, changeFrequency: "weekly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }),
  );

  try {
    const reviews = await getReviewsList();
    for (const item of reviews) {
      entries.push({
        url: `${baseUrl}/reviews/${item.slug}`,
        lastModified: new Date(item.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {
    // Static routes only when review fetch fails
  }

  return entries;
}
