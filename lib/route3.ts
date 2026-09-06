/**
 * Route 3 — Management & Governance. All learner-facing copy and reference
 * data for the ISO 20400 / RACI / governance-horizon mechanics live here.
 * Task 3 spans two cases in one continuous arc: Proxima Digital Systems
 * (diagnostic) and Helion Systems Group (executive proposal).
 */

import type { IconKey } from "@/lib/routes";

// ---------------------------------------------------------------------------
// Store key map
// ---------------------------------------------------------------------------
export const R3 = {
  material: "r3:material",
  ladderExample: (id: string) => `r3:ladder:${id}`,
  criteriaMode: "r3:criteria:mode",
  raciDemoResolved: (decisionId: string) => `r3:raci:demo:${decisionId}`,
  horizon: (id: string) => `r3:horizon:${id}`,
  tensionNodesSeen: "r3:tension:nodes",
  tensionEdgesSeen: "r3:tension:edges",
  leverageRank: (id: string) => `r3:leverage:${id}`,
  leverageJustify: "r3:leverage:justify",
  strategicLadderPosition: "r3:strategic:ladder",
  strategicRelevance: "r3:strategic:relevance",
  coreDecision: (n: 1 | 2 | 3) => `r3:core:${n}`,
  coreDecisionRaci: (n: 1 | 2 | 3) => `r3:core:raci:${n}`,
  conflictPos: (id: string) => `r3:conflict:${id}`,
  firstStep: "r3:firststep",
  firstStepJustify: "r3:firststep:justify",
  raciBuild: (decisionId: string, roleId: string) => `r3:raci:build:${decisionId}:${roleId}`,
  incompleteInfo: "r3:incomplete",
  boardChoice: "r3:board:choice",
  execSummary: "r3:execsummary",
} as const;

// ---------------------------------------------------------------------------
// Material — 4 blocks
// ---------------------------------------------------------------------------
export type MaterialBlockId = "iso20400" | "bindingCriteria" | "raci" | "horizon";

export type MaterialBlock = {
  id: MaterialBlockId;
  n: 1 | 2 | 3 | 4;
  icon: IconKey;
  kicker: string;
  title: string;
  definition: string;
  insight: string;
  takeaway: string;
  callout: { label: string; text: string };
};

