import type { FourthwallProduct } from "@/types/review";

export function MerchGrid({ products }: { products: FourthwallProduct[] }) {
  if (products.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Shop the Merch
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {products.map((p) => (
          <a
            key={p.id}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-lg border border-surface-elevated bg-surface transition-colors hover:border-accent/40"
          >
            <div className="relative aspect-square w-full bg-background">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-foreground-muted text-sm">
                  No image
                </div>
              )}
            </div>
            <div className="p-3">
              <p className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-accent">
                {p.title}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
