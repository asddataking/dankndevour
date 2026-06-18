import Image from "next/image";
import Link from "next/link";
import { PlayIcon } from "@/components/ui/Icons";
import { thumbnailUrl } from "@/lib/thumbnails";
import type { ReviewListItem } from "@/types/review";

export function LatestEpisodes({ reviews }: { reviews: ReviewListItem[] }) {
  const episodes = reviews.slice(0, 5);
  if (episodes.length === 0) return null;

  return (
    <section id="smoke-review" className="bg-black py-10 md:py-14">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="section-label">Latest Episodes</h2>
          <Link
            href="/reviews"
            className="font-nav text-sm tracking-wider text-accent hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {episodes.map((review, i) => (
            <EpisodeCard key={review.videoId} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EpisodeCard({
  review,
  index,
}: {
  review: ReviewListItem;
  index: number;
}) {
  const thumb = thumbnailUrl(review.thumbnails);
  const title = review.restaurant || review.title;

  return (
    <Link
      href={`/reviews/${review.slug}`}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-surface transition-all hover:border-accent/40"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-black">
        {thumb ? (
          <Image
            src={thumb}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-foreground-muted">
            No thumb
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-black">
            <PlayIcon className="h-5 w-5" />
          </span>
        </div>
        <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-accent">
          EP {String(index + 1).padStart(3, "0")}
        </span>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-accent">
          {title}
        </h3>
      </div>
    </Link>
  );
}
