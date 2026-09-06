import { MATERIAL } from "@/lib/route2";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaterialBlock } from "@/components/ui/MaterialBlock";
import { RadarChart } from "@/components/ui/RadarChart";
import { GovernanceFlowDiagram } from "@/components/ui/GovernanceFlowDiagram";
import { CriteriaWheel } from "./CriteriaWheel";

const [forces, criteria, financing, governance] = MATERIAL;

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
        title="Four ideas before the prioritisation simulator"
        intro="From seeing the trade-off to scoring it consistently. About 60 minutes."
      />

      <MaterialBlock block={forces}>
        <div>
          <RadarChart
            axes={[
              { id: "sustainability", label: "Sustainability" },
              { id: "cost", label: "Cost" },
              { id: "supply", label: "Security of Supply" },
              { id: "availability", label: "Availability" },
            ]}
            series={[]}
          />
          <p className="mt-2 text-micro text-ash">
            An empty shell on purpose — no option wins on all four axes at once. You'll fill in a version of this
            same chart (extended to all seven criteria) in Task 2.
          </p>
        </div>
      </MaterialBlock>

      <MaterialBlock block={criteria}>
        <CriteriaWheel />
      </MaterialBlock>

      <MaterialBlock block={financing}>
        <EuDisclosureDiagram />
      </MaterialBlock>

      <MaterialBlock block={governance}>
        <GovernanceFlowDiagram />
      </MaterialBlock>
    </div>
  );
}

function EuDisclosureDiagram() {
  return (
    <div>
      <svg viewBox="0 0 640 200" className="w-full" role="img" aria-label="EU EED Article 12 mandates disclosure; national law such as Germany's EnEfG mandates performance thresholds">
        <rect x={20} y={40} width={270} height={110} rx={10} fill={PAPER} stroke={ACCENT} strokeWidth={1.8} />
        <text x={155} y={70} textAnchor="middle" fontSize="11" fontWeight={700} fill={ACCENT}>
          EU EED Article 12
        </text>
        <text x={155} y={88} textAnchor="middle" fontSize="9.5" fill={INK}>
          + Annex VII / Reg. (EU) 2024/1364
        </text>
        <text x={155} y={112} textAnchor="middle" fontSize="10" fontWeight={600} fill={ASH}>
          → mandates disclosure
        </text>
        <text x={155} y={130} textAnchor="middle" fontSize="9" fill={ASH}>
          (report KPIs annually, ≥500 kW IT load)
        </text>

        <rect x={350} y={40} width={270} height={110} rx={10} fill={PAPER} stroke={INK} strokeWidth={1.8} />
        <text x={485} y={70} textAnchor="middle" fontSize="11" fontWeight={700} fill={INK}>
          National law
        </text>
        <text x={485} y={88} textAnchor="middle" fontSize="9.5" fill={INK}>
          e.g. Germany's EnEfG
        </text>
        <text x={485} y={112} textAnchor="middle" fontSize="10" fontWeight={600} fill={ASH}>
          → mandates performance thresholds
        </text>
        <text x={485} y={130} textAnchor="middle" fontSize="9" fill={ASH}>
          (binding PUE limits)
        </text>

        <line x1={290} y1={95} x2={348} y2={95} stroke={ASH} strokeWidth={1.6} markerEnd="url(#euArrow)" />
        <text x={319} y={82} textAnchor="middle" fontSize="8.5" fill={ASH}>
          can inform
        </text>

        <defs>
          <marker id="euArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={ASH} />
          </marker>
        </defs>
      </svg>
      <p className="mt-2 text-micro text-ash">
        Disclosure data published under the EU regime can later inform or pressure future national thresholds — but
        the EU directive itself sets no PUE number.
      </p>
    </div>
  );
}

