"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R1, TASK1 } from "@/lib/route1";
import { useRoute1 } from "./useRoute1";
import { Close } from "@/components/icons/LineIcons";

const hasDigit = (s: string) => /\d/.test(s);

/** Step 5 — a curveball modal that only surfaces once Step 4 is submitted. */
export function ManagementPushback() {
  const r1 = useRoute1();
  const setNote = useProgress((s) => s.setNote);
  const choose = useProgress((s) => s.choose);
  const [open, setOpen] = useState(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (r1.step4Complete && !r1.step5Complete && !triggered) {
      setOpen(true);
      setTriggered(true);
    }
  }, [r1.step4Complete, r1.step5Complete, triggered]);

  const justificationValid = hasDigit(r1.pushbackJustification);
  const selectedChoice = TASK1.step5.choices.find((c) => c.id === r1.pushbackChoice);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-h3 text-ink">{TASK1.step5.heading}</h3>
        {r1.step4Complete && !open && (
          <button type="button" onClick={() => setOpen(true)} className="btn-ghost px-3 py-1.5 text-caption">
            {r1.step5Complete ? "Review" : "Continue"}
          </button>
        )}
      </div>

      {!r1.step4Complete && <p className="text-caption text-ash">Complete Step 4 first.</p>}

      {r1.step5Complete && !open && selectedChoice && (
        <div className="reveal-in rounded-xl border border-line bg-canvas p-4">
          <p className="text-caption font-semibold text-ink">{selectedChoice.label}</p>
          <p className="mt-1 text-caption text-ash">{selectedChoice.consequence}</p>
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "var(--backdrop)" }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pushback-title"
            className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl bg-paper shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-line p-4">
              <p className="text-micro font-semibold uppercase tracking-wide text-warn">Finance Director</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-ash hover:text-ink">
                <Close className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <p id="pushback-title" className="text-h3 text-ink">
                &ldquo;{TASK1.step5.prompt}&rdquo;
              </p>

              <label className="block">
                <span className="text-caption font-semibold text-ink">{TASK1.step5.justificationLabel}</span>
                <textarea
                  value={r1.pushbackJustification}
                  onChange={(e) => setNote(R1.pushbackJustification, e.target.value)}
                  rows={3}
                  placeholder="e.g. Over 12 years, Vendor 2 saves 179.4 t CO2e across the fleet..."
                  className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
                />
                {!justificationValid && r1.pushbackJustification.length > 0 && (
                  <p className="mt-1 text-micro text-warn">Include at least one number from Step 3.</p>
                )}
              </label>

              <div className="space-y-2">
                {TASK1.step5.choices.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => choose(R1.pushbackChoice, c.id)}
                    aria-pressed={r1.pushbackChoice === c.id}
                    className={clsx(
                      "w-full rounded-xl border p-3 text-left transition-colors duration-150",
                      r1.pushbackChoice === c.id ? "border-accent bg-accentSoft" : "border-line hover:border-ash",
                    )}
                  >
                    <p className="text-caption font-semibold text-ink">{c.label}</p>
                    {r1.pushbackChoice === c.id && <p className="reveal-in mt-1 text-micro text-ash">{c.consequence}</p>}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-line p-4">
              <button
                type="button"
                disabled={!(justificationValid && !!r1.pushbackChoice)}
                onClick={() => setOpen(false)}
                className="btn-accent disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
