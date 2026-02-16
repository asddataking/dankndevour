import type { Metadata } from "next";
import { getReviewsList } from "@/lib/reviews";
import { reviewOverrides } from "@/data/reviewOverrides";
import { dispoPairings } from "@/data/dispoPairings";
import { ReviewCard } from "@/components/ReviewCard";

export const metadata: Metadata = {
  title: "Dispo Pairings",
  description:
    "Strain and dish pairings. Reviews with dispensary pairings and our favorite combos.",
  openGraph: {
    title: "Dispo Pairings | Dank N Devour",
    description:
      "Strain and dish pairings. Reviews with dispensary pairings and our favorite combos.",
    url: "/dispo-pairings",
  },
  alternates: { canonical: "/dispo-pairings" },
};

export default async function DispoPairingsPage() {
  let reviewsWithPairing: Awaited<ReturnType<typeof getReviewsList>> = [];
  try {
    const all = await getReviewsList();
    reviewsWithPairing = all.filter(
      (r) => reviewOverrides[r.videoId]?.pairing != null
    );
  } catch {
    // Graceful fallback
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-foreground">
        Dispo Pairings
      </h1>
      <p className="mb-8 text-foreground-muted">
        Strain and dish pairings. Reviews that include a dispensary pairing plus our favorite combos.
      </p>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Pairing guide
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dispoPairings.map((p, i) => (
            <div
              key={i}
              className="rounded-lg border border-surface-elevated bg-surface p-4"
            >
              <p className="font-medium text-foreground">{p.strain}</p>
              <p className="text-sm text-accent">{p.dish}</p>
              {p.note && (
                <p className="mt-1 text-sm text-foreground-muted">{p.note}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Reviews with pairings
        </h2>
        {reviewsWithPairing.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviewsWithPairing.map((r) => (
              <ReviewCard key={r.videoId} review={r} />
            ))}
          </div>
        ) : (
          <p className="text-foreground-muted">
            No reviews with pairings yet. Add <code className="rounded bg-surface-elevated px-1">pairing</code> in review overrides to see them here.
          </p>
        )}
      </section>
    </div>
  );
}
