"use client";

import { useMemo } from "react";
import { useProgress, useHydrated } from "@/lib/store";
import {
  STAGES,
  TAGS,
  RISK_KEYS,
  R1,
  CASE_BRIEF,
  type StageId,
  type ClassifyColumn,
  type MaterialBlockId,
} from "@/lib/route1";

const hasDigit = (s: string) => /\d/.test(s);

export function useRoute1() {
  const hydrated = useHydrated();
  const seen = useProgress((s) => s.seen);
  const choices = useProgress((s) => s.choices);
  const checks = useProgress((s) => s.checks);
  const notes = useProgress((s) => s.notes);

  const name = hydrated ? notes[R1.name] ?? "" : "";

  const materialTouched = (hydrated ? seen[R1.material] ?? [] : []) as MaterialBlockId[];
  const allMaterialTouched = materialTouched.length >= 4;

  const stagesSeen = hydrated ? seen[R1.stages] ?? [] : [];
  const allStagesSeen = stagesSeen.length >= STAGES.length;

  const tagPlacements = useMemo(() => {
    const map: Partial<Record<string, StageId>> = {};
    if (!hydrated) return map;
    for (const tag of TAGS) {
      const placed = choices[R1.tag(tag.id)];
      if (placed) map[tag.id] = placed as StageId;
    }
    return map;
  }, [hydrated, choices]);

  const coveredStages = useMemo(() => {
    const set = new Set<StageId>();
    for (const tag of TAGS) {
      const placedStage = tagPlacements[tag.id];
      if (placedStage && (tag.validStages as StageId[]).includes(placedStage)) {
        set.add(placedStage);
      }
    }
    return set;
  }, [tagPlacements]);

  // Only 8 of the 10 tags are non-distractors, so "every stage covered" (9)
  // is unreachable — completion is every non-distractor tag correctly placed.
  const validTagCount = TAGS.filter((t) => t.validStages.length > 0).length;
  const validPlacedCount = TAGS.filter((t) => {
    const stage = tagPlacements[t.id];
    return stage && (t.validStages as StageId[]).includes(stage as StageId);
  }).length;
  const step2Complete = validPlacedCount >= validTagCount;

  const calcUnits = hydrated ? Number(notes[R1.calcUnits] ?? CASE_BRIEF.units) : CASE_BRIEF.units;
  const calcYears = hydrated ? Number(notes[R1.calcYears] ?? 12) : 12;
  const calcUsed = hydrated ? !!checks[R1.calcUsed] : false;
  const step3Complete = calcUsed;

  const risk1 = hydrated ? notes[R1.risk1] ?? "" : "";
  const risk2 = hydrated ? notes[R1.risk2] ?? "" : "";
  const risk3 = hydrated ? notes[R1.risk3] ?? "" : "";
  const risksFilled = risk1.trim().length > 0 && risk2.trim().length > 0 && risk3.trim().length > 0;

  const classify = useMemo(() => {
    const map: Partial<Record<string, ClassifyColumn>> = {};
    for (const k of RISK_KEYS) {
      const v = hydrated ? choices[R1.classify(k)] : undefined;
      if (v) map[k] = v as ClassifyColumn;
    }
    return map;
  }, [hydrated, choices]);
  const allClassified = RISK_KEYS.every((k) => !!classify[k]);

  const recommendation = hydrated ? choices[R1.recommendation] ?? "" : "";

  const step4Complete = risksFilled && allClassified && !!recommendation;

  const pushbackJustification = hydrated ? notes[R1.pushbackJustification] ?? "" : "";
  const pushbackChoice = hydrated ? choices[R1.pushbackChoice] ?? "" : "";
  const step5Complete = hasDigit(pushbackJustification) && !!pushbackChoice;

  const step1Complete = allStagesSeen;

  const exportEnabled =
    hydrated && step1Complete && step2Complete && step3Complete && step4Complete && step5Complete;

  return {
    hydrated,
    name,
    materialTouched,
    allMaterialTouched,
    stagesSeen,
    allStagesSeen,
    tagPlacements,
    coveredStages,
    validTagCount,
    validPlacedCount,
    calcUnits,
    calcYears,
    calcUsed,
    risk1,
    risk2,
    risk3,
    risksFilled,
    classify,
    allClassified,
    recommendation,
    pushbackJustification,
    pushbackChoice,
    step1Complete,
    step2Complete,
    step3Complete,
    step4Complete,
    step5Complete,
    exportEnabled,
  };
}
