import type { Metadata } from "next";
import { ROUTES } from "@/lib/routes";
import { LeafMark } from "@/components/chrome/Icons";
import { RouteGate } from "@/components/chrome/RouteGate";
import { Material } from "@/components/route3/Material";
import { TaskFlow } from "@/components/route3/TaskFlow";
import { ExecutiveReportPrint } from "@/components/route3/ExecutiveReportPrint";

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
            <div className="max-w-prose">
              <p className="mb-2 flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-accent">
                <LeafMark className="h-4 w-4" /> {ROUTE.tag} — 3 of 3
              </p>
              <h1 className="text-display text-ink">{ROUTE.title}</h1>
              <p className="mt-4 text-body text-ash">
                The final route. You diagnose one company&apos;s governance tensions, then become the CIO
                proposing a second company&apos;s decision to its board — and defending it when challenged.
              </p>
            </div>

            <hr className="border-line" />

            <Material />

            <hr className="border-line" />

            <TaskFlow />
          </div>
        </RouteGate>
      </div>

      <ExecutiveReportPrint />
    </>
  );
}