export const MATERIAL: MaterialBlock[] = [
  {
    id: "iso20400",
    n: 1,
    icon: "gavel",
    kicker: "Block 1 · Governance framework",
    title: "ISO 20400 — Sustainable Procurement Governance",
    definition:
      "ISO 20400:2017 \"Sustainable Procurement — Guidance,\" published April 2017, is the first international standard focused entirely on sustainable procurement, built on ISO 26000's social-responsibility principles. It is a guidance standard, not a certification standard — an organization cannot be \"ISO 20400 certified,\" though a third party can audit conformance against it. Its structure: Clause 4 (principles and reasons for sustainable procurement — risk management, due diligence, prioritization, positive influence), Clause 5 (integrating sustainability at the STRATEGIC level, aimed at top management setting procurement policy and strategy), and Clause 6 (organizational conditions and management techniques for sustained implementation).",
    insight:
      "The standard explicitly places sustainable procurement as a top-management responsibility, not just a purchasing/buyer function. That is what separates procurement that is green on the surface from procurement that is genuinely embedded in governance.",
    takeaway:
      "Use the three clauses as a checklist when auditing whether an organization's sustainable procurement is still an ad-hoc initiative or has become structural.",
    callout: {
      label: "Industry callout",
      text: "\"ISO 20400 certified\" is a claim you should immediately question — the standard has no certification scheme. What can be verified is conformance, via an independent audit.",
    },
  },
  {
    id: "bindingCriteria",
    n: 2,
    icon: "target",
    kicker: "Block 2 · Tender mechanics",
    title: "From Criteria to Binding Document — Tenders & Specifications",
    definition:
      "There is a crucial difference between a criterion only mentioned in an internal policy or presentation, and one actually written binding into a Lastenheft (requirements specification) or RFP/tender document. In European tenders, \"award criteria\" carry an explicit scored weight and directly affect who wins — as opposed to criteria with only \"preferred/nice-to-have\" status and no weight at all.",
    insight:
      "A sustainability criterion with no scored weight in the award criteria will, in practice, never beat price. A rational vendor optimizes for what is scored, not what is merely mentioned.",
    takeaway:
      "Audit existing tender documents with one question: does this lifecycle/repairability criterion carry a written, scored weight, or is it only mentioned in the narrative introduction?",
    callout: {
      label: "Industry callout",
      text: "A sustainability section in the tender's introduction, with zero scoring weight attached, changes nothing about who wins. Weight is the only thing vendors optimize for.",
    },
  },
  {
    id: "raci",
    n: 3,
    icon: "shield",
    kicker: "Block 3 · Role governance",
    title: "RACI in Sustainable Procurement Decisions",
    definition:
      "The RACI framework (Responsible, Accountable, Consulted, Informed) applied to lifecycle-aware procurement decisions: Responsible does the work, Accountable owns the final call (exactly one per decision), Consulted must be asked before the decision, Informed is told afterward.",
    insight:
      "The recurring Purchasing-vs-IT-vs-Sustainability conflict is usually not a substantive disagreement — it's the absence of clarity about who is Accountable versus merely Responsible, Consulted, or Informed.",
    takeaway:
      "Before drafting new procurement criteria, settle the RACI first: who is Accountable for the final call (typically CIO or Head of Procurement), who is Responsible for running the assessment (buyer/category manager), who must be Consulted (sustainability team, legal), and who only needs to be Informed (end-user departments).",
    callout: {
      label: "Industry callout",
      text: "Two \"Accountable\" owners for the same decision is not a compromise — it's a structural deadlock waiting to happen.",
    },
  },
  {
    id: "horizon",
    n: 4,
    icon: "layers",
    kicker: "Block 4 · Decision horizon",
    title: "Short-term vs. Structural Decisions",
    definition:
      "Decisions classify into three horizons: Short-term (executable within the next tender cycle, low governance effort), Medium-term (needs a document/process adjustment, roughly a year), and Structural (needs a governance or investment-policy change, multi-year, requires senior-management sponsorship).",
    insight:
      "A common mistake is trying to fix a structural problem with a short-term move (\"just ask the vendor for a discount\" when the real issue is unweighted tender criteria), or the reverse — stalling an executable short-term decision while waiting for a \"perfect\" structural fix.",
    takeaway:
      "Split every recommendation to management into these three explicit horizons. That is the format expected in a professional management proposal, not a flat to-do list with no sense of timing.",
    callout: {
      label: "Industry callout",
      text: "\"Does this need new governance approval, or can it be executed within current authority?\" is the single fastest way to sort short-term from structural.",
    },
  },
];

// ---------------------------------------------------------------------------
// Block 1 visualizer — Governance Maturity Ladder
// ---------------------------------------------------------------------------
export const GOVERNANCE_LADDER = [
  {
    id: "ad-hoc",
    n: 1,
    label: "Ad-hoc",
    blurb: "Case-by-case decisions, undocumented.",
    example: "A buyer personally decides to favor a \"greener-sounding\" laptop, with no written criterion and no record of why.",
  },
  {
    id: "defined",
    n: 2,
    label: "Defined",
    blurb: "Written criteria exist, not yet binding.",
    example: "A sustainability checklist exists in a policy document, but tenders still score only on price — the checklist is never actually applied.",
  },
  {
    id: "managed",
    n: 3,
    label: "Managed",
    blurb: "Criteria are binding in tenders, with monitoring.",
    example: "Repairability carries a scored weight in the RFP, and procurement tracks supplier compliance against it after award.",
  },
  {
    id: "strategic",
    n: 4,
    label: "Strategic",
    blurb: "Integrated into governance and investment decisions, reviewed regularly.",
    example: "The board reviews lifecycle procurement performance annually and it directly shapes capital allocation for the next hardware refresh cycle.",
  },
] as const;

