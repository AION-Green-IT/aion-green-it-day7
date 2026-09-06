/**
 * Route 1 — The Audit. All learner-facing copy and the pure PUE/radar math
 * live here so components stay presentational. Case used throughout:
 * CoreAxis Data Services (fictional).
 */

import type { IconKey } from "@/lib/routes";
import type { FacilityZoneId } from "@/components/ui/FacilitySvg";

export const LEARNER_NAME_KEY = "learner:name";

// ---------------------------------------------------------------------------
// Store key map — every key this route writes to the shared progress store.
// ---------------------------------------------------------------------------
export const R1 = {
  material: "r1:material",
  pue: {
    facility: "r1:pue:facility",
    it: "r1:pue:it",
  },
  zoneAnswer: (zoneId: string) => `r1:zone:${zoneId}`,
  zoneImpact: (zoneId: string) => `r1:zone:${zoneId}:impact`,
  zoneHorizon: (zoneId: string) => `r1:zone:${zoneId}:horizon`,
  priorityZone: "r1:priority:zone",
  improvementApproach: "r1:priority:approach",
  simBudget: "r1:sim:budget",
  simRisk: "r1:sim:risk",
  simOption: "r1:sim:option",
  simWhy: "r1:sim:why",
  simFollowOn: "r1:sim:followon",
  simRisk1: "r1:sim:risk1",
  simRisk2: "r1:sim:risk2",
  name: LEARNER_NAME_KEY,
} as const;

