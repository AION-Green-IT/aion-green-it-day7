import { MATERIAL, CASE_BRIEF, CONFLICT_OPTIONS } from "@/lib/route3";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaterialBlock } from "@/components/ui/MaterialBlock";
import { FacilitySvg } from "@/components/ui/FacilitySvg";
import { AccountabilityFlow } from "./AccountabilityFlow";

const [bridge, architecture, noRegret, raci, boardCares, conflicts] = MATERIAL;

const BOARD_FLAGS = [
  { zone: "redundancy" as const, tooltip: "Invest in resiliency now, or accept the current risk level a while longer?" },
  { zone: "utilization" as const, tooltip: "Consolidate underused capacity, or preserve it as headroom for planned growth?" },
  { zone: "monitoring" as const, tooltip: "Fund transparency infrastructure now, or defer it until a clearer trigger appears?" },
];

export function Material() {
  return (
    <div className="space-y-14">
      <SectionHeading
        kicker="Material"
        title="Six ideas before the NovaCore board proposal"
        intro="From technical recommendation to governed decision. About 40 minutes."
      />

      <MaterialBlock block={bridge}>
        <RouteJourney />
      </MaterialBlock>

      <MaterialBlock block={architecture}>
        <div>
          <FacilitySvg
            title={`${CASE_BRIEF.company} — Board Decision Points`}
            utilizationPct={41}
            rackGenerations={[1, 2, 2, 3, 3, 3]}
            showCostOfRisk
            boardFlags={BOARD_FLAGS}
          />
          <p className="mt-2 text-micro text-ash">
            Click a flag to see the kind of decision a board would actually face at that point in the facility —
            illustrative only, not part of the task.
          </p>
        </div>
      </MaterialBlock>

      <MaterialBlock block={noRegret}>
        <NoRegretExample />
      </MaterialBlock>

      <MaterialBlock block={raci}>
        <div className="flex justify-center">
          <AccountabilityFlow />
        </div>
      </MaterialBlock>

      <MaterialBlock block={boardCares}>
        <CsrdStats />
      </MaterialBlock>

      <MaterialBlock block={conflicts}>
        <ConflictPreview />
      </MaterialBlock>
    </div>
  );
}

function RouteJourney() {
  const stages = [
    { n: 1, label: "Route 1", role: "Field analyst", question: "Where are the problems?" },
    { n: 2, label: "Route 2", role: "Senior consultant", question: "What do we do, and why?" },
    { n: 3, label: "Route 3", role: "Strategic advisor", question: "What must the board decide?" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stages.map((s, i) => (
        <div key={s.n} className={i === 2 ? "rounded-xl border border-accent/30 bg-accentSoft p-4" : "rounded-xl border border-line p-4"}>
          <p className={i === 2 ? "text-micro font-semibold uppercase tracking-wide text-accent" : "text-micro font-semibold uppercase tracking-wide text-ash"}>{s.label}</p>
          <p className="mt-1 text-caption font-semibold text-ink">{s.role}</p>
          <p className="mt-1 text-caption text-ash">{s.question}</p>
        </div>
      ))}
    </div>
  );
}

function NoRegretExample() {
  return (
    <div>
      <p className="text-caption font-semibold text-ink">Baseline monitoring at NovaCore — tested against two futures:</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-line p-4">
          <p className="text-micro font-semibold uppercase tracking-wide text-ash">If consolidation turns out necessary</p>
          <p className="mt-1 text-caption text-ash">Monitoring data sizes the business case precisely instead of by estimate.</p>
        </div>
        <div className="rounded-xl border border-line p-4">
          <p className="text-micro font-semibold uppercase tracking-wide text-ash">If it turns out unnecessary</p>
          <p className="mt-1 text-caption text-ash">Monitoring still proves the facility is already efficient — a defensible, useful finding either way.</p>
        </div>
      </div>
      <p className="mt-3 rounded-lg bg-accentSoft p-3 text-center text-caption font-semibold text-accent">
        Valuable in both futures → a no-regret decision
      </p>
    </div>
  );
}

function CsrdStats() {
  const stats = [
    { value: "~80%", label: "narrower mandatory CSRD scope after Omnibus I (2026)" },
    { value: "1,000+", label: "employees, broadly, to still fall in scope" },
    { value: "€50M / €25M", label: "turnover or balance sheet thresholds (either qualifies)" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-line p-4 text-center">
          <p className="text-h2 text-ink">{s.value}</p>
          <p className="mt-1 text-micro text-ash">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function ConflictPreview() {
  return (
    <div>
      <p className="text-caption text-ash">Coming up in the task — the goal conflicts you'll name for NovaCore:</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {CONFLICT_OPTIONS.map((c) => (
          <span key={c.id} className="rounded-full border border-line px-3 py-1.5 text-caption text-ink">
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}
