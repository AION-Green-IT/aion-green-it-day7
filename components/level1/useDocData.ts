"use client";

import { useEffect, useState } from "react";
import { BUCKETS } from "@/lib/module3";
import { useProgress } from "@/lib/store";
import { L1, bucketCounts, useLevel1 } from "@/lib/level1";
import type { DocData } from "./DiagnosticDoc";

/** Client-only date so the prerendered build and the browser never disagree. */
function useClientDate(): string {
  const [d, setD] = useState("");
  useEffect(() => {
    setD(
      new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);
  return d;
}

/** Gathers everything the Diagnostic Note needs from the store. */
export function useDocData(): DocData {
  const { placements } = useLevel1();
  const notes = useProgress((s) => s.notes);
  const date = useClientDate();

  return {
    name: notes[L1.nameKey] ?? "",
    date,
    placements,
    counts: bucketCounts(placements, BUCKETS.map((b) => b.id)),
    fieldA: notes[L1.fieldA] ?? "",
    fieldB: notes[L1.fieldB] ?? "",
  };
}
