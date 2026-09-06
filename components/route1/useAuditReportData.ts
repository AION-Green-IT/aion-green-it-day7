"use client";

import { useMemo } from "react";
import { useRoute1 } from "./useRoute1";
import { CASE_BRIEF, CATEGORIES, EVIDENCE_ITEMS, PUE_CLAIMS, GAP_ASPECTS, SPLIT_ITEMS, VERDICT_OPTIONS } from "@/lib/route1";

export type AuditReportData = {
  name: string;
  date: string;
  caseReference: string;
  evidenceByCategory: { category: string; items: string[] }[];
  pueFindings: { claim: string; verdict: string }[];
  gaps: { label: string; justification: string }[];
  splitSummary: { technical: string[]; governance: string[] };
};

/** Joins Route 1's state to the case content to assemble the live "Audit Findings Report." */
export function useAuditReportData(): AuditReportData {
  const r1 = useRoute1();
  const placements = r1.stageDPlacement;

  return useMemo(() => {
    const evidenceByCategory = CATEGORIES.map((cat) => ({
      category: cat.label,
      items: EVIDENCE_ITEMS.filter((it) => r1.stageACategory[it.id] === cat.id).map((it) => it.text),
    })).filter((g) => g.items.length > 0);

    const pueFindings = PUE_CLAIMS.filter((c) => r1.stageBVerdict[c.id]).map((c) => ({
      claim: c.claim,
      verdict: VERDICT_OPTIONS.find((v) => v.id === r1.stageBVerdict[c.id])?.label ?? "",
    }));

    const gaps = r1.stageCSelected.map((id) => ({
      label: GAP_ASPECTS.find((a) => a.id === id)?.label ?? id,
      justification: r1.stageCJustification[id] ?? "",
    }));

    const splitSummary = {
      technical: SPLIT_ITEMS.filter((it) => placements[it.id] === "technical").map((it) => it.text),
      governance: SPLIT_ITEMS.filter((it) => placements[it.id] === "governance").map((it) => it.text),
    };

    return {
      name: r1.name || "Learner",
      date: new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }),
      caseReference: CASE_BRIEF.company,
      evidenceByCategory,
      pueFindings,
      gaps,
      splitSummary,
    };
  }, [r1, placements]);
}
