/**
 * Level 3 — Management Decision. Verbatim copy, the five memo-component configs
 * (each with its own accent colour), the budget items, the sequencing chips,
 * and small pure validators. No React here so the server page can import it.
 */

export const LEVEL3_TITLE = "Level 3 — Management Decision: What Do You Tell the Board?";

export const PREREQ3 = {
  missingL1: "Complete Level 1 first — this memo builds on your Diagnostic Note.",
  missingL2: "Complete Level 2 first — this memo builds on your Calculation Note.",
  ctaL1: "Go to Level 1",
  ctaL2: "Go to Level 2",
  hrefL1: "/module-3/level-1",
  hrefL2: "/module-3/level-2",
} as const;

export const STORY3 = {
  kicker: "The final brief",
  paragraphs: [
    "Your Calculation Note reached Solenne's CIO. The response: \"You've told me what to do and what it costs. Now write the memo I take into the boardroom.\"",
    "The budget ceiling from your analysis still applies: €120,000 for this initiative this year. But the board doesn't fund technical moves in isolation — they expect ownership, a review structure, and a stated target, funded from the same pool. The number that looked sufficient at the calculation stage will not cover everything a real recommendation requires.",
    "Decide what gets funded now, what gets formally assigned but not yet resourced, and what you are consciously choosing to postpone — and be ready to defend that choice under questioning.",
  ],
  refL1Title: "Your Diagnostic Note",
  refL1Hint: "Level 1 — your own prior work.",
  refL2Title: "Your Calculation Note",
  refL2Hint: "Level 2 — your own prior work.",
} as const;

/** Five component accent colours, reused between each card tag and its memo field. */
export const COMPONENT_COLORS = {
  target: "#0E7A5A",
  governance: "#2E5F8A",
  investment: "#9A6A1F",
  supplier: "#6D5AA6",
  accountability: "#A63D5B",
} as const;

export type ComponentKey = keyof typeof COMPONENT_COLORS;

export type DiagramKey =
  | "timeline"
  | "orgchart"
  | "stagegate"
  | "suppliercycle"
  | "accountability"
  | "portfolioCeiling"
  | "impactEffort";

export type Reference3 = { label: string; url: string };

export type Level3Card = {
  id: string;
  /** null for the two cards not tied to a colour-coded memo field (budget, sequencing). */
  component: ComponentKey | null;
  diagram: DiagramKey;
  title: string;
  usedIn: string;
  concept: string;
  example: string;
  whyItMatters: string;
  references: Reference3[];
};

