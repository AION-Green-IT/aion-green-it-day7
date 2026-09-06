"use client";

import { useMemo } from "react";
import { useRoute2 } from "./useRoute2";
import { LEVERS, CASE_BRIEF, type Horizon2 } from "@/lib/route2";

export type TradeoffDocData = {
  name: string;
  date: string;
  caseReference: string;
  leverPlan: { rank: number; label: string; justification: string; horizon: string }[];
  firstStep: string;
  firstStepJustify: string;
  infoGaps: string;
};

const HORIZON_LABEL: Record<Horizon2, string> = { short: "Short-term", medium: "Medium-term", structural: "Structural" };

/** Joins Route 2's state hook to the lever content to assemble the Task 2 report shape. */
export function useTradeoffDocData(): TradeoffDocData {
  const r2 = useRoute2();

  return useMemo(() => {
    const leverPlan = r2.rankOrder.map((id, i) => {
      const lever = LEVERS.find((l) => l.id === id);
      return {
        rank: i + 1,
        label: lever?.label ?? id,
        justification: r2.leverJustify[id] ?? "",
        horizon: r2.leverHorizon[id] ? HORIZON_LABEL[r2.leverHorizon[id] as Horizon2] : "—",
      };
    });

    const firstLever = LEVERS.find((l) => l.id === r2.firstStep);

    return {
      name: r2.name || "Learner",
      date: new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }),
      caseReference: CASE_BRIEF.company,
      leverPlan,
      firstStep: firstLever?.label ?? "",
      firstStepJustify: r2.firstStepJustify,
      infoGaps: r2.infoGaps,
    };
  }, [r2]);
}
