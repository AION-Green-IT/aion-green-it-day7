"use client";

import { useTradeoffDocData } from "./useTradeoffDocData";
import { TradeoffReportDoc } from "./TradeoffReportDoc";

/** Always-mounted, screen-hidden copy of the report; only visible inside a print job. */
export function TradeoffReportPrint() {
  const data = useTradeoffDocData();
  return (
    <div className="print-note">
      <TradeoffReportDoc data={data} />
    </div>
  );
}
