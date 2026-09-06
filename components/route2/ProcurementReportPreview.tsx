"use client";

import { useProcurementDocData } from "./useProcurementDocData";
import { ProcurementReportDoc } from "./ProcurementReportDoc";

export function ProcurementReportPreview() {
  const data = useProcurementDocData();
  return (
    <div className="card max-h-[75vh] overflow-y-auto p-5">
      <p className="mb-3 text-micro font-semibold uppercase tracking-wide text-accent">Live report</p>
      <ProcurementReportDoc data={data} live />
    </div>
  );
}
