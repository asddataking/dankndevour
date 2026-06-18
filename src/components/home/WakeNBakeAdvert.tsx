import Image from "next/image";
import { SITE_IMAGES } from "@/data/brand";

export function WakeNBakeAdvert() {
  return (
    <section className="bg-black py-8 md:py-10">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-surface/50 px-5 py-4 sm:gap-6 sm:px-6 sm:py-5">
          <Image
            src={SITE_IMAGES.wakeNBakeLogoFull}
            alt="Wake N Bake Coffee Co."
            width={80}
            height={80}
            className="h-16 w-16 shrink-0 rounded-full object-cover sm:h-20 sm:w-20"
          />
          <div className="min-w-0 flex-1">
            <p className="font-nav text-[10px] tracking-[0.2em] text-foreground-muted sm:text-xs">
              Future Project
            </p>
            <h3 className="font-display text-lg text-white sm:text-xl">
              Wake N Bake Coffee Co.
            </h3>
            <p className="mt-0.5 text-xs text-foreground-muted sm:text-sm">
              Premium small batch coffee. Rise. Grind. Unwind.
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 font-nav text-[10px] tracking-widest text-accent sm:px-4 sm:text-xs">
            Launching Soon
          </span>
        </div>
      </div>
    </section>
  );
}
