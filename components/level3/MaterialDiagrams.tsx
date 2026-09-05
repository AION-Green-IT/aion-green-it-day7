import type { DiagramKey } from "@/lib/level3";

/**
 * Five line diagrams, one per memo component, each drawn in that component's
 * accent colour and animated on mount (the card only renders it when open).
 * Same stroke weight and corner radius across all five for module continuity.
 */

type DProps = { color: string };

const FONT = "Segoe UI, Helvetica Neue, Arial, sans-serif";
const box = (color: string) => ({ fill: "#FFFFFF", stroke: color, strokeWidth: 1.4 });

function Timeline({ color }: DProps) {
  return (
    <svg viewBox="0 0 300 150" width="100%" role="img" aria-label="Baseline now, descending to a target-year reduction">
      {/* axis */}
      <line x1="30" y1="120" x2="285" y2="120" stroke="#E2E5E9" strokeWidth="1" />
      {[2026, 2028, 2030, 2032].map((yr, i) => (
        <g key={yr}>
          <line x1={45 + i * 75} y1="116" x2={45 + i * 75} y2="124" stroke="#E2E5E9" strokeWidth="1" />
          <text x={45 + i * 75} y="136" textAnchor="middle" fontSize="9" fill="#5E6670" fontFamily={FONT}>{yr}</text>
        </g>
      ))}
      {/* descending line */}
      <path className="anim-draw" d="M45 55 L270 100" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* baseline point */}
      <circle cx="45" cy="55" r="4" fill={color} />
      <text x="45" y="42" textAnchor="middle" fontSize="9.5" fill="#16191D" fontFamily={FONT}>Now: baseline</text>
      {/* target point */}
      <circle cx="270" cy="100" r="4" fill="#FFFFFF" stroke={color} strokeWidth="1.8" />
      <text x="270" y="88" textAnchor="end" fontSize="9.5" fill={color} fontWeight={600} fontFamily={FONT}>Target: −30%</text>
    </svg>
  );
}

function OrgChart({ color }: DProps) {
  const b = box(color);
  const cell = (x: number, y: number, w: number, label: string, raci: string) => (
    <g>
      <title>{raci}</title>
      <rect x={x} y={y} width={w} height="24" rx="5" {...b} />
      <text x={x + w / 2} y={y + 15} textAnchor="middle" fontSize="9" fill="#16191D" fontFamily={FONT}>{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 300 150" width="100%" role="img" aria-label="Board to steering committee to procurement and operations, with an escalation loop">
      {cell(115, 8, 70, "Board", "Informed (I)")}
      <line x1="150" y1="32" x2="150" y2="48" stroke={color} strokeWidth="1.4" />
      {cell(95, 48, 110, "Steering Committee", "Accountable (A)")}
      <line x1="150" y1="72" x2="150" y2="82" stroke={color} strokeWidth="1.4" />
      <line x1="70" y1="82" x2="230" y2="82" stroke={color} strokeWidth="1.4" />
      <line x1="70" y1="82" x2="70" y2="96" stroke={color} strokeWidth="1.4" />
      <line x1="230" y1="82" x2="230" y2="96" stroke={color} strokeWidth="1.4" />
      {cell(20, 96, 100, "IT Procurement", "Responsible (R)")}
      {cell(180, 96, 100, "IT Operations", "Responsible (R)")}
      {/* dashed escalation loop */}
      <path d="M230 108 C280 108 280 60 205 60" fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="4 3" />
      <text x="256" y="86" textAnchor="middle" fontSize="8" fill={color} fontFamily={FONT}>escalation</text>
    </svg>
  );
}

function StageGate({ color }: DProps) {
  const stages = ["Idea", "Business", "Approval", "Execution", "Review"];
  const w = 50;
  const gap = 6;
  const startX = 8;
  return (
    <svg viewBox="0 0 300 150" width="100%" role="img" aria-label="Five-stage gate with a sustainability check inserted at the business case">
      {stages.map((s, i) => {
        const x = startX + i * (w + gap);
        return (
          <g key={s}>
            <rect x={x} y="78" width={w} height="26" rx="5" {...box(color)} />
            <text x={x + w / 2} y="94" textAnchor="middle" fontSize="8.5" fill="#16191D" fontFamily={FONT}>{s}</text>
            {i < stages.length - 1 ? (
              <line x1={x + w} y1="91" x2={x + w + gap} y2="91" stroke={color} strokeWidth="1.2" />
            ) : null}
          </g>
        );
      })}
      {/* gate above Business (index 1) */}
      <g className="anim-scale-in">
        <path d="M64 60 l14 -8 14 8 v10 h-28 z" fill="#FFFFFF" stroke={color} strokeWidth="1.4" />
        <path d="M71 65 l4 4 8 -8" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 -1)" />
      </g>
      <text x="150" y="34" textAnchor="middle" fontSize="9" fill={color} fontWeight={600} fontFamily={FONT}>Sustainability check</text>
      <text x="150" y="46" textAnchor="middle" fontSize="9" fill={color} fontFamily={FONT}>inserted here</text>
    </svg>
  );
}

