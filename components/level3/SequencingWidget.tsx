"use client";

import { useState } from "react";
import clsx from "clsx";
import { SEQUENCE_CHIPS, SEQUENCE_COLUMNS, TASK3, seqKey, type SeqChip } from "@/lib/level3";
import { useProgress } from "@/lib/store";
import { useLevel3 } from "./useLevel3";
import { DragHandle } from "@/components/icons/LineIcons";

const TRAY = "tray";
const CHIP_BY_ID = Object.fromEntries(SEQUENCE_CHIPS.map((c) => [c.id, c])) as Record<string, SeqChip>;

export function SequencingWidget() {
  const choose = useProgress((s) => s.choose);
  const { placements } = useLevel3();
  const [dragId, setDragId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);

  const place = (chipId: string, col: string) => {
    choose(seqKey(chipId), col === TRAY ? "" : col);
    setSelectedId(null);
  };
  const tapChip = (id: string) => setSelectedId((c) => (c === id ? null : id));
  const tapZone = (col: string) => selectedId && place(selectedId, col);

  const trayChips = SEQUENCE_CHIPS.filter((c) => !placements[c.id]);

  return (
    <div className="space-y-4">
      {/* tray */}
      <Zone id={TRAY} over={over} selected={!!selectedId} onOver={setOver} onDrop={place} onTap={tapZone} className="bg-mist/50">
        <p className="mb-2 text-caption font-semibold text-ink">{TASK3.seqTrayLabel}</p>
        <div className="flex flex-wrap gap-2">
          {trayChips.map((c) => (
            <Chip key={c.id} chip={c} dragId={dragId} selectedId={selectedId} onDragId={setDragId} onTap={tapChip} />
          ))}
          {trayChips.length === 0 ? <p className="text-caption text-ash">All actions sorted.</p> : null}
        </div>
      </Zone>

      {/* columns */}
      <div className="grid gap-3 sm:grid-cols-3">
        {SEQUENCE_COLUMNS.map((col) => {
          const chips = SEQUENCE_CHIPS.filter((c) => placements[c.id] === col.id);
          return (
            <Zone key={col.id} id={col.id} over={over} selected={!!selectedId} onOver={setOver} onDrop={place} onTap={tapZone}>
              <p className="mb-2 flex items-center justify-between text-caption font-semibold text-ink">
                {col.label}
                <span className="rounded-full bg-ink px-1.5 text-micro tabular-nums text-paper">{chips.length}</span>
              </p>
              <div className="space-y-2">
                {chips.map((c) => (
                  <Chip key={c.id} chip={c} block dragId={dragId} selectedId={selectedId} onDragId={setDragId} onTap={tapChip} />
                ))}
                {chips.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-line px-2 py-4 text-center text-caption text-ash/80">Drop here</p>
                ) : null}
              </div>
            </Zone>
          );
        })}
      </div>
    </div>
  );
}

function Zone({ id, children, className, over, selected, onOver, onDrop, onTap }: {
  id: string; children: React.ReactNode; className?: string; over: string | null; selected: boolean;
  onOver: (z: string | null) => void; onDrop: (chipId: string, col: string) => void; onTap: (col: string) => void;
}) {
  const isOver = over === id;
  return (
    <section
      onDragOver={(e) => { e.preventDefault(); if (over !== id) onOver(id); }}
      onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) onOver(null); }}
      onDrop={(e) => { e.preventDefault(); const cid = e.dataTransfer.getData("text/plain"); onOver(null); if (cid) onDrop(cid, id); }}
      onClick={() => onTap(id)}
      className={clsx("rounded-2xl border p-3 transition-colors duration-150 min-h-[80px]", isOver ? "border-accent bg-accentSoft" : selected ? "border-dashed border-accent/60" : "border-line", className)}
    >
      {children}
    </section>
  );
}

function Chip({ chip, block = false, dragId, selectedId, onDragId, onTap }: {
  chip: SeqChip; block?: boolean; dragId: string | null; selectedId: string | null; onDragId: (id: string | null) => void; onTap: (id: string) => void;
}) {
  const dragging = dragId === chip.id;
  const selected = selectedId === chip.id;
  return (
    <div
      draggable
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onDragStart={(e) => { e.dataTransfer.setData("text/plain", chip.id); e.dataTransfer.effectAllowed = "move"; onDragId(chip.id); }}
      onDragEnd={() => onDragId(null)}
      onClick={(e) => { e.stopPropagation(); onTap(chip.id); }}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onTap(chip.id); } }}
      className={clsx(
        "flex cursor-grab items-start gap-1.5 rounded-lg border bg-paper p-2 text-caption text-ink shadow-sm transition-all duration-150 active:cursor-grabbing",
        block ? "w-full" : "max-w-[220px]",
        dragging && "is-dragging shadow-lift",
        selected ? "border-accent ring-2 ring-accent/30" : "border-line hover:border-ash",
      )}
    >
      <span className="mt-0.5 text-ash/60"><DragHandle className="h-3.5 w-3.5" /></span>
      <span className="flex-1">{chip.text}</span>
    </div>
  );
}
