"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { BRAND, EXTERNAL_LINKS, HEADER_NAV } from "@/data/brand";
import { CartIcon, SearchIcon, UserIcon } from "@/components/ui/Icons";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = searchValue.trim();
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      router.push(`/reviews?${params.toString()}`);
      setSearchOpen(false);
      setMobileOpen(false);
    },
    [searchValue, router]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/90 backdrop-blur-md">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/DankNDevourlogo.png"
              alt="Dank N Devour"
              width={140}
              height={56}
              className="h-9 w-auto sm:h-11 invert"
              priority
            />
            <div className="hidden md:block">
              <p className="font-nav text-[10px] tracking-[0.2em] text-accent lg:text-xs">
                {BRAND.headerTagline}
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex">
            {HEADER_NAV.map((item) => {
              const isActive =
                !item.external &&
                (pathname === item.href ||
                  (item.href === "/reviews" && pathname.startsWith("/reviews")));

              const className = `font-nav relative px-3 py-2 text-sm tracking-widest transition-colors lg:text-[15px] ${
                isActive
                  ? "text-accent after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-accent"
                  : "text-foreground/80 hover:text-accent"
              }`;

              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link key={item.label} href={item.href} className={className}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((o) => !o)}
              className="rounded-lg p-2 text-foreground/80 transition-colors hover:text-accent"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
            <a
              href={EXTERNAL_LINKS.shop}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-lg p-2 text-foreground/80 transition-colors hover:text-accent"
              aria-label="Shop cart"
            >
              <CartIcon />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-black">
                0
              </span>
            </a>
            <button
              type="button"
              className="hidden rounded-lg p-2 text-foreground/80 transition-colors hover:text-accent sm:block"
              aria-label="Account"
            >
              <UserIcon />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="font-nav rounded border border-white/10 px-3 py-1.5 text-sm tracking-wider text-foreground xl:hidden"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={handleSearch} className="border-t border-white/5 py-3">
            <input
              type="search"
              autoFocus
              placeholder="Search reviews..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-surface px-4 py-2.5 text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none"
              aria-label="Search reviews"
            />
          </form>
        )}

        {mobileOpen && (
          <nav className="border-t border-white/5 py-4 xl:hidden">
            <div className="flex flex-col gap-1">
              {HEADER_NAV.map((item) => {
                const linkClass =
                  "font-nav rounded-lg px-3 py-2.5 text-base tracking-widest text-foreground/80 hover:bg-white/5 hover:text-accent";

                if (item.external) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={linkClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
