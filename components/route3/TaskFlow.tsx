"use client";

import { TASK3 } from "@/lib/route3";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MiniStepper } from "@/components/ui/MiniStepper";
import { CaseBrief } from "./CaseBrief";
import { BoardProposalForm } from "./BoardProposalForm";
import { BoardProposalPreview } from "./BoardProposalPreview";
import { BoardProposalExport } from "./BoardProposalExport";
import { useRoute3 } from "./useRoute3";

export function TaskFlow() {
  const r3 = useRoute3();

  const steps = [
    { label: "Relevance", done: r3.strategicRelevanceValid },
    { label: "Decisions", done: r3.keyDecisionsValid },
    { label: "Logic", done: r3.prioritizationLogicValid },
    { label: "Conflicts", done: r3.conflictsValid },
    { label: "Priority", done: r3.firstPriorityValid },
    { label: "RACI", done: r3.raciValid },
    { label: "Gaps", done: r3.incompleteDataValid },
  ];

  return (
    <section id="task" className="space-y-8">
      <SectionHeading kicker={TASK3.kicker} title={TASK3.heading} intro={TASK3.subtext} />
      <MiniStepper steps={steps} />
      <CaseBrief />

      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(340px,42%)]">
        <div className="min-w-0">
          <BoardProposalForm />
        </div>
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <BoardProposalPreview />
        </div>
      </div>

      <BoardProposalExport />
    </section>
  );
}
