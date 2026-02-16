"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const NAV_ITEMS = [
  { label: "Reviews", href: "/reviews" },
  { label: "Certified Dank", href: "/certified-dank" },
  { label: "Hidden Gems", href: "/hidden-gems" },
  { label: "Worth the Drive", href: "/worth-the-drive" },
  { label: "Dispo Pairings", href: "/dispo-pairings" },
  { label: "Cities", href: "/cities" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = searchValue.trim();
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      router.push(`/reviews?${params.toString()}`);
    },
    [searchValue, router]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-surface-elevated bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/DankNDevourlogo.png"
            alt="Dank N Devour"
            width={120}
            height={48}
            className="h-10 w-auto sm:h-12 invert"
            priority
          />
          <div>
            <p className="text-xs text-white sm:text-sm">
              Eat.Smoke.Repeat.
            </p>
          </div>
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          {NAV_ITEMS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`rounded px-3 py-1.5 transition-colors ${
                  isActive
                    ? "bg-accent/20 text-accent"
                    : "text-foreground-muted hover:bg-surface-elevated hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <form onSubmit={handleSearch} className="shrink-0">
          <input
            type="search"
            placeholder="Search reviews..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full min-w-[180px] rounded border border-surface-elevated bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:w-auto"
            aria-label="Search reviews"
          />
        </form>
      </div>
    </header>
  );
}
