/**
 * Module 3 / Day 4 content. All learner-facing copy lives here so components
 * stay presentational. Level 1 is fully authored (Route 1 — Knowledge);
 * Levels 2 and 3 exist as separate routes but carry no task content yet.
 *
 * Company case used throughout the whole module: Solenne Industrial Technik AG.
 */

export const CASE = {
  company: "Solenne Industrial Technik AG",
  module: "Module 3 · Day 4",
  moduleTitle: "Green IT in IT Strategy & Procurement",
} as const;

/** Icon keys resolved by components/icons/LineIcons.tsx. */
export type IconKey =
  | "compass"
  | "puzzle"
  | "link"
  | "gearLeaf"
  | "shield"
  | "cart"
  | "lever"
  | "target"
  | "gavel"
  | "coins"
  | "supplier"
  | "layers"
  | "scale";

export type Level = {
  n: 1 | 2 | 3;
  slug: string;
  href: string;
  tag: string; // "Level 1 — Knowledge"
  title: string; // page H1
  cardTitle: string; // landing card title
  cardBlurb: string; // landing card one-liner
  deliverable: string; // what the level produces
  available: boolean;
};

export const LEVELS: Level[] = [
  {
    n: 1,
    slug: "level-1",
    href: "/module-3/level-1",
    tag: "Level 1 — Knowledge",
    title: "Level 1 — Knowledge: Reading Solenne's IT Strategy",
    cardTitle: "Reading Solenne's IT Strategy",
    cardBlurb:
      "Read what is already in the strategy and decide what it is actually telling you. Produces a Diagnostic Note.",
    deliverable: "Diagnostic Note",
    available: true,
  },
  {
    n: 2,
    slug: "level-2",
    href: "/module-3/level-2",
    tag: "Level 2 — Application",
    title: "Level 2 — Application",
    cardTitle: "Application",
    cardBlurb:
      "Choose between options whose consequences you measured yourself — with the numbers in front of you.",
    deliverable: "Calculation Note",
    available: true,
  },
  {
    n: 3,
    slug: "level-3",
    href: "/module-3/level-3",
    tag: "Level 3 — Management decision",
    title: "Level 3 — Management decision",
    cardTitle: "Management decision",
    cardBlurb:
      "Decide with resources that are deliberately insufficient, and state out loud what you give up.",
    deliverable: "Decision Memo",
    available: true,
  },
];

// ---------------------------------------------------------------------------
// LEVEL 1 — Knowledge
// ---------------------------------------------------------------------------

/** Section 1 — story intro, three verbatim paragraphs. */
export const STORY_INTRO = {
  kicker: "The situation",
  paragraphs: [
    "Solenne Industrial Technik AG is a mid-size industrial technology company — around 950 employees, headquartered in Germany, with operations expanding across Central Europe. For the past three years, IT has been treated as the company's growth engine: every year brings a new wave of investment in systems, platforms, and user devices, all justified by speed-to-market and innovation.",
    "Sustainability shows up constantly in leadership communication — annual reports, town halls, the careers page. But inside IT, it has never been translated into anything operational. There is no sustainability line in the IT strategy document. No one owns it. It is a value the company states, not a logic that controls decisions.",
    "You are stepping into this organization today — not as an outsider auditing it, but as the person who has to read what's already there and decide what it's actually telling you.",
  ],
} as const;

/**
 * Section 2 — study material. Each card is a full knowledge unit, not a
 * one-line summary: a dense framework/definition (`concept`), a concrete,
 * verifiable real-world example with a number where one is legitimately
 * known (`example`), a one-line career/academic-readiness frame
 * (`whyItMatters`), a diagram, and 1–2 external references a professional
 * would actually cite. `part` groups cards under the module's two stated
 * halves (Strategy / Procurement) without splitting the underlying array —
 * lib/level1.ts gates the task on MATERIAL.cards.length generically, so the
 * card count can change here without touching gating logic elsewhere.
 */
export type Reference = { label: string; url: string };

