"use client";

import { TASK3 } from "@/lib/route3";
import { useRoute3 } from "./useRoute3";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MiniStepper } from "@/components/ui/MiniStepper";
import { MissingList } from "@/components/ui/MissingList";
import { ProximaBrief, HelionBrief } from "./CaseBriefs";
import { TensionMap } from "./TensionMap";
import { LeverageRanking } from "./LeverageRanking";
import { ExecutiveDecisionBuilder } from "./ExecutiveDecisionBuilder";
import { BoardChallenge } from "./BoardChallenge";
import { ExecutiveReportPreview } from "./ExecutiveReportPreview";
import { ExecutiveExport } from "./ExecutiveExport";

export function TaskFlow() {
  const r3 = useRoute3();
  const steps = [
    { label: "Tension Map", done: r3.step1Complete },
    { label: "Leverage", done: r3.step2Complete },
    { label: "Decision Builder", done: r3.step3Complete },
    { label: "Board Challenge", done: r3.step4Complete },
  ];
  const phase2Unlocked = r3.step2Complete;
  const step2Missing = [
    r3.rankedCount < 4 && { id: "r3-step2", label: `rank all 4 priority slots (${r3.rankedCount}/4 filled)` },
    !r3.leverageJustify.trim() && { id: "r3-step2", label: "justify your #1 pick" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <section id="task" className="space-y-10">
      <SectionHeading kicker={TASK3.kicker} title={TASK3.heading} intro={TASK3.subtext} />
      <MiniStepper steps={steps} />

      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(340px,42%)]">
        <div className="min-w-0 space-y-10">
          <div>
            <p className="text-micro font-semibold uppercase tracking-wide text-accent">{TASK3.phase1.label}</p>
            <div className="mt-2">
              <ProximaBrief />
            </div>
          </div>

          <div id="r3-step1">
            <h3 className="text-h3 text-ink">{TASK3.phase1.step1.heading}</h3>
            <p className="mt-1 text-caption text-ash">{TASK3.phase1.step1.instructions}</p>
            <div className="mt-4">
              <TensionMap />
            </div>
          </div>

          <div id="r3-step2">
            <h3 className="text-h3 text-ink">{TASK3.phase1.step2.heading}</h3>
            <p className="mt-1 text-caption text-ash">{TASK3.phase1.step2.instructions}</p>
            <div className="mt-4">
              <LeverageRanking />
            </div>
          </div>

          {phase2Unlocked ? (
            <>
              <div className="anim-pop rounded-xl border border-accent bg-accentSoft p-5">
                <p className="text-caption font-semibold uppercase tracking-wide text-accent">{TASK3.phase2.label}</p>
                <p className="mt-1 text-body text-ink">{TASK3.transition}</p>
              </div>

              <HelionBrief />

              <div id="r3-step3">
                <h3 className="text-h3 text-ink">{TASK3.phase2.step3.heading}</h3>
                <div className="mt-4">
                  <ExecutiveDecisionBuilder />
                </div>
              </div>

              <BoardChallenge />

              <ExecutiveExport />
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-line p-5">
              <p className="text-caption font-semibold text-ink">{TASK3.phase2.label} unlocks after Step 2.</p>
              <MissingList items={step2Missing} />
            </div>
          )}
        </div>

        <div id="r3-report" className="min-w-0 scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
          <ExecutiveReportPreview />
        </div>
      </div>
    </section>
  );
}
