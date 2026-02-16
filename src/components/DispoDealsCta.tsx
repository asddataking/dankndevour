const DAILY_DISPO_DEALS_URL = "https://dailydispodeals.com";

export function DispoDealsCta({
  variant = "card",
}: {
  variant?: "card" | "inline";
}) {
  if (variant === "inline") {
    return (
      <p className="text-sm text-foreground-muted">
        Looking for dispensary deals in your area?{" "}
        <a
          href={DAILY_DISPO_DEALS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          DailyDispoDeals.com
        </a>
      </p>
    );
  }
  return (
    <div className="rounded-lg border border-accent/30 bg-surface p-3">
      <p className="text-sm text-foreground-muted">
        Want more local dispensary deals?{" "}
        <a
          href={DAILY_DISPO_DEALS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent hover:underline"
        >
          Check Daily Dispo Deals
        </a>
        .
      </p>
    </div>
  );
}
