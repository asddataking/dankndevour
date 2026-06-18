import Link from "next/link";
import {
  GROW_DASHBOARD,
  GROW_EPISODES,
  GROW_STAGES,
  SOCIAL_LINKS,
} from "@/data/brand";

export function DankGrowSection() {
  return (
    <section className="border-y border-white/5 bg-surface/30 py-12 md:py-16">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-nav text-sm tracking-[0.2em] text-accent">
              From Clone To Harvest
            </p>
            <h2 className="font-display mt-2 text-3xl text-white md:text-5xl">
              Dan&apos;s Dank Grow
            </h2>
          </div>
          <Link
            href="/#dank-grow"
            className="font-nav text-sm tracking-wider text-accent hover:underline"
          >
            Full Grow Log →
          </Link>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {GROW_STAGES.map((stage) => (
            <div
              key={stage.label}
              className="rounded-xl border border-white/10 bg-black/40 p-3 text-center"
            >
              <span className="text-xl" aria-hidden>
                {stage.emoji}
              </span>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-foreground-muted sm:text-xs">
                {stage.label}
              </p>
            </div>
          ))}
        </div>

        <div
          id="dank-grow"
          className="mb-8 grid gap-4 rounded-2xl border border-accent/20 bg-black/50 p-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <DashboardStat label="Current Grow" value={GROW_DASHBOARD.currentGrow} />
          <DashboardStat label="Current Stage" value={GROW_DASHBOARD.currentStage} />
          <DashboardStat label="Current Day" value={String(GROW_DASHBOARD.currentDay)} />
          <DashboardStat label="Next Update" value={GROW_DASHBOARD.nextUpdate} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GROW_EPISODES.map((ep) => (
            <div
              key={ep.title}
              className="rounded-xl border border-white/10 bg-black/40 p-5 transition-colors hover:border-accent/30"
            >
              <span className="font-nav text-xs tracking-widest text-accent">
                {ep.status}
              </span>
              <h4 className="mt-2 font-semibold text-foreground">{ep.title}</h4>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {(
            [
              ["YouTube", SOCIAL_LINKS.youtube],
              ["Kick", SOCIAL_LINKS.kick],
            ] as const
          ).map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-foreground-muted">
        {label}
      </p>
      <p className="mt-1 text-xl font-bold text-foreground">{value}</p>
    </div>
  );
}
