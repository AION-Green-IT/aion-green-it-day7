"use client";

import { useEffect, useState } from "react";
import { SCORE_AREAS, L2 } from "@/lib/level2";
import { useProgress } from "@/lib/store";
import { useLevel2 } from "./useLevel2";
import type { CalcDocData } from "./CalculationDoc";

function useClientDate(): string {
  const [d, setD] = useState("");
  useEffect(() => {
    setD(new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }));
  }, []);
  return d;
}

export function useCalcDoc(): CalcDocData {
  const { scores, results, name } = useLevel2();
  const notes = useProgress((s) => s.notes);
  const date = useClientDate();

  return {
    name,
    date,
    radar: SCORE_AREAS.map((a) => ({ label: a.label, value: scores[a.id] })),
    results,
    fieldA: notes[L2.fieldA] ?? "",
    fieldB: notes[L2.fieldB] ?? "",
  };
}
