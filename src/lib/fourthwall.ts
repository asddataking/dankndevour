import type { FourthwallProduct } from "@/types/review";

const STOREFRONT_API = "https://storefront-api.fourthwall.com/v1";
const LIST_REVALIDATE = 3600;

function getToken(): string | null {
  return process.env.FOURTHWALL_STOREFRONT_TOKEN ?? null;
}

/**
 * Fetch 3–6 products from the "all" collection. Cached 1 hour.
 * If API fails, returns null so UI can show fallback.
 */
export async function getProducts(
  limit = 6
): Promise<FourthwallProduct[] | null> {
  try {
    const token = getToken();
    if (!token) return null;
    const url = `${STOREFRONT_API}/collections/all/products?storefront_token=${encodeURIComponent(token)}&page=0&size=${Math.max(limit, 6)}`;
    const res = await fetch(url, {
      next: { revalidate: LIST_REVALIDATE },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      results?: Array<{
        id?: string;
        name?: string;
        slug?: string;
        images?: Array<{ url?: string; transformedUrl?: string }>;
      }>;
    };
    const results = data.results ?? [];
    const shopUrl =
      process.env.NEXT_PUBLIC_FOURTHWALL_SHOP_URL?.replace(/\/$/, "") || "";
    const products: FourthwallProduct[] = results.slice(0, limit).map((p) => {
      const firstImage = p.images?.[0];
      const imageUrl = firstImage?.transformedUrl || firstImage?.url || "";
      const productPath = p.slug ? `/products/${p.slug}` : "";
      const link = shopUrl ? `${shopUrl}${productPath}` : productPath || "#";
      return {
        id: p.id ?? "",
        title: p.name ?? "",
        image: imageUrl,
        link,
      };
    });
    return products;
  } catch {
    return null;
  }
}
