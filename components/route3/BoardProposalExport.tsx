"use client";

import { useState } from "react";
import { useProgress } from "@/lib/store";
import { markRouteExported } from "@/lib/routeGating";
import { R3, CONFLICT_OPTIONS, MIN_CONFLICTS, RACI_DECISIONS, TASK3 } from "@/lib/route3";
import { useRoute3 } from "./useRoute3";
import { useBoardProposalDocData } from "./useBoardProposalDocData";
import { BoardProposalReportDoc } from "./BoardProposalReportDoc";
import { exportFilename, printAsFile } from "@/lib/exportFilename";
import { scrollToAndFlash } from "@/lib/scrollToAndFlash";
import { MissingList } from "@/components/ui/MissingList";
import { Lock, Close } from "@/components/icons/LineIcons";

export function BoardProposalExport() {
  const r3 = useRoute3();
  const setNote = useProgress((s) => s.setNote);
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const data = useBoardProposalDocData();
  const [open, setOpen] = useState(false);

  const canExport = r3.hydrated && r3.exportEnabled;

  const missing = [
    !r3.strategicRelevanceValid && { id: "r3-strategic", label: "Section 1 — Strategic Relevance" },
    ...r3.keyDecisions
      .map((d, i) => ({ d, i }))
      .filter(({ d }) => !d.trim())
      .map(({ i }) => ({ id: "r3-keydecisions", label: `Section 2 — Decision ${i + 1} of 3 is empty` })),
    !r3.prioritizationLogicValid && { id: "r3-prioritization", label: "Section 3 — Prioritization Logic" },
    r3.selectedConflictIds.length < MIN_CONFLICTS && {
      id: "r3-conflicts",
      label: `Section 4 — select at least ${MIN_CONFLICTS} goal conflicts`,
    },
    ...r3.selectedConflictIds
      .filter((id) => !r3.conflictJustify[id]?.trim())
      .map((id) => ({ id: "r3-conflicts", label: `Section 4 — justify why "${CONFLICT_OPTIONS.find((c) => c.id === id)?.label}" matters` })),
    !r3.firstPriorityValid && { id: "r3-firstpriority", label: "Section 5 — Recommended First-Priority Path" },
    ...r3.raciMissingAccountable.map((id) => ({
      id: `r3-raci-${id}`,
      label: `Section 6 — assign an Accountable owner for "${RACI_DECISIONS.find((d) => d.id === id)?.label}"`,
    })),
    !r3.incompleteDataValid && { id: "r3-incomplete", label: "Section 7 — Decisions to Make Now Despite Incomplete Data" },
  ].filter(Boolean) as { id: string; label: string }[];

  const download = () => {
    printAsFile(exportFilename(r3.name, TASK3.export.filenameSuffix));
    markRouteExported(toggleCheck, 3);
  };

  return (
    <div className="border-t border-line pt-6">
      <button
        type="button"
        onClick={() => (canExport ? setOpen(true) : scrollToAndFlash("r3-export-missing"))}
        className="btn-accent flex items-center gap-2"
        aria-describedby={canExport ? undefined : "r3-export-missing"}
      >
        {!canExport && <Lock className="h-4 w-4" />}
        Export {TASK3.export.taskLabel}
      </button>
      {!canExport && (
        <div id="r3-export-missing" className="mt-2 p-1">
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
                <p className="text-micro text-ash">Used to build your export filename — e.g. "6-jane-day6-board-proposal".</p>
                <input
                  value={r3.name}
                  onChange={(e) => setNote(R3.name, e.target.value)}
                  placeholder="Full name"
                  className="mt-1 w-full max-w-xs rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
                />
              </label>
              <div className="rounded-xl border border-line bg-canvas p-5">
                <BoardProposalReportDoc data={data} />
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
