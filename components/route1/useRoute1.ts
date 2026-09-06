"use client";

import { useMemo } from "react";
import { useProgress, useHydrated } from "@/lib/store";
import {
  R1,
  ZONES,
  type ZoneId,
  type ImpactType,
  type Horizon,
  type SimLevel,
  type SimOptionId,
} from "@/lib/route1";

export function useRoute1() {
  const hydrated = useHydrated();
  const choices = useProgress((s) => s.choices);
  const notes = useProgress((s) => s.notes);

  const name = hydrated ? notes[R1.name] ?? "" : "";

  // --- Task 1a, Step 1 — zone diagnostics ----------------------------------
  const zoneAnswers = useMemo(() => {
    const map: Partial<Record<ZoneId, string>> = {};
    if (!hydrated) return map;
    for (const z of ZONES) {
      const v = choices[R1.zoneAnswer(z.id)];
      if (v) map[z.id] = v;
    }
    return map;
  }, [hydrated, choices]);
  const zonesAnsweredCount = Object.keys(zoneAnswers).length;
  const allZonesAnswered = zonesAnsweredCount >= ZONES.length;
  const step1aStep1Complete = allZonesAnswered;

  // --- Task 1a, Step 2 — categorization & prioritization -------------------
  const zoneImpact = useMemo(() => {
    const map: Partial<Record<ZoneId, ImpactType>> = {};
    if (!hydrated) return map;
    for (const z of ZONES) {
      const v = choices[R1.zoneImpact(z.id)];
      if (v) map[z.id] = v as ImpactType;
    }
    return map;
  }, [hydrated, choices]);
  const zoneHorizon = useMemo(() => {
    const map: Partial<Record<ZoneId, Horizon>> = {};
    if (!hydrated) return map;
    for (const z of ZONES) {
      const v = choices[R1.zoneHorizon(z.id)];
      if (v) map[z.id] = v as Horizon;
    }
    return map;
  }, [hydrated, choices]);
  const allZonesClassified = ZONES.every((z) => !!zoneImpact[z.id] && !!zoneHorizon[z.id]);

  const priorityZone = hydrated ? (choices[R1.priorityZone] as ZoneId | undefined) ?? "" : "";
  const improvementApproach = hydrated ? notes[R1.improvementApproach] ?? "" : "";
  const step1aStep2Complete = allZonesClassified && !!priorityZone && improvementApproach.trim().length > 0;

  const step1aComplete = step1aStep1Complete && step1aStep2Complete;
  const auditMappingExportEnabled = hydrated && step1aComplete;

  // --- Task 1b, Step 1 — scenario sliders (exploratory, never gates) -------
  const simBudget = (hydrated ? choices[R1.simBudget] : undefined) as SimLevel | undefined ?? "med";
  const simRisk = (hydrated ? choices[R1.simRisk] : undefined) as SimLevel | undefined ?? "med";

  // --- Task 1b, Step 2 — commit & justify -----------------------------------
  const simOption = hydrated ? (choices[R1.simOption] as SimOptionId | undefined) ?? "" : "";
  const simWhy = hydrated ? notes[R1.simWhy] ?? "" : "";
  const simFollowOn = hydrated ? notes[R1.simFollowOn] ?? "" : "";
  const simRisk1 = hydrated ? notes[R1.simRisk1] ?? "" : "";
  const simRisk2 = hydrated ? notes[R1.simRisk2] ?? "" : "";

  const step1bStep1Complete = !!simOption;
  const step1bStep2Complete =
    simWhy.trim().length > 0 && simFollowOn.trim().length > 0 && simRisk1.trim().length > 0 && simRisk2.trim().length > 0;
  const step1bComplete = step1bStep1Complete && step1bStep2Complete;
  const priorityDecisionExportEnabled = hydrated && step1bComplete;

  return {
    hydrated,
    name,
    zoneAnswers,
    zonesAnsweredCount,
    allZonesAnswered,
    zoneImpact,
    zoneHorizon,
    allZonesClassified,
    priorityZone,
    improvementApproach,
    step1aStep1Complete,
    step1aStep2Complete,
    step1aComplete,
    auditMappingExportEnabled,
    simBudget,
    simRisk,
    simOption,
    simWhy,
    simFollowOn,
    simRisk1,
    simRisk2,
    step1bStep1Complete,
    step1bStep2Complete,
    step1bComplete,
    priorityDecisionExportEnabled,
  };
}
