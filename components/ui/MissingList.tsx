"use client";

import { scrollToAndFlash } from "@/lib/scrollToAndFlash";

export type MissingItem = { id: string; label: string };

/** A "still needed" list whose items jump to (and briefly flash) the section that needs attention. */
export function MissingList({ items, lead = "Still needed:" }: { items: MissingItem[]; lead?: string }) {
  if (items.length === 0) return null;
  return (
    <div className="text-caption text-ash">
      <p>{lead}</p>
      <ul className="mt-1 list-disc space-y-0.5 pl-5">
        {items.map((m, i) => (
          <li key={`${m.id}-${i}`}>
            <button
              type="button"
              onClick={() => scrollToAndFlash(m.id)}
              className="text-left underline decoration-dotted underline-offset-2 hover:text-ink"
            >
              {m.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
