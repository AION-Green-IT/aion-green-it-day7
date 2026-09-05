"use client";

import { BUDGET_CEILING_LABEL, OPTION_A, OPTION_B, OPTION_C, TASK2, eur } from "@/lib/level2";
import { useLevel2 } from "./useLevel2";

/**
 * Section 3.3 — the plain "read the numbers" table. Live from the three panels'
 * current inputs. Deliberately a data table, not a chart.
 */
export function ComparisonTable() {
  const { results, anyPanelOpened, hydrated } = useLevel2();

  if (hydrated && !anyPanelOpened) {
    return (
      <p className="rounded-xl border border-dashed border-line bg-mist/50 p-5 text-body text-ash">
        Open an option panel above to populate the comparison.
      </p>
    );
  }

  const rows = [
    {
      opt: "A",
      name: OPTION_A.key,
      budget: eur(results.a.budget),
      co2: "0 t (indirect)",
      time: `${results.a.timeMonths} mo`,
      risk: "Governance risk",
    },
    {
      opt: "B",
      name: OPTION_B.key,
      budget: eur(results.b.budget),
      co2: `~${results.b.co2Pct}% of new spend`,
      time: `${results.b.timeMonths} mo`,
      risk: `Supply chain (${results.b.suppliersFailingPct}% fail)`,
    },
    {
      opt: "C",
      name: OPTION_C.key,
      budget: eur(results.c.budget),
      co2: `${results.c.co2Tons} t/yr`,
      time: `${results.c.timeMonths} mo`,
      risk: results.c.risk ? "Budget risk (>250)" : "—",
    },
  ];

  return (
    <div>
      <p className="mb-3 rounded-lg bg-ink px-4 py-2.5 text-caption font-semibold text-paper">
        {BUDGET_CEILING_LABEL}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-body">
          <thead>
            <tr className="border-b border-line text-left text-micro uppercase tracking-wide text-ash">
              <th className="p-2.5">Option</th>
              <th className="p-2.5 text-right">{TASK2.tableCols.budget}</th>
              <th className="p-2.5 text-right">{TASK2.tableCols.co2}</th>
              <th className="p-2.5 text-right">{TASK2.tableCols.time}</th>
              <th className="p-2.5">{TASK2.tableCols.risk}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.opt} className="border-b border-line last:border-0">
                <td className="p-2.5">
                  <span className="font-semibold text-ink">{r.opt}</span>
                  <span className="ml-2 text-caption text-ash">{r.name}</span>
                </td>
                <td className="p-2.5 text-right font-semibold tabular-nums text-ink">{r.budget}</td>
                <td className="p-2.5 text-right tabular-nums text-ink">{r.co2}</td>
                <td className="p-2.5 text-right tabular-nums text-ink">{r.time}</td>
                <td className="p-2.5 text-caption text-ash">{r.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-micro text-ash">{TASK2.co2Footnote}</p>
    </div>
  );
}
