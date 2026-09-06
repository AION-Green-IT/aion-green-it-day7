/**
 * Route 3 — The Boardroom. All learner-facing copy and pure RACI/completion
 * logic live here so components stay presentational. Case used throughout:
 * NovaCore Infrastructure Group (fictional).
 */

import type { IconKey } from "@/lib/routes";

export const LEARNER_NAME_KEY = "learner:name";

// ---------------------------------------------------------------------------
// Store key map
// ---------------------------------------------------------------------------
export const R3 = {
  material: "r3:material",
  strategicRelevance: "r3:strategic",
  keyDecision: (n: 1 | 2 | 3) => `r3:keydecision:${n}`,
  prioritizationLogic: "r3:prioritization",
  conflictSelected: (id: string) => `r3:conflict:${id}:selected`,
  conflictJustify: (id: string) => `r3:conflict:${id}:justify`,
  firstPriorityPath: "r3:firstpriority",
  raci: (decisionId: string, roleId: string) => `r3:raci:${decisionId}:${roleId}`,
  incompleteData: "r3:incomplete",
  name: LEARNER_NAME_KEY,
} as const;

// ---------------------------------------------------------------------------
// Case brief — NovaCore Infrastructure Group
// ---------------------------------------------------------------------------
export const CASE_BRIEF = {
  company: "NovaCore Infrastructure Group",
  setup:
    "You are now acting as strategic infrastructure advisor to NovaCore Infrastructure Group, a company running its own data center with further growth planned. Leadership is under pressure to reduce rising energy costs without compromising availability, security, or scalability — but no consistent efficiency model or prioritized decision logic exists yet. You've been asked to bring a decision-ready proposal to the board.",
  facts: [
    "Infrastructure has grown organically across multiple system generations.",
    "Different stakeholders (IT operations, architecture, finance, leadership) have different priorities.",
    "Load and consumption data is incomplete for parts of the facility.",
    "High availability and resilience requirements are non-negotiable.",
    "Budget is limited; visible results are expected.",
    "Risk exists in committing to a single major step without a coherent overall logic.",
  ],
} as const;

// ---------------------------------------------------------------------------
// Materi — 6 sections
// ---------------------------------------------------------------------------
export type MaterialSectionId = "bridge" | "architecture" | "no-regret" | "raci" | "board-cares" | "conflicts";

export type MaterialSection = {
  id: MaterialSectionId;
  n: 1 | 2 | 3 | 4 | 5 | 6;
  icon: IconKey;
  kicker: string;
  title: string;
  definition: string;
  insight: string;
  takeaway: string;
  callout: { label: string; text: string };
};

