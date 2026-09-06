/**
 * Route 3 — Decision Architecture. All learner-facing copy and pure data for
 * Day 7 live here so components stay presentational. Two cases used
 * throughout: AeroPulse Data Infrastructure GmbH (Diagnostic phase) and
 * PolarEdge Data Systems (Builder phase) — both fictional.
 */

import type { IconKey } from "@/lib/routes";

export const LEARNER_NAME_KEY = "learner:name";

// ---------------------------------------------------------------------------
// Store key map
// ---------------------------------------------------------------------------
export const R3 = {
  name: LEARNER_NAME_KEY,
  p1: {
    scan: (obsId: string) => `r3:p1:scan:${obsId}`,
    leverSelected: (leverId: string) => `r3:p1:lever:${leverId}:selected`,
    leverJustify: (leverId: string) => `r3:p1:lever:${leverId}:justify`,
    leverHorizon: (leverId: string) => `r3:p1:lever:${leverId}:horizon`,
    firstMeasure: "r3:p1:firstmeasure",
    firstMeasureJustify: "r3:p1:firstmeasure:justify",
  },
  p2: {
    strategicRelevance: "r3:p2:strategic",
    guidingDecision: (n: 1 | 2 | 3) => `r3:p2:decision:${n}`,
    logicPrincipleSelected: (id: string) => `r3:p2:logic:${id}:selected`,
    logicExplain: "r3:p2:logic:explain",
    tradeoffSelected: (pairId: string) => `r3:p2:tradeoff:${pairId}:selected`,
    tradeoffJustify: (pairId: string) => `r3:p2:tradeoff:${pairId}:justify`,
    recommendedMeasure: "r3:p2:recommended",
    recommendedJustify: "r3:p2:recommended:justify",
    approvalOwner: (decisionTypeId: string) => `r3:p2:approval:${decisionTypeId}`,
    decisionNow: "r3:p2:decisionnow",
  },
} as const;

// ---------------------------------------------------------------------------
// Materi — 4 blocks
// ---------------------------------------------------------------------------
export type MaterialSectionId = "architecture" | "assurance" | "disclosure" | "enefg";

