import type { RatingScores } from "@/types/review";

const LABELS: Record<keyof RatingScores, string> = {
  taste: "Taste",
  cost: "Cost",
  portion: "Portion",
  munchies: "Munchies",
};

export function RatingSummary({
  scores,
  showUnrated = true,
}: {
  scores?: RatingScores;
  showUnrated?: boolean;
}) {
  if (!scores) {
    if (!showUnrated) return null;
    return (
      <div className="rounded-lg border border-surface-elevated bg-surface p-4">
        <h3 className="font-semibold text-foreground">Rating Summary</h3>
        <p className="mt-2 text-sm text-foreground-muted">Unrated</p>
      </div>
    );
  }
  const entries = (Object.entries(scores) as [keyof RatingScores, number][]).filter(
    ([, v]) => typeof v === "number"
  );
  if (entries.length === 0) {
    if (!showUnrated) return null;
    return (
      <div className="rounded-lg border border-surface-elevated bg-surface p-4">
        <h3 className="font-semibold text-foreground">Rating Summary</h3>
        <p className="mt-2 text-sm text-foreground-muted">Unrated</p>
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-surface-elevated bg-surface p-4">
      <h3 className="font-semibold text-foreground">Rating Summary</h3>
      <ul className="mt-3 space-y-2">
        {entries.map(([key, value]) => (
          <li key={key} className="flex items-center justify-between text-sm">
            <span className="text-foreground-muted">{LABELS[key]}</span>
            <span className="font-medium text-foreground">{value}/10</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
