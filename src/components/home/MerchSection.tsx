import { EXTERNAL_LINKS, FALLBACK_MERCH } from "@/data/brand";
import { MerchGrid } from "@/components/MerchGrid";
import type { FourthwallProduct } from "@/types/review";

function buildFallbackProducts(): FourthwallProduct[] {
  const shopUrl = EXTERNAL_LINKS.shop.replace(/\/$/, "");
  return FALLBACK_MERCH.map((item) => ({
    id: item.id,
    title: item.title,
    image: "",
    link: `${shopUrl}/products/${item.slug}`,
  }));
}

export function MerchSection({
  products,
}: {
  products: FourthwallProduct[] | null;
}) {
  const displayProducts =
    products && products.length > 0 ? products : buildFallbackProducts();

  return (
    <section id="shop" className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-10">
          <div>
            <h2 className="text-2xl font-bold text-foreground md:text-4xl">
              Merch Shop
            </h2>
            <p className="mt-2 text-foreground-muted">
              Official Dank N Devour gear. Powered by Fourthwall.
            </p>
          </div>
          <a
            href={EXTERNAL_LINKS.shop}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-all hover:brightness-110"
          >
            Shop All Merch
          </a>
        </div>
        <MerchGrid products={displayProducts} showTitle={false} />
      </div>
    </section>
  );
}
