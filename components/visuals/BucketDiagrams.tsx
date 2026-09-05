/**
 * Compact, single-colour line diagrams — one per Level 1 bucket — used inside
 * the bucket "?" info panel in SortingBoard. Same stroke system as
 * components/icons/LineIcons.tsx (currentColor, 1.6 stroke, round caps/joins)
 * so they inherit the single accent colour rather than introducing a new
 * palette, matching Level 1's "one accent only" rule.
 */
import type { BucketId } from "@/lib/module3";

type P = { className?: string };

const FONT = "Segoe UI, Helvetica Neue, Arial, sans-serif";
const base = {
  viewBox: "0 0 280 120",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Target Picture — baseline now, descending line to a measurable target year. */
function TargetDiagram({ className }: P) {
  return (
    <svg {...base} className={className}>
      <line x1="24" y1="96" x2="256" y2="96" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
      <path d="M32 40 L232 78" strokeDasharray="4 3" />
      <circle cx="32" cy="40" r="4" fill="currentColor" />
      <text x="32" y="26" fontSize="11" fill="currentColor" fontFamily={FONT}>Now: baseline</text>
      <circle cx="232" cy="78" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <text x="232" y="66" textAnchor="end" fontSize="11" fontWeight={600} fill="currentColor" fontFamily={FONT}>2030: −30%</text>
    </svg>
  );
}

/** Governance — one named accountable owner, with a review line back up. */
function GovernanceDiagram({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="105" y="12" width="70" height="26" rx="6" />
      <text x="140" y="29" textAnchor="middle" fontSize="10.5" fill="currentColor" fontFamily={FONT}>Owner</text>
      <line x1="140" y1="38" x2="140" y2="52" />
      <line x1="60" y1="52" x2="220" y2="52" />
      <line x1="60" y1="52" x2="60" y2="64" />
      <line x1="220" y1="52" x2="220" y2="64" />
      <rect x="24" y="64" width="72" height="26" rx="6" strokeOpacity="0.6" />
      <text x="60" y="81" textAnchor="middle" fontSize="9.5" fill="currentColor" fillOpacity="0.75" fontFamily={FONT}>Procurement</text>
      <rect x="184" y="64" width="72" height="26" rx="6" strokeOpacity="0.6" />
      <text x="220" y="81" textAnchor="middle" fontSize="9.5" fill="currentColor" fillOpacity="0.75" fontFamily={FONT}>Operations</text>
      <path d="M220 90 C260 100 260 40 178 25" strokeDasharray="3 4" strokeOpacity="0.6" />
      <text x="250" y="60" fontSize="8.5" fill="currentColor" fillOpacity="0.7" fontFamily={FONT}>escalate</text>
    </svg>
  );
}

/** Investment Logic — a stage-gate with a sustainability checkpoint inserted. */
function InvestmentDiagram({ className }: P) {
  const stages = ["Idea", "Case", "Approve", "Build"];
  const w = 56;
  const gap = 8;
  return (
    <svg {...base} className={className}>
      {stages.map((s, i) => {
        const x = 12 + i * (w + gap);
        return (
          <g key={s}>
            <rect x={x} y="70" width={w} height="26" rx="6" />
            <text x={x + w / 2} y="87" textAnchor="middle" fontSize="9.5" fill="currentColor" fontFamily={FONT}>{s}</text>
            {i < stages.length - 1 ? <line x1={x + w} y1="83" x2={x + w + gap} y2="83" /> : null}
          </g>
        );
      })}
      <path d="M64 40 l12 -8 12 8 v10 h-24 z" />
      <path d="M70 45 l3 3 6 -6" strokeWidth="1.4" />
      <text x="76" y="20" textAnchor="middle" fontSize="9.5" fontWeight={600} fill="currentColor" fontFamily={FONT}>Sustainability check</text>
    </svg>
  );
}

/** Procurement — deciding on one criterion vs. several, before a purchase. */
function ProcurementDiagram({ className }: P) {
  return (
    <svg {...base} className={className}>
      <text x="60" y="16" textAnchor="middle" fontSize="9.5" fill="currentColor" fillOpacity="0.6" fontFamily={FONT}>Price only</text>
      <rect x="24" y="26" width="72" height="20" rx="10" strokeOpacity="0.5" />
      <text x="60" y="40" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.7" fontFamily={FONT}>Price</text>
      <path d="M60 46 L60 62" strokeOpacity="0.5" />
      <circle cx="60" cy="70" r="7" strokeOpacity="0.5" />

      <line x1="150" y1="10" x2="150" y2="110" strokeOpacity="0.2" strokeWidth="1" />

      <text x="215" y="16" textAnchor="middle" fontSize="9.5" fontWeight={600} fill="currentColor" fontFamily={FONT}>Beyond price</text>
      {["Price", "Lifecycle", "Energy", "Origin"].map((t, i) => (
        <g key={t}>
          <rect x={180 + i * 0} y={24 + i * 0} width="70" height="16" rx="8" opacity="0" />
        </g>
      ))}
      <rect x="178" y="24" width="74" height="15" rx="7.5" />
      <text x="215" y="34.5" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily={FONT}>Price</text>
      <rect x="178" y="42" width="74" height="15" rx="7.5" />
      <text x="215" y="52.5" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily={FONT}>Lifecycle</text>
      <rect x="178" y="60" width="74" height="15" rx="7.5" />
      <text x="215" y="70.5" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily={FONT}>Energy · Origin</text>
      <path d="M215 75 L215 88" />
      <circle cx="215" cy="96" r="7" />
    </svg>
  );
}

/** Supplier Control — one-time vetting (dead end) vs. an ongoing cycle. */
function SupplierDiagram({ className }: P) {
  return (
    <svg {...base} className={className}>
      <text x="55" y="18" textAnchor="middle" fontSize="9.5" fill="currentColor" fillOpacity="0.6" fontFamily={FONT}>One-time vetting</text>
      <line x1="16" y1="55" x2="90" y2="55" strokeOpacity="0.5" />
      <path d="M90 55 l-7 -4.5 M90 55 l-7 4.5" strokeOpacity="0.5" />
      <text x="55" y="75" textAnchor="middle" fontSize="8.5" fill="currentColor" fillOpacity="0.6" fontFamily={FONT}>insufficient</text>

      <line x1="120" y1="10" x2="120" y2="110" strokeOpacity="0.2" strokeWidth="1" />

      <text x="200" y="18" textAnchor="middle" fontSize="9.5" fontWeight={600} fill="currentColor" fontFamily={FONT}>Ongoing cycle</text>
      {[
        { x: 200, y: 40, t: "Select" },
        { x: 236, y: 65, t: "Onboard" },
        { x: 200, y: 90, t: "Review" },
        { x: 164, y: 65, t: "Re-cert." },
      ].map((n) => (
        <g key={n.t}>
          <circle cx={n.x} cy={n.y} r="14" />
          <text x={n.x} y={n.y + 3} textAnchor="middle" fontSize="7.5" fill="currentColor" fontFamily={FONT}>{n.t}</text>
        </g>
      ))}
      <circle cx="200" cy="65" r="34" strokeDasharray="4 4" strokeOpacity="0.7" />
    </svg>
  );
}

const REGISTRY: Record<BucketId, (p: P) => JSX.Element> = {
  target: TargetDiagram,
  governance: GovernanceDiagram,
  investment: InvestmentDiagram,
  procurement: ProcurementDiagram,
  supplier: SupplierDiagram,
};

export function BucketDiagram({ id, className }: { id: BucketId; className?: string }) {
  const C = REGISTRY[id];
  return <C className={className} />;
}
