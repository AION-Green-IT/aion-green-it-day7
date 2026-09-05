"use client";

import { CalculationDoc } from "./CalculationDoc";
import { useCalcDoc } from "./useCalcDoc";

/** Print-only Calculation Note, outside the page's print:hidden wrapper. */
export function CalculationNotePrint() {
  const data = useCalcDoc();
  return (
    <div className="print-note bg-paper p-8">
      <CalculationDoc data={data} />
    </div>
  );
}
