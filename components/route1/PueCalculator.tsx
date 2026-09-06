"use client";

import { useProgress } from "@/lib/store";
import { R1, calcPue, PUE_BENCHMARKS } from "@/lib/route1";
import { useAnimatedNumber } from "@/lib/useAnimatedNumber";

/** Section 5 worked example: facility/IT draw sliders, live PUE readout against the two benchmarks. */
export function PueCalculator() {
  const notes = useProgress((s) => s.notes);
  const setNote = useProgress((s) => s.setNote);

  const facility = Number(notes[R1.pue.facility] ?? 180);
  const it = Number(notes[R1.pue.it] ?? 120);
  const pue = calcPue(facility, it);
  const pueAnimated = useAnimatedNumber(pue, 400);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-caption font-semibold text-ash">Total Facility Energy (kW)</span>
          <input
            type="number"
            min={1}
            max={2000}
            value={facility}
            onChange={(e) => setNote(R1.pue.facility, e.target.value)}
            className="w-32 rounded-lg border border-line bg-paper px-3 py-2 text-body text-ink"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-caption font-semibold text-ash">IT Equipment Energy (kW)</span>
          <input
            type="number"
            min={1}
            max={2000}
            value={it}
            onChange={(e) => setNote(R1.pue.it, e.target.value)}
            className="w-32 rounded-lg border border-line bg-paper px-3 py-2 text-body text-ink"
          />
        </label>
      </div>

      <div className="mt-5 rounded-xl border border-line bg-canvas p-4 text-center">
        <p className="text-micro font-semibold uppercase tracking-wide text-ash">PUE = Facility ÷ IT</p>
        <p className="text-display tabular-nums text-ink">{pueAnimated.toFixed(2)}</p>
        <p className="mt-1 text-caption text-ash">
          Global average (2024 survey): <span className="font-semibold text-ink">{PUE_BENCHMARKS.globalAverage}</span> · Hyperscale
          range: <span className="font-semibold text-ink">{PUE_BENCHMARKS.hyperscaleLow}–{PUE_BENCHMARKS.hyperscaleHigh}</span>
        </p>
      </div>
    </div>
  );
}
