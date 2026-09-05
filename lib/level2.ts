/**
 * Level 2 — Application. Verbatim learner-facing copy, the readiness-scorecard
 * anchors, the three options' numbers, and the pure calculation functions that
 * drive the panels, the comparison table, and the exported Calculation Note.
 * No React here — keep this importable from the server page too.
 */

import type { IconKey } from "@/lib/module3";

export const LEVEL2_TITLE = "Level 2 — Application: Where Should Solenne Move First?";

export const PREREQ = {
  message:
    "Complete Level 1 first — this task builds directly on your Diagnostic Note.",
  cta: "Go to Level 1",
  href: "/module-3/level-1",
} as const;

export const STORY2 = {
  kicker: "The brief",
  paragraphs: [
    "Your Diagnostic Note reached Solenne's CIO. The response was direct: \"You've told me what's wrong. Now tell me what to do about it — and what it will cost.\"",
    "Budget and staff time are limited. The board expects a visible result within the year. Client sustainability demands keep increasing. Data on lifecycle impact and supply chain origin is still incomplete. Procurement is worried that new criteria will slow purchasing down and add complexity they don't have capacity for.",
    "You have three moves available. You cannot fund all three this year. Decide which one goes first — and be ready to say, in numbers, what it costs and what it buys.",
  ],
  referenceTitle: "Your Diagnostic Note",
  referenceHint: "From Level 1 — expand to review. Reviewing it unlocks two locked sliders.",
  gapsLabel: "Three biggest strategic gaps",
  opsLabel: "Operational weakness vs. strategic deficit",
} as const;

export type Reference2 = { label: string; url: string };

/** Key into components/level2/StudyDiagrams2.tsx. */
export type Level2DiagramKey =
  | "readinessMatrix"
  | "macc"
  | "compoundingCurve"
  | "tcoVsPrice"
  | "governanceAnchor"
  | "capitalCeiling";

export type Level2Card = {
  id: string;
  icon: IconKey;
  title: string;
  concept: string;
  example: string;
  whyItMatters: string;
  diagram: Level2DiagramKey;
  references: Reference2[];
  usedIn: string;
};

