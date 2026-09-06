"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R2, CAPEX_LAYERS, DAAS_TOTAL_EUR, DAAS_INCLUDES, MATURITY_IT_LABOR_EUR, type MaturityLevel } from "@/lib/route2";
import { useAnimatedNumber } from "@/lib/useAnimatedNumber";
import { Plus, Check } from "@/components/icons/LineIcons";

const fmt = (n: number) => `€${Math.round(n).toLocaleString("en-GB")}`;

/** A bar that starts at its first (always-on) layer and grows as more layers are toggled. */
export function ToggleableCostBar({
  label,
  layers,
  color = "bg-ink",
  onFirstToggle,
}: {
  label: string;
  layers: readonly { id: string; label: string; amountEur: number }[];
  color?: string;
  onFirstToggle?: () => void;
}) {
  const [active, setActive] = useState<Set<string>>(new Set([layers[0].id]));
  const total = layers.reduce((s, l) => s + l.amountEur, 0);
  const activeAmount = layers.filter((l) => active.has(l.id)).reduce((s, l) => s + l.amountEur, 0);
  const animated = useAnimatedNumber(activeAmount);

  const toggle = (id: string) => {
    onFirstToggle?.();
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-caption font-semibold text-ink">{label}</p>
        <p className="text-readout tabular-nums text-ink">{fmt(animated)}</p>
      </div>
      <div className="mt-2 flex h-8 w-full overflow-hidden rounded-lg bg-mist">
        {layers.map((l) => (
          <div
            key={l.id}
            style={{ width: active.has(l.id) ? `${(l.amountEur / total) * 100}%` : "0%" }}
            className={clsx("h-full shrink-0 transition-[width] duration-500 ease-in-out", color)}
            title={`${l.label}: ${fmt(l.amountEur)}`}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {layers.slice(1).map((l) => {
          const isActive = active.has(l.id);
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => toggle(l.id)}
              aria-pressed={isActive}
              className={clsx(
                "flex items-center gap-1 rounded-full border px-2.5 py-1 text-micro font-semibold transition-colors duration-150",
                isActive ? "border-accent bg-accentSoft text-accent" : "border-line text-ink hover:border-ash",
              )}
            >
              {isActive ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              {l.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SolidCostBar({ label, totalEur, note }: { label: string; totalEur: number; note: string }) {
  const animated = useAnimatedNumber(totalEur);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-caption font-semibold text-ink">{label}</p>
        <p className="text-readout tabular-nums text-accent">{fmt(animated)}</p>
      </div>
      <div className="mt-2 h-8 w-full overflow-hidden rounded-lg bg-accent" />
      <p className="mt-2 text-micro text-ash">{note}</p>
    </div>
  );
}

/** Impact Delta Visualizer — Block 2. Extends Route 1's TCO Reveal Bar to a two-model comparison. */
export function HiddenCostIcebergDemo() {
  const markSeen = useProgress((s) => s.markSeen);
  const touchedRef = useRef(false);
  const [maturity, setMaturity] = useState<MaturityLevel>("medium");

  const markTouched = () => {
    if (!touchedRef.current) {
      touchedRef.current = true;
      markSeen(R2.material, "hiddenCost");
    }
  };

  const layers = CAPEX_LAYERS.map((l) =>
    l.id === "itLabor" ? { ...l, amountEur: MATURITY_IT_LABOR_EUR[maturity] } : l,
  );

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2">
        <ToggleableCostBar label="CapEx — Direct Purchase" layers={layers} onFirstToggle={markTouched} />
        <SolidCostBar label="DaaS — Subscription Model" totalEur={DAAS_TOTAL_EUR} note={DAAS_INCLUDES} />
      </div>
      <div className="mt-5 border-t border-line pt-4">
        <p className="text-caption font-semibold text-ash">IT team maturity</p>
        <div className="mt-2 flex gap-2">
          {(["low", "medium", "high"] as MaturityLevel[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                markTouched();
                setMaturity(m);
              }}
              aria-pressed={maturity === m}
              className={clsx(
                "rounded-lg border px-3 py-1.5 text-caption font-semibold capitalize transition-colors duration-150",
                maturity === m ? "border-accent bg-accentSoft text-accent" : "border-line text-ink hover:border-ash",
              )}
            >
              {m}
            </button>
          ))}
        </div>
        <p className="mt-1 text-micro text-ash">Lower IT maturity raises CapEx's hidden IT-labor cost.</p>
      </div>
    </div>
  );
}
