/**
 * Route 2 — Decision Trade-offs. All learner-facing copy and pure math for
 * the Kraljic classification, hidden-cost, dependency-risk, and weighted
 * scoring mechanics live here. Case used throughout Task 2: Ferrotech
 * Dynamics (fictional).
 */

import type { IconKey } from "@/lib/routes";

// ---------------------------------------------------------------------------
// Store key map
// ---------------------------------------------------------------------------
export const R2 = {
  material: "r2:material",
  kraljicQ: (id: string) => `r2:kraljic:${id}`,
  weight: (id: string) => `r2:weight:${id}`,
  score: (model: string, criterionId: string) => `r2:score:${model}:${criterionId}`,
  scoringLocked: "r2:scoring:locked",
  calcUnits: "r2:calc:units",
  calcMaturity: "r2:calc:maturity",
  calcLayer: (model: string, layerId: string) => `r2:calc:layer:${model}:${layerId}`,
  dependencyReflection: "r2:dependency:reflection",
  costUsed: "r2:cost:used",
  rank: (model: string) => `r2:rank:${model}`,
  justifyScore: "r2:justify:score",
  justifyRisk: "r2:justify:risk",
  stakeholder: (id: string) => `r2:stakeholder:${id}`,
  risk: (n: 1 | 2) => `r2:risk${n}`,
} as const;

// ---------------------------------------------------------------------------
// Material — 4 blocks
// ---------------------------------------------------------------------------
export type MaterialBlockId = "kraljic" | "hiddenCost" | "lockIn" | "weighting";

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
    id: "kraljic",
    n: 1,
    icon: "target",
    kicker: "Block 1 · Portfolio classification",
    title: "The Kraljic Portfolio Purchasing Matrix",
    definition:
      "Peter Kraljic's matrix (Harvard Business Review, 1983) classifies every purchasing category on two axes: Supply Risk (how hard is this to source — few vendors, long lead times, technical complexity) and Profit/Business Impact (how much this category affects the outcome that matters — cost, revenue, or operational continuity). The four quadrants: Non-critical (low risk, low impact — buy routinely, minimize effort), Leverage (low risk, high impact — many vendors, exploit your bargaining power), Bottleneck (high risk, low impact — few vendors, protect availability), and Strategic (high risk, high impact — build a genuine partnership, not just a transaction).",
    insight:
      "The matrix is still the standard procurement risk-classification tool in European procurement strategy today. The common mistake is treating every category with the same strategy — always chase the lowest bid — when the correct strategy differs sharply by quadrant.",
    takeaway:
      "A corporate notebook fleet with spare-parts dependency and a sustainability requirement tends to drift from \"Leverage\" toward \"Strategic\" once lifecycle criteria are included, because supply risk (spare-parts availability, long-term support) rises even though the category still looks like a routine, high-volume buy.",
    callout: {
      label: "Industry callout",
      text: "A category doesn't have one fixed Kraljic position — the criteria you score it against can move it. Lifecycle criteria almost always push supply risk up.",
    },
  },
  {
    id: "hiddenCost",
    n: 2,
    icon: "coins",
    kicker: "Block 2 · Acquisition model",
    title: "Hidden Cost of Ownership — CapEx vs. Device-as-a-Service",
    definition:
      "Frame this as an operational cost layer, not just a purchase number. Downstream processes — evaluation, provisioning and staging, inventory management, logistics, IT support, returns management, certified data-wiping, and remarketing — absorb real resource that rarely enters the initial purchase calculation. CapEx (buy outright) is recorded as a fixed asset, depreciated over time, but it hides the IT labour spent on maintenance, troubleshooting, and manual disposal. DaaS/HaaS (leasing/subscription) shifts cost from CapEx to OpEx: the per-device monthly fee already bundles procurement, staging, support, swap replacement, and end-of-life processing into one contract.",
    insight:
      "For an organization without dedicated hardware-management staff, a subscription model is often cheaper in real terms even though the monthly figure looks like an added cost next to a one-time purchase price.",
    takeaway:
      "Never compare \"purchase price vs. monthly lease fee\" directly. Compare total cost including the hidden operational layer — that's the only comparison that means anything.",
    callout: {
      label: "Industry callout",
      text: "IT team maturity changes the answer: an organization with strong internal imaging/support capability absorbs CapEx's hidden costs far more cheaply than one without it.",
    },
  },
  {
    id: "lockIn",
    n: 3,
    icon: "link",
    kicker: "Block 3 · Supplier risk",
    title: "Vendor Lock-in & Supplier Dependency Risk",
    definition:
      "Single-sourcing risk vs. multi-sourcing strategy is a core modern-procurement concept. Risk factors to assess: dependency on one vendor for spare parts, proprietary architecture that complicates migration, the exit clause in a leasing/subscription contract, and price-escalation risk at renewal.",
    insight:
      "A vendor offering a complete lifecycle service (refurbishment, take-back, and so on) can actually increase dependency on that same vendor — a real trade-off between convenience/sustainability and strategic flexibility.",
    takeaway:
      "Every lifecycle-aware procurement decision needs an exit-strategy assessment alongside it — not an evaluation of lifecycle benefits alone.",
    callout: {
      label: "Industry callout",
      text: "Ask for the exit clause before you ask about the sustainability programme. A contract with no defined exit path is the real risk, however good the lifecycle pitch sounds.",
    },
  },
  {
    id: "weighting",
    n: 4,
    icon: "shield",
    kicker: "Block 4 · Decision method",
    title: "Weighted Multi-Criteria Decision Matrix",
    definition:
      "The Weighted Decision Matrix (also known as a Pugh Matrix or scoring model) is how procurement professionals compare complex options in a structured way instead of by intuition. Method: define evaluation criteria, assign a weight to each matching organizational priority, score every option per criterion (typically 1–5), multiply score by weight, and sum. Common criteria for sustainable IT procurement: acquisition cost, lifecycle cost, environmental impact, operational flexibility, control capability, supplier dependency, and strategic robustness.",
    insight:
      "Criteria weights are not universal objective numbers. An organization under tight budget constraint weights cost higher; one under a strong sustainability mandate weights environmental impact higher. The method isn't meant to produce one \"correct\" answer — it's meant to make trade-offs explicit and defensible.",
    takeaway:
      "Document the weights and scores in the tender/RFP evaluation record. That record is what makes a procurement decision defensible when it's audited or questioned later.",
    callout: {
      label: "Industry callout",
      text: "A weighted matrix without a documented weighting rationale is exactly as defensible as no matrix at all — the paper trail is the point.",
    },
  },
];

