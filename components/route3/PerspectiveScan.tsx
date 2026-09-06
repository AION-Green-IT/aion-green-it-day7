"use client";

import { useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R3, OBSERVATIONS, PERSPECTIVES } from "@/lib/route3";
import { useRoute3 } from "./useRoute3";
import { ClueToggle } from "@/components/ui/ClueToggle";
import { ConfidenceHint } from "@/components/ui/ConfidenceHint";
import { Check, ChevronDown } from "@/components/icons/LineIcons";

/** Rapid Multi-Perspective Scan — same click-to-sort mechanic as Route 1's Evidence Sorter, faster pace, 6 buckets. */
export function PerspectiveScan() {
  const r3 = useRoute3();
  const choose = useProgress((s) => s.choose);
  const [openId, setOpenId] = useState<string | null>(OBSERVATIONS[0]?.id ?? null);

  return (
    <div id="r3-p1-scan">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-caption text-ash">Click an observation to assign it.</p>
        <p className="text-caption tabular-nums text-ash">
          Assigned: <span className="font-semibold text-ink">{r3.scanDoneCount}</span> / {OBSERVATIONS.length}
        </p>
      </div>

      <div className="mt-3 space-y-2">
        {OBSERVATIONS.map((obs) => {
          const picked = r3.scanAssignments[obs.id];
          const open = openId === obs.id;
          const matched = picked ? picked === obs.correctPerspective : null;
          const pickedLabel = picked ? PERSPECTIVES.find((p) => p.id === picked)?.label : undefined;

          return (
            <div key={obs.id} className="rounded-xl border border-line">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : obs.id)}
                aria-expanded={open}
                className="flex w-full items-center gap-3 p-3 text-left"
              >
                <span
                  className={clsx(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                    picked ? "bg-accent text-paper" : "bg-mist text-ash",
                  )}
                >
                  {picked && <Check className="h-3 w-3" />}
                </span>
                <span className="flex-1 text-caption text-ink">{obs.text}</span>
                {pickedLabel && (
                  <span className="shrink-0 rounded-full bg-accentSoft px-2 py-0.5 text-micro font-semibold text-accent">{pickedLabel}</span>
                )}
                <ChevronDown className={clsx("h-4 w-4 shrink-0 text-ash transition-transform duration-150", open && "rotate-180")} />
              </button>

              {open && (
                <div className="reveal-in border-t border-line p-3">
                  <p className="text-micro font-semibold uppercase tracking-wide text-ash">Assign to:</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {PERSPECTIVES.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => choose(R3.p1.scan(obs.id), p.id)}
                        aria-pressed={picked === p.id}
                        className={clsx(
                          "rounded-lg border px-2.5 py-1.5 text-micro font-semibold transition-colors duration-150",
                          picked === p.id ? "border-accent bg-accentSoft text-accent" : "border-line text-ink hover:border-ash",
                        )}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                  <ConfidenceHint matched={matched} />
                  <ClueToggle clue={obs.clue} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
