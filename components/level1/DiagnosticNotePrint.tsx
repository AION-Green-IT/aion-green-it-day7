"use client";

import { DiagnosticDoc } from "./DiagnosticDoc";
import { useDocData } from "./useDocData";

/**
 * The print-only Diagnostic Note. Lives outside the page's `print:hidden`
 * wrapper and is `display:none` on screen (`.print-note`), so "Download as
 * PDF" produces exactly this one page and nothing else. Reads the same live
 * store as the on-screen preview, so the two never drift.
 */
export function DiagnosticNotePrint() {
  const data = useDocData();
  return (
    <div className="print-note bg-paper p-8">
      <DiagnosticDoc data={data} />
    </div>
  );
}