// ---------------------------------------------------------------------------
// Block 1 visualizer — Kraljic Quadrant Shift
// ---------------------------------------------------------------------------
export const KRALJIC_CLASSIC = { risk: 22, impact: 68 };
export const KRALJIC_LIFECYCLE = { risk: 74, impact: 68 };

// ---------------------------------------------------------------------------
// Block 2 visualizer — Hidden Cost Iceberg v2
// ---------------------------------------------------------------------------
export type MaturityLevel = "low" | "medium" | "high";
export const MATURITY_IT_LABOR_EUR: Record<MaturityLevel, number> = {
  low: 260,
  medium: 150,
  high: 70,
};
export const CAPEX_LAYERS = [
  { id: "purchase", label: "Purchase price", amountEur: 780 },
  { id: "itLabor", label: "IT labor (procurement & imaging)", amountEur: MATURITY_IT_LABOR_EUR.medium },
  { id: "maintenance", label: "Maintenance & troubleshooting", amountEur: 150 },
  { id: "downtime", label: "Downtime cost (device failure)", amountEur: 180 },
  { id: "disposal", label: "Disposal & data-wiping", amountEur: 90 },
] as const;
// Deliberately close to CapEx's fully-loaded total at medium maturity: at high
// IT maturity CapEx can beat this; at low maturity it clearly cannot. Neither
// model is hardcoded to always win.
export const DAAS_TOTAL_EUR = 1300;
export const DAAS_INCLUDES =
  "All-inclusive: procurement, staging, support, swap replacement, and end-of-life processing.";

