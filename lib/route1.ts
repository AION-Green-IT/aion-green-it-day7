/**
 * Route 1 — Foundations. All learner-facing copy and pure data/math for
 * Day 7 live here so components stay presentational. Case used throughout:
 * GreenStack Hosting (fictional).
 */

import type { IconKey } from "@/lib/routes";
import { materialAnchorId, type MaterialRef } from "@/lib/materialAnchor";

export const LEARNER_NAME_KEY = "learner:name";

// ---------------------------------------------------------------------------
// Store key map — every key this route writes to the shared progress store.
// ---------------------------------------------------------------------------
export const R1 = {
  name: LEARNER_NAME_KEY,
  pue: {
    facility: "r1:pue:facility",
    it: "r1:pue:it",
  },
  stageA: {
    category: (itemId: string) => `r1:a:cat:${itemId}`,
  },
  stageB: {
    verdict: (claimId: string) => `r1:b:verdict:${claimId}`,
  },
  stageC: {
    selected: (aspectId: string) => `r1:c:sel:${aspectId}`,
    justification: (aspectId: string) => `r1:c:just:${aspectId}`,
  },
  stageD: {
    placement: (itemId: string) => `r1:d:place:${itemId}`,
  },
} as const;

// ---------------------------------------------------------------------------
// Material — 5 blocks, each pairing prose with an interactive/visual element.
// ---------------------------------------------------------------------------
export type MaterialSectionId = "anatomy" | "pathways" | "accounting" | "benchmarks" | "blindspots" | "audit-method";

export type MaterialSection = {
  id: MaterialSectionId;
  n: 1 | 2 | 3 | 4 | 5 | 6;
  icon: IconKey;
  kicker: string;
  title: string;
  definition: string;
  insight: string;
  takeaway: string;
  /** Decision rules phrased the way Task 1 needs them — including the rule that rules out the plausible wrong answer. */
  reasoning: string[];
  callout: { label: string; text: string };
};

