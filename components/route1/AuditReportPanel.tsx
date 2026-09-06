"use client";

import { useState } from "react";
import clsx from "clsx";
import { useAuditReportData } from "./useAuditReportData";
import { AuditReportDoc } from "./AuditReportDoc";
import { ChevronDown } from "@/components/icons/LineIcons";

/** Sticky right column on desktop; a collapsible accordion on mobile. Live-building, so it's the export preview too. */
export function AuditReportPanel() {
  const data = useAuditReportData();
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-2xl border border-line bg-paper lg:sticky lg:top-20 lg:self-start">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 p-4 text-left lg:hidden"
      >
        <span className="text-caption font-semibold text-ink">Audit Findings Report (live)</span>
        <ChevronDown className={clsx("h-4 w-4 shrink-0 text-ash transition-transform duration-150", open && "rotate-180")} />
      </button>
      <div className={clsx(open ? "block" : "hidden", "lg:block")}>
        <div className="max-h-[80vh] overflow-y-auto p-5 lg:max-h-[calc(100vh-6rem)]">
          <AuditReportDoc data={data} live />
        </div>
      </div>
    </div>
  );
}
