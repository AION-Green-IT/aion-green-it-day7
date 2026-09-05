"use client";

import { useState } from "react";
import clsx from "clsx";
import { BUCKETS } from "@/lib/module3";
import { STORY2, L2 } from "@/lib/level2";
import { useProgress } from "@/lib/store";
import { useLevel1Note } from "@/lib/level1";
import { BucketBarChart } from "@/components/visuals/BucketBarChart";
import { ChevronDown, Check } from "@/components/icons/LineIcons";

/**
 * A read-only view of the learner's own Level 1 Diagnostic Note — the same
 * object, not restated content. Collapsed by default; the first expand records
 * `l2:refOpened`, which unlocks the Procurement and Governance sliders below.
 */
export function DiagnosticReference() {
  const note = useLevel1Note();
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const refOpened = useProgress((s) => !!s.checks[L2.refOpenedKey]);
  const [open, setOpen] = useState(false);

  const onToggle = () => {
    const next = !open;
    setOpen(next);
    if (next && !refOpened) toggleCheck(L2.refOpenedKey, true);
  };

  return (
    <div className="card overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <span className="flex-1">
          <span className="flex items-center gap-2">
            <span className="text-h3 text-ink">{STORY2.referenceTitle}</span>
            {refOpened ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-accentSoft px-2 py-0.5 text-micro font-semibold text-accent">
                <Check className="h-3 w-3" /> Reviewed
              </span>
            ) : null}
          </span>
          <span className="mt-0.5 block text-caption text-ash">{STORY2.referenceHint}</span>
        </span>
        <ChevronDown className={clsx("h-5 w-5 shrink-0 text-ash transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open ? (
        <div className="reveal-in border-t border-line p-4">
          {note.hasNote ? (
            <div className="grid gap-5 md:grid-cols-[280px_1fr]">
              <div>
                <p className="mb-1 text-micro font-semibold uppercase tracking-wide text-ash">
                  Signals per bucket
                </p>
                <BucketBarChart buckets={BUCKETS} counts={note.counts} />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-caption font-semibold text-ink">{STORY2.gapsLabel}</p>
                  <p className="mt-1 whitespace-pre-wrap text-caption text-ash">{note.gaps}</p>
                </div>
                <div>
                  <p className="text-caption font-semibold text-ink">{STORY2.opsLabel}</p>
                  <p className="mt-1 whitespace-pre-wrap text-caption text-ash">{note.opsVsStrategic}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-body text-ash">
              No saved Diagnostic Note found. Complete Level 1 to populate this.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