export const MATERIAL3: { kicker: string; title: string; intro: string; cards: Level3Card[] } = {
  kicker: "Study material",
  title: "Seven building blocks of the memo",
  intro:
    "Five cards map to the memo's five colour-coded fields; two map to the budget allocator and the sequencing widget — every part of Task 3 has a tool behind it. Open the one you need as you draft.",
  cards: [
    {
      id: "l3m1",
      component: "target",
      diagram: "timeline",
      title: "Target Picture",
      usedIn: "Target Picture field",
      concept:
        "A target picture only functions as a target once it has three parts that can each be checked independently: a baseline (measured now, in the unit the target will be reported in), a target year (a specific date a stakeholder can hold you to), and a stated percentage or absolute reduction — not a direction word like \"less.\" This is exactly the structure required by the GHG Protocol's target-setting guidance, and the structure the Science Based Targets initiative (SBTi) checks for before validating a corporate target.",
      example:
        "\"Reduce IT's footprint\" cannot be checked by anyone outside the room where it was said. \"By 2030, reduce IT-related emissions 30% from a 1,200 t CO2e/yr baseline\" can be checked by anyone holding the baseline number and a calendar — which is the entire point: a target a board can later hold you to is, by construction, one specific enough to fail.",
      whyItMatters:
        "SBTi near-term target validation is now a common requirement in enterprise sustainability disclosure — a target that cannot be stated in this three-part form cannot be validated, however real the underlying work is.",
      references: [
        { label: "GHG Protocol", url: "https://ghgprotocol.org/" },
        { label: "Science Based Targets initiative", url: "https://sciencebasedtargets.org/" },
      ],
    },
    {
      id: "l3m2",
      component: "governance",
      diagram: "orgchart",
      title: "Governance",
      usedIn: "Governance field",
      concept:
        "RACI — Responsible, Accountable, Consulted, Informed — assigns exactly one of four roles to everyone touching a decision, and the framework's entire value sits in one constraint: exactly one role may be Accountable for a given outcome. Responsible parties do the work; Consulted parties are asked before a decision; Informed parties are told after. A structure with two \"Accountable\" owners has not doubled its oversight — it has removed the one property that made the framework useful, because when an outcome slips, two accountable owners can each point to the other.",
      example:
        "This is why this task's Governance field enforces \"only one role can be Accountable\" as a hard rule, not a style preference — it mirrors exactly how COBIT-based IT governance charters and corporate ESG steering-committee terms of reference are written in practice.",
      whyItMatters:
        "RACI is close to universal in enterprise governance documentation — reading and drafting one correctly, including catching a double-Accountable error, is a baseline expectation in an IT or sustainability governance role.",
      references: [{ label: "ISACA — COBIT", url: "https://www.isaca.org/resources/cobit" }],
    },
    {
      id: "l3m3",
      component: "investment",
      diagram: "stagegate",
      title: "Investment Logic",
      usedIn: "Investment Logic field",
      concept:
        "A stage-gate process breaks an investment from idea to delivery into fixed checkpoints — typically idea, business case, approval, execution, review — each requiring specific evidence before the project passes to the next stage. Inserting a sustainability criterion as a mandatory question at one specific gate, rather than \"somewhere in the process,\" is what makes it enforceable: a gate either releases funding or it doesn't, so a criterion attached to a gate cannot be quietly skipped the way one attached to a general policy statement can.",
      example:
        "Placing the check at \"Business Case\" — rather than earlier at \"Idea,\" where the numbers aren't yet known, or later at \"Approval,\" where the case is already largely locked in — is the standard placement in real stage-gate models, precisely because it is the last point where the criterion can still change which project gets built, not just how it gets reported afterward.",
      whyItMatters:
        "Stage-gate investment processes are the standard structure for enterprise IT capital approval — knowing which gate a given control belongs at, and why, is a core project-governance skill.",
      references: [{ label: "Wikipedia — Phase–gate process", url: "https://en.wikipedia.org/wiki/Phase%E2%80%93gate_process" }],
    },
    {
      id: "l3m4",
      component: "supplier",
      diagram: "suppliercycle",
      title: "Supplier Control",
      usedIn: "Supplier Control field",
      concept:
        "A one-time supplier vetting event certifies a supplier's practices at a single point in time and then goes stale — labour conditions, ownership, and environmental performance in a multi-tier supply chain change continuously, and nothing in a one-time check catches that drift. ISO 20400's guidance treats supplier sustainability management as a closed loop instead: selection, onboarding, periodic review, and re-certification at contract renewal, feeding back into the next selection round — a repeated cadence, not a filed-away event.",
      example:
        "A supplier that passed a rigorous audit three years ago, before a change of ownership or a new sub-supplier, gives zero visibility into whether the conditions that earned that original pass still hold today — exactly why review cadence (Annual / Biannual / Continuous monitoring), not initial vetting alone, is the field this task actually asks you to set.",
      whyItMatters:
        "Supply-chain due-diligence regulation is moving toward requiring ongoing monitoring, not point-in-time certification — the cadence question is becoming a compliance question, not only a best-practice one.",
      references: [{ label: "ISO 20400 — Sustainable procurement", url: "https://www.iso.org/standard/63026.html" }],
    },
    {
      id: "l3m5",
      component: "accountability",
      diagram: "accountability",
      title: "Accountability",
      usedIn: "Accountability field",
      concept:
        "Responsible describes who does the work; accountable describes who answers for the outcome even when most of the work was delegated — the two are deliberately not the same role in a well-formed RACI, and collapsing them (\"the team is accountable\") removes the one thing accountability was for: a single name a board, an auditor, or a client can ask \"why did this not happen.\" A department is not a role a person occupies, so it cannot be held to an outcome the way a named person or position can.",
      example:
        "\"The IT team\" cannot attend a steering-committee meeting to explain a missed target; \"Head of IT Sustainability\" can. This is the exact, deliberately narrow distinction the Accountability field's validation checks for when it rejects a department name.",
      whyItMatters:
        "The gap between \"responsible\" and \"accountable\" is one of the most commonly cited real governance failures in post-mortems of stalled sustainability programmes — naming an actual accountable role, not a group, is the single highest-leverage governance decision in this memo.",
      references: [{ label: "ISACA — COBIT", url: "https://www.isaca.org/resources/cobit" }],
    },
    {
      id: "l3m6",
      component: null,
      diagram: "portfolioCeiling",
      title: "Allocating a fixed pool across simultaneous commitments",
      usedIn: "Budget allocator",
      concept:
        "Unlike Level 2's single go/no-go choice among three mutually exclusive options, the budget allocator asks you to fund several line items from the same pool at once — the chosen initiative, governance setup, and, optionally, a data audit — a portfolio allocation problem, not a single ranking. The discipline is the one used in real capital budgeting under a hard ceiling: total every commitment before adding the next one, and treat \"it's a good idea\" as necessary but not sufficient — the pool does not grow because an item is worth funding.",
      example:
        "Governance and accountability setup (€25,000) is not optional in the sense that skipping it is free — Level 2's own material already established that actions without governance tend to lapse — but it still competes for the same euro as the chosen initiative and the audit. Committing to all three without checking the running total is exactly how real budget overruns happen: every individual line item was justified; the sum was never checked until after the commitments were made.",
      whyItMatters:
        "Reading a running total against a ceiling before committing further, rather than after, is the entire discipline separating a funded portfolio from an overspent one — and it is checked mechanically in this task's own budget bar.",
      references: [{ label: "Investopedia — Capital Rationing", url: "https://www.investopedia.com/terms/c/capitalrationing.asp" }],
    },
    {
      id: "l3m7",
      component: null,
      diagram: "impactEffort",
      title: "Sequencing by impact and effort, not by preference",
      usedIn: "Implementation sequence",
      concept:
        "An impact/effort matrix sorts candidate actions along two axes — how much they move the outcome, and how much time or organizational effort they take to stand up — producing a natural sequencing logic without a single \"priority\" score: high-impact/low-effort moves go first (they pay back fastest and build credibility), high-impact/high-effort moves become the medium-term programme once the quick wins have funded the case for them, and everything else waits. Sequencing by personal preference, or by whichever action was raised first in a meeting, produces a roadmap that reads to a board as unordered.",
      example:
        "\"Assign a named accountable owner\" costs almost nothing to execute and unlocks every other governance action that depends on having one — a textbook short-term move. \"Formalize the supplier re-certification cycle\" requires new supplier contracts and monitoring infrastructure to exist first — a textbook structural move a board would expect sequenced later, however important it eventually becomes.",
      whyItMatters:
        "Impact/effort sequencing is one of the most common frameworks used to build a credible-looking implementation roadmap in a real board memo — an illogical sequence is one of the fastest ways a reviewer loses confidence in the rest of the memo, independent of whether the individual actions were sound.",
      references: [{ label: "Atlassian — Prioritization frameworks", url: "https://www.atlassian.com/agile/product-management/prioritization-framework" }],
    },
  ],
};

