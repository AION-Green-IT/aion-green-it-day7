"use client";

import { useState } from "react";
import clsx from "clsx";
import { TAGS, STAGES, type StageId } from "@/lib/route1";
import { DragHandle } from "@/components/icons/LineIcons";

const STAGE_LABEL: Record<string, string> = Object.fromEntries(STAGES.map((s) => [s.id, s.label]));

/** Step 2's draggable (or tap-to-select) tag pool. The drop target is the shared stage explorer above/beside it. */
export function SustainabilityTagPool({
  selectedTagId,
  onSelectTag,
  tagPlacements,
}: {
  selectedTagId: string | null;
  onSelectTag: (id: string | null) => void;
  tagPlacements: Partial<Record<string, StageId>>;
}) {
  const [dragId, setDragId] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-2">
      {TAGS.map((tag) => {
        const placedStage = tagPlacements[tag.id];
        const selected = selectedTagId === tag.id;
        return (
          <div
            key={tag.id}
            draggable
            role="button"
            tabIndex={0}
            aria-pressed={selected}
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", tag.id);
              e.dataTransfer.effectAllowed = "move";
              setDragId(tag.id);
            }}
            onDragEnd={() => setDragId(null)}
            onClick={() => onSelectTag(selected ? null : tag.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectTag(selected ? null : tag.id);
              }
            }}
            className={clsx(
              "flex cursor-grab items-center gap-1.5 rounded-full border bg-paper px-3 py-1.5 text-caption font-semibold shadow-sm transition-all duration-150 active:cursor-grabbing",
              dragId === tag.id && "is-dragging",
              selected ? "border-accent text-accent ring-2 ring-accent/30" : "border-line text-ink hover:border-ash",
              placedStage && !selected && "opacity-70",
            )}
          >
            <DragHandle className="h-3.5 w-3.5 text-ash" />
            {tag.label}
            {placedStage && <span className="text-micro text-ash">→ {STAGE_LABEL[placedStage]}</span>}
          </div>
        );
      })}
    </div>
  );
}
