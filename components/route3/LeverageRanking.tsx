"use client";

import { useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R3, LEVERAGE_CANDIDATES, TASK3 } from "@/lib/route3";
import { useRoute3 } from "./useRoute3";

/** Step 2 — force a real trade-off: 4 slots for 6 candidates, the other 2 fall out automatically. */
export function LeverageRanking() {
  const choose = useProgress((s) => s.choose);
  const setNote = useProgress((s) => s.setNote);
  const r3 = useRoute3();
  const [selected, setSelected] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overSlot, setOverSlot] = useState<number | null>(null);

  const place = (candId: string, rank: number) => {
    const prevRank = r3.leverageRanks[candId];
    const displaced = LEVERAGE_CANDIDATES.find((c) => c.id !== candId && r3.leverageRanks[c.id] === rank);
    if (displaced) choose(R3.leverageRank(displaced.id), prevRank ? String(prevRank) : "");
    choose(R3.leverageRank(candId), String(rank));
    setSelected(null);
  };

  const unplaced = LEVERAGE_CANDIDATES.filter((c) => !r3.leverageRanks[c.id]);
  const showAsPool = r3.rankedCount < 4;
  const topCandidate = LEVERAGE_CANDIDATES.find((c) => c.id === r3.topLeverageId);

  return (
    <div>
      {showAsPool && (
        <div className="flex flex-wrap gap-2">
          {unplaced.map((c) => (
            <div
              key={c.id}
              draggable
              role="button"
              tabIndex={0}
              aria-pressed={selected === c.id}
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", c.id);
                e.dataTransfer.effectAllowed = "move";
                setDragId(c.id);
              }}
              onDragEnd={() => setDragId(null)}
              onClick={() => setSelected((s) => (s === c.id ? null : c.id))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected((s) => (s === c.id ? null : c.id));
                }
              }}
              className={clsx(
                "max-w-xs cursor-grab rounded-xl border bg-paper px-3 py-2 text-caption font-semibold shadow-sm transition-all duration-150 active:cursor-grabbing",
                dragId === c.id && "is-dragging",
                selected === c.id ? "border-accent text-accent ring-2 ring-accent/30" : "border-line text-ink hover:border-ash",
              )}
            >
              {c.label}
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((rank) => {
          const candHere = LEVERAGE_CANDIDATES.find((c) => r3.leverageRanks[c.id] === rank);
          const isOver = overSlot === rank;
          return (
            <div
              key={rank}
              onDragOver={(e) => {
                e.preventDefault();
                if (overSlot !== rank) setOverSlot(rank);
              }}
              onDragLeave={() => setOverSlot((s) => (s === rank ? null : s))}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData("text/plain");
                setOverSlot(null);
                if (id) place(id, rank);
              }}
              onClick={() => {
                if (selected) place(selected, rank);
              }}
              className={clsx(
                "min-h-[80px] rounded-xl border p-3 transition-colors duration-150",
                isOver ? "border-accent bg-accentSoft" : selected ? "border-dashed border-accent/60" : "border-line",
              )}
            >
              <p className="text-micro font-semibold uppercase tracking-wide text-ash">Priority {rank}</p>
              {candHere && <p className="reveal-in mt-1 text-caption font-semibold text-ink">{candHere.label}</p>}
            </div>
          );
        })}
      </div>

      {!showAsPool && unplaced.length > 0 && (
        <div className="mt-3 rounded-xl border border-dashed border-line p-3">
          <p className="text-micro font-semibold uppercase tracking-wide text-ash">Not prioritized</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {unplaced.map((c) => (
              <span key={c.id} className="rounded-full bg-mist px-3 py-1 text-caption text-ash">
                {c.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {topCandidate && (
        <label className="mt-4 block">
          <span className="text-caption font-semibold text-ink">{TASK3.phase1.step2.justifyLabel}</span>
          <p className="text-micro text-ash">Your #1: {topCandidate.label}</p>
          <textarea
            value={r3.leverageJustify}
            onChange={(e) => setNote(R3.leverageJustify, e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
          />
        </label>
      )}
    </div>
  );
}
