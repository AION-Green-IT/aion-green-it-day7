"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R2, LEVERS, TASK2 } from "@/lib/route2";
import { useRoute2 } from "./useRoute2";
import { DragHandle } from "@/components/icons/LineIcons";

const labelFor = (id: string) => LEVERS.find((l) => l.id === id)?.label ?? id;

/** Task 2, Step 2 — drag-to-reorder the 4 selected levers, with a full undo/redo history stack. */
export function LeverRanking() {
  const r2 = useRoute2();
  const setNote = useProgress((s) => s.setNote);

  const idsKey = [...r2.rankOrder].sort().join(",");
  const [baseIdsKey, setBaseIdsKey] = useState(idsKey);
  const [history, setHistory] = useState<string[][]>([r2.rankOrder]);
  const [index, setIndex] = useState(0);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  useEffect(() => {
    if (idsKey !== baseIdsKey) {
      setBaseIdsKey(idsKey);
      setHistory([r2.rankOrder]);
      setIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  const commitOrder = (newOrder: string[]) => {
    const truncated = history.slice(0, index + 1);
    const nextHistory = [...truncated, newOrder];
    setHistory(nextHistory);
    setIndex(nextHistory.length - 1);
    setNote(R2.rankOrder, JSON.stringify(newOrder));
  };

  const drop = (targetId: string) => {
    setOverId(null);
    if (!dragId || dragId === targetId) return;
    const cur = [...r2.rankOrder];
    const from = cur.indexOf(dragId);
    const to = cur.indexOf(targetId);
    if (from === -1 || to === -1) return;
    cur.splice(from, 1);
    cur.splice(to, 0, dragId);
    commitOrder(cur);
    setDragId(null);
  };

  const undo = () => {
    if (index === 0) return;
    const next = index - 1;
    setIndex(next);
    setNote(R2.rankOrder, JSON.stringify(history[next]));
  };
  const redo = () => {
    if (index >= history.length - 1) return;
    const next = index + 1;
    setIndex(next);
    setNote(R2.rankOrder, JSON.stringify(history[next]));
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-caption text-ash">{TASK2.step2.rankInstructions}</p>
        <div className="flex shrink-0 gap-1.5">
          <button type="button" onClick={undo} disabled={index === 0} className="btn-ghost px-2.5 py-1 text-micro disabled:cursor-not-allowed disabled:opacity-40">
            Undo
          </button>
          <button type="button" onClick={redo} disabled={index >= history.length - 1} className="btn-ghost px-2.5 py-1 text-micro disabled:cursor-not-allowed disabled:opacity-40">
            Redo
          </button>
        </div>
      </div>

      <ol className="mt-3 space-y-2">
        {r2.rankOrder.map((id, i) => (
          <li
            key={id}
            draggable
            onDragStart={() => setDragId(id)}
            onDragEnd={() => {
              setDragId(null);
              setOverId(null);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              if (overId !== id) setOverId(id);
            }}
            onDragLeave={() => setOverId((cur) => (cur === id ? null : cur))}
            onDrop={(e) => {
              e.preventDefault();
              drop(id);
            }}
            className={clsx(
              "flex cursor-grab items-center gap-3 rounded-xl border bg-paper p-3 text-caption transition-colors duration-150 active:cursor-grabbing",
              dragId === id && "is-dragging",
              overId === id && dragId !== id ? "border-accent bg-accentSoft" : "border-line",
            )}
          >
            <DragHandle className="h-4 w-4 shrink-0 text-ash" />
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mist text-micro font-semibold text-ink">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1 text-ink">{labelFor(id)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