export const MATERIAL: MaterialSection[] = [
  {
    id: "anatomy",
    n: 1,
    icon: "factory",
    kicker: "1 · The energy chain",
    title: "Anatomy of a Data Centre's Energy Flow & the PUE Formula",
    definition:
      "Grid power entering a data centre travels a fixed chain before any of it does useful computing work: incoming grid supply → primary switchgear → the UPS (uninterruptible power supply) → PDUs (power distribution units) → and only then does it split into IT load (servers, storage, network gear) and facility overhead (cooling plant, lighting, building and security systems).",
    insight:
      "The UPS is typically the single largest efficiency loss point in that chain — modern double-conversion systems commonly lose 3–6% to the AC–DC–AC conversion and battery buffering alone, before power has reached a single server. PDUs add a further 1–2% loss on top of that. Neither loss shows up anywhere except in the gap between what the grid delivers and what IT equipment actually receives.",
    takeaway:
      "PUE (Power Usage Effectiveness) is the industry's formal name for that gap: PUE = Total Facility Energy ÷ IT Equipment Energy, where Total Facility Energy = IT Equipment Energy + Cooling + Power Delivery Losses + Lighting + Other Facility Loads. It was introduced by [The Green Grid consortium](https://www.thegreengrid.org/en/resources/library-and-tools/20-PUE:-A-Comprehensive-Examination-of-the-Metric) in 2007 as an industry attempt to standardise overhead-efficiency communication, and was later formalised into [ISO/IEC 30134-2:2016](https://www.iso.org/standard/63451.html) — giving it audit-grade legitimacy beyond marketing use.",
    reasoning: [
      "PUE = Total Facility Energy ÷ IT Equipment Energy. If a claim is about how much incoming power reaches useful IT work rather than being lost to overhead, PUE speaks to it directly — that claim can be Supported.",
      "PUE is a ratio, not a total. Any claim about absolute energy, total footprint, or \"consuming less\" is something a PUE figure alone cannot support, however much it improves.",
      "UPS and PDU losses sit physically between the grid and the servers. They are measured, not decided — so findings about them are a Technical topic, and evidence about them sorts under Metrics or Energy Source, never Governance.",
    ],
    callout: {
      label: "The trap this whole route is built around",
      text: "PUE is a ratio, not an absolute consumption figure. A facility reporting PUE 1.3 can still consume far more total energy than one reporting PUE 1.6, if the first simply hosts much more IT load. A \"good\" PUE says nothing about total energy footprint, utilisation efficiency, or the carbon intensity of the electricity being used.",
    },
  },
  {
    id: "pathways",
    n: 2,
    icon: "supplier",
    kicker: "2 · Sourcing renewable energy",
    title: "Five Pathways to Renewable Energy Integration",
    definition:
      "\"We run on renewable energy\" can mean five structurally different things in practice, each with a different level of physical control and a different achievable scale: on-site generation, Power Purchase Agreements (PPAs), Guarantees of Origin (GoOs), utility green tariffs, and site selection.",
    insight:
      "On-site generation (solar PV, on-site wind, fuel cells) is physically simplest to defend as \"green\" since the electrons are locally sourced — but it rarely covers 100% of hyperscale load, constrained by space and intermittency. PPAs are long-term contracts (often 10–20 years) with a renewable generator, and come in two forms: physical PPAs, where electrons are delivered into the buyer's own grid region, and virtual/financial PPAs (a contract-for-difference), where the generator's output is sold into the wholesale grid and the buyer instead receives certificates plus a financial hedge against power-price volatility. This is the primary mechanism hyperscalers such as Google and Microsoft use to scale renewable procurement to gigawatt levels.",
    takeaway:
      "[Guarantees of Origin](https://www.aib-net.org/eecs) (GoOs — the EU equivalent of RECs in the US) are tradable certificates, each representing 1 MWh of renewable generation, purchased entirely separately from the physical electricity supply contract. That separation is what lets a company claim \"100% renewable\" on paper independent of the actual grid mix at its site — and it is why the [GHG Protocol Scope 2 Guidance (2015)](https://ghgprotocol.org/sites/default/files/2022-12/Scope2_ExecSum_Final.pdf) requires two parallel reporting methods: location-based (the average emissions factor of the local grid) and market-based (reflecting contractual instruments like GoOs, RECs, and PPAs). The same facility can report very different \"green\" figures depending on which method is emphasised.",
    reasoning: [
      "\"100% renewable\" names one of five mechanisms of very different strength: on-site generation and physical PPAs move real electrons; GoOs and green tariffs are contractual instruments; site selection changes which grid you draw from in the first place.",
      "If a statement describes what was bought, contracted, or supplied, it sorts under Energy Source — whether the mechanism is physical or paper. The paper-vs-physics judgement is a Credibility question that comes later, not a re-sorting.",
      "Market-based accounting (GoOs, RECs, PPAs) and location-based accounting (the actual local grid mix) can produce very different \"green\" figures for the same facility. Any claim that doesn't say which method produced it is, at best, Partially Supported.",
    ],
    callout: {
      label: "Worked comparison",
      text: "Utility green tariffs (buying a \"green tariff\" from a supplier, typically bundled with GoOs) and site selection (choosing locations with a naturally high renewable grid share, e.g. Nordic hydro/wind) round out the five — see the comparison below for how much direct control each pathway gives you versus how much of a large facility's load it can realistically cover.",
    },
  },
  {
    id: "accounting",
    n: 3,
    icon: "certificate",
    kicker: "3 · Paper vs. physics",
    title: "Accounting Reality vs. Physical Reality",
    definition:
      "Annual/aggregate certificate matching allows a data centre running 24/7 in a coal-heavy grid region to purchase solar certificates generated at midday in a sunny region, and legitimately call itself \"100% renewable\" under market-based accounting — even though at 2 a.m. it is physically drawing power that is close to 100% fossil-based.",
    insight:
      "This is legal under current Scope 2 methodology, but it has drawn sustained criticism from energy researchers for lacking [\"additionality\"](https://perspectives.se.com/renewable-energy/what-you-need-to-know-about-additionality) (does the purchase cause new renewable capacity to be built?) and \"temporal matching\" (does the renewable generation actually coincide with the hour of consumption?). A certificate bought for its calendar-year total says nothing about what was on the wire at the moment the servers were drawing power.",
    takeaway:
      "Google's [24/7 Carbon-Free Energy (CFE) initiative](https://sustainability.google/reports/247-carbon-free-energy/), publicly reported since roughly 2020, is the industry's most rigorous alternative: matching renewable generation to actual hourly consumption in each specific grid region, rather than annual aggregate matching — explicitly designed to close this accounting-vs-physical gap. Treat any \"100% renewable\" claim as a claim about accounting until you know which matching standard produced it.",
    reasoning: [
      "Annual certificate matching can be fully legitimate under Scope 2 and still be physically wrong hour by hour. So any claim containing \"always,\" \"at every hour,\" or \"physically powered by\" is Not Supported by an annual certificate — the certificate simply doesn't speak to that.",
      "Two words decide how strong a renewable claim is: additionality (did the purchase cause new capacity to be built?) and temporal matching (did the generation actually coincide with consumption?). A claim missing either is a Credibility gap, not an Energy Source one.",
      "\"Renewable share transparency\" as an audit gap means: what share of actual consumption was renewable, and when — not how much was certificated. If a case only ever reports certificates, that gap is live.",
    ],
    callout: {
      label: "Industry callout",
      text: "\"Additionality\" and \"temporal matching\" are the two words to listen for in any renewable-energy claim — their absence is exactly what makes annual certificate matching cheaper, and exactly what makes it weaker evidence, than hourly matching.",
    },
  },
  {
    id: "benchmarks",
    n: 4,
    icon: "gavel",
    kicker: "4 · Benchmarks and the law",
    title: "Interpreting PUE: Benchmarks and Regulatory Reality",
    definition:
      "The [Uptime Institute Global Data Center Survey](https://uptimeinstitute.com/resources/research-and-reports/uptime-institute-global-data-center-survey-results-2025) has tracked the industry-average reported PUE declining from roughly 2.5 in 2007 to plateauing around 1.55–1.58 in recent survey years (2020–2023) — diminishing returns on the easy efficiency gains at industry scale. Purpose-built hyperscale facilities (Google, Microsoft, Meta) report fleet-wide average PUEs often in the 1.1–1.2 range, achieved through custom cooling (free cooling, direct liquid cooling) and scale effects unavailable to smaller or legacy operators.",
    insight:
      "Germany's [Energieeffizienzgesetz (EnEfG)](https://www.gesetze-im-internet.de/enefg/), in force since 18 November 2023 (BGBl. 2023 I Nr. 309), is currently the strictest data centre efficiency law in Europe. Under the originally enacted thresholds ([§11 EnEfG](https://www.gesetze-im-internet.de/enefg/__11.html)): existing data centres (commissioned before 1 July 2026) must reach an annual-average PUE of ≤1.5 from 1 July 2027, tightening to ≤1.3 from 1 July 2030; new data centres (commissioned on or after 1 July 2026) must reach ≤1.2 within two years of commissioning. The law also mandates minimum waste-heat reuse quotas (10% from July 2026, 15% from July 2027, 20% from July 2028) and mandatory ISO 50001/EMAS energy management systems by 1 July 2025.",
    takeaway:
      "Even hard law evolves under industry pressure: a draft amendment published 9 April 2026 by the German Federal Ministry for Economic Affairs and Energy proposes easing these thresholds — existing data centres to ≤1.6 (2027) and ≤1.4 (2030), new data centres to ≤1.3 — reflecting pushback on implementation costs. As of this material's writing, the original 2023 thresholds remain the enacted law; the amendment is only a draft. Treat this as a live example of the tension between ambition and feasibility in sustainability regulation, not as a settled outcome.",
    reasoning: [
      "A PUE number means nothing without a benchmark: ~1.55–1.58 is the industry average, 1.1–1.2 is purpose-built hyperscale, 2.0+ is poor legacy. \"Improved from 1.7 to 1.4\" is only impressive once you say against what.",
      "German EnEfG sets binding PUE thresholds and waste-heat reuse quotas — which is why waste-heat reuse is a legitimate audit gap for an EU facility rather than an exotic extra, and why regulatory exposure is a Cost and Credibility topic, not just a technical one.",
      "When the law is in flux, cite what is currently enacted and flag the draft separately. Presenting a proposed easing as if it were settled law is itself a credibility failure of exactly the kind this route audits.",
    ],
    callout: {
      label: "Regulatory watch",
      text: "The gauge below defaults to the 2023 enacted thresholds. Toggle it to see the 9 April 2026 draft amendment's proposed easing side by side — and note which one is actually law right now.",
    },
  },
  {
    id: "blindspots",
    n: 5,
    icon: "target",
    kicker: "5 · What the number hides",
    title: "What PUE Does Not Tell You",
    definition:
      "PUE captures exactly one thing precisely: the ratio of total facility energy to IT equipment energy. Everything else in a sustainability claim has to come from somewhere else.",
    insight:
      "A data centre can report an excellent PUE of 1.1 while running on 100% coal power — PUE says nothing about the electricity source, and the same PUE value can represent very different carbon footprints depending on location. A facility full of idle, under-utilised servers can still report a \"good\" PUE, because PUE only measures the ratio of facility overhead to whatever IT load exists, not whether that IT load is being used efficiently. Cooling strategies that lower PUE — evaporative cooling, for instance — can significantly increase water consumption, a cost captured only by a separate metric, [WUE (Water Usage Effectiveness)](https://www.iso.org/standard/77692.html). And PUE says nothing about total footprint or embodied carbon: emissions embedded in building materials, hardware manufacturing, or total absolute energy draw.",
    takeaway:
      "The professional companion metric is [REF (Renewable Energy Factor)](https://www.iso.org/standard/66127.html), standardised in ISO/IEC 30134-3, which — unlike PUE — directly measures the proportion of renewable energy used. A mature sustainability assessment reports PUE and REF together, never PUE alone.",
    reasoning: [
      "PUE is silent on five things: electricity source, utilisation, water, embodied carbon, and total absolute energy. Every one of those silences is a candidate gap in a PUE-led claim — that is where Stage C's shortlist comes from.",
      "A claim that a facility is \"more sustainable overall\" asks PUE to cover ground it cannot. That is the classic Partially Supported case: real evidence, but not enough of it.",
      "A claim purely about utilisation or idle capacity is Not Supported by PUE at all — PUE is a ratio against whatever IT load exists, efficiently used or not.",
      "Name the companion metric when you name the gap: REF (ISO/IEC 30134-3) answers the renewable question, WUE the water question. A gap with a named metric is an actionable finding; a gap without one is a complaint.",
    ],
    callout: {
      label: "Every silence here is a candidate gap",
      text: "GreenStack Hosting, the case you're about to audit, leans almost entirely on PUE for its sustainability story. Everything in this block is a candidate gap in that story — keep the five in mind as you read the case brief.",
    },
  },
  {
    id: "audit-method",
    n: 6,
    icon: "layers",
    kicker: "6 · The audit method",
    title: "Six Lenses, Two Sides, and What Counts as a Gap",
    definition:
      "Auditing a claim starts by sorting mixed evidence into the lens that actually explains it. Six lenses cover almost everything a data centre claim rests on: Energy Source (where the electricity comes from, physically or contractually), Operating Model (how the facility actually runs day to day — load patterns, seasonality, team structure, internal data flows), Metrics (what is measured, how, and what instrumentation exists or is missing), Communication (what gets said publicly or to management, and who approves it), Cost (money — spend, pricing, premiums, financial commitments, payback), and Credibility (how far a claim can be trusted — independent verification, disclosure completeness, ambiguous definitions).",
    insight:
      "Sorting is not busywork: it decides whose desk a finding lands on. That is the second cut — every finding is either a Technical topic (a physical, measurable fact about the systems or the workload; someone measures or engineers it) or a Management & Governance topic (a decision, a policy, an oversight or communication choice; someone decides it). A missing sub-meter is technical. Deciding not to publish the number that sub-meter would produce is governance. The same case fact can generate one of each, and mixing the two is why audit findings so often land on the wrong desk.",
    takeaway:
      "Judging the claim itself needs a third discipline: a verdict standard. Supported means the data you have directly and fully backs the claim. Not Supported means the data says nothing that backs it, or points the other way. Partially Supported means the data is real evidence toward the claim but cannot carry it alone. Finally, a gap is only material if closing it could change a verdict — for a PUE-led claim the recurring candidates are renewable-share transparency, grid carbon intensity, utilisation rate, water usage (WUE), load-profile granularity (consumption broken down by time period and system, not one annual total), cost per workload, third-party verification, and waste-heat reuse.",
    reasoning: [
      "Sorting evidence: ask what the sentence is about, not what it implies. \"We bought certificates\" is Energy Source even though it affects credibility; \"nobody outside has checked it\" is Credibility even though it concerns metrics.",
      "Energy Source covers physical supply and contractual sourcing alike. Metrics is about measurement itself — a number, a trend, or a missing instrument. Operating Model is what would still be true if the company never made a claim at all.",
      "Communication is only ever about what is said outward or upward, and who signs it off — never a property of the facility itself. Cost is any statement whose subject is money. Credibility is about how far a claim survives being questioned.",
      "Technical vs. Governance: ask \"is this measured, or decided?\" Measured or physical → Technical. Decided, approved, published, or owned by someone → Governance.",
      "Verdicts: Supported needs the data to carry the whole claim. If the claim adds anything the data cannot speak to — source, utilisation, total footprint — it drops to Partially Supported. If the data is simply silent, or contradicts it, that is Not Supported.",
      "Choosing gaps: prefer the gap that attacks the specific claim being made over the generally interesting metric. A gap that wouldn't change anyone's verdict isn't a finding, it's trivia.",
    ],
    callout: {
      label: "Bridge into Task 1",
      text: "Stage A uses the six lenses, Stage B the verdict standard, Stage C the materiality test, and Stage D the technical/governance split. Every choice the task offers you is named in this block — if a category feels unfamiliar in the task, this is the block to come back to.",
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
// PUE worked-example calculator + benchmark constants (Block 1 / Block 4)
// ---------------------------------------------------------------------------
export function calcPue(facilityKw: number, itKw: number): number {
  if (itKw <= 0) return 0;
  return facilityKw / itKw;
}

export const PUE_BENCHMARKS = {
  theoreticalMin: 1.0,
  hyperscaleLow: 1.1,
  hyperscaleHigh: 1.2,
  industryAverageLow: 1.55,
  industryAverageHigh: 1.58,
  legacyPoor: 2.0,
} as const;

export type EnEfGThresholds = {
  existing2027: number;
  existing2030: number;
  newFacility: number;
};

export const ENEFG_2023_ENACTED: EnEfGThresholds = {
  existing2027: 1.5,
  existing2030: 1.3,
  newFacility: 1.2,
};

export const ENEFG_2026_DRAFT: EnEfGThresholds = {
  existing2027: 1.6,
  existing2030: 1.4,
  newFacility: 1.3,
};

// ---------------------------------------------------------------------------
// Pathway comparison (Block 2) — qualitative, illustrative indicators only;
// deliberately not dressed up as precise statistics.
// ---------------------------------------------------------------------------
export type PathwayLevel = "low" | "medium" | "high";

export type Pathway = {
  id: string;
  label: string;
  detail: string;
  control: PathwayLevel;
  scale: PathwayLevel;
  scaleLabel: string;
  /** A real-world explainer for this pathway — not the case study, an outside reference. */
  reference: { label: string; url: string };
};

export const PATHWAYS: Pathway[] = [
  {
    id: "onsite",
    label: "On-site generation",
    detail: "Solar PV, on-site wind, fuel cells — locally sourced electrons.",
    control: "high",
    scale: "low",
    scaleLabel: "Rarely covers 100% of hyperscale load",
    reference: { label: "Blue Pearl Energy — On-site renewable generation", url: "https://www.bluepearlenergy.com/en/on-site-renewable-energy-generation/" },
  },
  {
    id: "ppa",
    label: "Power Purchase Agreements",
    detail: "Physical or virtual/financial, 10–20 year contracts with a generator.",
    control: "medium",
    scale: "high",
    scaleLabel: "Scales to gigawatt-level procurement",
    reference: { label: "Urban Grid — Types of PPAs for offsite renewable projects", url: "https://www.urbangridsolar.com/types-of-power-purchase-agreements-for-offsite-renewable-energy-projects/" },
  },
  {
    id: "goo",
    label: "Guarantees of Origin",
    detail: "Certificates bought separately from the physical power contract.",
    control: "low",
    scale: "high",
    scaleLabel: "Can cover 100% of load on paper",
    reference: { label: "Greenpower.ch — How Guarantees of Origin work", url: "https://www.greenpower.ch/services-view/guarantees-of-origin-how-it-works/" },
  },
  {
    id: "tariff",
    label: "Utility green tariffs",
    detail: "A green tariff from your supplier, usually bundled with GoOs.",
    control: "low",
    scale: "medium",
    scaleLabel: "Bounded by the supplier's offering",
    reference: { label: "World Resources Institute — Utility Green Tariffs", url: "https://www.wri.org/initiatives/utility-green-tariffs" },
  },
  {
    id: "site",
    label: "Site selection",
    detail: "Locating in a grid region with naturally high renewable share.",
    control: "medium",
    scale: "medium",
    scaleLabel: "Depends entirely on where you can build",
    reference: { label: "Deerns — Data Centre Site Selection", url: "https://www.deerns.com/data-center-site-selection/" },
  },
];

// ---------------------------------------------------------------------------
// Case brief — GreenStack Hosting (Task 1)
// ---------------------------------------------------------------------------
export const CASE_BRIEF = {
  company: "GreenStack Hosting",
  setup:
    "GreenStack Hosting operates its own data centre and communicates externally that it is \"highly sustainable.\" Its evidence: certified green electricity purchases and an improved PUE value over the past two years. At the same time: strong seasonal load fluctuations, little transparency about individual consumption areas, heavy management reliance on the PUE figure for external communication, and Finance questioning the economic viability of the chosen approach.",
  role:
    "Your role: sustainability analyst. Audit this claim the way a professional would — systematically, not on gut feeling.",
} as const;

// ---------------------------------------------------------------------------
// Stage A — Evidence Sorter: 6 categories, 12 statements
// ---------------------------------------------------------------------------
export type CategoryId = "energy-source" | "operating-model" | "metrics" | "communication" | "cost" | "credibility";

export const CATEGORIES: { id: CategoryId; label: string; domain: string }[] = [
  { id: "energy-source", label: "Energy Source", domain: "where the electricity physically comes from or how it's contractually sourced — grid mix, PPA, GoO, on-site generation" },
  { id: "operating-model", label: "Operating Model", domain: "how the facility actually runs day to day — workload patterns, internal processes, team structure" },
  { id: "metrics", label: "Metrics", domain: "a measurement, a number, or an instrumentation gap — not a source of energy or a public statement" },
  { id: "communication", label: "Communication", domain: "what gets said publicly or internally about the facility, not a fact about the facility itself" },
  { id: "cost", label: "Cost", domain: "money — spend, pricing, financial commitments, or payback" },
  { id: "credibility", label: "Credibility", domain: "how trustworthy or verifiable a claim is — independent checks, disclosure completeness, ambiguity" },
];

export type EvidenceItem = {
  id: string;
  text: string;
  correctCategory: CategoryId;
  clue: string;
};

export const EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: "ev-goo",
    text: "GreenStack purchases Guarantees of Origin to cover 100% of its annual electricity consumption on paper.",
    correctCategory: "energy-source",
    clue: "Does this describe where the electrons physically come from, or how they're accounted for on paper?",
  },
  {
    id: "ev-gridmix",
    text: "The facility's physical grid connection draws from a national grid mix that is only partially renewable, especially overnight.",
    correctCategory: "energy-source",
    clue: "Is this about the contract GreenStack signed, or about the physical reality of the grid at any given hour?",
  },
  {
    id: "ev-pue-trend",
    text: "GreenStack's reported PUE has improved from 1.7 to 1.4 over the past two years.",
    correctCategory: "metrics",
    clue: "Is a PUE trend a source of energy, or a way of measuring something?",
  },
  {
    id: "ev-no-submeter",
    text: "No sub-metering exists to show which specific systems or racks are driving the improvement in PUE.",
    correctCategory: "metrics",
    clue: "Can you verify a trend without knowing which parts of the system are actually changing?",
  },
  {
    id: "ev-marketing",
    text: "Marketing materials describe GreenStack as \"highly sustainable\" primarily by citing the improved PUE figure and the green-energy certificates.",
    correctCategory: "communication",
    clue: "Is this a fact about the facility itself, or about how that fact is being talked about externally?",
  },
  {
    id: "ev-no-breakdown",
    text: "Management has not published any figures on renewable share, carbon intensity, or utilisation alongside the PUE number.",
    correctCategory: "communication",
    clue: "What's missing here — a source of energy, or a category of information in a public statement?",
  },
  {
    id: "ev-seasonal",
    text: "The facility experiences strong seasonal load fluctuations, with summer peak demand roughly double the winter baseline.",
    correctCategory: "operating-model",
    clue: "Does \"summer vs. winter demand\" describe how the business runs day to day, or how it talks to the public?",
  },
  {
    id: "ev-siloed",
    text: "IT and Facilities track energy-related data separately, and neither team has full visibility into the other's consumption patterns.",
    correctCategory: "operating-model",
    clue: "Is a data-visibility gap between two internal teams about the outside world, or about how the operation itself is run?",
  },
  {
    id: "ev-finance",
    text: "Finance has publicly questioned whether the current efficiency investments are paying back fast enough to justify their cost.",
    correctCategory: "cost",
    clue: "Is Finance raising a concern about the electricity source, or about whether money spent is paying off?",
  },
  {
    id: "ev-premium",
    text: "The renewable electricity purchase agreements were signed on a multi-year basis, locking in a fixed premium over standard grid tariffs.",
    correctCategory: "cost",
    clue: "A fixed premium locked in for years — is that a technical fact or a financial commitment?",
  },
  {
    id: "ev-no-verify",
    text: "No third party has independently verified GreenStack's sustainability claims or underlying data.",
    correctCategory: "credibility",
    clue: "Is \"nobody checked this from outside\" a fact about energy, or about how much you should trust the claim?",
  },
  {
    id: "ev-ambiguous-reading",
    text: "GreenStack has never disclosed whether its PUE figure is a single point-in-time reading or a continuous annual average.",
    correctCategory: "credibility",
    clue: "Not knowing if a number is a snapshot or an average — does that change what's being measured, or whether you can trust it?",
  },
];

// ---------------------------------------------------------------------------
// Stage B — PUE Claim Validity Check: 5 claims, 3-way verdict
// ---------------------------------------------------------------------------
export type Verdict = "supported" | "not-supported" | "partial";

export const VERDICT_OPTIONS: { id: Verdict; label: string; domain: string }[] = [
  { id: "supported", label: "Supported", domain: "the PUE data directly and fully backs this claim" },
  { id: "not-supported", label: "Not Supported", domain: "the PUE data says nothing that backs this claim, or actively contradicts it" },
  { id: "partial", label: "Partially Supported", domain: "the PUE data offers some real evidence, but not enough on its own to fully back the claim" },
];

export type PueClaim = {
  id: string;
  claim: string;
  correctVerdict: Verdict;
  clue: string;
};

export const PUE_CLAIMS: PueClaim[] = [
  {
    id: "claim-overall-sustainable",
    claim: "GreenStack's improving PUE proves the data centre is becoming more environmentally sustainable overall.",
    correctVerdict: "partial",
    clue: "Does better PUE contribute real evidence toward \"sustainable,\" or does it prove the whole claim on its own? Re-read Block 5's list of what PUE leaves out.",
  },
  {
    id: "claim-conversion-efficiency",
    claim: "GreenStack's improving PUE shows the facility is converting a growing share of incoming power into usable IT capacity, rather than losing it to overhead.",
    correctVerdict: "supported",
    clue: "Re-read: what does PUE's denominator — IT Equipment Energy — actually represent?",
  },
  {
    id: "claim-physically-renewable",
    claim: "Because GreenStack buys certified green electricity, its data centre is physically powered by renewable energy at every hour of the day.",
    correctVerdict: "not-supported",
    clue: "Re-read Block 3 — does an annual certificate guarantee what's actually on the grid at 2 a.m.?",
  },
  {
    id: "claim-utilisation",
    claim: "A lower PUE means GreenStack's servers are being used more efficiently, with less idle capacity.",
    correctVerdict: "not-supported",
    clue: "Re-read Block 5 — PUE is a ratio against \"whatever IT load exists.\" Does that load have to be efficiently used?",
  },
  {
    id: "claim-ref-together",
    claim: "GreenStack's PUE trend, on its own, is useful evidence but should be read alongside its REF (Renewable Energy Factor) before drawing any sustainability conclusion.",
    correctVerdict: "supported",
    clue: "Re-read Block 5's closing sentence about what a mature assessment reports together.",
  },
];

// ---------------------------------------------------------------------------
// Stage C — Gap Finder: 8 candidate aspects, pick exactly 3
// ---------------------------------------------------------------------------
export type GapAspect = {
  id: string;
  label: string;
  description: string;
};

export const GAP_ASPECTS: GapAspect[] = [
  {
    id: "renewable-transparency",
    label: "Renewable share transparency",
    description: "How much of actual consumption — not just certificates — is renewable, and when.",
  },
  {
    id: "carbon-intensity",
    label: "Carbon intensity of the grid",
    description: "The gCO₂/kWh of the physical grid region the facility actually draws from.",
  },
  {
    id: "utilisation-rate",
    label: "Utilisation rate",
    description: "How much of the running IT capacity is actually doing useful work.",
  },
  {
    id: "water-usage",
    label: "Water usage",
    description: "Water consumed by the cooling strategy, tracked separately from PUE via WUE.",
  },
  {
    id: "load-profile-granularity",
    label: "Load profile granularity",
    description: "Consumption broken down by time period and by system, not just an annual total.",
  },
  {
    id: "cost-per-workload",
    label: "Cost-per-workload data",
    description: "What it actually costs to run a given unit of computing work, not just total spend.",
  },
  {
    id: "third-party-verification",
    label: "Third-party verification",
    description: "Independent audit of the claims and the data behind them.",
  },
  {
    id: "waste-heat-reuse",
    label: "Waste-heat reuse",
    description: "Whether heat rejected by the facility is captured and reused elsewhere.",
  },
];

export const GAP_JUSTIFICATION_MIN_WORDS = 15;
export const GAP_REQUIRED_COUNT = 3;

// ---------------------------------------------------------------------------
// Stage D — Technical vs. Governance Split: curated 8-item subset
// ---------------------------------------------------------------------------
export type Side = "technical" | "governance";

export const SIDES: { id: Side; label: string; domain: string }[] = [
  { id: "technical", label: "Technical Topic", domain: "a physical, measurable fact about the systems or the workload" },
  { id: "governance", label: "Management & Governance Topic", domain: "a decision, a policy, or an oversight/communication choice made by people" },
];

export type SplitItem = {
  id: string;
  text: string;
  correctSide: Side;
  clue: string;
};

export const SPLIT_ITEMS: SplitItem[] = [
  {
    id: "ev-gridmix",
    text: "The facility's physical grid connection draws from a national grid mix that is only partially renewable, especially overnight.",
    correctSide: "technical",
    clue: "Is this something measured at the meter, or something decided in a policy?",
  },
  {
    id: "ev-pue-trend",
    text: "GreenStack's reported PUE has improved from 1.7 to 1.4 over the past two years.",
    correctSide: "technical",
    clue: "A number produced by measurement — whose job is it to act on that, an engineer's or a policy-maker's?",
  },
  {
    id: "ev-no-submeter",
    text: "No sub-metering exists to show which specific systems or racks are driving the improvement in PUE.",
    correctSide: "technical",
    clue: "Is \"we don't have this instrument installed\" a strategy decision, or a gap in physical measurement capability?",
  },
  {
    id: "ev-seasonal",
    text: "The facility experiences strong seasonal load fluctuations, with summer peak demand roughly double the winter baseline.",
    correctSide: "technical",
    clue: "Does \"summer demand is double winter demand\" describe a rule someone wrote, or a physical pattern in the workload?",
  },
  {
    id: "ev-marketing",
    text: "Marketing materials describe GreenStack as \"highly sustainable\" primarily by citing the improved PUE figure and the green-energy certificates.",
    correctSide: "governance",
    clue: "Is a marketing claim produced by engineers, or by whoever approves external communication?",
  },
  {
    id: "ev-no-breakdown",
    text: "Management has not published any figures on renewable share, carbon intensity, or utilisation alongside the PUE number.",
    correctSide: "governance",
    clue: "Choosing what to publish and what not to — is that a technical constraint, or a decision someone made?",
  },
  {
    id: "ev-finance",
    text: "Finance has publicly questioned whether the current efficiency investments are paying back fast enough to justify their cost.",
    correctSide: "governance",
    clue: "Is Finance's concern about a physical system, or about how money and priorities are managed?",
  },
  {
    id: "ev-no-verify",
    text: "No third party has independently verified GreenStack's sustainability claims or underlying data.",
    correctSide: "governance",
    clue: "Is \"nobody from outside checked this\" a technical limitation, or a choice about oversight and assurance?",
  },
];

// ---------------------------------------------------------------------------
// Task 1 — copy
// ---------------------------------------------------------------------------
export const TASK1 = {
  kicker: "Task 1",
  heading: "Sustainability Claim Auditor",
  subtext:
    "Work through the four stages below in any order — nothing is locked. Each one feeds a section of the Audit Findings Report on the right, which is what you'll actually export.",
  orderBanner: "Suggested order: A → B → C → D. You can work in any order.",
  stageA: {
    heading: "Stage A — Evidence Sorter",
    instructions:
      "Sort each piece of evidence from the case into the category it actually belongs to. Click a statement, pick a category, and use Show Clue if you're unsure — it points at the reasoning, not the answer.",
    material: ["audit-method", "pathways", "accounting"] as MaterialSectionId[],
  },
  stageB: {
    heading: "Stage B — PUE Claim Validity Check",
    instructions:
      "For each claim, decide whether GreenStack's PUE data actually supports it, doesn't support it, or partially supports it.",
    material: ["audit-method", "anatomy", "blindspots"] as MaterialSectionId[],
  },
  stageC: {
    heading: "Stage C — Gap Finder",
    instructions:
      "Select exactly the 3 aspects you judge most critical for a realistic assessment of GreenStack's claim, and justify each in a sentence or two.",
    material: ["blindspots", "accounting", "benchmarks", "audit-method"] as MaterialSectionId[],
  },
  stageD: {
    heading: "Stage D — Technical vs. Governance Split",
    instructions:
      "Drag (or tap, then tap a zone) each observation into Technical Topic or Management & Governance Topic. Undo/redo freely — nothing here is final until you export.",
    material: ["audit-method", "anatomy"] as MaterialSectionId[],
  },
  export: {
    docHeading: "Audit Findings Report",
    filenameLevel: 1,
    filenameTask: 1,
  },
} as const;