// --- Task 3 -----------------------------------------------------------------

export const BUDGET_CEILING_3 = 120000;

export const BUDGET_ITEMS = {
  chosen: { key: "l3:fund:chosen", label: "Chosen initiative (from your Calculation Note)", defaultOn: true },
  governance: { key: "l3:fund:governance", label: "Governance & accountability setup", amount: 25000, defaultOn: true },
  audit: { key: "l3:fund:audit", label: "Supply chain / lifecycle data audit (optional)", amount: 20000, defaultOn: false },
} as const;

export const STAGE_GATES = ["Idea", "Business Case", "Approval", "Execution", "Review"] as const;
export const SUPPLIER_CADENCE = ["Annual", "Biannual", "Continuous monitoring"] as const;
export const REVIEW_CADENCE = ["Quarterly", "Biannual", "Annual"] as const;
export const TARGET_YEARS = [2028, 2029, 2030, 2032, 2035] as const;

export const SEQUENCE_COLUMNS = [
  { id: "short", label: "Short-term" },
  { id: "medium", label: "Medium-term" },
  { id: "structural", label: "Structural" },
] as const;

export type SeqChip = { id: string; text: string; correct: "short" | "medium" | "structural" };

export const SEQUENCE_CHIPS: SeqChip[] = [
  { id: "q1", text: "Assign a named accountable owner", correct: "short" },
  { id: "q2", text: "Stand up the sustainability steering committee", correct: "short" },
  { id: "q3", text: "Publish the target picture company-wide", correct: "short" },
  { id: "q4", text: "Insert the sustainability gate into investment approval", correct: "medium" },
  { id: "q5", text: "Introduce binding sustainability criteria in the next tender", correct: "medium" },
  { id: "q6", text: "Run the supply chain / lifecycle data audit", correct: "medium" },
  { id: "q7", text: "Formalize the supplier re-certification cycle", correct: "structural" },
  { id: "q8", text: "Establish quarterly emissions reporting to the board", correct: "structural" },
  { id: "q9", text: "Embed lifecycle cost in every investment approval", correct: "structural" },
];

