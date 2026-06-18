import type { Metadata } from "next";
import { Suspense } from "react";
import { createPageMetadata } from "@/lib/metadata";
import { getReviewsList } from "@/lib/reviews";
import { ReviewsListClient } from "@/app/reviews/ReviewsListClient";

export const metadata: Metadata = createPageMetadata({
  title: "Worth the Drive",
  description:
    "Destination-worthy Michigan spots that are worth the trip. Reviews from Dank N Devour.",
  path: "/worth-the-drive",
});

export default async function WorthTheDrivePage() {
  let reviews: Awaited<ReturnType<typeof getReviewsList>> = [];
  try {
    const all = await getReviewsList();
    reviews = all.filter((r) => {
      const cat = r.category?.toLowerCase().replace(/\s+/g, "-") ?? "";
      return cat === "worth-the-drive" || r.category === "Worth the Drive";
    });
  } catch {
    // Graceful fallback
  }
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-foreground">
        Worth the Drive
      </h1>
      <p className="mb-8 text-foreground-muted">
        Spots that are worth the trip.
      </p>
      {reviews.length === 0 ? (
        <p className="text-foreground-muted">
          No &quot;Worth the Drive&quot; spots yet. Add <code className="rounded bg-surface-elevated px-1">category: &quot;Worth the Drive&quot;</code> in review overrides to see them here.
        </p>
      ) : (
        <Suspense fallback={<div className="text-foreground-muted">Loading...</div>}>
          <ReviewsListClient
            initialReviews={reviews}
            presetCategory="worth-the-drive"
          />
        </Suspense>
      )}
    </div>
  );
}
