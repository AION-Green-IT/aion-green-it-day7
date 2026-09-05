"use client";

import { useLifecycleDocData } from "./useLifecycleDocData";
import { LifecycleReportDoc } from "./LifecycleReportDoc";

/** Always-mounted, screen-hidden copy of the report; only visible inside a print job. */
export function LifecycleReportPrint() {
  const data = useLifecycleDocData();
  return (
    <div className="print-note">
      <LifecycleReportDoc data={data} />
    </div>
  );
}
