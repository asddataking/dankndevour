import { Suspense } from "react";
import { getReviewsList } from "@/lib/reviews";
import { ReviewsListClient } from "./ReviewsListClient";

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
      <Suspense fallback={<div className="text-foreground-muted">Loading filters...</div>}>
        <ReviewsListClient initialReviews={reviews} />
      </Suspense>
    </div>
  );
}
