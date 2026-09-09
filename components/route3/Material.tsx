import { MATERIAL, PERSPECTIVES, LEVERS3, HORIZON_OPTIONS, LOGIC_PRINCIPLES, TENSION_DIMENSIONS } from "@/lib/route3";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaterialBlock } from "@/components/ui/MaterialBlock";
import { FeedbackLoopSvg } from "./FeedbackLoopSvg";

const [architecture, assurance, disclosure, enefg, perspectives, commitment] = MATERIAL;

const INK = "#16191D";
const ASH = "#5E6670";
const ACCENT = "#0E7A5A";
const LINE = "#E2E5E9";
const PAPER = "#FFFFFF";

export function Material() {
  return (
    <div className="space-y-14">
      <SectionHeading
        kicker="Material"
        title="Six ideas before the board-level builder"
        intro="From seeing separate initiatives to owning one integrated decision architecture. About 60 minutes — the last two blocks are the working vocabulary Task 3 asks you to apply."
      />

      <MaterialBlock block={architecture}>
        <FeedbackLoopSvg />
      </MaterialBlock>

      <MaterialBlock block={assurance}>
        <MetricsFamilyTree />
      </MaterialBlock>

      <MaterialBlock block={disclosure}>
        <CsrdTimeline />
      </MaterialBlock>

      <MaterialBlock block={enefg}>
        <EnefgChecklist />
      </MaterialBlock>

      <MaterialBlock block={perspectives}>
        <PerspectiveLeverGuide />
      </MaterialBlock>

      <MaterialBlock block={commitment}>
        <CommitmentGuide />
      </MaterialBlock>
    </div>
  );
}

