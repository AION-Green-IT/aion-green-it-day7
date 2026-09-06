import { RACI_ROLES, TASK3 } from "@/lib/route3";
import type { BoardProposalDocData } from "./useBoardProposalDocData";

/** Pure presentational report — a board memo, not a task-shaped log. Used live, in the export modal, and for print. */
export function BoardProposalReportDoc({ data, live = false }: { data: BoardProposalDocData; live?: boolean }) {
  const reveal = live ? "reveal-in" : undefined;

  return (
    <div className="space-y-5 text-ink">
      <div className="border-b border-line pb-3">
        <p className="text-micro uppercase tracking-wide text-ash">AION Green IT · Day 6 · Route 3</p>
        <h2 className="text-h2">{TASK3.export.docHeading}</h2>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-caption text-ash">
          <span>Prepared by: <span className="font-semibold text-ink">{data.name}</span></span>
          <span>Date: <span className="font-semibold text-ink">{data.date}</span></span>
          <span>Subject: <span className="font-semibold text-ink">{data.caseReference}</span></span>
        </div>
      </div>

      {data.strategicRelevance && (
        <section className={reveal}>
          <h3 className="text-h3">1. Strategic Relevance</h3>
          <p className="text-caption text-ash">{data.strategicRelevance}</p>
        </section>
      )}

      {data.keyDecisions.some((d) => d) && (
        <section className={reveal}>
          <h3 className="text-h3">2. Key Decisions — Next 12 Months</h3>
          <ol className="list-decimal space-y-1 pl-5 text-caption text-ash">
            {data.keyDecisions.filter((d) => d).map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ol>
        </section>
      )}

      {data.prioritizationLogic && (
        <section className={reveal}>
          <h3 className="text-h3">3. Prioritization Logic</h3>
          <p className="text-caption text-ash">{data.prioritizationLogic}</p>
        </section>
      )}

      {data.conflicts.length > 0 && (
        <section className={reveal}>
          <h3 className="text-h3">4. Main Goal Conflicts</h3>
          <ul className="list-disc space-y-1.5 pl-5 text-caption text-ash">
            {data.conflicts.map((c, i) => (
              <li key={i}>
                <span className="font-semibold text-ink">{c.label}.</span> {c.justification}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.firstPriorityPath && (
        <section className={reveal}>
          <h3 className="text-h3">5. Recommended First-Priority Path</h3>
          <p className="text-caption text-ash">{data.firstPriorityPath}</p>
        </section>
      )}

      {data.raciRows.length > 0 && (
        <section className={reveal}>
          <h3 className="text-h3">6. Responsibility, Approval &amp; Review Structure</h3>
          <table className="mt-2 w-full text-caption">
            <thead>
              <tr className="border-b border-line text-left text-ash">
                <th className="py-1 font-semibold">Decision type</th>
                {RACI_ROLES.map((r) => (
                  <th key={r.id} className="font-semibold">{r.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.raciRows.map((row, i) => (
                <tr key={i} className="border-b border-line last:border-0">
                  <td className="py-1 font-semibold">{row.decision}</td>
                  {row.cells.map((c, j) => (
                    <td key={j} className="tabular-nums">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {data.incompleteData && (
        <section className={reveal}>
          <h3 className="text-h3">7. Decisions Made Now Despite Incomplete Data</h3>
          <p className="text-caption text-ash">{data.incompleteData}</p>
        </section>
      )}
    </div>
  );
}
