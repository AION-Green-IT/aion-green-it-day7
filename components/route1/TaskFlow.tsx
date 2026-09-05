"use client";

import { useMemo, useState } from "react";
import { useProgress } from "@/lib/store";
import { R1, TAGS, TASK1, type StageId } from "@/lib/route1";
import { useRoute1 } from "./useRoute1";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseBrief } from "./CaseBrief";
import { MiniStepper } from "./MiniStepper";
import { LifecycleStageExplorer } from "./LifecycleStageExplorer";
import { SustainabilityTagPool } from "./SustainabilityTagPool";
import { LifecycleCostCalculator } from "./LifecycleCostCalculator";
import { AnalysisPanel } from "./AnalysisPanel";
import { ManagementPushback } from "./ManagementPushback";
import { LifecycleExport } from "./LifecycleExport";

/** Task 1 — owns the tag-placement selection shared between the tag pool and the stage explorer/drop target. */
export function TaskFlow() {
  const choose = useProgress((s) => s.choose);
  const r1 = useRoute1();
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  const place = (tagId: string, stageId: StageId) => {
    choose(R1.tag(tagId), stageId);
    setSelectedTagId(null);
  };

  const placedByStage = useMemo(() => {
    const map: Partial<Record<StageId, { label: string; valid: boolean }[]>> = {};
    for (const tag of TAGS) {
      const stageId = r1.tagPlacements[tag.id];
      if (!stageId) continue;
      const valid = (tag.validStages as StageId[]).includes(stageId as StageId);
      const list = map[stageId as StageId] ?? [];
      list.push({ label: tag.label, valid });
      map[stageId as StageId] = list;
    }
    return map;
  }, [r1.tagPlacements]);

  return (
    <section id="task" className="space-y-10">
      <SectionHeading kicker={TASK1.kicker} title={TASK1.heading} intro={TASK1.subtext} />
      <MiniStepper />
      <CaseBrief />

      <div>
        <h3 className="text-h3 text-ink">{TASK1.step1.heading}</h3>
        <p className="mt-1 text-caption text-ash">{TASK1.step1.instructions}</p>
        <div className="mt-4">
          <LifecycleStageExplorer />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_240px]">
        <div className="min-w-0 space-y-10">
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-h3 text-ink">{TASK1.step2.heading}</h3>
              <p className="text-caption tabular-nums text-ash">
                Tags correctly placed:{" "}
                <span className="font-semibold text-ink">{r1.validPlacedCount}</span> / {r1.validTagCount}
              </p>
            </div>
            <p className="mt-1 text-caption text-ash">{TASK1.step2.instructions}</p>
            {selectedTagId && (
              <p className="reveal-in mt-2 text-caption font-semibold text-accent">{TASK1.step2.tapHint}</p>
            )}
            <div className="mt-3">
              <SustainabilityTagPool
                selectedTagId={selectedTagId}
                onSelectTag={setSelectedTagId}
                tagPlacements={r1.tagPlacements}
              />
            </div>
          </div>

          <div>
            <h3 className="text-h3 text-ink">{TASK1.step3.heading}</h3>
            <p className="mt-1 text-caption text-ash">{TASK1.step3.instructions}</p>
            <div className="card mt-4 p-5">
              <LifecycleCostCalculator />
            </div>
          </div>

          <div>
            <h3 className="text-h3 text-ink">{TASK1.step4.heading}</h3>
            <div className="mt-4">
              <AnalysisPanel />
            </div>
          </div>

          <ManagementPushback />

          <LifecycleExport />
        </div>

        <LifecycleStageExplorer
          compact
          taggingEnabled
          selectedTagId={selectedTagId}
          onDropTag={place}
          onTapStage={(stageId) => {
            if (selectedTagId) place(selectedTagId, stageId);
          }}
          placedByStage={placedByStage}
        />
      </div>
    </section>
  );
}
