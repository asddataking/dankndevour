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
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6 text-sm text-foreground-muted">
          <span className="font-medium text-foreground">Network</span>
          <a
            href="https://dailydispodeals.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            Daily Dispo Deals
          </a>
          <a
            href="https://annarborhashbash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            Ann Arbor Hash Bash
          </a>
        </div>
        <p className="mt-3 text-sm text-foreground-muted">
          Going to Hash Bash weekend?{" "}
          <a
            href="https://annarborhashbash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Plan it here → AnnArborHashBash.com
          </a>
        </p>
        <p className="mt-4 text-center text-xs text-foreground-muted sm:text-left">
          © {new Date().getFullYear()} Dank N Devour. Food. Smoke. No Filter.
        </p>
      </div>
    </footer>
  );
}
