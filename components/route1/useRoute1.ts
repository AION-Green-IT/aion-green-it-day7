"use client";

import { useMemo } from "react";
import { useProgress, useHydrated } from "@/lib/store";
import {
  R1,
  EVIDENCE_ITEMS,
  PUE_CLAIMS,
  GAP_ASPECTS,
  SPLIT_ITEMS,
  GAP_REQUIRED_COUNT,
  type CategoryId,
  type Verdict,
  type Side,
} from "@/lib/route1";

export type MissingItem = { id: string; label: string };

export function useRoute1() {
  const hydrated = useHydrated();
  const choices = useProgress((s) => s.choices);
  const notes = useProgress((s) => s.notes);

  const name = hydrated ? notes[R1.name] ?? "" : "";

  // --- Stage A — Evidence Sorter -------------------------------------------
  const stageACategory = useMemo(() => {
    const map: Record<string, CategoryId | undefined> = {};
    if (!hydrated) return map;
    for (const it of EVIDENCE_ITEMS) {
      const v = choices[R1.stageA.category(it.id)];
      if (v) map[it.id] = v as CategoryId;
    }
    return map;
  }, [hydrated, choices]);
  const stageADoneCount = Object.keys(stageACategory).length;
  const stageAComplete = stageADoneCount >= EVIDENCE_ITEMS.length;

  // --- Stage B — PUE Claim Validity Check -----------------------------------
  const stageBVerdict = useMemo(() => {
    const map: Record<string, Verdict | undefined> = {};
    if (!hydrated) return map;
    for (const c of PUE_CLAIMS) {
      const v = choices[R1.stageB.verdict(c.id)];
      if (v) map[c.id] = v as Verdict;
    }
    return map;
  }, [hydrated, choices]);
  const stageBDoneCount = Object.keys(stageBVerdict).length;
  const stageBComplete = stageBDoneCount >= PUE_CLAIMS.length;

  // --- Stage C — Gap Finder --------------------------------------------------
  const stageCSelected = useMemo(() => {
    if (!hydrated) return [] as string[];
    return GAP_ASPECTS.filter((a) => choices[R1.stageC.selected(a.id)] === "yes").map((a) => a.id);
  }, [hydrated, choices]);
  const stageCJustification = useMemo(() => {
    const map: Record<string, string> = {};
    if (!hydrated) return map;
    for (const a of GAP_ASPECTS) {
      map[a.id] = notes[R1.stageC.justification(a.id)] ?? "";
    }
    return map;
  }, [hydrated, notes]);
  const stageCCountOk = stageCSelected.length === GAP_REQUIRED_COUNT;
  const stageCMissingJustifications = stageCSelected.filter((id) => !stageCJustification[id]?.trim());
  const stageCComplete = stageCCountOk && stageCMissingJustifications.length === 0;

  // --- Stage D — Technical vs. Governance Split ------------------------------
  const stageDPlacement = useMemo(() => {
    const map: Record<string, Side | undefined> = {};
    if (!hydrated) return map;
    for (const it of SPLIT_ITEMS) {
      const v = choices[R1.stageD.placement(it.id)];
      if (v === "technical" || v === "governance") map[it.id] = v;
    }
    return map;
  }, [hydrated, choices]);
  const stageDDoneCount = Object.keys(stageDPlacement).length;
  const stageDComplete = stageDDoneCount >= SPLIT_ITEMS.length;

  const nameComplete = name.trim().length > 0;

  const allComplete = nameComplete && stageAComplete && stageBComplete && stageCComplete && stageDComplete;

  const missing = useMemo<MissingItem[]>(() => {
    const items: MissingItem[] = [];
    if (!nameComplete) items.push({ id: "r1-name", label: "Add your name so the export can be labelled correctly" });
    if (!stageAComplete) {
      items.push({
        id: "r1-stageA",
        label: `Stage A: ${EVIDENCE_ITEMS.length - stageADoneCount} of ${EVIDENCE_ITEMS.length} pieces of evidence not yet classified`,
      });
    }
    if (!stageBComplete) {
      items.push({
        id: "r1-stageB",
        label: `Stage B: ${PUE_CLAIMS.length - stageBDoneCount} of ${PUE_CLAIMS.length} claims not yet classified`,
      });
    }
    if (!stageCCountOk) {
      items.push({
        id: "r1-stageC",
        label: `Stage C: you've selected ${stageCSelected.length} of the required ${GAP_REQUIRED_COUNT} gap aspects`,
      });
    } else if (stageCMissingJustifications.length > 0) {
      for (const aspectId of stageCMissingJustifications) {
        const aspect = GAP_ASPECTS.find((a) => a.id === aspectId);
        items.push({
          id: `r1-stageC-${aspectId}`,
          label: `Stage C: add a justification for "${aspect?.label ?? aspectId}"`,
        });
      }
    }
    if (!stageDComplete) {
      items.push({
        id: "r1-stageD",
        label: `Stage D: ${SPLIT_ITEMS.length - stageDDoneCount} of ${SPLIT_ITEMS.length} items not yet placed`,
      });
    }
    return items;
  }, [
    nameComplete,
    stageAComplete,
    stageADoneCount,
    stageBComplete,
    stageBDoneCount,
    stageCCountOk,
    stageCSelected.length,
    stageCMissingJustifications,
    stageDComplete,
    stageDDoneCount,
  ]);

  return {
    hydrated,
    name,
    nameComplete,
    stageACategory,
    stageADoneCount,
    stageAComplete,
    stageBVerdict,
    stageBDoneCount,
    stageBComplete,
    stageCSelected,
    stageCJustification,
    stageCCountOk,
    stageCComplete,
    stageDPlacement,
    stageDDoneCount,
    stageDComplete,
    allComplete,
    missing,
  };
}
