import { BOOFMAP_FEATURES, EXTERNAL_LINKS } from "@/data/brand";

export function BoofMapSection() {
  return (
    <section
      id="boofmap"
      className="border-y border-surface-elevated bg-gradient-to-b from-emerald-950/20 via-surface/30 to-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground md:text-5xl">
              Powered by BoofMap
            </h2>
            <p className="mt-2 text-2xl font-semibold text-accent md:text-3xl">
              Find fire. Avoid boof.
            </p>
            <p className="mt-4 max-w-2xl text-foreground-muted md:text-lg">
              BoofMap is the cannabis intelligence platform behind Dank N
              Devour.
            </p>
          </div>
          <a
            href={EXTERNAL_LINKS.boofmap}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-all hover:brightness-110 hover:shadow-[0_0_30px_rgba(74,222,128,0.4)]"
          >
            Open BoofMap
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BOOFMAP_FEATURES.map((feature) => (
            <a
              key={feature.title}
              href={EXTERNAL_LINKS.boofmap}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card glass-card-hover rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-foreground transition-colors hover:text-accent">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-foreground-muted">
                {feature.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
