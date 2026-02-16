export type RatingBadge = "DANK" | "MID" | "DEVOUR";

export type ReviewCategory =
  | "Pizza"
  | "Tacos"
  | "BBQ"
  | "Burgers"
  | "Dispo Pairings"
  | string;

export interface RatingScores {
  taste?: number;
  cost?: number;
  portion?: number;
  munchies?: number;
}

export interface PairingOverride {
  strain?: string;
  dish?: string;
  note?: string;
}

export interface ReviewOverride {
  rating: RatingBadge;
  scores?: RatingScores;
  pairing?: PairingOverride;
  category?: ReviewCategory;
}

export type ReviewOverridesMap = Record<string, ReviewOverride>;

export interface YouTubeThumbnails {
  default?: { url: string; width: number; height: number };
  medium?: { url: string; width: number; height: number };
  high?: { url: string; width: number; height: number };
  maxres?: { url: string; width: number; height: number };
}

export interface ReviewListItem {
  videoId: string;
  slug: string;
  title: string;
  description: string;
  restaurant: string;
  cityState: string;
  thumbnails: YouTubeThumbnails;
  publishedAt: string;
  rating: RatingBadge | "Unknown";
  category?: ReviewCategory;
}

export interface ReviewDetail extends ReviewListItem {
  scores?: RatingScores;
  pairing?: PairingOverride;
}

export interface FourthwallProduct {
  id: string;
  title: string;
  image: string;
  link: string;
}
