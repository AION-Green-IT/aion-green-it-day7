import clsx from "clsx";
import { TASK1 } from "@/lib/route1";
import type { LifecycleDocData } from "./useLifecycleDocData";

const fmtT = (kg: number) => `${(kg / 1000).toFixed(1)} t CO2e`;

/** Pure presentational report — assembles section by section as the learner fills in Task 1. */
export function LifecycleReportDoc({ data, live = false }: { data: LifecycleDocData; live?: boolean }) {
  const reveal = live ? "reveal-in" : undefined;

  return (
    <div className="space-y-5 text-ink">
      <div className="border-b border-line pb-3">
        <p className="text-micro uppercase tracking-wide text-ash">AION Green IT · Day 5 · Route 1</p>
        <h2 className="text-h2">{TASK1.export.docHeading}</h2>
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

      {data.stagesCovered > 0 && (
        <section className={reveal}>
          <h3 className="text-h3">Lifecycle Stage Mapping Summary</h3>
          <p className="text-caption text-ash">
            {data.stagesCovered} of {data.stagesTotal} lifecycle stages have at least one correctly-placed
            sustainability factor.
          </p>
        </section>
      )}

      {data.calc && (
        <section className={reveal}>
          <h3 className="text-h3">Quantitative Lifecycle Cost Projection</h3>
          <p className="text-caption text-ash">
            {data.calc.units} units over a {data.calc.years}-year horizon.
          </p>
          <table className="mt-2 w-full text-caption">
            <thead>
              <tr className="border-b border-line text-left text-ash">
                <th className="py-1 font-semibold">Vendor</th>
                <th className="font-semibold">Units purchased</th>
                <th className="font-semibold">Cumulative CO2e</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line">
                <td className="py-1">Vendor 1</td>
                <td>{data.calc.v1Purchases}</td>
                <td>{fmtT(data.calc.v1Total)}</td>
              </tr>
              <tr>
                <td className="py-1">Vendor 2</td>
                <td>{data.calc.v2Purchases}</td>
                <td>{fmtT(data.calc.v2Total)}</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-caption font-semibold text-ink">Delta: {fmtT(data.calc.delta)}</p>
        </section>
      )}

      {data.risks.length > 0 && (
        <section className={reveal}>
          <h3 className="text-h3">Risk Analysis</h3>
          <ul className="list-disc space-y-1 pl-5 text-caption text-ash">
            {data.risks.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>
      )}

      {(data.criteria.length > 0 || data.customCriterion) && (
        <section className={reveal}>
          <h3 className="text-h3">Procurement Criteria Recommendation</h3>
          <ul className="list-disc space-y-1 pl-5 text-caption text-ash">
            {data.criteria.map((c) => (
              <li key={c}>{c}</li>
            ))}
            {data.customCriterion && <li>{data.customCriterion}</li>}
          </ul>
        </section>
      )}

      {(data.classification.purchasing.length > 0 || data.classification.governance.length > 0) && (
        <section className={reveal}>
          <h3 className="text-h3">Purchasing vs. Governance Classification</h3>
          <div className={clsx("mt-1 grid gap-4", "sm:grid-cols-2")}>
            <div>
              <p className="text-micro font-semibold uppercase tracking-wide text-ash">Purchasing-level</p>
              <ul className="list-disc space-y-1 pl-5 text-caption text-ash">
                {data.classification.purchasing.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-micro font-semibold uppercase tracking-wide text-ash">Management/Governance-level</p>
              <ul className="list-disc space-y-1 pl-5 text-caption text-ash">
                {data.classification.governance.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {data.recommendation && (
        <section className={reveal}>
          <h3 className="text-h3">Initial Recommendation</h3>
          <p className="text-caption text-ink">{data.recommendation}</p>
        </section>
      )}

      {data.pushback && (
        <section className={reveal}>
          <h3 className="text-h3">Decision Under Constraint</h3>
          {data.pushback.justification && (
            <p className="text-caption text-ash">
              Justification: <span className="text-ink">{data.pushback.justification}</span>
            </p>
          )}
          {data.pushback.choiceLabel && (
            <>
              <p className="mt-1 text-caption font-semibold text-ink">{data.pushback.choiceLabel}</p>
              <p className="text-caption text-ash">{data.pushback.consequence}</p>
            </>
          )}
        </section>
      )}
    </div>
  );
}
