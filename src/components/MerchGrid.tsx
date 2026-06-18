import type { FourthwallProduct } from "@/types/review";

export function MerchGrid({
  products,
  showTitle = true,
  compact = false,
}: {
  products: FourthwallProduct[];
  showTitle?: boolean;
  compact?: boolean;
}) {
  if (products.length === 0) return null;

  return (
    <div>
      {showTitle && (
        <h2 className="section-label mb-6">Merch Shop</h2>
      )}
      <div
        className={
          compact
            ? "grid grid-cols-3 gap-2"
            : "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3"
        }
      >
        {products.map((p) => (
          <a
            key={p.id}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card-hover group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40 transition-all hover:border-accent/40"
          >
            <div
              className={`relative w-full bg-black ${compact ? "aspect-square" : "aspect-square"}`}
            >
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-1 bg-gradient-to-br from-surface-elevated to-black p-2 text-center">
                  <span className={compact ? "text-lg" : "text-3xl"} aria-hidden>
                    🛒
                  </span>
                  {!compact && (
                    <span className="text-xs text-foreground-muted">
                      Dank N Devour
                    </span>
                  )}
                </div>
              )}
            </div>
            {!compact && (
              <div className="flex flex-1 flex-col justify-between p-4">
                <p className="line-clamp-2 font-medium text-foreground group-hover:text-accent">
                  {p.title}
                </p>
                <span className="mt-3 inline-flex w-fit rounded border border-accent/40 px-3 py-1 text-xs font-nav tracking-wider text-accent transition-colors group-hover:bg-accent group-hover:text-black">
                  Shop
                </span>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
