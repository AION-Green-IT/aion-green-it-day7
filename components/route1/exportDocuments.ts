import { EVIDENCE_ITEMS, PUE_CLAIMS, SPLIT_ITEMS, GAP_REQUIRED_COUNT, TASK1 } from "@/lib/route1";
import type { useRoute1 } from "./useRoute1";
import type { AuditReportData } from "./useAuditReportData";

type Route1State = ReturnType<typeof useRoute1>;

/** Raw structured answers + correctness flags, for grading/QA — not shown to the learner during the exercise. */
export function buildReportJson(r1: Route1State, report: AuditReportData, filename: string): string {
  const payload = {
    meta: {
      day: 7,
      route: 1,
      level: TASK1.export.filenameLevel,
      task: TASK1.export.filenameTask,
      filename,
      name: r1.name,
      exportedAt: new Date().toISOString(),
    },
    stageA: EVIDENCE_ITEMS.map((it) => {
      const category = r1.stageACategory[it.id] ?? null;
      return { id: it.id, text: it.text, category, correctCategory: it.correctCategory, matched: category === it.correctCategory };
    }),
    stageB: PUE_CLAIMS.map((c) => {
      const verdict = r1.stageBVerdict[c.id] ?? null;
      return { id: c.id, claim: c.claim, verdict, correctVerdict: c.correctVerdict, matched: verdict === c.correctVerdict };
    }),
    stageC: {
      requiredCount: GAP_REQUIRED_COUNT,
      selected: report.gaps,
    },
    stageD: SPLIT_ITEMS.map((it) => {
      const side = r1.stageDPlacement[it.id] ?? null;
      return { id: it.id, text: it.text, side, correctSide: it.correctSide, matched: side === it.correctSide };
    }),
    report,
  };
  return JSON.stringify(payload, null, 2);
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Standalone, print-ready HTML document — no external stylesheet, so it opens correctly on its own. */
export function buildReportHtml(report: AuditReportData): string {
  const list = (items: string[]) => `<ul>${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;

  const evidence = report.evidenceByCategory
    .map((g) => `<h3>${esc(g.category)} (${g.items.length})</h3>${list(g.items)}`)
    .join("");

  const pue = report.pueFindings
    .map((f) => `<li>${esc(f.claim)} — <strong>${esc(f.verdict)}</strong></li>`)
    .join("");

  const gaps = report.gaps
    .map((g) => `<li><strong>${esc(g.label)}.</strong> ${esc(g.justification || "(justification pending)")}</li>`)
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(TASK1.export.docHeading)} — ${esc(report.name)}</title>
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
  <p class="kicker">AION Green IT · Day 7 · Route 1</p>
  <h1>${esc(TASK1.export.docHeading)}</h1>
  <p class="meta">Analyst: <strong>${esc(report.name)}</strong> &nbsp;·&nbsp; Date: <strong>${esc(report.date)}</strong> &nbsp;·&nbsp; Subject: <strong>${esc(report.caseReference)}</strong></p>

  <h2>Evidence Classification Summary</h2>
  ${evidence || "<p>—</p>"}

  <h2>PUE Validity Findings</h2>
  <ul>${pue || "<li>—</li>"}</ul>

  <h2>Identified Gaps</h2>
  <ul>${gaps || "<li>—</li>"}</ul>

  <h2>Technical vs. Governance Split Summary</h2>
  <h3>Technical (${report.splitSummary.technical.length})</h3>
  ${list(report.splitSummary.technical) || "<p>—</p>"}
  <h3>Governance (${report.splitSummary.governance.length})</h3>
  ${list(report.splitSummary.governance) || "<p>—</p>"}
</body>
</html>`;
}