// ---------------------------------------------------------------------------
// Material — 6 sections. Sections 1/2/3/4/6 are prose + the shared master
// SVG / callouts; section 5 (Monitoring) pairs with a small PUE calculator.
// ---------------------------------------------------------------------------
export type MaterialSectionId = "why-matters" | "anatomy" | "usual-suspects" | "levers" | "monitoring" | "tension";

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
    id: "why-matters",
    n: 1,
    icon: "factory",
    kicker: "1 · Why it matters",
    title: "Why Data Centers Matter",
    definition:
      "Data centers are among the largest single categories of energy consumption in modern IT infrastructure — a single mid-size facility can draw as much power as a small town. That consumption is billed, taxed, reported, and increasingly regulated.",
    insight:
      "Unlike a laptop fleet, a data center's inefficiency doesn't hide in thousands of small devices — it concentrates in one place, on one meter, as one very visible number every month. That makes it one of the highest-leverage places to find real savings, and one of the hardest places to keep ignoring them.",
    takeaway:
      "Every inefficiency you find in this audit has a direct line to a cost center and, increasingly, a regulatory disclosure line — this is not a hypothetical sustainability exercise.",
    callout: {
      label: "Industry callout",
      text: "Facility energy cost is usually IT's largest controllable non-staff operating expense — yet it is frequently owned by facilities, not IT, which is itself part of the problem this route explores.",
    },
  },
  {
    id: "anatomy",
    n: 2,
    icon: "layers",
    kicker: "2 · Anatomy of consumption",
    title: "Anatomy of Consumption",
    definition:
      "A facility's total energy draw splits into IT load (servers, storage, networking — the equipment actually doing computational work) and facility infrastructure load (cooling, power distribution and conversion losses, lighting, redundancy overhead). PUE (Power Usage Effectiveness) is the industry metric that separates these two.",
    insight:
      "The two loads are managed by different teams, bought on different budgets, and almost never reviewed together — which is exactly why the total picture goes unmeasured for years, as you'll see in this audit's case.",
    takeaway:
      "Before recommending any fix, always identify which side of this split it addresses. A cooling fix and a server-consolidation fix attack completely different halves of the bill.",
    callout: {
      label: "Industry callout",
      text: "Idle capacity draws power on both sides of the split at once: an underused server still needs cooling for a load it isn't actually delivering.",
    },
  },
  {
    id: "usual-suspects",
    n: 3,
    icon: "target",
    kicker: "3 · The usual suspects",
    title: "The Usual Suspects: Typical Inefficiencies",
    definition:
      "The same handful of inefficiency patterns recur across most audits: low server utilization with no consolidation, legacy systems left running past their useful purpose, absent or one-off monitoring instead of continuous measurement, over-cooling relative to current thermal guidance, and permanent unused backup/redundant capacity.",
    insight:
      "None of these five require exotic new technology to fix. Every one of them is a known, well-documented pattern with a known category of fix — which is itself the uncomfortable finding: the barrier is rarely technical possibility.",
    takeaway:
      "When you audit a facility, check for these five by name before looking for anything more exotic. They account for most of the gap between a typical facility and a highly optimized one.",
    callout: {
      label: "Industry callout",
      text: "\"We've always run it this way\" is the single most common root cause underneath all five patterns — organizational inertia, not technical limitation.",
    },
  },
  {
    id: "levers",
    n: 4,
    icon: "recycleLoop",
    kicker: "4 · Technical levers",
    title: "Technical Levers for Efficiency",
    definition:
      "Consolidation and virtualization (running more workload on fewer, better-utilized machines), load optimization, decommissioning genuinely unused systems, hot/cold aisle containment, ASHRAE-aligned temperature management, and modern power components (higher-efficiency UPS/PDU hardware) are the standard technical toolkit.",
    insight:
      "These levers sit on different sides of the IT/facility split from Anatomy of Consumption above — consolidation attacks IT load, containment and thermal management attack facility load. A strong recommendation usually needs at least one lever from each side.",
    takeaway:
      "Don't let a single popular lever (usually consolidation) crowd out the others in a recommendation — the largest total saving is almost always a combination, not one silver bullet.",
    callout: {
      label: "Industry callout",
      text: "Hot/cold aisle containment is frequently the cheapest lever on this list relative to its impact, because it's a physical-layout fix, not a hardware purchase.",
    },
  },
  {
    id: "monitoring",
    n: 5,
    icon: "shield",
    kicker: "5 · Why monitoring is the foundation",
    title: "Why Monitoring Is the Foundation",
    definition:
      "PUE (Power Usage Effectiveness), formalized by The Green Grid, is the industry-standard metric: PUE = Total Facility Energy ÷ IT Equipment Energy. A PUE of 1.0 would mean zero facility overhead — every watt goes to computing. As of the most recent industry survey (Uptime Institute, 2024), the global average has been flat at roughly 1.55–1.59 for several years, landing at 1.56 — barely moving in five years despite available optimization technology. Hyperscale facilities, by contrast, commonly report 1.1–1.2.",
    insight:
      "That gap between 1.56 and 1.1–1.2 is not a technology gap — the same cooling and power techniques are available to everyone. It is a measurement and organizational-priority gap: hyperscale operators track PUE continuously and act on it; most other facilities do not track it at all.",
    takeaway:
      "You cannot improve what you do not continuously measure. A single walkthrough reading is a snapshot, not monitoring — treat any facility without continuous PUE tracking as one whose efficiency claims cannot yet be verified.",
    callout: {
      label: "Worked example",
      text: "A facility drawing 180 kW total, with IT equipment drawing 120 kW: PUE = 180 ÷ 120 = 1.5. Try the numbers yourself below.",
    },
  },
  {
    id: "tension",
    n: 6,
    icon: "gavel",
    kicker: "6 · The core tension",
    title: "The Core Tension",
    definition:
      "The Uptime Institute's Tier Classification (I–IV) describes data center redundancy architecture. Learners will still encounter the commonly-cited availability shorthand — 99.671% / 99.741% / 99.982% / 99.995% for Tiers I–IV — but Uptime Institute formally removed these percentages from the official Tier Standard in 2009, because operational discipline affects real-world uptime more than physical design alone. A poorly-run Tier IV facility can perform like a Tier I.",
    insight:
      "This is direct validation of the lesson underneath this whole route: classification and redundancy describe design capability, not a performance guarantee, and every efficiency decision here trades off against availability, redundancy, and investment size — with no universally \"correct\" balance, only one that matches the actual workload's need.",
    takeaway:
      "When you recommend cutting redundancy or aggressively re-tuning cooling, always name what it trades against (availability risk, investment, speed of payback) — a recommendation that ignores the trade-off isn't a complete recommendation.",
    callout: {
      label: "Industry callout",
      text: "ASHRAE's recommended inlet-temperature envelopes (Class A1/A2) have widened over successive revisions specifically to enable more free-cooling hours — many operators still cool to decade-old, stricter setpoints out of habit.",
    },
  },
];

