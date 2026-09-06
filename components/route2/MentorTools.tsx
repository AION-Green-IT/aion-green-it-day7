"use client";

import { useProgress } from "@/lib/store";
import { R2, LEVERS, REQUIRED_LEVER_COUNT, LEARNER_NAME_KEY } from "@/lib/route2";
import { MentorFillButton } from "@/components/ui/MentorFillButton";

const DEMO_JUSTIFICATIONS: Record<string, string> = {
  consolidate: "Underused servers are the single most visible line item on the energy bill, and consolidation needs no new hardware.",
  monitoring: "Without a baseline, none of the other three levers can be proven to have worked afterward.",
  cooling: "Piecemeal cooling adjustments over the years suggest real headroom, but it needs real data first.",
  "review-cycle": "A one-off fix regresses without a standing review — this is what makes the other three stick.",
};

/** Mentor-only: fills every field on Route 2 with plausible demo answers. */
export function MentorTools() {
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const setNote = useProgress((s) => s.setNote);
  const choose = useProgress((s) => s.choose);

  const fillDemoAnswers = () => {
    setNote(R2.dialUtilization, "0");
    setNote(R2.dialCooling, "0");
    setNote(R2.dialTransparency, "0");

    const picks = Object.keys(DEMO_JUSTIFICATIONS).slice(0, REQUIRED_LEVER_COUNT);
    LEVERS.forEach((l) => toggleCheck(R2.leverSelected(l.id), picks.includes(l.id)));
    picks.forEach((id) => setNote(R2.leverJustify(id), DEMO_JUSTIFICATIONS[id]));
    setNote(R2.rankOrder, JSON.stringify(picks));

    choose(R2.leverHorizon("monitoring"), "short");
    choose(R2.leverHorizon("consolidate"), "short");
    choose(R2.leverHorizon("cooling"), "medium");
    choose(R2.leverHorizon("review-cycle"), "structural");

    choose(R2.firstStep, "monitoring");
    setNote(
      R2.firstStepJustify,
      "We fund monitoring first because every other recommendation in this plan needs a real baseline to be defensible to the board later — it's the cheapest, lowest-risk move that unblocks everything else.",
    );
    setNote(
      R2.infoGaps,
      "We don't yet have consumption data for the colocated racks — once monitoring is live for 30 days, the consolidation business case can be sized precisely instead of estimated. The decision to start monitoring now doesn't need to wait for that data.",
    );
    setNote(LEARNER_NAME_KEY, "Mentor Demo");
  };

  return <MentorFillButton onFill={fillDemoAnswers} />;
}
