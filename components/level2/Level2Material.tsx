"use client";

import { useState } from "react";
import clsx from "clsx";
import { MATERIAL2, L2 } from "@/lib/level2";
import { useProgress } from "@/lib/store";
import { useLevel2 } from "./useLevel2";
import { StudyDiagram2 } from "./StudyDiagrams2";
import { Icon, Check, ChevronDown, ArrowRight } from "@/components/icons/LineIcons";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 2 — six deep study cards, each a full knowledge unit (framework,
 * real example, diagram, career-readiness note, references) and tagged with
 * the task part it feeds. Header toggles the card; the body is a sibling
 * (not nested inside the button) so its reference links are real, clickable
 * anchors — same pattern as Level 1's MaterialCards.
 */
export function Level2Material() {
  const markSeen = useProgress((s) => s.markSeen);
  const { materialOpened } = useLevel2();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpen((o) => ({ ...o, [id]: !o[id] }));
    if (!materialOpened.includes(id)) markSeen(L2.materialKey, id);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {MATERIAL2.cards.map((card, i) => {
        const isOpen = !!open[card.id];
        const wasRead = materialOpened.includes(card.id);
        return (
          <Reveal key={card.id} delay={Math.min(i, 5) * 60}>
            <div className={clsx("flex flex-col rounded-2xl border bg-paper shadow-sm transition-transform duration-150 hover:scale-[1.015]", isOpen ? "border-accent" : "border-line")}>
              <button type="button" onClick={() => toggle(card.id)} aria-expanded={isOpen} className="flex w-full items-start gap-3 p-5 text-left">
                <span className={clsx("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", isOpen ? "bg-accent text-paper" : "bg-accentSoft text-accent")}>
                  <Icon name={card.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-h3 leading-snug text-ink">{card.title}</h3>
                  {!isOpen ? <p className="mt-2 text-caption font-semibold text-accent">Tap to open →</p> : null}
                  <p className="mt-2 border-t border-line pt-2 text-micro font-semibold uppercase tracking-wide text-ash">
                    Used in: <span className="text-accent">{card.usedIn}</span>
                  </p>
                </div>
                {wasRead ? (
                  <span aria-label="Read" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-paper">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <ChevronDown className={clsx("mt-0.5 h-5 w-5 shrink-0 text-ash transition-transform duration-200", isOpen && "rotate-180")} />
                )}
              </button>

              {isOpen ? (
                <div className="reveal-in space-y-4 border-t border-line p-5 pt-4">
                  <p className="text-body text-ash">{card.concept}</p>

                  <div className="rounded-xl border-l-4 border-accent bg-accentSoft/40 p-3">
                    <p className="mb-1 text-micro font-semibold uppercase tracking-wide text-accent">In practice</p>
                    <p className="text-caption text-ink">{card.example}</p>
                  </div>

                  <div className="rounded-xl border border-line bg-mist/40 p-3">
                    <StudyDiagram2 name={card.diagram} className="w-full" />
                  </div>

                  <p className="border-l-2 border-line pl-3 text-caption italic text-ash">{card.whyItMatters}</p>

                  <div>
                    <p className="mb-1.5 text-micro font-semibold uppercase tracking-wide text-ash">Further reading</p>
                    <ul className="space-y-1">
                      {card.references.map((ref) => (
                        <li key={ref.url}>
                          <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-caption font-semibold text-accent underline-offset-2 hover:underline">
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
