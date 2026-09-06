"use client";

import { useMemo } from "react";
import { useProgress, useHydrated } from "@/lib/store";
import {
  R2,
  KRALJIC_QUESTIONS,
  CRITERIA,
  evenWeights,
  classifyQuadrant,
  weightedTotal,
  type CriterionId,
} from "@/lib/route2";
import { LEARNER_NAME_KEY } from "@/lib/route1";

const hasDigit = (s: string) => /\d/.test(s);
const hasRiskWord = (s: string) => /\d|low|medium|high/i.test(s);
const MODELS = ["modelA", "modelB", "modelC"] as const;

export function useRoute2() {
  const hydrated = useHydrated();
  const seen = useProgress((s) => s.seen);
  const choices = useProgress((s) => s.choices);
  const checks = useProgress((s) => s.checks);
  const notes = useProgress((s) => s.notes);

  const name = hydrated ? notes[LEARNER_NAME_KEY] ?? "" : "";

  const materialTouched = hydrated ? seen[R2.material] ?? [] : [];
  const allMaterialTouched = materialTouched.length >= 4;

  // Step 1
  const kraljicAnswers = useMemo(() => {
    const map: Record<string, string> = {};
    if (!hydrated) return map;
    for (const q of KRALJIC_QUESTIONS) {
      const v = choices[R2.kraljicQ(q.id)];
      if (v) map[q.id] = v;
    }
    return map;
  }, [hydrated, choices]);
  const step1Complete = KRALJIC_QUESTIONS.every((q) => !!kraljicAnswers[q.id]);
  const { riskScore, impactScore } = useMemo(() => {
    let risk = 0;
    let impact = 0;
    for (const q of KRALJIC_QUESTIONS) {
      const optId = kraljicAnswers[q.id];
      const opt = q.options.find((o) => o.id === optId);
      if (opt) {
        risk += opt.risk;
        impact += opt.impact;
      }
    }
    return { riskScore: risk, impactScore: impact };
  }, [kraljicAnswers]);
  const quadrant = step1Complete ? classifyQuadrant(riskScore, impactScore) : null;

  // Step 2 — default weights must themselves sum to 100, not just each
  // individually rounded to the same flat value.
  const weights = useMemo(() => {
    const map = evenWeights();
    for (const c of CRITERIA) {
      const raw = hydrated ? choices[R2.weight(c.id)] : undefined;
      if (raw) map[c.id] = Number(raw);
    }
    return map;
  }, [hydrated, choices]);
  const scores = useMemo(() => {
    const map: Record<string, Record<string, number>> = { modelA: {}, modelB: {}, modelC: {} };
    for (const model of MODELS) {
      for (const c of CRITERIA) {
        const raw = hydrated ? notes[R2.score(model, c.id)] : undefined;
        map[model][c.id] = raw ? Number(raw) : 3;
      }
    }
    return map;
  }, [hydrated, notes]);
  const totals = useMemo(
    () => ({
      modelA: weightedTotal(weights, scores.modelA),
      modelB: weightedTotal(weights, scores.modelB),
      modelC: weightedTotal(weights, scores.modelC),
    }),
    [weights, scores],
  );
  const scoringLocked = hydrated ? !!checks[R2.scoringLocked] : false;
  const step2Complete = scoringLocked;

  // Step 3
  const calcUnits = hydrated ? Number(notes[R2.calcUnits] ?? 350) : 350;
  const calcMaturity = hydrated ? (notes[R2.calcMaturity] as "low" | "medium" | "high" | undefined) ?? "medium" : "medium";
  const dependencyReflection = hydrated ? notes[R2.dependencyReflection] ?? "" : "";
  const costUsed = hydrated ? !!checks[R2.costUsed] : false;
  const step3Complete = costUsed && dependencyReflection.trim().length > 0;

  // Step 4
  const ranks = useMemo(() => {
    const map: Partial<Record<string, number>> = {};
    for (const model of MODELS) {
      const raw = hydrated ? choices[R2.rank(model)] : undefined;
      if (raw) map[model] = Number(raw);
    }
    return map;
  }, [hydrated, choices]);
  const allRanked = MODELS.every((m) => !!ranks[m]) && new Set(Object.values(ranks)).size === 3;

  const justifyScore = hydrated ? notes[R2.justifyScore] ?? "" : "";
  const justifyRisk = hydrated ? notes[R2.justifyRisk] ?? "" : "";
  const justifyValid = hasDigit(justifyScore) && hasRiskWord(justifyRisk);

  const stakeholderTexts = {
    purchasing: hydrated ? notes[R2.stakeholder("purchasing")] ?? "" : "",
    it: hydrated ? notes[R2.stakeholder("it")] ?? "" : "",
    management: hydrated ? notes[R2.stakeholder("management")] ?? "" : "",
  };
  const stakeholdersFilled = Object.values(stakeholderTexts).every((t) => t.trim().length > 0);

  const risk1 = hydrated ? notes[R2.risk(1)] ?? "" : "";
  const risk2 = hydrated ? notes[R2.risk(2)] ?? "" : "";
  const risksFilled = risk1.trim().length > 0 && risk2.trim().length > 0;

  const step4Complete = allRanked && justifyValid && stakeholdersFilled && risksFilled;

  const exportEnabled = hydrated && step1Complete && step2Complete && step3Complete && step4Complete;

  return {
    hydrated,
    name,
    allMaterialTouched,
    kraljicAnswers,
    step1Complete,
    riskScore,
    impactScore,
    quadrant,
    weights,
    scores,
    totals,
    scoringLocked,
    step2Complete,
    calcUnits,
    calcMaturity,
    dependencyReflection,
    costUsed,
    step3Complete,
    ranks,
    allRanked,
    justifyScore,
    justifyRisk,
    justifyValid,
    stakeholderTexts,
    stakeholdersFilled,
    risk1,
    risk2,
    risksFilled,
    step4Complete,
    exportEnabled,
  };
}

export type CriterionScoreMap = Record<CriterionId, number>;