export const MATERIAL: MaterialSection[] = [
  {
    id: "bridge",
    n: 1,
    icon: "link",
    kicker: "1 · From consultant to advisor",
    title: "From Consultant to Strategic Advisor",
    definition:
      "Route 1 found problems. Route 2 prioritized and justified tradeoffs. Route 3 is about building the actual decision structure a board can act on and hold people accountable to.",
    insight:
      "A board doesn't need another list of good ideas — it needs to know what must be decided, by whom, on what timeline, and how it gets reviewed. That's a different deliverable than either of the first two routes produced.",
    takeaway:
      "Everything you write in this route should sound like it's addressed to people who will vote on it, not to a fellow engineer who will implement it.",
    callout: {
      label: "Industry callout",
      text: "The board's question is never \"is this technically correct?\" — it's \"can we commit the organization to this, and who owns it if it goes wrong?\"",
    },
  },
  {
    id: "architecture",
    n: 2,
    icon: "layers",
    kicker: "2 · The core distinction",
    title: "Decision Architecture, Not a Technical Checklist",
    definition:
      "A list of good technical ideas is not a board proposal. A board proposal defines: what must be decided, by whom, on what timeline, under what conditions of uncertainty, and how it will be reviewed.",
    insight:
      "This is the difference between engineering thinking and governance thinking — both are necessary, but board-level work requires the second.",
    takeaway: "Compare the same situation answered both ways:",
    callout: {
      label: "Checklist vs. architecture",
      text: "Checklist: \"Consolidate servers, modernize cooling, add monitoring.\" Architecture: \"Approve monitoring investment now (Board, Q2) as a no-regret move; Infrastructure Lead brings a consolidation business case once baseline data exists (Q4); redundancy changes stay under review, not action, until then.\"",
    },
  },
  {
    id: "no-regret",
    n: 3,
    icon: "shield",
    kicker: "3 · Deciding under uncertainty",
    title: "No-Regret Decisions",
    definition:
      "A no-regret decision is one that remains sensible across multiple plausible future scenarios, so it's worth committing to now even without complete information — because waiting for certainty costs more than the risk of being locally wrong.",
    insight:
      "Establishing baseline monitoring at NovaCore is a no-regret decision: it's valuable whether the facility later turns out to need major consolidation, a cooling overhaul, or neither — the data pays for itself regardless of which future arrives.",
    takeaway: "Ask of every 12-month decision: does this still make sense if I'm wrong about the underlying assumption? If yes, it's a candidate for immediate commitment.",
    callout: {
      label: "Industry callout",
      text: "The concept originates in climate-adaptation and corporate-strategy literature — it's a standard tool for deciding under genuine uncertainty, not a data-center-specific idea.",
    },
  },
  {
    id: "raci",
    n: 4,
    icon: "target",
    kicker: "4 · Structuring responsibility",
    title: "The RACI Model",
    definition:
      "RACI assigns exactly one role per decision to each of four categories: Responsible (does the work), Accountable (owns the outcome — exactly one per decision), Consulted (input sought beforehand), Informed (told after the fact).",
    insight:
      "A generic example first, deliberately unrelated to data centers: for \"approve the annual marketing budget,\" the CFO might be Accountable, the Marketing Director Responsible, department heads Consulted, and the wider staff Informed. Same shape applies to any governed decision.",
    takeaway:
      "You'll build a real RACI grid for NovaCore's decision types in the task below — this is the concrete mechanism for answering \"who owns what,\" not a prose description of it.",
    callout: {
      label: "Industry callout",
      text: "RACI is rooted in project and IT service management disciplines (PRINCE2/ITIL), broadly adopted across German and wider European enterprises.",
    },
  },
  {
    id: "board-cares",
    n: 5,
    icon: "certificate",
    kicker: "5 · Beyond cost",
    title: "Why the Board Cares Beyond Cost",
    definition:
      "As of the EU's Omnibus I reform (finalized February 2026, in force March 2026), the Corporate Sustainability Reporting Directive's mandatory scope was narrowed by roughly 80%, now centering on larger companies (broadly: 1,000+ employees and either €50M+ turnover or €25M+ balance sheet), with Wave 2/3 timelines pushed back roughly two years.",
    insight:
      "Not every company must report under CSRD anymore after the narrowing — but for a company of NovaCore's profile (a growing infrastructure group), energy consumption and efficiency disclosure (part of the ESRS environmental disclosures) remains a live, plausible strategic driver for board attention, alongside cost and operational risk carried over from Route 2.",
    takeaway:
      "Treat ESG/reporting exposure as one legitimate input to strategic relevance, not the only one, and not a universal mandate — check whether it actually applies before leaning on it.",
    callout: {
      label: "Industry callout",
      text: "This detail updates with policy — treat it as current as of the most recent guidance (Omnibus I, 2026), not a permanent constant.",
    },
  },
  {
    id: "conflicts",
    n: 6,
    icon: "gavel",
    kicker: "6 · Synthesis",
    title: "Goal Conflicts at Board Level",
    definition:
      "Efficiency vs. availability, vs. security, vs. investment, vs. growth capacity — these tensions run through all three routes. The board's real job is deciding which conflicts to accept and which to resolve now, not eliminating all of them.",
    insight:
      "A proposal that pretends every conflict can be optimized away at once is less credible than one that names which trade-offs it is deliberately accepting.",
    takeaway:
      "Your board proposal should name its goal conflicts explicitly, not bury them — a board that discovers an unstated trade-off later trusts the next proposal less.",
    callout: {
      label: "Industry callout",
      text: "\"We can have it all\" is the least credible sentence in a board proposal — naming the trade-off you're accepting is what makes the rest of the proposal believable.",
    },
  },
];

