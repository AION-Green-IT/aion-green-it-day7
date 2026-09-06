/**
 * Route 2 — The Trade-off. All learner-facing copy and the pure dial/scoring
 * math live here so components stay presentational. Case used throughout:
 * DeltaGrid Hosting GmbH (fictional).
 */

import type { IconKey } from "@/lib/routes";

export const LEARNER_NAME_KEY = "learner:name";

// ---------------------------------------------------------------------------
// Store key map
// ---------------------------------------------------------------------------
export const R2 = {
  material: "r2:material",
  dialUtilization: "r2:dial:utilization",
  dialCooling: "r2:dial:cooling",
  dialTransparency: "r2:dial:transparency",
  leverSelected: (id: string) => `r2:lever:${id}:selected`,
  leverJustify: (id: string) => `r2:lever:${id}:justify`,
  leverHorizon: (id: string) => `r2:lever:${id}:horizon`,
  rankOrder: "r2:rankorder",
  firstStep: "r2:firststep",
  firstStepJustify: "r2:firststep:justify",
  infoGaps: "r2:infogaps",
  name: LEARNER_NAME_KEY,
} as const;

// ---------------------------------------------------------------------------
// Case brief — DeltaGrid Hosting GmbH
// ---------------------------------------------------------------------------
export const CASE_BRIEF = {
  company: "DeltaGrid Hosting GmbH",
  setup:
    "You've been promoted: you're now the senior consultant leading the engagement for DeltaGrid Hosting GmbH, a company running its own data center for internal and external services. Over several years, the infrastructure grew rapidly — new systems were integrated project-by-project, without a systematic architectural or efficiency review. Energy costs are rising. At the same time, leadership demands high availability, data security, and performance. Your job is no longer just to spot problems — it's to build a prioritized, defensible recommendation for management.",
  facts: [
    "Several physical servers are consistently underused.",
    "Some duplicate or historically-grown systems exist without clear current need.",
    "Cooling and airflow setup has only been adjusted piecemeal over the years.",
    "Consumption data is only available for part of the facility.",
    "IT operations staff worry that major intervention could cause disruption.",
    "Management wants a solution that is both economically and sustainably justifiable.",
  ],
} as const;

