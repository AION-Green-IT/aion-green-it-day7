"use client";

import { useState } from "react";
import { useProgress } from "@/lib/store";
import { markRouteExported } from "@/lib/routeGating";
import { LEARNER_NAME_KEY } from "@/lib/route1";
import { TASK2 } from "@/lib/route2";
import { useRoute2 } from "./useRoute2";
import { useProcurementDocData } from "./useProcurementDocData";
import { ProcurementReportDoc } from "./ProcurementReportDoc";
import { exportFilename, printAsFile } from "@/lib/exportFilename";
import { Lock, Close } from "@/components/icons/LineIcons";

export function ProcurementExport() {
  const r2 = useRoute2();
  const setNote = useProgress((s) => s.setNote);
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const data = useProcurementDocData();
  const [open, setOpen] = useState(false);

  const canExport = r2.hydrated && r2.exportEnabled;

  const download = () => {
    printAsFile(exportFilename(r2.name, 2));
    markRouteExported(toggleCheck, 2);
  };

  return (
    <div className="border-t border-line pt-6">
      <button
        type="button"
        disabled={!canExport}
        onClick={() => setOpen(true)}
        className="btn-accent flex items-center gap-2 disabled:cursor-not-allowed"
      >
        {!canExport && <Lock className="h-4 w-4" />}
        Export {TASK2.export.taskLabel}
      </button>
      {!canExport && <p className="mt-2 text-caption text-ash">Complete Steps 1–4 to unlock export.</p>}

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
                <input
                  value={r2.name}
                  onChange={(e) => setNote(LEARNER_NAME_KEY, e.target.value)}
                  placeholder="Full name for the export filename"
                  className="mt-1 w-full max-w-xs rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
                />
              </label>
              <div className="rounded-xl border border-line bg-canvas p-5">
                <ProcurementReportDoc data={data} />
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
