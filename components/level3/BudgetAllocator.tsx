"use client";

import clsx from "clsx";
import { BUDGET_ITEMS, BUDGET_CEILING_3, TASK3, L3, eur3 } from "@/lib/level3";
import { OPTION_A, OPTION_B, OPTION_C } from "@/lib/level2";
import { useProgress } from "@/lib/store";
import { useLevel3 } from "./useLevel3";
import { Check } from "@/components/icons/LineIcons";

const OPT_LABELS: Record<string, string> = { a: OPTION_A.key, b: OPTION_B.key, c: OPTION_C.key };

export function BudgetAllocator() {
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const choose = useProgress((s) => s.choose);
  const st = useLevel3();

  const pct = Math.min(100, (st.spent / BUDGET_CEILING_3) * 100);

  return (
    <div className="card p-5">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-h3 text-ink">{TASK3.budgetTitle.replace(/^3\.1 · /, "")}</h3>
        <span className="text-caption text-ash">{TASK3.budgetCeilingLabel}</span>
      </div>

      <div className="space-y-2">
        {/* Chosen L2 initiative */}
        <div className="rounded-xl border border-line p-3">
          <div className="flex items-start gap-3">
            <Checkbox checked={st.fundChosen} onChange={() => toggleCheck(BUDGET_ITEMS.chosen.key, !st.fundChosen)} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-body font-semibold text-ink">{BUDGET_ITEMS.chosen.label}</span>
                <span className="tabular-nums text-readout text-ink" style={{ transition: "color 150ms ease" }}>{eur3(st.chosenCost)}</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                {(["a", "b", "c"] as const).map((o) => (
                  <button
                    key={o}
                    type="button"
                    aria-pressed={st.chosenOpt === o}
                    onClick={() => choose(L3.chosenOptKey, o)}
                    className={clsx(
                      "rounded-lg border px-2.5 py-1 text-caption font-semibold transition-colors duration-150",
                      st.chosenOpt === o ? "border-accent bg-accent text-paper" : "border-line text-ink hover:border-ash",
                    )}
                    title={OPT_LABELS[o]}
                  >
                    {o.toUpperCase()}
                  </button>
                ))}
                <span className="ml-1 text-micro text-ash">pulled from your Calculation Note — cost fixed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Governance (fixed) */}
        <BudgetRow
          checked={st.fundGov}
          onChange={() => toggleCheck(BUDGET_ITEMS.governance.key, !st.fundGov)}
          label={BUDGET_ITEMS.governance.label}
          amount={BUDGET_ITEMS.governance.amount}
        />

        {/* Audit (optional) */}
        <BudgetRow
          checked={st.fundAudit}
          onChange={() => toggleCheck(BUDGET_ITEMS.audit.key, !st.fundAudit)}
          label={BUDGET_ITEMS.audit.label}
          amount={BUDGET_ITEMS.audit.amount}
        />
      </div>

      {/* bar */}
      <div className="mt-4">
        <div className="h-3 w-full overflow-hidden rounded-full bg-mist">
          <div
            className={clsx("h-full rounded-full transition-[width,background-color] duration-300", st.overBudget ? "bg-danger" : "bg-accent")}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-caption text-ash">Committed: <span className="font-semibold tabular-nums text-ink">{eur3(st.spent)}</span> / {eur3(BUDGET_CEILING_3)}</span>
          <span className={clsx("text-body font-semibold tabular-nums", st.overBudget ? "text-danger" : "text-ink")}>
            {st.overBudget ? `Over by ${eur3(-st.remaining)}` : `${TASK3.remainingLabel}: ${eur3(st.remaining)}`}
          </span>
        </div>
        {st.overBudget ? <p className="mt-1 text-caption font-semibold text-danger">{TASK3.overBudgetLabel}</p> : null}
      </div>
    </div>
  );
}

function BudgetRow({ checked, onChange, label, amount }: { checked: boolean; onChange: () => void; label: string; amount: number }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line p-3">
      <Checkbox checked={checked} onChange={onChange} />
      <span className="flex-1 text-body text-ink">{label}</span>
      <span className="tabular-nums text-readout text-ink">{eur3(amount)}</span>
    </div>
  );
}

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={clsx(
        "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors duration-150",
        checked ? "border-accent bg-accent text-paper" : "border-line bg-paper text-transparent hover:border-ash",
      )}
    >
      <Check className="h-4 w-4" />
    </button>
  );
}
