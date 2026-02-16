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

export function Hero({ review }: { review: ReviewListItem }) {
  const thumb = thumbnailUrl(review.thumbnails);
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="relative aspect-[21/9] w-full min-h-[240px] bg-background">
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
            Featured review
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-foreground md:text-4xl">
              {review.restaurant || review.title}
            </h2>
            {review.cityState && (
              <p className="mt-1 text-foreground-muted">{review.cityState}</p>
            )}
            <Link
              href={`/reviews/${review.slug}`}
              className="mt-4 inline-block rounded bg-accent px-5 py-2.5 font-semibold text-background transition-opacity hover:opacity-90"
            >
              Watch Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
