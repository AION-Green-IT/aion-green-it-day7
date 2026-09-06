"use client";

import { useProgress } from "@/lib/store";
import { R2, CASE_BRIEF, CAPEX_LAYERS, MODEL_B_LAYERS, DAAS_TOTAL_EUR, DAAS_INCLUDES, UNITS_MIN, UNITS_MAX, TASK2 } from "@/lib/route2";
import { useRoute2 } from "./useRoute2";
import { ToggleableCostBar, SolidCostBar } from "./HiddenCostIceberg";
import { DependencyRiskMeter } from "./DependencyRiskMeter";
import { Check } from "@/components/icons/LineIcons";

/** Step 3 — reuses & extends the Hidden Cost Iceberg (3-way) and the Dependency Risk Meter (fixed to Model C). */
export function HiddenCostRiskCalculator() {
  const setNote = useProgress((s) => s.setNote);
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const r2 = useRoute2();

  const units = r2.calcUnits;
  const scale = (layers: readonly { id: string; label: string; amountEur: number }[]) =>
    layers.map((l) => ({ ...l, amountEur: Math.round(l.amountEur * units) }));

  return (
    <div>
      <label className="block max-w-xs">
        <span className="text-caption font-semibold text-ash">Fleet size</span>
        <input
          type="range"
          min={UNITS_MIN}
          max={UNITS_MAX}
          step={10}
          value={units}
          onChange={(e) => setNote(R2.calcUnits, e.target.value)}
          className="mt-1 h-2 w-full cursor-pointer accent-accent"
          aria-label="Fleet size, 200 to 500 units"
        />
        <span className="mt-1 block text-caption tabular-nums text-ink">{units} units</span>
      </label>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <ToggleableCostBar label={`${CASE_BRIEF.modelA.label} — CapEx`} layers={scale(CAPEX_LAYERS)} />
        <ToggleableCostBar label={`${CASE_BRIEF.modelB.label} — CapEx`} layers={scale(MODEL_B_LAYERS)} color="bg-slate" />
        <SolidCostBar
          label={`${CASE_BRIEF.modelC.label} — DaaS`}
          totalEur={Math.round(DAAS_TOTAL_EUR * units)}
          note={DAAS_INCLUDES}
        />
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="text-caption font-semibold text-ink">Dependency risk — {CASE_BRIEF.modelC.label}</p>
        <p className="text-micro text-ash">Model C is the DaaS contract, the most exposed to vendor lock-in.</p>
        <div className="mt-3">
          <DependencyRiskMeter selectable={false} fixedScenarioId="single-proprietary" />
        </div>
        <label className="mt-3 block">
          <span className="text-caption font-semibold text-ink">{TASK2.step3.dependencyPrompt}</span>
          <p className="text-micro text-ash">Describe your actual leverage — strong, weak, or dependent on a specific factor — and why.</p>
          <textarea
            value={r2.dependencyReflection}
            onChange={(e) => setNote(R2.dependencyReflection, e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={() => toggleCheck(R2.costUsed, true)}
        className="btn-accent mt-5 flex items-center gap-2"
      >
        {r2.costUsed && <Check className="h-4 w-4" />}
        {r2.costUsed ? "Analysis saved" : TASK2.step3.saveLabel}
      </button>
    </div>
  );
}
