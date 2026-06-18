import Image from "next/image";
import Link from "next/link";
import {
  BRAND,
  HERO_CHECKLIST,
  SITE_IMAGES,
  SOCIAL_LINKS,
} from "@/data/brand";
import { CheckIcon, PlayIcon, UsersIcon } from "@/components/ui/Icons";
import type { ReviewListItem } from "@/types/review";

const SOCIAL_PLATFORMS = [
  { label: "Kick", href: SOCIAL_LINKS.kick },
  { label: "YouTube", href: SOCIAL_LINKS.youtube },
  { label: "Spotify", href: SOCIAL_LINKS.spotify },
  { label: "iHeartRadio", href: SOCIAL_LINKS.iheartradio },
] as const;

export function HomeHero({
  featuredReview,
}: {
  featuredReview?: ReviewListItem;
}) {
  const watchHref = featuredReview
    ? `/reviews/${featuredReview.slug}`
    : "/reviews";

  return (
    <section className="relative min-h-[600px] overflow-hidden lg:min-h-[720px]">
      <div className="absolute inset-0">
        <Image
          src={SITE_IMAGES.hero}
          alt=""
          fill
          className="object-cover object-[center_20%]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        <div className="hero-glow absolute inset-0" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] gap-10 px-4 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-20">
        <div className="animate-fade-up">
          <h1 className="font-display text-4xl uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {BRAND.heroTitle}
          </h1>
          <p className="mt-5 max-w-lg text-base text-white/70 md:text-lg">
            {BRAND.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={watchHref} className="btn-primary">
              <PlayIcon className="h-4 w-4" />
              Watch Latest Review
            </Link>
            <Link href="/#join" className="btn-outline">
              <UsersIcon className="h-4 w-4" />
              Join The Crew
            </Link>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="font-nav text-[11px] text-white/50">
              Watch &amp; Listen On
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SOCIAL_PLATFORMS.map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {p.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card hidden rounded-2xl p-8 lg:block">
          <ul className="space-y-5">
            {HERO_CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-black">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className="font-nav text-lg text-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