export const MATERIAL2: { kicker: string; title: string; intro: string; cards: Level2Card[] } = {
  kicker: "Study material",
  title: "Six tools for the decision",
  intro:
    "Each card is a tool you use in the task below — the label shows where. Same depth as Level 1: a framework, a concrete example, a diagram, and a reference. Open the one you need as you go.",
  cards: [
    {
      id: "l2m1",
      icon: "target",
      title: "Readiness vs. importance",
      concept:
        "An area can be strategically critical and still be the wrong place to move first if the organization lacks the capability, data, or authority to execute there today. Readiness and importance are independent axes — plotting them separately, rather than folding both into one \"priority\" score, is what a 2×2 prioritization matrix is for: it exposes what is important and ready (act now), important but not ready (build capability first), ready but less important (a quick win), or neither (park it).",
      example:
        "A common real pattern: \"supplier sustainability screening\" often rates as highly important yet scores low on readiness because no baseline supplier data exists to screen against — it looks urgent on paper but stalls without that foundation. \"Publishing a target picture\" often scores high on readiness (it needs no new data, no new authority) even where its immediate importance looks modest — which is exactly why cheap, ready moves get sequenced first even when a harder, more important move is the real long-term prize.",
      whyItMatters:
        "The importance/readiness matrix is one of the most common tools used in real strategy and portfolio-prioritization workshops — noticing when \"important\" and \"feels urgent\" have quietly diverged is a core diagnostic skill.",
      diagram: "readinessMatrix",
      references: [{ label: "Atlassian — Prioritization frameworks", url: "https://www.atlassian.com/agile/product-management/prioritization-framework" }],
      usedIn: "Readiness Scorecard",
    },
    {
      id: "l2m2",
      icon: "coins",
      title: "Marginal abatement cost: why the same euro buys less",
      concept:
        "A marginal abatement cost curve (MACC) ranks every available reduction action from cheapest to most expensive cost-per-tonne, then stacks them left to right. The shape is never flat: the leftmost actions — replacing the worst-performing share of a fleet — deliver the largest reduction per euro; the rightmost actions necessarily reach into devices that were already reasonably efficient, so the same euro buys a shrinking reduction. This is not a quirk of IT hardware — it is the same curve shape used in national and corporate decarbonization planning worldwide.",
      example:
        "Applied to Option C: the first 100 units replaced are, by construction, the fleet's most inefficient — the €800-per-unit spend buys its largest possible CO2 return there. By the 300th–400th unit, the program is necessarily reaching into the fleet's more efficient half, so the same €800 buys less — exactly the mechanism behind the panel's \"CO2 per euro drops sharply past ~250 units\" risk flag once you cross that volume.",
      whyItMatters:
        "MACC curves are the standard tool climate economists and corporate sustainability teams use to sequence abatement spending — it is the reason the cheapest overall path to a target is almost never \"the single biggest purchase.\"",
      diagram: "macc",
      references: [{ label: "Wikipedia — Marginal abatement cost", url: "https://en.wikipedia.org/wiki/Marginal_abatement_cost" }],
      usedIn: "Option C",
    },
    {
      id: "l2m3",
      icon: "lever",
      title: "Why procurement compounds where a purchase doesn't",
      concept:
        "A one-time purchase, even a large one, resolves exactly the units it touches, once. A binding procurement criterion, written into the standing specification, resolves every unit purchased under it from that point on, indefinitely, without being re-decided. Comparing options on \"impact this year\" alone misses this: a one-off purchase's tonnes are real but bounded; a policy's tonnes start smaller but do not stop accumulating once the tender closes.",
      example:
        "At Tier 2, Option B's year-one estimate — roughly 7% of new-purchase footprint — looks modest next to Option C's absolute tonnes. But every future contract renewal inherits the same criterion at zero additional decision cost, while Option C's effect is capped at whatever was actually replaced this year. Over several years the compounding option can out-perform the larger one-time purchase — the exact trade-off this task leaves you to weigh, not resolves for you.",
      whyItMatters:
        "This is why procurement policy, not a single capex project, is usually rated the higher-leverage lever in real corporate sustainability plans — the same logic as Level 1's single action vs. strategic embedding, now with numbers attached.",
      diagram: "compoundingCurve",
      references: [{ label: "ISO 20400 — Sustainable procurement", url: "https://www.iso.org/standard/63026.html" }],
      usedIn: "Option B",
    },
    {
      id: "l2m4",
      icon: "cart",
      title: "Reading a price premium against total cost, not sticker price",
      concept:
        "A stricter supplier requirement raising the tender price by a stated percentage answers \"what does this cost to buy?\" — it does not answer \"what does this cost to own?\" Total cost of ownership (TCO) adds energy consumption, maintenance, and end-of-life cost across the full service life. A higher purchase price frequently carries a lower TCO once those downstream costs are counted, and a lower purchase price frequently hides a higher one. Reporting only the premium, without the TCO it is meant to offset, answers half the question.",
      example:
        "Panel B's \"+7% price premium on new contracts\" at Tier 2 is a purchase-price number. It says nothing, by itself, about whether the resulting contracts cost less to run and dispose of over their service life — exactly the number a real procurement business case needs beside it before a CFO signs off, and exactly the gap this task leaves for you to notice rather than resolves for you.",
      whyItMatters:
        "Confusing purchase price with total cost of ownership is one of the most common, and most consequential, errors in real IT procurement business cases — telling the two apart is core vocabulary for the role.",
      diagram: "tcoVsPrice",
      references: [{ label: "Investopedia — Total Cost of Ownership", url: "https://www.investopedia.com/terms/t/totalcostofownership.asp" }],
      usedIn: "Option B",
    },
    {
      id: "l2m5",
      icon: "gavel",
      title: "Why a strategy still needs governance to convert into action",
      concept:
        "A strategy document produces no emissions reduction of its own — its entire value is indirect: it is what makes actions like Options B and C consistent and sustained rather than one-off moves that quietly lapse once the person who championed them moves on. Without a named owner and a governance structure, a \"strategy\" is a document, not a control — B and C's numbers can drift back toward baseline once nobody is left accountable for holding the line.",
      example:
        "This is why Option A's own risk flag is explicitly a governance risk, not a cost or time risk — the €35,000–€55,000 question is not \"can we afford a strategy,\" it is \"will this survive the next reorganization without someone whose job depends on B and C's criteria being met.\"",
      whyItMatters:
        "Funding \"the strategy\" as its own line item, distinct from the actions it governs, is a genuinely counter-intuitive but standard move in real corporate transformation budgeting.",
      diagram: "governanceAnchor",
      references: [{ label: "ISACA — COBIT", url: "https://www.isaca.org/resources/cobit" }],
      usedIn: "Option A",
    },
    {
      id: "l2m6",
      icon: "scale",
      title: "Choosing under a hard ceiling: capital rationing",
      concept:
        "Capital rationing is the finance term for exactly Solenne's situation: a fixed pool of funds and multiple worthwhile candidates whose combined cost exceeds it, forcing a ranked choice rather than a separate yes/no on each. The standard approach ranks candidates by return-per-euro — here, tonnes-per-euro and leverage-per-euro — rather than by absolute size: a large investment is not automatically the right one under rationing; a smaller investment with a better ratio, or a policy with a longer payoff tail, can rank ahead of it.",
      example:
        "Solenne's €120,000 ceiling cannot fund all three options at once — their combined cost already exceeds it well before Option C's units are even maximised. The task does not ask which option is \"good\"; every option in front of you is individually defensible. It asks which one earns the limited capital first — a ranking question, not a yes/no one.",
      whyItMatters:
        "Ranking by return-per-euro under a ceiling, rather than by project size, is standard corporate-finance vocabulary for exactly this kind of budget-constrained decision — and precisely what Section 3.4 asks you to justify with a number.",
      diagram: "capitalCeiling",
      references: [{ label: "Investopedia — Capital Rationing", url: "https://www.investopedia.com/terms/c/capitalrationing.asp" }],
      usedIn: "the whole decision",
    },
  ],
};