export type MaterialSection = {
  id: MaterialSectionId;
  n: 1 | 2 | 3 | 4;
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
    id: "architecture",
    n: 1,
    icon: "recycleLoop",
    kicker: "1 · The conceptual spine",
    title: "The Integrated Decision Architecture: Five Elements in a Feedback Loop",
    definition:
      "Sustainable data centre management is not a checklist of separate initiatives — it's a closed loop of five elements that must inform each other continuously: Energy Source (what you actually buy or generate: grid, PPA, GoO, on-site) feeds into Efficiency / PUE (how much of that energy reaches useful IT work), which feeds into Load & Transparency (do you actually know your consumption structure well enough to interpret the first two elements meaningfully), which feeds into Communication (what you tell the board, investors, regulators, and the public — traceable back to the first three, not decoupled from them), which feeds into Governance Review (a periodic, structured re-examination of all four together), which loops back into Energy Source decisions for the next cycle.",
    insight:
      "A low PUE or a renewable electricity contract is not, by itself, evidence of good management. Good management is evidenced by the existence and functioning of this loop — the fact that decisions in one element are checked against the others before being communicated or acted on.",
    takeaway:
      "This is the exact standard the AeroPulse and PolarEdge cases in Task 3 are testing. Hover or tap a node in the diagram below to see how it connects to its neighbours — nothing here stands alone.",
    callout: {
      label: "The standard this whole route is built around",
      text: "A measure that improves one element while leaving the others unexamined is not a management success — it's an unchecked assumption waiting to be challenged.",
    },
  },
  {
    id: "assurance",
    n: 2,
    icon: "shield",
    kicker: "2 · Frameworks a senior decision-maker should recognise",
    title: "Assurance & Management Frameworks",
    definition:
      "The COSO Enterprise Risk Management (ERM) Framework is widely used to structure how organisations identify, assess, and respond to risk, including sustainability-related risk — relevant here because a sustainability claim is itself a risk-bearing assertion that needs an assurance process, not just a marketing sign-off. The Three Lines Model (a risk-governance concept, originally \"Three Lines of Defence,\" updated by the IIA in 2020) separates operational management, who owns and manages risk day-to-day (Line 1), risk/compliance functions who oversee and challenge (Line 2), and internal audit, which independently assures the whole system (Line 3).",
    insight:
      "Applied here: IT Operations owning the PUE number is Line 1. A sustainability or compliance function checking whether the number and the renewable claim hold up together is Line 2. An independent audit or external assurance provider is Line 3. A company relying only on Line 1's self-reported PUE, with no Line 2 or Line 3, has an assurance gap — precisely the credibility weakness in both the AeroPulse and GreenStack cases.",
    takeaway:
      "ISO 50001 (Energy Management Systems) mandates a continuous plan-do-check-act cycle for energy performance — Germany's EnEfG explicitly requires data centre operators to implement an ISO 50001 or EMAS system. And PUE (ISO/IEC 30134-2) is only one member of a wider KPI family: CUE (Carbon Usage Effectiveness, 30134-8) measures carbon emissions per unit of IT energy, WUE (Water Usage Effectiveness, 30134-9) measures water consumption per unit of IT energy, and REF (Renewable Energy Factor, 30134-3) measures the proportion of renewable energy used.",
    callout: {
      label: "Never accept a narrative built on PUE alone",
      text: "A senior decision-maker should never accept a sustainability narrative built on PUE alone when this whole family of standardised, comparable metrics exists.",
    },
  },
  {
    id: "disclosure",
    n: 3,
    icon: "gavel",
    kicker: "3 · Why this is becoming board-level",
    title: "Formal EU Disclosure Pressure",
    definition:
      "Under the EU's Corporate Sustainability Reporting Directive (CSRD, Directive (EU) 2022/2464) and its detailed climate standard ESRS E1 (adopted under Delegated Regulation (EU) 2023/2772), in-scope companies must disclose climate-related strategy, risks, targets, and — critically — gross Scope 1, 2, and 3 emissions, with figures going to limited assurance by an auditor, meaning every reported number must be traceable back to its underlying source data.",
    insight:
      "This is a live, evolving situation as of mid-2026: the EU's Omnibus I Directive (EU) 2026/470, following the \"Stop-the-Clock\" Directive (EU) 2025/794, has substantially narrowed CSRD's scope — from roughly 50,000 companies to approximately 5,000 — so that only companies exceeding both 1,000 employees and €450 million net turnover remain in mandatory scope, effective from financial year 2027. Smaller \"Wave 2/3\" companies originally due to be brought into scope have had their obligations postponed or removed. The amended ESRS E1 itself has also been restructured — expanding from 9 to 11 disclosure requirements — with adoption expected via delegated act around mid-2026, targeted at FY2027 reporting.",
    takeaway:
      "Large hyperscale, colocation, and enterprise-IT-owning companies are exactly the profile likely to remain in CSRD's narrowed scope — meaning their PUE, renewable-energy claims, and energy consumption figures are moving toward the same audit rigour as financial statements, not remaining a purely voluntary marketing narrative. This directly elevates the first two blocks of this materi from \"good practice\" to \"audit-readiness.\"",
    callout: {
      label: "Treat this as current, not fixed",
      text: "This area moves quickly — treat any specific date or threshold here as the situation stood in mid-2026, and verify current status before using it in real advisory work.",
    },
  },
  {
    id: "enefg",
    n: 4,
    icon: "target",
    kicker: "4 · Deepening the German case",
    title: "Beyond PUE Thresholds",
    definition:
      "Building on Route 1's EnEfG coverage: German data centre operators face mandatory implementation of an ISO 50001 or EMAS energy/environmental management system by 1 July 2025; escalating waste-heat reuse quotas — 10% from July 2026, 15% from July 2027, 20% from July 2028 — which require physical infrastructure (heat offtake agreements with district heating networks or neighbouring facilities) planned years in advance; and continuous measurement obligations, not annual estimates, for power and energy demand.",
    insight:
      "None of these obligations can be satisfied by a single measure. A waste-heat quota needs an external offtake partner (Energy Source + Governance Review). Continuous measurement needs real instrumentation (Load & Transparency). An EMS implementation needs the whole loop running, not one element fixed in isolation.",
    takeaway:
      "This is not a hypothetical management theory — it is now German federal law. They require exactly the kind of integrated loop described in Block 1.",
    callout: {
      label: "Not hypothetical — current law",
      text: "\"We'll handle waste-heat reuse once we've sorted efficiency\" is not a sequencing strategy EnEfG's timeline allows for — the obligations run in parallel and each depends on more than one loop element.",
    },
  },
];

// ---------------------------------------------------------------------------
// Phase 1 — Diagnostic: AeroPulse Data Infrastructure GmbH
// ---------------------------------------------------------------------------
export const AEROPULSE_BRIEF = {
  company: "AeroPulse Data Infrastructure GmbH",
  setup:
    "AeroPulse operates its own data centre. PUE has improved, but overall IT demand is rising. Electricity supply has partly shifted to renewable sources. Deeper metrics on load structure and overall impact are missing. Finance questions the economic viability of further measures. Marketing wants to expand the sustainability message offensively. IT Operations warns against premature conclusions from individual metrics alone.",
};

