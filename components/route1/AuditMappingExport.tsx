"use client";

import { useState } from "react";
import { useProgress } from "@/lib/store";
import { R1, TASK1A } from "@/lib/route1";
import { useRoute1 } from "./useRoute1";
import { useAuditMappingDocData } from "./useAuditMappingDocData";
import { AuditMappingReportDoc } from "./AuditMappingReportDoc";
import { exportFilename, printAsFile } from "@/lib/exportFilename";
import { scrollToAndFlash } from "@/lib/scrollToAndFlash";
import { MissingList } from "@/components/ui/MissingList";
import { Lock, Close } from "@/components/icons/LineIcons";

export function AuditMappingExport() {
  const r1 = useRoute1();
  const setNote = useProgress((s) => s.setNote);
  const setPrintTarget = useProgress((s) => s.setPrintTarget);
  const data = useAuditMappingDocData();
  const [open, setOpen] = useState(false);

  const canExport = r1.hydrated && r1.auditMappingExportEnabled;

  const missing = [
    !r1.step1aStep1Complete && { id: "r1a-step1", label: "Step 1 — diagnose every zone on the facility map" },
    !r1.allZonesClassified && { id: "r1a-step2", label: "Step 2 — classify every zone (impact type and horizon)" },
    r1.allZonesClassified && !r1.priorityZone && { id: "r1a-step2", label: "Step 2 — pick your top-priority zone" },
    r1.allZonesClassified && !r1.improvementApproach.trim() && { id: "r1a-step2", label: "Step 2 — describe the improvement approach" },
  ].filter(Boolean) as { id: string; label: string }[];

  const download = () => {
    setPrintTarget("r1-audit-mapping");
    printAsFile(exportFilename(r1.name, TASK1A.export.filenameSuffix));
  };

  return (
    <div className="border-t border-line pt-6">
      <button
        type="button"
        onClick={() => (canExport ? setOpen(true) : scrollToAndFlash("r1a-export-missing"))}
        className="btn-accent flex items-center gap-2"
        aria-describedby={canExport ? undefined : "r1a-export-missing"}
      >
        {!canExport && <Lock className="h-4 w-4" />}
        Export {TASK1A.export.taskLabel}
      </button>
      {!canExport && (
        <div id="r1a-export-missing" className="mt-2 p-1">
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
                <p className="text-micro text-ash">Used to build your export filename — e.g. "6-jane-day6-audit-mapping".</p>
                <input
                  value={r1.name}
                  onChange={(e) => setNote(R1.name, e.target.value)}
                  placeholder="Full name"
                  className="mt-1 w-full max-w-xs rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
                />
              </label>
              <div className="rounded-xl border border-line bg-canvas p-5">
                <AuditMappingReportDoc data={data} />
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
