"use client";

import { TASK3 } from "@/lib/route3";
import type { BoardMemoData } from "./useBoardMemoData";
import { t } from "@/lib/i18n/core";

/** Pure presentational memo — reads like a real board paper, assembling as both phases are worked. */
export function BoardMemoDoc({ data, live = false }: { data: BoardMemoData; live?: boolean }) {
  const reveal = live ? "reveal-in" : undefined;
  const hasBuilderContent =
    !!data.executiveSummary || data.guidingDecisions.length > 0 || data.tradeoffs.length > 0 || !!data.recommendedMeasure || data.approvals.length > 0 || !!data.decisionNow;
  const hasAppendix = data.appendix.perspectiveGroups.length > 0 || data.appendix.leverPlan.length > 0;

  return (
    <div className="space-y-5 text-ink">
      <div className="border-b border-line pb-3">
        <p className="text-micro uppercase tracking-wide text-ash">AION Green IT · Day 7 · Route 3</p>
        <h2 className="text-h3">{t(TASK3.export.docHeading)}</h2>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-caption text-ash">
          <span>Author: <span className="font-semibold text-ink">{data.name}</span></span>
          <span>Date: <span className="font-semibold text-ink">{data.date}</span></span>
          <span>Subject: <span className="font-semibold text-ink">{data.caseReference}</span></span>
        </div>
      </div>

      {!hasBuilderContent && !hasAppendix && (
        <p className="text-caption text-ash">This memo fills in as you work through the Diagnostic and Builder phases below.</p>
      )}

      {data.executiveSummary && (
        <section className={reveal}>
          <h3 className="text-caption font-semibold uppercase tracking-wide text-ash">Executive Summary</h3>
          <p className="mt-1.5 text-micro text-ash">{data.executiveSummary}</p>
        </section>
      )}

      {data.strategicContext && (
        <section className={reveal}>
          <h3 className="text-caption font-semibold uppercase tracking-wide text-ash">Strategic Context</h3>
          <p className="mt-1.5 text-micro text-ash">{data.strategicContext}</p>
        </section>
      )}

      {data.guidingDecisions.length > 0 && (
        <section className={reveal}>
          <h3 className="text-caption font-semibold uppercase tracking-wide text-ash">Guiding Decisions (Next 12 Months)</h3>
          <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-micro text-ash">
            {data.guidingDecisions.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </section>
      )}

      {(data.logicPrinciples.length > 0 || data.tradeoffs.length > 0) && (
        <section className={reveal}>
          <h3 className="text-caption font-semibold uppercase tracking-wide text-ash">Decision Logic &amp; Trade-offs</h3>
          {data.logicPrinciples.length > 0 && (
            <p className="mt-1.5 text-micro text-ash">
              <span className="font-semibold text-ink">Logic: </span>
              {data.logicPrinciples.join("; ")}. {data.logicExplain}
            </p>
          )}
          {data.tradeoffs.length > 0 && (
            <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-micro text-ash">
              {data.tradeoffs.map((line, i) => (
                <li key={i}><span className="font-semibold text-ink">{t(line.label)}.</span> {line.note}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {data.recommendedMeasure && (
        <section className={reveal}>
          <h3 className="text-caption font-semibold uppercase tracking-wide text-ash">Recommended First Measure</h3>
          <p className="mt-1.5 text-caption font-semibold text-ink">{data.recommendedMeasure}</p>
          {data.recommendedJustify && <p className="mt-1 text-micro text-ash">{data.recommendedJustify}</p>}
        </section>
      )}

      {data.approvals.length > 0 && (
        <section className={reveal}>
          <h3 className="text-caption font-semibold uppercase tracking-wide text-ash">Governance &amp; Review Mechanism</h3>
          <ul className="mt-1.5 space-y-0.5 text-micro text-ash">
            {data.approvals.map((a, i) => (
              <li key={i}><span className="font-semibold text-ink">{a.decision}:</span> {a.owner}</li>
            ))}
          </ul>
        </section>
      )}

      {data.decisionNow && (
        <section className={reveal}>
          <h3 className="text-caption font-semibold uppercase tracking-wide text-ash">Decision Under Uncertainty</h3>
          <p className="mt-1.5 text-micro text-ash">{data.decisionNow}</p>
        </section>
      )}

      {hasAppendix && (
        <section className={reveal}>
          <h3 className="text-caption font-semibold uppercase tracking-wide text-ash">Appendix — Phase 1 Diagnostic Findings</h3>
          {data.appendix.perspectiveGroups.map((g) => (
            <div key={g.perspective} className="mt-1.5">
              <p className="text-micro font-semibold text-ink">{g.perspective} ({g.items.length})</p>
              <ul className="mt-0.5 list-disc space-y-0.5 pl-5 text-micro text-ash">
                {g.items.map((line, i) => <li key={i}>{line}</li>)}
              </ul>
            </div>
          ))}
          {data.appendix.leverPlan.length > 0 && (
            <div className="mt-2">
              <p className="text-micro font-semibold text-ink">Selected levers</p>
              <ul className="mt-0.5 space-y-1 text-micro text-ash">
                {data.appendix.leverPlan.map((l, i) => (
                  <li key={i}>
                    <span className="font-semibold text-ink">{t(l.label)}</span> ({l.horizon}) — {l.justification || "(justification pending)"}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.appendix.firstMeasure && (
            <p className="mt-2 text-micro text-ash">
              <span className="font-semibold text-ink">First measure: </span>
              {data.appendix.firstMeasure} — {data.appendix.firstMeasureJustify || "(justification pending)"}
            </p>
          )}
        </section>
      )}
    </div>
  );
}
