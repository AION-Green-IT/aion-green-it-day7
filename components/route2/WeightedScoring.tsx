"use client";

import { useProgress } from "@/lib/store";
import { R2, CRITERIA, TASK2, redistributeWeights } from "@/lib/route2";
import { useRoute2 } from "./useRoute2";
import { RadarChart } from "@/components/ui/RadarChart";
import { Check } from "@/components/icons/LineIcons";

const AXES = CRITERIA.map((c) => ({ id: c.id, label: c.label }));
const MODELS = ["modelA", "modelB", "modelC"] as const;
const MODEL_COLORS: Record<string, string> = { modelA: "#16191D", modelB: "#0E7A5A", modelC: "#B87514" };
const MODEL_LABELS: Record<string, string> = { modelA: "Model A", modelB: "Model B", modelC: "Model C" };

/** Step 2 — reuses & extends Block 4's Live Weighting Preview with real weights, real scores, and a lock-in gate. */
export function WeightedScoring() {
  const choose = useProgress((s) => s.choose);
  const setNote = useProgress((s) => s.setNote);
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const r2 = useRoute2();

  const onWeightChange = (id: string, value: number) => {
    const next = redistributeWeights(r2.weights, id, value);
    Object.entries(next).forEach(([k, v]) => choose(R2.weight(k), String(v)));
  };

  return (
    <div>
      <div className="space-y-2">
        <p className="text-caption font-semibold text-ink">Set your weights — always sums to 100%</p>
        {CRITERIA.map((c) => (
          <div key={c.id} className="flex items-center gap-3">
            <span className="w-48 shrink-0 text-caption text-ash">{c.label}</span>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={r2.weights[c.id]}
              disabled={r2.scoringLocked}
              onChange={(e) => onWeightChange(c.id, Number(e.target.value))}
              className="h-2 flex-1 cursor-pointer accent-accent disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={`${c.label} weight`}
            />
            <span className="w-10 shrink-0 text-right text-caption tabular-nums text-ink">{r2.weights[c.id]}%</span>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-line pt-4">
        <p className="text-caption font-semibold text-ink">Score each model, 1–5</p>
        {MODELS.map((model) => (
          <div key={model} className="mt-3">
            <p className="text-caption font-semibold" style={{ color: MODEL_COLORS[model] }}>
              {MODEL_LABELS[model]}
            </p>
            <div className="mt-1 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
              {CRITERIA.map((c) => (
                <div key={c.id} className="flex items-center gap-2">
                  <span className="w-40 shrink-0 text-micro text-ash">{c.label}</span>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={r2.scores[model][c.id]}
                    disabled={r2.scoringLocked}
                    onChange={(e) => setNote(R2.score(model, c.id), e.target.value)}
                    className="h-1.5 flex-1 cursor-pointer accent-accent disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={`${MODEL_LABELS[model]} ${c.label} score`}
                  />
                  <span className="w-4 shrink-0 text-right text-micro tabular-nums text-ink">{r2.scores[model][c.id]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="mx-auto w-full max-w-xs">
          <RadarChart
            axes={AXES}
            weights={r2.weights}
            series={MODELS.map((m) => ({ id: m, label: MODEL_LABELS[m], color: MODEL_COLORS[m], scores: r2.scores[m] }))}
          />
        </div>
        <div className="space-y-2 self-center">
          {MODELS.map((m) => (
            <div key={m} className="rounded-lg border border-line px-3 py-2">
              <span className="text-caption font-semibold" style={{ color: MODEL_COLORS[m] }}>
                {MODEL_LABELS[m]}
              </span>
              <p className="text-readout tabular-nums text-ink">{r2.totals[m].toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => toggleCheck(R2.scoringLocked, true)}
        disabled={r2.scoringLocked}
        className="btn-accent mt-5 flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-80"
      >
        {r2.scoringLocked && <Check className="h-4 w-4" />}
        {r2.scoringLocked ? "Scoring locked in" : TASK2.step2.lockLabel}
      </button>
    </div>
  );
}
