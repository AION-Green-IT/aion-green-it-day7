"use client";

import { useMemo } from "react";
import { useProgress, useHydrated } from "@/lib/store";
import { R2, LEVERS, REQUIRED_LEVER_COUNT, type Horizon2 } from "@/lib/route2";

function parseOrder(raw: string | undefined, fallback: string[]): string[] {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : fallback;
  } catch {
    return fallback;
  }
}

export function useRoute2() {
  const hydrated = useHydrated();
  const checks = useProgress((s) => s.checks);
  const choices = useProgress((s) => s.choices);
  const notes = useProgress((s) => s.notes);

  const name = hydrated ? notes[R2.name] ?? "" : "";

  const selectedIds = useMemo(
    () => (hydrated ? LEVERS.filter((l) => checks[R2.leverSelected(l.id)]).map((l) => l.id) : []),
    [hydrated, checks],
  );
  const selectedCount = selectedIds.length;
  const selectionComplete = selectedCount === REQUIRED_LEVER_COUNT;

  const leverJustify = useMemo(() => {
    const map: Record<string, string> = {};
    if (!hydrated) return map;
    for (const l of LEVERS) map[l.id] = notes[R2.leverJustify(l.id)] ?? "";
    return map;
  }, [hydrated, notes]);
  const allJustified = selectionComplete && selectedIds.every((id) => leverJustify[id]?.trim().length > 0);

  const rankOrder = useMemo(() => parseOrder(hydrated ? notes[R2.rankOrder] : undefined, selectedIds), [hydrated, notes, selectedIds]);
  // Keep the visible order limited to currently-selected levers, appending any newly-selected one at the end.
  const effectiveRankOrder = useMemo(() => {
    const stillValid = rankOrder.filter((id) => selectedIds.includes(id));
    const missing = selectedIds.filter((id) => !stillValid.includes(id));
    return [...stillValid, ...missing];
  }, [rankOrder, selectedIds]);

  const leverHorizon = useMemo(() => {
    const map: Partial<Record<string, Horizon2>> = {};
    if (!hydrated) return map;
    for (const l of LEVERS) {
      const v = choices[R2.leverHorizon(l.id)];
      if (v) map[l.id] = v as Horizon2;
    }
    return map;
  }, [hydrated, choices]);
  const allHorizonsSet = selectionComplete && selectedIds.every((id) => !!leverHorizon[id]);

  const firstStep = hydrated ? choices[R2.firstStep] ?? "" : "";
  const firstStepValid = selectionComplete && selectedIds.includes(firstStep);
  const firstStepJustify = hydrated ? notes[R2.firstStepJustify] ?? "" : "";

  const infoGaps = hydrated ? notes[R2.infoGaps] ?? "" : "";

  const step2Complete =
    selectionComplete && allJustified && allHorizonsSet && firstStepValid && firstStepJustify.trim().length > 0 && infoGaps.trim().length > 0;

  const exportEnabled = hydrated && step2Complete;

  return {
    hydrated,
    name,
    selectedIds,
    selectedCount,
    selectionComplete,
    leverJustify,
    allJustified,
    rankOrder: effectiveRankOrder,
    leverHorizon,
    allHorizonsSet,
    firstStep,
    firstStepValid,
    firstStepJustify,
    infoGaps,
    step2Complete,
    exportEnabled,
  };
}
