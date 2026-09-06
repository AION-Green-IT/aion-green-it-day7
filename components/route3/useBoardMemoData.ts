"use client";

import { useMemo } from "react";
import { useRoute3 } from "./useRoute3";
import {
  POLAREDGE_BRIEF,
  LEVERS3,
  LOGIC_PRINCIPLES,
  TENSION_PAIRS,
  APPROVAL_ROWS,
  PERSPECTIVES,
  OBSERVATIONS,
  HORIZON_OPTIONS,
} from "@/lib/route3";

export type BoardMemoData = {
  name: string;
  date: string;
  caseReference: string;
  executiveSummary: string;
  strategicContext: string;
  guidingDecisions: string[];
  logicPrinciples: string[];
  logicExplain: string;
  tradeoffs: { label: string; note: string }[];
  recommendedMeasure: string;
  recommendedJustify: string;
  approvals: { decision: string; owner: string }[];
  decisionNow: string;
  appendix: {
    perspectiveGroups: { perspective: string; items: string[] }[];
    leverPlan: { label: string; justification: string; horizon: string }[];
    firstMeasure: string;
    firstMeasureJustify: string;
  };
};

const firstSentence = (text: string) => {
  const trimmed = text.trim();
  if (!trimmed) return "";
  const match = trimmed.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : trimmed;
};

/** Joins Route 3's state to the case content to assemble the live Board Decision Memo. */
export function useBoardMemoData(): BoardMemoData {
  const r3 = useRoute3();

  return useMemo(() => {
    const guidingDecisions = r3.guidingDecisions.filter((d) => d.trim().length > 0);

    const logicPrinciples = r3.selectedPrinciples.map((id) => LOGIC_PRINCIPLES.find((p) => p.id === id)?.label ?? id);

    const tradeoffs = r3.selectedPairIds
      .map((id) => ({ label: TENSION_PAIRS.find((p) => p.id === id)?.label ?? id, note: r3.tradeoffJustify[id] ?? "" }))
      .filter((t) => t.note.trim().length > 0);

    const recommendedLever = LEVERS3.find((l) => l.id === r3.recommendedMeasure);

    const approvals = APPROVAL_ROWS.map((row) => ({ decision: row.label, owner: r3.approvalOwners[row.id] ?? "" })).filter(
      (a) => a.owner.trim().length > 0,
    );

    const perspectiveGroups = PERSPECTIVES.map((p) => ({
      perspective: p.label,
      items: OBSERVATIONS.filter((o) => r3.scanAssignments[o.id] === p.id).map((o) => o.text),
    })).filter((g) => g.items.length > 0);

    const leverPlan = r3.selectedLeverIds.map((id) => {
      const lever = LEVERS3.find((l) => l.id === id);
      const horizon = r3.leverHorizon[id];
      return {
        label: lever?.label ?? id,
        justification: r3.leverJustify[id] ?? "",
        horizon: horizon ? HORIZON_OPTIONS.find((h) => h.id === horizon)?.label ?? "—" : "—",
      };
    });

    const firstMeasureLever = LEVERS3.find((l) => l.id === r3.firstMeasure);

    return {
      name: r3.name || "Learner",
      date: new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }),
      caseReference: POLAREDGE_BRIEF.company,
      executiveSummary: firstSentence(r3.strategicRelevance),
      strategicContext: r3.strategicRelevance,
      guidingDecisions,
      logicPrinciples,
      logicExplain: r3.logicExplain,
      tradeoffs,
      recommendedMeasure: recommendedLever ? recommendedLever.label : "",
      recommendedJustify: r3.recommendedJustify,
      approvals,
      decisionNow: r3.decisionNow,
      appendix: {
        perspectiveGroups,
        leverPlan,
        firstMeasure: firstMeasureLever?.label ?? "",
        firstMeasureJustify: r3.firstMeasureJustify,
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [r3]);
}
