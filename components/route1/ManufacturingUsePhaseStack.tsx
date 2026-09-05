"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R1, CARBON_SEGMENTS, annualizedFootprintKg } from "@/lib/route1";
import { useAnimatedNumber } from "./useAnimatedNumber";

const SEGMENT_FILL: Record<string, string> = {
  manufacturing: "bg-ink",
  use: "bg-accent",
  transport: "bg-ash",
  endOfLife: "bg-warn",
};

const WHY: Record<string, string> = {
  manufacturing: "Raw-material extraction, component fabrication, and assembly — locked in before the device ever ships.",
  use: "Electricity drawn over roughly 4 years of typical office use.",
  transport: "Shipping from factory to distribution centre to desk.",
  endOfLife: "Collection, certified recycling, or disposal processing.",
};

const fmt = (n: number) => `${n.toFixed(1)} kg CO2e`;

const LIFESPAN_MIN = 2;
const LIFESPAN_MAX = 8;

/** Impact Delta Visualizer — Block 2. Stacked lifecycle-carbon bar + a lifespan-vs-annualized-footprint curve. */
export function ManufacturingUsePhaseStack() {
  const markSeen = useProgress((s) => s.markSeen);
  const touchedRef = useRef(false);
  const markTouched = () => {
    if (!touchedRef.current) {
      touchedRef.current = true;
      markSeen(R1.material, "carbon");
    }
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const [hover, setHover] = useState<string | null>(null);
  const [lifespan, setLifespan] = useState(4);
  const annualized = useAnimatedNumber(annualizedFootprintKg(lifespan));

  const ann4 = annualizedFootprintKg(4);
  const ann6 = annualizedFootprintKg(6);
  const reductionPct = Math.round(((ann4 - ann6) / ann4) * 100);

  const years = Array.from({ length: LIFESPAN_MAX - LIFESPAN_MIN + 1 }, (_, i) => LIFESPAN_MIN + i);
  const values = years.map((y) => annualizedFootprintKg(y));
  const maxV = Math.max(...values);
  const minV = Math.min(...values);
  const plotW = 260;
  const plotH = 90;
  const padX = 14;
  const padY = 10;
  const xFor = (y: number) => padX + ((y - LIFESPAN_MIN) / (LIFESPAN_MAX - LIFESPAN_MIN)) * plotW;
  const yFor = (v: number) => padY + (1 - (v - minV) / (maxV - minV || 1)) * plotH;
  const points = years.map((y, i) => `${xFor(y)},${yFor(values[i])}`).join(" ");

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
        <div
          className="relative h-56 w-24 overflow-hidden rounded-lg bg-mist"
          role="img"
          aria-label="Lifecycle carbon footprint split: manufacturing 79.8%, use-phase 13.2%, transport 6.8%, end-of-life 0.2%"
        >
          <div className="flex h-full w-full flex-col-reverse">
            {CARBON_SEGMENTS.map((seg, i) => (
              <div
                key={seg.id}
                tabIndex={0}
                onMouseEnter={() => {
                  setHover(seg.id);
                  markTouched();
                }}
                onMouseLeave={() => setHover(null)}
                onFocus={() => {
                  setHover(seg.id);
                  markTouched();
                }}
                onBlur={() => setHover(null)}
                style={{ height: mounted ? `${seg.share * 100}%` : "0%", transitionDelay: `${i * 120}ms` }}
                className={clsx(
                  "w-full cursor-default transition-[height] duration-700 ease-out",
                  SEGMENT_FILL[seg.id],
                )}
              />
            ))}
          </div>
        </div>

        <div className="min-w-0 space-y-2">
          <p className="text-caption font-semibold text-ash">299 kg CO2e over a 4-year hold</p>
          <ul className="space-y-1.5">
            {CARBON_SEGMENTS.map((seg) => (
              <li
                key={seg.id}
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-2 py-1 text-caption transition-colors duration-150",
                  hover === seg.id ? "bg-canvas" : "",
                )}
              >
                <span className={clsx("h-2.5 w-2.5 shrink-0 rounded-sm", SEGMENT_FILL[seg.id])} />
                <span className="font-semibold text-ink">{seg.label}</span>
                <span className="tabular-nums text-ash">{(seg.share * 100).toFixed(1)}%</span>
              </li>
            ))}
          </ul>
          {hover && <p className="reveal-in text-micro text-ash">{WHY[hover]}</p>}
        </div>
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="lifespan" className="text-caption font-semibold text-ash">
            Device lifespan: <span className="tabular-nums text-ink">{lifespan} years</span>
          </label>
          <p className="text-readout tabular-nums text-ink">{fmt(annualized)} / year</p>
        </div>
        <input
          id="lifespan"
          type="range"
          min={LIFESPAN_MIN}
          max={LIFESPAN_MAX}
          step={1}
          value={lifespan}
          onChange={(e) => {
            markTouched();
            setLifespan(Number(e.target.value));
          }}
          aria-label="Device lifespan, 2 to 8 years"
          className="h-2 w-full cursor-pointer accent-accent"
        />
        <div className="mt-1 flex justify-between text-micro text-ash">
          <span>2 yr</span>
          <span>8 yr</span>
        </div>

        <svg viewBox={`0 0 ${plotW + padX * 2} ${plotH + padY * 2}`} className="mt-3 w-full" aria-hidden="true">
          <polyline points={points} fill="none" stroke="#5E6670" strokeWidth="1.5" opacity="0.5" />
          <circle cx={xFor(4)} cy={yFor(ann4)} r="2.5" fill="#5E6670" />
          <circle cx={xFor(6)} cy={yFor(ann6)} r="2.5" fill="#5E6670" />
          <line
            x1={xFor(4)}
            y1={yFor(ann4)}
            x2={xFor(6)}
            y2={yFor(ann6)}
            stroke="#0E7A5A"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text x={(xFor(4) + xFor(6)) / 2} y={Math.min(yFor(ann4), yFor(ann6)) - 6} textAnchor="middle" fontSize="9" fill="#0E7A5A" fontWeight={600}>
            −{reductionPct}%
          </text>
          <circle cx={xFor(lifespan)} cy={yFor(annualizedFootprintKg(lifespan))} r="4" fill="#0E7A5A" />
        </svg>
        <p className="text-center text-micro text-ash">Annualized footprint by device lifespan</p>
      </div>
    </div>
  );
}