export const TASK3 = {
  kicker: "Task 3",
  heading: "Task 3 — What do you tell the board?",
  subtext: "Build the recommendation. Watch the budget as you commit it.",
  budgetTitle: "3.1 · Budget allocator",
  budgetCeilingLabel: "Ceiling: €120,000 this year",
  remainingLabel: "Remaining",
  overBudgetLabel: "Over budget — uncheck an item to submit",
  fieldsTitle: "3.2 · Memo components",
  seqTitle: "3.3 · Implementation sequence",
  seqIntro:
    "Sort each action into when it happens. The order flows straight into the memo's roadmap — an illogical sequence will read as one there.",
  seqTrayLabel: "Unsorted actions",
  closingTitle: "3.4 · The measure you postponed",
  closing: {
    key: "l3:postponed",
    label: "The measure you consciously postponed",
    hint: "Name what you are not funding or resourcing this year, and why that is defensible.",
    placeholder: "Not funding [X] this year because...",
  },
  memoTitle: "Decision memo",
  previewToggle: "Preview memo",
  export: {
    controlsTitle: "Submit Decision Memo",
    controlsIntro:
      "When every field is complete, the sequence is sorted, and the budget balances, submit the memo. The export bundles all three notes into one portfolio.",
    disabledHint: "Complete every field, sort the sequence, and clear any over-budget balance.",
    openLabel: "Submit Decision Memo",
    downloadLabel: "Download portfolio as PDF",
    closeLabel: "Close",
    portfolioTitle: "Solenne Industrial Technik AG — Module 3 Portfolio",
    taskLabel: "module-3-portfolio",
  },
} as const;

// --- Field configs (labels + memo templates) --------------------------------

export const FIELDS = {
  target: {
    key: "target",
    label: "Target Picture",
    baselineKey: "l3:tp:baseline",
    pctKey: "l3:tp:pct",
    yearKey: "l3:tp:year",
    rationaleKey: "l3:tp:rationale",
    baselineLabel: "Baseline emissions (t CO₂e / yr)",
    pctLabel: "Target reduction (%)",
    yearLabel: "Target year",
    rationaleLabel: "Rationale",
    rationaleHint: "Say why this target is credible for Solenne, given what you already found.",
    rationalePlaceholder: "Credible because...",
  },
  governance: {
    key: "governance",
    label: "Governance",
    ownerKey: "l3:gov:owner",
    cadenceKey: "l3:gov:cadence",
    escalationKey: "l3:gov:escalation",
    ownerLabel: "Accountable owner (one named role)",
    ownerPlaceholder: "e.g. Head of IT Sustainability",
    cadenceLabel: "Review cadence",
    escalationLabel: "Escalation trigger",
    escalationHint: "State a concrete trigger — a number, a date, or a named event that forces a board conversation.",
    escalationPlaceholder: "Escalates when...",
    oneAccountableNote: "Only one role can be Accountable — name the single owner, not a department.",
  },
  investment: {
    key: "investment",
    label: "Investment Logic",
    stageKey: "l3:inv:stage",
    rationaleKey: "l3:inv:rationale",
    stageLabel: "At which stage should the sustainability check become mandatory?",
    rationaleLabel: "Rationale",
    rationaleHint: "Say why this stage — and why not an earlier or later one.",
    rationalePlaceholder: "This stage, because...",
  },
  supplier: {
    key: "supplier",
    label: "Supplier Control",
    cadenceKey: "l3:sup:cadence",
    rationaleKey: "l3:sup:rationale",
    cadenceLabel: "Supplier review cadence",
    rationaleLabel: "Rationale",
    rationaleHint: "Reference a risk flag from your Calculation Note.",
    rationalePlaceholder: "Because our Calculation Note flagged...",
  },
  accountability: {
    key: "accountability",
    label: "Accountability",
    roleKey: "l3:acc:role",
    roleLabel: "Named accountable role",
    roleHint: "One named role — not a department or a team.",
    rolePlaceholder: "e.g. Head of IT Sustainability",
    invalidMessage: "Name a role, not a department.",
  },
} as const;

// --- Validation -------------------------------------------------------------

const GENERIC_ROLES = [
  "it team",
  "procurement department",
  "management",
  "it department",
  "the team",
  "procurement",
  "it",
  "board",
  "everyone",
  "staff",
  "leadership",
  "operations",
];

/** True when a role name is too generic to be a real accountable owner. */
export function isGenericRole(v: string): boolean {
  const n = v.trim().toLowerCase();
  if (!n) return false;
  if (GENERIC_ROLES.includes(n)) return true;
  return /\b(department|team)$/.test(n);
}

// --- Memo templates ---------------------------------------------------------

export function targetLine(baseline: string, pct: string, year: string): string {
  if (!baseline || !pct || !year) return "";
  return `By ${year}, Solenne will reduce IT-related emissions by ${pct}% from the ${baseline} t CO₂e/yr baseline.`;
}

export const eur3 = (n: number) => "€" + n.toLocaleString("en-US");

// --- Store keys -------------------------------------------------------------

export const L3 = {
  materialKey: "l3:material",
  refL1Key: "l3:refL1",
  refL2Key: "l3:refL2",
  chosenOptKey: "l3:chosenOpt",
  seqPrefix: "l3:seq:",
} as const;

export const seqKey = (chipId: string) => `${L3.seqPrefix}${chipId}`;
