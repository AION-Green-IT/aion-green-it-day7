"use client";

import { useProgress } from "@/lib/store";
import { R2, LEARNER_NAME_KEY, CRITERIA, CRITERION_DATA, OPTION_IDS } from "@/lib/route2";
import { MentorFillButton } from "@/components/ui/MentorFillButton";

const DEMO_FOLLOWUPS = [
  "Which specific metrics beyond PUE the new model will track first, and who owns collecting each one.",
  "How results from the first reporting cycle will be communicated to the board without overstating progress that hasn't happened yet.",
];

const DEMO_RISKS = [
  "A PPA announcement reads well externally, but if matched consumption data is never built, the claim is exposed the moment anyone asks how much of that renewable electricity Meridian actually uses hour by hour.",
  "Locking into a single 10-20 year contract now, before the data situation is fixed, forecloses a more informed sourcing decision later — the opposite of the strategic flexibility a data centre this size still needs.",
];

const DEMO_JUSTIFY =
  "Meridian's board wants visible progress, but the constraints point the other way: the data situation on load and consumption has real gaps, and IT explicitly doesn't want to back a symbolic measure. Option C is the only one of the three that directly closes that data gap and gives every future energy decision — including a later PPA or retrofit — something real to stand on.";

/** Mentor-only: fills every field on Route 2's Task 2 with plausible, model-quality demo answers. */
export function MentorTools() {
  const choose = useProgress((s) => s.choose);
  const setNote = useProgress((s) => s.setNote);

  const fillDemoAnswers = () => {
    setNote(LEARNER_NAME_KEY, "Muchson");

    CRITERIA.forEach((c) => {
      OPTION_IDS.forEach((option) => {
        const data = CRITERION_DATA[c.id][option];
        const statement = data.statements.find((st) => st.score === data.bestFitScore);
        if (statement) choose(R2.criterion(c.id, option), statement.id);
      });
    });

    choose(R2.decisionPick, "C");
    setNote(R2.decisionJustify, DEMO_JUSTIFY);
    DEMO_FOLLOWUPS.forEach((text, i) => setNote(R2.followUp(i), text));
    DEMO_RISKS.forEach((text, i) => setNote(R2.risk(i), text));
  };

  return <MentorFillButton onFill={fillDemoAnswers} />;
}