// --- Readiness scorecard ---------------------------------------------------

export type ScoreArea = {
  id: string;
  label: string;
  /** Locked until the Level 1 reference has been reviewed once. */
  locked: boolean;
  anchors: { 1: string; 3: string; 5: string };
};

export const SCORE_AREAS: ScoreArea[] = [
  {
    id: "target",
    label: "Target Picture",
    locked: false,
    anchors: {
      1: "No sustainability in the target picture at all.",
      3: "Mentioned as a value, not tied to objectives.",
      5: "A defined sustainability objective inside the IT target picture.",
    },
  },
  {
    id: "governance",
    label: "Governance",
    locked: true,
    anchors: {
      1: "No one owns sustainability outcomes.",
      3: "Owned informally, not in a job description.",
      5: "Named accountability with a reporting line to leadership.",
    },
  },
  {
    id: "investment",
    label: "Investment Logic",
    locked: false,
    anchors: {
      1: "Approvals look only at cost and speed.",
      3: "Lifecycle cost raised occasionally, not required.",
      5: "Lifecycle and end-of-life cost required in every approval.",
    },
  },
  {
    id: "procurement",
    label: "Procurement",
    locked: true,
    anchors: {
      1: "Purchasing decided only on price.",
      3: "Some suppliers pre-screened informally.",
      5: "Sustainability criteria binding in every tender.",
    },
  },
  {
    id: "supplier",
    label: "Supplier Control",
    locked: false,
    anchors: {
      1: "Suppliers never assessed on sustainability.",
      3: "Ad-hoc questions to some suppliers.",
      5: "All key suppliers scored against set criteria.",
    },
  },
];

export const SCORECARD = {
  kicker: "3.1 · Readiness Scorecard",
  title: "Score each area 1–5 for readiness to act",
  intro:
    "This is readiness, not importance. Move each slider; the shape redraws as you go. There is no correct profile — the shape is the point.",
  lockedTooltip: "Review your Diagnostic Note first.",
  scale: { min: 1, max: 5, default: 3 },
} as const;

// --- The three options -----------------------------------------------------

export const BUDGET_CEILING = 120000;
export const BUDGET_CEILING_LABEL =
  "Solenne's available budget for this initiative this year: €120,000.";

export const OPTION_A = {
  id: "a",
  key: "Option A",
  label: "Formalize a complete sustainable IT strategy",
  input: { basicLabel: "Basic scope", fullLabel: "Full scope" },
  budget: { basic: 35000, full: 55000 },
  timeMonths: { basic: 4, full: 6 },
  co2Label: "0 t direct — unlocks future reductions",
  co2Info:
    "A strategy has no emissions of its own. Its effect shows up in how much of Option B and C's impact actually gets realized and sustained.",
  risk: "Governance risk — becomes shelf documentation without an assigned owner.",
} as const;

export const OPTION_B = {
  id: "b",
  key: "Option B",
  label: "Introduce binding sustainability criteria in procurement",
  tiers: [1, 2, 3] as const,
  suppliersFailingPct: { 1: 15, 2: 35, 3: 60 } as Record<number, number>,
  pricePremiumPct: { 1: 3, 2: 7, 3: 12 } as Record<number, number>,
  budget: 15000,
  co2Pct: { 1: 4, 2: 7, 3: 10 } as Record<number, number>,
  timeMonths: { 1: 2, 2: 2, 3: 3 } as Record<number, number>,
} as const;

export const OPTION_C = {
  id: "c",
  key: "Option C",
  label: "Investment program to replace energy-intensive components",
  min: 0,
  max: 500,
  step: 10,
  default: 100,
  costPerUnit: 800,
  co2PerUnit: 0.18, // t CO2 / year, per-unit energy delta (stated on-page)
  energyValuePerTon: 40, // € / t assumed energy saving, for payback
  trapThreshold: 250,
  trapRisk: "Budget risk — CO2 per euro drops sharply past ~250 units.",
} as const;

