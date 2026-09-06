import { TASK1B } from "@/lib/route1";
import type { PriorityDecisionDocData } from "./usePriorityDecisionDocData";

/** Pure presentational report — assembles as the learner completes Task 1b. */
export function PriorityDecisionReportDoc({ data, live = false }: { data: PriorityDecisionDocData; live?: boolean }) {
  const reveal = live ? "reveal-in" : undefined;

  return (
    <div className="space-y-5 text-ink">
      <div className="border-b border-line pb-3">
        <p className="text-micro uppercase tracking-wide text-ash">AION Green IT · Day 6 · Route 1</p>
        <h2 className="text-h2">{TASK1B.export.docHeading}</h2>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-caption text-ash">
          <span>Learner: <span className="font-semibold text-ink">{data.name}</span></span>
          <span>Date: <span className="font-semibold text-ink">{data.date}</span></span>
          <span>Case: <span className="font-semibold text-ink">{data.caseReference}</span></span>
        </div>
      </div>

      <section className={reveal}>
        <h3 className="text-h3">Constraints Considered</h3>
        <p className="text-caption text-ash">
          Budget available: <span className="font-semibold text-ink">{data.budget}</span> · Risk tolerance:{" "}
          <span className="font-semibold text-ink">{data.risk}</span>
        </p>
      </section>

      {data.optionLabel && (
        <section className={reveal}>
          <h3 className="text-h3">Selected Option</h3>
          <p className="text-caption font-semibold text-ink">{data.optionLabel}</p>
        </section>
      )}

      {data.why && (
        <section className={reveal}>
          <h3 className="text-h3">Justification</h3>
          <p className="text-caption text-ash">{data.why}</p>
        </section>
      )}

      {data.followOn && (
        <section className={reveal}>
          <h3 className="text-h3">Follow-on Decision</h3>
          <p className="text-caption text-ash">{data.followOn}</p>
        </section>
      )}

      {(data.risk1 || data.risk2) && (
        <section className={reveal}>
          <h3 className="text-h3">Risks If This Is the Wrong First Move</h3>
          <ul className="list-disc space-y-1 pl-5 text-caption text-ash">
            {data.risk1 && <li>{data.risk1}</li>}
            {data.risk2 && <li>{data.risk2}</li>}
          </ul>
        </section>
      )}
    </div>
  );
}