// ---------------------------------------------------------------------------
// Block 3 visualizer — Dependency Risk Meter
// ---------------------------------------------------------------------------
export type RiskLevel = "low" | "medium" | "high";
export type DependencyScenario = {
  id: string;
  label: string;
  risk: RiskLevel;
  gain: string;
  loss: string;
};
export const DEPENDENCY_SCENARIOS: DependencyScenario[] = [
  {
    id: "multi",
    label: "Multi-vendor, standardized hardware",
    risk: "low",
    gain: "Easy to re-tender, strong price competition, no single point of failure.",
    loss: "No vendor is incentivized to offer deep lifecycle service — you coordinate it yourself.",
  },
  {
    id: "single-lifecycle",
    label: "Single-vendor with strong lifecycle service",
    risk: "medium",
    gain: "Refurbishment, take-back, and support are bundled and genuinely convenient.",
    loss: "Switching cost rises every year you stay — renewal leverage shifts to the vendor.",
  },
  {
    id: "single-proprietary",
    label: "Single-vendor leasing with proprietary lock-in",
    risk: "high",
    gain: "Simplest possible operations — one contract, one throat to choke.",
    loss: "Minimal negotiating leverage at renewal; migration cost could be prohibitive.",
  },
];
export const RISK_ANGLE: Record<RiskLevel, number> = { low: -60, medium: 0, high: 60 };

// ---------------------------------------------------------------------------
// Block 4 / Step 2 — Weighted decision matrix
// ---------------------------------------------------------------------------
export type CriterionId =
  | "acquisitionCost"
  | "lifecycleCost"
  | "environmentalImpact"
  | "operationalFlexibility"
  | "controlCapability"
  | "supplierDependency"
  | "strategicRobustness";

export const CRITERIA: { id: CriterionId; label: string }[] = [
  { id: "acquisitionCost", label: "Acquisition cost" },
  { id: "lifecycleCost", label: "Lifecycle cost" },
  { id: "environmentalImpact", label: "Environmental impact" },
  { id: "operationalFlexibility", label: "Operational flexibility" },
  { id: "controlCapability", label: "Control capability" },
  { id: "supplierDependency", label: "Supplier dependency (lower risk scores higher)" },
  { id: "strategicRobustness", label: "Strategic robustness" },
];

/** Demo-only preset shapes for the Block 4 "Live Weighting Preview" (not the real Step 2 case). */
export const DEMO_OPTION_X: Record<CriterionId, number> = {
  acquisitionCost: 5,
  lifecycleCost: 2,
  environmentalImpact: 2,
  operationalFlexibility: 4,
  controlCapability: 4,
  supplierDependency: 4,
  strategicRobustness: 2,
};
export const DEMO_OPTION_Y: Record<CriterionId, number> = {
  acquisitionCost: 2,
  lifecycleCost: 4,
  environmentalImpact: 5,
  operationalFlexibility: 3,
  controlCapability: 3,
  supplierDependency: 3,
  strategicRobustness: 4,
};

export const EVEN_WEIGHT = Math.round(100 / CRITERIA.length);

/** An even weight split across all criteria that sums to exactly 100. */
export function evenWeights(): Record<string, number> {
  const base = Math.floor(100 / CRITERIA.length);
  const remainder = 100 - base * CRITERIA.length;
  const map: Record<string, number> = {};
  CRITERIA.forEach((c, i) => {
    map[c.id] = base + (i < remainder ? 1 : 0);
  });
  return map;
}

/** Redistributes the other weights proportionally so the total always stays 100. */
export function redistributeWeights(
  weights: Record<string, number>,
  changedId: string,
  nextValue: number,
): Record<string, number> {
  const clamped = Math.max(0, Math.min(100, Math.round(nextValue)));
  const ids = Object.keys(weights);
  const othersIds = ids.filter((id) => id !== changedId);
  const othersSum = othersIds.reduce((s, id) => s + weights[id], 0);
  const remaining = 100 - clamped;
  const next: Record<string, number> = { ...weights, [changedId]: clamped };
  if (othersSum <= 0) {
    const share = remaining / (othersIds.length || 1);
    othersIds.forEach((id) => (next[id] = Math.round(share)));
  } else {
    const scale = remaining / othersSum;
    othersIds.forEach((id) => (next[id] = Math.round(weights[id] * scale)));
  }
  const total = ids.reduce((s, id) => s + next[id], 0);
  const drift = 100 - total;
  if (drift !== 0) next[othersIds[0] ?? changedId] += drift;
  return next;
}

