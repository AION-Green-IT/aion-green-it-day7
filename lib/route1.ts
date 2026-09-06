/**
 * Route 1 — Lifecycle Foundations. All learner-facing copy and the pure
 * lifecycle-carbon/cost math live here so components stay presentational.
 * Case used throughout Task 1: LogicSphere Solutions (fictional).
 */

import type { IconKey } from "@/lib/routes";

export const LEARNER_NAME_KEY = "learner:name";

// ---------------------------------------------------------------------------
// Store key map — every key this route writes to the shared progress store.
// ---------------------------------------------------------------------------
export const R1 = {
  material: "r1:material",
  stages: "r1:stages",
  tag: (tagId: string) => `r1:tag:${tagId}`,
  calcUnits: "r1:calc:units",
  calcYears: "r1:calc:years",
  calcUsed: "r1:calc:used",
  risk1: "r1:risk1",
  risk2: "r1:risk2",
  risk3: "r1:risk3",
  criteria: (id: string) => `r1:criteria:${id}`,
  criteriaCustom: "r1:criteria:custom",
  classify: (riskKey: string) => `r1:classify:${riskKey}`,
  recommendation: "r1:recommendation",
  pushbackJustification: "r1:pushback:justification",
  pushbackChoice: "r1:pushback:choice",
  name: LEARNER_NAME_KEY,
} as const;

export const RISK_KEYS = [R1.risk1, R1.risk2, R1.risk3] as const;

// ---------------------------------------------------------------------------
// Material — 4 blocks: definition / insight / takeaway + one callout each.
// ---------------------------------------------------------------------------
export type MaterialBlockId = "tco" | "carbon" | "rladder" | "regulatory";

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
    id: "tco",
    n: 1,
    icon: "coins",
    kicker: "Block 1 · Cost framework",
    title: "Total Cost of Ownership (TCO) vs. Purchase Price",
    definition:
      "Total Cost of Ownership is the full cost of a device across its working life: acquisition cost, plus operating cost (energy, IT support, software licensing tied to the device), plus maintenance cost, plus end-of-life cost, minus any residual or resale value recovered at disposal. Purchase price is only the first of these five terms.",
    insight:
      "For a typical corporate laptop over a 4-year hold, the purchase price is usually only a minority share of the 4-year TCO. The rest is energy consumption, IT support and repair labour, software licences that follow the device, and certified data-wiping and disposal at end-of-life — costs that never appear on the vendor's quote.",
    takeaway:
      "When you read an RFP or tender scorecard, check whether TCO carries real scoring weight or is just a sentence in the preamble. A common European public-tender pattern splits scoring roughly Price ~40% / TCO & Lifecycle ~40% / Compliance ~20% — lowest bid alone is a red flag, not a badge of good procurement.",
    callout: {
      label: "Industry callout",
      text: "In European public tenders this weighting is called \"award criteria\" — TCO has to be scored with a stated weight to count, not just mentioned.",
    },
  },
  {
    id: "carbon",
    n: 2,
    icon: "factory",
    kicker: "Block 2 · Embodied carbon",
    title: "Embodied Carbon — Manufacturing Dominance",
    definition:
      "Source: TCO Certified / Öko-Institut e.V. study, based on 15 carbon footprint reports of 14\" business notebooks from Dell, Lenovo, and HP. Total lifecycle carbon footprint of a business laptop over a 4-year hold: 299 kg CO2e, split Manufacturing 79.8% · Use-phase 13.2% · Transport 6.8% · End-of-life 0.2%.",
    insight:
      "Nearly 80% of a laptop's lifetime carbon impact has already happened before it is switched on for the first time at an employee's desk — it is locked in at the factory, in raw-material extraction, component fabrication, and assembly.",
    takeaway:
      "Extending device lifespan from 4 to 6 years cuts average annual emissions by roughly 30%, because the large one-time manufacturing footprint is spread over more years while the small use-phase slice barely grows. The metric procurement should chase is not \"energy efficiency rating\" alone — it's device longevity and repairability, because those are the actual lifecycle-carbon levers.",
    callout: {
      label: "Industry callout",
      text: "Öko-Institut's methodology counts raw-material extraction and PCB/display fabrication as \"manufacturing\" — not just final assembly at the factory.",
    },
  },
  {
    id: "rladder",
    n: 3,
    icon: "recycleLoop",
    kicker: "Block 3 · Circular economy",
    title: "The Circular Economy R-Ladder (EU Standard)",
    definition:
      "The Ellen MacArthur Foundation's R-strategies hierarchy ranks circular actions from most to least value-retaining: Refuse → Rethink → Reduce → Reuse → Repair → Refurbish → Remanufacture → Repurpose → Recycle → Recover.",
    insight:
      "A higher rung on the ladder retains more of the original material, energy, and labour value. Recycling sits near the bottom — it is a last resort, not the goal. A common misconception in corporate sustainability messaging treats \"it gets recycled eventually\" as the finish line, when in R-ladder terms it is closer to the material being written off.",
    takeaway:
      "When you audit a vendor proposal, a vendor whose sustainability pitch is only a recycling program is operating low on the ladder. The right follow-up question is why they aren't offering repair, refurbishment, or reuse pathways first — those retain far more value than recycling ever can.",
    callout: {
      label: "Industry callout",
      text: "Term to use tomorrow: \"value retention\" — the R-ladder is ranked by how much of the original material, energy, and labour survives, not by whether something is eventually recyclable.",
    },
  },
  {
    id: "regulatory",
    n: 4,
    icon: "gavel",
    kicker: "Block 4 · Regulatory context",
    title: "EU Regulatory Context",
    definition:
      "Three instruments now frame IT hardware procurement in the EU: the WEEE Directive (2012/19/EU), which obliges producers to run take-back programmes for electronic waste; the EU Right to Repair Directive, which mandates spare-parts availability for a defined period — a legal minimum, not a nice-to-have; and the Ecodesign for Sustainable Products Regulation (ESPR), which will require a Digital Product Passport, relevant to supply-chain transparency.",
    insight:
      "Independently verified certifications — TCO Certified, EPEAT, and Blauer Engel (Der Blaue Engel) — carry third-party audit criteria with defined, checkable thresholds. Marketing claims without third-party verification do not, even when the language sounds similar.",
    takeaway:
      "The test that separates a real certification from a greenwashing claim is simple: who audits it, and against what published, measurable criteria? If a vendor can't name an independent auditor and a criteria document, treat the claim as marketing, not compliance evidence.",
    callout: {
      label: "Industry callout",
      text: "ESPR phases in through 2027 — Digital Product Passport requirements expand to more product categories over time, starting with batteries.",
    },
  },
];

