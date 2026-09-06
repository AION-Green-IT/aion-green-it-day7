"use client";

import { TASK1A, TASK1B } from "@/lib/route1";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseBrief } from "./CaseBrief";
import { MiniStepper } from "./MiniStepper";
import { DiagnosticMapping } from "./DiagnosticMapping";
import { CategorizationPanel } from "./CategorizationPanel";
import { AuditMappingExport } from "./AuditMappingExport";
import { PrioritySimulator } from "./PrioritySimulator";
import { PriorityDecisionForm } from "./PriorityDecisionForm";
import { PriorityDecisionExport } from "./PriorityDecisionExport";
import { useRoute1 } from "./useRoute1";

export function TaskFlow() {
  const r1 = useRoute1();

  return (
    <section id="task" className="space-y-12">
      <MiniStepper />
      <CaseBrief />

      <div className="space-y-8">
        <SectionHeading kicker={TASK1A.kicker} title={TASK1A.heading} intro={TASK1A.subtext} />

        <div id="r1a-step1">
          <h3 className="text-h3 text-ink">{TASK1A.step1.heading}</h3>
          <p className="mt-1 text-caption text-ash">{TASK1A.step1.instructions}</p>
          <div className="mt-4">
            <DiagnosticMapping />
          </div>
        </div>

        <div id="r1a-step2">
          <h3 className="text-h3 text-ink">{TASK1A.step2.heading}</h3>
          <p className="mt-1 text-caption text-ash">{TASK1A.step2.instructions}</p>
          {r1.step1aStep1Complete ? (
            <div className="mt-4">
              <CategorizationPanel />
            </div>
          ) : (
            <p className="mt-3 text-caption text-ash">Diagnose every zone in Step 1 first — this panel unlocks automatically.</p>
          )}
        </div>

        <AuditMappingExport />
      </div>

      <hr className="border-line" />

      <div className="space-y-8">
        <SectionHeading kicker={TASK1B.kicker} title={TASK1B.heading} intro={TASK1B.subtext} />
        <p className="rounded-xl border border-line bg-canvas p-4 text-caption text-ash">{TASK1B.scenario}</p>

        <div id="r1b-step1">
          <h3 className="text-h3 text-ink">{TASK1B.step1.heading}</h3>
          <p className="mt-1 text-caption text-ash">{TASK1B.step1.instructions}</p>
          <div className="mt-4">
            <PrioritySimulator />
          </div>
        </div>

        <div id="r1b-step2">
          <h3 className="text-h3 text-ink">{TASK1B.step2.heading}</h3>
          <p className="mt-1 text-caption text-ash">{TASK1B.step2.instructions}</p>
          <div className="mt-4">
            <PriorityDecisionForm />
          </div>
        </div>

        <PriorityDecisionExport />
      </div>
    </section>
  );
}
