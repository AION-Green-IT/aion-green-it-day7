const INK = "#16191D";
const ASH = "#5E6670";
const ACCENT = "#0E7A5A";
const WARN = "#B87514";
const LINE = "#E2E5E9";

/**
 * Conceptual illustration (not a precise prediction): two cost curves against
 * rising investment in efficiency & governance, with a shaded "sweet spot"
 * where both are reasonably controlled. Static — a direct visual reference
 * for Task 2's decision-making, not a graded interaction.
 */
export function GovernanceSweetSpotCurve() {
  return (
    <div>
      <svg viewBox="0 0 560 300" className="w-full" role="img" aria-label="Conceptual chart: cost of risk and cost of waste both trend down as investment in efficiency and governance rises, with a sweet spot where both are reasonably controlled">
        {/* Sweet spot shading */}
        <rect x={300} y={20} width={110} height={220} fill={ACCENT} opacity={0.08} />
        <text x={355} y={38} textAnchor="middle" fontSize="10" fontWeight={700} fill={ACCENT} className="uppercase tracking-wide">
          Sweet spot
        </text>

        {/* Axes */}
        <line x1={60} y1={240} x2={520} y2={240} stroke={LINE} strokeWidth={1.5} />
        <line x1={60} y1={20} x2={60} y2={240} stroke={LINE} strokeWidth={1.5} />
        <text x={290} y={272} textAnchor="middle" fontSize="11" fontWeight={600} fill={ASH}>
          Investment in Efficiency &amp; Governance →
        </text>
        <text x={30} y={130} textAnchor="middle" fontSize="11" fontWeight={600} fill={ASH} transform="rotate(-90 30 130)">
          Cost →
        </text>

        {/* Cost of Risk / Downtime Exposure — starts high, drops steeply, levels off */}
        <path
          d="M60,40 C 150,55 210,190 320,213 C 400,228 460,231 520,232"
          fill="none"
          stroke={WARN}
          strokeWidth={2.5}
          className="anim-draw"
        />
        {/* Cost of Waste / Inefficiency — starts lower, declines more gradually */}
        <path
          d="M60,150 C 190,138 300,118 380,150 C 440,172 480,184 520,190"
          fill="none"
          stroke={ACCENT}
          strokeWidth={2.5}
          className="anim-draw"
        />

        <circle cx={60} cy={40} r={3.5} fill={WARN} />
        <circle cx={60} cy={150} r={3.5} fill={ACCENT} />
      </svg>

      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-caption">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: WARN }} />
          Cost of Risk / Downtime Exposure
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: ACCENT }} />
          Cost of Waste / Inefficiency
        </span>
      </div>
      <p className="mt-2 text-micro text-ash">
        Conceptual illustration, not a precise prediction — both costs fall as investment rises, but from different
        starting shapes. The shaded band is where both are reasonably controlled at once.
      </p>
    </div>
  );
}