// ---------------------------------------------------------------------------
// Block 2 visualizer — Binding vs Optional Criteria Simulator
// ---------------------------------------------------------------------------
export type SimVendor = { id: string; label: string; price: number; repairability: number };
export const SIM_VENDORS: SimVendor[] = [
  { id: "v1", label: "Vendor 1", price: 5, repairability: 1 },
  { id: "v2", label: "Vendor 2", price: 4.7, repairability: 5 },
  { id: "v3", label: "Vendor 3", price: 4.5, repairability: 3 },
  { id: "v4", label: "Vendor 4", price: 4.2, repairability: 2 },
  { id: "v5", label: "Vendor 5", price: 3, repairability: 4 },
];
export function simRanking(scored: boolean): SimVendor[] {
  const score = (v: SimVendor) => (scored ? v.price * 0.8 + v.repairability * 0.2 : v.price);
  return [...SIM_VENDORS].sort((a, b) => score(b) - score(a));
}

// ---------------------------------------------------------------------------
// Block 3 visualizer — RACI Conflict Resolver
// ---------------------------------------------------------------------------
export type RaciValue = "R" | "A" | "C" | "I" | null;
export const RACI_ROLES = [
  { id: "purchasing", label: "Purchasing" },
  { id: "it", label: "IT" },
  { id: "sustainability", label: "Sustainability Team" },
  { id: "management", label: "Management" },
] as const;
export const RACI_DECISIONS = [
  { id: "vendor-criteria", label: "Vendor selection criteria" },
  { id: "tender-award", label: "Tender award decision" },
  { id: "lifecycle-review", label: "Post-contract lifecycle review" },
] as const;
export const RACI_CONFLICT_SEED: Record<string, Record<string, RaciValue>> = {
  "vendor-criteria": { purchasing: "A", it: "A", sustainability: "C", management: "I" },
  "tender-award": { purchasing: "R", it: "C", sustainability: "A", management: "A" },
  "lifecycle-review": { purchasing: "I", it: "R", sustainability: "R", management: "A" },
};

// ---------------------------------------------------------------------------
// Block 4 visualizer — Horizon Sorter Preview
// ---------------------------------------------------------------------------
export type HorizonBucket = "short" | "medium" | "structural";
export const HORIZON_CARDS = [
  { id: "h1", text: "Ask the current vendor for a repairability discount.", suggested: "short" as HorizonBucket },
  { id: "h2", text: "Request a spare-parts price list from the incumbent supplier.", suggested: "short" as HorizonBucket },
  { id: "h3", text: "Add a scored repairability criterion to the next tender.", suggested: "medium" as HorizonBucket },
  { id: "h4", text: "Require suppliers to report a standardized sustainability data sheet.", suggested: "medium" as HorizonBucket },
  { id: "h5", text: "Establish a joint Purchasing-IT-Sustainability governance board.", suggested: "structural" as HorizonBucket },
  { id: "h6", text: "Mandate lifecycle cost scoring as standing tender policy.", suggested: "structural" as HorizonBucket },
];

// ---------------------------------------------------------------------------
// Phase 1 — Proxima Digital Systems (diagnostic)
// ---------------------------------------------------------------------------
export const CASE_PROXIMA = {
  company: "Proxima Digital Systems GmbH",
  employees: 1500,
  setup:
    "Proxima Digital Systems GmbH, 1,500 employees, will award a new tender for workplace devices, peripherals, and mobile devices over the next 12 months. Decisions have so far been dominated by price, supply speed, and standardization. Criteria such as repairability, upgradability, and take-back are barely considered. Suppliers vary widely in transparency and lifecycle service. Purchasing and IT have different priorities. Sustainability is desired but not yet binding in the award criteria. Management wants a solution that is practical, economically viable, and controllable.",
} as const;

