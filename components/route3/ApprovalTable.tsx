"use client";

import { useState } from "react";
import { useProgress } from "@/lib/store";
import { R3, APPROVAL_ROWS } from "@/lib/route3";
import { GovernanceFlowDiagram } from "@/components/ui/GovernanceFlowDiagram";
import { ChevronDown } from "@/components/icons/LineIcons";
import clsx from "clsx";
import { t } from "@/lib/i18n/core";

export function ApprovalTable() {
  const notes = useProgress((s) => s.notes);
  const setNote = useProgress((s) => s.setNote);
  const [showReference, setShowReference] = useState(false);

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-caption">
          <thead>
            <tr className="border-b border-line bg-canvas text-left">
              <th className="p-3 font-semibold text-ink">Decision type</th>
              <th className="p-3 font-semibold text-ink">Owner / Approver</th>
            </tr>
          </thead>
          <tbody>
            {APPROVAL_ROWS.map((row) => (
              <tr key={row.id} className="border-b border-line last:border-0">
                <td className="p-3 text-ink">{t(row.label)}</td>
                <td className="p-3">
                  <input
                    value={notes[R3.p2.approvalOwner(row.id)] ?? ""}
                    onChange={(e) => setNote(R3.p2.approvalOwner(row.id), e.target.value)}
                    placeholder="e.g. CIO/CTO"
                    className="w-full rounded-lg border border-line bg-paper px-2.5 py-1.5 text-caption text-ink"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={() => setShowReference((v) => !v)}
        className="flex items-center gap-1.5 text-micro font-semibold text-accent hover:text-accentHi"
      >
        {showReference ? "Hide" : "Show"} governance-flow reference
        <ChevronDown className={clsx("h-3.5 w-3.5 transition-transform duration-150", showReference && "rotate-180")} />
      </button>
      {showReference && (
        <div className="reveal-in rounded-xl border border-line bg-canvas p-4">
          <GovernanceFlowDiagram />
        </div>
      )}
    </div>
  );
}