// ---------------------------------------------------------------------------
// Block 1 visualizer — TCO Reveal Bar
// ---------------------------------------------------------------------------
export type TcoLayer = { id: string; label: string; amountEur: number };

export const TCO_LAYERS: TcoLayer[] = [
  { id: "purchase", label: "Purchase price", amountEur: 900 },
  { id: "energy", label: "Energy cost (4 yr)", amountEur: 210 },
  { id: "support", label: "IT support & repair", amountEur: 480 },
  { id: "licensing", label: "Software licensing", amountEur: 250 },
  { id: "disposal", label: "Disposal & data-wiping", amountEur: 90 },
];

export const TCO_TOTAL_EUR = TCO_LAYERS.reduce((s, l) => s + l.amountEur, 0);
export const TCO_PURCHASE_SHARE = TCO_LAYERS[0].amountEur / TCO_TOTAL_EUR;

// ---------------------------------------------------------------------------
// Block 2 — carbon breakdown + annualized-footprint math
// ---------------------------------------------------------------------------
export const BASELINE_KG = 299;
export const CARBON_BREAKDOWN = {
  manufacturing: 0.798,
  use: 0.132,
  transport: 0.068,
  endOfLife: 0.002,
} as const;

export const CARBON_SEGMENTS = [
  { id: "manufacturing", label: "Manufacturing", share: CARBON_BREAKDOWN.manufacturing },
  { id: "use", label: "Use-phase", share: CARBON_BREAKDOWN.use },
  { id: "transport", label: "Transport", share: CARBON_BREAKDOWN.transport },
  { id: "endOfLife", label: "End-of-life", share: CARBON_BREAKDOWN.endOfLife },
] as const;

/** Annualized lifetime footprint if the device is kept for `lifespanYears`. */
export function annualizedFootprintKg(lifespanYears: number): number {
  const fixed =
    BASELINE_KG * (CARBON_BREAKDOWN.manufacturing + CARBON_BREAKDOWN.transport + CARBON_BREAKDOWN.endOfLife);
  const usePhasePerYear = (BASELINE_KG * CARBON_BREAKDOWN.use) / 4;
  return fixed / lifespanYears + usePhasePerYear;
}

