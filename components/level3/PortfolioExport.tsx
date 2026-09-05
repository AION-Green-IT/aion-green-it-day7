"use client";

import { useEffect, useState } from "react";
import { TASK3 } from "@/lib/level3";
import { useHydrated } from "@/lib/store";
import { useLevel3 } from "./useLevel3";
import { exportFilename, printAsFile } from "@/lib/exportFilename";
import { PortfolioDoc } from "./PortfolioDoc";
import { Close, Lock } from "@/components/icons/LineIcons";

/**
 * Section 3.5 — submit. Enabled only when every field is complete, the sequence
 * is sorted, and the budget balances. Opens a preview of the combined
 * three-note portfolio and prints it via Save-as-PDF.
 */
export function PortfolioExport() {
  const hydrated = useHydrated();
  const { submitEnabled, name } = useLevel3();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const download = () => printAsFile(exportFilename(name, 3));

  return (
    <div className="card p-5">
      <h3 className="text-h3 text-ink">{TASK3.export.controlsTitle}</h3>
      <p className="mt-1 max-w-prose text-body text-ash">{TASK3.export.controlsIntro}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" disabled={!(hydrated && submitEnabled)} onClick={() => setOpen(true)} className="btn-accent">
          {TASK3.export.openLabel}
        </button>
        {hydrated && !submitEnabled ? (
          <span className="inline-flex items-center gap-1.5 text-caption text-ash">
            <Lock className="h-4 w-4" /> {TASK3.export.disabledHint}
          </span>
        ) : null}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 print:hidden"
          style={{ backgroundColor: "var(--backdrop)" }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div role="dialog" aria-modal="true" aria-label={TASK3.export.portfolioTitle} className="my-8 w-full max-w-3xl rounded-2xl bg-paper shadow-lg">
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
              <p className="text-h3 text-ink">Portfolio preview</p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={download} className="btn-accent px-3 py-2 text-caption">{TASK3.export.downloadLabel}</button>
                <button type="button" onClick={() => setOpen(false)} aria-label={TASK3.export.closeLabel} className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-ink hover:border-ash">
                  <Close className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="max-h-[72vh] overflow-y-auto bg-mist/50 p-4 sm:p-6">
              <div className="mx-auto max-w-[720px] rounded-lg bg-paper p-6 shadow-sm sm:p-8">
                <PortfolioDoc />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
