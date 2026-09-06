"use client";

import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R1, CASE_BRIEF, BASELINE_KG, purchasesNeeded } from "@/lib/route1";
import { useRoute1 } from "./useRoute1";
import { useAnimatedNumber } from "@/lib/useAnimatedNumber";
import { Check } from "@/components/icons/LineIcons";

const fmtT = (n: number) => `${(n / 1000).toFixed(1)} t CO2e`;

/** Step 3 — projects vendor replacement schedules onto Block 2's carbon baseline. */
export function LifecycleCostCalculator() {
  const setNote = useProgress((s) => s.setNote);
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const r1 = useRoute1();

  const units = r1.calcUnits;
  const years = r1.calcYears;

  const v1Purchases = purchasesNeeded(years, CASE_BRIEF.vendor1.cycleYears);
  const v2Purchases = purchasesNeeded(years, CASE_BRIEF.vendor2.cycleYears);
  const v1Total = v1Purchases * units * BASELINE_KG;
  const v2Total = v2Purchases * units * BASELINE_KG;
  const delta = Math.abs(v1Total - v2Total);

  const v1Animated = useAnimatedNumber(v1Total);
  const v2Animated = useAnimatedNumber(v2Total);
  const deltaAnimated = useAnimatedNumber(delta);
  const maxTotal = Math.max(v1Total, v2Total, 1);

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-caption font-semibold text-ash">Units</span>
          <input
            type="number"
            min={1}
            max={5000}
            value={units}
            onChange={(e) => setNote(R1.calcUnits, e.target.value)}
            className="w-28 rounded-lg border border-line bg-paper px-3 py-2 text-body text-ink"
          />
        </label>
        <div className="min-w-[200px] flex-1">
          <div className="flex items-baseline justify-between">
            <span className="text-caption font-semibold text-ash">Projection horizon</span>
            <span className="tabular-nums text-caption text-ink">{years} years</span>
          </div>
          <input
            type="range"
            min={6}
            max={15}
            step={1}
            value={years}
            onChange={(e) => setNote(R1.calcYears, e.target.value)}
            aria-label="Projection horizon, 6 to 15 years"
            className="h-2 w-full cursor-pointer accent-accent"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <VendorColumn
          label={CASE_BRIEF.vendor1.label}
          cycle={CASE_BRIEF.vendor1.cycleYears}
          purchases={v1Purchases}
          totalKg={v1Animated}
          widthPct={(v1Total / maxTotal) * 100}
          tone="ink"
        />
        <VendorColumn
          label={CASE_BRIEF.vendor2.label}
          cycle={CASE_BRIEF.vendor2.cycleYears}
          purchases={v2Purchases}
          totalKg={v2Animated}
          widthPct={(v2Total / maxTotal) * 100}
          tone="accent"
        />
      </div>

      <div className="mt-5 rounded-xl border border-line bg-canvas p-4 text-center">
        <p className="text-micro font-semibold uppercase tracking-wide text-ash">
          {years}-year, {units}-unit carbon delta
        </p>
        <p className="text-display tabular-nums text-ink">{fmtT(deltaAnimated)}</p>
      </div>

      <button
        type="button"
        onClick={() => toggleCheck(R1.calcUsed, true)}
        className={clsx("btn-accent mt-4 flex items-center gap-2", r1.calcUsed && "opacity-80")}
      >
        {r1.calcUsed && <Check className="h-4 w-4" />}
        {r1.calcUsed ? "Data linked to your analysis" : "Use this data in my analysis"}
      </button>
    </div>
  );
}

function VendorColumn({
  label,
  cycle,
  purchases,
  totalKg,
  widthPct,
  tone,
}: {
  label: string;
  cycle: number;
  purchases: number;
  totalKg: number;
  widthPct: number;
  tone: "ink" | "accent";
}) {
  return (
    <div className="rounded-xl border border-line p-4">
      <p className="text-caption font-semibold text-ink">{label}</p>
      <p className="text-micro text-ash">
        Replacement cycle: {cycle} years (fixed, from case brief) · {purchases} units purchased over horizon
      </p>
      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-mist">
        <div
          style={{ width: `${widthPct}%` }}
          className={clsx(
            "h-full rounded-full transition-[width] duration-500 ease-out",
            tone === "accent" ? "bg-accent" : "bg-ink",
          )}
        />
      </div>
      <p className="mt-2 text-readout tabular-nums text-ink">{fmtT(totalKg)}</p>
    </div>
  );
}
