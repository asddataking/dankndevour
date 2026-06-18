import Image from "next/image";
import Link from "next/link";
import {
  BRAND,
  FOOTER_QUICK_LINKS,
  FOOTER_RESOURCES,
  FOOTER_SUPPORT,
  SITE_IMAGES,
  SOCIAL_LINKS,
} from "@/data/brand";
import { EmailSignup } from "@/components/home/EmailSignup";

const SOCIAL_ITEMS = [
  { label: "Kick", href: SOCIAL_LINKS.kick },
  { label: "YouTube", href: SOCIAL_LINKS.youtube },
  { label: "Spotify", href: SOCIAL_LINKS.spotify },
  { label: "iHeartRadio", href: SOCIAL_LINKS.iheartradio },
  { label: "TikTok", href: SOCIAL_LINKS.tiktok },
  { label: "Instagram", href: SOCIAL_LINKS.instagram },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-black">
      <EmailSignup />

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-[1400px] px-4 py-10">
          <p className="font-nav mb-4 text-sm tracking-[0.2em] text-foreground-muted">
            Follow &amp; Watch
          </p>
          <div className="mb-10 flex flex-wrap gap-3">
            {SOCIAL_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <FooterColumn title="Quick Links" items={FOOTER_QUICK_LINKS} />
            <FooterColumn title="Resources" items={FOOTER_RESOURCES} />
            <FooterColumn title="Support" items={FOOTER_SUPPORT} />
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/5 pt-8 md:flex-row md:items-end">
            <div className="flex items-center gap-4">
              <Image
                src="/DankNDevourlogo.png"
                alt="Dank N Devour"
                width={80}
                height={32}
                className="h-8 w-auto invert"
              />
              <p className="text-xs text-foreground-muted">
                © {new Date().getFullYear()} Dank N Devour
              </p>
            </div>
            <p className="font-display text-xl text-accent neon-text md:text-2xl">
              {BRAND.footerTagline}
            </p>
          </div>

          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Image
                src={SITE_IMAGES.wakeNBakeLogo}
                alt="Wake N Bake Coffee Co."
                width={72}
                height={72}
                className="h-16 w-16 rounded-full object-cover"
              />
              <p className="text-xs text-foreground-muted/60">
                Future Projects:{" "}
                <span className="text-foreground-muted">Wake N Bake Coffee</span>
                {" — "}
                <span className="italic">Roasting Soon.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}) {
  return (
    <nav>
      <p className="font-nav mb-3 text-sm tracking-[0.15em] text-foreground">
        {title}
      </p>
      <ul className="flex flex-col gap-2 text-sm text-foreground-muted">
        {items.map((item) => (
          <li key={item.label}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                {item.label}
              </a>
            ) : (
              <Link href={item.href} className="hover:text-accent">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
