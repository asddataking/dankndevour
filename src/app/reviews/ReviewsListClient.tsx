"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { ReviewListItem } from "@/types/review";
import { ReviewCard } from "@/components/ReviewCard";

const PAGE_SIZE = 12;
const CATEGORY_OPTIONS = [
  { value: "", label: "All" },
  { value: "pizza", label: "Pizza" },
  { value: "tacos", label: "Tacos" },
  { value: "bbq", label: "BBQ" },
  { value: "burgers", label: "Burgers" },
  { value: "dispo-pairings", label: "Dispo Pairings" },
];
const RATING_OPTIONS = [
  { value: "", label: "All" },
  { value: "DANK", label: "DANK" },
  { value: "MID", label: "MID" },
  { value: "DEVOUR", label: "DEVOUR" },
  { value: "Unknown", label: "Unrated" },
];

export function ReviewsListClient({
  initialReviews,
}: {
  initialReviews: ReviewListItem[];
}) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(
    () => searchParams.get("category") ?? ""
  );
  const [cityQuery, setCityQuery] = useState(
    () => searchParams.get("q") ?? ""
  );
  const [rating, setRating] = useState(() => searchParams.get("rating") ?? "");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let list = initialReviews;
    if (category) {
      const catLower = category.toLowerCase();
      list = list.filter((r) => {
        const rCat = r.category?.toLowerCase() ?? "";
        const rCatSlug = rCat.replace(/\s+/g, "-");
        return rCat === catLower || rCatSlug === catLower;
      });
    }
    if (cityQuery.trim()) {
      const q = cityQuery.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.cityState.toLowerCase().includes(q) ||
          r.restaurant.toLowerCase().includes(q)
      );
    }
    if (rating) {
      list = list.filter((r) => r.rating === rating);
    }
    return list;
  }, [initialReviews, category, cityQuery, rating]);

  const visibleList = useMemo(
    () => filtered.slice(0, visible),
    [filtered, visible]
  );
  const hasMore = visible < filtered.length;
  const loadMore = useCallback(() => {
    setVisible((v) => v + PAGE_SIZE);
  }, []);

  if (initialReviews.length === 0) {
    return (
      <p className="text-foreground-muted">
        No reviews available. Check back later.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="filter-category" className="text-sm text-foreground-muted">
            Category
          </label>
          <select
            id="filter-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded border border-surface-elevated bg-surface px-3 py-1.5 text-sm text-foreground"
          >
            {CATEGORY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="filter-city" className="text-sm text-foreground-muted">
            Search
          </label>
          <input
            id="filter-city"
            type="text"
            placeholder="City or restaurant..."
            value={cityQuery}
            onChange={(e) => setCityQuery(e.target.value)}
            className="min-w-[160px] rounded border border-surface-elevated bg-surface px-3 py-1.5 text-sm text-foreground placeholder:text-foreground-muted"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="filter-rating" className="text-sm text-foreground-muted">
            Rating
          </label>
          <select
            id="filter-rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="rounded border border-surface-elevated bg-surface px-3 py-1.5 text-sm text-foreground"
          >
            {RATING_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleList.map((r) => (
          <ReviewCard key={r.videoId} review={r} />
        ))}
      </div>

      {visibleList.length === 0 && (
        <p className="py-8 text-center text-foreground-muted">
          No reviews match your filters.
        </p>
      )}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            className="rounded border border-accent/40 bg-accent/10 px-6 py-2 font-medium text-accent transition-colors hover:bg-accent/20"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
