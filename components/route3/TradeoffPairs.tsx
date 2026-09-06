"use client";

import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R3, TENSION_PAIRS } from "@/lib/route3";
import { useRoute3 } from "./useRoute3";

export function TradeoffPairs() {
  const r3 = useRoute3();
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const setNote = useProgress((s) => s.setNote);
  const notes = useProgress((s) => s.notes);

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {TENSION_PAIRS.map((pair) => {
        const selected = r3.selectedPairIds.includes(pair.id);
        return (
          <div key={pair.id} className={clsx("rounded-xl border p-3", selected ? "border-accent bg-accentSoft" : "border-line")}>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={selected}
                onChange={(e) => toggleCheck(R3.p2.tradeoffSelected(pair.id), e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-accent"
              />
              <span className="text-caption font-semibold text-ink">{pair.label}</span>
            </label>
            {selected && (
              <label className="mt-2 block pl-6">
                <span className="text-micro text-ash">Why is this a genuine tension for PolarEdge?</span>
                <textarea
                  value={notes[R3.p2.tradeoffJustify(pair.id)] ?? ""}
                  onChange={(e) => setNote(R3.p2.tradeoffJustify(pair.id), e.target.value)}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-body text-ink"
                />
              </label>
            )}
          </div>
        );
      })}
    </div>
  );
}