/** Key into components/level1/StudyDiagrams.tsx. */
export type MaterialDiagramKey =
  | "fourAnchors"
  | "singleVsEmbedded"
  | "threeCircles"
  | "sevenFields"
  | "threeLens"
  | "procurementCycle"
  | "criteriaRadar"
  | "supplierGate"
  | "tenderWeighting"
  | "tensionPentagon"
  | "recurringLever";

export type MaterialCard = {
  id: string;
  part: "A" | "B";
  icon: IconKey;
  title: string;
  concept: string;
  example: string;
  whyItMatters: string;
  diagram: MaterialDiagramKey;
  references: Reference[];
};

export const MATERIAL: {
  kicker: string;
  title: string;
  intro: string;
  lockedLabel: string;
  partA: { kicker: string; title: string };
  partB: { kicker: string; title: string };
  cards: MaterialCard[];
} = {
  kicker: "Study material",
  title: "Eleven ideas before you read the strategy",
  intro:
    "Open each card. Each one pairs a framework with a real, verifiable example and a reference you can go read after class. The task below stays locked until you have opened all eleven.",
  lockedLabel: "Read all material to unlock",
  partA: { kicker: "Part A", title: "Sustainable IT strategy" },
  partB: { kicker: "Part B", title: "Sustainable procurement" },
  cards: [
    // --- Part A — Sustainable IT strategy ---------------------------------
    {
      id: "m1",
      part: "A",
      icon: "compass",
      title: "What makes an IT strategy sustainable",
      concept:
        "A sustainable IT strategy is not a separate chapter bolted onto the existing one — it is sustainability embedded in four places at once: the target vision (what \"good\" looks like, stated as a metric), the architecture (which platforms, data centers, and device standards are approved), the investment logic (what a business case must show before funding is released), and governance (who owns the outcome and who reports on it). A strategy only earns the label once all four move together; changing one alone — a green target vision with no matching investment gate, say — leaves the other three unchanged and the target unreachable.",
      example:
        "COBIT (ISACA's IT governance framework) and the GHG Protocol Corporate Standard are the two reference points most enterprises borrow from: COBIT supplies the governance/architecture language, the GHG Protocol supplies the target/measurement language (Scope 1, 2 and 3 emissions). A company running both will typically require every new data-center or cloud contract to state its Scope 2 (purchased electricity) footprint before signature — turning a strategy statement into an approval gate that actually blocks or allows spending.",
      whyItMatters:
        "\"Target vision, architecture, investment logic, governance\" is the exact vocabulary that shows up in a CIO's board deck and in a COBIT or ISO 14001 audit checklist — not a paraphrase of it.",
      diagram: "fourAnchors",
      references: [
        { label: "GHG Protocol — Corporate Standard", url: "https://ghgprotocol.org/" },
        { label: "ISACA — COBIT", url: "https://www.isaca.org/resources/cobit" },
      ],
    },
    {
      id: "m2",
      part: "A",
      icon: "puzzle",
      title: "Single action vs. strategic embedding",
      concept:
        "A single action is a decision made once, for one purchase or one project — it produces a one-time result, and the organization then reverts to its previous default. Strategic embedding is a rule written into a recurring process — a procurement specification, an approval-gate checklist, a job description — so every future instance of that decision inherits the requirement automatically, without anyone having to remember or re-decide it.",
      example:
        "Concretely: buying 500 energy-efficient laptops this year is a single action — it removes roughly 500 inefficient devices from the fleet once. Writing \"minimum ENERGY STAR / EPEAT Gold rating\" into the standing IT procurement specification is strategic embedding — it applies to the next refresh cycle, and the one after that, and every laptop any department buys for as long as the policy stands, with no repeat decision required. Over a typical 4-year refresh cycle, the single action's effect fades toward zero once those 500 laptops are eventually replaced under whatever the default spec then says — the embedded rule's effect compounds instead, cycle after cycle.",
      whyItMatters:
        "In an interview or a case study, this is the line that separates a candidate who can list green initiatives from one who can explain why some initiatives outlast the person who launched them and others quietly don't.",
      diagram: "singleVsEmbedded",
      references: [
        { label: "TCO Certified", url: "https://tcocertified.com/" },
        { label: "Global Electronics Council (EPEAT)", url: "https://globalelectronicscouncil.org" },
      ],
    },
    {
      id: "m3",
      part: "A",
      icon: "link",
      title: "The link between corporate strategy, sustainability goals, and IT strategy",
      concept:
        "Corporate strategy sets the company's direction and what it commits to publicly, often as science-based emissions targets. Sustainability goals translate that commitment into numbers and deadlines. IT strategy is where a large share of those numbers actually get moved — data centers and cloud consumption typically sit under Scope 2 (purchased electricity), devices and cloud services under Scope 3 — yet IT investment decisions are routinely approved on separate criteria with no reference back to the company's own published targets. When that link is missing, the two run in parallel: the sustainability report states a target, the IT roadmap is approved on its own logic, and neither is required to reconcile with the other.",
      example:
        "The GHG Protocol's Scope 1/2/3 boundaries are the standard vocabulary for this link. A company that has committed to a Science Based Target via the SBTi but has no requirement for IT investment cases to state their Scope 2/3 contribution has, in effect, made two separate promises that no single document connects — one in the sustainability report, one in the IT roadmap.",
      whyItMatters:
        "SBTi validation and CDP disclosure — the two most common ways large companies are externally scored on climate commitments — both check specifically for this link, not merely for the existence of a target.",
      diagram: "threeCircles",
      references: [
        { label: "Science Based Targets initiative", url: "https://sciencebasedtargets.org/" },
        { label: "GHG Protocol — Scope 1/2/3", url: "https://ghgprotocol.org/" },
      ],
    },
    {
      id: "m4",
      part: "A",
      icon: "gearLeaf",
      title: "Typical fields of action",
      concept:
        "A sustainable IT strategy acts across seven recurring fields, each with its own owner and its own metric: infrastructure (data-center and network design), procurement (what gets bought and on what criteria), lifecycle (how long devices are kept and how they exit), operations (how running systems are tuned day to day), software (how code and cloud resources are used), governance (who is accountable), and metrics (what gets measured and reported). Treating these as one undifferentiated \"green IT\" effort is itself a common failure — each field has a different owner, a different lever, and a different KPI.",
      example:
        "A working set of metrics, one per field: infrastructure → PUE (Power Usage Effectiveness — a data center's total energy ÷ its IT-equipment energy; leading operators publicly report figures approaching 1.1, against an unmanaged legacy data center often above 2.0). Procurement → % of purchases meeting a minimum EPEAT/TCO Certified tier. Lifecycle → average device age at disposal and % diverted from landfill, tracked against the EU's WEEE Directive. Operations → server utilization rate. Software → cloud instance right-sizing rate. Governance → whether a named owner exists. Metrics → tCO2e per employee, reported in GHG Protocol categories.",
      whyItMatters:
        "A green-IT initiative that cannot name which of these seven fields it belongs to usually cannot be measured either — this is the checklist an internal auditor or an ESG rating analyst (e.g. EcoVadis) will actually use.",
      diagram: "sevenFields",
      references: [
        { label: "WEEE Directive (EU)", url: "https://environment.ec.europa.eu/topics/waste-and-recycling/waste-electrical-and-electronic-equipment-weee_en" },
        { label: "EcoVadis", url: "https://ecovadis.com/" },
      ],
    },
    {
      id: "m5",
      part: "A",
      icon: "shield",
      title: "Why this is not just an environmental topic",
      concept:
        "Treating sustainable IT purely as an environmental or reputational topic under-states three harder-edged business cases for it. Risk: regulation is moving from voluntary to mandatory — the EU's Corporate Sustainability Reporting Directive (CSRD) now requires large companies to report supply-chain sustainability data, including IT hardware supply chains, with real liability for gaps. Cost: total cost of ownership (TCO) analyses consistently show that energy consumption and early-disposal cost, not purchase price, dominate a device's real lifetime cost — a cheaper, less efficient device is frequently the more expensive one over four years. Competitiveness: enterprise clients increasingly make sustainability performance a scored, sometimes disqualifying, criterion in supplier tenders, so a company with no answer here can lose deals it is otherwise qualified to win.",
      example:
        "The clearest evidence for the competitiveness case is procedural, not anecdotal: EcoVadis and CDP scores, ISO 14001 certification, and CSRD-aligned disclosures now appear as line items inside RFP evaluation matrices for enterprise IT and industrial clients across the EU — a supplier unable to produce these documents is filtered out before price is even compared.",
      whyItMatters:
        "This is the argument that gets a green-IT business case funded by a CFO who does not weigh emissions for their own sake — cost and risk are the language a finance committee actually approves budgets in.",
      diagram: "threeLens",
      references: [
        { label: "EU — Corporate Sustainability Reporting Directive", url: "https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en" },
        { label: "ISO 14001 — Environmental management", url: "https://www.iso.org/standard/60857.html" },
      ],
    },

    // --- Part B — Sustainable procurement ----------------------------------
    {
      id: "m6",
      part: "B",
      icon: "cart",
      title: "Introduction to sustainable procurement in IT",
      concept:
        "Sustainable procurement means applying sustainability criteria at every stage of the standard purchasing cycle — plan, specify, tender, select, contract, manage — rather than as an afterthought once a vendor is already chosen. ISO 20400, the international guidance standard for sustainable procurement, frames this explicitly as a process change: criteria have to be written into the specification stage, before a single bid is received, or they carry no contractual weight later.",
      example:
        "In practice: a criterion like \"minimum 50% recycled aluminium in the chassis\" must appear in the tender's technical specification document. If it is only raised informally during vendor calls, it cannot be scored, cannot be enforced, and disappears the moment the procurement staff who asked about it move on.",
      whyItMatters:
        "ISO 20400 is the standard a sustainable-procurement job posting or academic syllabus names directly — its process framing, not just its existence, is the baseline expectation.",
      diagram: "procurementCycle",
      references: [{ label: "ISO 20400 — Sustainable procurement", url: "https://www.iso.org/standard/63026.html" }],
    },
    {
      id: "m7",
      part: "B",
      icon: "layers",
      title: "Procurement criteria beyond price and performance",
      concept:
        "A price-and-performance-only evaluation misses most of a device's real footprint. A complete sustainable-procurement criteria set adds: lifecycle cost (total energy, maintenance, and disposal cost over the full service life, not just the purchase price), repairability (can it be opened and fixed without specialized tools, extending its useful life), energy efficiency (rated consumption under load and idle), origin and supply chain (where, and under what labour and environmental conditions, components are sourced), and disposability (whether it can be recycled or safely disassembled at end of life).",
      example:
        "France's mandatory Indice de réparabilité (repairability index), in force since 2021, requires manufacturers to publish a 0–10 repairability score on electronics sold in France — spare-parts availability and disassembly difficulty are now a published, comparable number, the same way energy-efficiency labels work for appliances. TCO Certified and EPEAT (administered by the Global Electronics Council) are the two certification schemes that bundle exactly these criteria — energy efficiency, hazardous-substance limits, supply-chain labour standards, end-of-life recyclability — into a single tier a procurement team can simply require in a spec.",
      whyItMatters:
        "EPEAT and TCO Certified tiers are the two labels an actual IT-procurement tender will ask you to name specifically — this is operational vocabulary, not theory.",
      diagram: "criteriaRadar",
      references: [
        { label: "TCO Certified", url: "https://tcocertified.com/" },
        { label: "Global Electronics Council (EPEAT)", url: "https://globalelectronicscouncil.org" },
      ],
    },
    {
      id: "m8",
      part: "B",
      icon: "supplier",
      title: "Supplier requirements, selection criteria & minimum standards",
      concept:
        "Before price is ever compared, procurement can set minimum standards that filter out suppliers entirely — a pass/fail gate, not a scored criterion. Common examples: a valid ISO 14001 environmental management certification, a documented code of conduct aligned with the Responsible Business Alliance (RBA) standard covering labour and environmental practice across the supply chain, disclosed Scope 1 and 2 emissions, and no sourcing from conflict-affected or high-risk mineral supply chains. A supplier that cannot meet the minimum standard never reaches the scoring stage, whatever its price.",
      example:
        "The electronics industry's RBA Code of Conduct is the most widely adopted minimum-standard reference — used directly, or as a template, by most major electronics brands' own supplier codes, covering labour conditions, health and safety, environmental management, and business ethics across multi-tier supply chains.",
      whyItMatters:
        "The distinction between a pass/fail minimum standard and a scored criterion is tested directly in real tender design — conflating the two is a common and consequential mistake.",
      diagram: "supplierGate",
      references: [
        { label: "Responsible Business Alliance — Code of Conduct", url: "https://www.responsiblebusiness.org/code-of-conduct/" },
        { label: "ISO 14001 — Environmental management", url: "https://www.iso.org/standard/60857.html" },
      ],
    },
    {
      id: "m9",
      part: "B",
      icon: "gavel",
      title: "The role of tenders, specifications & procurement guidelines",
      concept:
        "Three documents do the actual legal work in procurement, and each carries different weight. The procurement guideline is an internal standing policy (e.g. \"all IT hardware tenders above €50,000 must include EPEAT Silver or higher\"). The specification is the technical requirement written into one specific tender, where a sustainability criterion becomes either mandatory — pass/fail — or scored, contributing a weighted percentage to the final decision. The tender or RFP itself is the formal invitation that legally binds bidders to what the specification states. A criterion mentioned in a meeting but never written into the specification has no contractual standing.",
      example:
        "A typical enterprise evaluation matrix might weight price at 50%, technical fit at 30%, and sustainability at 20% — with a small number of sustainability items (e.g. minimum ISO 14001 certification) set as mandatory pass/fail rather than scored, so a bidder who fails them is excluded before the 50/30/20 scoring even runs. The EU's Green Public Procurement (GPP) criteria sets are the most widely referenced public template for drafting these clauses for IT hardware and data-center services.",
      whyItMatters:
        "Reading and drafting a weighted evaluation matrix like this is a core, testable skill in procurement and IT vendor-management roles — and exactly the artefact Level 2 and Level 3 of this module ask you to reason with.",
      diagram: "tenderWeighting",
      references: [{ label: "EU — Green Public Procurement", url: "https://green-forum.ec.europa.eu/green-business/green-public-procurement_en" }],
    },
    {
      id: "m10",
      part: "B",
      icon: "scale",
      title: "Trade-offs: cost, availability, standardisation, ambition, time pressure",
      concept:
        "Sustainable-procurement criteria do not sit in isolation — tightening one almost always tightens a constraint elsewhere. Raising the sustainability bar can narrow the qualified supplier pool (an availability risk, especially under time pressure during a hardware shortage), conflict with a standardisation policy (one global device model simplifies IT support and reduces mixed-fleet e-waste, but the lowest-carbon option can vary by region), and raise short-term price even while lowering total lifecycle cost. None of these trade-offs has a universally correct answer — naming which one you are accepting, and why, is the actual skill; refusing to see the trade-off is the actual failure.",
      example:
        "During global component shortages, buyers who had written a single high-sustainability-tier supplier into their standing specification with no approved fallback tier faced longer lead times than buyers using a scored — not mandatory — sustainability criterion that could flex under supply pressure. The same policy that is a strength in a stable market becomes an availability risk in a constrained one.",
      whyItMatters:
        "This is precisely the tension Solenne's own procurement team raises in this case — that new criteria will slow purchasing down. Level 2 and Level 3 will ask you to make this trade-off explicit and price it, not resolve it once and for all.",
      diagram: "tensionPentagon",
      references: [{ label: "ISO 20400 — Sustainable procurement", url: "https://www.iso.org/standard/63026.html" }],
    },
    {
      id: "m11",
      part: "B",
      icon: "lever",
      title: "Why sustainable procurement is a management lever",
      concept:
        "Procurement is the one process in a company that repeats, by design, for every purchase, every year, indefinitely — which makes it structurally different from a single project. A criterion written into the standing procurement policy does not need to be re-approved, re-funded, or re-championed each time; it applies automatically to the next tender, and the one after that. This is why procurement, more than any single sustainability project however large, is the lever with the longest half-life: change the policy once, and its effect compounds silently across every future purchase without further management attention.",
      example:
        "This is the direct, structural reason this module's Task 1 sorts signals into a \"Procurement\" bucket separately from \"Investment Logic\": an investment-logic gate decides whether one project gets funded; a procurement policy decides the criteria for every project like it, indefinitely, until the policy itself changes.",
      whyItMatters:
        "This is the single argument most likely to get an initiative funded as a policy change rather than a one-off pilot — pilots get cancelled when priorities shift; policies embedded in the procurement process keep working without being remembered.",
      diagram: "recurringLever",
      references: [{ label: "ISO 20400 — Sustainable procurement", url: "https://www.iso.org/standard/63026.html" }],
    },
  ],
};