// ---------------------------------------------------------------------------
// Block 3 — Repair-first vs Recycle-first timeline
// ---------------------------------------------------------------------------
/** How many full units have been purchased by `years` on a `cycleYears` replacement schedule. */
export function purchasesNeeded(years: number, cycleYears: number): number {
  return 1 + Math.floor(years / cycleYears);
}

/** Device A — recycled/replaced every `cycleYears`: a pure step function of full manufacturing events. */
export function recycledPathKg(years: number, cycleYears = 2): number {
  return purchasesNeeded(years, cycleYears) * BASELINE_KG;
}

/** Device B — repaired and kept in service: one manufacturing event plus linear use-phase accrual. */
export function repairedPathKg(years: number): number {
  const usePhasePerYear = (BASELINE_KG * CARBON_BREAKDOWN.use) / 4;
  return BASELINE_KG + usePhasePerYear * years;
}

// ---------------------------------------------------------------------------
// R-ladder reference list (sidebar)
// ---------------------------------------------------------------------------
export const R_LADDER = [
  { id: "refuse", n: 1, label: "Refuse", blurb: "Don't acquire the device/feature at all." },
  { id: "rethink", n: 2, label: "Rethink", blurb: "Meet the need a fundamentally different way." },
  { id: "reduce", n: 3, label: "Reduce", blurb: "Use fewer devices, or less material per device." },
  { id: "reuse", n: 4, label: "Reuse", blurb: "Same device, same purpose, another user." },
  { id: "repair", n: 5, label: "Repair", blurb: "Fix the device so it keeps working as intended." },
  { id: "refurbish", n: 6, label: "Refurbish", blurb: "Restore an older device to good working order." },
  { id: "remanufacture", n: 7, label: "Remanufacture", blurb: "Rebuild to original spec using recovered parts." },
  { id: "repurpose", n: 8, label: "Repurpose", blurb: "Use the device for a different function." },
  { id: "recycle", n: 9, label: "Recycle", blurb: "Break down for materials — most value is lost." },
  { id: "recover", n: 10, label: "Recover", blurb: "Energy recovery only — last resort." },
] as const;

// ---------------------------------------------------------------------------
// Block 4 — certifications (verified vs. marketing-only distractors)
// ---------------------------------------------------------------------------
export type Certification = {
  id: string;
  name: string;
  verified: boolean;
  auditor: string;
  criteria: string;
  version: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: "tco",
    name: "TCO Certified",
    verified: true,
    auditor: "Independent third-party auditors, coordinated by TCO Development (non-profit)",
    criteria: "Social & environmental responsibility across the supply chain, hazardous substances, energy consumption, circular-design and durability criteria.",
    version: "Generation 9 (current)",
  },
  {
    id: "epeat",
    name: "EPEAT",
    verified: true,
    auditor: "Global Electronics Council, with independent verification bodies",
    criteria: "Tiered Bronze/Silver/Gold rating against environmental-performance criteria for electronics: materials, design for repair/recycling, energy, packaging.",
    version: "IEEE 1680 series, current revision",
  },
  {
    id: "blauer-engel",
    name: "Blauer Engel (Der Blaue Engel)",
    verified: true,
    auditor: "German Federal Environment Agency (Umweltbundesamt) / RAL gGmbH",
    criteria: "Repairability, hazardous-substance limits, noise, and energy criteria — the world's oldest eco-label, since 1978.",
    version: "Current award criteria (DE-UZ 78 for notebooks)",
  },
  {
    id: "greentech-ready",
    name: "GreenTech Ready Seal",
    verified: false,
    auditor: "Self-declared by the manufacturer — no named third-party auditor",
    criteria: "No published, measurable criteria document could be located.",
    version: "n/a",
  },
  {
    id: "ecosmart",
    name: "EcoSmart Verified Label",
    verified: false,
    auditor: "Self-declared by the manufacturer's marketing department",
    criteria: "Marketing copy references \"eco-friendly materials\" without a scored, publicly available standard.",
    version: "n/a",
  },
];

