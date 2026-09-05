"use client";

import { useState } from "react";
import clsx from "clsx";
import { MATERIAL, type MaterialCard as MaterialCardT } from "@/lib/module3";
import { useProgress } from "@/lib/store";
import { L1, useLevel1 } from "@/lib/level1";
import { Icon, Check, Lock, ChevronDown, ArrowRight } from "@/components/icons/LineIcons";
import { StudyDiagram } from "./StudyDiagrams";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 2 — eleven self-study cards, grouped into the module's two stated
 * halves (Part A — strategy, Part B — procurement). Each expands to a full
 * knowledge unit: a framework, a concrete example, a career-readiness note,
 * a diagram, and external references. The header toggles the card; the body
 * is a sibling (not nested inside the button) so its reference links are
 * real, independently clickable anchors.
 */
export function MaterialCards() {
  const round = useProgress((s) => s.sectionResets[L1.materialKey] ?? 0);
  const partA = MATERIAL.cards.filter((c) => c.part === "A");
  const partB = MATERIAL.cards.filter((c) => c.part === "B");

  return (
    <div key={`cards-${round}`} className="space-y-8">
      <CardGroup kicker={MATERIAL.partA.kicker} title={MATERIAL.partA.title} cards={partA} indexOffset={0} />
      <CardGroup kicker={MATERIAL.partB.kicker} title={MATERIAL.partB.title} cards={partB} indexOffset={partA.length} />
    </div>
  );
}

function CardGroup({
  kicker,
  title,
  cards,
  indexOffset,
}: {
  kicker: string;
  title: string;
  cards: MaterialCardT[];
  indexOffset: number;
}) {
  return (
    <div>
      <p className="mb-3 flex items-baseline gap-2">
        <span className="text-micro font-semibold uppercase tracking-wide text-accent">{kicker}</span>
        <span className="text-caption font-semibold text-ink">{title}</span>
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        {cards.map((card, i) => (
          <Reveal key={card.id} delay={Math.min(i, 5) * 60}>
            <StudyCard card={card} index={indexOffset + i + 1} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function StudyCard({ card, index }: { card: MaterialCardT; index: number }) {
  const markSeen = useProgress((s) => s.markSeen);
  const { openedCards } = useLevel1();
  const [open, setOpen] = useState(false);
  const wasRead = openedCards.includes(card.id);

  const toggle = () => {
    setOpen((v) => !v);
    if (!wasRead) markSeen(L1.materialKey, card.id);
  };

  return (
    <div
      className={clsx(
        "flex flex-col rounded-2xl border bg-paper shadow-sm transition-transform duration-150 hover:scale-[1.015]",
        open ? "border-accent" : "border-line",
      )}
    >
      <button type="button" onClick={toggle} aria-expanded={open} className="flex w-full items-start gap-3 p-5 text-left">
        <span
          className={clsx(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            open ? "bg-accent text-paper" : "bg-accentSoft text-accent",
          )}
        >
          <Icon name={card.icon} className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-micro font-semibold uppercase tracking-wide text-ash">Card {index}</p>
          <h3 className="mt-0.5 text-h3 leading-snug text-ink">{card.title}</h3>
          {!open ? <p className="mt-2 text-caption font-semibold text-accent">Tap to open →</p> : null}
        </div>
        {wasRead ? (
          <span aria-label="Read" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-paper">
            <Check className="h-3.5 w-3.5" />
          </span>
        ) : (
          <ChevronDown className={clsx("mt-0.5 h-5 w-5 shrink-0 text-ash transition-transform duration-200", open && "rotate-180")} />
        )}
      </button>

      {open ? (
        <div className="reveal-in space-y-4 border-t border-line p-5 pt-4">
          <p className="text-body text-ash">{card.concept}</p>

          <div className="rounded-xl border-l-4 border-accent bg-accentSoft/40 p-3">
            <p className="mb-1 text-micro font-semibold uppercase tracking-wide text-accent">In practice</p>
            <p className="text-caption text-ink">{card.example}</p>
          </div>

          <div className="rounded-xl border border-line bg-mist/40 p-3">
            <StudyDiagram name={card.diagram} className="w-full" />
          </div>

          <p className="border-l-2 border-line pl-3 text-caption italic text-ash">{card.whyItMatters}</p>

          <div>
            <p className="mb-1.5 text-micro font-semibold uppercase tracking-wide text-ash">Further reading</p>
            <ul className="space-y-1">
              {card.references.map((ref) => (
                <li key={ref.url}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-caption font-semibold text-accent underline-offset-2 hover:underline"
                  >
                    {ref.label} <ArrowRight className="h-3 w-3 -rotate-45" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Dots that fill as cards are opened, shown above the task. While any card is
 * unread the label reads "Read all material to unlock".
 */
export function MaterialProgress() {
  const { openedCount, allRead } = useLevel1();
  const total = MATERIAL.cards.length;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap items-center gap-1.5" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={clsx(
              "h-2.5 w-2.5 rounded-full transition-colors duration-300",
              i < openedCount ? "bg-accent" : "bg-line",
            )}
          />
        ))}
      </div>
      <span
        className={clsx(
          "inline-flex items-center gap-1.5 text-caption font-semibold",
          allRead ? "text-accent" : "text-ash",
        )}
      >
        {allRead ? (
          <>
            <Check className="h-4 w-4" /> All material read
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" /> {MATERIAL.lockedLabel} ({openedCount}/{total})
          </>
        )}
      </span>
    </div>
  );
}
