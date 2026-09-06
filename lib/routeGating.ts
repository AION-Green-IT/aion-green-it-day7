"use client";

import { useProgress, useHydrated } from "./store";

/**
 * Cross-route unlock signal: each route's export component sets its own key
 * true the moment the learner downloads that route's report. A route with a
 * prerequisite stays locked until the previous route's key is set.
 */
export const EXPORTED_KEYS: Record<1 | 2 | 3, string> = {
  1: "r1:exported",
  2: "r2:exported",
  3: "r3:exported",
};

export function useRouteUnlocked(routeN: 1 | 2 | 3): boolean {
  const hydrated = useHydrated();
  const checks = useProgress((s) => s.checks);
  if (routeN === 1) return true;
  if (!hydrated) return false;
  const prevKey = EXPORTED_KEYS[(routeN - 1) as 1 | 2];
  return !!checks[prevKey];
}

/** Marks the given route's export as submitted. Call once, when the download action fires. */
export function markRouteExported(
  toggleCheck: (key: string, value: boolean) => void,
  routeN: 1 | 2 | 3,
) {
  toggleCheck(EXPORTED_KEYS[routeN], true);
}
