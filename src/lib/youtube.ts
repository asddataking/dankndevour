import {
  buildSlug,
  parseReviewMeta,
  parseYouTubeSnippet,
} from "./reviewParser";
import type { YouTubeThumbnails } from "@/types/review";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3";

function getApiKey(): string {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error("YOUTUBE_API_KEY is not set");
  return key;
}

function getChannelId(): string {
  const id = process.env.YOUTUBE_CHANNEL_ID;
  if (!id) throw new Error("YOUTUBE_CHANNEL_ID is not set");
  return id;
}

/**
 * Fetch with Next.js cache: 60 min for list, 24 h for single video.
 */
async function cachedFetch(
  url: string,
  revalidateSeconds: number
): Promise<Response> {
  return fetch(url, {
    next: { revalidate: revalidateSeconds },
  });
}

export interface YouTubeVideoItem {
  videoId: string;
  title: string;
  description: string;
  thumbnails: YouTubeThumbnails;
  publishedAt: string;
}

/**
 * Get latest videos from the channel. If YOUTUBE_PLAYLIST_ID is set, use that playlist; otherwise use Search (channel).
 */
export async function getLatestVideos(): Promise<YouTubeVideoItem[]> {
  const apiKey = getApiKey();
  const playlistId = process.env.YOUTUBE_PLAYLIST_ID;
  const channelId = getChannelId();

  if (playlistId) {
    return getPlaylistVideos(playlistId, apiKey);
  }
  const url = `${YOUTUBE_API}/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=50&key=${apiKey}`;
  const res = await cachedFetch(url, 3600);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`YouTube Search API error: ${res.status} ${err}`);
  }
  const data = (await res.json()) as {
    items?: Array<{
      id?: { videoId?: string };
      snippet?: {
        title?: string;
        description?: string;
        thumbnails?: YouTubeThumbnails;
        publishedAt?: string;
      };
    }>;
  };
  const items = data.items ?? [];
  const videoIds = items
    .map((i) => i.id?.videoId)
    .filter((id): id is string => Boolean(id));
  if (videoIds.length === 0) return [];

  const detailsUrl = `${YOUTUBE_API}/videos?part=snippet&id=${videoIds.join(",")}&key=${apiKey}`;
  const detailsRes = await cachedFetch(detailsUrl, 3600);
  if (!detailsRes.ok) {
    const err = await detailsRes.text();
    throw new Error(`YouTube Videos API error: ${detailsRes.status} ${err}`);
  }
  const detailsData = (await detailsRes.json()) as {
    items?: Array<{
      id: string;
      snippet?: {
        title?: string;
        description?: string;
        thumbnails?: YouTubeThumbnails;
        publishedAt?: string;
      };
    }>;
  };
  const list: YouTubeVideoItem[] = [];
  for (const item of detailsData.items ?? []) {
    const parsed = parseYouTubeSnippet({
      id: item.id,
      snippet: item.snippet,
    });
    if (parsed) list.push(parsed);
  }
  return list;
}

/**
 * Get videos from a playlist (e.g. "Reviews").
 */
export async function getPlaylistVideos(
  playlistId: string,
  apiKey?: string
): Promise<YouTubeVideoItem[]> {
  const key = apiKey ?? getApiKey();
  const url = `${YOUTUBE_API}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${key}`;
  const res = await cachedFetch(url, 3600);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`YouTube PlaylistItems API error: ${res.status} ${err}`);
  }
  const data = (await res.json()) as {
    items?: Array<{
      snippet?: {
        resourceId?: { videoId?: string };
        title?: string;
        description?: string;
        thumbnails?: YouTubeThumbnails;
        publishedAt?: string;
      };
    }>;
  };
  const items = data.items ?? [];
  const list: YouTubeVideoItem[] = [];
  for (const item of items) {
    const sn = item.snippet;
    const videoId = sn?.resourceId?.videoId;
    if (!videoId) continue;
    const parsed = parseYouTubeSnippet({
      id: videoId,
      snippet: {
        title: sn.title,
        description: sn.description,
        thumbnails: sn.thumbnails,
        publishedAt: sn.publishedAt,
      },
    });
    if (parsed) list.push(parsed);
  }
  return list;
}

/**
 * Get a single video by ID. Cached 24 hours.
 */
export async function getVideoById(
  videoId: string
): Promise<YouTubeVideoItem | null> {
  const apiKey = getApiKey();
  const url = `${YOUTUBE_API}/videos?part=snippet&id=${videoId}&key=${apiKey}`;
  const res = await cachedFetch(url, 86400);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`YouTube Videos API error: ${res.status} ${err}`);
  }
  const data = (await res.json()) as {
    items?: Array<{
      id: string;
      snippet?: {
        title?: string;
        description?: string;
        thumbnails?: YouTubeThumbnails;
        publishedAt?: string;
      };
    }>;
  };
  const item = data.items?.[0];
  if (!item) return null;
  const parsed = parseYouTubeSnippet({
    id: item.id,
    snippet: item.snippet,
  });
  return parsed;
}

export { buildSlug, parseReviewMeta, videoIdFromSlug } from "./reviewParser";