/** Section 3 — Task 1: Diagnostic Note. */
export type BucketId = "target" | "governance" | "investment" | "procurement" | "supplier";

export type Bucket = {
  id: BucketId;
  label: string;
  icon: IconKey;
  /** One-line explanation of what belongs in this bucket, shown behind a "?". */
  blurb: string;
  /** Short example items — what a signal in this bucket typically looks like. */
  examples: string[];
};

export const BUCKETS: Bucket[] = [
  {
    id: "target",
    label: "Target Picture",
    icon: "target",
    blurb:
      "A stated, measurable destination for IT sustainability — not a slogan like \"greener IT\". A baseline, a target year, and a % reduction, the same shape used for real emissions targets.",
    examples: [
      "A baseline number (emissions, energy use)",
      "A target year (e.g. 2030)",
      "A stated % reduction or efficiency goal",
      "A sustainability KPI on the roadmap — or its absence",
    ],
  },
  {
    id: "governance",
    label: "Governance",
    icon: "gavel",
    blurb:
      "Who decides, who is consulted, who is only informed — and whether anyone is formally accountable for the outcome, not just personally interested in it.",
    examples: [
      "A named accountable owner (or the lack of one)",
      "Formal priority vs. a personal opinion",
      "Reporting lines and review cadence",
      "Escalation rules when targets slip",
    ],
  },
  {
    id: "investment",
    label: "Investment Logic",
    icon: "coins",
    blurb:
      "The rules that decide which IT investments get approved — what a business case must show before money is released.",
    examples: [
      "What investment approvals ask for (or don't)",
      "Whether lifecycle cost or end-of-life is a required question",
      "The criteria projects are actually judged on (speed, budget, innovation…)",
      "Whether sustainability sits inside the approval gate or outside it",
    ],
  },
  {
    id: "procurement",
    label: "Procurement",
    icon: "cart",
    blurb:
      "The purchasing decision rule itself — what suppliers and products are actually chosen on, beyond price and performance.",
    examples: [
      "The criteria used to pick a supplier or product",
      "Whether lifecycle, repairability, or origin are ever asked about",
      "Standardization and availability as decision drivers",
      "What triggers a refresh or replacement",
    ],
  },
  {
    id: "supplier",
    label: "Supplier Control",
    icon: "supplier",
    blurb:
      "Whether suppliers are evaluated and re-checked against sustainability criteria — once, or on a repeating cycle.",
    examples: [
      "Supplier sustainability scoring or screening",
      "Re-certification at contract renewal",
      "One-time vetting vs. an ongoing review cycle",
      "Supply chain and origin checks",
    ],
  },
];

