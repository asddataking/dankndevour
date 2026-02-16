import Image from "next/image";
import Link from "next/link";
import type { ReviewListItem } from "@/types/review";
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

function ratingClass(rating: string): string {
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

export function ReviewCard({ review }: { review: ReviewListItem }) {
  const thumb = thumbnailUrl(review.thumbnails);
  return (
    <Link
      href={`/reviews/${review.slug}`}
      className="group block overflow-hidden rounded-lg border border-surface-elevated bg-surface transition-colors hover:border-accent/40 hover:bg-surface-elevated"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-background">
        {thumb ? (
          <Image
            src={thumb}
            alt=""
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-foreground-muted">
            No thumbnail
          </div>
        )}
        <span
          className={`absolute right-2 top-2 rounded border px-2 py-0.5 text-xs font-semibold ${ratingClass(review.rating)}`}
        >
          {review.rating}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground group-hover:text-accent">
          {review.restaurant || review.title}
        </h3>
        {review.cityState && (
          <p className="mt-0.5 text-sm text-foreground-muted">
            {review.cityState}
          </p>
        )}
      </div>
    </Link>
  );
}
