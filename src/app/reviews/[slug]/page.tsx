import { notFound } from "next/navigation";
import Image from "next/image";
import { getReviewDetail, getReviewsList } from "@/lib/reviews";
import { videoIdFromSlug } from "@/lib/youtube";
import { PairingCard } from "@/components/PairingCard";
import { RatingSummary } from "@/components/RatingSummary";
import { RelatedReviews } from "@/components/RelatedReviews";
import type { YouTubeThumbnails } from "@/types/review";

function thumbnailUrl(thumbnails: YouTubeThumbnails): string {
  return (
    thumbnails.maxres?.url ??
    thumbnails.high?.url ??
    thumbnails.medium?.url ??
    thumbnails.default?.url ??
    ""
  );
}

function ratingBadgeClass(rating: string): string {
  switch (rating) {
    case "DANK":
      return "bg-accent/20 text-accent border-accent/40";
    case "MID":
      return "bg-amber-500/20 text-amber-400 border-amber-500/40";
    case "DEVOUR":
      return "bg-rose-500/20 text-rose-400 border-rose-500/40";
    default:
      return "bg-surface-elevated text-foreground-muted border-surface-elevated";
  }
}

/** Strip HTML and format description as plain text paragraphs */
function sanitizeDescription(html: string): string {
  return html
    .replace(/<[^>]+>/g, "\n")
    .replace(/\n{2,}/g, "\n\n")
    .trim();
}

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const videoId = videoIdFromSlug(slug);
  if (!videoId) notFound();

  let detail: Awaited<ReturnType<typeof getReviewDetail>> = null;
  let allReviews: Awaited<ReturnType<typeof getReviewsList>> = [];
  try {
    [detail, allReviews] = await Promise.all([
      getReviewDetail(videoId),
      getReviewsList(),
    ]);
  } catch {
    notFound();
  }
  if (!detail) notFound();

  const related = allReviews.filter(
    (r) =>
      r.videoId !== detail.videoId &&
      (r.cityState === detail.cityState ||
        r.category === detail.category)
  ).slice(0, 3);
  const thumb = thumbnailUrl(detail.thumbnails);
  const story = sanitizeDescription(detail.description);

  return (
    <div className="min-h-screen">
      <div className="border-b border-surface-elevated bg-surface">
        <div className="relative aspect-[21/9] max-h-[400px] w-full bg-background">
          {thumb ? (
            <Image
              src={thumb}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-foreground-muted">
              No image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="mx-auto max-w-7xl">
              <h1 className="text-2xl font-bold text-foreground md:text-4xl">
                {detail.restaurant || detail.title}
              </h1>
              {detail.cityState && (
                <p className="mt-1 text-foreground-muted">{detail.cityState}</p>
              )}
              <span
                className={`mt-3 inline-block rounded border px-3 py-1 text-sm font-semibold ${ratingBadgeClass(detail.rating)}`}
              >
                {detail.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-background">
              <iframe
                title="YouTube embed"
                src={`https://www.youtube.com/embed/${detail.videoId}`}
                className="h-full w-full"
                allowFullScreen
              />
            </div>
            {story && (
              <div className="rounded-lg border border-surface-elevated bg-surface p-6">
                <h2 className="mb-3 font-semibold text-foreground">Story</h2>
                <div className="whitespace-pre-wrap text-sm text-foreground-muted">
                  {story}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <RatingSummary
              scores={detail.scores}
              showUnrated={true}
            />
            {detail.pairing && <PairingCard pairing={detail.pairing} />}
            <RelatedReviews
              reviews={allReviews}
              excludeVideoId={detail.videoId}
              max={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
