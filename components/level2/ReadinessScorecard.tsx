"use client";

import { useState } from "react";
import clsx from "clsx";
import { SCORE_AREAS, SCORECARD, scoreKey, L2 } from "@/lib/level2";
import { useProgress } from "@/lib/store";
import { useLevel2 } from "./useLevel2";
import { RadarChart } from "@/components/visuals/RadarChart";
import { Help, Lock } from "@/components/icons/LineIcons";

export function ReadinessScorecard() {
  const { scores, refOpened, scoresTouched, hydrated } = useLevel2();
  const choose = useProgress((s) => s.choose);
  const markSeen = useProgress((s) => s.markSeen);
  const [tip, setTip] = useState<string | null>(null);

  const setScore = (areaId: string, v: number) => {
    choose(scoreKey(areaId), String(v));
    if (!scoresTouched.includes(areaId)) markSeen(L2.scoresTouchedKey, areaId);
  };

  const axes = SCORE_AREAS.map((a) => ({ label: a.label, value: scores[a.id] }));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {SCORE_AREAS.map((area) => {
          const locked = hydrated && area.locked && !refOpened;
          const value = scores[area.id];
          const touched = scoresTouched.includes(area.id);
          return (
            <div key={area.id} className={clsx("rounded-xl border p-4", locked ? "border-line bg-mist/40" : "border-line bg-paper")}>
              <div className="mb-2 flex items-center gap-2">
                <span className={clsx("flex-1 text-body font-semibold", locked ? "text-ash" : "text-ink")}>
                  {area.label}
                </span>

                {locked ? (
                  <span className="inline-flex items-center gap-1 text-caption text-ash" title={SCORECARD.lockedTooltip}>
                    <Lock className="h-4 w-4" /> Locked
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="tabular-nums text-readout text-accent" style={{ transition: "color 150ms ease" }}>
                      {touched ? value : value}
                    </span>
                    <span className="text-caption text-ash">/ 5</span>
                    <button
                      type="button"
                      aria-label={`What ${area.label} scores mean`}
                      onClick={() => setTip(tip === area.id ? null : area.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-line text-ash hover:border-ash"
                    >
                      <Help className="h-4 w-4" />
                    </button>
                  </span>
                )}
              </div>

              <input
                type="range"
                min={SCORECARD.scale.min}
                max={SCORECARD.scale.max}
                step={1}
                value={value}
                disabled={locked}
                onChange={(e) => setScore(area.id, Number(e.target.value))}
                aria-label={`${area.label} readiness, 1 to 5`}
                className={clsx("h-2 w-full cursor-pointer accent-accent disabled:cursor-not-allowed disabled:opacity-50")}
              />
              <div className="mt-1 flex justify-between text-micro text-ash">
                <span>1 · not ready</span>
                <span>5 · ready</span>
              </div>

              {locked ? (
                <p className="mt-2 flex items-center gap-1.5 text-caption text-ash">
                  <Lock className="h-3.5 w-3.5" /> {SCORECARD.lockedTooltip}
                </p>
              ) : null}

              {tip === area.id && !locked ? (
                <dl className="reveal-in mt-3 space-y-1 rounded-lg border border-line bg-mist/50 p-3 text-caption">
                  {([1, 3, 5] as const).map((n) => (
                    <div key={n} className="flex gap-2">
                      <dt className="font-semibold text-ink">{n}</dt>
                      <dd className="text-ash">{area.anchors[n]}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="card p-4 lg:sticky lg:top-24 lg:self-start">
        <p className="mb-1 text-h3 text-ink">Readiness profile</p>
        <p className="mb-2 text-caption text-ash">The shape redraws as you score. No profile is correct.</p>
        <RadarChart axes={axes} max={5} />
      </div>
    </div>
  );
}