export type PerspectiveId = "energy-supply" | "pue" | "overall-impact" | "economic-viability" | "communication" | "governance";

export const PERSPECTIVES: { id: PerspectiveId; label: string }[] = [
  { id: "energy-supply", label: "Energy Supply" },
  { id: "pue", label: "PUE" },
  { id: "overall-impact", label: "Overall Impact" },
  { id: "economic-viability", label: "Economic Viability" },
  { id: "communication", label: "Communication" },
  { id: "governance", label: "Governance" },
];

export type Observation = { id: string; text: string; correctPerspective: PerspectiveId; clue: string };

export const OBSERVATIONS: Observation[] = [
  {
    id: "pue-drop",
    text: "AeroPulse's PUE has dropped from 1.7 to 1.5 over the past two years.",
    correctPerspective: "pue",
    clue: "Which bucket is specifically about the ratio the facility reports, not about total consumption?",
  },
  {
    id: "demand-growth",
    text: "Total IT power draw has grown 22% in the same period, as new workloads came online faster than efficiency gains could offset.",
    correctPerspective: "overall-impact",
    clue: "Does a falling PUE necessarily mean the facility's total footprint is falling too?",
  },
  {
    id: "ppa-share",
    text: "40% of AeroPulse's electricity is now sourced under a renewable PPA signed 18 months ago.",
    correctPerspective: "energy-supply",
    clue: "Which bucket is about where the electrons actually come from, not how efficiently they're used?",
  },
  {
    id: "no-breakdown",
    text: "Nobody at AeroPulse can currently break down consumption by workload or by zone — only the facility-wide total is metered.",
    correctPerspective: "governance",
    clue: "Is \"nobody has organised this data\" a technical fact, or a choice about what gets tracked and by whom?",
  },
  {
    id: "finance-question",
    text: "Finance has asked whether the PPA premium is actually paying back, given how much total consumption has grown.",
    correctPerspective: "economic-viability",
    clue: "Is questioning whether a cost pays back a technical question or an economic one?",
  },
  {
    id: "marketing-campaign",
    text: "Marketing has drafted an external campaign describing AeroPulse as \"now measurably greener than ever,\" built primarily around the PUE figure.",
    correctPerspective: "communication",
    clue: "Who approves what gets said externally — is that a technical team's decision?",
  },
  {
    id: "itops-pushback",
    text: "IT Operations has pushed back internally, arguing that PUE improving while total energy and demand both rise doesn't necessarily mean AeroPulse's actual footprint is shrinking.",
    correctPerspective: "overall-impact",
    clue: "Is this observation about one metric, or about the total picture that one metric alone can't capture?",
  },
  {
    id: "no-external-review",
    text: "No external party has reviewed AeroPulse's efficiency or renewable-sourcing figures before they're used in the campaign.",
    correctPerspective: "governance",
    clue: "Is \"nobody outside checked this\" a technical limitation, or an oversight and assurance gap?",
  },
];

export type Lever3 = { id: string; label: string };

export const LEVERS3: Lever3[] = [
  { id: "expand-ppa", label: "Expanding the PPA" },
  { id: "technical-retrofit", label: "A targeted technical retrofit" },
  { id: "transparency-system", label: "Building a multi-metric transparency system" },
  { id: "verified-communication", label: "Aligning communication to verified data" },
  { id: "waste-heat-partnerships", label: "Pursuing waste-heat reuse partnerships" },
  { id: "onsite-generation-pilot", label: "An on-site generation pilot" },
  { id: "load-consolidation", label: "A load consolidation / virtualisation programme" },
  { id: "third-party-assurance", label: "Commissioning a third-party assurance review" },
];

export const REQUIRED_LEVER_COUNT = 4;

export type Horizon3 = "short" | "medium" | "structural";
export const HORIZON_OPTIONS: { id: Horizon3; label: string }[] = [
  { id: "short", label: "Short-term" },
  { id: "medium", label: "Medium-term" },
  { id: "structural", label: "Structural" },
];

// ---------------------------------------------------------------------------
// Phase 2 — Builder: PolarEdge Data Systems
// ---------------------------------------------------------------------------
export const POLAREDGE_BRIEF = {
  company: "PolarEdge Data Systems",
  role: "You are Head of Infrastructure Strategy / CIO-CTO advisor for PolarEdge Data Systems.",
  constraints: [
    "High availability requirements.",
    "Differing interests across IT, Finance, Communications, and Management.",
    "Incomplete data on load profiles and overall impact.",
    "Budget restrictions alongside pressure for visible sustainability progress.",
    "Risk of overrating communicatively-attractive-but-weak measures.",
    "Growing reporting and traceability requirements (see the CSRD context above).",
  ],
};

