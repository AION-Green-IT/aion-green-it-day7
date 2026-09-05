import type { Level2DiagramKey } from "@/lib/level2";

/**
 * One diagram per Level 2 study-material card. Same stroke system as the
 * rest of the app (currentColor, 1.6 stroke, round caps/joins) and the same
 * mount-animation classes (.anim-draw / .anim-scale-in / .anim-dash-loop)
 * used in components/level1/StudyDiagrams.tsx and level3/MaterialDiagrams.tsx.
 */

type P = { className?: string };

const FONT = "Segoe UI, Helvetica Neue, Arial, sans-serif";
const base = {
  viewBox: "0 0 300 160",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};
const box = { fill: "#FFFFFF" as const, stroke: "currentColor", strokeWidth: 1.6 };
const lbl = (extra?: Record<string, unknown>) => ({ fontFamily: FONT, fill: "currentColor", ...extra });

// --- Readiness × Importance 2x2 ---------------------------------------------
function ReadinessMatrix({ className }: P) {
  const x0 = 60, y0 = 20, w = 190, h = 110;
  return (
    <svg {...base} className={className}>
      <rect x={x0} y={y0} width={w} height={h} strokeOpacity="0.5" />
      <line x1={x0 + w / 2} y1={y0} x2={x0 + w / 2} y2={y0 + h} strokeOpacity="0.5" />
      <line x1={x0} y1={y0 + h / 2} x2={x0 + w} y2={y0 + h / 2} strokeOpacity="0.5" />

      <text x={x0 - 6} y={y0 + 12} textAnchor="end" fontSize="7.5" {...lbl({ fillOpacity: 0.7 })}>Important</text>
      <text x={x0 - 6} y={y0 + h - 4} textAnchor="end" fontSize="7.5" {...lbl({ fillOpacity: 0.7 })}>Less important</text>
      <text x={x0} y={y0 + h + 14} fontSize="7.5" {...lbl({ fillOpacity: 0.7 })}>Not ready</text>
      <text x={x0 + w} y={y0 + h + 14} textAnchor="end" fontSize="7.5" {...lbl({ fillOpacity: 0.7 })}>Ready</text>

      <text x={x0 + 8} y={y0 + h / 2 - 8} fontSize="8" fontWeight={600} {...lbl()}>Build capability</text>
      <text x={x0 + w / 2 + 8} y={y0 + h / 2 - 8} fontSize="8" fontWeight={600} {...lbl()}>Act now</text>
      <text x={x0 + 8} y={y0 + h - 10} fontSize="8" {...lbl({ fillOpacity: 0.6 })}>Park it</text>
      <text x={x0 + w / 2 + 8} y={y0 + h - 10} fontSize="8" {...lbl({ fillOpacity: 0.6 })}>Quick win</text>

      <circle className="anim-scale-in" cx={x0 + 42} cy={y0 + 30} r="5" fill="currentColor" />
      <text x={x0 + 42} y={y0 + 14} textAnchor="middle" fontSize="7" {...lbl()}>Supplier screening</text>
      <circle className="anim-scale-in" cx={x0 + w - 30} cy={y0 + h - 30} r="5" fill="currentColor" />
      <text x={x0 + w - 30} y={y0 + h - 40} textAnchor="middle" fontSize="7" {...lbl()}>Publish target</text>
    </svg>
  );
}

