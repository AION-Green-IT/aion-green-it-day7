"use client";

import { TASK3 } from "@/lib/level3";
import { useProgress, useHydrated } from "@/lib/store";

/** Section 3.4 — the mandatory "what you postponed" field. */
export function ClosingField() {
  const hydrated = useHydrated();
  const value = useProgress((s) => s.notes[TASK3.closing.key] ?? "");
  const setNote = useProgress((s) => s.setNote);
  return (
    <div className="card p-5" style={{ borderTopWidth: 3, borderTopColor: "#B23B3B" }}>
      <label className="block">
        <span className="block text-body font-semibold text-ink">{TASK3.closing.label}</span>
        <span className="mb-1.5 mt-0.5 block text-caption text-ash">{TASK3.closing.hint}</span>
        <textarea
          value={hydrated ? value : ""}
          onChange={(e) => setNote(TASK3.closing.key, e.target.value)}
          rows={3}
          placeholder={TASK3.closing.placeholder}
          className="w-full resize-y rounded-xl border border-line bg-paper p-3 text-body text-ink placeholder:text-ash/60 focus:border-accent"
        />
      </label>
    </div>
  );
}
