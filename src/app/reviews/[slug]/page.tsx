import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getBaseUrl } from "@/lib/site";
import { getReviewDetail, getReviewsList } from "@/lib/reviews";
import { videoIdFromSlug } from "@/lib/youtube";
import { DispoDealsCta } from "@/components/DispoDealsCta";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const videoId = videoIdFromSlug(slug);
  if (!videoId) return { title: "Review" };

  let detail: Awaited<ReturnType<typeof getReviewDetail>> = null;
  try {
    detail = await getReviewDetail(videoId);
  } catch {
    return { title: "Review" };
  }
  if (!detail) return { title: "Review" };

  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/reviews/${detail.slug}`;
  const thumb = thumbnailUrl(detail.thumbnails);
  const title = `${detail.restaurant || detail.title} Review${detail.cityState ? ` (${detail.cityState})` : ""} — Dank or Devour?`;
  const description = detail.cityState
    ? `Video review of ${detail.restaurant || detail.title} in ${detail.cityState}. Watch the full review.`
    : `Video review of ${detail.restaurant || detail.title}. Watch the full review.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Dank N Devour`,
      description,
      url: canonicalUrl,
      type: "video.other",
      images: thumb ? [{ url: thumb, width: 1280, height: 720, alt: detail.restaurant || detail.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Dank N Devour`,
      description,
      images: thumb ? [thumb] : undefined,
    },
    alternates: { canonical: canonicalUrl },
  };
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
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/reviews/${detail.slug}`;
  const embedUrl = `https://www.youtube.com/embed/${detail.videoId}`;
  const reviewName = detail.restaurant || detail.title;
  const descriptionTruncated = (story || detail.description || "").slice(0, 500);

  const videoObjectLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: reviewName,
    description: descriptionTruncated,
    thumbnailUrl: thumb || undefined,
    uploadDate: detail.publishedAt,
    embedUrl,
    url: canonicalUrl,
    publisher: { "@type": "Organization", name: "Dank N Devour" },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Reviews", item: `${baseUrl}/reviews` },
      { "@type": "ListItem", position: 3, name: reviewName, item: canonicalUrl },
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoObjectLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd),
        }}
      />
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
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold uppercase tracking-tight text-white md:text-4xl">
                  {detail.restaurant || detail.title}
                </h1>
                {detail.cityState && (
                  <span className="rounded bg-accent/20 px-2.5 py-1 text-sm font-medium uppercase tracking-wide text-accent">
                    {detail.cityState}
                  </span>
                )}
              </div>
              <span
                className={`mt-3 inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-sm font-semibold ${ratingBadgeClass(detail.rating)}`}
              >
                <span aria-hidden>🔥</span>
                {detail.rating === "DANK" || detail.rating === "MID" || detail.rating === "DEVOUR"
                  ? `${detail.rating} REVIEW`
                  : "Unrated"}
              </span>
              {story && (
                <p className="mt-3 max-w-2xl text-sm text-white/90 line-clamp-2">
                  {story.split(/\n\n/)[0]?.replace(/\n/g, " ").trim() || story.slice(0, 200)}
                </p>
              )}
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
            <RatingSummary
              scores={detail.scores}
              showUnrated={true}
              variant="compact"
            />
            {story && (
              <div className="rounded-lg border border-surface-elevated bg-surface p-6">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
                  Review
                </h2>
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
            <DispoDealsCta variant="card" />
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
