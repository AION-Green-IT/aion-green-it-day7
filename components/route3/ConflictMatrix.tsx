"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R3, CONFLICT_STATEMENTS } from "@/lib/route3";
import { useRoute3 } from "./useRoute3";

/** Step 3.3 — a genuinely free 2D placement: drop (or tap) position becomes the statement's coordinates. */
export function ConflictMatrix() {
  const setNote = useProgress((s) => s.setNote);
  const r3 = useRoute3();
  const matrixRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  const placeAt = (id: string, clientX: number, clientY: number) => {
    const rect = matrixRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100));
    setNote(R3.conflictPos(id), `${x.toFixed(1)},${y.toFixed(1)}`);
    setSelected(null);
  };

  const unplaced = CONFLICT_STATEMENTS.filter((c) => !r3.conflictPositions[c.id]);

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
                "max-w-xs cursor-grab rounded-xl border bg-paper px-3 py-2 text-caption shadow-sm transition-all duration-150 active:cursor-grabbing",
                dragId === c.id && "is-dragging",
                selected === c.id ? "border-accent ring-2 ring-accent/30" : "border-line hover:border-ash",
              )}
            >
              {c.text}
            </div>
          ))}
        </div>
      )}

      {selected && <p className="reveal-in mt-2 text-caption font-semibold text-accent">Tap anywhere on the matrix to place it.</p>}

      <div
        ref={matrixRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const id = e.dataTransfer.getData("text/plain");
          if (id) placeAt(id, e.clientX, e.clientY);
        }}
        onClick={(e) => {
          if (selected) placeAt(selected, e.clientX, e.clientY);
        }}
        className={clsx(
          "relative mx-auto mt-4 aspect-square w-full max-w-md rounded-xl border bg-canvas",
          selected ? "cursor-crosshair border-dashed border-accent/60" : "border-line",
        )}
      >
        <div className="absolute inset-x-0 top-1/2 border-t border-line" />
        <div className="absolute inset-y-0 left-1/2 border-l border-line" />
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-micro text-ash">Cost discipline →</span>
        <span className="absolute left-1 top-1/2 -translate-y-1/2 text-micro text-ash [writing-mode:vertical-rl]">
          Sustainability ambition →
        </span>

        {CONFLICT_STATEMENTS.map((c) => {
          const pos = r3.conflictPositions[c.id];
          if (!pos) return null;
          return (
            <div
              key={c.id}
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
              className="reveal-in absolute w-28 rounded-lg border border-accent/40 bg-paper p-1.5 text-center text-micro text-ink shadow-sm"
              title={c.text}
            >
              {c.text.length > 40 ? `${c.text.slice(0, 40)}…` : c.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
