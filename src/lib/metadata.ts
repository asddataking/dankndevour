import type { Metadata } from "next";
import { BRAND, SITE_IMAGES } from "@/data/brand";

export const SITE_OG_IMAGE = {
  url: SITE_IMAGES.hero,
  width: 1200,
  height: 630,
  alt: `${BRAND.name} — ${BRAND.tagline}`,
} as const;

export function siteTitle(): string {
  return `${BRAND.name} | ${BRAND.tagline}`;
}

export function createRootMetadata(): Metadata {
  return {
    title: {
      default: siteTitle(),
      template: `%s | ${BRAND.name}`,
    },
    description: BRAND.metaDescription,
    keywords: [...BRAND.keywords],
    authors: [{ name: BRAND.name }],
    creator: BRAND.name,
    publisher: BRAND.name,
    icons: {
      icon: "/DankNDevourlogo.png",
      apple: "/DankNDevourlogo.png",
    },
    openGraph: {
      title: siteTitle(),
      description: BRAND.metaDescription,
      siteName: BRAND.name,
      type: "website",
      url: "/",
      images: [SITE_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle(),
      description: BRAND.metaDescription,
      images: [SITE_IMAGES.hero],
    },
  };
}

export function createHomeMetadata(): Metadata {
  return {
    title: { absolute: siteTitle() },
    description: BRAND.metaDescription,
    openGraph: {
      title: siteTitle(),
      description: BRAND.metaDescription,
      url: "/",
      images: [SITE_OG_IMAGE],
    },
    alternates: { canonical: "/" },
  };
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: `/${string}`;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${BRAND.name}`,
      description,
      url: path,
    },
    alternates: { canonical: path },
  };
}