export const LOGIC_PRINCIPLES = [
  { id: "data-readiness", label: "Sequence by data-readiness first" },
  { id: "visible-impact", label: "Sequence by visible-impact first" },
  { id: "risk-reduction", label: "Sequence by risk-reduction first" },
  { id: "cost-reversibility", label: "Sequence by cost-reversibility first" },
];

export type TensionDimension = { id: string; label: string };
export const TENSION_DIMENSIONS: TensionDimension[] = [
  { id: "sustainability", label: "Sustainability" },
  { id: "cost", label: "Cost" },
  { id: "supply", label: "Security of Supply" },
  { id: "availability", label: "Availability" },
  { id: "credibility", label: "Credibility" },
];

export type TensionPair = { id: string; label: string };
export const TENSION_PAIRS: TensionPair[] = TENSION_DIMENSIONS.flatMap((a, i) =>
  TENSION_DIMENSIONS.slice(i + 1).map((b) => ({ id: `${a.id}-${b.id}`, label: `${a.label} vs. ${b.label}` })),
);

export const MIN_TRADEOFFS = 2;

export const APPROVAL_ROWS = [
  { id: "energy-contract", label: "Energy contract approval" },
  { id: "retrofit-budget", label: "Technical retrofit budget" },
  { id: "external-comms", label: "External sustainability communication" },
  { id: "annual-review", label: "Annual review of the metrics system" },
];

// ---------------------------------------------------------------------------
// Task 3 — copy
// ---------------------------------------------------------------------------
export const TASK3 = {
  kicker: "Task 3",
  heading: "Board-Level Decision Builder",
  subtext:
    "Two phases, both open from the start — work them in any order. The Diagnostic scans AeroPulse's situation; the Builder turns that discipline into a formal proposal for PolarEdge's board.",
  orderBanner: "Suggested order: Diagnostic, then Builder — but nothing here is locked. Work in whichever order you like.",
  phase1: {
    heading: "Phase 1 — Diagnostic: AeroPulse",
    scanHeading: "Rapid Multi-Perspective Scan",
    scanInstructions: "Assign each observation to the perspective it actually belongs to. Use Show Clue if you're unsure.",
    leverHeading: "Lever selection",
    leverInstructions: `Select the ${REQUIRED_LEVER_COUNT} biggest levers for credible and effective development, and justify each in at least ~15 words.`,
    firstMeasureHeading: "First-measure decision",
    firstMeasurePrompt: "From your 4 selected levers, which one should AeroPulse start with?",
    firstMeasureJustifyLabel: "Justify this from a management point of view, not a purely technical one.",
    horizonHeading: "Time-horizon tagging",
    horizonInstructions: "For each selected lever, tag when it could realistically happen.",
  },
  phase2: {
    heading: "Phase 2 — Builder: PolarEdge Proposal",
    b1: { heading: "1. Strategic Relevance", label: "Why are renewable energy and PUE strategically relevant for PolarEdge?", caption: "Aim for at least a few sentences — this doubles as your memo's executive summary." },
    b2: { heading: "2. Three Guiding Decisions for the Next 12 Months", caption: "State each as a decision the board must actually make — not a general goal." },
    b3: {
      heading: "3. Prioritisation Decision Logic",
      label: "Which principles drive your sequencing?",
      caption: "Select the principles that apply, then explain the combination in your own words.",
      explainCaption: "Why this combination, specifically, for PolarEdge?",
    },
    b4: {
      heading: "4. Central Trade-offs",
      caption: `Select at least ${MIN_TRADEOFFS} trade-off pairs and write one sentence per pair on why it's a genuine tension here.`,
    },
    b5: {
      heading: "5. Recommended First Line of Measures",
      label: "Which measure should PolarEdge fund first?",
      caption: "Options are drawn from your Phase 1 lever selection where available.",
      justifyLabel: "Justification",
    },
    b6: {
      heading: "6. Roles, Approval Logic & Review Mechanisms",
      caption: "Name an Owner/Approver for each decision type. Toggle the governance-flow reference if you want a starting point.",
    },
    b7: {
      heading: "7. The One Decision to Make Now Despite Incomplete Information",
      label: "State it as a decision, with a date or trigger condition — not as a wish for more data.",
      caption: "Connect this explicitly to the no-regret thinking from earlier routes.",
    },
  },
  export: {
    filenameLevel: 3,
    filenameTask: 1,
    taskLabel: "Board Decision Memo",
    docHeading: "Board Decision Memo",
  },
} as const;
