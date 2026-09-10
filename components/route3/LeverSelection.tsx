"use client";

import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R3, LEVERS3, REQUIRED_LEVER_COUNT, HORIZON_OPTIONS, TASK3, materialRefs } from "@/lib/route3";
import { useRoute3 } from "./useRoute3";
import { Check } from "@/components/icons/LineIcons";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { t } from "@/lib/i18n/core";

const { phase1 } = TASK3;

export function LeverSelection() {
  const r3 = useRoute3();

  return (
    <div className="space-y-6">
      <LeverChecklist />

      {r3.leverSelectionComplete ? (
        <>
          <div id="r3-p1-firstmeasure" className="space-y-2">
            <h4 className="text-caption font-semibold text-ink">{phase1.firstMeasureHeading}</h4>
            <MaterialRefs refs={materialRefs(phase1.firstMeasureMaterial)} />
            <FirstMeasureDecision />
          </div>

          <div id="r3-p1-horizon" className="space-y-2">
            <h4 className="text-caption font-semibold text-ink">{phase1.horizonHeading}</h4>
            <p className="text-micro text-ash">{phase1.horizonInstructions}</p>
            <MaterialRefs refs={materialRefs(phase1.horizonMaterial)} />
            <HorizonTagging />
          </div>
        </>
      ) : (
        <p className="text-caption text-ash">
          Select exactly {REQUIRED_LEVER_COUNT} levers above — the first-measure decision and horizon tagging unlock automatically.
        </p>
      )}
    </div>
  );
}

function LeverChecklist() {
  const r3 = useRoute3();
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const setNote = useProgress((s) => s.setNote);
  const notes = useProgress((s) => s.notes);

  return (
    <div id="r3-p1-levers" className="space-y-3">
      <h4 className="text-caption font-semibold text-ink">{phase1.leverHeading}</h4>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-micro text-ash">{phase1.leverInstructions}</p>
        <p className="shrink-0 text-caption tabular-nums text-ash">
          <span className="font-semibold text-ink">{r3.selectedLeverIds.length}</span> / {REQUIRED_LEVER_COUNT} selected
        </p>
      </div>
      <MaterialRefs refs={materialRefs(phase1.leverMaterial)} />

      <div className="space-y-2">
        {LEVERS3.map((l) => {
          const selected = r3.selectedLeverIds.includes(l.id);
          const capReached = r3.selectedLeverIds.length >= REQUIRED_LEVER_COUNT && !selected;
          const justifyText = notes[R3.p1.leverJustify(l.id)] ?? "";
          const wordCount = justifyText.trim() ? justifyText.trim().split(/\s+/).length : 0;
          return (
            <div key={l.id} className={clsx("rounded-xl border p-3", selected ? "border-accent bg-accentSoft" : "border-line")}>
              <label className={clsx("flex items-start gap-2.5", capReached ? "cursor-not-allowed opacity-50" : "cursor-pointer")}>
                <input
                  type="checkbox"
                  checked={selected}
                  disabled={capReached}
                  onChange={(e) => toggleCheck(R3.p1.leverSelected(l.id), e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-accent"
                />
                <span className="text-caption font-semibold text-ink">{t(l.label)}</span>
              </label>
              {selected && (
                <label className="mt-2 block pl-6">
                  <span className="text-micro text-ash">Justify this selection — aim for at least ~15 words.</span>
                  <textarea
                    value={justifyText}
                    onChange={(e) => setNote(R3.p1.leverJustify(l.id), e.target.value)}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-body text-ink"
                  />
                  <p className={clsx("mt-0.5 text-micro tabular-nums", wordCount >= 15 ? "text-accent" : "text-ash")}>
                    {wordCount} word{wordCount === 1 ? "" : "s"}
                  </p>
                </label>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FirstMeasureDecision() {
  const r3 = useRoute3();
  const choose = useProgress((s) => s.choose);
  const setNote = useProgress((s) => s.setNote);

  return (
    <div className="space-y-3">
      <p className="text-micro text-ash">{t(phase1.firstMeasurePrompt)}</p>
      <div className="flex flex-wrap gap-2">
        {r3.selectedLeverIds.map((id) => {
          const lever = LEVERS3.find((l) => l.id === id)!;
          const active = r3.firstMeasure === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => choose(R3.p1.firstMeasure, id)}
              aria-pressed={active}
              className={clsx(
                "rounded-xl border px-3 py-2 text-caption font-semibold transition-colors duration-150",
                active ? "border-accent bg-accent text-paper" : "border-line text-ink hover:border-ash",
              )}
            >
              {t(lever.label)}
            </button>
          );
        })}
      </div>
      {r3.firstMeasure && (
        <label className="block">
          <span className="text-caption font-semibold text-ink">{phase1.firstMeasureJustifyLabel}</span>
          <textarea
            value={r3.firstMeasureJustify}
            onChange={(e) => setNote(R3.p1.firstMeasureJustify, e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
          />
        </label>
      )}
    </div>
  );
}

function HorizonTagging() {
  const r3 = useRoute3();
  const choose = useProgress((s) => s.choose);

  return (
    <div className="space-y-2">
      {r3.selectedLeverIds.map((id) => {
        const lever = LEVERS3.find((l) => l.id === id)!;
        return (
          <div key={id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line p-3">
            <span className="text-caption text-ink">{t(lever.label)}</span>
            <div className="flex gap-1.5">
              {HORIZON_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => choose(R3.p1.leverHorizon(id), opt.id)}
                  aria-pressed={r3.leverHorizon[id] === opt.id}
                  className={clsx(
                    "rounded-lg border px-2.5 py-1.5 text-micro font-semibold transition-colors duration-150",
                    r3.leverHorizon[id] === opt.id ? "border-accent bg-accentSoft text-accent" : "border-line text-ink hover:border-ash",
                  )}
                >
                  {r3.leverHorizon[id] === opt.id && <Check className="mr-1 inline h-2.5 w-2.5" />}
                  {t(opt.label)}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
