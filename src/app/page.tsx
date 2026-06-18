import type { Metadata } from "next";
import { CategoryCards } from "@/components/home/CategoryCards";
import { DankGrowSection } from "@/components/home/DankGrowSection";
import { DevourSection } from "@/components/home/DevourSection";
import { FeaturedRow } from "@/components/home/FeaturedRow";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { HomeHero } from "@/components/home/HomeHero";
import { LatestEpisodes } from "@/components/home/LatestEpisodes";
import { WakeNBakeAdvert } from "@/components/home/WakeNBakeAdvert";
import { BRAND } from "@/data/brand";
import { getProducts } from "@/lib/fourthwall";
import { getReviewsList } from "@/lib/reviews";

export const metadata: Metadata = {
  title: {
    absolute: `Dank N Devour | ${BRAND.tagline}`,
  },
  description: BRAND.description,
  openGraph: {
    title: `Dank N Devour | ${BRAND.tagline}`,
    description: BRAND.description,
    url: "/",
  },
  alternates: { canonical: "/" },
};

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

  return (
    <div className="min-h-screen bg-black">
      <HomeHero featuredReview={featured} />
      <CategoryCards />
      <FeaturedRow featured={featured} />
      <LatestEpisodes reviews={reviews} />
      <FeatureGrid products={products} />
      <DankGrowSection />
      <DevourSection />
      <WakeNBakeAdvert />
    </div>
  );
}
