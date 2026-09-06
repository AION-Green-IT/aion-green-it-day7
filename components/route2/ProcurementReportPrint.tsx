"use client";

import { useProcurementDocData } from "./useProcurementDocData";
import { ProcurementReportDoc } from "./ProcurementReportDoc";

export function ProcurementReportPrint() {
  const data = useProcurementDocData();
  return (
    <div className="print-note">
      <ProcurementReportDoc data={data} />
    </div>
  );
}
