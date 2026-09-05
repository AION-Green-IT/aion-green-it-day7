import type { MaterialDiagramKey } from "@/lib/module3";

/**
 * One diagram per Study Material card (components/level1/MaterialCards.tsx).
 * Same stroke system as the rest of the app (currentColor, 1.6 stroke, round
 * caps/joins) so every diagram inherits Level 1's single accent colour. Each
 * uses the shared `.anim-draw` / `.anim-scale-in` / `.anim-dash-loop`
 * keyframes (globals.css) so the diagram visibly draws itself in when its
 * card opens, rather than sitting static.
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
const label = (extra?: Record<string, unknown>) => ({
  fontFamily: FONT,
  fill: "currentColor",
  ...extra,
});

// --- A1 — the four anchors --------------------------------------------------
function FourAnchors({ className }: P) {
  const spokes = [
    { x: 150, y: 28, short: "Vision" },
    { x: 254, y: 84, short: "Architect." },
    { x: 195, y: 142, short: "Invest. logic" },
    { x: 46, y: 84, short: "Governance" },
  ];
  return (
    <svg {...base} className={className}>
      {spokes.map((s, i) => (
        <line key={i} x1="150" y1="84" x2={s.x} y2={s.y} strokeOpacity="0.55" />
      ))}
      <circle className="anim-scale-in" cx="150" cy="84" r="24" {...box} />
      <text x="150" y="80" textAnchor="middle" fontSize="8" {...label({ fontWeight: 600 })}>Sustainable</text>
      <text x="150" y="91" textAnchor="middle" fontSize="8" {...label({ fontWeight: 600 })}>IT strategy</text>
      {spokes.map((s, i) => (
        <g key={i}>
          <rect x={s.x - 33} y={s.y - 11} width="66" height="22" rx="6" {...box} />
          <text x={s.x} y={s.y + 3} textAnchor="middle" fontSize="7.5" {...label()}>{s.short}</text>
        </g>
      ))}
    </svg>
  );
}

// --- A2 — single action vs strategic embedding ------------------------------
function SingleVsEmbedded({ className }: P) {
  const years = [0, 1, 2, 3];
  return (
    <svg {...base} className={className}>
      <text x="65" y="18" textAnchor="middle" fontSize="9.5" {...label({ fillOpacity: 0.6 })}>Single action</text>
      <line x1="20" y1="130" x2="120" y2="130" strokeOpacity="0.3" />
      <rect x="55" y="60" width="20" height="70" rx="2" strokeOpacity="0.6" />
      <text x="65" y="52" textAnchor="middle" fontSize="8" {...label({ fillOpacity: 0.6 })}>Year 1</text>
      {[1, 2, 3].map((i) => (
        <rect key={i} x={55 + i * 24} y="125" width="20" height="5" rx="2" strokeOpacity="0.25" />
      ))}
      <text x="65" y="146" textAnchor="middle" fontSize="7.5" {...label({ fillOpacity: 0.5 })}>fades out</text>

      <line x1="150" y1="12" x2="150" y2="146" strokeOpacity="0.2" strokeWidth="1" />

      <text x="222" y="18" textAnchor="middle" fontSize="9.5" fontWeight={600} {...label()}>Strategic embedding</text>
      <line x1="180" y1="130" x2="280" y2="130" strokeOpacity="0.3" />
      {years.map((i) => (
        <rect key={i} x={185 + i * 24} y={100 - i * 8} width="20" height={30 + i * 8} rx="2" {...box} />
      ))}
      <path className="anim-draw" d="M195 95 205 87 219 79 245 71" strokeDasharray="3 3" />
      <text x="230" y="146" textAnchor="middle" fontSize="7.5" {...label({ fillOpacity: 0.7 })}>compounds every cycle</text>
    </svg>
  );
}

// --- A3 — three circles (corporate / sustainability / IT strategy) --------
function ThreeCircles({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="115" cy="70" r="48" strokeOpacity="0.7" />
      <circle cx="185" cy="70" r="48" strokeOpacity="0.7" />
      <circle cx="150" cy="118" r="48" strokeOpacity="0.7" />
      <text x="90" y="45" fontSize="9" {...label()}>Corporate</text>
      <text x="90" y="56" fontSize="9" {...label()}>strategy</text>
      <text x="182" y="45" textAnchor="end" fontSize="9" {...label()}>Sustainability</text>
      <text x="182" y="56" textAnchor="end" fontSize="9" {...label()}>goals</text>
      <text x="150" y="146" textAnchor="middle" fontSize="9" {...label()}>IT strategy</text>
      <circle className="anim-scale-in" cx="150" cy="86" r="5" fill="currentColor" stroke="none" />
      <text x="150" y="100" textAnchor="middle" fontSize="7.5" fontWeight={600} {...label()}>shared metric</text>
    </svg>
  );
}

// --- A4 — seven fields of action --------------------------------------------
function SevenFields({ className }: P) {
  const fields = ["Infra", "Procure", "Lifecycle", "Ops", "Software", "Govern.", "Metrics"];
  const cx = 150, cy = 84, r = 56;
  return (
    <svg {...base} className={className}>
      {fields.map((f, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / fields.length;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        return <line key={f} x1={cx} y1={cy} x2={x} y2={y} strokeOpacity="0.4" />;
      })}
      <circle className="anim-scale-in" cx={cx} cy={cy} r="20" {...box} />
      <text x={cx} y={cy + 3} textAnchor="middle" fontSize="7.5" fontWeight={600} {...label()}>7 fields</text>
      {fields.map((f, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / fields.length;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        return (
          <g key={f + "n"}>
            <circle cx={x} cy={y} r="17" {...box} />
            <text x={x} y={y + 2.5} textAnchor="middle" fontSize="6.3" {...label()}>{f}</text>
          </g>
        );
      })}
    </svg>
  );
}

// --- A5 — three lenses: risk, cost, competitiveness -------------------------
function ThreeLens({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="105" cy="75" r="46" strokeOpacity="0.7" />
      <circle cx="195" cy="75" r="46" strokeOpacity="0.7" />
      <circle cx="150" cy="118" r="46" strokeOpacity="0.7" />
      <text x="80" y="52" fontSize="9.5" fontWeight={600} {...label()}>Risk</text>
      <text x="220" y="52" textAnchor="end" fontSize="9.5" fontWeight={600} {...label()}>Cost</text>
      <text x="150" y="144" textAnchor="middle" fontSize="9.5" fontWeight={600} {...label()}>Competitiveness</text>
      <circle className="anim-scale-in" cx="150" cy="88" r="4.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// --- B1 — procurement cycle, Specify highlighted ----------------------------
function ProcurementCycle({ className }: P) {
  const stages = ["Plan", "Specify", "Tender", "Select", "Contract", "Manage"];
  const cx = 150, cy = 82, r = 52;
  return (
    <svg {...base} className={className}>
      <circle className="anim-dash-loop" cx={cx} cy={cy} r={r} strokeOpacity="0.4" />
      {stages.map((s, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / stages.length;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        const active = s === "Specify";
        return (
          <g key={s}>
            <rect x={x - 24} y={y - 12} width="48" height="22" rx="6" fill={active ? "currentColor" : "#FFFFFF"} stroke="currentColor" strokeWidth="1.6" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="8" fontFamily={FONT} fill={active ? "#FFFFFF" : "currentColor"} fontWeight={active ? 700 : 400}>{s}</text>
          </g>
        );
      })}
      <text x={cx} y={cy - 2} textAnchor="middle" fontSize="8" {...label({ fillOpacity: 0.7 })}>criteria fixed</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="8" {...label({ fillOpacity: 0.7 })}>at "Specify"</text>
    </svg>
  );
}

// --- B2 — criteria radar (illustrative, static) -----------------------------
function CriteriaRadar({ className }: P) {
  const axes = ["Price", "Lifecycle", "Repair.", "Energy", "Origin"];
  const values = [3, 4.5, 4, 4.5, 3.5];
  const cx = 150, cy = 84, R = 52;
  const angleFor = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;
  const pt = (i: number, r: number): [number, number] => {
    const a = angleFor(i);
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const shape = values.map((v, i) => pt(i, (v / 5) * R).join(",")).join(" ");
  return (
    <svg {...base} className={className}>
      {[0.33, 0.66, 1].map((f, i) => (
        <polygon key={i} points={axes.map((_, k) => pt(k, R * f).join(",")).join(" ")} strokeOpacity="0.25" />
      ))}
      {axes.map((_, i) => {
        const [x, y] = pt(i, R);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} strokeOpacity="0.25" />;
      })}
      <polygon className="anim-scale-in" points={shape} fillOpacity="0.14" fill="currentColor" strokeWidth="1.8" />
      {axes.map((a, i) => {
        const [x, y] = pt(i, R + 16);
        const c = Math.cos(angleFor(i));
        const anchor = c > 0.3 ? "start" : c < -0.3 ? "end" : "middle";
        return <text key={a} x={x} y={y} textAnchor={anchor} fontSize="8" {...label()}>{a}</text>;
      })}
    </svg>
  );
}

// --- B3 — supplier gate (funnel) --------------------------------------------
function SupplierGate({ className }: P) {
  const before = [30, 46, 62, 78, 94, 110];
  return (
    <svg {...base} className={className}>
      {before.map((y, i) => (
        <circle key={i} cx="34" cy={y} r="5" strokeOpacity="0.5" />
      ))}
      <text x="34" y="20" textAnchor="middle" fontSize="8" {...label({ fillOpacity: 0.6 })}>Candidates</text>

      <path className="anim-draw" d="M64 24 L150 60 L150 100 L64 116 Z" strokeOpacity="0.7" />
      <text x="107" y="66" textAnchor="middle" fontSize="7.5" {...label({ fillOpacity: 0.8 })}>ISO 14001</text>
      <text x="107" y="77" textAnchor="middle" fontSize="7.5" {...label({ fillOpacity: 0.8 })}>RBA code</text>
      <text x="107" y="88" textAnchor="middle" fontSize="7.5" {...label({ fillOpacity: 0.8 })}>Scope 1&2</text>

      <circle cx="230" cy="70" r="6" {...box} />
      <circle cx="230" cy="94" r="6" {...box} />
      <line x1="150" y1="80" x2="215" y2="72" strokeOpacity="0.6" />
      <line x1="150" y1="80" x2="215" y2="92" strokeOpacity="0.6" />
      <text x="230" y="118" textAnchor="middle" fontSize="8" fontWeight={600} {...label()}>Eligible to bid</text>
    </svg>
  );
}

// --- B4 — tender weighting ---------------------------------------------------
function TenderWeighting({ className }: P) {
  const W = 220, H = 30, x0 = 40, y0 = 42;
  const parts = [
    { w: 0.5, pct: "50%", name: "Price" },
    { w: 0.3, pct: "30%", name: "Technical" },
    { w: 0.2, pct: "20%", name: "Sustainability" },
  ];
  let acc = 0;
  return (
    <svg {...base} className={className}>
      {parts.map((p) => {
        const x = x0 + acc * W;
        const w = p.w * W;
        acc += p.w;
        const isSustain = p.name === "Sustainability";
        return (
          <g key={p.name}>
            <rect x={x} y={y0} width={w} height={H} fill={isSustain ? "currentColor" : "#FFFFFF"} stroke="currentColor" strokeWidth="1.4" />
            <text x={x + w / 2} y={y0 + H / 2 + 3.5} textAnchor="middle" fontSize="10" fontWeight={600} fontFamily={FONT} fill={isSustain ? "#FFFFFF" : "currentColor"}>{p.pct}</text>
          </g>
        );
      })}
      {/* legend below — full names get their own room, never clipped by bar width */}
      <g>
        {parts.map((p, i) => {
          const isSustain = p.name === "Sustainability";
          const lx = 46 + i * 90;
          return (
            <g key={p.name + "-legend"}>
              <rect x={lx} y="82" width="9" height="9" rx="2" fill={isSustain ? "currentColor" : "#FFFFFF"} stroke="currentColor" strokeWidth="1.2" />
              <text x={lx + 13} y="90" fontSize="8" {...label()}>{p.name}</text>
            </g>
          );
        })}
      </g>
      <rect className="anim-scale-in" x="55" y="108" width="190" height="34" rx="6" strokeOpacity="0.7" strokeDasharray="3 3" />
      <text x="150" y="124" textAnchor="middle" fontSize="8.5" fontWeight={600} {...label()}>Minimum standard</text>
      <text x="150" y="136" textAnchor="middle" fontSize="8" {...label({ fillOpacity: 0.75 })}>pass / fail, sits outside the score</text>
    </svg>
  );
}