// ---------------------------------------------------------------------------
// Section 5 — PUE worked-example calculator
// ---------------------------------------------------------------------------
export function calcPue(facilityKw: number, itKw: number): number {
  if (itKw <= 0) return 0;
  return facilityKw / itKw;
}

export const PUE_BENCHMARKS = {
  globalAverage: 1.56,
  hyperscaleLow: 1.1,
  hyperscaleHigh: 1.2,
} as const;

// ---------------------------------------------------------------------------
// Case brief — CoreAxis Data Services (Task 1a + 1b)
// ---------------------------------------------------------------------------
export const CASE_BRIEF = {
  company: "CoreAxis Data Services",
  setup:
    "CoreAxis Data Services runs a mid-size facility that grew organically over roughly a decade, serving internal and external workloads. No one has ever run a full technical efficiency audit. The only visible symptom leadership can point to is rising energy cost — you're the junior infrastructure efficiency consultant sent to find out why.",
  facts: [
    "Average server utilization across CoreAxis's 40-rack floor is measured at 18%, but no server has been powered down or consolidated in over 3 years.",
    "The facility runs a flat 18°C (64°F) supply-air setpoint sitewide, with no hot/cold aisle containment — set a decade ago and never revisited.",
    "CoreAxis's most recent PUE reading, taken informally last year, was 1.9 — well above the 1.56 global average and far from the ~1.1–1.2 hyperscale benchmark.",
    "There is no continuous PUE or sub-metering in place; the 1.9 reading came from a one-off consultant walkthrough, not ongoing monitoring.",
    "CoreAxis operates every circuit at Tier IV-equivalent 2N redundancy, including two internal-only development racks with no uptime SLA.",
    "Decommissioning a server currently requires sign-off from three different teams and takes an average of 11 weeks — most requests are simply never filed.",
  ],
} as const;

// ---------------------------------------------------------------------------
// Master SVG zones — shared across Materi (read-only facts) and Task 1a
// (forced-choice diagnostic). Each zone's `fact` mirrors CASE_BRIEF.facts.
// ---------------------------------------------------------------------------
export type ZoneId = FacilityZoneId;

export type ZoneChoice = { id: string; label: string };

export type Zone = {
  id: ZoneId;
  n: number;
  label: string;
  fact: string;
  question: string;
  choices: ZoneChoice[];
};

