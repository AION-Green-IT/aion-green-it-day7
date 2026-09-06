"use client";

import { TASK2 } from "@/lib/route2";
import { useRoute2 } from "./useRoute2";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MiniStepper } from "@/components/ui/MiniStepper";
import { CaseBrief } from "./CaseBrief";
import { GuidedKraljicClassification } from "./GuidedKraljicClassification";
import { WeightedScoring } from "./WeightedScoring";
import { HiddenCostRiskCalculator } from "./HiddenCostRiskCalculator";
import { DecisionPanel } from "./DecisionPanel";
import { ProcurementExport } from "./ProcurementExport";

export function TaskFlow() {
  const r2 = useRoute2();
  const steps = [
    { label: "Kraljic", done: r2.step1Complete },
    { label: "Scoring", done: r2.step2Complete },
    { label: "Cost & Risk", done: r2.step3Complete },
    { label: "Decision", done: r2.step4Complete },
  ];

  return (
    <section id="task" className="space-y-10">
      <SectionHeading kicker={TASK2.kicker} title={TASK2.heading} intro={TASK2.subtext} />
      <MiniStepper steps={steps} />
      <CaseBrief />

      <div id="r2-step1">
        <h3 className="text-h3 text-ink">{TASK2.step1.heading}</h3>
        <p className="mt-1 text-caption text-ash">{TASK2.step1.instructions}</p>
        <div className="mt-4">
          <GuidedKraljicClassification />
        </div>
      </div>

      <div id="r2-step2">
        <h3 className="text-h3 text-ink">{TASK2.step2.heading}</h3>
        <p className="mt-1 text-caption text-ash">{TASK2.step2.instructions}</p>
        <div className="card mt-4 p-5">
          <WeightedScoring />
        </div>
      </div>

      <div id="r2-step3">
        <h3 className="text-h3 text-ink">{TASK2.step3.heading}</h3>
        <p className="mt-1 text-caption text-ash">{TASK2.step3.instructions}</p>
        <div className="card mt-4 p-5">
          <HiddenCostRiskCalculator />
        </div>
      </div>

      <div id="r2-step4">
        <h3 className="text-h3 text-ink">{TASK2.step4.heading}</h3>
        <div className="mt-4">
          <DecisionPanel />
        </div>
      </div>

      <ProcurementExport />
    </section>
  );
}
