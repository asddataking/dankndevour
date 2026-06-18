export const BRAND = {
  name: "Dank N Devour",
  tagline: "Smoke. Eat. Explore.",
  headerTagline: "CANNABIS. FOOD. ADVENTURE.",
  subtagline: "Home of Dan's Smoke Review & Dan's Dank Grow",
  description:
    "Honest reviews. Good vibes. Great food. Michigan adventures.",
  heroTitle: "Welcome to Dank N Devour",
  footerTagline: "Real Reviews. Real Experiences. Real Life.",
} as const;

export const SOCIAL_LINKS = {
  youtube:
    process.env.NEXT_PUBLIC_YOUTUBE_URL ??
    "https://www.youtube.com/@DankNDevour",
  kick: process.env.NEXT_PUBLIC_KICK_URL ?? "https://kick.com/dankndevour",
  spotify:
    process.env.NEXT_PUBLIC_SPOTIFY_URL ??
    "https://open.spotify.com/show/dankndevour",
  iheartradio:
    process.env.NEXT_PUBLIC_IHEARTRADIO_URL ??
    "https://www.iheart.com/podcast/dankndevour",
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
    "https://www.instagram.com/dankndevour",
  tiktok:
    process.env.NEXT_PUBLIC_TIKTOK_URL ?? "https://www.tiktok.com/@dankndevour",
} as const;

export const EXTERNAL_LINKS = {
  boofmap: "https://www.boofmap.com",
  shop:
    process.env.NEXT_PUBLIC_FOURTHWALL_SHOP_URL ??
    "https://dankndevour-shop.fourthwall.com",
} as const;

export const HERO_CHECKLIST = [
  "Honest Reviews",
  "Good Vibes",
  "Great Food",
  "Michigan Proud!",
  "Cannabis Intelligence",
] as const;

export const SITE_IMAGES = {
  hero: "/images/hero.jpg",
  newsletter: "/images/newsletter-creator.jpg",
  featureExplore: "/images/feature-explore.jpg",
  featureBoofmap: "/images/feature-boofmap.jpg",
  featureGrow: "/images/feature-grow.jpg",
  wakeNBakeLogo: "/images/wakenbake-logo-no-person.png",
  wakeNBakeLogoFull: "/images/wakenbake-logo.png",
} as const;

export interface CategoryCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  external?: boolean;
  image: string;
}

export const CATEGORY_CARDS: CategoryCard[] = [
  {
    id: "smoke",
    icon: "🌿",
    title: "Dan's Smoke Review",
    description: "Honest cannabis reviews, livestreams & smoke tests.",
    cta: "WATCH NOW",
    href: "/reviews",
    image: "/images/category-smoke.jpg",
  },
  {
    id: "grow",
    icon: "🌱",
    title: "Grow Journal",
    description: "Follow the journey from clone to harvest.",
    cta: "FOLLOW ALONG",
    href: "/#dank-grow",
    image: "/images/category-grow.jpg",
  },
  {
    id: "devour",
    icon: "🍔",
    title: "Devour",
    description: "Food reviews, munchies & local favorites.",
    cta: "LET'S EAT",
    href: "/#devour",
    image: "/images/category-devour.jpg",
  },
  {
    id: "explore",
    icon: "🏕️",
    title: "Explore",
    description: "Michigan adventures, dispensaries & road trips.",
    cta: "LET'S EXPLORE",
    href: "/#explore",
    image: "/images/category-explore.jpg",
  },
  {
    id: "boofmap",
    icon: "📍",
    title: "BoofMap",
    description: "Find fire. Avoid boof. Community intel.",
    cta: "VIEW BOOFMAP",
    href: EXTERNAL_LINKS.boofmap,
    external: true,
    image: "/images/category-boofmap.jpg",
  },
  {
    id: "shop",
    icon: "🛒",
    title: "Shop",
    description: "Official merch, gear & future drops.",
    cta: "SHOP NOW",
    href: "/#shop",
    image: "/images/category-shop.jpg",
  },
];

export const BOOFMAP_STATS = [
  { label: "Strains", value: "2,431" },
  { label: "Reviews", value: "1,286" },
  { label: "Brands", value: "512" },
  { label: "Dispensaries", value: "198" },
] as const;