export function weightedTotal(weights: Record<string, number>, scores: Record<string, number>): number {
  const totalWeight = Object.values(weights).reduce((s, w) => s + w, 0) || 100;
  const sum = Object.keys(weights).reduce((s, id) => s + (weights[id] / totalWeight) * (scores[id] ?? 0), 0);
  return sum;
}

// ---------------------------------------------------------------------------
// Case brief — Ferrotech Dynamics (Task 2)
// ---------------------------------------------------------------------------
export const CASE_BRIEF = {
  company: "Ferrotech Dynamics",
  setup:
    "Ferrotech Dynamics must choose between three procurement models for its device fleet. Budget is constrained, management wants cost discipline, IT wants low operational complexity, sustainability goals need to be taken more seriously going forward, and only partial long-term lifecycle data is available.",
  modelA: {
    label: "Model A",
    headline: "Cheapest standard, 3-year cycle, CapEx",
    detail: "The cheapest standard option, with a short 3-year replacement cycle, purchased outright as CapEx.",
    cycleYears: 3,
  },
  modelB: {
    label: "Model B",
    headline: "Slightly higher cost, higher repairability, 6-year cycle, CapEx",
    detail:
      "A slightly more expensive option with higher repairability and a longer 6-year service life, still purchased outright as CapEx.",
    cycleYears: 6,
  },
  modelC: {
    label: "Model C",
    headline: "DaaS with return, refurbishment, 4-year contract + extend option",
    detail:
      "A lease/DaaS model with return, refurbishment, and integrated lifecycle service, on a 4-year contract with an extend option.",
    cycleYears: 4,
  },
} as const;

// ---------------------------------------------------------------------------
// Step 1 — Guided Kraljic classification
// ---------------------------------------------------------------------------
export type KraljicOption = { id: string; label: string; risk: number; impact: number };
export type KraljicQuestion = { id: string; prompt: string; axis: "risk" | "impact"; options: KraljicOption[] };

export const KRALJIC_QUESTIONS: KraljicQuestion[] = [
  {
    id: "vendors",
    axis: "risk",
    prompt: "How many qualified vendors currently offer this device category with comparable specifications?",
    options: [
      { id: "many", label: "Many", risk: 0, impact: 0 },
      { id: "few", label: "Few", risk: 1, impact: 0 },
      { id: "one-two", label: "Only one or two", risk: 2, impact: 0 },
    ],
  },
  {
    id: "spareParts",
    axis: "risk",
    prompt: "How critical is spare-parts availability to business continuity if a device fails?",
    options: [
      { id: "low", label: "Low", risk: 0, impact: 0 },
      { id: "medium", label: "Medium", risk: 1, impact: 0 },
      { id: "high", label: "High", risk: 2, impact: 0 },
    ],
  },
  {
    id: "spend",
    axis: "impact",
    prompt: "What is the relative spend of this category in the total IT procurement budget?",
    options: [
      { id: "small", label: "Small", risk: 0, impact: 0 },
      { id: "moderate", label: "Moderate", risk: 0, impact: 1 },
      { id: "large", label: "Large", risk: 0, impact: 2 },
    ],
  },
  {
    id: "replaceable",
    axis: "impact",
    prompt: "How replaceable is this hardware within your standardized fleet if you had to switch brands today?",
    options: [
      { id: "highly", label: "Highly replaceable", risk: 0, impact: 0 },
      { id: "somewhat", label: "Somewhat replaceable", risk: 0, impact: 1 },
      { id: "not-without", label: "Not without major rework", risk: 0, impact: 2 },
    ],
  },
  {
    id: "disruption",
    axis: "risk",
    prompt: "If this vendor exited the market tomorrow, how disruptive would switching be to operations?",
    options: [
      { id: "minor", label: "Minor", risk: 0, impact: 0 },
      { id: "moderate", label: "Moderate", risk: 1, impact: 0 },
      { id: "severe", label: "Severe", risk: 2, impact: 0 },
    ],
  },
  {
    id: "integration",
    axis: "impact",
    prompt: "Does this category require deep integration with existing IT management tools (imaging, MDM, security policy)?",
    options: [
      { id: "none", label: "No, standard", risk: 0, impact: 0 },
      { id: "some", label: "Some integration", risk: 0, impact: 1 },
      { id: "deep", label: "Deep, custom integration", risk: 0, impact: 2 },
    ],
  },
];

