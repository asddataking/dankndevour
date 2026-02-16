import type { Metadata } from "next";
import { Suspense } from "react";
import { getReviewsList } from "@/lib/reviews";
import { ReviewsListClient } from "./ReviewsListClient";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Watch our video reviews and dispo pairings. Restaurant reviews with no filter.",
  openGraph: {
    title: "Reviews | Dank N Devour",
    description:
      "Watch our video reviews and dispo pairings. Restaurant reviews with no filter.",
    url: "/reviews",
  },
  alternates: { canonical: "/reviews" },
};

export default async function ReviewsPage() {
  let reviews: Awaited<ReturnType<typeof getReviewsList>> = [];
  try {
    reviews = await getReviewsList();
  } catch {
    // Graceful fallback
  }
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-foreground">Reviews</h1>
      <div className="mb-6 rounded-lg border border-surface-elevated bg-surface px-4 py-3">
        <p className="text-sm text-foreground-muted">
          Looking for dispensary deals in your area?{" "}
          <a
            href="https://dailydispodeals.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            DailyDispoDeals.com
          </a>
        </p>
      </div>
      <Suspense fallback={<div className="text-foreground-muted">Loading filters...</div>}>
        <ReviewsListClient initialReviews={reviews} />
      </Suspense>
    </div>
  );
}
