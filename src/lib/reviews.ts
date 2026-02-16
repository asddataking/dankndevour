import { reviewOverrides } from "@/data/reviewOverrides";
import { getLatestVideos, getVideoById, buildSlug, parseReviewMeta } from "@/lib/youtube";
import type { ReviewDetail, ReviewListItem } from "@/types/review";

export async function getReviewsList(): Promise<ReviewListItem[]> {
  const videos = await getLatestVideos();
  return videos.map((v) => {
    const override = reviewOverrides[v.videoId];
    const { restaurant, cityState } = parseReviewMeta(v.title, v.description);
    const slug = buildSlug(v.title, v.videoId);
    return {
      videoId: v.videoId,
      slug,
      title: v.title,
      description: v.description,
      restaurant,
      cityState,
      thumbnails: v.thumbnails,
      publishedAt: v.publishedAt,
      rating: override?.rating ?? "Unknown",
      category: override?.category,
    };
  });
}

export async function getReviewDetail(videoId: string): Promise<ReviewDetail | null> {
  const video = await getVideoById(videoId);
  if (!video) return null;
  const override = reviewOverrides[videoId];
  const { restaurant, cityState } = parseReviewMeta(
    video.title,
    video.description
  );
  const slug = buildSlug(video.title, video.videoId);
  return {
    videoId: video.videoId,
    slug,
    title: video.title,
    description: video.description,
    restaurant,
    cityState,
    thumbnails: video.thumbnails,
    publishedAt: video.publishedAt,
    rating: override?.rating ?? "Unknown",
    category: override?.category,
    scores: override?.scores,
    pairing: override?.pairing,
  };
}