export const ZONES: Zone[] = [
  {
    id: "utilization",
    n: 1,
    label: "Server & Utilization",
    fact: CASE_BRIEF.facts[0],
    question: "18% average utilization with no consolidation in 3 years. What's the most useful next diagnostic step?",
    choices: [
      { id: "consolidate", label: "Run a workload consolidation and virtualization assessment before buying any new hardware." },
      { id: "wait", label: "Assume utilization will naturally improve as workloads grow — no action needed yet." },
      { id: "replace", label: "Replace ageing servers with newer, faster ones at the same count." },
    ],
  },
  {
    id: "cooling",
    n: 2,
    label: "Cooling & Airflow",
    fact: CASE_BRIEF.facts[1],
    question: "A flat 18°C setpoint with no containment, unchanged for a decade. What does this most likely indicate?",
    choices: [
      { id: "overcooling", label: "The facility is over-cooling relative to what modern ASHRAE guidance allows." },
      { id: "efficient", label: "18°C is already at the efficient edge of ASHRAE's envelope — nothing to revisit." },
      { id: "irrelevant", label: "Cooling setpoint has no meaningful effect on overall facility PUE." },
    ],
  },
  {
    id: "power",
    n: 3,
    label: "Power Infrastructure",
    fact: CASE_BRIEF.facts[2],
    question: "A PUE of 1.9 against a 1.56 global average and ~1.1–1.2 hyperscale benchmark. How should this figure be read?",
    choices: [
      { id: "gap", label: "It signals real, quantifiable room for facility-infrastructure efficiency gains, not just IT-side savings." },
      { id: "itonly", label: "PUE only measures IT equipment efficiency, so this doesn't say anything about the facility." },
      { id: "normal", label: "Since 1.9 is common industry-wide, no action is warranted." },
    ],
  },
  {
    id: "monitoring",
    n: 4,
    label: "Transparency & Monitoring",
    fact: CASE_BRIEF.facts[3],
    question: "The only PUE figure CoreAxis has ever produced came from a single consultant walkthrough, not ongoing measurement. What's the core problem here?",
    choices: [
      { id: "cant-verify", label: "Without continuous monitoring, no one can tell whether any future efficiency initiative actually worked." },
      { id: "same", label: "A one-off reading is just as reliable as continuous monitoring for a facility this size." },
      { id: "cost-only", label: "Monitoring is a cost center with no direct efficiency benefit of its own." },
    ],
  },
  {
    id: "redundancy",
    n: 5,
    label: "Redundancy",
    fact: CASE_BRIEF.facts[4],
    question: "Every circuit runs at Tier IV-equivalent 2N redundancy, including two internal dev racks with no uptime SLA. What does this reveal?",
    choices: [
      { id: "mismatch", label: "Redundancy level should match actual workload criticality — applying the highest tier everywhere is a cost/efficiency mismatch, not a safety virtue." },
      { id: "always-max", label: "Maximum redundancy everywhere is always the correct default for any data center." },
      { id: "no-link", label: "Redundancy level has no relationship to PUE or energy efficiency." },
    ],
  },
  {
    id: "operations",
    n: 6,
    label: "Operating Model",
    fact: CASE_BRIEF.facts[5],
    question: "Decommissioning needs three teams' sign-off and takes 11 weeks on average, so most requests are never filed. What kind of inefficiency is this?",
    choices: [
      { id: "process", label: "An organizational/process inefficiency, not a technical one — it causes unused hardware to keep drawing power indefinitely." },
      { id: "ticketing", label: "This is purely an IT ticketing problem with no energy consequence." },
      { id: "hardware", label: "This is a technical limitation of the hardware itself." },
    ],
  },
];

// ---------------------------------------------------------------------------
// Task 1a — Categorization & Prioritization panel
// ---------------------------------------------------------------------------
export type ImpactType = "technical" | "governance";
export type Horizon = "short" | "medium";

export const TASK1A = {
  kicker: "Task 1a",
  heading: "Diagnostic Mapping",
  subtext:
    "You're CoreAxis's junior infrastructure efficiency consultant. Click every zone on the facility map, reason through what's actually happening, then categorize and prioritize your findings.",
  step1: {
    heading: "Step 1 — Facility Map Diagnostic",
    instructions:
      "Click every zone on the CoreAxis Facility Map. Each one asks a short diagnostic question — there's no instant right or wrong, just your reasoning, so answer honestly and move on.",
  },
  step2: {
    heading: "Step 2 — Categorization & Prioritization",
    instructions:
      "For every zone, classify what kind of fix it needs and how soon. Then pick the one zone you'd prioritize first, and describe the improvement approach you'd actually propose.",
    impactLabel: "Is this primarily a technical fix, or a governance/architectural one?",
    horizonLabel: "Could this realistically start short-term, or does it need medium-term planning?",
    priorityLabel: "If CoreAxis could only fund one fix first, which zone should it be?",
    approachLabel: "Describe the improvement approach for your top priority",
    approachCaption: "Name the concrete action and why it should go first — not a restatement of the problem.",
  },
  export: {
    taskLabel: "Diagnostic Mapping",
    docHeading: "Diagnostic Mapping — Audit Report",
    filenameSuffix: "audit-mapping",
  },
} as const;

// ---------------------------------------------------------------------------
// Task 1b — Priority Simulator
// ---------------------------------------------------------------------------
export type SimLevel = "low" | "med" | "high";
export type SimOptionId = "consolidation" | "cooling" | "monitoring";

