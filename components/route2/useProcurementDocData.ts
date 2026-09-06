"use client";

import { useMemo } from "react";
import { useRoute2 } from "./useRoute2";
import { CASE_BRIEF, TASK2, QUADRANT_LABEL } from "@/lib/route2";

const MODEL_LABEL: Record<string, string> = {
  modelA: CASE_BRIEF.modelA.label,
  modelB: CASE_BRIEF.modelB.label,
  modelC: CASE_BRIEF.modelC.label,
};

export type ProcurementDocData = {
  name: string;
  date: string;
  caseReference: string;
  kraljic: { quadrant: string; riskScore: number; impactScore: number } | null;
  scoring: { locked: boolean; totals: { label: string; value: number }[] } | null;
  cost: { units: number; dependencyReflection: string } | null;
  ranking: string[];
  justifyScore: string;
  justifyRisk: string;
  stakeholders: { label: string; text: string }[];
  risks: string[];
};

export function useProcurementDocData(): ProcurementDocData {
  const r2 = useRoute2();

  return useMemo(() => {
    const ranking = [1, 2, 3]
      .map((rank) => Object.entries(r2.ranks).find(([, v]) => v === rank)?.[0])
      .filter((m): m is string => !!m)
      .map((m) => MODEL_LABEL[m]);

    const stakeholders = TASK2.step4.stakeholders
      .map((s) => ({ label: s.label, text: r2.stakeholderTexts[s.id as keyof typeof r2.stakeholderTexts] }))
      .filter((s) => s.text.trim().length > 0);

    return {
      name: r2.name || "Learner",
      date: new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }),
      caseReference: CASE_BRIEF.company,
      kraljic: r2.step1Complete && r2.quadrant
        ? { quadrant: QUADRANT_LABEL[r2.quadrant], riskScore: r2.riskScore, impactScore: r2.impactScore }
        : null,
      scoring: r2.scoringLocked
        ? {
            locked: true,
            totals: [
              { label: CASE_BRIEF.modelA.label, value: r2.totals.modelA },
              { label: CASE_BRIEF.modelB.label, value: r2.totals.modelB },
              { label: CASE_BRIEF.modelC.label, value: r2.totals.modelC },
            ],
          }
        : null,
      cost: r2.costUsed ? { units: r2.calcUnits, dependencyReflection: r2.dependencyReflection } : null,
      ranking,
      justifyScore: r2.justifyScore,
      justifyRisk: r2.justifyRisk,
      stakeholders,
      risks: [r2.risk1, r2.risk2].filter((r) => r.trim().length > 0),
    };
  }, [r2]);
}
