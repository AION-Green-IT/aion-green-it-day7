import { TASK2 } from "@/lib/route2";
import type { ProcurementDocData } from "./useProcurementDocData";

/** Pure presentational report — assembles section by section as Task 2 is filled in. */
export function ProcurementReportDoc({ data, live = false }: { data: ProcurementDocData; live?: boolean }) {
  const reveal = live ? "reveal-in" : undefined;

  return (
    <div className="space-y-5 text-ink">
      <div className="border-b border-line pb-3">
        <p className="text-micro uppercase tracking-wide text-ash">AION Green IT · Day 5 · Route 2</p>
        <h2 className="text-h2">{TASK2.export.docHeading}</h2>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-caption text-ash">
          <span>
            Learner: <span className="font-semibold text-ink">{data.name}</span>
          </span>
          <span>
            Date: <span className="font-semibold text-ink">{data.date}</span>
          </span>
          <span>
            Case: <span className="font-semibold text-ink">{data.caseReference}</span>
          </span>
        </div>
      </div>

      {data.kraljic && (
        <section className={reveal}>
          <h3 className="text-h3">Kraljic Classification Result</h3>
          <p className="text-caption text-ash">
            Quadrant: <span className="font-semibold text-ink">{data.kraljic.quadrant}</span> — supply risk{" "}
            {data.kraljic.riskScore}/6, business impact {data.kraljic.impactScore}/6.
          </p>
        </section>
      )}

      {data.scoring && (
        <section className={reveal}>
          <h3 className="text-h3">Weighted Scoring Summary</h3>
          <table className="mt-2 w-full text-caption">
            <thead>
              <tr className="border-b border-line text-left text-ash">
                <th className="py-1 font-semibold">Model</th>
                <th className="font-semibold">Weighted score</th>
              </tr>
            </thead>
            <tbody>
              {data.scoring.totals.map((t) => (
                <tr key={t.label} className="border-b border-line last:border-0">
                  <td className="py-1">{t.label}</td>
                  <td>{t.value.toFixed(2)} / 5</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {data.cost && (
        <section className={reveal}>
          <h3 className="text-h3">Hidden Cost & Risk Summary</h3>
          <p className="text-caption text-ash">Fleet size analyzed: {data.cost.units} units.</p>
          {data.cost.dependencyReflection && (
            <p className="mt-1 text-caption text-ash">
              Renewal negotiating position: <span className="text-ink">{data.cost.dependencyReflection}</span>
            </p>
          )}
        </section>
      )}

      {data.ranking.length > 0 && (
        <section className={reveal}>
          <h3 className="text-h3">Prioritized Recommendation</h3>
          <ol className="list-decimal space-y-1 pl-5 text-caption text-ash">
            {data.ranking.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ol>
        </section>
      )}

      {(data.justifyScore || data.justifyRisk) && (
        <section className={reveal}>
          <h3 className="text-h3">Justification</h3>
          {data.justifyScore && <p className="text-caption text-ash">{data.justifyScore}</p>}
          {data.justifyRisk && <p className="mt-1 text-caption text-ash">{data.justifyRisk}</p>}
        </section>
      )}

      {data.stakeholders.length > 0 && (
        <section className={reveal}>
          <h3 className="text-h3">Stakeholder Next Steps</h3>
          <ul className="space-y-1 text-caption text-ash">
            {data.stakeholders.map((s) => (
              <li key={s.label}>
                <span className="font-semibold text-ink">{s.label}: </span>
                {s.text}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.risks.length > 0 && (
        <section className={reveal}>
          <h3 className="text-h3">Risk Assessment</h3>
          <ul className="list-disc space-y-1 pl-5 text-caption text-ash">
            {data.risks.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