function PerspectiveLeverGuide() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-caption font-semibold text-ink">The six perspectives (Phase 1 scan)</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {PERSPECTIVES.map((p) => (
            <div key={p.id} className="rounded-xl border border-line p-3">
              <p className="text-caption font-semibold text-accent">{p.label}</p>
              <p className="mt-0.5 text-micro text-ash">{p.domain}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-line pt-4">
        <p className="text-caption font-semibold text-ink">The lever set (Phase 1 selection, Phase 2 block 5)</p>
        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {LEVERS3.map((l) => (
            <li key={l.id} className="flex gap-2 text-micro text-ink">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{l.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CommitmentGuide() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-caption font-semibold text-ink">The three horizons (Phase 1 tagging)</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {HORIZON_OPTIONS.map((h) => (
            <div key={h.id} className="rounded-xl border border-line p-3">
              <p className="text-caption font-semibold text-accent">{h.label}</p>
              <p className="mt-0.5 text-micro text-ash">{h.domain}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-line pt-4">
        <p className="text-caption font-semibold text-ink">The four sequencing principles (Phase 2 block 3)</p>
        <ul className="mt-2 space-y-1.5">
          {LOGIC_PRINCIPLES.map((p) => (
            <li key={p.id} className="flex gap-2 text-micro text-ink">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>
                <span className="font-semibold">{p.label}</span> — {p.domain}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-line pt-4">
        <p className="text-caption font-semibold text-ink">The five tension dimensions (Phase 2 block 4)</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {TENSION_DIMENSIONS.map((d) => (
            <span key={d.id} className="rounded-full border border-accent/30 bg-accentSoft px-2.5 py-1 text-micro font-semibold text-accent">
              {d.label}
            </span>
          ))}
        </div>
        <p className="mt-2 text-micro italic text-ash">
          A trade-off pair is two of these pulling against each other in this specific case — carried over from Route 2 deliberately.
        </p>
      </div>
    </div>
  );
}

function MetricsFamilyTree() {
  const siblings = [
    { code: "CUE", std: "30134-8", tag: "Carbon emissions per unit of IT energy" },
    { code: "WUE", std: "30134-9", tag: "Water consumption per unit of IT energy" },
    { code: "REF", std: "30134-3", tag: "Proportion of renewable energy used" },
  ];
  return (
    <div>
      <svg viewBox="0 0 640 220" className="w-full" role="img" aria-label="PUE is one of a family of ISO/IEC 30134 data centre KPIs, alongside CUE, WUE, and REF">
        <rect x={255} y={20} width={130} height={54} rx={8} fill={ACCENT} />
        <text x={320} y={44} textAnchor="middle" fontSize="12" fontWeight={700} fill={PAPER}>PUE</text>
        <text x={320} y={60} textAnchor="middle" fontSize="9" fill={PAPER}>ISO/IEC 30134-2</text>

        {siblings.map((s, i) => {
          const x = 60 + i * 210;
          return (
            <g key={s.code}>
              <path d={`M 320 74 Q 320 110 ${x + 65} 110 L ${x + 65} 130`} fill="none" stroke={ASH} strokeWidth={1.4} />
              <rect x={x} y={130} width={130} height={70} rx={8} fill={PAPER} stroke={INK} strokeWidth={1.6} />
              <text x={x + 65} y={152} textAnchor="middle" fontSize="11" fontWeight={700} fill={INK}>{s.code}</text>
              <text x={x + 65} y={166} textAnchor="middle" fontSize="8.5" fill={ASH}>ISO/IEC {s.std}</text>
              <foreignObject x={x + 4} y={170} width={122} height={28}>
                <p style={{ fontSize: 8, lineHeight: "10px", color: ASH, textAlign: "center" }}>{s.tag}</p>
              </foreignObject>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-micro text-ash">
        PUE is the best-known member of this family, not the only one — CUE, WUE, and REF each measure something PUE
        cannot.
      </p>
    </div>
  );
}

function CsrdTimeline() {
  const stops = [
    { year: "2023", label: "CSRD adopted" },
    { year: "2023", label: "ESRS E1 delegated regulation" },
    { year: "2025", label: "Stop-the-Clock postponement" },
    { year: "2026", label: "Omnibus I scope narrowing" },
    { year: "2027", label: "Narrowed mandatory scope takes effect", callout: true },
  ];
  return (
    <div>
      <svg viewBox="0 0 640 190" className="w-full" role="img" aria-label="CSRD timeline from 2023 adoption to 2027 narrowed mandatory scope">
        <line x1={40} y1={70} x2={600} y2={70} stroke={LINE} strokeWidth={2} />
        {stops.map((s, i) => {
          const x = 40 + i * 140;
          return (
            <g key={i}>
              <circle cx={x} cy={70} r={7} fill={s.callout ? ACCENT : PAPER} stroke={s.callout ? ACCENT : INK} strokeWidth={1.8} />
              <text x={x} y={54} textAnchor="middle" fontSize="10" fontWeight={700} fill={INK}>{s.year}</text>
              <foreignObject x={x - 62} y={84} width={124} height={44}>
                <p style={{ fontSize: 9, lineHeight: "12px", color: ASH, textAlign: "center" }}>{s.label}</p>
              </foreignObject>
              {s.callout && (
                <foreignObject x={x - 70} y={132} width={200} height={54} style={{ overflow: "visible" }}>
                  <div style={{ background: "#E7F2EC", border: `1px solid ${ACCENT}`, borderRadius: 8, padding: "6px 8px", fontSize: 8.5, lineHeight: "11px", color: INK }}>
                    Assurance-grade data centre sustainability reporting becomes reality for large operators.
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function EnefgChecklist() {
  const rows = [
    { obligation: "PUE threshold", requires: "Efficiency / PUE" },
    { obligation: "Waste-heat reuse quota (10% → 20%, 2026–2028)", requires: "Energy Source + Governance Review" },
    { obligation: "ISO 50001 / EMAS implementation (by 1 July 2025)", requires: "Governance Review" },
    { obligation: "Continuous measurement (not annual estimates)", requires: "Load & Transparency" },
  ];
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div key={r.obligation} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line p-3">
          <span className="text-caption font-semibold text-ink">{r.obligation}</span>
          <span className="text-micro text-ash">requires → {r.requires}</span>
        </div>
      ))}
      <p className="mt-2 text-micro text-ash">
        Every obligation depends on more than one loop element from Block 1 — proving the loop isn't academic.
      </p>
    </div>
  );
}
