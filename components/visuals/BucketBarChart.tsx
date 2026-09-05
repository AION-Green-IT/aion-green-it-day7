/**
 * Horizontal SVG bar chart — one bar per bucket, count driven live from the
 * sorting board. Bars animate by scaleX (transform-box: fill-box) so the
 * width transition is smooth and cross-browser. Bars use the single accent;
 * everything else is neutral. The same component renders the static snapshot
 * inside the exported Diagnostic Note.
 */
export function BucketBarChart({
  buckets,
  counts,
}: {
  buckets: { id: string; label: string }[];
  counts: Record<string, number>;
}) {
  const values = buckets.map((b) => counts[b.id] ?? 0);
  const scaleMax = Math.max(1, ...values);

  const PAD = 8;
  const ROW = 30;
  const BAR_H = 16;
  const TRACK_X = 108;
  const TRACK_W = 196;
  const COUNT_X = 332;
  const W = 340;
  const H = PAD * 2 + buckets.length * ROW;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Number of signals sorted into each bucket"
      style={{ maxWidth: 460 }}
    >
      {buckets.map((b, i) => {
        const y = PAD + i * ROW;
        const cy = y + BAR_H / 2;
        const count = counts[b.id] ?? 0;
        const frac = count / scaleMax;
        return (
          <g key={b.id}>
            <text
              x={100}
              y={cy}
              textAnchor="end"
              dominantBaseline="central"
              fontSize="10.5"
              fill="#5E6670"
              fontFamily="Segoe UI, Helvetica Neue, Arial, sans-serif"
            >
              {b.label}
            </text>

            {/* track */}
            <rect x={TRACK_X} y={y} width={TRACK_W} height={BAR_H} rx={4} fill="#EEF1F3" />

            {/* fill — scaled from the left edge */}
            <rect
              x={TRACK_X}
              y={y}
              width={TRACK_W}
              height={BAR_H}
              rx={4}
              fill="#0E7A5A"
              style={{
                transformBox: "fill-box",
                transformOrigin: "left",
                transform: `scaleX(${frac})`,
                transition: "transform 0.4s ease",
              }}
            />

            <text
              x={COUNT_X}
              y={cy}
              textAnchor="end"
              dominantBaseline="central"
              fontSize="12"
              fontWeight={600}
              fill={count > 0 ? "#16191D" : "#9AA1AA"}
              fontFamily="Segoe UI, Helvetica Neue, Arial, sans-serif"
            >
              {count}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