// --- Marginal Abatement Cost Curve -------------------------------------------
function MACC({ className }: P) {
  const bars = [18, 24, 34, 48, 66, 88];
  const x0 = 40, base_y = 128, bw = 34, gap = 4;
  return (
    <svg {...base} className={className}>
      <line x1={x0 - 8} y1={base_y} x2={270} y2={base_y} strokeOpacity="0.4" />
      <line x1={x0 - 8} y1="16" x2={x0 - 8} y2={base_y} strokeOpacity="0.4" />
      <text x="10" y="22" fontSize="7.5" {...lbl({ fillOpacity: 0.7 })}>€ / t</text>
      <text x="150" y="146" textAnchor="middle" fontSize="7.5" {...lbl({ fillOpacity: 0.7 })}>units replaced, cumulative →</text>
      {bars.map((h, i) => {
        const x = x0 + i * (bw + gap);
        const fadeIn = i > 2;
        return (
          <rect
            key={i}
            className={i === bars.length - 1 ? "anim-scale-in" : undefined}
            x={x}
            y={base_y - h}
            width={bw}
            height={h}
            fill={fadeIn ? "#FFFFFF" : "currentColor"}
            fillOpacity={fadeIn ? 1 : 0.85}
            stroke="currentColor"
            strokeWidth="1.4"
          />
        );
      })}
      <text x={x0 + bw / 2} y={base_y - bars[0] - 6} textAnchor="middle" fontSize="7" {...lbl({ fillOpacity: 0.75 })}>cheap</text>
      <text x={x0 + 5 * (bw + gap) + bw / 2} y={base_y - bars[5] - 6} textAnchor="middle" fontSize="7" fontWeight={600} {...lbl()}>expensive</text>
    </svg>
  );
}

// --- Compounding (policy) vs one-time (purchase) ----------------------------
function CompoundingCurve({ className }: P) {
  return (
    <svg {...base} className={className}>
      <line x1="36" y1="130" x2="270" y2="130" strokeOpacity="0.4" />
      <line x1="36" y1="20" x2="36" y2="130" strokeOpacity="0.4" />
      <text x="150" y="146" textAnchor="middle" fontSize="7.5" {...lbl({ fillOpacity: 0.7 })}>time (contract cycles) →</text>

      {/* one-time: rises once then flat */}
      <path className="anim-draw" d="M36 128 L70 60 L270 60" strokeDasharray="4 4" strokeOpacity="0.7" />
      <text x="80" y="52" fontSize="8" {...lbl({ fillOpacity: 0.75 })}>One-time purchase</text>

      {/* compounding: climbs steadily, crosses the one-time line */}
      <path className="anim-draw" d="M36 128 L110 108 L160 78 L210 44 L255 24" />
      <text x="200" y="34" textAnchor="end" fontSize="8" fontWeight={600} {...lbl()}>Procurement policy</text>

      <circle cx="185" cy="62" r="3.5" fill="currentColor" />
      <text x="190" y="72" fontSize="7" {...lbl({ fillOpacity: 0.75 })}>crossover</text>
    </svg>
  );
}

// --- TCO vs sticker price ----------------------------------------------------
function TcoVsPrice({ className }: P) {
  const segs = [
    { h: 40, t: "Purchase" },
    { h: 26, t: "Energy" },
    { h: 20, t: "Maint." },
    { h: 14, t: "Disposal" },
  ];
  const base_y = 128;
  let acc = 0;
  return (
    <svg {...base} className={className}>
      <line x1="30" y1={base_y} x2="270" y2={base_y} strokeOpacity="0.4" />
      <rect x="60" y={base_y - 40} width="52" height="40" {...box} />
      <text x="86" y={base_y - 18} textAnchor="middle" fontSize="8" {...lbl()}>Price</text>
      <text x="86" y="20" textAnchor="middle" fontSize="8" {...lbl({ fillOpacity: 0.7 })}>Sticker</text>

      {segs.map((s, i) => {
        const y = base_y - acc - s.h;
        acc += s.h;
        return (
          <g key={s.t}>
            <rect x="170" y={y} width="60" height={s.h} fill={i === 0 ? "currentColor" : "#FFFFFF"} fillOpacity={i === 0 ? 0.85 : 1} stroke="currentColor" strokeWidth="1.4" />
            <text x="200" y={y + s.h / 2 + 3} textAnchor="middle" fontSize="7" fontFamily={FONT} fill={i === 0 ? "#FFFFFF" : "currentColor"}>{s.t}</text>
          </g>
        );
      })}
      <text x="200" y="20" textAnchor="middle" fontSize="8" fontWeight={600} {...lbl()}>Total cost of ownership</text>
    </svg>
  );
}