function SupplierCycle({ color }: DProps) {
  return (
    <svg viewBox="0 0 300 150" width="100%" role="img" aria-label="One-time vetting versus an ongoing supplier cycle">
      {/* left: abrupt one-time */}
      <text x="60" y="22" textAnchor="middle" fontSize="9" fill="#5E6670" fontFamily={FONT}>One-time vetting</text>
      <line x1="20" y1="70" x2="95" y2="70" stroke="#9AA1AA" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M95 70 l-7 -4 M95 70 l-7 4" stroke="#9AA1AA" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <text x="58" y="90" textAnchor="middle" fontSize="8" fill="#9AA1AA" fontFamily={FONT}>insufficient</text>
      {/* divider */}
      <line x1="120" y1="20" x2="120" y2="130" stroke="#E2E5E9" strokeWidth="1" />
      {/* right: cycle */}
      {[
        { x: 205, y: 40, t: "Selection" },
        { x: 250, y: 78, t: "Onboarding" },
        { x: 205, y: 116, t: "Review" },
        { x: 160, y: 78, t: "Re-cert." },
      ].map((n) => (
        <g key={n.t}>
          <circle cx={n.x} cy={n.y} r="15" {...box(color)} />
          <text x={n.x} y={n.y + 3} textAnchor="middle" fontSize="7.5" fill="#16191D" fontFamily={FONT}>{n.t}</text>
        </g>
      ))}
      <circle className="anim-dash-loop" cx="205" cy="78" r="38" fill="none" stroke={color} strokeWidth="1.4" />
      <text x="205" y="16" textAnchor="middle" fontSize="9" fill={color} fontWeight={600} fontFamily={FONT}>Ongoing cycle</text>
    </svg>
  );
}

function Accountability({ color }: DProps) {
  return (
    <svg viewBox="0 0 300 150" width="100%" role="img" aria-label="Diffuse ownership versus one named accountable role">
      {/* left: diffuse overlapping circles */}
      <text x="70" y="22" textAnchor="middle" fontSize="9" fill="#5E6670" fontFamily={FONT}>Diffuse ownership</text>
      {[[55, 70], [80, 62], [72, 90], [95, 82], [60, 100]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="16" fill="none" stroke="#9AA1AA" strokeWidth="1.3" opacity="0.8" />
      ))}
      <line x1="140" y1="20" x2="140" y2="130" stroke="#E2E5E9" strokeWidth="1" />
      {/* right: named accountability */}
      <text x="220" y="22" textAnchor="middle" fontSize="9" fill={color} fontWeight={600} fontFamily={FONT}>Named accountability</text>
      {[[175, 55], [268, 60], [180, 108], [265, 105]].map(([x, y], i) => (
        <g key={i}>
          <line x1="220" y1="82" x2={x} y2={y} stroke={color} strokeWidth="1" opacity="0.6" />
          <circle cx={x} cy={y} r="7" {...box(color)} />
        </g>
      ))}
      <circle cx="220" cy="82" r="18" fill="#FFFFFF" stroke={color} strokeWidth="1.8" />
      <text x="220" y="79" textAnchor="middle" fontSize="7.5" fill={color} fontFamily={FONT}>Head of IT</text>
      <text x="220" y="89" textAnchor="middle" fontSize="7.5" fill={color} fontFamily={FONT}>Sustainability</text>
    </svg>
  );
}

