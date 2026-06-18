import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/data/brand";
import { ReviewCard } from "@/components/ReviewCard";
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

const PLATFORM_LINKS = [
  { label: "YouTube", href: SOCIAL_LINKS.youtube },
  { label: "Kick", href: SOCIAL_LINKS.kick },
  { label: "Spotify", href: SOCIAL_LINKS.spotify },
  { label: "iHeartRadio", href: SOCIAL_LINKS.iheartradio },
] as const;

export function SmokeReviewSection({
  featured,
  reviews,
}: {
  featured?: ReviewListItem;
  reviews: ReviewListItem[];
}) {
  const thumb = featured ? thumbnailUrl(featured.thumbnails) : null;

  return (
    <section id="smoke-review" className="border-y border-surface-elevated bg-surface/50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Presented by Dank N Devour
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground md:text-5xl">
              Dan&apos;s Smoke Review
            </h2>
            <p className="mt-4 max-w-2xl text-foreground-muted md:text-lg">
              The flagship cannabis review show of Dank N Devour. Honest reviews,
              smoke tests, livestream clips, podcasts, and community discussions.
            </p>
          </div>
          <Link
            href="/reviews"
            className="shrink-0 text-sm font-semibold text-accent hover:underline"
          >
            View all reviews →
          </Link>
        </div>

        {featured && (
          <Link
            href={`/reviews/${featured.slug}`}
            className="glass-card group mb-10 block overflow-hidden rounded-2xl transition-all hover:border-accent/30"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto md:min-h-[320px]">
                {thumb ? (
                  <Image
                    src={thumb}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex h-full min-h-[200px] items-center justify-center bg-background text-foreground-muted">
                    Latest review
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80 hidden md:block" />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Latest Episode
                </span>
                <h3 className="mt-2 text-2xl font-bold text-foreground group-hover:text-accent md:text-3xl">
                  {featured.restaurant || featured.title}
                </h3>
                {featured.cityState && (
                  <p className="mt-2 text-foreground-muted">
                    {featured.cityState}
                  </p>
                )}
                <span className="mt-6 inline-flex w-fit items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background">
                  Watch Now
                </span>
              </div>
            </div>
          </Link>
        )}

        {reviews.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r) => (
              <ReviewCard key={r.videoId} review={r} />
            ))}
          </div>
        ) : (
          <p className="text-foreground-muted">
            Reviews coming soon. Follow us for the latest drops.
          </p>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          {PLATFORM_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