export type OptAResult = { budget: number; timeMonths: number; co2Label: string; risk: string };
export type OptBResult = {
  suppliersFailingPct: number;
  pricePremiumPct: number;
  budget: number;
  co2Pct: number;
  timeMonths: number;
  risk: string;
};
export type OptCResult = {
  budget: number;
  co2Tons: number;
  paybackMonths: number | null;
  timeMonths: number;
  risk: string;
};

export function computeA(scope: "basic" | "full"): OptAResult {
  return {
    budget: OPTION_A.budget[scope],
    timeMonths: OPTION_A.timeMonths[scope],
    co2Label: OPTION_A.co2Label,
    risk: OPTION_A.risk,
  };
}

export function computeB(tier: number): OptBResult {
  const failing = OPTION_B.suppliersFailingPct[tier];
  return {
    suppliersFailingPct: failing,
    pricePremiumPct: OPTION_B.pricePremiumPct[tier],
    budget: OPTION_B.budget,
    co2Pct: OPTION_B.co2Pct[tier],
    timeMonths: OPTION_B.timeMonths[tier],
    risk: `Supply chain friction — ${failing}% of current suppliers would not qualify today.`,
  };
}

export function computeC(units: number): OptCResult {
  const budget = units * OPTION_C.costPerUnit;
  const co2Tons = +(units * OPTION_C.co2PerUnit).toFixed(2);
  const annualSaving = co2Tons * OPTION_C.energyValuePerTon;
  const paybackMonths = annualSaving > 0 ? Math.round((budget / annualSaving) * 12) : null;
  const timeMonths = Math.ceil(units / 100) * 2;
  return {
    budget,
    co2Tons,
    paybackMonths,
    timeMonths,
    risk: units > OPTION_C.trapThreshold ? OPTION_C.trapRisk : "",
  };
}

export const eur = (n: number) => "€" + n.toLocaleString("en-US");

export const TASK2 = {
  kicker: "Task 2",
  heading: "Task 2 — Where should Solenne move first?",
  subtext: "Explore each option's real cost and impact before you commit.",
  simulatorKicker: "3.2 · Consequence Simulator",
  simulatorTitle: "Open each option and move its inputs",
  tableKicker: "3.3 · Comparison",
  tableTitle: "The numbers, side by side",
  tableCols: { budget: "Budget", co2: "CO₂ / yr", time: "Time", risk: "Risk" },
  co2Footnote:
    "The three options report impact differently: a strategy has none of its own, procurement acts on the share of new spend, and the investment program saves absolute tonnes. They are not directly comparable — that is part of the read.",
  reflection: {
    kicker: "3.4 · Written reflection — judged",
    lockedLabel:
      "Open all three option panels and set every readiness slider to unlock the written reflection.",
    fieldA: {
      key: "l2:choice",
      label: "Which option do you prioritize first, and why?",
      hint: "Reference at least one number from the comparison table above (Budget, CO2, Time, or Risk).",
      placeholder: "Option [A/B/C] first, because...",
    },
    fieldB: {
      key: "l2:notFix",
      label:
        "What does this choice NOT fix? Name the conflict or gap you are consciously leaving unresolved for now.",
      hint: "Name one real conflict or gap your choice leaves open — both sides of it, not a restatement of the choice.",
      placeholder: "This does not fix...",
    },
  },
  export: {
    controlsTitle: "Calculation Note",
    controlsIntro:
      "When both reflection fields are filled, export a one-page Calculation Note. It is saved to this device and pulled forward into Level 3.",
    disabledHint: "Fill both reflection fields to enable the export.",
    openLabel: "Export Calculation Note",
    docWatermark: "AION · Green IT · Module 3 · Level 2",
    docHeading: "Calculation Note",
    docSubheading: "Solenne Industrial Technik AG — where to move first",
    docRadarTitle: "Readiness profile",
    docTableTitle: "Option comparison",
    docFieldATitle: "Priority and reasoning",
    docFieldBTitle: "What this choice does not fix",
    docNotFilled: "— not completed —",
    downloadLabel: "Download as PDF",
    closeLabel: "Close",
    taskLabel: "calculation-note",
  },
} as const;

// --- Store key helpers -----------------------------------------------------

export const L2 = {
  materialKey: "l2:material",
  refOpenedKey: "l2:refOpened",
  scorePrefix: "l2:score:",
  scoresTouchedKey: "l2:scores",
  panelsKey: "l2:panels",
  aScope: "l2:A:scope",
  bTier: "l2:B:tier",
  cUnits: "l2:C:units",
  fieldA: TASK2.reflection.fieldA.key,
  fieldB: TASK2.reflection.fieldB.key,
} as const;

export const scoreKey = (areaId: string) => `${L2.scorePrefix}${areaId}`;
