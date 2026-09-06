"use client";

import { useProgress } from "@/lib/store";
import { R3, LEARNER_NAME_KEY } from "@/lib/route3";
import { MentorFillButton } from "@/components/ui/MentorFillButton";

/** Mentor-only: fills every field on Route 3 with plausible demo answers. */
export function MentorTools() {
  const setNote = useProgress((s) => s.setNote);
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const choose = useProgress((s) => s.choose);

  const fillDemoAnswers = () => {
    setNote(
      R3.strategicRelevance,
      "Energy cost trend and operational risk exposure both point the same direction: NovaCore's growth plans make an unmanaged facility increasingly expensive to run and increasingly risky to scale. ESRS environmental disclosure is not yet mandatory at our size, but it is a plausible near-term driver worth tracking.",
    );
    setNote(R3.keyDecision(1), "Approve baseline monitoring investment by Q2.");
    setNote(R3.keyDecision(2), "Commission a consolidation business case once 90 days of monitoring data exist.");
    setNote(R3.keyDecision(3), "Hold redundancy levels under review, with no reduction until risk exposure is quantified.");
    setNote(
      R3.prioritizationLogic,
      "Future steps are ordered by TCO impact weighed against Cost of Risk, per Route 2's framework — no step gets funded ahead of the data needed to size it.",
    );

    const conflictIds = ["efficiency-availability", "growth-risk", "redundancy-cost"];
    conflictIds.forEach((id) => toggleCheck(R3.conflictSelected(id), true));
    setNote(R3.conflictJustify("efficiency-availability"), "NovaCore's non-negotiable availability requirement directly limits how aggressively we can cut facility overhead.");
    setNote(R3.conflictJustify("growth-risk"), "Planned growth argues for keeping headroom; risk tolerance argues for consolidating it — this can't be resolved by data alone.");
    setNote(R3.conflictJustify("redundancy-cost"), "Current 2N-everywhere posture is a cost/efficiency mismatch, but changing it changes NovaCore's risk profile.");

    setNote(
      R3.firstPriorityPath,
      "Fund monitoring first — it's a no-regret move that de-risks every subsequent decision regardless of which future NovaCore turns out to be in.",
    );

    choose(R3.raci("major-investment", "board"), "A");
    choose(R3.raci("major-investment", "cto"), "R");
    choose(R3.raci("major-investment", "infra-lead"), "C");
    choose(R3.raci("major-investment", "ops-team"), "I");
    choose(R3.raci("efficiency-rollout", "cto"), "A");
    choose(R3.raci("efficiency-rollout", "infra-lead"), "R");
    choose(R3.raci("efficiency-rollout", "board"), "I");
    choose(R3.raci("efficiency-rollout", "ops-team"), "C");
    choose(R3.raci("redundancy-risk", "board"), "A");
    choose(R3.raci("redundancy-risk", "cto"), "C");
    choose(R3.raci("redundancy-risk", "infra-lead"), "R");
    choose(R3.raci("redundancy-risk", "ops-team"), "I");
    choose(R3.raci("ongoing-review", "infra-lead"), "A");
    choose(R3.raci("ongoing-review", "ops-team"), "R");
    choose(R3.raci("ongoing-review", "cto"), "I");
    choose(R3.raci("ongoing-review", "board"), "I");

    setNote(
      R3.incompleteData,
      "We can commit now to (1) funding monitoring and (2) holding redundancy under review — neither depends on data we don't have, and both remain correct regardless of what the consolidation business case eventually shows.",
    );
    setNote(LEARNER_NAME_KEY, "Mentor Demo");
  };

  return <MentorFillButton onFill={fillDemoAnswers} />;
}
