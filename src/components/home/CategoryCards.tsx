import Image from "next/image";
import Link from "next/link";
import { CATEGORY_CARDS } from "@/data/brand";

export function CategoryCards() {
  return (
    <section className="border-b border-white/5 bg-black py-8">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="category-scroll flex gap-4 overflow-x-auto pb-4">
          {CATEGORY_CARDS.map((card) => {
            const inner = (
              <>
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="220px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                <div className="relative flex h-full min-h-[340px] w-[200px] shrink-0 flex-col sm:w-[220px]">
                  <div className="flex justify-center pt-6">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent/60 bg-black/50 text-2xl backdrop-blur-sm">
                      {card.icon}
                    </span>
                  </div>
                  <div className="mt-auto p-5">
                    <h3 className="font-display text-lg leading-tight text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/70">
                      {card.description}
                    </p>
                    <span className="mt-4 inline-block font-nav text-[11px] tracking-[0.15em] text-accent">
                      {card.cta} →
                    </span>
                  </div>
                </div>
              </>
            );

            const className =
              "glass-card-hover group relative shrink-0 overflow-hidden rounded-2xl border border-white/10 transition-all hover:border-accent/50";

            if (card.external) {
              return (
                <a
                  key={card.id}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              );
            }

            return (
              <Link key={card.id} href={card.href} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
