"use client";

import { CRITERIA, CRITERION_DATA, OPTIONS, TASK2 } from "@/lib/route2";
import { buildAnswerKeyHtml, type AnswerKeySection } from "@/lib/answerKey";
import { downloadTextFile } from "@/lib/downloadFile";
import { AnswerKeyButton } from "@/components/ui/AnswerKeyButton";

function buildSections(): AnswerKeySection[] {
  return CRITERIA.map((c) => ({
    heading: `Criterion ${c.n} — ${c.label}`,
    questions: OPTIONS.map((o) => {
      const data = CRITERION_DATA[c.id][o.id];
      return {
        prompt: `Option ${o.id} (${o.short}) — which statement best fits Meridian's situation?`,
        options: data.statements.map((st) => ({
          label: st.text,
          correct: st.score === data.bestFitScore,
          reason: data.rationale[st.score],
        })),
      };
    }),
  }));
}

export function AnswerKeyTool() {
  const generate = () => {
    const html = buildAnswerKeyHtml({
      routeLabel: "Route 2 — Application",
      docHeading: TASK2.export.docHeading,
      sections: buildSections(),
    });
    downloadTextFile("day7-route2-answer-key.html", html, "text/html");
  };

  return <AnswerKeyButton onGenerate={generate} />;
}
