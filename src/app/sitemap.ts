import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/site";
import { getReviewsList } from "@/lib/reviews";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/reviews`, lastModified: new Date() },
  ];

  try {
    const reviews = await getReviewsList();
    for (const item of reviews) {
      entries.push({
        url: `${baseUrl}/reviews/${item.slug}`,
        lastModified: new Date(item.publishedAt),
      });
    }
  } catch {
    // Leave sitemap with home + reviews only
  }

  return entries;
}
