const INK = "#16191D";
const ASH = "#5E6670";
const ACCENT = "#0E7A5A";
const LINE = "#E2E5E9";
const PAPER = "#FFFFFF";
const DENOM = "#B87514";

/** A square-bracket spanning [y1, y2] at x, opening toward `side`. */
function SpanBracket({ x, y1, y2, side, color }: { x: number; y1: number; y2: number; side: "left" | "right"; color: string }) {
  const tick = side === "left" ? -8 : 8;
  return (
    <g stroke={color} strokeWidth={1.8} fill="none">
      <path d={`M${x + tick},${y1} L${x},${y1} L${x},${y2} L${x + tick},${y2}`} />
    </g>
  );
}

/**
 * Block 1 — the energy chain (Grid → Switchgear → UPS → PDU → IT Load /
 * Facility overhead) with the PUE formula overlaid: the numerator bracket
 * spans both boxes (Total Facility Energy = IT + overhead), the denominator
 * bracket isolates IT Load alone — color-matched to the equation below.
 */
export function EnergyFlowSvg() {
  return (
    <div className="group">
      <svg viewBox="0 0 860 330" className="w-full" role="img" aria-label="Data centre energy flow from grid to IT load and facility overhead">
        {/* Grid */}
        <g>
          <circle cx={40} cy={80} r={20} fill="none" stroke={INK} strokeWidth={1.8} />
          <path d="M44 70 L33 84 L40 84 L36 94 L49 78 L41 78 Z" fill={INK} />
          <text x={40} y={116} textAnchor="middle" fontSize="10.5" fontWeight={600} fill={ASH}>Grid</text>
        </g>

        {/* Grid -> Switchgear */}
        <FlowArrow x1={62} y1={80} x2={118} y2={80} />
        <rect x={118} y={60} width={80} height={40} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.6} />
        <text x={158} y={84} textAnchor="middle" fontSize="10.5" fontWeight={700} fill={INK}>Switchgear</text>

        {/* Switchgear -> UPS */}
        <FlowArrow x1={198} y1={80} x2={254} y2={80} />
        <rect x={254} y={55} width={90} height={50} rx={6} fill={PAPER} stroke={DENOM} strokeWidth={1.8} />
        <text x={299} y={76} textAnchor="middle" fontSize="11" fontWeight={700} fill={DENOM}>UPS</text>
        <text x={299} y={92} textAnchor="middle" fontSize="9" fill={DENOM}>–3–6% loss</text>

        {/* UPS -> PDU */}
        <FlowArrow x1={344} y1={80} x2={400} y2={80} />
        <rect x={400} y={58} width={80} height={44} rx={6} fill={PAPER} stroke={DENOM} strokeWidth={1.8} />
        <text x={440} y={78} textAnchor="middle" fontSize="11" fontWeight={700} fill={DENOM}>PDU</text>
        <text x={440} y={93} textAnchor="middle" fontSize="9" fill={DENOM}>–1–2% loss</text>

        {/* PDU -> split */}
        <path d="M480 80 C 510 80, 510 80, 540 80" fill="none" stroke={INK} strokeWidth={1.6} markerEnd="url(#flowArrow)" />
        <path d="M480 80 C 510 80, 510 210, 540 210" fill="none" stroke={INK} strokeWidth={1.6} markerEnd="url(#flowArrow)" />

        {/* IT Load box (denominator) */}
        <rect x={540} y={55} width={150} height={54} rx={8} fill={PAPER} stroke={DENOM} strokeWidth={2} />
        <text x={615} y={78} textAnchor="middle" fontSize="12" fontWeight={700} fill={DENOM}>IT Load</text>
        <text x={615} y={94} textAnchor="middle" fontSize="9" fill={ASH}>servers · storage · network</text>

        {/* Facility overhead box */}
        <rect x={540} y={185} width={150} height={54} rx={8} fill={PAPER} stroke={ACCENT} strokeWidth={2} />
        <text x={615} y={208} textAnchor="middle" fontSize="11.5" fontWeight={700} fill={ACCENT}>Cooling &amp; Facility</text>
        <text x={615} y={224} textAnchor="middle" fontSize="9" fill={ASH}>CRAC/CRAH · lighting · security</text>

        {/* Flow pulse overlay, hover only */}
        <path
          d="M62 80 H480 M480 80 C510 80 510 80 540 80 M480 80 C510 80 510 210 540 210"
          fill="none"
          stroke={ACCENT}
          strokeWidth={2}
          strokeDasharray="5 7"
          opacity={0}
          className="anim-dash-loop transition-opacity duration-300 group-hover:opacity-70"
        />

        {/* Denominator bracket — IT Load alone */}
        <SpanBracket x={705} y1={55} y2={109} side="left" color={DENOM} />

        {/* Numerator bracket — both boxes together */}
        <SpanBracket x={710} y1={55} y2={239} side="left" color={ACCENT} />
        <path d="M690 82 H705 M690 212 H705" stroke={ACCENT} strokeWidth={1.4} strokeDasharray="3 3" opacity={0.6} />
        <text x={725} y={150} fontSize="11" fontWeight={700} fill={ACCENT} transform="rotate(90 725 150)" textAnchor="middle">
          Total Facility Energy
        </text>

        <defs>
          <marker id="flowArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={INK} />
          </marker>
        </defs>
      </svg>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-xl border border-line bg-canvas px-4 py-3 text-center">
        <span className="text-body font-semibold text-ink">PUE&nbsp;=</span>
        <span className="rounded-md px-1.5 py-0.5 text-body font-semibold" style={{ color: ACCENT, backgroundColor: "#E7F2EC" }}>
          Total Facility Energy
        </span>
        <span className="text-body text-ash">÷</span>
        <span className="rounded-md px-1.5 py-0.5 text-body font-semibold" style={{ color: DENOM, backgroundColor: "#FBF0E1" }}>
          IT Equipment Energy
        </span>
      </div>
    </div>
  );
}

function FlowArrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={1.6} markerEnd="url(#flowArrow)" />;
}
