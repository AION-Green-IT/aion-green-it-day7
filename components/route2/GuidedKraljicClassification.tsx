"use client";

import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R2, KRALJIC_QUESTIONS, QUADRANT_LABEL } from "@/lib/route2";
import { useRoute2 } from "./useRoute2";
import { KraljicMatrix } from "./KraljicMatrix";

/** Step 1 — the learner's own answers, not a manual drag, determine the quadrant. */
export function GuidedKraljicClassification() {
  const choose = useProgress((s) => s.choose);
  const r2 = useRoute2();

  return (
    <div className="space-y-4">
      {KRALJIC_QUESTIONS.map((q) => (
        <div key={q.id} className="rounded-xl border border-line p-4">
          <p className="text-caption font-semibold text-ink">{q.prompt}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {q.options.map((o) => {
              const selected = r2.kraljicAnswers[q.id] === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => choose(R2.kraljicQ(q.id), o.id)}
                  aria-pressed={selected}
                  className={clsx(
                    "rounded-lg border px-3 py-1.5 text-caption font-semibold transition-colors duration-150",
                    selected ? "border-accent bg-accent text-paper" : "border-line text-ink hover:border-ash",
                  )}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {r2.step1Complete && r2.quadrant && (
        <div className="reveal-in rounded-xl border border-line bg-canvas p-5">
          <div className="mx-auto max-w-xs">
            <KraljicMatrix risk={(r2.riskScore / 6) * 100} impact={(r2.impactScore / 6) * 100} label={QUADRANT_LABEL[r2.quadrant]} />
          </div>
          <p className="mt-3 text-caption text-ash">{reasoningFor(r2)}</p>
        </div>
      )}
    </div>
  );
}

function reasoningFor(r2: ReturnType<typeof useRoute2>): string {
  const describe = (axis: "risk" | "impact") =>
    KRALJIC_QUESTIONS.filter((q) => q.axis === axis)
      .map((q) => {
        const opt = q.options.find((o) => o.id === r2.kraljicAnswers[q.id]);
        return opt ? `"${opt.label}"` : "";
      })
      .filter(Boolean)
      .join(", ");

  return `This landed in ${QUADRANT_LABEL[r2.quadrant!]}. Supply risk (${r2.riskScore}/6) came from your answers ${describe("risk")}. Business impact (${r2.impactScore}/6) came from ${describe("impact")}.`;
}
