"use client";

import { PortfolioDoc } from "./PortfolioDoc";

/** Print-only combined portfolio, outside the page's print:hidden wrapper. */
export function PortfolioPrint() {
  return (
    <div className="print-note bg-paper p-8">
      <PortfolioDoc />
    </div>
  );
}
