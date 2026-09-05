"use client";

/**
 * The single place that maps Level 1's mechanics onto the generic progress
 * store, so every component (cards, board, reflection, export, top-bar gate)
 * reads the same keys and the same definition of "done".
 *
 * Store key layout for Level 1:
 *   seen["l1:material"]        -> card ids the learner has opened
 *   choices["l1:sort:<id>"]    -> bucket id a signal was dropped into
 *   notes["l1:gaps"]           -> reflection field A
 *   notes["l1:opsVsStrategic"] -> reflection field B
 *   notes["learner:name"]      -> shared across the whole module
 */

import { useHydrated, useProgress } from "@/lib/store";
import { BUCKETS, MATERIAL, SIGNALS, TASK1 } from "@/lib/module3";

export const L1 = {
  materialKey: "l1:material",
  sortPrefix: "l1:sort:",
  fieldA: TASK1.reflection.fieldA.key,
  fieldB: TASK1.reflection.fieldB.key,
  nameKey: "learner:name",
} as const;

export const sortKey = (signalId: string) => `${L1.sortPrefix}${signalId}`;

export type Level1State = {
  hydrated: boolean;
  openedCards: string[];
  openedCount: number;
  allRead: boolean;
  /** signalId -> bucketId (only placed signals appear). */
  placements: Record<string, string>;
  sortedCount: number;
  allSorted: boolean;
  fieldAFilled: boolean;
  fieldBFilled: boolean;
  reflectionComplete: boolean;
  /** The whole level: read + sorted + both fields written. */
  complete: boolean;
};

export function useLevel1(): Level1State {
  const hydrated = useHydrated();
  const seen = useProgress((s) => s.seen);
  const choices = useProgress((s) => s.choices);
  const notes = useProgress((s) => s.notes);

  const openedCards = hydrated ? seen[L1.materialKey] ?? [] : [];
  const openedCount = openedCards.length;
  const allRead = openedCount >= MATERIAL.cards.length;

  const placements: Record<string, string> = {};
  if (hydrated) {
    for (const s of SIGNALS) {
      const b = choices[sortKey(s.id)];
      if (b) placements[s.id] = b;
    }
  }
  const sortedCount = Object.keys(placements).length;
  const allSorted = sortedCount >= SIGNALS.length;

  const fieldAFilled = hydrated && (notes[L1.fieldA] ?? "").trim().length > 0;
  const fieldBFilled = hydrated && (notes[L1.fieldB] ?? "").trim().length > 0;
  const reflectionComplete = fieldAFilled && fieldBFilled;

  return {
    hydrated,
    openedCards,
    openedCount,
    allRead,
    placements,
    sortedCount,
    allSorted,
    fieldAFilled,
    fieldBFilled,
    reflectionComplete,
    complete: allRead && allSorted && reflectionComplete,
  };
}

/** Live count of signals in each bucket, in BUCKETS order. */
export function bucketCounts(
  placements: Record<string, string>,
  bucketIds: string[],
): Record<string, number> {
  const counts: Record<string, number> = Object.fromEntries(
    bucketIds.map((id) => [id, 0]),
  );
  for (const b of Object.values(placements)) {
    if (b in counts) counts[b] += 1;
  }
  return counts;
}

export type Level1Note = {
  hydrated: boolean;
  name: string;
  placements: Record<string, string>;
  counts: Record<string, number>;
  gaps: string; // reflection field A
  opsVsStrategic: string; // reflection field B
  /** True once Level 1 has produced a usable Diagnostic Note. */
  hasNote: boolean;
};

/**
 * Level 1's saved Diagnostic Note, read straight from the shared store so
 * Level 2 can reference it without the learner re-entering anything.
 */
export function useLevel1Note(): Level1Note {
  const state = useLevel1();
  const notes = useProgress((s) => s.notes);
  const counts = bucketCounts(state.placements, BUCKETS.map((b) => b.id));
  const gaps = notes[L1.fieldA] ?? "";
  const opsVsStrategic = notes[L1.fieldB] ?? "";

  return {
    hydrated: state.hydrated,
    name: notes[L1.nameKey] ?? "",
    placements: state.placements,
    counts,
    gaps,
    opsVsStrategic,
    hasNote: state.allSorted && gaps.trim().length > 0 && opsVsStrategic.trim().length > 0,
  };
}