/** Multiple simultaneous commitments packed against one fixed ceiling. */
function PortfolioCeiling({ color }: DProps) {
  const ceilY = 26;
  const items = [
    { y: 40, w: 150, t: "Chosen initiative" },
    { y: 62, w: 90, t: "Governance €25k" },
    { y: 84, w: 72, t: "Audit €20k (optional)" },
  ];
  return (
    <svg viewBox="0 0 300 150" role="img" aria-label="Three commitments packed against one fixed budget ceiling">
      <line x1="30" y1={ceilY} x2="30" y2="112" stroke="#E2E5E9" strokeWidth="1" />
      <line className="anim-draw" x1="30" y1={ceilY} x2="264" y2={ceilY} stroke={color} strokeWidth="2" />
      <text x="264" y={ceilY - 8} textAnchor="end" fontSize="8.5" fontWeight={600} fill={color} fontFamily={FONT}>€120,000 ceiling</text>
      {items.map((it) => (
        <g key={it.t}>
          <rect x="30" y={it.y} width={it.w} height="16" fill="#FFFFFF" stroke={color} strokeWidth="1.4" />
          <text x="36" y={it.y + 11} fontSize="7.5" fill="#16191D" fontFamily={FONT}>{it.t}</text>
        </g>
      ))}
      <text x="150" y="128" textAnchor="middle" fontSize="8" fill="#5E6670" fontFamily={FONT}>total every line before committing the next one</text>
    </svg>
  );
}

/** Impact vs effort — quick wins first, structural work later. */
function ImpactEffort({ color }: DProps) {
  const x0 = 56, y0 = 16, w = 190, h = 100;
  return (
    <svg viewBox="0 0 300 150" role="img" aria-label="Impact versus effort quadrant, sequencing quick wins before structural work">
      <rect x={x0} y={y0} width={w} height={h} fill="none" stroke="#E2E5E9" strokeWidth="1" />
      <line x1={x0 + w / 2} y1={y0} x2={x0 + w / 2} y2={y0 + h} stroke="#E2E5E9" strokeWidth="1" />
      <line x1={x0} y1={y0 + h / 2} x2={x0 + w} y2={y0 + h / 2} stroke="#E2E5E9" strokeWidth="1" />
      <text x={x0 - 6} y={y0 + 10} textAnchor="end" fontSize="7.5" fill="#5E6670" fontFamily={FONT}>High impact</text>
      <text x={x0 - 6} y={y0 + h - 2} textAnchor="end" fontSize="7.5" fill="#5E6670" fontFamily={FONT}>Low impact</text>
      <text x={x0} y={y0 + h + 14} fontSize="7.5" fill="#5E6670" fontFamily={FONT}>Low effort</text>
      <text x={x0 + w} y={y0 + h + 14} textAnchor="end" fontSize="7.5" fill="#5E6670" fontFamily={FONT}>High effort</text>
      <text x={x0 + 8} y={y0 + 22} fontSize="8" fontWeight={600} fill={color} fontFamily={FONT}>1. Quick wins</text>
      <text x={x0 + w / 2 + 8} y={y0 + 22} fontSize="8" fill="#16191D" fontFamily={FONT}>2. Structural</text>
      <circle className="anim-scale-in" cx={x0 + 30} cy={y0 + 34} r="5" fill={color} />
      <text x={x0 + 30} y={y0 + 50} textAnchor="middle" fontSize="6.5" fill="#5E6670" fontFamily={FONT}>Named owner</text>
      <circle cx={x0 + w / 2 + 45} cy={y0 + 40} r="5" fill="#FFFFFF" stroke={color} strokeWidth="1.4" />
      <text x={x0 + w / 2 + 45} y={y0 + 56} textAnchor="middle" fontSize="6.5" fill="#5E6670" fontFamily={FONT}>Re-cert. cycle</text>
    </svg>
  );
}

const REGISTRY: Record<DiagramKey, (p: DProps) => JSX.Element> = {
  timeline: Timeline,
  orgchart: OrgChart,
  stagegate: StageGate,
  suppliercycle: SupplierCycle,
  accountability: Accountability,
  portfolioCeiling: PortfolioCeiling,
  impactEffort: ImpactEffort,
};

export function MaterialDiagram({ name, color }: { name: DiagramKey; color: string }) {
  const C = REGISTRY[name];
  return <C color={color} />;
}
