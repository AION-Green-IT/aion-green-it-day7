import type { Metadata } from "next";
import { ROUTES } from "@/lib/routes";
import { LeafMark } from "@/components/chrome/Icons";
import { RouteGate } from "@/components/chrome/RouteGate";
import { Material } from "@/components/route3/Material";
import { TaskFlow } from "@/components/route3/TaskFlow";
import { MentorTools } from "@/components/route3/MentorTools";

const ROUTE = ROUTES[2];

export const metadata: Metadata = {
  title: `AION Green IT — ${ROUTE.tag}`,
};

export default function Route3Page() {
  return (
    <RouteGate routeN={3}>
      <div className="space-y-16 py-12">
        <MentorTools />
        <div className="max-w-prose">
          <p className="mb-2 flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-accent">
            <LeafMark className="h-4 w-4" /> {ROUTE.tag} — 3 of 3
          </p>
          <h1 className="text-display text-ink">{ROUTE.title}</h1>
          <p className="mt-4 text-body text-ash">
            The capstone. Less "classify this," more "own this decision" — you'll diagnose AeroPulse's situation,
            then build a formal, board-ready proposal for PolarEdge Data Systems.
          </p>
        </div>

        <hr className="border-line" />

        <Material />

        <div className="rounded-2xl border border-accent/30 bg-accentSoft p-6 text-center">
          <p className="text-body font-semibold text-ink">You've got the architecture. Time to own a decision.</p>
          <a href="#task" className="btn-accent mt-3 inline-flex">
            Start the Board-Level Decision Builder
          </a>
        </div>

        <TaskFlow />
      </div>
    </RouteGate>
  );
}
