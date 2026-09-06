"use client";

import Link from "next/link";
import { useHydrated } from "@/lib/store";
import { useRouteUnlocked } from "@/lib/routeGating";
import { ROUTES } from "@/lib/routes";
import { Lock } from "@/components/icons/LineIcons";

/** Gates an entire route page behind the previous route's export being submitted. */
export function RouteGate({ routeN, children }: { routeN: 2 | 3; children: React.ReactNode }) {
  const hydrated = useHydrated();
  const unlocked = useRouteUnlocked(routeN);
  const prevRoute = ROUTES[routeN - 2];

  if (!hydrated) return null;

  if (!unlocked) {
    return (
      <div className="card mx-auto max-w-prose p-8 text-center">
        <Lock className="mx-auto h-6 w-6 text-ash" />
        <p className="mt-3 text-h3 text-ink">Route {routeN} is locked</p>
        <p className="mt-1 text-body text-ash">
          Submit the export on {prevRoute.tag} first — this route builds on that deliverable.
        </p>
        <Link href={prevRoute.href} className="btn-accent mt-4 inline-flex">
          Go to {prevRoute.tag}
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
