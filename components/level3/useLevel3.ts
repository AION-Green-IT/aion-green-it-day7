"use client";

import { useHydrated, useProgress } from "@/lib/store";
import { useLevel1Note } from "@/lib/level1";
import { useLevel2 } from "@/components/level2/useLevel2";
import {
  BUDGET_CEILING_3,
  BUDGET_ITEMS,
  FIELDS,
  L3,
  SEQUENCE_CHIPS,
  isGenericRole,
  seqKey,
} from "@/lib/level3";

export type Level3State = ReturnType<typeof useLevel3>;

export function useLevel3() {
  const hydrated = useHydrated();
  const seen = useProgress((s) => s.seen);
  const choices = useProgress((s) => s.choices);
  const checks = useProgress((s) => s.checks);
  const notes = useProgress((s) => s.notes);

  const l1 = useLevel1Note();
  const l2 = useLevel2();

  const materialOpened = hydrated ? seen[L3.materialKey] ?? [] : [];

  // --- Budget ---
  const chosenOpt = (hydrated ? choices[L3.chosenOptKey] : undefined) ?? "b";
  const chosenCost = l2.results[chosenOpt as "a" | "b" | "c"]?.budget ?? 0;
  const boolAt = (key: string, def: boolean) => (hydrated && key in checks ? checks[key] : def);
  const fundChosen = boolAt(BUDGET_ITEMS.chosen.key, BUDGET_ITEMS.chosen.defaultOn);
  const fundGov = boolAt(BUDGET_ITEMS.governance.key, BUDGET_ITEMS.governance.defaultOn);
  const fundAudit = boolAt(BUDGET_ITEMS.audit.key, BUDGET_ITEMS.audit.defaultOn);
  const spent =
    (fundChosen ? chosenCost : 0) +
    (fundGov ? BUDGET_ITEMS.governance.amount : 0) +
    (fundAudit ? BUDGET_ITEMS.audit.amount : 0);
  const remaining = BUDGET_CEILING_3 - spent;
  const overBudget = remaining < 0;

  // --- Fields ---
  const note = (k: string) => (hydrated ? notes[k] ?? "" : "");
  const choice = (k: string) => (hydrated ? choices[k] ?? "" : "");

  const target = {
    baseline: note(FIELDS.target.baselineKey),
    pct: note(FIELDS.target.pctKey),
    year: choice(FIELDS.target.yearKey),
    rationale: note(FIELDS.target.rationaleKey),
  };
  const targetComplete = !!(target.baseline && target.pct && target.year);

  const owner = note(FIELDS.governance.ownerKey);
  const governance = {
    owner,
    ownerValid: !!owner && !isGenericRole(owner),
    cadence: choice(FIELDS.governance.cadenceKey),
    escalation: note(FIELDS.governance.escalationKey),
  };
  const governanceComplete = governance.ownerValid && !!governance.cadence && !!governance.escalation;

  const investment = {
    stage: choice(FIELDS.investment.stageKey),
    rationale: note(FIELDS.investment.rationaleKey),
  };
  const investmentComplete = !!investment.stage && !!investment.rationale;

  const supplier = {
    cadence: choice(FIELDS.supplier.cadenceKey),
    rationale: note(FIELDS.supplier.rationaleKey),
  };
  const supplierComplete = !!supplier.cadence && !!supplier.rationale;

  const role = note(FIELDS.accountability.roleKey);
  const accountability = { role, roleValid: !!role && !isGenericRole(role) };
  const accountabilityComplete = accountability.roleValid;

  const allFieldsComplete =
    targetComplete && governanceComplete && investmentComplete && supplierComplete && accountabilityComplete;

  // --- Sequencing ---
  const placements: Record<string, string> = {};
  if (hydrated) {
    for (const c of SEQUENCE_CHIPS) {
      const col = choices[seqKey(c.id)];
      if (col) placements[c.id] = col;
    }
  }
  const seqPlaced = Object.keys(placements).length;
  const seqComplete = seqPlaced >= SEQUENCE_CHIPS.length;

  // --- Closing ---
  const postponed = note("l3:postponed");
  const closingComplete = postponed.trim().length > 0;

  const submitEnabled =
    hydrated && allFieldsComplete && seqComplete && closingComplete && !overBudget;

  return {
    hydrated,
    materialOpened,
    l1,
    l2,
    name: notes["learner:name"] ?? "",
    chosenOpt,
    chosenCost,
    fundChosen,
    fundGov,
    fundAudit,
    spent,
    remaining,
    overBudget,
    target,
    targetComplete,
    governance,
    governanceComplete,
    investment,
    investmentComplete,
    supplier,
    supplierComplete,
    accountability,
    accountabilityComplete,
    allFieldsComplete,
    placements,
    seqPlaced,
    seqComplete,
    postponed,
    closingComplete,
    submitEnabled,
  };
}
