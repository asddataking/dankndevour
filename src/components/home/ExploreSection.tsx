import Link from "next/link";
import { EXPLORE_CONTENT } from "@/data/brand";

export function ExploreSection() {
  return (
    <section id="explore" className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl font-bold text-foreground md:text-4xl">
            Explore Michigan
          </h2>
          <p className="mt-3 max-w-2xl text-foreground-muted">
            Road trips, dispensary visits, festivals, cannabis destinations,
            hidden gems, and adventures across Michigan.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORE_CONTENT.map((item) => (
            <div
              key={item.title}
              className="glass-card glass-card-hover rounded-xl p-5"
            >
              <span className="text-2xl" aria-hidden>
                {item.emoji}
              </span>
              <h3 className="mt-3 font-semibold text-foreground">{item.title}</h3>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/cities"
            className="text-sm font-semibold text-accent hover:underline"
          >
            Browse cities →
          </Link>
          <Link
            href="/worth-the-drive"
            className="text-sm font-semibold text-accent hover:underline"
          >
            Worth the drive →
          </Link>
        </div>
      </div>
    </section>
  );
}
