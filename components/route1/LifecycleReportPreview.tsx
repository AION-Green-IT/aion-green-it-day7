"use client";

import { useLifecycleDocData } from "./useLifecycleDocData";
import { LifecycleReportDoc } from "./LifecycleReportDoc";

/** The right-hand column of Step 4: the report assembling live, sticky while the left panel scrolls. */
export function LifecycleReportPreview() {
  const data = useLifecycleDocData();
  return (
    <div className="card max-h-[75vh] overflow-y-auto p-5">
      <p className="mb-3 text-micro font-semibold uppercase tracking-wide text-accent">Live report</p>
      <LifecycleReportDoc data={data} live />
    </div>
  );
}
