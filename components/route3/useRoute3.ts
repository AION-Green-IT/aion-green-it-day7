"use client";

import { useMemo } from "react";
import { useProgress, useHydrated } from "@/lib/store";
import {
  R3,
  OBSERVATIONS,
  LEVERS3,
  REQUIRED_LEVER_COUNT,
  LOGIC_PRINCIPLES,
  TENSION_PAIRS,
  MIN_TRADEOFFS,
  APPROVAL_ROWS,
  type PerspectiveId,
  type Horizon3,
} from "@/lib/route3";

export type MissingItem = { id: string; label: string };

export function useRoute3() {
  const hydrated = useHydrated();
  const checks = useProgress((s) => s.checks);
  const choices = useProgress((s) => s.choices);
  const notes = useProgress((s) => s.notes);

  const name = hydrated ? notes[R3.name] ?? "" : "";
  const nameComplete = name.trim().length > 0;

  // === Phase 1 — Diagnostic ================================================
  const scanAssignments = useMemo(() => {
    const map: Record<string, PerspectiveId | undefined> = {};
    if (!hydrated) return map;
    for (const o of OBSERVATIONS) {
      const v = choices[R3.p1.scan(o.id)];
      if (v) map[o.id] = v as PerspectiveId;
    }
    return map;
  }, [hydrated, choices]);
  const scanDoneCount = Object.keys(scanAssignments).length;
  const scanComplete = scanDoneCount >= OBSERVATIONS.length;

  const selectedLeverIds = useMemo(
    () => (hydrated ? LEVERS3.filter((l) => checks[R3.p1.leverSelected(l.id)]).map((l) => l.id) : []),
    [hydrated, checks],
  );
  const leverSelectionComplete = selectedLeverIds.length === REQUIRED_LEVER_COUNT;

  const leverJustify = useMemo(() => {
    const map: Record<string, string> = {};
    if (!hydrated) return map;
    for (const l of LEVERS3) map[l.id] = notes[R3.p1.leverJustify(l.id)] ?? "";
    return map;
  }, [hydrated, notes]);
  const leversJustified = leverSelectionComplete && selectedLeverIds.every((id) => leverJustify[id]?.trim().length > 0);

  const leverHorizon = useMemo(() => {
    const map: Partial<Record<string, Horizon3>> = {};
    if (!hydrated) return map;
    for (const l of LEVERS3) {
      const v = choices[R3.p1.leverHorizon(l.id)];
      if (v) map[l.id] = v as Horizon3;
    }
    return map;
  }, [hydrated, choices]);
  const allHorizonsSet = leverSelectionComplete && selectedLeverIds.every((id) => !!leverHorizon[id]);

  const firstMeasure = hydrated ? choices[R3.p1.firstMeasure] ?? "" : "";
  const firstMeasureValid = leverSelectionComplete && selectedLeverIds.includes(firstMeasure);
  const firstMeasureJustify = hydrated ? notes[R3.p1.firstMeasureJustify] ?? "" : "";
  const firstMeasureJustifyValid = firstMeasureJustify.trim().length > 0;

  const phase1Complete =
    scanComplete && leverSelectionComplete && leversJustified && allHorizonsSet && firstMeasureValid && firstMeasureJustifyValid;

  // === Phase 2 — Builder ====================================================
  const strategicRelevance = hydrated ? notes[R3.p2.strategicRelevance] ?? "" : "";
  const strategicRelevanceValid = strategicRelevance.trim().length > 0;

  const guidingDecisions = useMemo(
    () => ([1, 2, 3] as const).map((n) => (hydrated ? notes[R3.p2.guidingDecision(n)] ?? "" : "")),
    [hydrated, notes],
  );
  const guidingDecisionsValid = guidingDecisions.every((d) => d.trim().length > 0);

  const selectedPrinciples = useMemo(
    () => (hydrated ? LOGIC_PRINCIPLES.filter((p) => checks[R3.p2.logicPrincipleSelected(p.id)]).map((p) => p.id) : []),
    [hydrated, checks],
  );
  const logicExplain = hydrated ? notes[R3.p2.logicExplain] ?? "" : "";
  const logicValid = selectedPrinciples.length > 0 && logicExplain.trim().length > 0;

  const selectedPairIds = useMemo(
    () => (hydrated ? TENSION_PAIRS.filter((p) => checks[R3.p2.tradeoffSelected(p.id)]).map((p) => p.id) : []),
    [hydrated, checks],
  );
  const tradeoffJustify = useMemo(() => {
    const map: Record<string, string> = {};
    if (!hydrated) return map;
    for (const p of TENSION_PAIRS) map[p.id] = notes[R3.p2.tradeoffJustify(p.id)] ?? "";
    return map;
  }, [hydrated, notes]);
  const tradeoffsValid =
    selectedPairIds.length >= MIN_TRADEOFFS && selectedPairIds.every((id) => tradeoffJustify[id]?.trim().length > 0);

  const recommendedMeasure = hydrated ? choices[R3.p2.recommendedMeasure] ?? "" : "";
  const recommendedJustify = hydrated ? notes[R3.p2.recommendedJustify] ?? "" : "";
  const recommendedValid = recommendedMeasure.trim().length > 0 && recommendedJustify.trim().length > 0;

  const approvalOwners = useMemo(() => {
    const map: Record<string, string> = {};
    if (!hydrated) return map;
    for (const row of APPROVAL_ROWS) map[row.id] = notes[R3.p2.approvalOwner(row.id)] ?? "";
    return map;
  }, [hydrated, notes]);
  const approvalValid = APPROVAL_ROWS.every((row) => approvalOwners[row.id]?.trim().length > 0);

  const decisionNow = hydrated ? notes[R3.p2.decisionNow] ?? "" : "";
  const decisionNowValid = decisionNow.trim().length > 0;

  const phase2Complete =
    strategicRelevanceValid && guidingDecisionsValid && logicValid && tradeoffsValid && recommendedValid && approvalValid && decisionNowValid;

  const allComplete = nameComplete && phase1Complete && phase2Complete;

  const missing = useMemo<MissingItem[]>(() => {
    const items: MissingItem[] = [];
    if (!nameComplete) items.push({ id: "r3-name", label: "Add your name so the export can be labelled correctly" });

    // Phase 1
    if (!scanComplete) {
      items.push({
        id: "r3-p1-scan",
        label: `Phase 1 — Diagnostic: ${OBSERVATIONS.length - scanDoneCount} of ${OBSERVATIONS.length} observations not yet assigned`,
      });
    }
    if (!leverSelectionComplete) {
      items.push({
        id: "r3-p1-levers",
        label: `Phase 1 — Diagnostic: lever selection incomplete — ${selectedLeverIds.length} of ${REQUIRED_LEVER_COUNT} required levers selected`,
      });
    } else {
      for (const id of selectedLeverIds) {
        if (!leverJustify[id]?.trim()) {
          items.push({ id: "r3-p1-levers", label: `Phase 1 — Diagnostic: justify the lever "${LEVERS3.find((l) => l.id === id)?.label}"` });
        }
      }
      for (const id of selectedLeverIds) {
        if (!leverHorizon[id]) {
          items.push({ id: "r3-p1-horizon", label: `Phase 1 — Diagnostic: tag a time horizon for "${LEVERS3.find((l) => l.id === id)?.label}"` });
        }
      }
      if (!firstMeasureValid) items.push({ id: "r3-p1-firstmeasure", label: "Phase 1 — Diagnostic: choose which lever AeroPulse should start with" });
      else if (!firstMeasureJustifyValid) items.push({ id: "r3-p1-firstmeasure", label: "Phase 1 — Diagnostic: justify the first-measure decision" });
    }

    // Phase 2
    if (!strategicRelevanceValid) items.push({ id: "r3-p2-strategic", label: "Phase 2 — Builder, Block 1: Strategic Relevance not yet answered" });
    guidingDecisions.forEach((d, i) => {
      if (!d.trim()) items.push({ id: "r3-p2-decisions", label: `Phase 2 — Builder, Block 2: Guiding decision #${i + 1} not yet answered` });
    });
    if (selectedPrinciples.length === 0) items.push({ id: "r3-p2-logic", label: "Phase 2 — Builder, Block 3: select at least one prioritisation-logic principle" });
    else if (!logicExplain.trim()) items.push({ id: "r3-p2-logic", label: "Phase 2 — Builder, Block 3: explain your chosen combination of principles" });
    if (selectedPairIds.length < MIN_TRADEOFFS) {
      items.push({
        id: "r3-p2-tradeoffs",
        label: `Phase 2 — Builder, Block 4: trade-off selection incomplete — ${selectedPairIds.length} of ${MIN_TRADEOFFS} required pairs selected`,
      });
    } else {
      for (const id of selectedPairIds) {
        if (!tradeoffJustify[id]?.trim()) {
          items.push({ id: "r3-p2-tradeoffs", label: `Phase 2 — Builder, Block 4: justify the pair "${TENSION_PAIRS.find((p) => p.id === id)?.label}"` });
        }
      }
    }
    if (!recommendedMeasure.trim()) items.push({ id: "r3-p2-recommended", label: "Phase 2 — Builder, Block 5: choose a recommended first measure" });
    else if (!recommendedJustify.trim()) items.push({ id: "r3-p2-recommended", label: "Phase 2 — Builder, Block 5: justify the recommended measure" });
    for (const row of APPROVAL_ROWS) {
      if (!approvalOwners[row.id]?.trim()) {
        items.push({ id: "r3-p2-approval", label: `Phase 2 — Builder, Block 6: name an Owner/Approver for "${row.label}"` });
      }
    }
    if (!decisionNowValid) items.push({ id: "r3-p2-decisionnow", label: "Phase 2 — Builder, Block 7: state the one decision to make now" });

    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    nameComplete,
    scanComplete,
    scanDoneCount,
    leverSelectionComplete,
    selectedLeverIds,
    leverJustify,
    leverHorizon,
    firstMeasureValid,
    firstMeasureJustifyValid,
    strategicRelevanceValid,
    guidingDecisions,
    selectedPrinciples,
    logicExplain,
    selectedPairIds,
    tradeoffJustify,
    recommendedMeasure,
    recommendedJustify,
    approvalOwners,
    decisionNowValid,
  ]);

  return {
    hydrated,
    name,
    nameComplete,
    // phase 1
    scanAssignments,
    scanDoneCount,
    scanComplete,
    selectedLeverIds,
    leverSelectionComplete,
    leverJustify,
    leversJustified,
    leverHorizon,
    allHorizonsSet,
    firstMeasure,
    firstMeasureValid,
    firstMeasureJustify,
    firstMeasureJustifyValid,
    phase1Complete,
    // phase 2
    strategicRelevance,
    strategicRelevanceValid,
    guidingDecisions,
    guidingDecisionsValid,
    selectedPrinciples,
    logicExplain,
    logicValid,
    selectedPairIds,
    tradeoffJustify,
    tradeoffsValid,
    recommendedMeasure,
    recommendedJustify,
    recommendedValid,
    approvalOwners,
    approvalValid,
    decisionNow,
    decisionNowValid,
    phase2Complete,
    allComplete,
    missing,
  };
}