// ---------------------------------------------------------------------------
// Materi — 6 sections
// ---------------------------------------------------------------------------
export type MaterialSectionId = "bridge" | "tco" | "downtime" | "regression" | "iso50001" | "synthesis";

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
    kicker: "1 · From audit to advice",
    title: "Bridging Reflection",
    definition:
      "Route 1 asked one question: where are the technical problems? Route 2 asks a harder one: given limited budget and real organizational risk, what do we actually do about them — and how do we defend that choice to people who control budget and risk appetite?",
    insight:
      "A list of correctly-diagnosed inefficiencies is not a recommendation. The move from analyst to consultant is the move from finding gaps to owning a prioritized, defensible position on what happens next.",
    takeaway:
      "Before you touch DeltaGrid's case, sit with these for a moment — they're framing, not a task:",
    callout: { label: "Reflect", text: "Where in my own organization is data center operation managed more by habit than by deliberate strategy?" },
  },
  {
    id: "tco",
    n: 2,
    icon: "coins",
    kicker: "2 · The framework",
    title: "TCO: The Framework Behind the Decision",
    definition:
      "Total Cost of Ownership for a data center spans three categories: CapEx (hardware, facility build-out), OpEx (energy, maintenance, staffing, licensing), and Cost of Risk (downtime, security incidents, compliance failure).",
    insight:
      "Most organizations track CapEx and OpEx carefully — they're line items on a budget. Cost of Risk is usually an afterthought, because it's probabilistic rather than billed monthly. That asymmetry systematically distorts investment decisions toward \"cheap now, expensive later.\"",
    takeaway:
      "Any recommendation that only compares CapEx and OpEx between options is incomplete. Cost of Risk has to be named explicitly, even when it can't be priced as precisely as the other two.",
    callout: {
      label: "Industry callout",
      text: "A cheaper option is only actually cheaper once its Cost of Risk is priced in — not before.",
    },
  },
  {
    id: "downtime",
    n: 3,
    icon: "shield",
    kicker: "3 · Pricing the risk side",
    title: "The Economics of Downtime",
    definition:
      "Per the most recent available industry survey (Uptime Institute), 54% of organizations report their most recent significant/serious outage cost more than $100,000, and roughly 1 in 5 (≈20%) report costs exceeding $1 million. Separately, ITIC's 2024 enterprise survey found 91% of mid-size and large enterprises lose more than $300,000 per hour of downtime.",
    insight:
      "If a single serious outage has a 1-in-5 chance of costing over $1 million, how much annual efficiency savings would it take to \"pay for\" the redundancy that prevents it? This is the actual question infrastructure leaders are answering, whether they realize it or not.",
    takeaway:
      "Redundancy and availability investment are not \"inefficiency\" to be trimmed by default — they're a hedge against a quantifiable, often six-to-seven-figure risk. The skill is balancing this against energy waste, not treating either side as automatically correct.",
    callout: {
      label: "Industry callout",
      text: "\"Cut redundancy to save energy\" and \"never touch redundancy\" are both the wrong default — the right answer depends on what's actually at stake.",
    },
  },
  {
    id: "regression",
    n: 4,
    icon: "target",
    kicker: "4 · Why fixes decay",
    title: "Why Technical Fixes Alone Regress",
    definition:
      "In the same survey data, roughly 4 in 5 operators say their most recent serious outage could have been prevented through better management, process, and configuration — not better hardware.",
    insight:
      "A one-off consolidation project or a single cooling retune is a point-in-time fix. Without an ongoing review mechanism, the same drift that created the original inefficiency — new systems added ad hoc, nobody reviewing utilization — simply starts again.",
    takeaway:
      "A strong recommendation includes not just what to fix, but how the fix stays fixed. That's a governance question, not a technical one.",
    callout: {
      label: "Industry callout",
      text: "This is the direct bridge to governance: technical fixes without process discipline don't hold.",
    },
  },
  {
    id: "iso50001",
    n: 5,
    icon: "recycleLoop",
    kicker: "5 · Embedded governance, concretely",
    title: "ISO 50001 and the PDCA Loop",
    definition:
      "ISO 50001 (Energy Management Systems) is the internationally recognized standard for systematic energy management, built on the Plan-Do-Check-Act (PDCA) cycle: Plan (identify significant energy uses, set targets), Do (implement measures), Check (monitor via KPIs/PUE tracking), Act (review and adjust) — then the loop repeats.",
    insight:
      "This is not an abstract framework — it's a certifiable, audited management system that serious European enterprises actually run, widely adopted across German industry. The older \"Spitzenausgleich\" peak-compensation tax rebate tied to ISO 50001 expired at the end of 2023, but certification remains directly relevant today through the EEG levy limitation (BesAR, via BAFA) and obligations under the 2023 Energy Efficiency Act (EnEfG).",
    takeaway:
      "PDCA is what \"embedding technical efficiency in a governance logic\" actually looks like in practice: a repeating cycle, not a one-time project.",
    callout: {
      label: "Industry callout",
      text: "Figures shift with policy — treat the EEG/EnEfG detail above as current as of the most recent guidance, not a permanent constant.",
    },
  },
  {
    id: "synthesis",
    n: 6,
    icon: "gavel",
    kicker: "6 · Synthesis",
    title: "From Technical Priority to Management Priority",
    definition:
      "A good Route 2 recommendation distinguishes short-term, medium-term, and structural/governance actions — and stays defensible even when the underlying data is incomplete.",
    insight:
      "This is the same decision-under-uncertainty skill Route 1 asked for in its Finance Director pushback, now applied at higher stakes: a full consulting recommendation, not a single justified choice.",
    takeaway:
      "When you build DeltaGrid's recommendation, every lever you prioritize should carry both a time horizon and a reason it survives incomplete information.",
    callout: {
      label: "Industry callout",
      text: "\"We need more data first\" is sometimes right — but it's also the easiest way to avoid ever deciding anything.",
    },
  },
];

// ---------------------------------------------------------------------------
// Scenario Dials — exploratory, never gates anything
// ---------------------------------------------------------------------------
export type DialLevel = 0 | 1 | 2;

export const UTILIZATION_LABELS = ["Low", "Medium", "High"] as const;
export const COOLING_LABELS = ["Legacy", "Mixed", "Modern"] as const;
export const TRANSPARENCY_LABELS = ["None", "Partial", "Full"] as const;

export type Direction = "down2" | "down1" | "flat" | "up1" | "up2";

