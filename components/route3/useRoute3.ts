"use client";

import { useMemo } from "react";
import { useProgress, useHydrated } from "@/lib/store";
import {
  R3,
  TENSION_NODES,
  TENSION_EDGES,
  LEVERAGE_CANDIDATES,
  CONFLICT_STATEMENTS,
  RACI_DECISIONS,
  RACI_ROLES,
  type RaciValue,
} from "@/lib/route3";
import { LEARNER_NAME_KEY } from "@/lib/route1";

export function useRoute3() {
  const hydrated = useHydrated();
  const seen = useProgress((s) => s.seen);
  const choices = useProgress((s) => s.choices);
  const notes = useProgress((s) => s.notes);

  const name = hydrated ? notes[LEARNER_NAME_KEY] ?? "" : "";

  const materialTouched = hydrated ? seen[R3.material] ?? [] : [];
  const allMaterialTouched = materialTouched.length >= 4;

  // Phase 1 / Step 1 — tension map
  const nodesSeen = hydrated ? seen[R3.tensionNodesSeen] ?? [] : [];
  const edgesSeen = hydrated ? seen[R3.tensionEdgesSeen] ?? [] : [];
  const allNodesSeen = nodesSeen.length >= TENSION_NODES.length;
  const allEdgesSeen = edgesSeen.length >= TENSION_EDGES.length;
  const step1Complete = allNodesSeen && allEdgesSeen;

  // Phase 1 / Step 2 — leverage ranking
  const leverageRanks = useMemo(() => {
    const map: Record<string, number> = {};
    if (!hydrated) return map;
    for (const c of LEVERAGE_CANDIDATES) {
      const v = choices[R3.leverageRank(c.id)];
      if (v) map[c.id] = Number(v);
    }
    return map;
  }, [hydrated, choices]);
  const rankedCount = Object.values(leverageRanks).filter((v) => v >= 1 && v <= 4).length;
  const leverageJustify = hydrated ? notes[R3.leverageJustify] ?? "" : "";
  const step2Complete = rankedCount === 4 && leverageJustify.trim().length > 0;
  const topLeverageId = Object.entries(leverageRanks).find(([, v]) => v === 1)?.[0] ?? null;

  // Phase 2 / Step 3.1 — strategic ladder + relevance
  const strategicLadderPosition = hydrated ? notes[R3.strategicLadderPosition] ?? "" : "";
  const strategicRelevance = hydrated ? notes[R3.strategicRelevance] ?? "" : "";
  const step3_1Complete = strategicLadderPosition.length > 0 && strategicRelevance.trim().length > 0;

  // Step 3.2 — three core decisions + RACI tag
  const coreDecisions = [1, 2, 3].map((n) => ({
    text: hydrated ? notes[R3.coreDecision(n as 1 | 2 | 3)] ?? "" : "",
    accountable: hydrated ? choices[R3.coreDecisionRaci(n as 1 | 2 | 3)] ?? "" : "",
  }));
  const step3_2Complete = coreDecisions.every((d) => d.text.trim().length > 0 && d.accountable.length > 0);

  // Step 3.3 — conflict-of-objectives matrix
  const conflictPositions = useMemo(() => {
    const map: Record<string, { x: number; y: number }> = {};
    if (!hydrated) return map;
    for (const c of CONFLICT_STATEMENTS) {
      const raw = notes[R3.conflictPos(c.id)];
      if (raw) {
        const [x, y] = raw.split(",").map(Number);
        map[c.id] = { x, y };
      }
    }
    return map;
  }, [hydrated, notes]);
  const step3_3Complete = CONFLICT_STATEMENTS.every((c) => !!conflictPositions[c.id]);

  // Step 3.4 — first step + justification
  const firstStep = hydrated ? choices[R3.firstStep] ?? "" : "";
  const firstStepJustify = hydrated ? notes[R3.firstStepJustify] ?? "" : "";
  const step3_4Complete = firstStep.length > 0 && firstStepJustify.trim().length >= 15;

  // Step 3.5 — RACI grid built from scratch: exactly one Accountable per decision
  const raciBuild = useMemo(() => {
    const map: Record<string, Record<string, RaciValue>> = {};
    for (const d of RACI_DECISIONS) {
      map[d.id] = {};
      for (const r of RACI_ROLES) {
        map[d.id][r.id] = hydrated ? ((choices[R3.raciBuild(d.id, r.id)] as RaciValue) ?? null) : null;
      }
    }
    return map;
  }, [hydrated, choices]);
  const step3_5Complete = RACI_DECISIONS.every(
    (d) => Object.values(raciBuild[d.id]).filter((v) => v === "A").length === 1,
  );

  // Step 3.6 — incomplete-information decision
  const incompleteInfo = hydrated ? notes[R3.incompleteInfo] ?? "" : "";
  const step3_6Complete = incompleteInfo.trim().length > 0;

  const step3Complete =
    step3_1Complete && step3_2Complete && step3_3Complete && step3_4Complete && step3_5Complete && step3_6Complete;

  // Step 4 — board challenge + executive summary
  const boardChoice = hydrated ? choices[R3.boardChoice] ?? "" : "";
  const execSummary = hydrated ? notes[R3.execSummary] ?? "" : "";
  const step4Complete = boardChoice.length > 0 && execSummary.trim().length >= 30;

  const exportEnabled = hydrated && step1Complete && step2Complete && step3Complete && step4Complete;

  return {
    hydrated,
    name,
    allMaterialTouched,
    nodesSeen,
    edgesSeen,
    allNodesSeen,
    allEdgesSeen,
    step1Complete,
    leverageRanks,
    rankedCount,
    leverageJustify,
    topLeverageId,
    step2Complete,
    strategicLadderPosition,
    strategicRelevance,
    step3_1Complete,
    coreDecisions,
    step3_2Complete,
    conflictPositions,
    step3_3Complete,
    firstStep,
    firstStepJustify,
    step3_4Complete,
    raciBuild,
    step3_5Complete,
    incompleteInfo,
    step3_6Complete,
    step3Complete,
    boardChoice,
    execSummary,
    step4Complete,
    exportEnabled,
  };
}
