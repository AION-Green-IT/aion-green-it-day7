import type { Metadata } from "next";
import { ROUTES } from "@/lib/routes";
import { LeafMark } from "@/components/chrome/Icons";
import { Material } from "@/components/route1/Material";
import { TaskFlow } from "@/components/route1/TaskFlow";
import { MentorTools } from "@/components/route1/MentorTools";

const ROUTE = ROUTES[0];

export const metadata: Metadata = {
  title: `AION Green IT — ${ROUTE.tag}`,
};

export default function Route1Page() {
  return (
    <div className="space-y-16 py-12">
      <MentorTools />
      <div className="max-w-prose">
        <p className="mb-2 flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-accent">
          <LeafMark className="h-4 w-4" /> {ROUTE.tag} — 1 of 3
        </p>
        <h1 className="text-display text-ink">{ROUTE.title}</h1>
        <p className="mt-4 text-body text-ash">
          A PUE trend and a stack of green-energy certificates can sound like proof of sustainability. This route
          gives you the concepts to tell what they actually prove — then has you audit GreenStack Hosting's claim
          against the evidence.
        </p>
      </div>

      <hr className="border-line" />

      <Material />

      <div className="rounded-2xl border border-accent/30 bg-accentSoft p-6 text-center">
        <p className="text-body font-semibold text-ink">You've completed the foundations. Time to apply them.</p>
        <a href="#task" className="btn-accent mt-3 inline-flex">
          Start the Sustainability Claim Auditor
        </a>
      </div>

      <TaskFlow />
    </div>
  );
}
