"use client";

import { EVIDENCE_ITEMS, CATEGORIES, PUE_CLAIMS, VERDICT_OPTIONS, SPLIT_ITEMS, SIDES, TASK1 } from "@/lib/route1";
import { buildAnswerKeyHtml, classificationOptions, type AnswerKeySection } from "@/lib/answerKey";
import { downloadTextFile } from "@/lib/downloadFile";
import { AnswerKeyButton } from "@/components/ui/AnswerKeyButton";

const EVIDENCE_WHY: Record<string, string> = {
  "ev-goo": "GoO purchases are a way of sourcing electricity on paper — still an Energy Source fact, just at the contractual/accounting level rather than the physical one.",
  "ev-gridmix": "This is about the physical grid mix actually feeding the facility — squarely an Energy Source fact.",
  "ev-pue-trend": "A PUE trend is a measurement over time — a metric, not a statement about where energy comes from or how it's discussed publicly.",
  "ev-no-submeter": "A missing instrument (sub-metering) is a measurement/verification gap — a Metrics issue, not a policy or communication one.",
  "ev-marketing": "This describes how the facility is talked about externally — a Communication fact, not a property of the facility itself.",
  "ev-no-breakdown": "What management chooses to publish (or not) is about external disclosure — Communication, not a technical gap.",
  "ev-seasonal": "Seasonal demand swings describe how the business actually runs day to day — Operating Model, not a public statement.",
  "ev-siloed": "A data-visibility gap between two internal teams is about how the operation is organised internally — Operating Model.",
  "ev-finance": "Finance questioning payback is directly about money and financial justification — Cost.",
  "ev-premium": "A locked-in price premium is a financial commitment — Cost.",
  "ev-no-verify": "Nobody outside checking the numbers is about how trustworthy the claim is — Credibility, not a technical or financial fact.",
  "ev-ambiguous-reading": "Not disclosing whether a figure is a snapshot or an average is about how much the number can be trusted — Credibility.",
};

const PUE_CLAIM_WHY: Record<string, string> = {
  "claim-overall-sustainable": "PUE improvement is real, relevant evidence, but Block 5 lists everything else it leaves out (renewable share, carbon intensity, utilisation) — real support, not full proof.",
  "claim-conversion-efficiency": "PUE's denominator is IT Equipment Energy — a better PUE literally means more incoming power reaches usable IT capacity. The data directly backs this claim.",
  "claim-physically-renewable": "A certificate is an annual accounting instrument — it says nothing about what's actually on the grid at any given hour, so it can't support a claim about every hour of the day.",
  "claim-utilisation": "PUE is a ratio against whatever IT load exists, efficiently used or not — it carries no information about utilisation at all.",
  "claim-ref-together": "This claim only says PUE should be read alongside REF, not that PUE alone proves anything — Block 5 explicitly recommends reading metrics together, so the data supports this claim.",
};

const SPLIT_WHY: Record<string, string> = {
  "ev-gridmix": "A physical fact about the grid connection, measured, not decided — Technical.",
  "ev-pue-trend": "A number produced by measurement equipment — Technical.",
  "ev-no-submeter": "A gap in physical measurement capability — Technical.",
  "ev-seasonal": "A physical pattern in the workload itself — Technical.",
  "ev-marketing": "Who approves what gets said externally is a management decision — Governance.",
  "ev-no-breakdown": "Choosing what to publish is a decision, not a technical constraint — Governance.",
  "ev-finance": "A concern about money and priorities, decided by people — Governance.",
  "ev-no-verify": "A choice about oversight and assurance — Governance.",
};

function buildSections(): AnswerKeySection[] {
  return [
    {
      heading: "Stage A — Evidence Sorter",
      questions: EVIDENCE_ITEMS.map((it) => ({
        prompt: it.text,
        options: classificationOptions(it.correctCategory, EVIDENCE_WHY[it.id], CATEGORIES),
      })),
    },
    {
      heading: "Stage B — PUE Claim Validity Check",
      questions: PUE_CLAIMS.map((c) => ({
        prompt: c.claim,
        options: classificationOptions(c.correctVerdict, PUE_CLAIM_WHY[c.id], VERDICT_OPTIONS),
      })),
    },
    {
      heading: "Stage D — Technical vs. Governance Split",
      questions: SPLIT_ITEMS.map((it) => ({
        prompt: it.text,
        options: classificationOptions(it.correctSide, SPLIT_WHY[it.id], SIDES),
      })),
    },
  ];
}

export function AnswerKeyTool() {
  const generate = () => {
    const html = buildAnswerKeyHtml({
      routeLabel: "Route 1 — Foundations",
      docHeading: TASK1.export.docHeading,
      sections: buildSections(),
    });
    downloadTextFile("day7-route1-answer-key.html", html, "text/html");
  };

  return <AnswerKeyButton onGenerate={generate} />;
}