const DIRECTION_META: Record<Direction, { arrows: string; label: string }> = {
  down2: { arrows: "↓↓", label: "Trending down (strong)" },
  down1: { arrows: "↓", label: "Trending down" },
  flat: { arrows: "→", label: "Roughly flat" },
  up1: { arrows: "↑", label: "Trending up" },
  up2: { arrows: "↑↑", label: "Trending up (strong)" },
};

function bucket(score: number, min: number, max: number): Direction {
  const span = max - min || 1;
  const t = (score - min) / span; // 0..1
  if (t < 0.2) return "down2";
  if (t < 0.4) return "down1";
  if (t < 0.6) return "flat";
  if (t < 0.8) return "up1";
  return "up2";
}

export type DialProjection = {
  energyCostTrend: { arrows: string; label: string };
  riskExposure: { arrows: string; label: string };
  investmentNeeded: { arrows: string; label: string };
};

/** Directional-only projection (per spec: no false-precision numbers). */
export function projectDials(utilization: DialLevel, cooling: DialLevel, transparency: DialLevel): DialProjection {
  const energyScore = (2 - utilization) + (2 - cooling); // 0..4, higher = costs trending up more
  const riskScore = (2 - cooling) + (2 - transparency); // 0..4, higher = more risk exposure
  const investmentScore = (2 - cooling) + (2 - utilization); // 0..4, higher = more investment needed

  const energyDir = bucket(energyScore, 0, 4);
  const riskDir = bucket(riskScore, 0, 4);
  const investDir = bucket(investmentScore, 0, 4);

  return {
    energyCostTrend: DIRECTION_META[energyDir],
    riskExposure: DIRECTION_META[riskDir],
    investmentNeeded: DIRECTION_META[investDir],
  };
}

// ---------------------------------------------------------------------------
// Task 2, Step 2 — Levers, ranking, horizon, first step, info gaps
// ---------------------------------------------------------------------------
export type Horizon2 = "short" | "medium" | "structural";

export type Lever = { id: string; label: string };

export const LEVERS: Lever[] = [
  { id: "consolidate", label: "Consolidate underused physical servers" },
  { id: "monitoring", label: "Establish baseline consumption monitoring" },
  { id: "redundancy", label: "Review redundancy against actual need" },
  { id: "cooling", label: "Modernize airflow/cooling control" },
  { id: "review-cycle", label: "Formalize a regular efficiency review cycle" },
  { id: "decommission", label: "Decommission duplicate/legacy systems with no current need" },
  { id: "scheduling", label: "Introduce workload-aware scheduling to reduce peak draw" },
];

export const REQUIRED_LEVER_COUNT = 4;

export const TASK2 = {
  kicker: "Task 2",
  heading: "The DeltaGrid Case",
  subtext:
    "You're the senior consultant on this engagement. Explore the scenario, then build a prioritized, defensible recommendation.",
  step1: {
    heading: "Step 1 — Scenario Dials",
    instructions:
      "Explore freely — move all three dials to see how DeltaGrid's projected trends shift. This step isn't graded; it's here so your Step 2 recommendation is informed by more than one scenario.",
    utilizationLabel: "Utilization Rate",
    coolingLabel: "Cooling System Age/Efficiency",
    transparencyLabel: "Transparency Level",
  },
  step2: {
    heading: "Step 2 — Structured Analysis",
    leverHeading: "Identify the biggest levers",
    leverInstructions: `Select the ${REQUIRED_LEVER_COUNT} biggest levers for DeltaGrid, and justify each in 1-2 sentences.`,
    rankHeading: "Prioritized recommendation",
    rankInstructions: "Drag to reorder your selected levers — top means highest priority.",
    firstStepHeading: "First step decision",
    firstStepPrompt: "Which lever should DeltaGrid start first?",
    firstStepJustifyLabel: "Justify this from a management perspective",
    firstStepJustifyCaption: "Explain this as you would to DeltaGrid's leadership team, not to a fellow engineer.",
    horizonHeading: "Time-horizon classification",
    horizonInstructions: "For each selected lever, classify when it could realistically happen.",
    infoGapsHeading: "Information gaps",
    infoGapsLabel: "What information would sharpen this recommendation later, and what can responsibly be decided right now despite incomplete data?",
    infoGapsCaption: "Name a specific missing data point, not just \"we need more data.\"",
  },
  export: {
    taskLabel: "Trade-off Analysis",
    docHeading: "Trade-off Analysis — Consulting Recommendation",
    filenameSuffix: "tradeoff-analysis",
  },
} as const;