// --- B5 — tension pentagon ---------------------------------------------------
function TensionPentagon({ className }: P) {
  const labels = ["Cost", "Availability", "Standardis.", "Ambition", "Time"];
  const cx = 150, cy = 82, r = 50;
  const pts = labels.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / labels.length;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as [number, number];
  });
  return (
    <svg {...base} className={className}>
      <polygon className="anim-draw" points={pts.map((p) => p.join(",")).join(" ")} strokeOpacity="0.7" />
      {pts.map((p, i) =>
        pts.slice(i + 1).map((q, j) => (
          <line key={`${i}-${j}`} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} strokeOpacity="0.15" />
        )),
      )}
      {labels.map((l, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / labels.length;
        const x = cx + Math.cos(a) * (r + 20);
        const y = cy + Math.sin(a) * (r + 20);
        const anchor = Math.cos(a) > 0.3 ? "start" : Math.cos(a) < -0.3 ? "end" : "middle";
        return <text key={l} x={x} y={y} textAnchor={anchor} fontSize="8.5" {...label()}>{l}</text>;
      })}
    </svg>
  );
}

// --- B6 — recurring lever (policy) vs one-off (project) ---------------------
function RecurringLever({ className }: P) {
  return (
    <svg {...base} className={className}>
      <text x="65" y="18" textAnchor="middle" fontSize="9.5" {...label({ fillOpacity: 0.6 })}>One-off project</text>
      <circle cx="65" cy="70" r="18" strokeOpacity="0.5" />
      <path d="M58 70l5 5 10-10" strokeOpacity="0.6" />
      <line x1="65" y1="88" x2="65" y2="115" strokeOpacity="0.4" strokeDasharray="3 3" />
      <text x="65" y="130" textAnchor="middle" fontSize="7.5" {...label({ fillOpacity: 0.55 })}>done once, then over</text>

      <line x1="140" y1="10" x2="140" y2="146" strokeOpacity="0.2" strokeWidth="1" />

      <text x="220" y="18" textAnchor="middle" fontSize="9.5" fontWeight={600} {...label()}>Procurement policy</text>
      <circle className="anim-dash-loop" cx="220" cy="72" r="34" strokeOpacity="0.7" />
      <path d="M220 44 l6 -8 M220 44 l-6 -8" strokeOpacity="0.7" />
      <text x="220" y="76" textAnchor="middle" fontSize="8" fontWeight={600} {...label()}>applies to</text>
      <text x="220" y="88" textAnchor="middle" fontSize="8" fontWeight={600} {...label()}>every future buy</text>
    </svg>
  );
}

const REGISTRY: Record<MaterialDiagramKey, (p: P) => JSX.Element> = {
  fourAnchors: FourAnchors,
  singleVsEmbedded: SingleVsEmbedded,
  threeCircles: ThreeCircles,
  sevenFields: SevenFields,
  threeLens: ThreeLens,
  procurementCycle: ProcurementCycle,
  criteriaRadar: CriteriaRadar,
  supplierGate: SupplierGate,
  tenderWeighting: TenderWeighting,
  tensionPentagon: TensionPentagon,
  recurringLever: RecurringLever,
};

export function StudyDiagram({ name, className }: { name: MaterialDiagramKey; className?: string }) {
  const C = REGISTRY[name];
  return <C className={className} />;
}
