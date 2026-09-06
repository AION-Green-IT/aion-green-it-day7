"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R1, TCO_LAYERS, TCO_TOTAL_EUR } from "@/lib/route1";
import { useAnimatedNumber } from "@/lib/useAnimatedNumber";
import { Plus, Check } from "@/components/icons/LineIcons";

const fmt = (n: number) => `€${Math.round(n).toLocaleString("en-GB")}`;

const SEGMENT_COLOR: Record<string, string> = {
  purchase: "bg-accent",
  energy: "bg-ash",
  support: "bg-slateHi",
  licensing: "bg-slate",
  disposal: "bg-ink",
};

/** Impact Delta Visualizer — Block 1. A bar that only grows as hidden TCO layers are revealed. */
export function TcoRevealBar() {
  const markSeen = useProgress((s) => s.markSeen);
  const [active, setActive] = useState<Set<string>>(new Set(["purchase"]));
  const touchedRef = useRef(false);

  const toggle = (id: string) => {
    if (!touchedRef.current) {
      touchedRef.current = true;
      markSeen(R1.material, "tco");
    }
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const activeAmount = TCO_LAYERS.filter((l) => active.has(l.id)).reduce((s, l) => s + l.amountEur, 0);
  const animatedTotal = useAnimatedNumber(activeAmount);
  const allActive = active.size === TCO_LAYERS.length;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-caption font-semibold text-ash">TCO Reveal Bar — 4-year hold, one device</p>
        <p className="text-readout tabular-nums text-ink">{fmt(animatedTotal)}</p>
      </div>

      <div className="mt-3 flex h-10 w-full overflow-hidden rounded-lg bg-mist">
        {TCO_LAYERS.map((l) => {
          const isActive = active.has(l.id);
          const widthPct = (l.amountEur / TCO_TOTAL_EUR) * 100;
          return (
            <div
              key={l.id}
              style={{ width: isActive ? `${widthPct}%` : "0%" }}
              className={clsx("h-full shrink-0 transition-[width] duration-500 ease-in-out", SEGMENT_COLOR[l.id])}
              title={`${l.label}: ${fmt(l.amountEur)}`}
            />
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {TCO_LAYERS.filter((l) => l.id !== "purchase").map((l) => {
          const isActive = active.has(l.id);
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => toggle(l.id)}
              aria-pressed={isActive}
              className={clsx(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-caption font-semibold transition-colors duration-150",
                isActive ? "border-accent bg-accentSoft text-accent" : "border-line text-ink hover:border-ash",
              )}
            >
              {isActive ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              {isActive ? l.label : `Add ${l.label}`}
            </button>
          );
        })}
      </div>

      {allActive && (
        <div className="reveal-in mt-4 flex items-center gap-4 rounded-xl border border-line bg-canvas p-4">
          <IcebergGlyph className="h-16 w-16 shrink-0 text-ink" />
          <p className="text-h3 text-ink">Purchase price = only the tip of the iceberg.</p>
        </div>
      )}
    </div>
  );
}

function IcebergGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M32 8 40 26H24Z" fill="currentColor" opacity="0.9" />
      <path d="M2 27h60" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M13 27 24 24h16l11 3 6 23H7Z" fill="currentColor" opacity="0.22" />
    </svg>
  );
}
