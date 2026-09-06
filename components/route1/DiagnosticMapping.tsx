"use client";

import { useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R1, ZONES, type ZoneId } from "@/lib/route1";
import { useRoute1 } from "./useRoute1";
import { FacilitySvg } from "@/components/ui/FacilitySvg";
import { Check } from "@/components/icons/LineIcons";

/** Task 1a, Step 1 — click a zone, answer its forced-choice question. Any answer just flags the zone; nothing is graded here. */
export function DiagnosticMapping() {
  const r1 = useRoute1();
  const choose = useProgress((s) => s.choose);
  const [openZoneId, setOpenZoneId] = useState<ZoneId | null>(null);
  const openZone = ZONES.find((z) => z.id === openZoneId) ?? null;

  const answer = (zoneId: ZoneId, choiceId: string) => {
    choose(R1.zoneAnswer(zoneId), choiceId);
  };

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-caption text-ash">Click every zone on the map.</p>
        <p className="text-caption tabular-nums text-ash">
          Zones diagnosed: <span className="font-semibold text-ink">{r1.zonesAnsweredCount}</span> / {ZONES.length}
        </p>
      </div>

      <div className="mt-3">
        <FacilitySvg
          utilizationPct={18}
          flaggedZones={Object.keys(r1.zoneAnswers) as ZoneId[]}
          activeZoneId={openZoneId}
          onZoneClick={(id) => setOpenZoneId((cur) => (cur === id ? null : id))}
        />
      </div>

      {openZone && (
        <div id={`r1-zone-${openZone.id}`} className="reveal-in mt-4 rounded-xl border border-accent/30 bg-accentSoft p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-caption font-semibold uppercase tracking-wide text-accent">{openZone.label}</p>
            {r1.zoneAnswers[openZone.id] && <Check className="h-4 w-4 text-accent" />}
          </div>
          <p className="mt-1 text-caption text-ink">{openZone.fact}</p>
          <p className="mt-3 text-body font-semibold text-ink">{openZone.question}</p>
          <div className="mt-2 space-y-2">
            {openZone.choices.map((c) => {
              const picked = r1.zoneAnswers[openZone.id] === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => answer(openZone.id, c.id)}
                  aria-pressed={picked}
                  className={clsx(
                    "w-full rounded-xl border p-3 text-left text-caption transition-colors duration-150",
                    picked ? "border-accent bg-paper font-semibold text-ink" : "border-line bg-paper text-ink hover:border-ash",
                  )}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!openZone && (
        <p className="mt-3 text-caption text-ash">
          {r1.zonesAnsweredCount === 0
            ? "Nothing selected yet — click any zone above to start."
            : "Click another zone, or a zone you've already diagnosed to review your answer."}
        </p>
      )}
    </div>
  );
}
