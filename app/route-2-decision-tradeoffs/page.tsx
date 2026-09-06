import type { Metadata } from "next";
import { ROUTES } from "@/lib/routes";
import { LeafMark } from "@/components/chrome/Icons";
import { RouteGate } from "@/components/chrome/RouteGate";
import { Material } from "@/components/route2/Material";
import { TaskFlow } from "@/components/route2/TaskFlow";
import { ProcurementReportPrint } from "@/components/route2/ProcurementReportPrint";
import { MentorTools } from "@/components/route2/MentorTools";

const ROUTE = ROUTES[1];

export const metadata: Metadata = {
  title: `AION Green IT — ${ROUTE.tag}`,
};

export default function Route2Page() {
  return (
    <>
      <div className="print:hidden">
        <RouteGate routeN={2}>
          <div className="space-y-16 py-12">
            <MentorTools />
            <div className="max-w-prose">
              <p className="mb-2 flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-accent">
                <LeafMark className="h-4 w-4" /> {ROUTE.tag} — 2 of 3
              </p>
              <h1 className="text-display text-ink">{ROUTE.title}</h1>
              <p className="mt-4 text-body text-ash">
                Three procurement models, one constrained budget. This route lets the system classify the
                category from your own answers, scores the models against your own weights, and prices what a
                purchase-price comparison always hides.
              </p>
            </div>

            <hr className="border-line" />

            <Material />

            <hr className="border-line" />

            <TaskFlow />
          </div>
        </RouteGate>
      </div>

      <ProcurementReportPrint />
    </>
  );
}
