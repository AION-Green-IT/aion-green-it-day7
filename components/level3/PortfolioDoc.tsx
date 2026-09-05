"use client";

import { TASK3 } from "@/lib/level3";
import { CASE } from "@/lib/module3";
import { DiagnosticDoc } from "@/components/level1/DiagnosticDoc";
import { useDocData } from "@/components/level1/useDocData";
import { CalculationDoc } from "@/components/level2/CalculationDoc";
import { useCalcDoc } from "@/components/level2/useCalcDoc";
import { MemoDoc } from "./MemoDoc";
import { useMemoData } from "./useMemoData";

/**
 * The final combined portfolio: the three notes in order, under one consistent
 * header. Reuses Level 1's DiagnosticDoc and Level 2's CalculationDoc verbatim
 * so each section is exactly the note the learner already produced.
 */
export function PortfolioDoc() {
  const diag = useDocData();
  const calc = useCalcDoc();
  const memo = useMemoData();

  return (
    <div className="text-ink">
      <p className="text-micro font-semibold uppercase tracking-wide text-ash">{CASE.module}</p>
      <h1 className="mt-1 text-h1 text-ink">{TASK3.export.portfolioTitle}</h1>
      <p className="text-caption text-ash">Learner: <span className="font-semibold text-ink">{memo.name || "—"}</span> · {memo.date}</p>

      <PartDivider n={1} title="Diagnostic Note" sub="Level 1 — Knowledge" />
      <DiagnosticDoc data={diag} />

      <PartDivider n={2} title="Calculation Note" sub="Level 2 — Application" />
      <CalculationDoc data={calc} />

      <PartDivider n={3} title="Decision Memo" sub="Level 3 — Management decision" />
      <MemoDoc data={memo} />
    </div>
  );
}

function PartDivider({ n, title, sub }: { n: number; title: string; sub: string }) {
  return (
    <div className="mt-8 border-t-2 border-ink pt-3" style={{ breakBefore: n > 1 ? "page" : undefined }}>
      <p className="text-micro font-semibold uppercase tracking-wide text-ash">Part {n} · {sub}</p>
      <p className="text-h3 text-ink">{title}</p>
    </div>
  );
}
