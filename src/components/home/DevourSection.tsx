import Link from "next/link";

const DEVOUR_ITEMS = [
  {
    title: "Restaurant Reviews",
    description: "Honest takes on local spots worth the trip.",
    href: "/reviews",
  },
  {
    title: "Munchie Favorites",
    description: "Late-night eats and comfort food classics.",
    href: "/reviews",
  },
  {
    title: "Dispo Pairings",
    description: "Strain and dish combos that hit different.",
    href: "/dispo-pairings",
  },
  {
    title: "Hidden Gems",
    description: "Under-the-radar spots across Michigan.",
    href: "/hidden-gems",
  },
] as const;

export function DevourSection() {
  return (
    <section id="devour" className="bg-black py-10 md:py-14">
      <div className="mx-auto max-w-[1400px] px-4">
        <h2 className="section-label mb-6">Devour</h2>
        <p className="mb-8 max-w-xl text-foreground-muted">
          Food reviews, munchies, restaurants, and local favorites.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEVOUR_ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="glass-card glass-card-hover group rounded-xl p-5"
            >
              <span className="text-2xl" aria-hidden>
                🍔
              </span>
              <h3 className="mt-3 font-semibold text-foreground group-hover:text-accent">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-foreground-muted">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
