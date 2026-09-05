"use client";

import clsx from "clsx";
import { useRoute1 } from "./useRoute1";
import { Check } from "@/components/icons/LineIcons";

const STEP_LABELS = ["Explorer", "Tagging", "Calculator", "Analysis", "Pushback"];

/** Task-local progress: which of the 5 steps are done, and which is next. */
export function MiniStepper() {
  const r1 = useRoute1();
  const complete = [r1.step1Complete, r1.step2Complete, r1.step3Complete, r1.step4Complete, r1.step5Complete];
  const firstIncomplete = complete.findIndex((c) => !c);
  const current = firstIncomplete === -1 ? 5 : firstIncomplete + 1;

  return (
    <ol className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-paper p-2">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const done = complete[i];
        const active = n === current;
        return (
          <li
            key={label}
            className={clsx(
              "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-caption font-semibold transition-colors duration-200",
              active ? "bg-accent text-paper" : done ? "text-accent" : "text-ash",
            )}
          >
            {done ? <Check className="h-3.5 w-3.5" /> : <span className="tabular-nums">{n}</span>}
            <span className="hidden sm:inline">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
