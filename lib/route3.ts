/**
 * Route 3 — Decision Architecture. All learner-facing copy and pure data for
 * Day 7 live here so components stay presentational. Two cases used
 * throughout: AeroPulse Data Infrastructure GmbH (Diagnostic phase) and
 * PolarEdge Data Systems (Builder phase) — both fictional.
 */

import type { IconKey } from "@/lib/routes";
import { materialAnchorId, type MaterialRef } from "@/lib/materialAnchor";

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
export type MaterialSectionId = "architecture" | "assurance" | "disclosure" | "enefg" | "perspectives" | "commitment";

export type MaterialSection = {
  id: MaterialSectionId;
  n: 1 | 2 | 3 | 4 | 5 | 6;
  icon: IconKey;
  kicker: string;
  title: string;
  definition: string;
  insight: string;
  takeaway: string;
  /** Decision rules phrased the way Task 3 needs them — including the rule that rules out the plausible wrong answer. */
  reasoning: string[];
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
    reasoning: [
      "Judge a company by whether decisions in one element are checked against the others before being acted on or communicated — not by whether any single number looks good.",
      "When you read an observation, ask which element owns it: a figure about the ratio is Efficiency/PUE; a fact about what is contracted is Energy Source; a fact about what nobody knows is a failure to organise Load & Transparency, which is a governance finding rather than a technical one.",
      "Communication is only sound when it is traceable back to the first three elements. A campaign built on one metric with no transparency behind it is the loop broken at its most visible point.",
      "Governance Review is what closes the loop. The absence of any periodic, independent re-examination is itself a finding, not a missing nice-to-have.",
    ],
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
      "The [COSO Enterprise Risk Management (ERM) Framework](https://www.coso.org/erm-framework) is widely used to structure how organisations identify, assess, and respond to risk, including sustainability-related risk — relevant here because a sustainability claim is itself a risk-bearing assertion that needs an assurance process, not just a marketing sign-off. The [Three Lines Model](https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/) (a risk-governance concept, originally \"Three Lines of Defence,\" updated by the IIA in 2020) separates operational management, who owns and manages risk day-to-day (Line 1), risk/compliance functions who oversee and challenge (Line 2), and internal audit, which independently assures the whole system (Line 3).",
    insight:
      "Applied here: IT Operations owning the PUE number is Line 1. A sustainability or compliance function checking whether the number and the renewable claim hold up together is Line 2. An independent audit or external assurance provider is Line 3. A company relying only on Line 1's self-reported PUE, with no Line 2 or Line 3, has an assurance gap — precisely the credibility weakness in both the AeroPulse and GreenStack cases.",
    takeaway:
      "[ISO 50001](https://www.iso.org/iso-50001-energy-management.html) (Energy Management Systems) mandates a continuous plan-do-check-act cycle for energy performance — Germany's EnEfG explicitly requires data centre operators to implement an ISO 50001 or [EMAS](https://green-business.ec.europa.eu/eco-management-and-audit-scheme-emas_en) system. And PUE ([ISO/IEC 30134-2](https://www.iso.org/standard/63451.html)) is only one member of a wider KPI family: [CUE (Carbon Usage Effectiveness, 30134-8)](https://www.iso.org/standard/77691.html) measures carbon emissions per unit of IT energy, [WUE (Water Usage Effectiveness, 30134-9)](https://www.iso.org/standard/77692.html) measures water consumption per unit of IT energy, and [REF (Renewable Energy Factor, 30134-3)](https://www.iso.org/standard/66127.html) measures the proportion of renewable energy used.",
    reasoning: [
      "Three Lines in practice: the team that owns and reports a number is Line 1; a compliance or sustainability function that challenges it is Line 2; an independent audit or external provider is Line 3. A company relying only on Line 1's self-reported figure has an assurance gap — name it as exactly that.",
      "\"No external party has reviewed this\" is therefore always a Governance finding, and commissioning third-party assurance is the lever that closes it.",
      "Never accept a narrative built on PUE alone. CUE covers carbon, WUE water, REF renewable share. If a case reports only PUE, the missing members of the family are your first evidence that the metrics system is thin.",
      "ISO 50001 / EMAS is a management-system obligation, not a number — satisfied by a functioning plan-do-check-act cycle, which is the Governance Review element of the loop in standardised form.",
    ],
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
      "Under the EU's [Corporate Sustainability Reporting Directive (CSRD, Directive (EU) 2022/2464)](https://eur-lex.europa.eu/eli/dir/2022/2464/oj/eng) and its detailed climate standard [ESRS E1 (adopted under Delegated Regulation (EU) 2023/2772)](https://eur-lex.europa.eu/legal-content/en/ALL/?uri=CELEX:32023R2772), in-scope companies must disclose climate-related strategy, risks, targets, and — critically — gross [Scope 1, 2, and 3 emissions](https://www.wri.org/initiatives/greenhouse-gas-protocol), with figures going to limited assurance by an auditor, meaning every reported number must be traceable back to its underlying source data.",
    insight:
      "This is a live, evolving situation as of mid-2026: the EU's Omnibus I Directive (EU) 2026/470, following the \"Stop-the-Clock\" Directive (EU) 2025/794, has substantially narrowed CSRD's scope — from roughly 50,000 companies to approximately 5,000 — so that only companies exceeding both 1,000 employees and €450 million net turnover remain in mandatory scope, effective from financial year 2027. Smaller \"Wave 2/3\" companies originally due to be brought into scope have had their obligations postponed or removed. The amended ESRS E1 itself has also been restructured — expanding from 9 to 11 disclosure requirements — with adoption expected via delegated act around mid-2026, targeted at FY2027 reporting.",
    takeaway:
      "Large hyperscale, colocation, and enterprise-IT-owning companies are exactly the profile likely to remain in CSRD's narrowed scope — meaning their PUE, renewable-energy claims, and energy consumption figures are moving toward the same audit rigour as financial statements, not remaining a purely voluntary marketing narrative. This directly elevates the first two blocks of this materi from \"good practice\" to \"audit-readiness.\"",
    reasoning: [
      "Limited assurance means every reported figure must be traceable to its source data. That converts \"we don't have load-level data\" from an internal inconvenience into a reporting risk — and makes transparency work a compliance argument, not only a management one.",
      "The scope narrowed but did not disappear: large data centre operators are exactly the profile still in mandatory scope from FY2027. Treat reporting readiness as a live constraint on how you sequence, not a future problem.",
      "Cite what is current and flag what is still draft. Presenting an evolving rule as settled in a board paper is the same credibility failure the AeroPulse case is built around.",
    ],
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
    reasoning: [
      "No single measure satisfies these obligations: waste-heat quotas need an external offtake partner, continuous measurement needs instrumentation, an EMS needs the whole loop running. Any sequencing has to account for all three at once.",
      "Waste-heat reuse quotas escalate on fixed dates and need physical infrastructure planned years ahead — which is why waste-heat partnerships are a Structural lever, never a short-term one.",
      "Continuous measurement, not annual estimates: a facility that can only produce facility-wide annual totals is already out of step with where the obligation is heading, whatever its current PUE.",
    ],
    callout: {
      label: "Not hypothetical — current law",
      text: "\"We'll handle waste-heat reuse once we've sorted efficiency\" is not a sequencing strategy EnEfG's timeline allows for — the obligations run in parallel and each depends on more than one loop element.",
    },
  },
  {
    id: "perspectives",
    n: 5,
    icon: "layers",
    kicker: "5 · Reading a situation fast",
    title: "Six Perspectives and the Lever Set",
    definition:
      "A diagnostic scan sorts what you are told into the perspective that actually owns it. Six cover a data centre's sustainability position: Energy Supply (where the electrons come from — contracts, PPAs, the sourcing mix), PUE (the efficiency ratio itself — the number, not what is driving it), Overall Impact (the total picture: whether the footprint is actually shrinking, not just one ratio), Economic Viability (whether the money spent is paying back — cost versus benefit), Communication (what gets said externally, and who approves it), and Governance (oversight, data ownership, and assurance — who checks and organises what).",
    insight:
      "Two of these are deliberately not loop elements. Overall Impact exists as its own lens because a falling ratio and a rising total can happen at the same time — if PUE and Overall Impact are not separable, you cannot see that. Economic Viability exists because Finance's question, \"is this actually paying back?\", is a legitimate perspective in its own right, not a sub-heading of sustainability. And Load & Transparency, the loop's third element, surfaces in a scan as a Governance finding: nobody having organised the data is a decision about ownership, not a physical limit.",
    takeaway:
      "The levers available to an operator are a known set, and a credible development plan picks from it deliberately rather than inventing: expanding the PPA, a targeted technical retrofit, building a multi-metric transparency system, aligning communication to verified data, pursuing waste-heat reuse partnerships, an on-site generation pilot, a load consolidation / virtualisation programme (raising the useful work done per unit of running IT capacity — the one lever that attacks total consumption rather than the ratio), and commissioning a third-party assurance review.",
    reasoning: [
      "Sorting a scan: ask which perspective owns the sentence. A figure about the ratio is PUE; a figure about total draw is Overall Impact; a question about payback is Economic Viability.",
      "\"Nobody has organised this data\" and \"no external party has reviewed this\" are both Governance — they describe ownership and assurance gaps, not measurement results.",
      "Anything said outward, and whoever signs it off, is Communication regardless of which metric it quotes.",
      "Choosing levers: the strongest four address the perspectives your own scan actually flagged. A lever aimed at something the case never raised is not a lever, it is a distraction.",
      "Load consolidation is the lever to reach for when total demand is rising while PUE improves — it is the only one on the list that changes how much useful work each running server does.",
    ],
    callout: {
      label: "Bridge into Phase 1",
      text: "The Diagnostic sorts observations into exactly these six perspectives and asks you to pick four levers from exactly this list — nothing in Phase 1 comes from outside this block.",
    },
  },
  {
    id: "commitment",
    n: 6,
    icon: "shield",
    kicker: "6 · Committing to a decision",
    title: "Horizons, Sequencing Logic, and Deciding Under Uncertainty",
    definition:
      "Every measure sits on a time horizon. Short-term effects land within a quarter or two and are usually process or communication changes. Medium-term effects land inside a budget cycle — retrofits, systems, contracts. Structural measures change the organisation's capability or obligations permanently: assurance regimes, heat-offtake infrastructure, management systems. Tagging horizons is what stops a plan from being a list where everything is equally urgent.",
    insight:
      "Sequencing then needs a stated logic, and there are four defensible ones: sequence by data-readiness first (do nothing whose effect you cannot measure), by visible-impact first (buy credibility and momentum early), by risk-reduction first (close the biggest exposure before optimising anything), or by cost-reversibility first (start with what can be undone cheaply if you turn out to be wrong). Most real plans combine two. What makes a proposal credible is naming which two and why — not that the combination is unusual.",
    takeaway:
      "The five dimensions a senior trade-off is argued across are the same ones Route 2 used — Sustainability, Cost, Security of Supply, Availability, and Credibility — and a genuine trade-off names two of them pulling against each other in this specific case. Deciding under incomplete information has its own standard: a no-regret decision is one that stays sensible across several plausible futures, so it is worth committing to now even without complete data. State it as a decision with a date or a trigger condition — \"commission the assurance review by the end of Q2\" — never as a wish for more data, which is not a decision at all.",
    reasoning: [
      "Horizon tagging: ask when the effect becomes visible, not when the work starts. A retrofit begun now but landing next budget cycle is Medium-term; an assurance regime that permanently changes what you can claim is Structural.",
      "A guiding decision is something the board must actually approve, reject, or defer — a budget, a mandate, a deferral. \"Improve sustainability\" is a goal; \"approve the transparency-system budget by Q2\" is a decision.",
      "Name your sequencing logic and say why that combination suits this case. A plan whose order looks arbitrary invites the board to reorder it for you.",
      "A genuine trade-off pair has both sides pulling against each other in this case specifically. \"Sustainability vs. Cost\" is only a trade-off here if the stated constraints actually make them conflict — otherwise you are naming a tension you do not have.",
      "Decision under uncertainty: if waiting for more data would not change the decision, the decision is already available. Commit to it with a date or a trigger, and say what would change it.",
    ],
    callout: {
      label: "Bridge into Phase 2",
      text: "Blocks 2, 3, 4 and 7 of the Builder are judged against exactly these four ideas: decision-not-goal, a named sequencing logic, a real trade-off pair, and a decision committed under uncertainty.",
    },
  },
];

