"use client";

import { useProgress } from "@/lib/store";
import { R1, LEARNER_NAME_KEY, EVIDENCE_ITEMS, PUE_CLAIMS, SPLIT_ITEMS } from "@/lib/route1";
import { MentorFillButton } from "@/components/ui/MentorFillButton";

const DEMO_GAPS: { id: string; justification: string }[] = [
  {
    id: "renewable-transparency",
    justification:
      "Without knowing what share of consumption is actually renewable hour by hour, the certificate purchase alone cannot support a full sustainability claim.",
  },
  {
    id: "carbon-intensity",
    justification:
      "The certificates say nothing about the carbon intensity of the physical grid GreenStack is actually connected to at any given time.",
  },
  {
    id: "third-party-verification",
    justification:
      "Nobody outside GreenStack has checked these numbers, so the entire claim currently rests on unverified, self-reported data.",
  },
];

/** Mentor-only: fills every field on Route 1's Task 1 with plausible, model-quality demo answers. */
export function MentorTools() {
  const choose = useProgress((s) => s.choose);
  const setNote = useProgress((s) => s.setNote);

  const fillDemoAnswers = () => {
    setNote(LEARNER_NAME_KEY, "Muchson");

    EVIDENCE_ITEMS.forEach((it) => choose(R1.stageA.category(it.id), it.correctCategory));
    PUE_CLAIMS.forEach((c) => choose(R1.stageB.verdict(c.id), c.correctVerdict));

    DEMO_GAPS.forEach((g) => {
      choose(R1.stageC.selected(g.id), "yes");
      setNote(R1.stageC.justification(g.id), g.justification);
    });

    SPLIT_ITEMS.forEach((it) => choose(R1.stageD.placement(it.id), it.correctSide));
  };

  return <MentorFillButton onFill={fillDemoAnswers} />;
}
