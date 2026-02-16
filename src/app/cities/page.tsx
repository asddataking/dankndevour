import type { Metadata } from "next";
import Link from "next/link";
import { getReviewsList } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Cities",
  description:
    "Browse our reviews by city. Find spots in your area or plan your next trip.",
  openGraph: {
    title: "Cities | Dank N Devour",
    description:
      "Browse our reviews by city. Find spots in your area or plan your next trip.",
    url: "/cities",
  },
  alternates: { canonical: "/cities" },
};

export default async function CitiesPage() {
  let cities: { name: string; count: number }[] = [];
  try {
    const reviews = await getReviewsList();
    const map = new Map<string, number>();
    reviews.forEach((r) => {
      const city = r.cityState?.trim();
      if (city) map.set(city, (map.get(city) ?? 0) + 1);
    });
    cities = Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  } catch {
    // Graceful fallback
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-foreground">
        Cities
      </h1>
      <p className="mb-8 text-foreground-muted">
        Browse our reviews by city.
      </p>
      {cities.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cities.map(({ name, count }) => (
            <Link
              key={name}
              href={`/reviews?q=${encodeURIComponent(name)}`}
              className="flex items-center justify-between rounded-lg border border-surface-elevated bg-surface px-4 py-3 transition-colors hover:border-accent/40 hover:bg-surface-elevated"
            >
              <span className="font-medium text-foreground">{name}</span>
              <span className="text-sm text-foreground-muted">
                {count} review{count !== 1 ? "s" : ""}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-foreground-muted">
          No cities yet. Reviews with a city/state will show up here.
        </p>
      )}
    </div>
  );
}
