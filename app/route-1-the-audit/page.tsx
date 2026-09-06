import type { Metadata } from "next";
import { ROUTES } from "@/lib/routes";
import { LeafMark } from "@/components/chrome/Icons";
import { Material } from "@/components/route1/Material";
import { TaskFlow } from "@/components/route1/TaskFlow";
import { Route1ReportPrint } from "@/components/route1/Route1ReportPrint";
import { MentorTools } from "@/components/route1/MentorTools";

const ROUTE = ROUTES[0];

export const metadata: Metadata = {
  title: `AION Green IT — ${ROUTE.tag}`,
};

export default function Route1Page() {
  return (
    <>
      <div className="space-y-16 py-12 print:hidden">
        <MentorTools />
        <div className="max-w-prose">
          <p className="mb-2 flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-accent">
            <LeafMark className="h-4 w-4" /> {ROUTE.tag} — 1 of 3
          </p>
          <h1 className="text-display text-ink">{ROUTE.title}</h1>
          <p className="mt-4 text-body text-ash">
            A facility's biggest inefficiencies are usually invisible until someone actually measures them. This
            route makes them visible at CoreAxis Data Services — then asks you to simulate which single fix is worth
            funding first.
          </p>
        </div>

        <hr className="border-line" />

        <Material />

        <hr className="border-line" />

        <TaskFlow />
      </div>

      <Route1ReportPrint />
    </>
  );
}
