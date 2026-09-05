"use client";

import { useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R1, STAGES, type StageId } from "@/lib/route1";

const GREEN = "#0A5E45";
const GRAY = "#5E6670";

function lerpColor(t: number) {
  const pa = parseInt(GREEN.slice(1), 16);
  const pb = parseInt(GRAY.slice(1), 16);
  const ar = (pa >> 16) & 255, ag = (pa >> 8) & 255, ab = pa & 255;
  const br = (pb >> 16) & 255, bg = (pb >> 8) & 255, bb = pb & 255;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const b = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${b})`;
}

function StageGlyph({ id }: { id: StageId }) {
  const c = { stroke: "#FFFFFF", strokeWidth: 1.5, fill: "none" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case "procurement":
      return (
        <g {...c}>
          <path d="M5 7h2l1.4 8h8L18 10H8.5" />
          <circle cx="10.5" cy="17.5" r="1" fill="#FFFFFF" stroke="none" />
          <circle cx="15" cy="17.5" r="1" fill="#FFFFFF" stroke="none" />
        </g>
      );
    case "use":
      return (
        <g {...c}>
          <path d="M12 6v6" />
          <path d="M8 8.5a5.2 5.2 0 1 0 8 0" />
        </g>
      );
    case "maintenance":
      return (
        <g {...c}>
          <path d="M14.5 5.3a3.4 3.4 0 0 0-4.5 4l-5 5V18h3.7l5-5a3.4 3.4 0 0 0 4-4.5l-2.6 2.6-1.7-1.7Z" />
        </g>
      );
    case "upgrade":
      return (
        <g {...c}>
          <path d="M12 17V7" />
          <path d="M8 11l4-4 4 4" />
        </g>
      );
    case "reuse":
      return (
        <g {...c}>
          <path d="M12 5.5a6.5 6.5 0 1 0 6.5 6.5" />
          <path d="M18.7 5.5v4h-4" />
        </g>
      );
    case "refurbishment":
      return (
        <g {...c}>
          <path d="M12 4v5M12 15v5M4 12h5M15 12h5" />
        </g>
      );
    case "return":
      return (
        <g {...c}>
          <path d="M6 9.5v2.5a5 5 0 0 0 5 5h6" />
          <path d="M13.5 13l3.5 4-3.5 4" />
        </g>
      );
    case "recycling":
      return (
        <g {...c}>
          <path d="M12 5 19 17H5Z" />
          <path d="M9.8 13.8h4.6l-1.2 2.1" />
        </g>
      );
    case "disposal":
      return (
        <g {...c}>
          <path d="M6.5 8.5h11l-1 10h-9Z" />
          <path d="M9.5 8.5V6.5h5v2" />
          <path d="M4.5 8.5h15" />
        </g>
      );
    default:
      return null;
  }
}

type PlacedTag = { label: string; valid: boolean };

type Props = {
  compact?: boolean;
  taggingEnabled?: boolean;
  selectedTagId?: string | null;
  onDropTag?: (tagId: string, stageId: StageId) => void;
  onTapStage?: (stageId: StageId) => void;
  placedByStage?: Partial<Record<StageId, PlacedTag[]>>;
};

/** The 9-node lifecycle timeline. Doubles as Step 1's fact explorer and Step 2's drop target. */
export function LifecycleStageExplorer({
  compact = false,
  taggingEnabled = false,
  selectedTagId = null,
  onDropTag,
  onTapStage,
  placedByStage,
}: Props) {
  const markSeen = useProgress((s) => s.markSeen);
  const seenIds = useProgress((s) => s.seen[R1.stages] ?? []);
  const [openStage, setOpenStage] = useState<StageId | null>(null);
  const [overStage, setOverStage] = useState<StageId | null>(null);

  const handleActivate = (id: StageId) => {
    if (taggingEnabled && selectedTagId) {
      onTapStage?.(id);
      return;
    }
    markSeen(R1.stages, id);
    setOpenStage((cur) => (cur === id ? null : id));
  };

  const dragOver = (id: StageId) => (e: React.DragEvent) => {
    if (!taggingEnabled) return;
    e.preventDefault();
    if (overStage !== id) setOverStage(id);
  };
  const dragLeave = (id: StageId) => () => setOverStage((cur) => (cur === id ? null : cur));
  const drop = (id: StageId) => (e: React.DragEvent) => {
    if (!taggingEnabled) return;
    e.preventDefault();
    const tagId = e.dataTransfer.getData("text/plain");
    setOverStage(null);
    if (tagId) onDropTag?.(tagId, id);
  };

  const stageDetail = STAGES.find((s) => s.id === openStage);

  if (compact) {
    return (
      <aside className="card p-3 lg:sticky lg:top-24">
        <p className="text-micro font-semibold uppercase tracking-wide text-ash">Lifecycle stages</p>
        <ol className="mt-2 space-y-1">
          {STAGES.map((s, i) => {
            const placed = placedByStage?.[s.id] ?? [];
            const isOver = overStage === s.id;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => handleActivate(s.id)}
                  onDragOver={dragOver(s.id)}
                  onDragLeave={dragLeave(s.id)}
                  onDrop={drop(s.id)}
                  className={clsx(
                    "flex w-full items-center gap-2 rounded-lg border px-2 py-1.5 text-left text-caption transition-colors duration-150",
                    isOver ? "border-accent bg-accentSoft" : "border-transparent hover:bg-mist",
                  )}
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-paper"
                    style={{ background: lerpColor(i / (STAGES.length - 1)) }}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4">
                      <StageGlyph id={s.id} />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1 truncate font-semibold text-ink">{s.label}</span>
                  {placed.length > 0 && (
                    <span
                      className={clsx("h-2 w-2 shrink-0 rounded-full", placed.some((p) => p.valid) ? "bg-accent" : "bg-warn")}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </aside>
    );
  }

  return (
    <div>
      <svg viewBox="0 0 900 130" className="w-full" role="img" aria-label="Device lifecycle, 9 stages from procurement to disposal">
        <line x1="50" y1="55" x2="850" y2="55" stroke="#E2E5E9" strokeWidth="3" />
        {STAGES.map((s, i) => {
          const cx = 50 + (i * 800) / (STAGES.length - 1);
          const color = lerpColor(i / (STAGES.length - 1));
          const isOver = overStage === s.id;
          const isSeen = seenIds.includes(s.id);
          const placed = placedByStage?.[s.id] ?? [];
          return (
            <g
              key={s.id}
              className="group cursor-pointer outline-none"
              role="button"
              tabIndex={0}
              aria-label={`${s.label} stage`}
              onClick={() => handleActivate(s.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleActivate(s.id);
                }
              }}
              onDragOver={dragOver(s.id)}
              onDragLeave={dragLeave(s.id)}
              onDrop={drop(s.id)}
            >
              <rect
                x={cx - 24}
                y={31}
                width={48}
                height={48}
                rx={12}
                fill={color}
                stroke={isOver ? "#0E7A5A" : "transparent"}
                strokeWidth={3}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                className={clsx(
                  "transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110",
                  isOver && "scale-110",
                  !isSeen && !isOver && "motif-pulse",
                )}
              />
              <g transform={`translate(${cx - 12}, 43)`}>
                <StageGlyph id={s.id} />
              </g>
              <text x={cx} y={98} textAnchor="middle" fontSize="11" fontWeight={600} fill="#16191D">
                {s.n}
              </text>
              <text x={cx} y={112} textAnchor="middle" fontSize="10" fill="#5E6670">
                {s.label}
              </text>
              {placed.length > 0 && (
                <circle cx={cx + 17} cy={22} r={5} fill={placed.some((p) => p.valid) ? "#0E7A5A" : "#B87514"} />
              )}
            </g>
          );
        })}
      </svg>

      {stageDetail && (
        <div className="reveal-in mt-3 rounded-xl border border-line bg-canvas p-4">
          <p className="text-micro font-semibold uppercase tracking-wide text-ash">{stageDetail.label}</p>
          <p className="mt-1 text-caption text-ink">{stageDetail.fact}</p>
        </div>
      )}
    </div>
  );
}
