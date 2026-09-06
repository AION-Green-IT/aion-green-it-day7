"use client";

import { useBoardProposalDocData } from "./useBoardProposalDocData";
import { BoardProposalReportDoc } from "./BoardProposalReportDoc";

/** Always-mounted, screen-hidden copy of the report; only visible inside a print job. */
export function BoardProposalReportPrint() {
  const data = useBoardProposalDocData();
  return (
    <div className="print-note">
      <BoardProposalReportDoc data={data} />
    </div>
  );
}