export type TensionNodeId = "purchasing" | "it" | "sustainability" | "suppliers" | "management";
export const TENSION_NODES: { id: TensionNodeId; label: string; detail: string }[] = [
  {
    id: "purchasing",
    label: "Purchasing",
    detail: "Goal: fast, cheap, standardized awards. Constraint: measured on unit cost and cycle time, not lifecycle outcomes.",
  },
  {
    id: "it",
    label: "IT",
    detail: "Goal: uniform hardware, simple imaging and support. Constraint: every extra criterion adds deployment complexity IT has to absorb.",
  },
  {
    id: "sustainability",
    label: "Sustainability Team",
    detail: "Goal: binding repairability/take-back criteria. Constraint: no mandate — recommendations are advisory, not enforceable.",
  },
  {
    id: "suppliers",
    label: "Suppliers",
    detail: "Goal: win the tender on their own terms. Constraint: wildly inconsistent transparency and lifecycle-service quality across bidders.",
  },
  {
    id: "management",
    label: "Management",
    detail: "Goal: a practical, economical, controllable outcome. Constraint: unwilling to sponsor a solution that looks operationally risky.",
  },
];
export type TensionEdge = { id: string; a: TensionNodeId; b: TensionNodeId; level: "low" | "high"; reason: string };
export const TENSION_EDGES: TensionEdge[] = [
  { id: "e1", a: "purchasing", b: "it", level: "low", reason: "Both want standardization and predictable deployment — largely aligned." },
  { id: "e2", a: "purchasing", b: "management", level: "low", reason: "Both prioritize a practical, economical, controllable outcome." },
  { id: "e3", a: "it", b: "management", level: "low", reason: "IT's preference for low operational complexity matches what management is asking for." },
  { id: "e4", a: "purchasing", b: "sustainability", level: "high", reason: "Purchasing has historically optimized for price; sustainability's criteria were never binding, so they routinely lose out." },
  { id: "e5", a: "sustainability", b: "management", level: "high", reason: "Sustainability is \"desired,\" but management has never made it mandatory in tender criteria — no binding mandate, so nothing changes." },
  { id: "e6", a: "it", b: "sustainability", level: "high", reason: "Sustainability checks (repairability, take-back documentation) add process steps IT would rather avoid for simplicity's sake." },
  { id: "e7", a: "purchasing", b: "suppliers", level: "high", reason: "Supplier transparency and lifecycle service vary widely, making consistent evaluation genuinely difficult." },
  { id: "e8", a: "suppliers", b: "sustainability", level: "high", reason: "Suppliers rarely proactively disclose lifecycle/repairability data unless specifically required, undermining any sustainability criterion." },
];

export const LEVERAGE_CANDIDATES = [
  { id: "l1", label: "Make repairability & take-back binding award criteria" },
  { id: "l2", label: "Standardize supplier transparency reporting requirement" },
  { id: "l3", label: "Introduce lifecycle cost scoring alongside price" },
  { id: "l4", label: "Create joint Purchasing-IT-Sustainability review board" },
  { id: "l5", label: "Pilot circular procurement on one device category first" },
  { id: "l6", label: "Renegotiate existing supplier contracts individually" },
];

// ---------------------------------------------------------------------------
// Phase 2 — Helion Systems Group (executive proposal)
// ---------------------------------------------------------------------------
export const CASE_HELION = {
  company: "Helion Systems Group",
  setup:
    "You act as the IT strategy lead / procurement consultant and fictional CIO of Helion Systems Group. The company faces several large-scale IT procurement decisions and wants to bindingly integrate sustainability without losing standardization, operational capability, or cost discipline. There is no robust lifecycle-based decision model yet. Conditions: large procurement needs across several categories, differing departmental interests, a historically price-centric procurement culture, sustainability that must have real impact rather than just communication value, partially incomplete lifecycle data, and time pressure from an ongoing tender.",
} as const;

