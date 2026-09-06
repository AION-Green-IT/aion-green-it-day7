"use client";

import Link from "next/link";
import { CASE, ROUTES } from "@/lib/routes";
import { useRouteUnlocked } from "@/lib/routeGating";
import { LeafMark } from "@/components/chrome/Icons";
import { ArrowRight, Lock } from "@/components/icons/LineIcons";

export default function DayLanding() {
  const unlockedByN: Record<number, boolean> = {
    1: useRouteUnlocked(1),
    2: useRouteUnlocked(2),
    3: useRouteUnlocked(3),
  };

  return (
    <div className="py-12">
      {/* Hero */}
      <div className="max-w-prose">
        <p className="mb-2 flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-accent">
          <LeafMark className="h-4 w-4" />
          {CASE.module}
        </p>
        <h1 className="text-display text-ink">{CASE.moduleTitle}</h1>
        <p className="mt-4 text-body text-ash">
          Three routes, each its own case and its own deliverable. You move from
          reading the lifecycle economics of a device, to weighing procurement
          models against each other, to presenting a governance proposal a
          board would actually sit through. Each route lives on its own page
          and ends in a document a professional would actually produce.
        </p>
      </div>

      {/* Route cards */}
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {ROUTES.map((rt) => {
          const reachable = rt.available && unlockedByN[rt.n];
          const statusLabel = !rt.available ? "Not built" : reachable ? "Available" : "Locked";

          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-readout font-semibold text-paper">
                  {rt.n}
                </span>
                {reachable ? (
                  <span className="rounded-full bg-accentSoft px-2.5 py-1 text-micro font-semibold uppercase tracking-wide text-accent">
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-micro font-semibold uppercase tracking-wide text-ash">
                    <Lock className="h-3.5 w-3.5" /> {statusLabel}
                  </span>
                )}
              </div>

              <p className="mt-4 text-micro font-semibold uppercase tracking-wide text-ash">
                {rt.tag}
              </p>
              <h2 className="mt-1 text-h2 text-ink">{rt.cardTitle}</h2>
              <p className="mt-2 flex-1 text-body text-ash">{rt.cardBlurb}</p>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <span className="text-caption text-ash">
                  Deliverable:{" "}
                  <span className="font-semibold text-ink">{rt.deliverable}</span>
                </span>
                {reachable ? (
                  <span className="inline-flex items-center gap-1.5 text-caption font-semibold text-accent">
                    Open <ArrowRight className="h-4 w-4" />
                  </span>
                ) : rt.available ? (
                  <span className="text-caption text-ash">Complete the previous route</span>
                ) : (
                  <span className="text-caption text-ash">Not yet</span>
                )}
              </div>
            </>
          );

          const cls = "flex h-full flex-col rounded-2xl border bg-paper p-6 shadow-sm";

          return reachable ? (
            <Link
              key={rt.slug}
              href={rt.href}
              className={`${cls} border-line transition-all duration-150 hover:-translate-y-0.5 hover:border-accent hover:shadow-md`}
            >
              {inner}
            </Link>
          ) : (
            <div key={rt.slug} className={`${cls} border-dashed border-line opacity-80`}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
