"use client";

import { TASK2 } from "@/lib/route2";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MiniStepper } from "@/components/ui/MiniStepper";
import { CaseBrief } from "./CaseBrief";
import { ScenarioDials } from "./ScenarioDials";
import { StructuredAnalysis } from "./StructuredAnalysis";
import { TradeoffExport } from "./TradeoffExport";
import { useRoute2 } from "./useRoute2";

export function TaskFlow() {
  const r2 = useRoute2();

  const steps = [
    { label: "Select Levers", done: r2.selectionComplete && r2.allJustified },
    { label: "Build Plan", done: r2.allHorizonsSet && r2.firstStepValid && r2.firstStepJustify.trim().length > 0 },
    { label: "Info Gaps", done: r2.infoGaps.trim().length > 0 },
  ];

  return (
    <section id="task" className="space-y-8">
      <SectionHeading kicker={TASK2.kicker} title={TASK2.heading} intro={TASK2.subtext} />
      <MiniStepper steps={steps} />
      <CaseBrief />

      <div id="r2-step1">
        <h3 className="text-h3 text-ink">{TASK2.step1.heading}</h3>
        <p className="mt-1 text-caption text-ash">{TASK2.step1.instructions}</p>
        <div className="mt-4 card p-5">
          <ScenarioDials />
        </div>
      </div>

      <div id="r2-step2">
        <h3 className="text-h3 text-ink">{TASK2.step2.heading}</h3>
        <div className="mt-4">
          <StructuredAnalysis />
        </div>
      </div>

      <TradeoffExport />
    </section>
  );
}
