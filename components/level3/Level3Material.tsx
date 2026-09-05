"use client";

import { useState } from "react";
import clsx from "clsx";
import { MATERIAL3, COMPONENT_COLORS, L3 } from "@/lib/level3";
import { useProgress } from "@/lib/store";
import { useLevel3 } from "./useLevel3";
import { MaterialDiagram } from "./MaterialDiagrams";
import { Check, ChevronDown, ArrowRight } from "@/components/icons/LineIcons";
import { Reveal } from "@/components/ui/Reveal";

/** Cards not tied to one of the five colour-coded memo fields (budget, sequencing) use the module's own accent. */
const GENERAL_COLOR = "#0E7A5A";

/**
 * Section 2 — seven deep study cards: five colour-tagged to a memo field, two
 * to the budget allocator and the sequencing widget. Each is a full knowledge
 * unit (framework, real example, diagram, career-readiness note, references).
 * The header toggles the card; the body is a sibling (not nested inside the
 * button) so its reference links are real, independently clickable anchors.
 */
export function Level3Material() {
  const markSeen = useProgress((s) => s.markSeen);
  const { materialOpened } = useLevel3();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpen((o) => ({ ...o, [id]: !o[id] }));
    if (!materialOpened.includes(id)) markSeen(L3.materialKey, id);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {MATERIAL3.cards.map((card, i) => {
        const isOpen = !!open[card.id];
        const color = card.component ? COMPONENT_COLORS[card.component] : GENERAL_COLOR;
        const wasRead = materialOpened.includes(card.id);
        return (
          <Reveal key={card.id} delay={Math.min(i, 5) * 60}>
            <div className={clsx("card overflow-hidden", isOpen && "shadow-md")} style={{ borderLeftWidth: 3, borderLeftColor: color }}>
              <button type="button" onClick={() => toggle(card.id)} aria-expanded={isOpen} className="flex w-full items-start gap-3 p-4 text-left">
                <div className="min-w-0 flex-1">
                  <span className="inline-block rounded-full px-2 py-0.5 text-micro font-semibold uppercase tracking-wide" style={{ backgroundColor: color + "1A", color }}>
                    Used in: {card.usedIn}
                  </span>
                  <h3 className="mt-1.5 text-h3 leading-snug text-ink">{card.title}</h3>
                  {!isOpen ? <p className="mt-2 text-caption font-semibold" style={{ color }}>Tap to open →</p> : null}
                </div>
                {wasRead ? (
                  <span aria-label="Read" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-paper" style={{ backgroundColor: color }}>
                    <Check className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <ChevronDown className={clsx("mt-0.5 h-5 w-5 shrink-0 text-ash transition-transform duration-200", isOpen && "rotate-180")} />
                )}
              </button>

              {isOpen ? (
                <div className="reveal-in space-y-4 border-t border-line p-4">
                  <p className="text-body text-ash">{card.concept}</p>

                  <div className="rounded-xl border-l-4 p-3" style={{ borderColor: color, backgroundColor: color + "14" }}>
                    <p className="mb-1 text-micro font-semibold uppercase tracking-wide" style={{ color }}>In practice</p>
                    <p className="text-caption text-ink">{card.example}</p>
                  </div>

                  <div className="rounded-xl border border-line bg-mist/40 p-3">
                    <MaterialDiagram name={card.diagram} color={color} />
                  </div>

                  <p className="border-l-2 border-line pl-3 text-caption italic text-ash">{card.whyItMatters}</p>

                  <div>
                    <p className="mb-1.5 text-micro font-semibold uppercase tracking-wide text-ash">Further reading</p>
                    <ul className="space-y-1">
                      {card.references.map((ref) => (
                        <li key={ref.url}>
                          <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-caption font-semibold underline-offset-2 hover:underline" style={{ color }}>
                            {ref.label} <ArrowRight className="h-3 w-3 -rotate-45" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
