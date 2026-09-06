const INK = "#16191D";
const ASH = "#5E6670";
const ACCENT = "#0E7A5A";
const PAPER = "#FFFFFF";

const ROLES = ["Board", "Strategic Advisor / CTO", "Infrastructure Lead", "Operations Team"];

/** Static diagram anchoring the RACI concept: downward mandate flow, upward review loop. */
export function AccountabilityFlow() {
  const boxY = [20, 130, 240, 350];
  const boxH = 60;
  const boxW = 210;
  const cx = 130;

  return (
    <svg viewBox="0 0 320 430" className="w-full max-w-sm" role="img" aria-label="Decision and accountability flow: Board mandates down to Strategic Advisor, Infrastructure Lead, and Operations Team, with a Review and Report loop back up to the Board">
      {ROLES.map((role, i) => (
        <g key={role}>
          <rect x={cx - boxW / 2} y={boxY[i]} width={boxW} height={boxH} rx={10} fill={PAPER} stroke={i === 0 ? ACCENT : INK} strokeWidth={1.8} />
          <text x={cx} y={boxY[i] + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight={600} fill={i === 0 ? ACCENT : INK}>
            {role}
          </text>
        </g>
      ))}

      {/* Downward mandate arrows */}
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={cx}
          y1={boxY[i] + boxH}
          x2={cx}
          y2={boxY[i + 1]}
          stroke={INK}
          strokeWidth={1.8}
          markerEnd="url(#flowArrowDown)"
        />
      ))}
      <text x={cx + 14} y={(boxY[0] + boxH + boxY[1]) / 2 + 4} fontSize="9" fill={ASH}>
        mandate
      </text>

      {/* Upward review & report loop */}
      <path
        d={`M ${cx + boxW / 2} ${boxY[3] + boxH / 2} C ${cx + boxW / 2 + 70} ${boxY[3]}, ${cx + boxW / 2 + 70} ${boxY[0]}, ${cx + boxW / 2} ${boxY[0] + boxH / 2}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth={1.6}
        strokeDasharray="5 4"
        markerEnd="url(#flowArrowUp)"
      />
      <text x={cx + boxW / 2 + 80} y={(boxY[0] + boxY[3]) / 2} fontSize="9.5" fontWeight={600} fill={ACCENT} transform={`rotate(90 ${cx + boxW / 2 + 80} ${(boxY[0] + boxY[3]) / 2})`}>
        Review &amp; Report
      </text>

      <defs>
        <marker id="flowArrowDown" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
          <path d="M0,0 L4,8 L8,0 Z" fill={INK} />
        </marker>
        <marker id="flowArrowUp" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,8 L4,0 L8,8 Z" fill={ACCENT} />
        </marker>
      </defs>
    </svg>
  );
}
