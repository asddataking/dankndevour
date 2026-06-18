import Image from "next/image";
import Link from "next/link";
import {
  BOOFMAP_STATS,
  EXTERNAL_LINKS,
  FALLBACK_MERCH,
  SITE_IMAGES,
} from "@/data/brand";
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

export function FeatureGrid({
  products,
}: {
  products: FourthwallProduct[] | null;
}) {
  const displayProducts =
    products && products.length > 0
      ? products.slice(0, 3)
      : buildFallbackProducts().slice(0, 3);

  return (
    <section className="bg-black py-10 md:py-14">
      <div className="mx-auto grid max-w-[1400px] gap-5 px-4 lg:grid-cols-3">
        <a
          href={EXTERNAL_LINKS.boofmap}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card-hover group relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10"
        >
          <Image
            src={SITE_IMAGES.featureBoofmap}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/40" />
          <div className="relative flex h-full flex-col justify-end p-6">
            <p className="font-nav text-sm text-accent">Cannabis Intelligence</p>
            <h3 className="font-display mt-2 text-3xl uppercase text-white">
              BoofMap
            </h3>
            <p className="mt-2 text-sm text-white/70">Find fire. Avoid boof.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {BOOFMAP_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/10 bg-black/50 p-3 backdrop-blur-sm"
                >
                  <p className="font-nav text-xl text-accent">{stat.value}</p>
                  <p className="text-xs text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
            <span className="btn-primary mt-6">Browse Top Strains</span>
          </div>
        </a>

        <div
          id="explore"
          className="glass-card-hover group relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10"
        >
          <Image
            src={SITE_IMAGES.featureExplore}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative flex h-full flex-col justify-end p-6">
            <p className="font-nav text-sm text-accent">Michigan Adventures</p>
            <h3 className="font-display mt-2 text-3xl uppercase text-white">
              Explore Michigan
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Road trips, dispensaries, festivals, and hidden gems across the
              Mitten.
            </p>
            <Link href="/cities" className="btn-primary mt-6 w-fit">
              See Adventures
            </Link>
          </div>
        </div>

        <div
          id="shop"
          className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-surface"
        >
          <Image
            src="/images/category-shop.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="33vw"
          />
          <div className="relative flex h-full flex-col p-6">
            <p className="font-nav text-sm text-accent">Official Gear</p>
            <h3 className="font-display mt-2 text-3xl uppercase text-white">
              Merch &amp; Gear
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Rep the crew. Hoodies, hats, tees &amp; more.
            </p>
            <div className="mt-4 flex-1">
              <MerchGrid products={displayProducts} compact showTitle={false} />
            </div>
            <a
              href={EXTERNAL_LINKS.shop}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
