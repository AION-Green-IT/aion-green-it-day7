"use client";

import { useState } from "react";
import { useProgress } from "@/lib/store";
import { markRouteExported } from "@/lib/routeGating";
import { R2, LEVERS, REQUIRED_LEVER_COUNT, TASK2 } from "@/lib/route2";
import { useRoute2 } from "./useRoute2";
import { useTradeoffDocData } from "./useTradeoffDocData";
import { TradeoffReportDoc } from "./TradeoffReportDoc";
import { exportFilename, printAsFile } from "@/lib/exportFilename";
import { scrollToAndFlash } from "@/lib/scrollToAndFlash";
import { MissingList } from "@/components/ui/MissingList";
import { Lock, Close } from "@/components/icons/LineIcons";

export function TradeoffExport() {
  const r2 = useRoute2();
  const setNote = useProgress((s) => s.setNote);
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const data = useTradeoffDocData();
  const [open, setOpen] = useState(false);

  const canExport = r2.hydrated && r2.exportEnabled;

  const missing = [
    !r2.selectionComplete && { id: "r2-levers", label: `Select exactly ${REQUIRED_LEVER_COUNT} levers` },
    ...r2.selectedIds
      .filter((id) => !r2.leverJustify[id]?.trim())
      .map((id) => ({ id: "r2-levers", label: `Justify your selection: ${LEVERS.find((l) => l.id === id)?.label}` })),
    ...(r2.selectionComplete
      ? r2.selectedIds
          .filter((id) => !r2.leverHorizon[id])
          .map((id) => ({ id: "r2-horizon", label: `Classify the horizon for: ${LEVERS.find((l) => l.id === id)?.label}` }))
      : []),
    r2.selectionComplete && !r2.firstStep && { id: "r2-first-step", label: "Choose which lever should go first" },
    r2.selectionComplete && !!r2.firstStep && !r2.firstStepJustify.trim() && { id: "r2-first-step", label: "Justify the first-step decision, management-framed" },
    !r2.infoGaps.trim() && { id: "r2-infogaps", label: "Name the information gaps" },
  ].filter(Boolean) as { id: string; label: string }[];

  const download = () => {
    printAsFile(exportFilename(r2.name, TASK2.export.filenameSuffix));
    markRouteExported(toggleCheck, 2);
  };

  return (
    <div className="border-t border-line pt-6">
      <button
        type="button"
        onClick={() => (canExport ? setOpen(true) : scrollToAndFlash("r2-export-missing"))}
        className="btn-accent flex items-center gap-2"
        aria-describedby={canExport ? undefined : "r2-export-missing"}
      >
        {!canExport && <Lock className="h-4 w-4" />}
        Export {TASK2.export.taskLabel}
      </button>
      {!canExport && (
        <div id="r2-export-missing" className="mt-2 p-1">
          <MissingList items={missing} />
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "var(--backdrop)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div role="dialog" aria-modal="true" className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-2xl bg-paper shadow-lg">
            <div className="flex items-center justify-between border-b border-line p-4">
              <h2 className="text-h3 text-ink">Export preview</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-ash hover:text-ink">
                <Close className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <label className="mb-4 block">
                <span className="text-caption font-semibold text-ink">Your name</span>
                <p className="text-micro text-ash">Used to build your export filename — e.g. "6-jane-day6-tradeoff-analysis".</p>
                <input
                  value={r2.name}
                  onChange={(e) => setNote(R2.name, e.target.value)}
                  placeholder="Full name"
                  className="mt-1 w-full max-w-xs rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
                />
              </label>
              <div className="rounded-xl border border-line bg-canvas p-5">
                <TradeoffReportDoc data={data} />
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-line p-4">
              <button type="button" onClick={() => setOpen(false)} className="btn-ghost">
                Close
              </button>
              <button type="button" onClick={download} className="btn-accent">
                Download as PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
