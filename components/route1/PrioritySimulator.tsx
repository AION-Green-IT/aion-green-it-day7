"use client";

import { useProgress } from "@/lib/store";
import { R1, RADAR_AXES, SIM_OPTIONS, TASK1B, type SimLevel } from "@/lib/route1";
import { useRoute1 } from "./useRoute1";
import { RadarChart, type RadarSeries } from "@/components/ui/RadarChart";

const LEVELS: SimLevel[] = ["low", "med", "high"];
const LEVEL_LABEL: Record<SimLevel, string> = { low: "Low", med: "Medium", high: "High" };
const evenWeight = 100 / RADAR_AXES.length;

function costWeight(level: SimLevel): number {
  if (level === "low") return evenWeight * 1.6;
  if (level === "high") return evenWeight * 0.5;
  return evenWeight;
}

/** Task 1b, Step 1 — exploratory sliders re-weight the radar's cost-like axes live. Never gates anything. */
export function PrioritySimulator() {
  const choose = useProgress((s) => s.choose);
  const r1 = useRoute1();

  const weights: Record<string, number> = Object.fromEntries(RADAR_AXES.map((a) => [a.id, evenWeight]));
  weights.investment = costWeight(r1.simBudget);
  weights.risk = costWeight(r1.simRisk);

  const series: RadarSeries[] = SIM_OPTIONS.map((o) => ({ id: o.id, label: o.label, color: o.color, scores: o.scores }));

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SliderField
          label={TASK1B.step1.budgetLabel}
          value={r1.simBudget}
          onChange={(v) => choose(R1.simBudget, v)}
        />
        <SliderField
          label={TASK1B.step1.riskLabel}
          value={r1.simRisk}
          onChange={(v) => choose(R1.simRisk, v)}
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[280px_1fr]">
        <RadarChart axes={RADAR_AXES} series={series} weights={weights} />
        <div className="space-y-2 self-center">
          {SIM_OPTIONS.map((o) => (
            <div key={o.id} className="flex items-start gap-2 text-caption">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: o.color }} />
              <div>
                <p className="font-semibold text-ink">{o.label}</p>
                <p className="text-ash">{o.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-micro text-ash">{TASK1B.step1.chartCaption}</p>
    </div>
  );
}

function SliderField({ label, value, onChange }: { label: string; value: SimLevel; onChange: (v: SimLevel) => void }) {
  const index = LEVELS.indexOf(value);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-caption font-semibold text-ash">{label}</span>
        <span className="tabular-nums text-caption text-ink">{LEVEL_LABEL[value]}</span>
      </div>
      <input
        type="range"
        min={0}
        max={2}
        step={1}
        value={index}
        onChange={(e) => onChange(LEVELS[Number(e.target.value)])}
        aria-label={label}
        className="mt-1 h-2 w-full cursor-pointer accent-accent"
      />
      <div className="mt-0.5 flex justify-between text-micro text-ash">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>
  );
}