// ---------------------------------------------------------------------------
// Case brief — LogicSphere Solutions (Task 1)
// ---------------------------------------------------------------------------
export const CASE_BRIEF = {
  company: "LogicSphere Solutions",
  units: 300,
  setup:
    "LogicSphere Solutions is about to procure 300 new notebooks for several sites. Devices have historically been selected on price, supply availability, and technical standardization. Two bids have come in.",
  vendor1: {
    label: "Vendor 1",
    headline: "Lowest price, replacement cycle 3 years",
    detail:
      "Very low price. No clear commitment on repairability, spare parts, or a take-back programme. Estimated replacement cycle: 3 years.",
    cycleYears: 3,
    priceDeltaPct: -18,
  },
  vendor2: {
    label: "Vendor 2",
    headline: "+18% upfront, replacement cycle 6 years",
    detail:
      "More expensive upfront (+18%). Offers long-term spare-parts availability, a return system, and a refurbishable device architecture. Estimated replacement cycle: 6 years.",
    cycleYears: 6,
    priceDeltaPct: 18,
  },
  stakeholders: {
    purchasing: "Purchasing is focused on acquisition cost.",
    it: "IT is focused on standardization and deployment speed.",
    sustainability: "The sustainability team is pushing for stronger lifecycle and supply-chain consideration.",
  },
} as const;

// ---------------------------------------------------------------------------
// Step 1 — Lifecycle Stage Explorer
// ---------------------------------------------------------------------------
export type StageId =
  | "procurement"
  | "use"
  | "maintenance"
  | "upgrade"
  | "reuse"
  | "refurbishment"
  | "return"
  | "recycling"
  | "disposal";

export type Stage = { id: StageId; n: number; label: string; fact: string };

export const STAGES: Stage[] = [
  {
    id: "procurement",
    n: 1,
    label: "Procurement",
    fact: "Purchasing has historically weighted RFPs about 90% on unit price. Vendor 1's bid is 18% cheaper upfront; Vendor 2 discloses a six-year spare-parts commitment in writing.",
  },
  {
    id: "use",
    n: 2,
    label: "Use",
    fact: "Both vendors quote similar active-use power draw. Block 2's data showed use-phase is only ~13% of lifetime footprint — the real gap between these two vendors sits elsewhere.",
  },
  {
    id: "maintenance",
    n: 3,
    label: "Maintenance",
    fact: "Vendor 1's contract is silent on spare parts. Vendor 2 guarantees battery, keyboard, and display replacement parts for 6 years post-sale.",
  },
  {
    id: "upgrade",
    n: 4,
    label: "Upgrade",
    fact: "Vendor 2's chassis uses standard screws and a modular RAM/SSD bay. Vendor 1's unit is adhesive-sealed, which typically blocks component-level upgrades.",
  },
  {
    id: "reuse",
    n: 5,
    label: "Reuse",
    fact: "IT standardization favors identical hardware — but Vendor 2's modular design means a retired unit's parts can keep other units running past their own warranty period.",
  },
  {
    id: "refurbishment",
    n: 6,
    label: "Refurbishment",
    fact: "Vendor 2 operates an EU take-back and refurbishment line; refurbished units are commonly redeployed to lower-priority roles. Vendor 1 has no refurbishment programme.",
  },
  {
    id: "return",
    n: 7,
    label: "Return",
    fact: "Vendor 2's contract includes a take-back clause at end-of-lease. Vendor 1's proposal has no return or buy-back terms — disposal cost falls entirely on LogicSphere.",
  },
  {
    id: "recycling",
    n: 8,
    label: "Recycling",
    fact: "Both vendors claim \"recyclable materials,\" but only Vendor 2 names a certified WEEE-compliant recycling partner directly in the contract.",
  },
  {
    id: "disposal",
    n: 9,
    label: "Disposal",
    fact: "Certified data-wiping and disposal for 300 units is a real line item IT has not priced for either vendor — right now it's invisible in the headline price comparison.",
  },
];

// ---------------------------------------------------------------------------
// Step 2 — Sustainability factor tagging (drag-to-classify onto stages)
// ---------------------------------------------------------------------------
export type Tag = { id: string; label: string; validStages: StageId[]; hint: string };

