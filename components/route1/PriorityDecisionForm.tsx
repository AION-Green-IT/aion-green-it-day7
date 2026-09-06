"use client";

import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R1, SIM_OPTIONS, TASK1B } from "@/lib/route1";
import { useRoute1 } from "./useRoute1";
import { IndustryCallout } from "@/components/ui/IndustryCallout";

/** Task 1b, Step 2 — commit to one option, justify it, then get a reflective (non-graded) consulting note. */
export function PriorityDecisionForm() {
  const r1 = useRoute1();
  const choose = useProgress((s) => s.choose);
  const setNote = useProgress((s) => s.setNote);

  const selected = SIM_OPTIONS.find((o) => o.id === r1.simOption);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        {SIM_OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => choose(R1.simOption, o.id)}
            aria-pressed={r1.simOption === o.id}
            className={clsx(
              "w-full rounded-xl border p-3 text-left transition-colors duration-150",
              r1.simOption === o.id ? "border-accent bg-accentSoft" : "border-line hover:border-ash",
            )}
          >
            <p className="text-caption font-semibold text-ink">{o.label}</p>
            <p className="text-micro text-ash">{o.headline}</p>
          </button>
        ))}
      </div>

      {selected && (
        <div className="reveal-in space-y-4 border-t border-line pt-4">
          <label className="block">
            <span className="text-caption font-semibold text-ink">{TASK1B.step2.whyLabel}</span>
            <p className="text-micro text-ash">{TASK1B.step2.whyCaption}</p>
            <textarea
              value={r1.simWhy}
              onChange={(e) => setNote(R1.simWhy, e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
            />
          </label>
          <label className="block">
            <span className="text-caption font-semibold text-ink">{TASK1B.step2.followOnLabel}</span>
            <p className="text-micro text-ash">{TASK1B.step2.followOnCaption}</p>
            <textarea
              value={r1.simFollowOn}
              onChange={(e) => setNote(R1.simFollowOn, e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-caption font-semibold text-ink">{TASK1B.step2.risk1Label}</span>
              <p className="text-micro text-ash">{TASK1B.step2.riskCaption}</p>
              <textarea
                value={r1.simRisk1}
                onChange={(e) => setNote(R1.simRisk1, e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
              />
            </label>
            <label className="block">
              <span className="text-caption font-semibold text-ink">{TASK1B.step2.risk2Label}</span>
              <p className="text-micro text-ash">{TASK1B.step2.riskCaption}</p>
              <textarea
                value={r1.simRisk2}
                onChange={(e) => setNote(R1.simRisk2, e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
              />
            </label>
          </div>

          <IndustryCallout label="Consulting note" text={selected.note} />
        </div>
      )}
    </div>
  );
}