// ---------------------------------------------------------------------------
// Task 3 — Goal conflicts (curated multi-select + justify)
// ---------------------------------------------------------------------------
export type ConflictOption = { id: string; label: string };

export const CONFLICT_OPTIONS: ConflictOption[] = [
  { id: "efficiency-availability", label: "Efficiency vs. Availability" },
  { id: "investment-speed", label: "Investment Size vs. Speed of Impact" },
  { id: "growth-risk", label: "Growth Capacity vs. Risk Tolerance" },
  { id: "standardization-flexibility", label: "Standardization vs. Local Flexibility" },
  { id: "redundancy-cost", label: "Redundancy vs. Cost Efficiency" },
];

export const MIN_CONFLICTS = 2;

// ---------------------------------------------------------------------------
// Task 3 — RACI grid (4 decision types x 4 roles, dropdown cells)
// ---------------------------------------------------------------------------
export type RaciValue = "R" | "A" | "C" | "I" | "";

export const RACI_DECISIONS = [
  { id: "major-investment", label: "Major Infrastructure Investment" },
  { id: "efficiency-rollout", label: "Efficiency/Monitoring Rollout" },
  { id: "redundancy-risk", label: "Redundancy/Risk Changes" },
  { id: "ongoing-review", label: "Ongoing Performance Review" },
] as const;

export const RACI_ROLES = [
  { id: "board", label: "Board" },
  { id: "cto", label: "CTO/Strategic Advisor" },
  { id: "infra-lead", label: "Infrastructure Lead" },
  { id: "ops-team", label: "Operations Team" },
] as const;

// ---------------------------------------------------------------------------
// Task copy
// ---------------------------------------------------------------------------
export const TASK3 = {
  kicker: "Task 3",
  heading: "The Board Proposal",
  subtext: "Build a decision-ready proposal for NovaCore's board — the live document on the right is what actually gets exported.",
  s1: { heading: "1. Strategic Relevance", label: "Why does this matter to the board right now?", caption: "Consider referencing cost trend, operational risk exposure, and (if relevant) ESG/sustainability reporting expectations." },
  s2: { heading: "2. Three Key Decisions for the Next 12 Months", caption: "Each a short, concrete decision statement — e.g. \"Approve baseline monitoring investment by Q2.\"" },
  s3: { heading: "3. Prioritization Logic for Future Technical Steps", label: "How should future infrastructure decisions be evaluated and ordered going forward?", caption: "Reference back to the TCO / risk-efficiency tradeoff framing from Route 2 where relevant." },
  s4: { heading: "4. Main Goal Conflicts", caption: `Select at least ${MIN_CONFLICTS} and justify why each matters for NovaCore specifically.` },
  s5: { heading: "5. Recommended First-Priority Path", label: "Which path should be pursued first, and why?", caption: "Reason this explicitly as a no-regret decision where possible." },
  s6: { heading: "6. Responsibility, Approval & Review Structure — RACI Grid", caption: "Every decision type needs exactly one Accountable owner." },
  s7: { heading: "7. Decisions to Make Now Despite Incomplete Data", label: "Name at least two decisions you can responsibly commit to now, and explain why waiting for more data would not meaningfully change them.", caption: "Connect this explicitly to the no-regret decision concept." },
  selfCheck: [
    "Does this read as a decision architecture, or a list of technical fixes?",
    "Is at least one recommendation explicitly framed as no-regret?",
    "Does every decision type in the RACI grid have a clear Accountable owner?",
  ],
  export: {
    taskLabel: "Board Proposal",
    docHeading: "Board Proposal — NovaCore Infrastructure Group",
    filenameSuffix: "board-proposal",
  },
} as const;
