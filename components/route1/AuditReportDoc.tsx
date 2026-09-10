"use client";

import { TASK1 } from "@/lib/route1";
import type { AuditReportData } from "./useAuditReportData";
import { t } from "@/lib/i18n/core";

/** Pure presentational report — reads like a short analyst memo, assembling as the learner completes each stage. */
export function AuditReportDoc({ data, live = false }: { data: AuditReportData; live?: boolean }) {
  const reveal = live ? "reveal-in" : undefined;
  const isEmpty =
    data.evidenceByCategory.length === 0 && data.pueFindings.length === 0 && data.gaps.length === 0 &&
    data.splitSummary.technical.length === 0 && data.splitSummary.governance.length === 0;

  return (
    <div className="space-y-5 text-ink">
      <div className="border-b border-line pb-3">
        <p className="text-micro uppercase tracking-wide text-ash">AION Green IT · Day 7 · Route 1</p>
        <h2 className="text-h3">{t(TASK1.export.docHeading)}</h2>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-caption text-ash">
          <span>Analyst: <span className="font-semibold text-ink">{data.name}</span></span>
          <span>Date: <span className="font-semibold text-ink">{data.date}</span></span>
          <span>Subject: <span className="font-semibold text-ink">{data.caseReference}</span></span>
        </div>
      </div>

      {isEmpty && <p className="text-caption text-ash">This report fills in as you work through Stages A–D below.</p>}

      {data.evidenceByCategory.length > 0 && (
        <section className={reveal}>
          <h3 className="text-caption font-semibold uppercase tracking-wide text-ash">Evidence Classification Summary</h3>
          <div className="mt-1.5 space-y-2">
            {data.evidenceByCategory.map((g) => (
              <div key={g.category}>
                <p className="text-caption font-semibold text-ink">{g.category} ({g.items.length})</p>
                <ul className="mt-0.5 list-disc space-y-0.5 pl-5 text-micro text-ash">
                  {g.items.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.pueFindings.length > 0 && (
        <section className={reveal}>
          <h3 className="text-caption font-semibold uppercase tracking-wide text-ash">PUE Validity Findings</h3>
          <ul className="mt-1.5 space-y-1.5 text-micro text-ash">
            {data.pueFindings.map((f, i) => (
              <li key={i}>
                <span className="text-ink">{t(f.claim)}</span> — <span className="font-semibold text-accent">{f.verdict}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.gaps.length > 0 && (
        <section className={reveal}>
          <h3 className="text-caption font-semibold uppercase tracking-wide text-ash">Identified Gaps</h3>
          <ul className="mt-1.5 space-y-2">
            {data.gaps.map((g, i) => (
              <li key={i} className="text-micro">
                <span className="font-semibold text-ink">{t(g.label)}.</span>{" "}
                <span className="text-ash">{g.justification || "(justification pending)"}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(data.splitSummary.technical.length > 0 || data.splitSummary.governance.length > 0) && (
        <section className={reveal}>
          <h3 className="text-caption font-semibold uppercase tracking-wide text-ash">Technical vs. Governance Split Summary</h3>
          <div className="mt-1.5 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-micro font-semibold text-ink">Technical ({data.splitSummary.technical.length})</p>
              <ul className="mt-0.5 list-disc space-y-0.5 pl-5 text-micro text-ash">
                {data.splitSummary.technical.map((line, i) => <li key={i}>{line}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-micro font-semibold text-ink">Governance ({data.splitSummary.governance.length})</p>
              <ul className="mt-0.5 list-disc space-y-0.5 pl-5 text-micro text-ash">
                {data.splitSummary.governance.map((line, i) => <li key={i}>{line}</li>)}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
