"use client";

import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R2, LEVERS, REQUIRED_LEVER_COUNT, TASK2, type Horizon2 } from "@/lib/route2";
import { useRoute2 } from "./useRoute2";
import { LeverRanking } from "./LeverRanking";
import { Check } from "@/components/icons/LineIcons";

const HORIZON_OPTIONS: { id: Horizon2; label: string }[] = [
  { id: "short", label: "Short-term" },
  { id: "medium", label: "Medium-term" },
  { id: "structural", label: "Structural" },
];

/** Task 2, Step 2 — lever checklist+justify, then (once 4 selected) ranking, first step, horizon, info gaps. */
export function StructuredAnalysis() {
  const r2 = useRoute2();

  return (
    <div className="space-y-8">
      <LeverChecklist />

      {r2.selectionComplete ? (
        <>
          <div id="r2-rank">
            <h4 className="text-caption font-semibold text-ink">{TASK2.step2.rankHeading}</h4>
            <div className="mt-2">
              <LeverRanking />
            </div>
          </div>

          <div id="r2-first-step" className="space-y-2">
            <h4 className="text-caption font-semibold text-ink">{TASK2.step2.firstStepHeading}</h4>
            <FirstStepDecision />
          </div>

          <div id="r2-horizon" className="space-y-2">
            <h4 className="text-caption font-semibold text-ink">{TASK2.step2.horizonHeading}</h4>
            <p className="text-micro text-ash">{TASK2.step2.horizonInstructions}</p>
            <HorizonClassification />
          </div>

          <div id="r2-infogaps" className="space-y-2">
            <h4 className="text-caption font-semibold text-ink">{TASK2.step2.infoGapsHeading}</h4>
            <InfoGaps />
          </div>
        </>
      ) : (
        <p className="text-caption text-ash">
          Select exactly {REQUIRED_LEVER_COUNT} levers above — ranking, first-step, and horizon sections unlock automatically.
        </p>
      )}
    </div>
  );
}

function LeverChecklist() {
  const r2 = useRoute2();
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const setNote = useProgress((s) => s.setNote);
  const notes = useProgress((s) => s.notes);

  return (
    <div id="r2-levers" className="space-y-3">
      <h4 className="text-caption font-semibold text-ink">{TASK2.step2.leverHeading}</h4>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-micro text-ash">{TASK2.step2.leverInstructions}</p>
        <p className="shrink-0 text-caption tabular-nums text-ash">
          <span className="font-semibold text-ink">{r2.selectedCount}</span> / {REQUIRED_LEVER_COUNT} selected
        </p>
      </div>

      <div className="space-y-2">
        {LEVERS.map((l) => {
          const selected = r2.selectedIds.includes(l.id);
          const capReached = r2.selectedCount >= REQUIRED_LEVER_COUNT && !selected;
          return (
            <div key={l.id} className={clsx("rounded-xl border p-3", selected ? "border-accent bg-accentSoft" : "border-line")}>
              <label className={clsx("flex items-start gap-2.5", capReached ? "cursor-not-allowed opacity-50" : "cursor-pointer")}>
                <input
                  type="checkbox"
                  checked={selected}
                  disabled={capReached}
                  onChange={(e) => toggleCheck(R2.leverSelected(l.id), e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-accent"
                />
                <span className="text-caption font-semibold text-ink">{l.label}</span>
              </label>
              {selected && (
                <label className="mt-2 block pl-6">
                  <span className="text-micro text-ash">Justify this selection in 1-2 sentences.</span>
                  <textarea
                    value={notes[R2.leverJustify(l.id)] ?? ""}
                    onChange={(e) => setNote(R2.leverJustify(l.id), e.target.value)}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-body text-ink"
                  />
                </label>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FirstStepDecision() {
  const r2 = useRoute2();
  const choose = useProgress((s) => s.choose);
  const setNote = useProgress((s) => s.setNote);

  return (
    <div className="space-y-3">
      <p className="text-micro text-ash">{TASK2.step2.firstStepPrompt}</p>
      <div className="flex flex-wrap gap-2">
        {r2.rankOrder.map((id) => {
          const lever = LEVERS.find((l) => l.id === id)!;
          const active = r2.firstStep === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => choose(R2.firstStep, id)}
              aria-pressed={active}
              className={clsx(
                "rounded-xl border px-3 py-2 text-caption font-semibold transition-colors duration-150",
                active ? "border-accent bg-accent text-paper" : "border-line text-ink hover:border-ash",
              )}
            >
              {lever.label}
            </button>
          );
        })}
      </div>
      {r2.firstStep && (
        <label className="block">
          <span className="text-caption font-semibold text-ink">{TASK2.step2.firstStepJustifyLabel}</span>
          <p className="text-micro text-ash">{TASK2.step2.firstStepJustifyCaption}</p>
          <textarea
            value={r2.firstStepJustify}
            onChange={(e) => setNote(R2.firstStepJustify, e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
          />
        </label>
      )}
    </div>
  );
}

function HorizonClassification() {
  const r2 = useRoute2();
  const choose = useProgress((s) => s.choose);

  return (
    <div className="space-y-2">
      {r2.rankOrder.map((id) => {
        const lever = LEVERS.find((l) => l.id === id)!;
        return (
          <div key={id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line p-3">
            <span className="text-caption text-ink">{lever.label}</span>
            <div className="flex gap-1.5">
              {HORIZON_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => choose(R2.leverHorizon(id), opt.id)}
                  aria-pressed={r2.leverHorizon[id] === opt.id}
                  className={clsx(
                    "rounded-lg border px-2.5 py-1.5 text-micro font-semibold transition-colors duration-150",
                    r2.leverHorizon[id] === opt.id ? "border-accent bg-accentSoft text-accent" : "border-line text-ink hover:border-ash",
                  )}
                >
                  {r2.leverHorizon[id] === opt.id && <Check className="mr-1 inline h-2.5 w-2.5" />}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function InfoGaps() {
  const r2 = useRoute2();
  const setNote = useProgress((s) => s.setNote);
  return (
    <label className="block">
      <span className="text-caption font-semibold text-ink">{TASK2.step2.infoGapsLabel}</span>
      <p className="text-micro text-ash">{TASK2.step2.infoGapsCaption}</p>
      <textarea
        value={r2.infoGaps}
        onChange={(e) => setNote(R2.infoGaps, e.target.value)}
        rows={3}
        className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
      />
    </label>
  );
}
