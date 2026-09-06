"use client";

import { useMemo } from "react";
import { useRoute3 } from "./useRoute3";
import { CONFLICT_OPTIONS, RACI_DECISIONS, RACI_ROLES, CASE_BRIEF } from "@/lib/route3";

export type BoardProposalDocData = {
  name: string;
  date: string;
  caseReference: string;
  strategicRelevance: string;
  keyDecisions: string[];
  prioritizationLogic: string;
  conflicts: { label: string; justification: string }[];
  firstPriorityPath: string;
  raciRows: { decision: string; cells: string[] }[];
  incompleteData: string;
};

/** Joins Route 3's state hook to the option content to assemble the Task 3 board proposal shape. */
export function useBoardProposalDocData(): BoardProposalDocData {
  const r3 = useRoute3();

  return useMemo(() => {
    const conflicts = r3.selectedConflictIds.map((id) => ({
      label: CONFLICT_OPTIONS.find((c) => c.id === id)?.label ?? id,
      justification: r3.conflictJustify[id] ?? "",
    }));

    const raciRows = RACI_DECISIONS.map((d) => ({
      decision: d.label,
      cells: RACI_ROLES.map((r) => r3.raci[d.id][r.id] || "—"),
    }));

    return {
      name: r3.name || "Learner",
      date: new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }),
      caseReference: CASE_BRIEF.company,
      strategicRelevance: r3.strategicRelevance,
      keyDecisions: r3.keyDecisions,
      prioritizationLogic: r3.prioritizationLogic,
      conflicts,
      firstPriorityPath: r3.firstPriorityPath,
      raciRows,
      incompleteData: r3.incompleteData,
    };
  }, [r3]);
}
