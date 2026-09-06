"use client";

import { useExecutiveDocData } from "./useExecutiveDocData";
import { ExecutiveReportDoc } from "./ExecutiveReportDoc";

export function ExecutiveReportPrint() {
  const data = useExecutiveDocData();
  return (
    <div className="print-note">
      <ExecutiveReportDoc data={data} />
    </div>
  );
}
