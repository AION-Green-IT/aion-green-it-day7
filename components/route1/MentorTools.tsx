"use client";

import { useProgress } from "@/lib/store";
import { R1, TAGS, STAGES, LEARNER_NAME_KEY } from "@/lib/route1";
import { MentorFillButton } from "@/components/ui/MentorFillButton";

/** Mentor-only: fills every field on Route 1 with plausible demo answers. */
export function MentorTools() {
  const choose = useProgress((s) => s.choose);
  const setNote = useProgress((s) => s.setNote);
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const markSeen = useProgress((s) => s.markSeen);

  const fillDemoAnswers = () => {
    (["tco", "carbon", "rladder", "regulatory"] as const).forEach((id) => markSeen(R1.material, id));
    STAGES.forEach((s) => markSeen(R1.stages, s.id));
    TAGS.forEach((tag) => {
      if (tag.validStages.length > 0) choose(R1.tag(tag.id), tag.validStages[0]);
    });
    setNote(R1.calcUnits, "300");
    setNote(R1.calcYears, "12");
    toggleCheck(R1.calcUsed, true);
    setNote(R1.risk1, "Vendor 1 has no spare-parts commitment, risking a full replacement instead of a repair after year 1.");
    setNote(R1.risk2, "No take-back program means disposal cost falls entirely on LogicSphere for 300 units.");
    setNote(R1.risk3, "Ignoring the 12-year carbon delta undermines sustainability reporting commitments.");
    choose(R1.classify(R1.risk1), "purchasing");
    choose(R1.classify(R1.risk2), "purchasing");
    choose(R1.classify(R1.risk3), "governance");
    choose(R1.recommendation, "vendor2");
    setNote(
      R1.pushbackJustification,
      "Over 12 years, Vendor 2 saves 179.4 t CO2e across the 300-unit fleet versus Vendor 1.",
    );
    choose(R1.pushbackChoice, "hold");
    setNote(LEARNER_NAME_KEY, "Mentor Demo");
  };

  return <MentorFillButton onFill={fillDemoAnswers} />;
}
