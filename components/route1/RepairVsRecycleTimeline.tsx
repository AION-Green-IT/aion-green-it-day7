"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R1, BASELINE_KG, purchasesNeeded, recycledPathKg, repairedPathKg } from "@/lib/route1";
import { useAnimatedNumber } from "@/lib/useAnimatedNumber";
import { ArrowRight } from "@/components/icons/LineIcons";

const fmt = (n: number) => `${Math.round(n).toLocaleString("en-GB")} kg CO2e`;

const HORIZON = 6;
const CYCLE_A = 2;
const PLOT_W = 280;
const PLOT_H = 140;
const PAD_X = 16;
const PAD_Y = 14;
const MAX_V = recycledPathKg(HORIZON, CYCLE_A);

const xFor = (t: number) => PAD_X + (t / HORIZON) * PLOT_W;
const yFor = (v: number) => PAD_Y + (1 - v / MAX_V) * PLOT_H;

function guidePath(fn: (t: number) => number) {
  const pts: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const t = (i / 240) * HORIZON;
    pts.push(`${xFor(t)},${yFor(fn(t))}`);
  }
  return pts.join(" ");
}

const GUIDE_A = guidePath((t) => recycledPathKg(t, CYCLE_A));
const GUIDE_B = guidePath((t) => repairedPathKg(t));
const JUMP_YEARS = [2, 4, 6];

/** Impact Delta Visualizer — Block 3 (primary). Two cumulative-footprint paths racing across 6 years. */
export function RepairVsRecycleTimeline() {
  const markSeen = useProgress((s) => s.markSeen);
  const touchedRef = useRef(false);
  const [year, setYear] = useState(0);
  const [poppingYear, setPoppingYear] = useState<number | null>(null);
  const prevYearRef = useRef(0);

  useEffect(() => {
    const prev = prevYearRef.current;
    if (purchasesNeeded(year, CYCLE_A) > purchasesNeeded(prev, CYCLE_A)) {
      setPoppingYear(year);
      const t = setTimeout(() => setPoppingYear(null), 500);
      prevYearRef.current = year;
      return () => clearTimeout(t);
    }
    prevYearRef.current = year;
  }, [year]);

  const advance = (next: number) => {
    if (!touchedRef.current) {
      touchedRef.current = true;
      markSeen(R1.material, "rladder");
    }
    setYear(Math.max(0, Math.min(HORIZON, next)));
  };

  const revealX = useAnimatedNumber(xFor(year), 550);
  const cumulativeA = useAnimatedNumber(recycledPathKg(year, CYCLE_A));
  const cumulativeB = useAnimatedNumber(repairedPathKg(year));
  const gap = recycledPathKg(HORIZON, CYCLE_A) - repairedPathKg(HORIZON);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-line p-3">
          <p className="text-micro font-semibold uppercase tracking-wide text-ash">Device A — recycled after 2 years</p>
          <p className="text-readout tabular-nums text-ink">{fmt(cumulativeA)}</p>
        </div>
        <div className="rounded-xl border border-line p-3">
          <p className="text-micro font-semibold uppercase tracking-wide text-ash">Device B — repaired, used 6 years</p>
          <p className="text-readout tabular-nums text-accent">{fmt(cumulativeB)}</p>
        </div>
      </div>

      <svg viewBox={`0 0 ${PLOT_W + PAD_X * 2} ${PLOT_H + PAD_Y * 2}`} className="mt-4 w-full" role="img" aria-label="Cumulative carbon footprint of two devices over 6 years">
        <polyline points={GUIDE_A} fill="none" stroke="#5E6670" strokeWidth="1" opacity="0.18" />
        <polyline points={GUIDE_B} fill="none" stroke="#0E7A5A" strokeWidth="1" opacity="0.18" />

        <clipPath id="r1-reveal-clip">
          <rect x={0} y={0} width={Math.max(0, revealX)} height={PLOT_H + PAD_Y * 2} />
        </clipPath>
        <g clipPath="url(#r1-reveal-clip)">
          <polyline points={GUIDE_A} fill="none" stroke="#16191D" strokeWidth="2.25" />
          <polyline points={GUIDE_B} fill="none" stroke="#0E7A5A" strokeWidth="2.25" />
        </g>

        {JUMP_YEARS.map((jy) => {
          const revealed = revealX >= xFor(jy) - 1;
          return (
            <circle
              key={jy}
              cx={xFor(jy)}
              cy={yFor(recycledPathKg(jy, CYCLE_A))}
              r={4}
              fill="#16191D"
              className={clsx("transition-opacity duration-200", revealed ? "opacity-100" : "opacity-0", poppingYear === jy && "anim-pop")}
            />
          );
        })}

        {year === HORIZON && (
          <line
            x1={xFor(HORIZON) - 2}
            y1={yFor(recycledPathKg(HORIZON, CYCLE_A))}
            x2={xFor(HORIZON) - 2}
            y2={yFor(repairedPathKg(HORIZON))}
            stroke="#B87514"
            strokeWidth="2"
            className="reveal-in"
          />
        )}
      </svg>

      <div className="mt-2 flex items-center gap-2">
        <input
          type="range"
          min={0}
          max={HORIZON}
          step={1}
          value={year}
          onChange={(e) => advance(Number(e.target.value))}
          aria-label="Timeline year, 0 to 6"
          className="h-2 flex-1 cursor-pointer accent-accent"
        />
        <span className="w-16 shrink-0 text-right text-caption tabular-nums text-ash">Year {year}</span>
        <button
          type="button"
          onClick={() => advance(year + 1)}
          disabled={year >= HORIZON}
          className="btn-ghost flex shrink-0 items-center gap-1.5 px-3 py-1.5 text-caption disabled:cursor-not-allowed disabled:opacity-50"
        >
          Advance timeline <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="mt-1 text-micro text-ash">Both start at {fmt(BASELINE_KG)} — the same manufacturing baseline.</p>

      {year === HORIZON && (
        <div className="reveal-in mt-4 rounded-xl border border-warn/40 bg-canvas p-4">
          <p className="text-micro font-semibold uppercase tracking-wide text-warn">Year 6 gap</p>
          <p className="text-h3 tabular-nums text-ink">{fmt(gap)}</p>
        </div>
      )}
    </div>
  );
}
