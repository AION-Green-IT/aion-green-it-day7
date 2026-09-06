import { MATERIAL, CASE_BRIEF } from "@/lib/route2";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaterialBlock } from "@/components/ui/MaterialBlock";
import { FacilitySvg } from "@/components/ui/FacilitySvg";
import { GovernanceSweetSpotCurve } from "./GovernanceSweetSpotCurve";

const [bridge, tco, downtime, regression, iso50001, synthesis] = MATERIAL;

export function Material() {
  return (
    <div className="space-y-14">
      <SectionHeading
        kicker="Material"
        title="Six ideas before the DeltaGrid case"
        intro="From finding problems to owning a defensible recommendation. About 40 minutes."
      />

      <MaterialBlock block={bridge}>
        <ReflectionQuotes />
      </MaterialBlock>

      <MaterialBlock block={tco}>
        <div>
          <FacilitySvg title={`${CASE_BRIEF.company} Facility Map`} utilizationPct={34} rackGenerations={[1, 1, 2, 2, 3, 3]} showCostOfRisk />
          <p className="mt-2 text-micro text-ash">
            Same facility grammar as Route 1, further along in its lifecycle — racks tagged by build generation
            (Gen 1-3), and a small cost-of-risk marker near redundancy foreshadowing this section.
          </p>
        </div>
      </MaterialBlock>

      <MaterialBlock block={downtime}>
        <DowntimeStats />
      </MaterialBlock>

      <MaterialBlock block={regression}>
        <RegressionStat />
      </MaterialBlock>

      <MaterialBlock block={iso50001}>
        <PdcaLoop />
      </MaterialBlock>

      <MaterialBlock block={synthesis}>
        <GovernanceSweetSpotCurve />
      </MaterialBlock>
    </div>
  );
}

function ReflectionQuotes() {
  const prompts = [
    "Where in my own organization is data center operation managed more by habit than by deliberate strategy?",
    "What inefficiency today is most likely going unnoticed simply because no one owns the transparency for it?",
    "What would a head of infrastructure prioritize differently than a pure technical specialist would?",
  ];
  return (
    <div className="space-y-3">
      {prompts.map((p) => (
        <blockquote key={p} className="border-l-2 border-accent/40 pl-4 text-body italic text-ink">
          {p}
        </blockquote>
      ))}
    </div>
  );
}

function DowntimeStats() {
  const stats = [
    { value: "54%", label: "of orgs' most recent serious outage cost > $100,000" },
    { value: "≈20%", label: "report costs exceeding $1 million" },
    { value: "91%", label: "of mid/large enterprises lose > $300,000 per hour of downtime" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-line p-4 text-center">
          <p className="text-h1 text-ink">{s.value}</p>
          <p className="mt-1 text-micro text-ash">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function RegressionStat() {
  return (
    <div className="rounded-xl border border-accent/30 bg-accentSoft p-5 text-center">
      <p className="text-display text-ink">4 in 5</p>
      <p className="mt-1 text-caption text-ash">
        operators say their most recent serious outage could have been prevented through better management,
        process, and configuration — not better hardware.
      </p>
    </div>
  );
}

function PdcaLoop() {
  const steps = [
    { id: "plan", label: "Plan", detail: "Identify significant energy uses, set targets" },
    { id: "do", label: "Do", detail: "Implement measures" },
    { id: "check", label: "Check", detail: "Monitor via KPIs / PUE tracking" },
    { id: "act", label: "Act", detail: "Review and adjust" },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.id} className="rounded-xl border border-line p-3 text-center">
            <p className="text-micro font-semibold uppercase tracking-wide text-accent">{i + 1}</p>
            <p className="mt-1 text-caption font-semibold text-ink">{s.label}</p>
            <p className="mt-1 text-micro text-ash">{s.detail}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-micro text-ash">The loop repeats — PDCA is a cycle, not a one-time project.</p>
    </div>
  );
}
