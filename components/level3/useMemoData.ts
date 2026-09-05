"use client";

import { useEffect, useState } from "react";
import {
  BUDGET_ITEMS,
  SEQUENCE_CHIPS,
  SEQUENCE_COLUMNS,
  targetLine,
  eur3,
} from "@/lib/level3";
import { OPTION_A, OPTION_B, OPTION_C, TASK2 } from "@/lib/level2";
import { useProgress } from "@/lib/store";
import { useLevel3 } from "./useLevel3";

const OPT_LABEL: Record<string, string> = { a: OPTION_A.label, b: OPTION_B.label, c: OPTION_C.label };

export type MemoData = ReturnType<typeof useMemoData>;

export function useMemoData() {
  const st = useLevel3();
  const l2priority = useProgress((s) => s.notes[TASK2.reflection.fieldA.key] ?? "");
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }));
  }, []);

  const funded: { label: string; amount: number }[] = [];
  if (st.fundChosen) funded.push({ label: OPT_LABEL[st.chosenOpt] ?? "Chosen initiative", amount: st.chosenCost });
  if (st.fundGov) funded.push({ label: BUDGET_ITEMS.governance.label, amount: BUDGET_ITEMS.governance.amount });
  if (st.fundAudit) funded.push({ label: BUDGET_ITEMS.audit.label, amount: BUDGET_ITEMS.audit.amount });

  const roadmap = SEQUENCE_COLUMNS.map((col) => ({
    label: col.label,
    items: SEQUENCE_CHIPS.filter((c) => st.placements[c.id] === col.id).map((c) => c.text),
  }));

  return {
    name: st.name,
    date,
    l1gaps: st.l1.gaps,
    l2priority,
    targetSentence: targetLine(st.target.baseline, st.target.pct, st.target.year),
    targetRationale: st.target.rationale,
    governance: st.governance,
    accountability: st.accountability,
    investment: st.investment,
    supplier: st.supplier,
    funded,
    spent: st.spent,
    remaining: st.remaining,
    overBudget: st.overBudget,
    roadmap,
    postponed: st.postponed,
    eur: eur3,
  };
}
