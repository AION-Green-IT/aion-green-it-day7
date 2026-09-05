"use client";

import { useState } from "react";
import clsx from "clsx";
import { R_LADDER } from "@/lib/route1";

/** Vertical reference diagram for the R-ladder; stays visible beside Block 3's material. */
export function RLadderSidebar() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <aside className="card p-4 lg:sticky lg:top-24">
      <p className="text-micro font-semibold uppercase tracking-wide text-ash">Reference</p>
      <h3 className="mt-1 text-h3 text-ink">The R-ladder</h3>
      <ol className="mt-3 space-y-1">
        {R_LADDER.map((r) => {
          const open = openId === r.id;
          return (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => setOpenId(open ? null : r.id)}
                aria-expanded={open}
                className={clsx(
                  "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-caption transition-colors duration-150",
                  open ? "bg-accentSoft text-accent" : "text-ink hover:bg-mist",
                )}
              >
                <span className="tabular-nums text-micro text-ash">{r.n}</span>
                <span className="font-semibold">{r.label}</span>
              </button>
              {open && (
                <p className="reveal-in px-2 pb-2 pt-1 text-micro text-ash">{r.blurb}</p>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 border-t border-line pt-3 text-micro text-ash">
        Higher rungs retain more of the original value. Recycling is a last resort, not the goal.
      </p>
    </aside>
  );
}
