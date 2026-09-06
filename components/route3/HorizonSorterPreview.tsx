"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R3, HORIZON_CARDS, type HorizonBucket } from "@/lib/route3";

const BUCKETS: { id: HorizonBucket; label: string }[] = [
  { id: "short", label: "Short-term" },
  { id: "medium", label: "Medium-term" },
  { id: "structural", label: "Structural" },
];

/** Impact Delta Visualizer — Block 4 (demo only). Drag each statement into its horizon. */
export function HorizonSorterPreview() {
  const markSeen = useProgress((s) => s.markSeen);
  const touchedRef = useRef(false);
  const [placements, setPlacements] = useState<Record<string, HorizonBucket>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [nudge, setNudge] = useState<string | null>(null);
  const [overBucket, setOverBucket] = useState<HorizonBucket | null>(null);

  const place = (cardId: string, bucket: HorizonBucket) => {
    if (!touchedRef.current) {
      touchedRef.current = true;
      markSeen(R3.material, "horizon");
    }
    setPlacements((p) => ({ ...p, [cardId]: bucket }));
    setSelected(null);
    const card = HORIZON_CARDS.find((c) => c.id === cardId);
    setNudge(
      card && card.suggested !== bucket
        ? "Does this need new governance approval, or can it be executed within current authority?"
        : null,
    );
  };

  const unplaced = HORIZON_CARDS.filter((c) => !placements[c.id]);

  return (
    <div>
      {unplaced.length > 0 && (
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
                "max-w-[220px] cursor-grab rounded-xl border bg-paper px-3 py-2 text-caption shadow-sm transition-all duration-150 active:cursor-grabbing",
                dragId === c.id && "is-dragging",
                selected === c.id ? "border-accent ring-2 ring-accent/30" : "border-line hover:border-ash",
              )}
            >
              {c.text}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {BUCKETS.map((b) => {
          const cards = HORIZON_CARDS.filter((c) => placements[c.id] === b.id);
          const isOver = overBucket === b.id;
          return (
            <div
              key={b.id}
              onDragOver={(e) => {
                e.preventDefault();
                if (overBucket !== b.id) setOverBucket(b.id);
              }}
              onDragLeave={() => setOverBucket((c) => (c === b.id ? null : c))}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData("text/plain");
                setOverBucket(null);
                if (id) place(id, b.id);
              }}
              onClick={() => {
                if (selected) place(selected, b.id);
              }}
              className={clsx(
                "min-h-[110px] rounded-xl border p-3 transition-colors duration-150",
                isOver ? "border-accent bg-accentSoft" : selected ? "border-dashed border-accent/60" : "border-line",
              )}
            >
              <p className="text-micro font-semibold uppercase tracking-wide text-ash">{b.label}</p>
              <div className="mt-2 space-y-1.5">
                {cards.map((c) => (
                  <div
                    key={c.id}
                    className={clsx(
                      "reveal-in rounded-lg px-2 py-1.5 text-micro shadow-sm",
                      c.suggested === b.id ? "bg-paper text-ink" : "bg-canvas text-ink ring-1 ring-warn/50",
                    )}
                  >
                    {c.text}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {nudge && <p className="reveal-in mt-3 text-caption text-warn">{nudge}</p>}
    </div>
  );
}
