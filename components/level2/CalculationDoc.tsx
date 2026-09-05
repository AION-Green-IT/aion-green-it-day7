import { CASE } from "@/lib/module3";
import {
  OPTION_A,
  OPTION_B,
  OPTION_C,
  TASK2,
  BUDGET_CEILING_LABEL,
  eur,
  type OptAResult,
  type OptBResult,
  type OptCResult,
} from "@/lib/level2";
import { RadarChart } from "@/components/visuals/RadarChart";

export type CalcDocData = {
  name: string;
  date: string;
  radar: { label: string; value: number }[];
  results: { a: OptAResult; b: OptBResult; c: OptCResult };
  fieldA: string;
  fieldB: string;
};

/** The one-page Calculation Note — shared by the on-screen preview and print. */
export function CalculationDoc({ data }: { data: CalcDocData }) {
  const { name, date, radar, results, fieldA, fieldB } = data;

  const rows = [
    { opt: "A", name: OPTION_A.key, budget: eur(results.a.budget), co2: "0 t (indirect)", time: `${results.a.timeMonths} mo`, risk: "Governance risk" },
    { opt: "B", name: OPTION_B.key, budget: eur(results.b.budget), co2: `~${results.b.co2Pct}% of new spend`, time: `${results.b.timeMonths} mo`, risk: `Supply chain (${results.b.suppliersFailingPct}% fail)` },
    { opt: "C", name: OPTION_C.key, budget: eur(results.c.budget), co2: `${results.c.co2Tons} t/yr`, time: `${results.c.timeMonths} mo`, risk: results.c.risk ? "Budget risk (>250)" : "—" },
  ];

  return (
    <div className="text-ink">
      <p className="text-micro font-semibold uppercase tracking-wide text-ash">{TASK2.export.docWatermark}</p>
      <h1 className="mt-1 text-h1 text-ink">{TASK2.export.docHeading}</h1>
      <p className="text-h3 font-normal text-ash">{TASK2.export.docSubheading}</p>

      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-1 border-y border-line py-2 text-caption text-ash">
        <p>Company: <span className="font-semibold text-ink">{CASE.company}</span></p>
        <p>Learner: <span className="font-semibold text-ink">{name || "—"}</span></p>
        <p>Date: <span className="font-semibold text-ink">{date}</span></p>
      </div>

      <h2 className="mb-2 mt-6 text-h3 text-ink">{TASK2.export.docRadarTitle}</h2>
      <div className="mx-auto max-w-[420px]">
        <RadarChart axes={radar} max={5} />
      </div>

      <h2 className="mb-1 mt-6 text-h3 text-ink">{TASK2.export.docTableTitle}</h2>
      <p className="mb-2 text-caption text-ash">{BUDGET_CEILING_LABEL}</p>
      <table className="w-full border-collapse text-body">
        <thead>
          <tr className="border-b border-line text-left text-micro uppercase tracking-wide text-ash">
            <th className="p-2">Option</th>
            <th className="p-2 text-right">Budget</th>
            <th className="p-2 text-right">CO₂ / yr</th>
            <th className="p-2 text-right">Time</th>
            <th className="p-2">Risk</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.opt} className="border-b border-line last:border-0">
              <td className="p-2"><span className="font-semibold">{r.opt}</span> <span className="text-caption text-ash">{r.name}</span></td>
              <td className="p-2 text-right tabular-nums">{r.budget}</td>
              <td className="p-2 text-right tabular-nums">{r.co2}</td>
              <td className="p-2 text-right tabular-nums">{r.time}</td>
              <td className="p-2 text-caption text-ash">{r.risk}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mb-1 mt-6 text-h3 text-ink">{TASK2.export.docFieldATitle}</h2>
      <p className="whitespace-pre-wrap text-body text-ash">{fieldA.trim() || TASK2.export.docNotFilled}</p>

      <h2 className="mb-1 mt-5 text-h3 text-ink">{TASK2.export.docFieldBTitle}</h2>
      <p className="whitespace-pre-wrap text-body text-ash">{fieldB.trim() || TASK2.export.docNotFilled}</p>
    </div>
  );
}
