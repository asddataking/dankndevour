import type { RatingScores } from "@/types/review";

const LABELS: Record<keyof RatingScores, string> = {
  taste: "Taste",
  cost: "Cost",
  portion: "Portion Size",
  munchies: "Munchies Factor",
};

const ICONS: Record<keyof RatingScores, string> = {
  taste: "🔥",
  cost: "💵",
  portion: "💪",
  munchies: "🔥",
};

export function RatingSummary({
  scores,
  showUnrated = true,
  variant = "card",
}: {
  scores?: RatingScores;
  showUnrated?: boolean;
  variant?: "card" | "compact";
}) {
  const entries = scores
    ? (Object.entries(scores) as [keyof RatingScores, number][]).filter(
        ([, v]) => typeof v === "number"
      )
    : [];

  if (!scores || entries.length === 0) {
    if (!showUnrated) return null;
    return (
      <div className="rounded-lg border border-surface-elevated bg-surface p-4">
        <h3 className="font-semibold uppercase tracking-wide text-foreground">
          Rating Summary
        </h3>
        <p className="mt-2 text-sm text-foreground-muted">Unrated</p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="rounded-lg border border-surface-elevated bg-surface p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
          Rating Summary
        </h3>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {entries.map(([key, value]) => (
            <li key={key} className="flex items-center gap-1.5">
              <span aria-hidden className="text-base">
                {ICONS[key]}
              </span>
              <span className="text-foreground-muted">{LABELS[key]}</span>
              <span className="font-medium text-foreground">{value}/10</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-surface-elevated bg-surface p-4">
      <h3 className="font-semibold uppercase tracking-wide text-foreground">
        Rating Summary
      </h3>
      <ul className="mt-3 space-y-2">
        {entries.map(([key, value]) => (
          <li key={key} className="flex items-center justify-between gap-2 text-sm">
            <span className="flex items-center gap-1.5 text-foreground-muted">
              <span aria-hidden>{ICONS[key]}</span>
              {LABELS[key]}
            </span>
            <span className="font-medium text-foreground">{value}/10</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
