import type { Metadata } from "next";
import { Suspense } from "react";
import { getReviewsList } from "@/lib/reviews";
import { ReviewsListClient } from "@/app/reviews/ReviewsListClient";

export const metadata: Metadata = {
  title: "Hidden Gems",
  description:
    "Under-the-radar spots worth seeking out. Hidden gems from our reviews.",
  openGraph: {
    title: "Hidden Gems | Dank N Devour",
    description:
      "Under-the-radar spots worth seeking out. Hidden gems from our reviews.",
    url: "/hidden-gems",
  },
  alternates: { canonical: "/hidden-gems" },
};

export default async function HiddenGemsPage() {
  let reviews: Awaited<ReturnType<typeof getReviewsList>> = [];
  try {
    const all = await getReviewsList();
    reviews = all.filter((r) => {
      const cat = r.category?.toLowerCase().replace(/\s+/g, "-") ?? "";
      return cat === "hidden-gems" || r.category === "Hidden Gems";
    });
  } catch {
    // Graceful fallback
  }
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-foreground">
        Hidden Gems
      </h1>
      <p className="mb-8 text-foreground-muted">
        Under-the-radar spots worth seeking out.
      </p>
      {reviews.length === 0 ? (
        <p className="text-foreground-muted">
          No hidden gems yet. Add <code className="rounded bg-surface-elevated px-1">category: &quot;Hidden Gems&quot;</code> in review overrides for any videoId to see them here.
        </p>
      ) : (
        <Suspense fallback={<div className="text-foreground-muted">Loading...</div>}>
          <ReviewsListClient
            initialReviews={reviews}
            presetCategory="hidden-gems"
          />
        </Suspense>
      )}
    </div>
  );
}
