import type { Metadata } from "next";
import { ROUTES } from "@/lib/routes";
import { LeafMark } from "@/components/chrome/Icons";
import { Material } from "@/components/route1/Material";
import { TaskFlow } from "@/components/route1/TaskFlow";
import { LifecycleReportPrint } from "@/components/route1/LifecycleReportPrint";

const ROUTE = ROUTES[0];

export const metadata: Metadata = {
  title: `AION Green IT — ${ROUTE.tag}`,
};

export default function Route1Page() {
  return (
    <>
      <div className="space-y-16 py-12 print:hidden">
        <div className="max-w-prose">
          <p className="mb-2 flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-accent">
            <LeafMark className="h-4 w-4" /> {ROUTE.tag} — 1 of 3
          </p>
          <h1 className="text-display text-ink">{ROUTE.title}</h1>
          <p className="mt-4 text-body text-ash">
            A device&apos;s biggest costs and biggest carbon impact are both mostly invisible at the moment of
            purchase. This route makes them visible — then asks you to defend a 300-unit procurement call once
            someone with budget authority pushes back.
          </p>
        </div>

        <hr className="border-line" />

        <Material />

        <hr className="border-line" />

        <TaskFlow />
      </div>

      <LifecycleReportPrint />
    </>
  );
}
