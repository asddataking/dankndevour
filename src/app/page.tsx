import { destinations } from "@/data/destinations";
import { dispoPairings } from "@/data/dispoPairings";
import { getProducts } from "@/lib/fourthwall";
import { getReviewsList } from "@/lib/reviews";
import { Hero } from "@/components/Hero";
import { MerchFallback } from "@/components/MerchFallback";
import { MerchGrid } from "@/components/MerchGrid";
import { ReviewCard } from "@/components/ReviewCard";

export default async function HomePage() {
  let reviews: Awaited<ReturnType<typeof getReviewsList>> = [];
  try {
    reviews = await getReviewsList();
  } catch {
    // Graceful fallback if YouTube fails
  }
  let products: Awaited<ReturnType<typeof getProducts>> = null;
  try {
    products = await getProducts(6);
  } catch {
    // Graceful fallback for Fourthwall
  }

  const featured = reviews[0];
  const gridReviews = reviews.slice(0, 12);

  return (
    <div className="min-h-screen">
      {featured && <Hero review={featured} />}

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Latest Reviews
        </h2>
        {gridReviews.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridReviews.map((r) => (
              <ReviewCard key={r.videoId} review={r} />
            ))}
          </div>
        ) : (
          <p className="text-foreground-muted">
            No reviews yet. Check back soon.
          </p>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Top Destinations
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {destinations.map((d) => (
            <div
              key={d.slug ?? d.name}
              className="rounded-lg border border-surface-elevated bg-surface p-4 transition-colors hover:border-accent/40"
            >
              <h3 className="font-semibold text-foreground">{d.name}</h3>
              {d.description && (
                <p className="mt-1 text-sm text-foreground-muted">
                  {d.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Dispo Pairings
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

      {products && products.length > 0 ? (
        <MerchGrid products={products} />
      ) : (
        <MerchFallback />
      )}
    </div>
  );
}
