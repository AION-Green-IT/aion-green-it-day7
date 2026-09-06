"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R2, KRALJIC_CLASSIC, KRALJIC_LIFECYCLE } from "@/lib/route2";
import { KraljicMatrix } from "./KraljicMatrix";

/** Impact Delta Visualizer — Block 1. Toggling criteria shifts the same dot to a new quadrant. */
export function KraljicQuadrantShift() {
  const markSeen = useProgress((s) => s.markSeen);
  const touchedRef = useRef(false);
  const [lifecycleAware, setLifecycleAware] = useState(false);

  const pos = lifecycleAware ? KRALJIC_LIFECYCLE : KRALJIC_CLASSIC;

  const toggle = () => {
    if (!touchedRef.current) {
      touchedRef.current = true;
      markSeen(R2.material, "kraljic");
    }
    setLifecycleAware((v) => !v);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className={clsx("text-caption font-semibold", !lifecycleAware ? "text-ink" : "text-ash")}>
          Classic view (price-only criteria)
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={lifecycleAware}
          onClick={toggle}
          className={clsx(
            "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200",
            lifecycleAware ? "bg-accent" : "bg-line",
          )}
        >
          <span
            className={clsx(
              "absolute top-1 h-5 w-5 rounded-full bg-paper shadow-sm transition-transform duration-200",
              lifecycleAware ? "translate-x-6" : "translate-x-1",
            )}
          />
        </button>
        <span className={clsx("text-caption font-semibold", lifecycleAware ? "text-ink" : "text-ash")}>
          Lifecycle-aware view
        </span>
      </div>

      <div className="mx-auto mt-4 max-w-xs">
        <KraljicMatrix
          risk={pos.risk}
          impact={pos.impact}
          label={
            lifecycleAware
              ? "Supply risk increased: repairability dependency + limited spare-parts vendors"
              : "IT Hardware Procurement"
          }
        />
      </div>
    </div>
  );
}
