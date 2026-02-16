import type { PairingOverride } from "@/types/review";

export function PairingCard({ pairing }: { pairing?: PairingOverride }) {
  if (!pairing || (!pairing.strain && !pairing.dish)) return null;
  return (
    <div className="rounded-lg border border-surface-elevated bg-surface p-4">
      <h3 className="font-semibold uppercase tracking-wide text-foreground">
        Paired With
      </h3>
      <dl className="mt-2 space-y-1 text-sm">
        {pairing.strain && (
          <div>
            <dt className="text-foreground-muted">Strain</dt>
            <dd className="font-medium text-foreground">{pairing.strain}</dd>
          </div>
        )}
        {pairing.dish && (
          <div>
            <dt className="text-foreground-muted">Dish</dt>
            <dd className="font-medium text-foreground">{pairing.dish}</dd>
          </div>
        )}
        {pairing.note && (
          <p className="mt-2 text-foreground-muted">{pairing.note}</p>
        )}
      </dl>
    </div>
  );
}
