import { TASK2 } from "@/lib/route2";
import type { TradeoffDocData } from "./useTradeoffDocData";

/** Pure presentational report — assembles as the learner completes Task 2. */
export function TradeoffReportDoc({ data, live = false }: { data: TradeoffDocData; live?: boolean }) {
  const reveal = live ? "reveal-in" : undefined;

  return (
    <div className="space-y-5 text-ink">
      <div className="border-b border-line pb-3">
        <p className="text-micro uppercase tracking-wide text-ash">AION Green IT · Day 6 · Route 2</p>
        <h2 className="text-h2">{TASK2.export.docHeading}</h2>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-caption text-ash">
          <span>Learner: <span className="font-semibold text-ink">{data.name}</span></span>
          <span>Date: <span className="font-semibold text-ink">{data.date}</span></span>
          <span>Case: <span className="font-semibold text-ink">{data.caseReference}</span></span>
        </div>
      </div>

      {data.leverPlan.length > 0 && (
        <section className={reveal}>
          <h3 className="text-h3">Prioritized Levers</h3>
          <table className="mt-2 w-full text-caption">
            <thead>
              <tr className="border-b border-line text-left text-ash">
                <th className="py-1 font-semibold">#</th>
                <th className="font-semibold">Lever</th>
                <th className="font-semibold">Horizon</th>
                <th className="font-semibold">Justification</th>
              </tr>
            </thead>
            <tbody>
              {data.leverPlan.map((l) => (
                <tr key={l.rank} className="border-b border-line align-top last:border-0">
                  <td className="py-1.5 tabular-nums">{l.rank}</td>
                  <td className="font-semibold">{l.label}</td>
                  <td>{l.horizon}</td>
                  <td className="text-ash">{l.justification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {data.firstStep && (
        <section className={reveal}>
          <h3 className="text-h3">First Step</h3>
          <p className="text-caption font-semibold text-ink">{data.firstStep}</p>
          {data.firstStepJustify && <p className="mt-1 text-caption text-ash">{data.firstStepJustify}</p>}
        </section>
      )}

      {data.infoGaps && (
        <section className={reveal}>
          <h3 className="text-h3">Information Gaps</h3>
          <p className="text-caption text-ash">{data.infoGaps}</p>
        </section>
      )}
    </div>
  );
}
