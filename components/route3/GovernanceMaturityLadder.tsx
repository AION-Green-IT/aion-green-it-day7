"use client";

import { useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R3, GOVERNANCE_LADDER } from "@/lib/route3";

/**
 * Impact Delta Visualizer — Block 1, and reused compact in Step 3.1 to mark
 * Helion's current position. `onPositionChange` wires the compact mode into
 * the store; the full demo mode is just exploratory (no persisted answer).
 */
export function GovernanceMaturityLadder({
  compact = false,
  selectable = false,
  selectedId,
  onSelect,
}: {
  compact?: boolean;
  selectable?: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  const markSeen = useProgress((s) => s.markSeen);
  const [openId, setOpenId] = useState<string | null>(null);
  const [markerId, setMarkerId] = useState<string>(GOVERNANCE_LADDER[0].id);

  const activate = (id: string) => {
    markSeen(R3.material, "iso20400");
    if (selectable) {
      onSelect?.(id);
    } else {
      setOpenId((cur) => (cur === id ? null : id));
    }
  };

  return (
    <div className={clsx(!compact && "mx-auto max-w-md")}>
      <ol className="space-y-2">
        {[...GOVERNANCE_LADDER].reverse().map((rung) => {
          const isOpen = openId === rung.id;
          const isSelected = selectable && selectedId === rung.id;
          const isMarker = !selectable && markerId === rung.id;
          return (
            <li key={rung.id}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => activate(rung.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    activate(rung.id);
                  }
                }}
                className={clsx(
                  "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors duration-150",
                  isOpen || isSelected ? "border-accent bg-accentSoft" : "border-line hover:border-ash",
                )}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-caption font-semibold text-paper">
                  {rung.n}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-caption font-semibold text-ink">{rung.label}</p>
                  {!compact && <p className="text-micro text-ash">{rung.blurb}</p>}
                </div>
                {isMarker && !selectable && (
                  <span className="rounded-full bg-ink px-2 py-0.5 text-micro font-semibold text-paper">Your org?</span>
                )}
              </div>
              {isOpen && (
                <p className="reveal-in mt-1 rounded-lg bg-canvas p-2 text-micro text-ash">{rung.example}</p>
              )}
            </li>
          );
        })}
      </ol>

      {!selectable && (
        <div className="mt-3">
          <label className="text-micro font-semibold text-ash">
            Drag the marker (or pick below) to where your own organization sits today — not scored, just a prompt.
          </label>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {GOVERNANCE_LADDER.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setMarkerId(r.id)}
                aria-pressed={markerId === r.id}
                className={clsx(
                  "rounded-full border px-2.5 py-1 text-micro font-semibold transition-colors duration-150",
                  markerId === r.id ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ash",
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