export const FIRST_STEP_OPTIONS = [
  { id: "pilot", label: "Pilot circular procurement on one device category, then scale" },
  { id: "mandate", label: "Mandate lifecycle scoring in the next tender cycle immediately" },
  { id: "board", label: "Form the joint governance board before changing any criteria" },
  { id: "renegotiate", label: "Renegotiate current contracts for better terms first" },
];

export const CONFLICT_STATEMENTS = [
  { id: "c1", text: "IT wants standardized hardware across all sites, limiting flexible sustainable sourcing." },
  { id: "c2", text: "Finance wants the lowest quarterly spend, discouraging longer-life premium devices." },
  { id: "c3", text: "The sustainability team wants binding take-back and repairability criteria in every tender." },
  { id: "c4", text: "Some categories have no verified lifecycle data, so any scoring criterion there can't really be evaluated." },
  { id: "c5", text: "The ongoing tender's deadline pressures teams to keep using the existing price-only template." },
];

export const BOARD_CHALLENGE = {
  prompt:
    "\"This sounds like a purchasing policy change, not a strategic investment. Why should the board spend time on this?\"",
  choices: [
    {
      id: "risk",
      label: "Reframe as risk management & governance issue",
      consequence: "The board engages, but now expects a formal risk register and quarterly governance reporting on this topic.",
    },
    {
      id: "cost",
      label: "Present a quantified cost-of-inaction scenario",
      consequence: "The board wants the underlying numbers audited by Finance before it will commit — a useful delay, not a rejection.",
    },
    {
      id: "pilot",
      label: "Propose a limited-scope pilot to de-risk board commitment",
      consequence: "Approved quickly, but the board explicitly frames this as \"not yet a strategic decision\" — full commitment is deferred.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Task copy
// ---------------------------------------------------------------------------
export const TASK3 = {
  kicker: "Task 3",
  heading: "Governance Diagnostic & Executive Proposal",
  subtext:
    "Two phases, four steps. You start as the consultant diagnosing Proxima's governance tensions, then become the CIO proposing Helion's decision to its board.",
  phase1: {
    label: "Phase 1 — Proxima Diagnostic",
    step1: {
      heading: "Step 1 — Governance Tension Map",
      instructions: "Click a node for its goals and constraints. Click a connecting line for why that tension exists.",
    },
    step2: {
      heading: "Step 2 — Leverage Point Ranking",
      instructions:
        "Drag four of the six candidates into Priority 1–4. The remaining two land in \"Not prioritized\" automatically — a real trade-off, not a checklist.",
      justifyLabel: "Why did you rank your #1 leverage point above the others?",
    },
  },
  transition:
    "Your diagnostic thinking at Proxima is exactly what's needed now at Helion Systems Group — but this time, you're not just analyzing. You're the one presenting to the board.",
  phase2: {
    label: "Phase 2 — Helion Executive Proposal",
    step3: {
      heading: "Step 3 — Executive Decision Builder",
      relevanceQuestion: "Why is lifecycle-oriented IT procurement strategically relevant here?",
      relevanceInstructions: "Click Helion's current position on the ladder, then write 2–3 sentences on why that position matters strategically.",
      coreDecisionsQuestion: "What are the three core decisions management must make in the next 12 months?",
      conflictQuestion: "Where is the main conflict of objectives?",
      conflictInstructions: "Drag each statement onto the matrix — how much cost discipline vs. sustainability ambition it reflects.",
      firstStepQuestion: "Which prioritized first step do you recommend, and why?",
      firstStepJustifyLabel: "Justify your choice, referencing your Phase 1 leverage-point ranking.",
      governanceQuestion: "How should roles, approval logic, and review mechanisms be structured?",
      incompleteQuestion: "What must be decided now despite incomplete information?",
    },
    step4: {
      heading: "Step 4 — Board Challenge & Final Memo",
      summaryLabel: "Write a 3-sentence executive summary of your proposal, as it would appear at the top of a board memo.",
    },
  },
  export: {
    taskLabel: "Governance Diagnostic & Executive Proposal",
    docHeading: "Executive Proposal — Sustainable IT Procurement",
  },
} as const;