export type RadarAxisId = "savings" | "feasibility" | "risk" | "investment" | "speed" | "leverage";

export const RADAR_AXES: { id: RadarAxisId; label: string }[] = [
  { id: "savings", label: "Energy Savings Potential" },
  { id: "feasibility", label: "Implementation Feasibility" },
  { id: "risk", label: "Risk" },
  { id: "investment", label: "Investment Required" },
  { id: "speed", label: "Speed of Visible Impact" },
  { id: "leverage", label: "Strategic Leverage" },
];

export type SimOption = {
  id: SimOptionId;
  label: string;
  headline: string;
  detail: string;
  scores: Record<RadarAxisId, number>;
  color: string;
  note: string;
};

export const SIM_OPTIONS: SimOption[] = [
  {
    id: "consolidation",
    label: "A) Consolidation & Virtualization",
    headline: "Fast to justify, moderate ceiling",
    detail: "Consolidate underused physical servers onto fewer, better-utilized virtualized hosts.",
    scores: { savings: 4, feasibility: 4, risk: 2, investment: 3, speed: 3, leverage: 3 },
    color: "#0E7A5A",
    note:
      "Consolidation moves fast and is easy to greenlight, but its savings ceiling is lower than a full modernization play — check whether it buys enough runway before the next budget cycle.",
  },
  {
    id: "cooling",
    label: "B) Cooling & Airflow Modernization",
    headline: "Largest upside, slowest and priciest",
    detail: "Rework hot/cold aisle containment and thermal setpoints against current ASHRAE guidance.",
    scores: { savings: 5, feasibility: 2, risk: 4, investment: 5, speed: 2, leverage: 3 },
    color: "#B87514",
    note:
      "Cooling modernization has the single largest efficiency upside here, but it's the slowest and priciest to justify without hard baseline numbers — expect this to need strong executive sponsorship.",
  },
  {
    id: "monitoring",
    label: "C) Systematic Monitoring & Transparency",
    headline: "Lowest direct savings, highest leverage",
    detail: "Install continuous PUE and sub-metering so every future initiative can actually be verified.",
    scores: { savings: 2, feasibility: 5, risk: 1, investment: 1, speed: 4, leverage: 5 },
    color: "#5E6670",
    note:
      "Monitoring alone won't cut a single kWh, but it's what makes every future efficiency claim defensible — many real consulting engagements start here precisely because it de-risks whatever comes next.",
  },
];

export const TASK1B = {
  kicker: "Task 1b",
  heading: "Priority Simulator",
  subtext:
    "CoreAxis can fund only one initiative this cycle. Explore the trade-offs, then commit to one option and defend it.",
  scenario:
    "Budget is limited, IT operations is risk-averse, the data you gathered in Task 1a is still incomplete, and management wants a visible cost and sustainability impact.",
  step1: {
    heading: "Step 1 — Set the constraints",
    instructions: "Move both sliders to reflect CoreAxis's real constraints, and watch how the radar shifts emphasis.",
    budgetLabel: "Budget Available",
    riskLabel: "Risk Tolerance",
    chartCaption:
      "Risk and Investment Required are cost-like axes — a bigger spike there means more of that cost, not a better score. The sliders re-weight how much each cost-like axis should count right now.",
  },
  step2: {
    heading: "Step 2 — Commit and justify",
    instructions: "Pick the one option CoreAxis should fund, then justify it the way you'd defend it in the room.",
    whyLabel: "Why this choice, given the constraints above?",
    whyCaption: "Reference the actual budget/risk settings you chose — not a generic preference.",
    followOnLabel: "What follow-on decision does this choice create?",
    followOnCaption: "Name the next decision this forces CoreAxis to make, not just the immediate next step.",
    risk1Label: "Risk 1 if this turns out to be the wrong first move",
    risk2Label: "Risk 2 if this turns out to be the wrong first move",
    riskCaption: "Be concrete about the consequence, not just the topic.",
  },
  export: {
    taskLabel: "Priority Simulator",
    docHeading: "Priority Simulator — Decision Report",
    filenameSuffix: "priority-decision",
  },
} as const;