export const TAGS: Tag[] = [
  {
    id: "spare-parts",
    label: "Spare parts availability",
    validStages: ["maintenance", "refurbishment"],
    hint: "Think about when a broken device actually gets fixed — not when it's bought or thrown away.",
  },
  {
    id: "energy-efficiency",
    label: "Energy efficiency",
    validStages: ["use"],
    hint: "This is about ongoing power draw while the device is switched on, not the purchase or the write-off.",
  },
  {
    id: "take-back",
    label: "Take-back program",
    validStages: ["return"],
    hint: "This is about what happens when the device's time with you ends and it has to go back somewhere.",
  },
  {
    id: "supply-chain",
    label: "Supply chain transparency",
    validStages: ["procurement"],
    hint: "This is something you'd check before any money changes hands.",
  },
  {
    id: "repairability",
    label: "Repairability score",
    validStages: ["maintenance", "refurbishment", "upgrade"],
    hint: "This describes how easy a device is to physically service or extend — several stages in its working life depend on it.",
  },
  {
    id: "standardization-speed",
    label: "Standardization speed",
    validStages: [],
    hint: "This is an IT deployment concern, not a sustainability factor — it may not belong on this timeline at all.",
  },
  {
    id: "lowest-bid",
    label: "Lowest bid pricing",
    validStages: [],
    hint: "This is a pure pricing concern, not a lifecycle sustainability factor — it may not belong on this timeline at all.",
  },
  {
    id: "modularity",
    label: "Modularity",
    validStages: ["upgrade", "refurbishment", "reuse"],
    hint: "This is about swapping or reusing components without replacing the whole device.",
  },
  {
    id: "certification",
    label: "Certification (TCO/EPEAT/Blauer Engel)",
    validStages: ["procurement"],
    hint: "This is checked before a purchase decision is made, not afterward.",
  },
  {
    id: "material-recyclability",
    label: "Material recyclability",
    validStages: ["recycling", "disposal"],
    hint: "This only becomes relevant once a device is no longer being used by anyone at all.",
  },
];

// ---------------------------------------------------------------------------
// Step 4 — classification columns (learner's own risk findings)
// ---------------------------------------------------------------------------
export type ClassifyColumn = "purchasing" | "governance";

// ---------------------------------------------------------------------------
// Task copy
// ---------------------------------------------------------------------------
export const TASK1 = {
  kicker: "Task 1",
  heading: "Lifecycle Impact Mapper",
  subtext:
    "Five steps, one procurement call. Work through the lifecycle, quantify it, then defend your recommendation the way a Finance Director actually will.",
  step1: {
    heading: "Step 1 — Lifecycle Stage Explorer",
    instructions:
      "Click every stage on the timeline to see what's actually known about LogicSphere's two vendors at that point in the device lifecycle. This is context, not a quiz — there's nothing to get wrong here.",
  },
  step2: {
    heading: "Step 2 — Sustainability Factor Tagging",
    instructions:
      "Drag each tag onto the lifecycle stage it belongs to. Two tags are distractors — they don't belong anywhere on this timeline. Every real tag needs to land on one of its correct stages before Step 3 unlocks.",
    tapHint: "Tap a tag, then tap a stage to place it.",
  },
  step3: {
    heading: "Step 3 — Lifecycle Cost Calculator",
    instructions:
      "Using the 299 kg CO2e baseline and the manufacturing/use/transport/end-of-life split from Block 2, project the carbon cost of each vendor's replacement schedule across your fleet.",
  },
  step4: {
    heading: "Step 4 — Analysis Panel",
    riskPrompts: [
      "Risk 1 if only purchase price is considered",
      "Risk 2 if only purchase price is considered",
      "Risk 3 if only purchase price is considered",
    ],
    classifyInstructions:
      "Drag each of your three risks into the column that describes who actually owns fixing it.",
    recommendationLabel: "Your recommendation",
  },
  step5: {
    heading: "Step 5 — Management Pushback",
    prompt:
      "Vendor 2 costs 18% more upfront, and this quarter's budget is under pressure. Justify your recommendation using numbers, not just principles.",
    justificationLabel: "Cite at least one number from your Lifecycle Cost Calculator (Step 3) to support your position.",
    choices: [
      {
        id: "hold",
        label: "Hold firm with data",
        consequence: "Finance requests a follow-up meeting with a full TCO breakdown next week.",
      },
      {
        id: "phased",
        label: "Propose a phased rollout (pilot 50 units first)",
        consequence: "Budget approved for the pilot, but the full rollout decision is delayed a quarter — lifecycle savings are realized later.",
      },
      {
        id: "terms",
        label: "Request extended payment terms",
        consequence: "Vendor negotiation required; approval depends on the vendor's flexibility, introducing timeline risk.",
      },
    ],
  },
  export: {
    taskLabel: "Lifecycle Impact Mapper",
    docHeading: "Lifecycle Impact Mapper — Analysis Report",
  },
} as const;
