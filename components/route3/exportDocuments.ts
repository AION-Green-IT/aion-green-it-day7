import { OBSERVATIONS, LEVERS3, TASK3 } from "@/lib/route3";
import type { useRoute3 } from "./useRoute3";
import type { BoardMemoData } from "./useBoardMemoData";

type Route3State = ReturnType<typeof useRoute3>;

/** Raw structured answers from both phases, for grading/QA — not shown to the learner during the exercise. */
export function buildReportJson(r3: Route3State, memo: BoardMemoData, filename: string): string {
  const payload = {
    meta: {
      day: 7,
      route: 3,
      level: TASK3.export.filenameLevel,
      task: TASK3.export.filenameTask,
      filename,
      name: r3.name,
      exportedAt: new Date().toISOString(),
    },
    phase1Diagnostic: {
      scan: OBSERVATIONS.map((o) => ({ id: o.id, text: o.text, assigned: r3.scanAssignments[o.id] ?? null })),
      levers: LEVERS3.map((l) => ({
        id: l.id,
        label: l.label,
        selected: r3.selectedLeverIds.includes(l.id),
        justification: r3.leverJustify[l.id] || null,
        horizon: r3.leverHorizon[l.id] ?? null,
      })),
      firstMeasure: r3.firstMeasure || null,
      firstMeasureJustify: r3.firstMeasureJustify,
    },
    phase2Builder: {
      strategicRelevance: r3.strategicRelevance,
      guidingDecisions: r3.guidingDecisions,
      logicPrinciples: r3.selectedPrinciples,
      logicExplain: r3.logicExplain,
      tradeoffs: r3.selectedPairIds.map((id) => ({ id, justification: r3.tradeoffJustify[id] || null })),
      recommendedMeasure: r3.recommendedMeasure || null,
      recommendedJustify: r3.recommendedJustify,
      approvals: r3.approvalOwners,
      decisionNow: r3.decisionNow,
    },
  };
  return JSON.stringify(payload, null, 2);
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Standalone, print-ready HTML document — no external stylesheet, so it opens correctly on its own. */
export function buildReportHtml(memo: BoardMemoData): string {
  const list = (items: string[]) => `<ul>${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;

  const tradeoffsHtml = memo.tradeoffs.map((t) => `<li><strong>${esc(t.label)}.</strong> ${esc(t.note)}</li>`).join("");
  const approvalsHtml = memo.approvals.map((a) => `<li><strong>${esc(a.decision)}:</strong> ${esc(a.owner)}</li>`).join("");
  const perspectiveHtml = memo.appendix.perspectiveGroups
    .map((g) => `<h3>${esc(g.perspective)} (${g.items.length})</h3>${list(g.items)}`)
    .join("");
  const leverPlanHtml = memo.appendix.leverPlan
    .map((l) => `<li><strong>${esc(l.label)}</strong> (${esc(l.horizon)}) — ${esc(l.justification || "(justification pending)")}</li>`)
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(TASK3.export.docHeading)} — ${esc(memo.name)}</title>
<style>
  body { font-family: "Segoe UI", Arial, sans-serif; color: #16191D; max-width: 720px; margin: 40px auto; padding: 0 20px; line-height: 1.5; }
  h1 { font-size: 22px; margin-bottom: 4px; }
  h2 { font-size: 15px; text-transform: uppercase; letter-spacing: 0.04em; color: #5E6670; margin-top: 28px; border-bottom: 1px solid #E2E5E9; padding-bottom: 4px; }
  h3 { font-size: 14px; margin-bottom: 2px; }
  .meta { color: #5E6670; font-size: 13px; margin-bottom: 20px; }
  ul { margin-top: 4px; padding-left: 20px; font-size: 13.5px; }
  li { margin-bottom: 3px; }
  .kicker { text-transform: uppercase; letter-spacing: 0.06em; font-size: 11px; color: #5E6670; }
  @media print { body { margin: 0; max-width: none; } }
</style>
</head>
<body>
  <p class="kicker">AION Green IT · Day 7 · Route 3</p>
  <h1>${esc(TASK3.export.docHeading)}</h1>
  <p class="meta">Author: <strong>${esc(memo.name)}</strong> &nbsp;·&nbsp; Date: <strong>${esc(memo.date)}</strong> &nbsp;·&nbsp; Subject: <strong>${esc(memo.caseReference)}</strong></p>

  <h2>Executive Summary</h2>
  <p>${esc(memo.executiveSummary || "—")}</p>

  <h2>Strategic Context</h2>
  <p>${esc(memo.strategicContext || "—")}</p>

  <h2>Guiding Decisions (Next 12 Months)</h2>
  ${memo.guidingDecisions.length ? list(memo.guidingDecisions) : "<p>—</p>"}

  <h2>Decision Logic &amp; Trade-offs</h2>
  <p>${esc(memo.logicPrinciples.join("; "))}${memo.logicPrinciples.length ? ". " : ""}${esc(memo.logicExplain)}</p>
  ${tradeoffsHtml ? `<ul>${tradeoffsHtml}</ul>` : "<p>—</p>"}

  <h2>Recommended First Measure</h2>
  <p><strong>${esc(memo.recommendedMeasure || "—")}</strong></p>
  <p>${esc(memo.recommendedJustify || "—")}</p>

  <h2>Governance &amp; Review Mechanism</h2>
  ${approvalsHtml ? `<ul>${approvalsHtml}</ul>` : "<p>—</p>"}

  <h2>Decision Under Uncertainty</h2>
  <p>${esc(memo.decisionNow || "—")}</p>

  <h2>Appendix — Phase 1 Diagnostic Findings</h2>
  ${perspectiveHtml || "<p>—</p>"}
  ${leverPlanHtml ? `<h3>Selected levers</h3><ul>${leverPlanHtml}</ul>` : ""}
  ${memo.appendix.firstMeasure ? `<p><strong>First measure:</strong> ${esc(memo.appendix.firstMeasure)} — ${esc(memo.appendix.firstMeasureJustify || "(justification pending)")}</p>` : ""}
</body>
</html>`;
}
