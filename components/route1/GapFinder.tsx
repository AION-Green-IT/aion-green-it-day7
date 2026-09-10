"use client";

import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R1, GAP_ASPECTS, GAP_REQUIRED_COUNT, GAP_JUSTIFICATION_MIN_WORDS } from "@/lib/route1";
import { useRoute1 } from "./useRoute1";
import { Check } from "@/components/icons/LineIcons";
import { t } from "@/lib/i18n/core";

function wordCount(text: string): number {
  return text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
}

/** Stage C — pick exactly 3 aspects most critical to a realistic assessment, and justify each. */
export function GapFinder() {
  const r1 = useRoute1();
  const choose = useProgress((s) => s.choose);
  const setNote = useProgress((s) => s.setNote);

  const toggle = (aspectId: string) => {
    const isSelected = r1.stageCSelected.includes(aspectId);
    if (!isSelected && r1.stageCSelected.length >= GAP_REQUIRED_COUNT) return;
    choose(R1.stageC.selected(aspectId), isSelected ? "no" : "yes");
  };

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-caption text-ash">Select exactly {GAP_REQUIRED_COUNT} aspects.</p>
        <p className="text-caption tabular-nums text-ash">
          Selected: <span className="font-semibold text-ink">{r1.stageCSelected.length}</span> / {GAP_REQUIRED_COUNT}
        </p>
      </div>

      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {GAP_ASPECTS.map((a) => {
          const selected = r1.stageCSelected.includes(a.id);
          const disabled = !selected && r1.stageCSelected.length >= GAP_REQUIRED_COUNT;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => toggle(a.id)}
              aria-pressed={selected}
              className={clsx(
                "flex items-start gap-2.5 rounded-xl border p-3 text-left transition-colors duration-150",
                selected ? "border-accent bg-accentSoft" : disabled ? "border-line opacity-50" : "border-line hover:border-ash",
              )}
            >
              <span className={clsx("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", selected ? "bg-accent text-paper" : "bg-mist text-ash")}>
                {selected && <Check className="h-3 w-3" />}
              </span>
              <span>
                <span className="block text-caption font-semibold text-ink">{t(a.label)}</span>
                <span className="block text-micro text-ash">{t(a.description)}</span>
              </span>
            </button>
          );
        })}
      </div>

      {r1.stageCSelected.length > 0 && (
        <div className="mt-5 space-y-4 border-t border-line pt-4">
          {r1.stageCSelected.map((aspectId) => {
            const aspect = GAP_ASPECTS.find((a) => a.id === aspectId)!;
            const text = r1.stageCJustification[aspectId] ?? "";
            const words = wordCount(text);
            return (
              <div key={aspectId} id={`r1-stageC-${aspectId}`}>
                <label className="block">
                  <span className="text-caption font-semibold text-ink">Why does "{t(aspect.label)}" matter here?</span>
                  <p className="text-micro text-ash">A sentence or two — aim for at least {GAP_JUSTIFICATION_MIN_WORDS} words, but this won't block your export.</p>
                  <textarea
                    value={text}
                    onChange={(e) => setNote(R1.stageC.justification(aspectId), e.target.value)}
                    rows={2}
                    className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
                  />
                </label>
                <p className={clsx("mt-1 text-micro", words >= GAP_JUSTIFICATION_MIN_WORDS ? "text-accent" : "text-ash")}>
                  {words} word{words === 1 ? "" : "s"}
                  {words < GAP_JUSTIFICATION_MIN_WORDS && ` — ${GAP_JUSTIFICATION_MIN_WORDS - words} more to reach a solid justification`}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