export type Quadrant = "non-critical" | "leverage" | "bottleneck" | "strategic";
export const QUADRANT_LABEL: Record<Quadrant, string> = {
  "non-critical": "Non-critical",
  leverage: "Leverage",
  bottleneck: "Bottleneck",
  strategic: "Strategic",
};

export function classifyQuadrant(riskScore: number, impactScore: number): Quadrant {
  const highRisk = riskScore >= 3;
  const highImpact = impactScore >= 3;
  if (highRisk && highImpact) return "strategic";
  if (highRisk && !highImpact) return "bottleneck";
  if (!highRisk && highImpact) return "leverage";
  return "non-critical";
}

// ---------------------------------------------------------------------------
// Step 3 — hidden-cost & risk calculator per model
// ---------------------------------------------------------------------------
export const MODEL_B_LAYERS = [
  { id: "purchase", label: "Purchase price", amountEur: 920 },
  { id: "itLabor", label: "IT labor (procurement & imaging)", amountEur: MATURITY_IT_LABOR_EUR.medium },
  { id: "maintenance", label: "Maintenance & troubleshooting", amountEur: 90 },
  { id: "downtime", label: "Downtime cost (device failure)", amountEur: 80 },
  { id: "disposal", label: "Disposal & data-wiping", amountEur: 90 },
] as const;

export const UNITS_MIN = 200;
export const UNITS_MAX = 500;
export const UNITS_DEFAULT = 350;

// ---------------------------------------------------------------------------
// Task copy
// ---------------------------------------------------------------------------
export const TASK2 = {
  kicker: "Task 2",
  heading: "Procurement Decision Matrix",
  subtext:
    "Four steps. Let the system classify the category from your own answers, score three real models, price the hidden costs, then commit to a ranked recommendation.",
  step1: {
    heading: "Step 1 — Guided Kraljic Classification",
    instructions:
      "Answer every question about this procurement category. Your answers — not a manual drag — determine where it lands on the Kraljic matrix.",
  },
  step2: {
    heading: "Step 2 — Weighted Scoring: Model A vs. B vs. C",
    instructions:
      "Set your weights first (they always sum to 100%), then score each model 1–5 on every criterion. The radar and the weighted totals update live — there's no \"best model\" label here, that's your call in Step 4.",
    lockLabel: "Lock in my scoring",
  },
  step3: {
    heading: "Step 3 — Hidden Cost & Risk Calculator",
    instructions:
      "Toggle the hidden cost layers that apply to Model A and B. Model C's cost is shown fully bundled from the start — a lease contract has no separate layers to reveal.",
    saveLabel: "Save cost & risk analysis",
    dependencyPrompt: "If this vendor increases prices at contract renewal, what is your negotiating position?",
  },
  step4: {
    heading: "Step 4 — Decision & Justification Under Uncertainty",
    rankLabel: "Your prioritized decision",
    rankInstructions: "Drag all three models into a priority order — most recommended first.",
    justifyScoreLabel: "Reference a number from your Step 2 weighted scoring.",
    justifyRiskLabel: "Reference a number or risk level from your Step 3 hidden-cost & risk analysis.",
    stakeholderLabel: "Next critical decision per stakeholder",
    stakeholders: [
      { id: "purchasing", label: "Purchasing" },
      { id: "it", label: "IT" },
      { id: "management", label: "Management" },
    ],
    riskLabel: "Two risks of choosing short-term cheap over lifecycle-robust",
  },
  export: {
    taskLabel: "Procurement Decision Matrix",
    docHeading: "Procurement Decision Matrix — Analysis Report",
  },
} as const;