// --- Governance anchor: with/without an owner --------------------------------
function GovernanceAnchor({ className }: P) {
  return (
    <svg {...base} className={className}>
      <text x="70" y="18" textAnchor="middle" fontSize="9" {...lbl({ fillOpacity: 0.6 })}>No owner</text>
      <rect x="35" y="30" width="70" height="24" rx="6" strokeOpacity="0.6" />
      <text x="70" y="46" textAnchor="middle" fontSize="7.5" {...lbl({ fillOpacity: 0.75 })}>Strategy</text>
      <path d="M70 54 L70 90" strokeDasharray="3 4" strokeOpacity="0.4" />
      <rect x="35" y="94" width="70" height="24" rx="6" strokeOpacity="0.35" strokeDasharray="3 3" />
      <text x="70" y="110" textAnchor="middle" fontSize="7.5" {...lbl({ fillOpacity: 0.45 })}>B / C drift</text>

      <line x1="140" y1="10" x2="140" y2="146" strokeOpacity="0.2" strokeWidth="1" />

      <text x="220" y="18" textAnchor="middle" fontSize="9" fontWeight={600} {...lbl()}>Named owner</text>
      <rect x="185" y="30" width="70" height="24" rx="6" {...box} />
      <text x="220" y="46" textAnchor="middle" fontSize="7.5" {...lbl()}>Strategy</text>
      <path className="anim-draw" d="M220 54 L220 90" />
      <circle className="anim-scale-in" cx="220" cy="66" r="6" {...box} />
      <rect x="185" y="94" width="70" height="24" rx="6" {...box} />
      <text x="220" y="110" textAnchor="middle" fontSize="7.5" fontWeight={600} {...lbl()}>B / C held</text>
    </svg>
  );
}

// --- Capital ceiling: candidates vs a fixed pool -----------------------------
function CapitalCeiling({ className }: P) {
  const ceilY = 30;
  const items = [
    { y: 46, w: 210, t: "A · €35,000–55,000" },
    { y: 72, w: 90, t: "B · €15,000" },
    { y: 98, w: 260, t: "C · up to €400,000" },
  ];
  return (
    <svg {...base} className={className}>
      <line x1="30" y1={ceilY} x2="30" y2="130" strokeOpacity="0.4" />
      <line className="anim-draw" x1="30" y1={ceilY} x2="270" y2={ceilY} strokeWidth="2" />
      <text x="270" y={ceilY - 8} textAnchor="end" fontSize="8" fontWeight={600} {...lbl()}>€120,000 ceiling</text>

      {items.map((it) => {
        const over = it.w > 240;
        const w = Math.min(it.w, 240);
        return (
          <g key={it.t}>
            <rect x="30" y={it.y} width={w} height="16" fill={over ? "currentColor" : "#FFFFFF"} fillOpacity={over ? 0.85 : 1} stroke="currentColor" strokeWidth="1.4" />
            {over ? <path d="M266 105 l8 3 -8 3" fill="none" stroke="currentColor" strokeWidth="1.4" /> : null}
            <text x="34" y={it.y + 11} fontSize="7.5" fontFamily={FONT} fill={over ? "#FFFFFF" : "currentColor"}>{it.t}</text>
          </g>
        );
      })}
      <text x="150" y="146" textAnchor="middle" fontSize="7.5" {...lbl({ fillOpacity: 0.7 })}>no single combination of all three fits</text>
    </svg>
  );
}

const REGISTRY: Record<Level2DiagramKey, (p: P) => JSX.Element> = {
  readinessMatrix: ReadinessMatrix,
  macc: MACC,
  compoundingCurve: CompoundingCurve,
  tcoVsPrice: TcoVsPrice,
  governanceAnchor: GovernanceAnchor,
  capitalCeiling: CapitalCeiling,
};

export function StudyDiagram2({ name, className }: { name: Level2DiagramKey; className?: string }) {
  const C = REGISTRY[name];
  return <C className={className} />;
}
