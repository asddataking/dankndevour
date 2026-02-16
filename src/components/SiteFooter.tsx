import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-surface-elevated bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link
            href="/"
            className="text-sm font-semibold text-foreground hover:text-accent"
          >
            DANK <span className="text-accent">N</span> DEVOUR
          </Link>
          <nav className="flex gap-6 text-sm text-foreground-muted">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <Link href="/reviews" className="hover:text-foreground">
              Reviews
            </Link>
          </nav>
        </div>
        <p className="mt-4 text-center text-xs text-foreground-muted sm:text-left">
          © {new Date().getFullYear()} Dank N Devour. Food. Smoke. No Filter.
        </p>
      </div>
    </footer>
  );
}
