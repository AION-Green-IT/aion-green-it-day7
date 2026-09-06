import type { Metadata } from "next";
import { ROUTES } from "@/lib/routes";
import { LeafMark } from "@/components/chrome/Icons";
import { RouteGate } from "@/components/chrome/RouteGate";
import { Material } from "@/components/route3/Material";
import { TaskFlow } from "@/components/route3/TaskFlow";
import { BoardProposalReportPrint } from "@/components/route3/BoardProposalReportPrint";
import { MentorTools } from "@/components/route3/MentorTools";

const ROUTE = ROUTES[2];

export const metadata: Metadata = {
  title: `AION Green IT — ${ROUTE.tag}`,
};

export default function Route3Page() {
  return (
    <>
      <div className="print:hidden">
        <RouteGate routeN={3}>
          <div className="space-y-16 py-12">
            <MentorTools />
            <div className="max-w-prose">
              <p className="mb-2 flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-accent">
                <LeafMark className="h-4 w-4" /> {ROUTE.tag} — 3 of 3
              </p>
              <h1 className="text-display text-ink">{ROUTE.title}</h1>
              <p className="mt-4 text-body text-ash">
                The capstone. You're strategic advisor to NovaCore Infrastructure Group, turning three routes'
                worth of analysis into a decision-ready proposal a board can actually act on.
              </p>
            </div>

            <hr className="border-line" />

            <Material />

            <hr className="border-line" />

            <TaskFlow />
          </div>
        </RouteGate>
      </div>

      <BoardProposalReportPrint />
    </>
  );
}
