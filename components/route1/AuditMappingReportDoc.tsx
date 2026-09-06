import { TASK1A } from "@/lib/route1";
import type { AuditMappingDocData } from "./useAuditMappingDocData";

/** Pure presentational report — assembles as the learner completes Task 1a. */
export function AuditMappingReportDoc({ data, live = false }: { data: AuditMappingDocData; live?: boolean }) {
  const reveal = live ? "reveal-in" : undefined;

  return (
    <div className="space-y-5 text-ink">
      <div className="border-b border-line pb-3">
        <p className="text-micro uppercase tracking-wide text-ash">AION Green IT · Day 6 · Route 1</p>
        <h2 className="text-h2">{TASK1A.export.docHeading}</h2>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-caption text-ash">
          <span>Learner: <span className="font-semibold text-ink">{data.name}</span></span>
          <span>Date: <span className="font-semibold text-ink">{data.date}</span></span>
          <span>Case: <span className="font-semibold text-ink">{data.caseReference}</span></span>
        </div>
      </div>

      {data.diagnostics.length > 0 && (
        <section className={reveal}>
          <h3 className="text-h3">Zone Diagnostics</h3>
          <ul className="mt-1 space-y-1.5 text-caption text-ash">
            {data.diagnostics.map((d, i) => (
              <li key={i}>
                <span className="font-semibold text-ink">{d.zone}.</span> {d.answer}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.classification.length > 0 && (
        <section className={reveal}>
          <h3 className="text-h3">Categorization</h3>
          <table className="mt-2 w-full text-caption">
            <thead>
              <tr className="border-b border-line text-left text-ash">
                <th className="py-1 font-semibold">Zone</th>
                <th className="font-semibold">Impact type</th>
                <th className="font-semibold">Horizon</th>
              </tr>
            </thead>
            <tbody>
              {data.classification.map((c, i) => (
                <tr key={i} className="border-b border-line last:border-0">
                  <td className="py-1">{c.zone}</td>
                  <td>{c.impact}</td>
                  <td>{c.horizon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {data.priorityZone && (
        <section className={reveal}>
          <h3 className="text-h3">Recommended First Priority</h3>
          <p className="text-caption font-semibold text-ink">{data.priorityZone}</p>
          {data.improvementApproach && <p className="mt-1 text-caption text-ash">{data.improvementApproach}</p>}
        </section>
      )}
    </div>
  );
}
