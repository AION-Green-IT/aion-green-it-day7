"use client";

import { useBoardProposalDocData } from "./useBoardProposalDocData";
import { BoardProposalReportDoc } from "./BoardProposalReportDoc";

/** Right-hand column: the board proposal document assembling live as the left form is filled in. */
export function BoardProposalPreview() {
  const data = useBoardProposalDocData();
  return (
    <div className="card max-h-[80vh] overflow-y-auto p-5">
      <p className="mb-3 text-micro font-semibold uppercase tracking-wide text-accent">Live board proposal</p>
      <BoardProposalReportDoc data={data} live />
    </div>
  );
}
