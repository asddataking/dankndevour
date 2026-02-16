import type { Metadata } from "next";
import { Suspense } from "react";
import { getReviewsList } from "@/lib/reviews";
import { ReviewsListClient } from "@/app/reviews/ReviewsListClient";

export const metadata: Metadata = {
  title: "Certified Dank",
  description:
    "Our highest-rated spots. Only the best make the Certified Dank list.",
  openGraph: {
    title: "Certified Dank | Dank N Devour",
    description:
      "Our highest-rated spots. Only the best make the Certified Dank list.",
    url: "/certified-dank",
  },
  alternates: { canonical: "/certified-dank" },
};

export default async function CertifiedDankPage() {
  let reviews: Awaited<ReturnType<typeof getReviewsList>> = [];
  try {
    const all = await getReviewsList();
    reviews = all.filter((r) => r.rating === "DANK");
  } catch {
    // Graceful fallback
  }
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-foreground">
        Certified Dank
      </h1>
      <p className="mb-8 text-foreground-muted">
        Our highest-rated spots. Only the best make the list.
      </p>
      <Suspense fallback={<div className="text-foreground-muted">Loading...</div>}>
        <ReviewsListClient
          initialReviews={reviews}
          presetRating="DANK"
        />
      </Suspense>
    </div>
  );
}
