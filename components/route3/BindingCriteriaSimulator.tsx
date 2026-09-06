"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R3, SIM_VENDORS, simRanking } from "@/lib/route3";

/** Impact Delta Visualizer — Block 2. Toggling criteria weight re-sorts the vendor ranking. */
export function BindingCriteriaSimulator() {
  const markSeen = useProgress((s) => s.markSeen);
  const touchedRef = useRef(false);
  const [scored, setScored] = useState(false);

  const optionalWinner = simRanking(false)[0];
  const scoredWinner = simRanking(true)[0];
  const scoreOf = (v: (typeof SIM_VENDORS)[number]) => (scored ? v.price * 0.8 + v.repairability * 0.2 : v.price);
  const rankedIds = [...SIM_VENDORS].sort((a, b) => scoreOf(b) - scoreOf(a)).map((v) => v.id);

  const toggle = () => {
    if (!touchedRef.current) {
      touchedRef.current = true;
      markSeen(R3.material, "bindingCriteria");
    }
    setScored((v) => !v);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className={clsx("text-caption font-semibold", !scored ? "text-ink" : "text-ash")}>
          Repairability as optional mention
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={scored}
          onClick={toggle}
          className={clsx("relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200", scored ? "bg-accent" : "bg-line")}
        >
          <span
            className={clsx(
              "absolute top-1 h-5 w-5 rounded-full bg-paper shadow-sm transition-transform duration-200",
              scored ? "translate-x-6" : "translate-x-1",
            )}
          />
        </button>
        <span className={clsx("text-caption font-semibold", scored ? "text-ink" : "text-ash")}>
          Repairability as scored award criterion (20% weight)
        </span>
      </div>

      <div className="mt-4 space-y-2">
        {SIM_VENDORS.map((v) => {
          const score = scoreOf(v);
          const rank = rankedIds.indexOf(v.id) + 1;
          const isWinner = rank === 1;
          return (
            <div key={v.id} className="flex items-center gap-2">
              <span className="w-5 shrink-0 text-caption tabular-nums text-ash">{rank}</span>
              <span className="w-20 shrink-0 text-caption font-semibold text-ink">{v.label}</span>
              <div className="h-6 flex-1 overflow-hidden rounded-full bg-mist">
                <div
                  style={{ width: `${(score / 5) * 100}%` }}
                  className={clsx(
                    "h-full rounded-full transition-[width] duration-500 ease-in-out",
                    isWinner ? "bg-accent" : "bg-ash",
                  )}
                />
              </div>
              {isWinner && (
                <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-micro font-semibold text-paper">
                  Winner
                </span>
              )}
            </div>
          );
        })}
      </div>

      {optionalWinner.id !== scoredWinner.id && (
        <p className="reveal-in mt-3 text-center text-caption font-semibold text-ink">
          Winner changes from {optionalWinner.label} to {scoredWinner.label} once repairability becomes a scored
          criterion.
        </p>
      )}
    </div>
  );
}
