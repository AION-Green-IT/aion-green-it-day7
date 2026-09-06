"use client";

import { useMemo } from "react";
import { useRoute1 } from "./useRoute1";
import { SIM_OPTIONS, CASE_BRIEF } from "@/lib/route1";

export type PriorityDecisionDocData = {
  name: string;
  date: string;
  caseReference: string;
  budget: string;
  risk: string;
  optionLabel: string;
  why: string;
  followOn: string;
  risk1: string;
  risk2: string;
};

const LEVEL_LABEL: Record<string, string> = { low: "Low", med: "Medium", high: "High" };

/** Joins Route 1's state hook to the option content to assemble the Task 1b report shape. */
export function usePriorityDecisionDocData(): PriorityDecisionDocData {
  const r1 = useRoute1();

  return useMemo(() => {
    const option = SIM_OPTIONS.find((o) => o.id === r1.simOption);
    return {
      name: r1.name || "Learner",
      date: new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }),
      caseReference: CASE_BRIEF.company,
      budget: LEVEL_LABEL[r1.simBudget],
      risk: LEVEL_LABEL[r1.simRisk],
      optionLabel: option?.label ?? "",
      why: r1.simWhy,
      followOn: r1.simFollowOn,
      risk1: r1.simRisk1,
      risk2: r1.simRisk2,
    };
  }, [r1]);
}