export type Signal = {
  id: string;
  n: number;
  text: string;
  /** The bucket this signal most commonly belongs in (for the optional check). */
  suggested: BucketId;
  /** Why it sits there — shown as guidance, never as a hard "wrong". */
  why: string;
};

export const SIGNALS: Signal[] = [
  { id: "s1", n: 1, text: "IT projects are evaluated primarily on innovation, speed, and budget.", suggested: "investment", why: "The criteria that decide what gets funded are investment logic." },
  { id: "s2", n: 2, text: "The IT strategy document contains no explicit sustainability targets.", suggested: "target", why: "A missing sustainability target is a gap in the target picture." },
  { id: "s3", n: 3, text: "Procurement decisions are made mainly on price, availability, and standardization.", suggested: "procurement", why: "This is the procurement decision rule itself." },
  { id: "s4", n: 4, text: "Management is now demanding visible, measurable contributions to sustainability.", suggested: "target", why: "A demand for a measurable contribution is pressure to set a target — though it can also read as a governance signal." },
  { id: "s5", n: 5, text: "IT leadership considers sustainability important but has never made it a formal priority.", suggested: "governance", why: "Whether something is a formal, owned priority is governance." },
  { id: "s6", n: 6, text: "Suppliers are not evaluated against any sustainability criteria.", suggested: "supplier", why: "Evaluating suppliers against criteria is supplier control." },
  { id: "s7", n: 7, text: "Next year's IT roadmap (cloud migration, new ERP) carries no sustainability KPI.", suggested: "target", why: "A roadmap with no sustainability KPI is a missing measurable target." },
  { id: "s8", n: 8, text: "Devices are refreshed on a warranty-expiry schedule, not an energy-efficiency one.", suggested: "investment", why: "The refresh/replacement decision rule is investment logic — though it also touches procurement." },
  { id: "s9", n: 9, text: "No one in IT or procurement is formally accountable for sustainability outcomes.", suggested: "governance", why: "Named accountability for outcomes is governance." },
  { id: "s10", n: 10, text: "Investment approvals never ask about lifecycle cost or end-of-life disposal.", suggested: "investment", why: "What an approval gate must check is investment logic." },
];

