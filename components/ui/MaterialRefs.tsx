"use client";

import { scrollToAndFlash } from "@/lib/scrollToAndFlash";
import { BookMark } from "@/components/icons/LineIcons";
import type { MaterialRef } from "@/lib/materialAnchor";
import { useT } from "@/lib/i18n";

/**
 * "Based on" chips under a task step: each jumps to the material section that
 * step draws on and flashes it in the accent colour. A learner should never
 * meet a question whose reasoning wasn't taught above it — this is the path
 * back to where it was.
 */
export function MaterialRefs({ refs, lead = "Based on:" }: { refs: MaterialRef[]; lead?: string }) {
  const t = useT();
  if (refs.length === 0) return null;
  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      <span className="inline-flex items-center gap-1 text-micro text-ash">
        <BookMark className="h-3.5 w-3.5" />
        {t(lead)}
      </span>
      {refs.map((r) => (
        <button
          key={r.id}
          type="button"
          onClick={() => scrollToAndFlash(r.id, "ref")}
          className="rounded-full border border-accent/30 bg-accentSoft px-2 py-0.5 text-micro font-semibold text-accent transition-colors duration-150 hover:border-accent hover:text-accentHi"
        >
          {t(r.label)}
        </button>
      ))}
    </div>
  );
}