/** Chips for a task step: which material sections it draws on. */
export function materialRefs(ids: MaterialSectionId[]): MaterialRef[] {
  return ids.map((id) => {
    const section = MATERIAL.find((m) => m.id === id);
    return { id: materialAnchorId(id), label: section?.kicker ?? id };
  });
}

// ---------------------------------------------------------------------------
// Phase 1 — Diagnostic: AeroPulse Data Infrastructure GmbH
// ---------------------------------------------------------------------------
export const AEROPULSE_BRIEF = {
  company: "AeroPulse Data Infrastructure GmbH",
  setup:
    "AeroPulse operates its own data centre. PUE has improved, but overall IT demand is rising. Electricity supply has partly shifted to renewable sources. Deeper metrics on load structure and overall impact are missing. Finance questions the economic viability of further measures. Marketing wants to expand the sustainability message offensively. IT Operations warns against premature conclusions from individual metrics alone.",
};

export type PerspectiveId = "energy-supply" | "pue" | "overall-impact" | "economic-viability" | "communication" | "governance";

export const PERSPECTIVES: { id: PerspectiveId; label: string; domain: string }[] = [
  { id: "energy-supply", label: "Energy Supply", domain: "where the electrons actually come from — contracts, PPAs, the sourcing mix" },
  { id: "pue", label: "PUE", domain: "the facility's efficiency ratio itself — the number, not what's driving it" },
  { id: "overall-impact", label: "Overall Impact", domain: "the total picture — whether the footprint is actually shrinking, not just one ratio" },
  { id: "economic-viability", label: "Economic Viability", domain: "whether the money spent is paying back — cost versus benefit" },
  { id: "communication", label: "Communication", domain: "what gets said externally, and who approves it" },
  { id: "governance", label: "Governance", domain: "oversight, data ownership, or assurance — who checks and organises what" },
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
export const HORIZON_OPTIONS: { id: Horizon3; label: string; domain: string }[] = [
  { id: "short", label: "Short-term", domain: "Visible within a quarter or two — usually process or communication changes." },
  { id: "medium", label: "Medium-term", domain: "Lands inside a budget cycle — retrofits, systems, contracts." },
  { id: "structural", label: "Structural", domain: "Changes capability or obligations permanently — assurance regimes, heat offtake, management systems." },
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
  { id: "data-readiness", label: "Sequence by data-readiness first", domain: "do nothing whose effect you cannot yet measure" },
  { id: "visible-impact", label: "Sequence by visible-impact first", domain: "buy credibility and momentum early" },
  { id: "risk-reduction", label: "Sequence by risk-reduction first", domain: "close the biggest exposure before optimising anything" },
  { id: "cost-reversibility", label: "Sequence by cost-reversibility first", domain: "start with what can be undone cheaply if you're wrong" },
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
    scanMaterial: ["perspectives", "architecture"] as MaterialSectionId[],
    leverHeading: "Lever selection",
    leverInstructions: `Select the ${REQUIRED_LEVER_COUNT} biggest levers for credible and effective development, and justify each in at least ~15 words.`,
    leverMaterial: ["perspectives", "assurance", "enefg"] as MaterialSectionId[],
    firstMeasureHeading: "First-measure decision",
    firstMeasurePrompt: "From your 4 selected levers, which one should AeroPulse start with?",
    firstMeasureJustifyLabel: "Justify this from a management point of view, not a purely technical one.",
    firstMeasureMaterial: ["commitment", "architecture"] as MaterialSectionId[],
    horizonHeading: "Time-horizon tagging",
    horizonInstructions: "For each selected lever, tag when it could realistically happen.",
    horizonMaterial: ["commitment", "enefg"] as MaterialSectionId[],
  },
  phase2: {
    heading: "Phase 2 — Builder: PolarEdge Proposal",
    b1: { material: ["disclosure", "architecture"] as MaterialSectionId[], heading: "1. Strategic Relevance", label: "Why are renewable energy and PUE strategically relevant for PolarEdge?", caption: "Aim for at least a few sentences — this doubles as your memo's executive summary." },
    b2: { material: ["commitment"] as MaterialSectionId[], heading: "2. Three Guiding Decisions for the Next 12 Months", caption: "State each as a decision the board must actually make — not a general goal." },
    b3: {
      material: ["commitment"] as MaterialSectionId[],
      heading: "3. Prioritisation Decision Logic",
      label: "Which principles drive your sequencing?",
      caption: "Select the principles that apply, then explain the combination in your own words.",
      explainCaption: "Why this combination, specifically, for PolarEdge?",
    },
    b4: {
      material: ["commitment"] as MaterialSectionId[],
      heading: "4. Central Trade-offs",
      caption: `Select at least ${MIN_TRADEOFFS} trade-off pairs and write one sentence per pair on why it's a genuine tension here.`,
    },
    b5: {
      material: ["perspectives", "commitment"] as MaterialSectionId[],
      heading: "5. Recommended First Line of Measures",
      label: "Which measure should PolarEdge fund first?",
      caption: "Options are drawn from your Phase 1 lever selection where available.",
      justifyLabel: "Justification",
    },
    b6: {
      material: ["assurance", "architecture"] as MaterialSectionId[],
      heading: "6. Roles, Approval Logic & Review Mechanisms",
      caption: "Name an Owner/Approver for each decision type. Toggle the governance-flow reference if you want a starting point.",
    },
    b7: {
      material: ["commitment", "disclosure"] as MaterialSectionId[],
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
