"use client";

import { useExecutiveDocData } from "./useExecutiveDocData";
import { ExecutiveReportDoc } from "./ExecutiveReportDoc";

export function ExecutiveReportPreview() {
  const data = useExecutiveDocData();
  return (
    <div className="card max-h-[75vh] overflow-y-auto p-5">
      <p className="mb-3 text-micro font-semibold uppercase tracking-wide text-accent">Live board memo</p>
      <ExecutiveReportDoc data={data} live />
    </div>
  );
}
