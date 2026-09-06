"use client";

import { useProgress } from "@/lib/store";
import { R1, ZONES, LEARNER_NAME_KEY } from "@/lib/route1";
import { MentorFillButton } from "@/components/ui/MentorFillButton";

/** Mentor-only: fills every field on Route 1 (both tasks) with plausible demo answers. */
export function MentorTools() {
  const choose = useProgress((s) => s.choose);
  const setNote = useProgress((s) => s.setNote);

  const fillDemoAnswers = () => {
    ZONES.forEach((z) => {
      choose(R1.zoneAnswer(z.id), z.choices[0].id);
      choose(R1.zoneImpact(z.id), z.id === "redundancy" || z.id === "operations" ? "governance" : "technical");
      choose(R1.zoneHorizon(z.id), z.id === "monitoring" || z.id === "utilization" ? "short" : "medium");
    });
    choose(R1.priorityZone, "monitoring");
    setNote(
      R1.improvementApproach,
      "Start with continuous PUE and sub-metering, because every other fix here is currently unverifiable without it — we can't prove consolidation or cooling changes worked if we can't measure the baseline first.",
    );
    choose(R1.simBudget, "med");
    choose(R1.simRisk, "low");
    choose(R1.simOption, "monitoring");
    setNote(R1.simWhy, "With limited budget and low risk tolerance, monitoring is the only option with near-zero investment and near-zero risk, and it directly de-risks whichever fix comes next.");
    setNote(R1.simFollowOn, "Once a real baseline exists, CoreAxis will need to decide between funding consolidation or cooling modernization with actual numbers instead of a one-off estimate.");
    setNote(R1.simRisk1, "Leadership may see no visible energy-cost drop this quarter, since monitoring alone doesn't cut consumption.");
    setNote(R1.simRisk2, "If a major inefficiency is quietly getting worse in the meantime, it goes undiagnosed for another cycle.");
    setNote(LEARNER_NAME_KEY, "Mentor Demo");
  };

  return <MentorFillButton onFill={fillDemoAnswers} />;
}
