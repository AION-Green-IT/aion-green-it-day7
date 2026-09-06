/** Never says "correct/incorrect" — a soft nudge that preserves the clue-not-answer rule. */
export function ConfidenceHint({ matched }: { matched: boolean | null }) {
  if (matched === null) return null;
  return matched ? (
    <p className="mt-1.5 text-micro font-semibold text-accent">This looks well-matched.</p>
  ) : (
    <p className="mt-1.5 text-micro font-semibold" style={{ color: "#B87514" }}>
      This might fit better elsewhere — try the clue.
    </p>
  );
}
