"use client";

import { useMemo } from "react";
import { useProgress } from "@/lib/store";
import { useRoute1 } from "./useRoute1";
import { R1, TAGS, STAGES, CASE_BRIEF, BASELINE_KG, purchasesNeeded, TASK1, type StageId } from "@/lib/route1";

export type LifecycleDocData = {
  name: string;
  date: string;
  caseReference: string;
  stagesCovered: number;
  stagesTotal: number;
  calc: {
    units: number;
    years: number;
    v1Purchases: number;
    v2Purchases: number;
    v1Total: number;
    v2Total: number;
    delta: number;
  } | null;
  risks: string[];
  criteria: string[];
  customCriterion: string;
  classification: { purchasing: string[]; governance: string[] };
  recommendation: string;
  pushback: { justification: string; choiceLabel: string; consequence: string } | null;
};

/** Joins Route 1's state hook to the store to assemble the live report shape. */
export function useLifecycleDocData(): LifecycleDocData {
  const r1 = useRoute1();
  const checks = useProgress((s) => s.checks);
  const notes = useProgress((s) => s.notes);

  return useMemo(() => {
    const validatedTags = TAGS.filter((t) => {
      const stage = r1.tagPlacements[t.id];
      return stage && (t.validStages as StageId[]).includes(stage as StageId);
    });
    const criteria = validatedTags.filter((t) => checks[R1.criteria(t.id)]).map((t) => t.label);

    const v1Purchases = purchasesNeeded(r1.calcYears, CASE_BRIEF.vendor1.cycleYears);
    const v2Purchases = purchasesNeeded(r1.calcYears, CASE_BRIEF.vendor2.cycleYears);
    const v1Total = v1Purchases * r1.calcUnits * BASELINE_KG;
    const v2Total = v2Purchases * r1.calcUnits * BASELINE_KG;

    const riskItems = [
      { key: R1.risk1, text: r1.risk1.trim() },
      { key: R1.risk2, text: r1.risk2.trim() },
      { key: R1.risk3, text: r1.risk3.trim() },
    ].filter((it) => it.text.length > 0);

    const recommendation =
      r1.recommendation === "vendor1"
        ? CASE_BRIEF.vendor1.label
        : r1.recommendation === "vendor2"
          ? CASE_BRIEF.vendor2.label
          : r1.recommendation === "phased"
            ? "Phased approach"
            : "";

    const pushbackChoiceObj = TASK1.step5.choices.find((c) => c.id === r1.pushbackChoice);

    return {
      name: r1.name || "Learner",
      date: new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }),
      caseReference: `${CASE_BRIEF.company} — ${CASE_BRIEF.units} notebooks`,
      stagesCovered: r1.coveredStages.size,
      stagesTotal: STAGES.length,
      calc: r1.calcUsed
        ? {
            units: r1.calcUnits,
            years: r1.calcYears,
            v1Purchases,
            v2Purchases,
            v1Total,
            v2Total,
            delta: Math.abs(v1Total - v2Total),
          }
        : null,
      risks: riskItems.map((it) => it.text),
      criteria,
      customCriterion: notes[R1.criteriaCustom] ?? "",
      classification: {
        purchasing: riskItems.filter((it) => r1.classify[it.key] === "purchasing").map((it) => it.text),
        governance: riskItems.filter((it) => r1.classify[it.key] === "governance").map((it) => it.text),
      },
      recommendation,
      pushback:
        r1.pushbackJustification || r1.pushbackChoice
          ? {
              justification: r1.pushbackJustification,
              choiceLabel: pushbackChoiceObj?.label ?? "",
              consequence: pushbackChoiceObj?.consequence ?? "",
            }
          : null,
    };
  }, [r1, checks, notes]);
}
