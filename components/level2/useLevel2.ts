"use client";

import { useHydrated, useProgress } from "@/lib/store";
import {
  L2,
  SCORE_AREAS,
  SCORECARD,
  TASK2,
  computeA,
  computeB,
  computeC,
  scoreKey,
  type OptAResult,
  type OptBResult,
  type OptCResult,
} from "@/lib/level2";

export type Level2State = {
  hydrated: boolean;
  materialOpened: string[];
  refOpened: boolean;
  scores: Record<string, number>;
  scoresTouched: string[];
  allScored: boolean;
  panelsOpened: string[];
  anyPanelOpened: boolean;
  allPanelsOpened: boolean;
  aScope: "basic" | "full";
  bTier: number;
  cUnits: number;
  results: { a: OptAResult; b: OptBResult; c: OptCResult };
  name: string;
  fieldAFilled: boolean;
  fieldBFilled: boolean;
  reflectionComplete: boolean;
  reflectionUnlocked: boolean;
  complete: boolean;
};

const DEFAULT_SCORE = SCORECARD.scale.default;

export function useLevel2(): Level2State {
  const hydrated = useHydrated();
  const seen = useProgress((s) => s.seen);
  const choices = useProgress((s) => s.choices);
  const checks = useProgress((s) => s.checks);
  const notes = useProgress((s) => s.notes);

  const materialOpened = hydrated ? seen[L2.materialKey] ?? [] : [];
  const refOpened = hydrated ? !!checks[L2.refOpenedKey] : false;

  const scores: Record<string, number> = {};
  for (const a of SCORE_AREAS) {
    const raw = hydrated ? choices[scoreKey(a.id)] : undefined;
    scores[a.id] = raw ? Number(raw) : DEFAULT_SCORE;
  }
  const scoresTouched = hydrated ? seen[L2.scoresTouchedKey] ?? [] : [];
  const allScored = scoresTouched.length >= SCORE_AREAS.length;

  const panelsOpened = hydrated ? seen[L2.panelsKey] ?? [] : [];
  const anyPanelOpened = panelsOpened.length > 0;
  const allPanelsOpened = panelsOpened.length >= 3;

  const aScope = (hydrated ? choices[L2.aScope] : undefined) === "full" ? "full" : "basic";
  const bTier = hydrated ? Number(choices[L2.bTier] ?? 1) : 1;
  const cUnitsRaw = hydrated ? choices[L2.cUnits] : undefined;
  const cUnits = cUnitsRaw !== undefined ? Number(cUnitsRaw) : 100;

  const results = {
    a: computeA(aScope),
    b: computeB(bTier),
    c: computeC(cUnits),
  };

  const fieldAFilled = hydrated && (notes[L2.fieldA] ?? "").trim().length > 0;
  const fieldBFilled = hydrated && (notes[L2.fieldB] ?? "").trim().length > 0;
  const reflectionComplete = fieldAFilled && fieldBFilled;
  const reflectionUnlocked = allPanelsOpened && allScored;

  return {
    hydrated,
    materialOpened,
    refOpened,
    scores,
    scoresTouched,
    allScored,
    panelsOpened,
    anyPanelOpened,
    allPanelsOpened,
    aScope,
    bTier,
    cUnits,
    results,
    name: notes["learner:name"] ?? "",
    fieldAFilled,
    fieldBFilled,
    reflectionComplete,
    reflectionUnlocked,
    complete: reflectionComplete,
  };
}

export { TASK2 };
