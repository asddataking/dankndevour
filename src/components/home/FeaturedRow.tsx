import Image from "next/image";
import Link from "next/link";
import { GROW_DASHBOARD, SITE_IMAGES } from "@/data/brand";
import { PlayIcon } from "@/components/ui/Icons";
import { thumbnailUrl } from "@/lib/thumbnails";
import type { ReviewListItem } from "@/types/review";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function FeaturedRow({
  featured,
}: {
  featured?: ReviewListItem;
}) {
  const thumb = featured ? thumbnailUrl(featured.thumbnails) : null;
  const title = featured?.restaurant || featured?.title || "Latest Review";
  const displayTitle =
    title.length > 28 ? title.split(" ").slice(0, 3).join(" ") : title;

  return (
    <section className="bg-black py-10 md:py-14">
      <div className="mx-auto grid max-w-[1400px] gap-5 px-4 lg:grid-cols-3">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface lg:col-span-2">
          <p className="font-nav px-5 pt-5 text-sm text-accent">
            Featured Episode
          </p>
          <Link
            href={featured ? `/reviews/${featured.slug}` : "/reviews"}
            className="group block"
          >
            <div className="relative m-4 mt-3 aspect-video overflow-hidden rounded-xl bg-black">
              {thumb ? (
                <Image
                  src={thumb}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              ) : (
                <Image
                  src="/images/category-smoke.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-black shadow-[0_0_30px_rgba(153,255,0,0.5)] transition-transform group-hover:scale-110">
                  <PlayIcon className="h-7 w-7" />
                </span>
              </div>
              <p className="font-display absolute bottom-4 left-4 text-3xl uppercase text-accent neon-text md:text-5xl">
                {displayTitle}!
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 px-5 pb-2 text-sm text-foreground-muted">
              {featured?.publishedAt && (
                <span>{formatDate(featured.publishedAt)}</span>
              )}
              {featured?.cityState && <span>{featured.cityState}</span>}
              {featured?.rating && featured.rating !== "Unknown" && (
                <span className="rounded border border-accent/40 bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                  {featured.rating}
                </span>
              )}
            </div>
            <div className="px-5 pb-5">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-accent">
                {title}
              </h3>
              <span className="btn-primary mt-4">Watch Now</span>
            </div>
          </Link>
        </div>

        <div className="relative flex min-h-[400px] flex-col overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={SITE_IMAGES.featureGrow}
            alt=""
            fill
            className="object-cover"
            sizes="33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative flex flex-1 flex-col justify-between p-6">
            <div>
              <p className="font-nav text-sm text-accent">Dan&apos;s Dank Grow</p>
              <h3 className="font-display mt-2 text-3xl uppercase text-white">
                From Clone To Harvest
              </h3>
              <p className="mt-3 text-sm text-white/70">
                Real updates. Real lessons. Real results. Follow the full grow
                journey.
              </p>
            </div>

            <div className="my-6 grid grid-cols-2 gap-3">
              <GrowStat label="Grow" value={GROW_DASHBOARD.currentGrow} />
              <GrowStat label="Stage" value={GROW_DASHBOARD.currentStage} />
              <GrowStat label="Day" value={String(GROW_DASHBOARD.currentDay)} />
              <GrowStat label="Next" value={GROW_DASHBOARD.nextUpdate} />
            </div>

            <Link href="/#dank-grow" className="btn-primary w-full text-center">
              Follow The Grow
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function GrowStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/50 p-3 backdrop-blur-sm">
      <p className="font-nav text-[10px] text-white/50">{label}</p>
      <p className="mt-0.5 truncate text-sm font-semibold text-foreground">
        {value}
      </p>
    </div>
  );
}
