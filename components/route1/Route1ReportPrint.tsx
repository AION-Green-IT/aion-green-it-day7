"use client";

import { useProgress } from "@/lib/store";
import { useAuditMappingDocData } from "./useAuditMappingDocData";
import { AuditMappingReportDoc } from "./AuditMappingReportDoc";
import { usePriorityDecisionDocData } from "./usePriorityDecisionDocData";
import { PriorityDecisionReportDoc } from "./PriorityDecisionReportDoc";

/**
 * Route 1 has two separate exports (Task 1a and 1b), so unlike a single-export
 * route this can't just always-mount one `.print-note`. Only the report whose
 * export button was actually clicked (via `printTarget`, set immediately
 * before `window.print()`) renders — the other never mounts, so it can't leak
 * into that print job.
 */
export function Route1ReportPrint() {
  const printTarget = useProgress((s) => s.printTarget);
  const auditData = useAuditMappingDocData();
  const decisionData = usePriorityDecisionDocData();

  if (printTarget === "r1-audit-mapping") {
    return (
      <div className="print-note">
        <AuditMappingReportDoc data={auditData} />
      </div>
    );
  }
  if (printTarget === "r1-priority-decision") {
    return (
      <div className="print-note">
        <PriorityDecisionReportDoc data={decisionData} />
      </div>
    );
  }
  return null;
}
