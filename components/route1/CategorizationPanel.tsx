"use client";

import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R1, ZONES, TASK1A, type ImpactType, type Horizon, type ZoneId } from "@/lib/route1";
import { useRoute1 } from "./useRoute1";

const IMPACT_OPTIONS: { id: ImpactType; label: string }[] = [
  { id: "technical", label: "Technical" },
  { id: "governance", label: "Governance / architectural" },
];
const HORIZON_OPTIONS: { id: Horizon; label: string }[] = [
  { id: "short", label: "Short-term" },
  { id: "medium", label: "Medium-term" },
];

/** Task 1a, Step 2 — per-zone classification, then a single priority pick + improvement approach. */
export function CategorizationPanel() {
  const r1 = useRoute1();
  const choose = useProgress((s) => s.choose);
  const setNote = useProgress((s) => s.setNote);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {ZONES.map((z) => (
          <div key={z.id} className="rounded-xl border border-line p-4">
            <p className="text-caption font-semibold text-ink">{z.label}</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-micro text-ash">{TASK1A.step2.impactLabel}</p>
                <div className="mt-1.5 flex gap-1.5">
                  {IMPACT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => choose(R1.zoneImpact(z.id), opt.id)}
                      aria-pressed={r1.zoneImpact[z.id] === opt.id}
                      className={clsx(
                        "rounded-lg border px-2.5 py-1.5 text-micro font-semibold transition-colors duration-150",
                        r1.zoneImpact[z.id] === opt.id ? "border-accent bg-accentSoft text-accent" : "border-line text-ink hover:border-ash",
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-micro text-ash">{TASK1A.step2.horizonLabel}</p>
                <div className="mt-1.5 flex gap-1.5">
                  {HORIZON_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => choose(R1.zoneHorizon(z.id), opt.id)}
                      aria-pressed={r1.zoneHorizon[z.id] === opt.id}
                      className={clsx(
                        "rounded-lg border px-2.5 py-1.5 text-micro font-semibold transition-colors duration-150",
                        r1.zoneHorizon[z.id] === opt.id ? "border-accent bg-accentSoft text-accent" : "border-line text-ink hover:border-ash",
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t border-line pt-5">
        <h4 className="text-caption font-semibold text-ink">{TASK1A.step2.priorityLabel}</h4>
        <div className="flex flex-wrap gap-2">
          {ZONES.map((z) => (
            <button
              key={z.id}
              type="button"
              onClick={() => choose(R1.priorityZone, z.id)}
              aria-pressed={r1.priorityZone === (z.id as ZoneId)}
              className={clsx(
                "rounded-xl border px-3 py-2 text-caption font-semibold transition-colors duration-150",
                r1.priorityZone === z.id ? "border-accent bg-accent text-paper" : "border-line text-ink hover:border-ash",
              )}
            >
              {z.label}
            </button>
          ))}
        </div>

        <label className="block">
          <span className="text-caption font-semibold text-ink">{TASK1A.step2.approachLabel}</span>
          <p className="text-micro text-ash">{TASK1A.step2.approachCaption}</p>
          <textarea
            value={r1.improvementApproach}
            onChange={(e) => setNote(R1.improvementApproach, e.target.value)}
            rows={3}
            placeholder="e.g. Start with continuous PUE and sub-metering, because every other fix here is currently unverifiable without it..."
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
          />
        </label>
      </div>
    </div>
  );
}
