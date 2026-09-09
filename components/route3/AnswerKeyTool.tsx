"use client";

import { OBSERVATIONS, PERSPECTIVES, TASK3 } from "@/lib/route3";
import { buildAnswerKeyHtml, classificationOptions, type AnswerKeySection } from "@/lib/answerKey";
import { downloadTextFile } from "@/lib/downloadFile";
import { AnswerKeyButton } from "@/components/ui/AnswerKeyButton";

const OBSERVATION_WHY: Record<string, string> = {
  "pue-drop": "A PUE ratio moving from 1.7 to 1.5 is a fact about the efficiency ratio itself — PUE.",
  "demand-growth": "Total power draw is the whole-picture number PUE alone can't show — Overall Impact.",
  "ppa-share": "This is about the sourcing mix under contract — Energy Supply.",
  "no-breakdown": "Nobody has organised load/zone data — a data-ownership and oversight gap, not a technical limit — Governance.",
  "finance-question": "Whether a cost is paying back is a straightforward economic question — Economic Viability.",
  "marketing-campaign": "An external campaign and what it claims is a Communication fact.",
  "itops-pushback": "IT Ops's point is that one ratio can't stand for the whole footprint — exactly the Overall Impact perspective.",
  "no-external-review": "The absence of independent review is an assurance/oversight gap — Governance.",
};

function buildSections(): AnswerKeySection[] {
  return [
    {
      heading: "Phase 1 — Rapid Multi-Perspective Scan",
      questions: OBSERVATIONS.map((o) => ({
        prompt: o.text,
        options: classificationOptions(o.correctPerspective, OBSERVATION_WHY[o.id], PERSPECTIVES),
      })),
    },
  ];
}

export function AnswerKeyTool() {
  const generate = () => {
    const html = buildAnswerKeyHtml({
      routeLabel: "Route 3 — Decision Architecture",
      docHeading: TASK3.export.docHeading,
      sections: buildSections(),
    });
    downloadTextFile("day7-route3-answer-key.html", html, "text/html");
  };

  return <AnswerKeyButton onGenerate={generate} />;
}
