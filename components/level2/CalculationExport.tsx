"use client";

import { useEffect, useState } from "react";
import { TASK2 } from "@/lib/level2";
import { useProgress, useHydrated } from "@/lib/store";
import { useLevel2 } from "./useLevel2";
import { exportFilename, printAsFile } from "@/lib/exportFilename";
import { CalculationDoc } from "./CalculationDoc";
import { useCalcDoc } from "./useCalcDoc";
import { Close, Lock } from "@/components/icons/LineIcons";

/**
 * Section 3.5 — the Calculation Note export. Disabled until both reflection
 * fields are written; opens a live preview and prints via Save-as-PDF. Content
 * is already persisted in the store and pulled forward into Level 3.
 */
export function CalculationExport() {
  const hydrated = useHydrated();
  const { reflectionComplete } = useLevel2();
  const name = useProgress((s) => s.notes["learner:name"] ?? "");
  const setNote = useProgress((s) => s.setNote);
  const [open, setOpen] = useState(false);
  const data = useCalcDoc();

  const canExport = hydrated && reflectionComplete;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const download = () => printAsFile(exportFilename(name, 2));

  return (
    <div className="card p-5">
      <h3 className="text-h3 text-ink">{TASK2.export.controlsTitle}</h3>
      <p className="mt-1 max-w-prose text-body text-ash">{TASK2.export.controlsIntro}</p>

      <label className="mt-4 block max-w-xs">
        <span className="mb-1 block text-caption font-semibold text-ink">Learner name</span>
        <input
          type="text"
          value={hydrated ? name : ""}
          onChange={(e) => setNote("learner:name", e.target.value)}
          placeholder="Your name"
          className="w-full rounded-xl border border-line bg-paper p-2.5 text-body text-ink placeholder:text-ash/60 focus:border-accent"
        />
      </label>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" disabled={!canExport} onClick={() => setOpen(true)} className="btn-accent">
          {TASK2.export.openLabel}
        </button>
        {!canExport ? (
          <span className="inline-flex items-center gap-1.5 text-caption text-ash">
            <Lock className="h-4 w-4" /> {TASK2.export.disabledHint}
          </span>
        ) : null}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 print:hidden"
          style={{ backgroundColor: "var(--backdrop)" }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div role="dialog" aria-modal="true" aria-label={TASK2.export.docHeading} className="my-8 w-full max-w-3xl rounded-2xl bg-paper shadow-lg">
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
              <p className="text-h3 text-ink">Preview</p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={download} className="btn-accent px-3 py-2 text-caption">
                  {TASK2.export.downloadLabel}
                </button>
                <button type="button" onClick={() => setOpen(false)} aria-label={TASK2.export.closeLabel} className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-ink hover:border-ash">
                  <Close className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="max-h-[70vh] overflow-y-auto bg-mist/50 p-4 sm:p-6">
              <div className="mx-auto max-w-[720px] rounded-lg bg-paper p-6 shadow-sm sm:p-8">
                <CalculationDoc data={data} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
