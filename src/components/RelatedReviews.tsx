import type { ReviewListItem } from "@/types/review";
import { ReviewCard } from "./ReviewCard";

export function RelatedReviews({
  reviews,
  excludeVideoId,
  max = 3,
}: {
  reviews: ReviewListItem[];
  excludeVideoId: string;
  max?: number;
}) {
  const filtered = reviews
    .filter((r) => r.videoId !== excludeVideoId)
    .slice(0, max);
  if (filtered.length === 0) return null;
  return (
    <div className="rounded-lg border border-surface-elevated bg-surface p-4">
      <h3 className="mb-3 font-semibold uppercase tracking-wide text-foreground">
        Related Reviews
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <ReviewCard key={r.videoId} review={r} />
        ))}
      </div>
    </div>
  );
}
