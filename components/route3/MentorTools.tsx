"use client";

import { useProgress } from "@/lib/store";
import { R3, LEARNER_NAME_KEY, OBSERVATIONS, LEVERS3 } from "@/lib/route3";
import { MentorFillButton } from "@/components/ui/MentorFillButton";

const DEMO_LEVERS: Record<string, { justify: string; horizon: "short" | "medium" | "structural" }> = {
  "transparency-system": {
    justify: "Closes the load-and-impact data gap Finance and IT Operations both flagged, and every other lever's business case gets sharper once this exists.",
    horizon: "medium",
  },
  "verified-communication": {
    justify: "Marketing's draft campaign currently outruns what the data can support — aligning it to verified figures now avoids a credibility failure later.",
    horizon: "short",
  },
  "third-party-assurance": {
    justify: "Closes the Line 2/Line 3 assurance gap directly — nobody outside AeroPulse has checked these numbers, and that's the actual credibility risk.",
    horizon: "structural",
  },
  "technical-retrofit": {
    justify: "A targeted retrofit gives a real, physically verifiable efficiency gain to point to while the transparency system is still being built out.",
    horizon: "medium",
  },
};

const DEMO_STRATEGIC_RELEVANCE =
  "Renewable energy and PUE are strategically relevant to PolarEdge because rising energy costs and tightening EU disclosure rules are converging on the same data centre operators at the same time. Without a credible, verifiable efficiency and sourcing story, PolarEdge risks both a cost problem and a compliance problem arriving together, with no board-level structure ready to respond to either.";

const DEMO_DECISIONS = [
  "Approve budget for a multi-metric transparency system by Q2, covering the current load-data gap.",
  "Approve a third-party assurance review of efficiency and renewable-sourcing figures before any expanded external communication.",
  "Defer any new long-term energy contract until the transparency system produces one full reporting cycle of data.",
];

const DEMO_LOGIC_EXPLAIN =
  "We sequence by data-readiness first because every other principle — visible impact, risk reduction, cost reversibility — depends on having real numbers to evaluate against; deciding in the other order risks committing budget to whichever measure sounds best rather than whichever the data actually supports.";

const DEMO_TRADEOFFS: Record<string, string> = {
  "sustainability-credibility": "A visible sustainability push means nothing if it can't survive scrutiny — PolarEdge can't optimise the message faster than it can verify the substance.",
  "cost-availability": "Budget restrictions push toward the cheapest measures, but the cheapest technical changes are also the ones most likely to touch live infrastructure and risk availability.",
};

const DEMO_APPROVALS: Record<string, string> = {
  "energy-contract": "Board (on Finance recommendation)",
  "retrofit-budget": "CIO/CTO",
  "external-comms": "CIO/CTO, with Communications drafting",
  "annual-review": "Board, briefed by CIO/CTO",
};

const DEMO_DECISION_NOW =
  "Commission the third-party assurance review now, with a trigger date of the end of this quarter — this doesn't require the transparency system to exist first, and every other communication decision downstream depends on it being underway.";

/** Mentor-only: fills every field on Route 3's Task 3 (both phases) with plausible, model-quality demo answers. */
export function MentorTools() {
  const choose = useProgress((s) => s.choose);
  const setNote = useProgress((s) => s.setNote);
  const toggleCheck = useProgress((s) => s.toggleCheck);

  const fillDemoAnswers = () => {
    setNote(LEARNER_NAME_KEY, "Muchson");

    // Phase 1 — Diagnostic
    OBSERVATIONS.forEach((o) => choose(R3.p1.scan(o.id), o.correctPerspective));

    const leverIds = Object.keys(DEMO_LEVERS);
    LEVERS3.forEach((l) => toggleCheck(R3.p1.leverSelected(l.id), leverIds.includes(l.id)));
    leverIds.forEach((id) => {
      setNote(R3.p1.leverJustify(id), DEMO_LEVERS[id].justify);
      choose(R3.p1.leverHorizon(id), DEMO_LEVERS[id].horizon);
    });
    choose(R3.p1.firstMeasure, "transparency-system");
    setNote(
      R3.p1.firstMeasureJustify,
      "Starting with transparency gives management a defensible answer to Finance's viability question and Marketing's messaging risk at the same time, instead of picking a side in that argument before the data exists to settle it.",
    );

    // Phase 2 — Builder
    setNote(R3.p2.strategicRelevance, DEMO_STRATEGIC_RELEVANCE);
    DEMO_DECISIONS.forEach((text, i) => setNote(R3.p2.guidingDecision((i + 1) as 1 | 2 | 3), text));
    toggleCheck(R3.p2.logicPrincipleSelected("data-readiness"), true);
    toggleCheck(R3.p2.logicPrincipleSelected("risk-reduction"), true);
    setNote(R3.p2.logicExplain, DEMO_LOGIC_EXPLAIN);
    Object.keys(DEMO_TRADEOFFS).forEach((id) => {
      toggleCheck(R3.p2.tradeoffSelected(id), true);
      setNote(R3.p2.tradeoffJustify(id), DEMO_TRADEOFFS[id]);
    });
    choose(R3.p2.recommendedMeasure, "transparency-system");
    setNote(
      R3.p2.recommendedJustify,
      "Same logic as AeroPulse's diagnostic: PolarEdge can't sequence anything else credibly until it knows its own load and impact numbers well enough to defend them.",
    );
    Object.keys(DEMO_APPROVALS).forEach((id) => setNote(R3.p2.approvalOwner(id), DEMO_APPROVALS[id]));
    setNote(R3.p2.decisionNow, DEMO_DECISION_NOW);
  };

  return <MentorFillButton onFill={fillDemoAnswers} />;
}
