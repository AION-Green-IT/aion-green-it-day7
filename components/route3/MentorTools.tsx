"use client";

import { useProgress } from "@/lib/store";
import { R3, TENSION_NODES, TENSION_EDGES, LEVERAGE_CANDIDATES, CONFLICT_STATEMENTS, RACI_DECISIONS } from "@/lib/route3";
import { LEARNER_NAME_KEY } from "@/lib/route1";
import { MentorFillButton } from "@/components/ui/MentorFillButton";

/** Mentor-only: fills every field on Route 3 (both phases) with plausible demo answers. */
export function MentorTools() {
  const choose = useProgress((s) => s.choose);
  const setNote = useProgress((s) => s.setNote);
  const markSeen = useProgress((s) => s.markSeen);

  const fillDemoAnswers = () => {
    (["iso20400", "bindingCriteria", "raci", "horizon"] as const).forEach((id) => markSeen(R3.material, id));

    TENSION_NODES.forEach((n) => markSeen(R3.tensionNodesSeen, n.id));
    TENSION_EDGES.forEach((e) => markSeen(R3.tensionEdgesSeen, e.id));

    LEVERAGE_CANDIDATES.slice(0, 4).forEach((c, i) => choose(R3.leverageRank(c.id), String(i + 1)));
    setNote(R3.leverageJustify, "Binding criteria is the root cause; everything else is downstream of it.");

    setNote(R3.strategicLadderPosition, "managed");
    setNote(
      R3.strategicRelevance,
      "Helion sits at Managed today; moving to Strategic ties lifecycle procurement directly to capital allocation decisions.",
    );

    setNote(R3.coreDecision(1), "Decide the scored weight for repairability in the next tender.");
    choose(R3.coreDecisionRaci(1), "it");
    setNote(R3.coreDecision(2), "Decide whether to pilot circular procurement on laptops first.");
    choose(R3.coreDecisionRaci(2), "sustainability");
    setNote(R3.coreDecision(3), "Decide who signs off on the new award criteria.");
    choose(R3.coreDecisionRaci(3), "management");

    CONFLICT_STATEMENTS.forEach((c, i) => setNote(R3.conflictPos(c.id), `${20 + i * 15},${30 + i * 10}`));

    choose(R3.firstStep, "pilot");
    setNote(
      R3.firstStepJustify,
      "This matches my #1 leverage point from Phase 1: binding criteria first, piloted before full rollout.",
    );

    RACI_DECISIONS.forEach((d) => choose(R3.raciBuild(d.id, "purchasing"), "A"));

    setNote(
      R3.incompleteInfo,
      "We must commit to a pilot category now even though full lifecycle cost data for peripherals is still incomplete.",
    );

    choose(R3.boardChoice, "risk");
    setNote(
      R3.execSummary,
      "Helion should bind repairability into its next tender, piloted on one device category to de-risk commitment. This closes the gap between stated sustainability intent and actual procurement practice. The board is asked to approve a scoped pilot, not an open-ended policy change.",
    );

    setNote(LEARNER_NAME_KEY, "Mentor Demo");
  };

  return <MentorFillButton onFill={fillDemoAnswers} />;
}
