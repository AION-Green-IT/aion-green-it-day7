"use client";

import { useMemo } from "react";
import { useRoute3 } from "./useRoute3";
import {
  LEVERAGE_CANDIDATES,
  GOVERNANCE_LADDER,
  RACI_ROLES,
  RACI_DECISIONS,
  FIRST_STEP_OPTIONS,
  BOARD_CHALLENGE,
  CONFLICT_STATEMENTS,
} from "@/lib/route3";

export type ExecutiveDocData = {
  name: string;
  date: string;
  execSummary: string;
  diagnostic: { rankedLeverage: string[]; topJustify: string } | null;
  strategicRationale: { position: string; text: string } | null;
  coreDecisions: { text: string; accountable: string }[];
  conflictSnapshot: { text: string; x: number; y: number }[];
  firstStep: { label: string; justify: string } | null;
  governance: { decision: string; accountable: string }[];
  incompleteInfo: string;
  boardResponse: { label: string; consequence: string } | null;
};

const ROLE_LABEL: Record<string, string> = Object.fromEntries(RACI_ROLES.map((r) => [r.id, r.label]));

export function useExecutiveDocData(): ExecutiveDocData {
  const r3 = useRoute3();

  return useMemo(() => {
    const rankedLeverage = [1, 2, 3, 4]
      .map((rank) => Object.entries(r3.leverageRanks).find(([, v]) => v === rank)?.[0])
      .filter((id): id is string => !!id)
      .map((id) => LEVERAGE_CANDIDATES.find((c) => c.id === id)?.label ?? id);

    const ladderRung = GOVERNANCE_LADDER.find((l) => l.id === r3.strategicLadderPosition);

    const conflictSnapshot = CONFLICT_STATEMENTS.filter((c) => r3.conflictPositions[c.id]).map((c) => ({
      text: c.text,
      x: r3.conflictPositions[c.id].x,
      y: r3.conflictPositions[c.id].y,
    }));

    const firstStepOpt = FIRST_STEP_OPTIONS.find((o) => o.id === r3.firstStep);
    const boardChoice = BOARD_CHALLENGE.choices.find((c) => c.id === r3.boardChoice);

    const governance = RACI_DECISIONS.map((d) => {
      const accountableRole = Object.entries(r3.raciBuild[d.id] ?? {}).find(([, v]) => v === "A")?.[0];
      return { decision: d.label, accountable: accountableRole ? ROLE_LABEL[accountableRole] : "" };
    }).filter((g) => g.accountable);

    return {
      name: r3.name || "Learner",
      date: new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }),
      execSummary: r3.execSummary,
      diagnostic: r3.step2Complete ? { rankedLeverage, topJustify: r3.leverageJustify } : null,
      strategicRationale: ladderRung && r3.strategicRelevance ? { position: ladderRung.label, text: r3.strategicRelevance } : null,
      coreDecisions: r3.coreDecisions
        .filter((d) => d.text.trim().length > 0)
        .map((d) => ({ text: d.text, accountable: ROLE_LABEL[d.accountable] ?? "" })),
      conflictSnapshot,
      firstStep: firstStepOpt ? { label: firstStepOpt.label, justify: r3.firstStepJustify } : null,
      governance,
      incompleteInfo: r3.incompleteInfo,
      boardResponse: boardChoice ? { label: boardChoice.label, consequence: boardChoice.consequence } : null,
    };
  }, [r3]);
}