export const TASK1 = {
  kicker: "Task 1",
  heading: "Task 1 — Is Solenne's IT strategy actually sustainable?",
  subtext: "Sort what you see. The pattern will tell you where the gap is.",
  board: {
    inboxTitle: "Inbox — signals to sort",
    inboxHelp:
      "Drag a signal into the bucket it belongs in — or tap a signal, then tap a bucket. Nothing is marked as you drop. Re-sort any card at any time; once all ten are placed you can check your placements below.",
    chartTitle: "Signals per bucket",
    chartEmpty: "The chart fills as you sort.",
    tapHint: "Selected — now tap a bucket",
    review: {
      title: "Check your placements",
      lockedHint: "Sort all 10 signals first, then check.",
      checkLabel: "Check placements",
      hideLabel: "Hide guidance",
      fitLabel: "Common fit",
      note: "These are the most common placements, not the only defensible ones. Move a card and check again.",
    },
  },
  reflection: {
    lockedLabel: "Sort all 10 signals to unlock the written reflection.",
    kicker: "Written reflection — judged",
    intro:
      "This part is judged, not auto-scored. Reference the buckets your findings came from.",
    fieldA: {
      key: "l1:gaps",
      label: "Name the three biggest strategic gaps you found.",
      hint: "Name exactly three, and say which bucket each one came from.",
      placeholder: "Gap 1 relates to [bucket] because...",
    },
    fieldB: {
      key: "l1:opsVsStrategic",
      label:
        "Which of these findings is a single operational weakness, and which is a strategic deficit? Explain the difference for at least two of your findings.",
      hint: "Take at least two findings. For each, say whether it's a one-off operational weakness or a structural strategic deficit — and why the two aren't the same.",
      placeholder: "[Finding] is an operational weakness / a strategic deficit because...",
    },
  },
  export: {
    controlsTitle: "Diagnostic Note",
    controlsIntro:
      "When both reflection fields are filled, export a one-page Diagnostic Note. It is saved to this device and pulled forward into Level 2.",
    disabledHint: "Fill both reflection fields to enable the export.",
    openLabel: "Export Diagnostic Note",
    nameLabel: "Learner name",
    namePlaceholder: "Your name",
    // Printable document
    docWatermark: "AION · Green IT · Module 3 · Level 1",
    docHeading: "Diagnostic Note",
    docSubheading: "Solenne Industrial Technik AG — IT strategy diagnosis",
    docChartTitle: "Signals per bucket",
    docFieldATitle: "Three biggest strategic gaps",
    docFieldBTitle: "Operational weakness vs. strategic deficit",
    docNotFilled: "— not completed —",
    downloadLabel: "Download as PDF",
    closeLabel: "Close",
    taskLabel: "diagnostic-note",
  },
} as const;
