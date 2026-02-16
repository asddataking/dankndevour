"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { ReviewListItem } from "@/types/review";
import { ReviewCard } from "@/components/ReviewCard";

const PAGE_SIZE = 12;

const FOOD_TYPE_CHIPS = [
  { value: "pizza", label: "Pizza" },
  { value: "tacos", label: "Tacos" },
  { value: "bbq", label: "BBQ" },
  { value: "burgers", label: "Burgers" },
  { value: "dispo-pairings", label: "Dispo Pairings" },
] as const;

const RATING_CHIPS = [
  { value: "DANK", label: "DANK" },
  { value: "MID", label: "MID" },
  { value: "DEVOUR", label: "DEVOUR" },
] as const;

export function ReviewsListClient({
  initialReviews,
  presetRating,
  presetCategory,
}: {
  initialReviews: ReviewListItem[];
  presetRating?: "DANK" | "MID" | "DEVOUR";
  presetCategory?: string;
}) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(
    () => searchParams.get("category") ?? presetCategory ?? ""
  );
  const [cityQuery, setCityQuery] = useState(
    () => searchParams.get("q") ?? ""
  );
  const [rating, setRating] = useState(
    () => searchParams.get("rating") ?? presetRating ?? ""
  );
  const [visible, setVisible] = useState(PAGE_SIZE);

  const uniqueCities = useMemo(() => {
    const set = new Set<string>();
    initialReviews.forEach((r) => {
      if (r.cityState?.trim()) set.add(r.cityState.trim());
    });
    return Array.from(set).sort();
  }, [initialReviews]);

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

  const showRatingChips = presetRating === undefined;
  const showCategoryChips = presetCategory === undefined;

  if (initialReviews.length === 0) {
    return (
      <p className="text-foreground-muted">
        No reviews available. Check back later.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-6 space-y-4">
        {showCategoryChips && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
              Food type
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory("")}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  !category
                    ? "bg-accent/20 text-accent"
                    : "bg-surface-elevated text-foreground-muted hover:bg-surface-elevated/80 hover:text-foreground"
                }`}
              >
                All
              </button>
              {FOOD_TYPE_CHIPS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setCategory(category === value ? "" : value)}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                    category === value
                      ? "bg-accent/20 text-accent"
                      : "bg-surface-elevated text-foreground-muted hover:bg-surface-elevated/80 hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
        {showRatingChips && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
              Rating
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setRating("")}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  !rating
                    ? "bg-accent/20 text-accent"
                    : "bg-surface-elevated text-foreground-muted hover:bg-surface-elevated/80 hover:text-foreground"
                }`}
              >
                All
              </button>
              {RATING_CHIPS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(rating === value ? "" : value)}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                    rating === value
                      ? "bg-accent/20 text-accent"
                      : "bg-surface-elevated text-foreground-muted hover:bg-surface-elevated/80 hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
            City
          </span>
          <input
            type="text"
            placeholder="Search city or restaurant..."
            value={cityQuery}
            onChange={(e) => setCityQuery(e.target.value)}
            className="min-w-[180px] rounded-full border border-surface-elevated bg-surface px-3 py-1.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            aria-label="Search by city or restaurant"
          />
          {uniqueCities.length > 0 && uniqueCities.length <= 12 && (
            <div className="flex flex-wrap gap-2">
              {uniqueCities.slice(0, 10).map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() =>
                    setCityQuery((c) => (c === city ? "" : city))
                  }
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                    cityQuery === city
                      ? "bg-accent/20 text-accent"
                      : "bg-surface-elevated text-foreground-muted hover:bg-surface-elevated/80 hover:text-foreground"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
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
            className="rounded-full border border-accent/40 bg-accent/10 px-6 py-2 font-medium text-accent transition-colors hover:bg-accent/20"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
