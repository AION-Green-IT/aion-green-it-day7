"use client";

import { useProgress } from "@/lib/store";
import { R2, KRALJIC_QUESTIONS, CRITERIA } from "@/lib/route2";
import { LEARNER_NAME_KEY } from "@/lib/route1";
import { MentorFillButton } from "@/components/ui/MentorFillButton";

const MODELS = ["modelA", "modelB", "modelC"] as const;
const MODEL_SCORES: Record<(typeof MODELS)[number], string> = { modelA: "3", modelB: "4", modelC: "3" };

/** Mentor-only: fills every field on Route 2 with plausible demo answers. */
export function MentorTools() {
  const choose = useProgress((s) => s.choose);
  const setNote = useProgress((s) => s.setNote);
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const markSeen = useProgress((s) => s.markSeen);

  const fillDemoAnswers = () => {
    (["kraljic", "hiddenCost", "lockIn", "weighting"] as const).forEach((id) => markSeen(R2.material, id));

    KRALJIC_QUESTIONS.forEach((q) => choose(R2.kraljicQ(q.id), q.options[1].id));

    CRITERIA.forEach((c) => {
      MODELS.forEach((m) => setNote(R2.score(m, c.id), MODEL_SCORES[m]));
    });
    toggleCheck(R2.scoringLocked, true);

    setNote(R2.calcUnits, "350");
    setNote(R2.dependencyReflection, "Weak — high switching cost, limited leverage at contract renewal.");
    toggleCheck(R2.costUsed, true);

    choose(R2.rank("modelA"), "3");
    choose(R2.rank("modelB"), "1");
    choose(R2.rank("modelC"), "2");
    setNote(R2.justifyScore, "Model B scored highest (around 3.4) on weighted criteria among the three options.");
    setNote(R2.justifyRisk, "Model C carries high dependency risk per the gauge, and costs the most at 350 units.");
    setNote(R2.stakeholder("purchasing"), "Issue the RFP with lifecycle criteria scored at 20% weight.");
    setNote(R2.stakeholder("it"), "Confirm imaging/staging capacity for the chosen model.");
    setNote(R2.stakeholder("management"), "Approve the budget delta between Model A and Model B.");
    setNote(R2.risk(1), "Higher failure rates drive unplanned downtime cost later.");
    setNote(R2.risk(2), "No take-back program means disposal cost falls entirely on the company.");

    setNote(LEARNER_NAME_KEY, "Mentor Demo");
  };

  return <MentorFillButton onFill={fillDemoAnswers} />;
}
