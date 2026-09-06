import clsx from "clsx";
import { CASE_HELION } from "@/lib/route3";
import type { ExecutiveDocData } from "./useExecutiveDocData";

/** Pure presentational report, styled as a formal board memo rather than a worksheet. */
export function ExecutiveReportDoc({ data, live = false }: { data: ExecutiveDocData; live?: boolean }) {
  const reveal = live ? "reveal-in" : undefined;

  return (
    <div className="space-y-5 text-ink">
      <div className="border-b-2 border-ink pb-3">
        <p className="text-micro uppercase tracking-widest text-ash">AION Green IT · Day 5 · Route 3 · Confidential</p>
        <h2 className="text-h2">Executive Proposal — Sustainable IT Procurement</h2>
        <div className="mt-2 grid gap-x-6 gap-y-1 text-caption text-ash sm:grid-cols-2">
          <span>
            To: <span className="font-semibold text-ink">Board of Directors, {CASE_HELION.company}</span>
          </span>
          <span>
            From: <span className="font-semibold text-ink">{data.name}, CIO</span>
          </span>
          <span>
            Date: <span className="font-semibold text-ink">{data.date}</span>
          </span>
          <span>
            Re: <span className="font-semibold text-ink">Sustainable IT lifecycle procurement governance</span>
          </span>
        </div>
      </div>

      {data.execSummary && (
        <section className={clsx("rounded-lg border border-ink/20 bg-canvas p-4", reveal)}>
          <h3 className="text-h3 uppercase tracking-wide">Executive Summary</h3>
          <p className="mt-1 text-caption text-ink">{data.execSummary}</p>
        </section>
      )}

      {data.diagnostic && (
        <section className={reveal}>
          <h3 className="text-h3">1. Diagnostic Background</h3>
          <p className="text-caption text-ash">Prioritized leverage points, most to least:</p>
          <ol className="list-decimal space-y-1 pl-5 text-caption text-ash">
            {data.diagnostic.rankedLeverage.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ol>
          {data.diagnostic.topJustify && <p className="mt-1 text-caption text-ash">{data.diagnostic.topJustify}</p>}
        </section>
      )}

      {data.strategicRationale && (
        <section className={reveal}>
          <h3 className="text-h3">2. Strategic Rationale</h3>
          <p className="text-caption text-ash">
            Current governance maturity: <span className="font-semibold text-ink">{data.strategicRationale.position}</span>
          </p>
          <p className="mt-1 text-caption text-ash">{data.strategicRationale.text}</p>
        </section>
      )}

      {data.coreDecisions.length > 0 && (
        <section className={reveal}>
          <h3 className="text-h3">3. Three Core Decisions & Ownership</h3>
          <ul className="space-y-1 text-caption text-ash">
            {data.coreDecisions.map((d, i) => (
              <li key={i}>
                <span className="text-ink">{d.text}</span>
                {d.accountable && <span className="text-micro"> — Accountable: {d.accountable}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.conflictSnapshot.length > 0 && (
        <section className={reveal}>
          <h3 className="text-h3">4. Conflict of Objectives Analysis</h3>
          <ul className="list-disc space-y-1 pl-5 text-caption text-ash">
            {data.conflictSnapshot.map((c, i) => (
              <li key={i}>{c.text}</li>
            ))}
          </ul>
        </section>
      )}

      {data.firstStep && (
        <section className={reveal}>
          <h3 className="text-h3">5. Recommended First Step & Justification</h3>
          <p className="text-caption font-semibold text-ink">{data.firstStep.label}</p>
          {data.firstStep.justify && <p className="mt-1 text-caption text-ash">{data.firstStep.justify}</p>}
        </section>
      )}

      {data.governance.length > 0 && (
        <section className={reveal}>
          <h3 className="text-h3">6. Governance Structure</h3>
          <ul className="space-y-1 text-caption text-ash">
            {data.governance.map((g, i) => (
              <li key={i}>
                <span className="text-ink">{g.decision}</span> — Accountable: {g.accountable}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.incompleteInfo && (
        <section className={reveal}>
          <h3 className="text-h3">7. Decisions Under Incomplete Information</h3>
          <p className="text-caption text-ash">{data.incompleteInfo}</p>
        </section>
      )}

      {data.boardResponse && (
        <section className={reveal}>
          <h3 className="text-h3">8. Board Response Strategy</h3>
          <p className="text-caption font-semibold text-ink">{data.boardResponse.label}</p>
          <p className="mt-1 text-caption text-ash">{data.boardResponse.consequence}</p>
        </section>
      )}
    </div>
  );
}
