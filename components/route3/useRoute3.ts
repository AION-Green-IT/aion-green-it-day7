"use client";

import { useMemo } from "react";
import { useProgress, useHydrated } from "@/lib/store";
import { R3, CONFLICT_OPTIONS, MIN_CONFLICTS, RACI_DECISIONS, RACI_ROLES, type RaciValue } from "@/lib/route3";

export function useRoute3() {
  const hydrated = useHydrated();
  const checks = useProgress((s) => s.checks);
  const choices = useProgress((s) => s.choices);
  const notes = useProgress((s) => s.notes);

  const name = hydrated ? notes[R3.name] ?? "" : "";

  const strategicRelevance = hydrated ? notes[R3.strategicRelevance] ?? "" : "";
  const strategicRelevanceValid = strategicRelevance.trim().length > 0;

  const keyDecisions = useMemo(
    () => ([1, 2, 3] as const).map((n) => (hydrated ? notes[R3.keyDecision(n)] ?? "" : "")),
    [hydrated, notes],
  );
  const keyDecisionsValid = keyDecisions.every((d) => d.trim().length > 0);

  const prioritizationLogic = hydrated ? notes[R3.prioritizationLogic] ?? "" : "";
  const prioritizationLogicValid = prioritizationLogic.trim().length > 0;

  const selectedConflictIds = useMemo(
    () => (hydrated ? CONFLICT_OPTIONS.filter((c) => checks[R3.conflictSelected(c.id)]).map((c) => c.id) : []),
    [hydrated, checks],
  );
  const conflictJustify = useMemo(() => {
    const map: Record<string, string> = {};
    if (!hydrated) return map;
    for (const c of CONFLICT_OPTIONS) map[c.id] = notes[R3.conflictJustify(c.id)] ?? "";
    return map;
  }, [hydrated, notes]);
  const conflictsValid =
    selectedConflictIds.length >= MIN_CONFLICTS && selectedConflictIds.every((id) => conflictJustify[id]?.trim().length > 0);

  const firstPriorityPath = hydrated ? notes[R3.firstPriorityPath] ?? "" : "";
  const firstPriorityValid = firstPriorityPath.trim().length > 0;

  const raci = useMemo(() => {
    const map: Record<string, Record<string, RaciValue>> = {};
    for (const d of RACI_DECISIONS) {
      map[d.id] = {};
      for (const r of RACI_ROLES) {
        map[d.id][r.id] = (hydrated ? (choices[R3.raci(d.id, r.id)] as RaciValue) : "") || "";
      }
    }
    return map;
  }, [hydrated, choices]);
  const raciMissingAccountable = RACI_DECISIONS.filter((d) => !RACI_ROLES.some((r) => raci[d.id][r.id] === "A")).map((d) => d.id);
  const raciValid = raciMissingAccountable.length === 0;

  const incompleteData = hydrated ? notes[R3.incompleteData] ?? "" : "";
  const incompleteDataValid = incompleteData.trim().length > 0;

  const allComplete =
    strategicRelevanceValid &&
    keyDecisionsValid &&
    prioritizationLogicValid &&
    conflictsValid &&
    firstPriorityValid &&
    raciValid &&
    incompleteDataValid;

  const exportEnabled = hydrated && allComplete;

  return {
    hydrated,
    name,
    strategicRelevance,
    strategicRelevanceValid,
    keyDecisions,
    keyDecisionsValid,
    prioritizationLogic,
    prioritizationLogicValid,
    selectedConflictIds,
    conflictJustify,
    conflictsValid,
    firstPriorityPath,
    firstPriorityValid,
    raci,
    raciMissingAccountable,
    raciValid,
    incompleteData,
    incompleteDataValid,
    allComplete,
    exportEnabled,
  };
}
