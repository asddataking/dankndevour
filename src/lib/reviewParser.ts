import type { YouTubeThumbnails } from "@/types/review";

/**
 * Build a URL-safe slug from title + videoId for uniqueness.
 */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildSlug(title: string, videoId: string): string {
  const base = slugify(title);
  return base ? `${base}-${videoId}` : videoId;
}

/**
 * Extract videoId from slug (last segment after final hyphen, if it looks like a videoId).
 * YouTube videoIds are 11 characters alphanumeric + - _
 */
export function videoIdFromSlug(slug: string): string | null {
  const parts = slug.split("-");
  const last = parts[parts.length - 1];
  if (last && /^[\w-]{11}$/.test(last)) {
    return last;
  }
  return slug.length >= 11 ? slug : null;
}

export interface ParsedReviewMeta {
  restaurant: string;
  cityState: string;
}

/**
 * Try structured markers in description first, then fallback to title split.
 */
export function parseReviewMeta(
  title: string,
  description: string
): ParsedReviewMeta {
  const desc = description || "";
  const restaurantMatch = desc.match(
    /(?:restaurant|venue|spot|place)\s*[:\-]\s*([^\n]+)/i
  );
  const cityMatch = desc.match(
    /(?:city|location|where)\s*[:\-]\s*([^\n]+)/i
  );
  if (restaurantMatch && cityMatch) {
    return {
      restaurant: restaurantMatch[1].trim(),
      cityState: cityMatch[1].trim(),
    };
  }
  const separators = /[-|:–—]/;
  const parts = title.split(separators).map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return {
      restaurant: parts[0],
      cityState: parts[parts.length - 1],
    };
  }
  if (parts.length === 1) {
    return { restaurant: parts[0], cityState: "" };
  }
  return { restaurant: title, cityState: "" };
}

export interface YouTubeSnippetItem {
  videoId: string;
  title: string;
  description: string;
  thumbnails: YouTubeThumbnails;
  publishedAt: string;
}

export function parseYouTubeSnippet(item: {
  id: string;
  snippet?: {
    title?: string;
    description?: string;
    thumbnails?: YouTubeThumbnails;
    publishedAt?: string;
  };
}): YouTubeSnippetItem | null {
  const sn = item.snippet;
  if (!sn) return null;
  const videoId =
    "videoId" in item ? (item as { videoId: string }).videoId : item.id;
  return {
    videoId: typeof videoId === "string" ? videoId : item.id,
    title: sn.title ?? "",
    description: sn.description ?? "",
    thumbnails: sn.thumbnails ?? {},
    publishedAt: sn.publishedAt ?? "",
  };
}