export const BOOFMAP_FEATURES = [
  { title: "Top Strains", description: "Community-ranked favorites" },
  { title: "Latest Reports", description: "Fresh intel from the field" },
  { title: "Top Brands", description: "Trusted producers & labels" },
  {
    title: "Community Intelligence",
    description: "Crowdsourced cannabis data",
  },
] as const;

export const EXPLORE_CONTENT = [
  { title: "Dispensary Tours", emoji: "🏪" },
  { title: "Events", emoji: "🎉" },
  { title: "Festivals", emoji: "🎪" },
  { title: "Camping Trips", emoji: "⛺" },
  { title: "Cannabis Tourism", emoji: "🗺️" },
  { title: "Local Discoveries", emoji: "💎" },
] as const;

export const GROW_STAGES = [
  { emoji: "🧬", label: "Genetics" },
  { emoji: "🌱", label: "Early Growth" },
  { emoji: "✂️", label: "Training" },
  { emoji: "🌿", label: "Flower" },
  { emoji: "🪓", label: "Harvest" },
  { emoji: "🔥", label: "Final Smoke Test" },
] as const;

export const GROW_DASHBOARD = {
  currentGrow: "Coming Soon",
  currentStage: "Planning",
  currentDay: 0,
  nextUpdate: "Grow Setup",
} as const;

export const GROW_EPISODES = [
  { title: "Starting The Grow", status: "Upcoming" },
  { title: "Choosing Genetics", status: "Upcoming" },
  { title: "First Training Session", status: "Upcoming" },
  { title: "Flower Update", status: "Upcoming" },
  { title: "Harvest Day", status: "Upcoming" },
  { title: "Final Smoke Review", status: "Upcoming" },
] as const;

export const FALLBACK_MERCH = [
  { id: "bucket", title: "Dank'N'Devour Bucket", slug: "dankndevour-bucket" },
  { id: "cozy-hoodie", title: "Keepin It Dank Cozy Hoodie", slug: "keepin-it-dank-cozy-hoodie" },
  { id: "og-hoodie", title: "Dank'N'Devour OG Hoodie", slug: "dankndevour-og-hoodie" },
  { id: "snapback", title: "OG Snapback", slug: "og-snapback" },
  { id: "beanie", title: "OG Beanie", slug: "og-beanie" },
  { id: "tee", title: "OG Tee", slug: "og-tee" },
] as const;

export const HEADER_NAV: ReadonlyArray<{
  label: string;
  href: string;
  external?: boolean;
}> = [
  { label: "Home", href: "/" },
  { label: "Smoke", href: "/reviews" },
  { label: "Grow", href: "/#dank-grow" },
  { label: "Devour", href: "/#devour" },
  { label: "Explore", href: "/#explore" },
  { label: "BoofMap", href: EXTERNAL_LINKS.boofmap, external: true },
  { label: "Shop", href: "/#shop" },
];

export const FOOTER_QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Dan's Smoke Review", href: "/reviews" },
  { label: "Dan's Dank Grow", href: "/#dank-grow" },
  { label: "Devour", href: "/#devour" },
  { label: "Explore", href: "/#explore" },
  { label: "Shop", href: "/#shop" },
] as const;

export const FOOTER_RESOURCES = [
  { label: "BoofMap", href: EXTERNAL_LINKS.boofmap, external: true },
  { label: "Certified Dank", href: "/certified-dank" },
  { label: "Hidden Gems", href: "/hidden-gems" },
  { label: "Worth the Drive", href: "/worth-the-drive" },
  { label: "Dispo Pairings", href: "/dispo-pairings" },
  { label: "Cities", href: "/cities" },
] as const;

export const FOOTER_SUPPORT = [
  { label: "Join The Crew", href: "/#join" },
  { label: "Merch Store", href: EXTERNAL_LINKS.shop, external: true },
  { label: "YouTube", href: SOCIAL_LINKS.youtube, external: true },
  { label: "Kick", href: SOCIAL_LINKS.kick, external: true },
] as const;

export const FOOTER_NAV: ReadonlyArray<{
  label: string;
  href: string;
  external?: boolean;
}> = [
  { label: "Home", href: "/" },
  { label: "Dan's Smoke Review", href: "/reviews" },
  { label: "Dan's Dank Grow", href: "/#dank-grow" },
  { label: "BoofMap", href: EXTERNAL_LINKS.boofmap, external: true },
  { label: "Explore", href: "/#explore" },
  { label: "Devour", href: "/#devour" },
  { label: "Shop", href: "/#shop" },
];
