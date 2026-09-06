"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R3, BOARD_CHALLENGE, TASK3 } from "@/lib/route3";
import { useRoute3 } from "./useRoute3";
import { Close } from "@/components/icons/LineIcons";

/** Step 4 — a curveball modal, same pattern as Route 1's Management Pushback, board-level context. */
export function BoardChallenge() {
  const r3 = useRoute3();
  const setNote = useProgress((s) => s.setNote);
  const choose = useProgress((s) => s.choose);
  const [open, setOpen] = useState(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (r3.step3Complete && !r3.step4Complete && !triggered) {
      setOpen(true);
      setTriggered(true);
    }
  }, [r3.step3Complete, r3.step4Complete, triggered]);

  const selectedChoice = BOARD_CHALLENGE.choices.find((c) => c.id === r3.boardChoice);
  const canConfirm = !!r3.boardChoice && r3.execSummary.trim().length >= 30;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-h3 text-ink">{TASK3.phase2.step4.heading}</h3>
        {r3.step3Complete && !open && (
          <button type="button" onClick={() => setOpen(true)} className="btn-ghost px-3 py-1.5 text-caption">
            {r3.step4Complete ? "Review" : "Continue"}
          </button>
        )}
      </div>

      {!r3.step3Complete && <p className="text-caption text-ash">Complete Step 3 first.</p>}

      {r3.step4Complete && !open && selectedChoice && (
        <div className="reveal-in rounded-xl border border-line bg-canvas p-4">
          <p className="text-caption font-semibold text-ink">{selectedChoice.label}</p>
          <p className="mt-1 text-caption text-ash">{selectedChoice.consequence}</p>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "var(--backdrop)" }}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="board-title"
            className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl bg-paper shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-line p-4">
              <p className="text-micro font-semibold uppercase tracking-wide text-warn">Board member</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-ash hover:text-ink">
                <Close className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <p id="board-title" className="text-h3 text-ink">
                {BOARD_CHALLENGE.prompt}
              </p>

              <div className="space-y-2">
                {BOARD_CHALLENGE.choices.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => choose(R3.boardChoice, c.id)}
                    aria-pressed={r3.boardChoice === c.id}
                    className={clsx(
                      "w-full rounded-xl border p-3 text-left transition-colors duration-150",
                      r3.boardChoice === c.id ? "border-accent bg-accentSoft" : "border-line hover:border-ash",
                    )}
                  >
                    <p className="text-caption font-semibold text-ink">{c.label}</p>
                    {r3.boardChoice === c.id && <p className="reveal-in mt-1 text-micro text-ash">{c.consequence}</p>}
                  </button>
                ))}
              </div>

              <label className="block">
                <span className="text-caption font-semibold text-ink">{TASK3.phase2.step4.summaryLabel}</span>
                <textarea
                  value={r3.execSummary}
                  onChange={(e) => setNote(R3.execSummary, e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
                />
              </label>
            </div>
            <div className="flex justify-end gap-2 border-t border-line p-4">
              <button type="button" disabled={!canConfirm} onClick={() => setOpen(false)} className="btn-accent disabled:cursor-not-allowed">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
