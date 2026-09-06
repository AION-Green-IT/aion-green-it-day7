"use client";

import { useProgress } from "@/lib/store";
import {
  R2,
  TASK2,
  UTILIZATION_LABELS,
  COOLING_LABELS,
  TRANSPARENCY_LABELS,
  projectDials,
  type DialLevel,
} from "@/lib/route2";

function readLevel(raw: string | undefined): DialLevel {
  const n = Number(raw ?? 1);
  return (n === 0 || n === 1 || n === 2 ? n : 1) as DialLevel;
}

/** Task 2, Step 1 — exploratory only, never gates anything. Directional indicators, not fake-precise numbers. */
export function ScenarioDials() {
  const notes = useProgress((s) => s.notes);
  const setNote = useProgress((s) => s.setNote);

  const utilization = readLevel(notes[R2.dialUtilization]);
  const cooling = readLevel(notes[R2.dialCooling]);
  const transparency = readLevel(notes[R2.dialTransparency]);
  const projection = projectDials(utilization, cooling, transparency);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Dial label={TASK2.step1.utilizationLabel} levels={UTILIZATION_LABELS} value={utilization} onChange={(v) => setNote(R2.dialUtilization, String(v))} />
        <Dial label={TASK2.step1.coolingLabel} levels={COOLING_LABELS} value={cooling} onChange={(v) => setNote(R2.dialCooling, String(v))} />
        <Dial label={TASK2.step1.transparencyLabel} levels={TRANSPARENCY_LABELS} value={transparency} onChange={(v) => setNote(R2.dialTransparency, String(v))} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <ProjectionCard label="Energy Cost Trend" indicator={projection.energyCostTrend} />
        <ProjectionCard label="Risk Exposure" indicator={projection.riskExposure} />
        <ProjectionCard label="Investment Needed" indicator={projection.investmentNeeded} />
      </div>
    </div>
  );
}

function Dial({
  label,
  levels,
  value,
  onChange,
}: {
  label: string;
  levels: readonly string[];
  value: DialLevel;
  onChange: (v: DialLevel) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-caption font-semibold text-ash">{label}</span>
        <span className="tabular-nums text-caption text-ink">{levels[value]}</span>
      </div>
      <input
        type="range"
        min={0}
        max={2}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) as DialLevel)}
        aria-label={label}
        className="mt-1 h-2 w-full cursor-pointer accent-accent"
      />
      <div className="mt-0.5 flex justify-between text-micro text-ash">
        {levels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectionCard({ label, indicator }: { label: string; indicator: { arrows: string; label: string } }) {
  return (
    <div className="rounded-xl border border-line bg-canvas p-4 text-center">
      <p className="text-micro font-semibold uppercase tracking-wide text-ash">{label}</p>
      <p className="mt-1 text-h1 text-ink">{indicator.arrows}</p>
      <p className="mt-1 text-caption text-ash">{indicator.label}</p>
    </div>
  );
}
