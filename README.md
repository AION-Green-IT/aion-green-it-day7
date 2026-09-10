# AION Green IT — Day 7

**Optimising and Greening Data Centre Operations** — the interactive working companion
for Day 7. Three routes, each its own case and its own deliverable, built on the same
shared chrome, state, and export conventions established across Day 5 and Day 6. All
three routes are built.

- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · Zustand
- **State:** `localStorage` only — no backend, no auth, no accounts
- **Output:** static export (`out/`), deploy-ready to any static host

See [`UX-STANDARDS.md`](./UX-STANDARDS.md) for the 10 interaction/UX conventions every
route — on this day and every future day built from this folder — is expected to follow.

---

## Routes

| Route | Deliverable | Status |
|---|---|---|
| `/` | Day overview | built |
| `/route-1-foundations` | Sustainability Claim Audit | **built** |
| `/route-2-application` | Prioritisation Decision Memo | **built** |
| `/route-3-decision-architecture` | Board Decision Memo | **built** |

Each route is a separate page and its own independent case study — see `lib/routes.ts`
for the shared route registry (`CASE`, `Route`, `ROUTES`) consumed by the home page and
the top-bar nav rail. Every route is always reachable: `lib/routeGating.ts` /
`components/chrome/RouteGate.tsx` never hides a route's content, it only shows a
non-blocking banner recommending the previous route's export be submitted first
(tracked via a `checks["rN:exported"]` flag set the moment that route's export fires)
— see [`UX-STANDARDS.md`](./UX-STANDARDS.md) standard #6.

**Export filenames** follow `1-<name>-day7-l<level>task<taskNumber>` — e.g.
`1-muchson-day7-l2task1`. Built in `lib/downloadFile.ts`. Export itself is a real file
download (`.json` — raw structured answers for grading — plus a standalone `.html`
report) via `downloadTextFile`; there is no PDF library, and no `window.print()` flow,
in this project by design.

**Languages (EN / DE)** — a switcher sits top-right in the `TopBar`; English is the
default and the choice persists. `lib/i18n/core.ts` holds the translator (`t()`, keyed by
the English source string, falling back to English when a key is missing) and
`lib/i18n/de.ts` holds the German. `LocaleBoundary` in the layout owns the active locale:
it sets it during render and keys the subtree on it, so switching re-renders everything
below without each component needing its own subscription. The core is deliberately not a
`"use client"` module — a client-only module's exports become client references when a
server component imports them, which breaks `t()` during the static export; anything that
calls `t()` is a client component so a switch actually re-renders it. Run
`npm run i18n:coverage` (add `--missing` to list them) for what is still untranslated.

**Outside references** — material prose supports inline `[label](url)` markers, rendered
by `components/ui/RichText.tsx` (one regex, no markdown library) as accent-underlined
links that open in a new tab. Every named-but-not-fully-defined term — a standard, a
directive, an initiative, a framework — carries one, so a learner can follow up without
the material having to define everything from scratch: ISO/IEC 30134-2/-3/-8/-9,
ISO 50001, EMAS, COSO ERM, the IIA Three Lines Model, the GHG Protocol, CSRD/ESRS,
the EU EED and its data-centre delegated regulation, Germany's EnEfG, Guarantees of
Origin, green bonds, and Google's 24/7 Carbon-Free Energy programme. Route 1's five
renewable-pathway cards each link to a real-world example the same way.

**Material ↔ task traceability** — every material block carries a `reasoning: string[]`
of decision rules, rendered by `MaterialBlock` as a "How to decide when this comes up in
the task" panel, and every task step carries a `material: MaterialSectionId[]` rendered
as `MaterialRefs` chips that scroll to that block and flash it in the accent
(`anim-flash-ref`, deliberately not the red `anim-flash-warn` used for missing items).
Anchors come from `lib/materialAnchor.ts`; each route's `materialRefs()` builds the
chips. Coverage is a shipping rule: every option a task offers — a category, a verdict,
a lever, a horizon, a sequencing principle, a tension dimension — must be named and
explained in the material first. Route 1's block 6 and Route 3's blocks 5–6 exist
specifically to close that gap for their tasks.

**Mentor answer key** — every route also has a passcode-gated "Mentor: generate answer
key" button (same `muchson123` gate as the demo auto-fill, `lib/mentorPasscode.ts`)
next to its Mentor Tools, which downloads a standalone `.html` document listing every
classification-style question with its correct choice and, for every other option, a
concrete reason it wasn't the answer — so a mentor can explain a wrong answer without
re-deriving the reasoning live. Shared rendering lives in `lib/answerKey.ts`; each
route's own `components/routeN/AnswerKeyTool.tsx` supplies the questions.

## Route 1 — Foundations (built)

Case: **GreenStack Hosting** (fictional). Materi covers the data-centre energy chain
and the PUE formula, five pathways to renewable-energy integration (on-site, PPA, GoO,
green tariff, site selection), the accounting realities and blind spots behind a
sustainability claim, and cross-facility benchmarks — anchored by the shared "Anatomy
of a Data Centre" SVG (`components/ui/FacilitySvg.tsx`).

**Task 1 — Sustainability Claim Auditor**, four stages worked in any order, each
feeding a live "Audit Findings Report" (`components/route1/AuditReportPanel.tsx`) that
doubles as the export preview: an Evidence Sorter, a PUE Claim Validity Check, a Gap
Finder (pick exactly 3 aspects, justify each), and a Technical vs. Governance Split.
Exports as `...-l1task1`.

## Route 2 — Application (built)

Case: **Meridian Data Systems GmbH** (fictional). Materi covers the four forces in
constant tension (Sustainability / Cost / Security of Supply / Availability, shown as
an empty `RadarChart` shell learners fill in later), a seven-criteria prioritisation
framework synthesising the Impact–Effort Matrix and McKinsey's Three Horizons (an
interactive `CriteriaWheel` in-context glossary), real-world PPA/green-bond financing
and the EU Energy Efficiency Directive's actual disclosure obligation (correcting the
common "EU mandates a PUE threshold" misconception), and the Board → CIO/CTO → IT Ops
→ Finance governance approval chain.

**Task 2 — Prioritisation Decision Simulator**: 7 criterion cards, each scoring three
funding options (A — extended green electricity contract, B — technical PUE
investment, C — extended management model) by clicking the situational statement that
best fits Meridian's constraints (`components/route2/CriterionCard.tsx`) — a
`Show clue` guiding question per option, never the answer. A 7-axis `RadarChart`
(`PrioritizationRadar.tsx`, options told apart by line style, not colour alone) builds
live as criteria are scored. A Decision section then asks for a final recommendation,
a justification, two follow-up decisions, and two risks of the "easy but shallow"
alternative — all composing into a live Board Decision Memo
(`DecisionMemoPanel.tsx`), sticky on desktop / accordion on mobile, which is also the
export preview. Exports as `...-l2task1`.

## Route 3 — Decision Architecture (built)

Materi covers an integrated five-element feedback loop (Energy Source → Efficiency/PUE
→ Load & Transparency → Communication → Governance Review → back to Energy Source, an
interactive `FeedbackLoopSvg` that dims non-adjacent nodes on hover/tap), assurance
frameworks a senior decision-maker should recognise (COSO ERM, the Three Lines Model,
ISO 50001, and the ISO/IEC 30134 KPI family — PUE, CUE, WUE, REF), the CSRD/Omnibus I
timeline narrowing mandatory scope to ~5,000 companies from FY2027, and EnEfG's
concrete 2025–2028 obligations mapped back onto the five loop elements.

**Task 3 — Board-Level Decision Builder**, two phases, both open from the start:

- **Phase 1 — Diagnostic (AeroPulse Data Infrastructure GmbH):** a Rapid
  Multi-Perspective Scan (`PerspectiveScan.tsx`, the same click-to-sort mechanic as
  Route 1's Evidence Sorter, 8 observations across 6 perspectives), a lever selection
  (exactly 4 of 8, justified, each tagged Short/Medium/Structural), and a
  management-framed first-measure decision.
- **Phase 2 — Builder (PolarEdge Data Systems):** a 7-block form (strategic
  relevance, 3 guiding decisions, prioritisation-logic principles, ≥2 trade-off pairs
  from the 5 tension dimensions reused from Route 2, a recommended first measure drawn
  from Phase 1's levers, a governance/approval mini-table with a toggle-open
  `GovernanceFlowDiagram` reference, and one decision to make now) composing live into
  a formal Board Decision Memo (`BoardMemoPanel.tsx`) with an appendix summarising
  Phase 1's diagnostic findings.

Missing-item messages are itemised per phase and block (e.g. "Phase 2 — Builder,
Block 4: trade-off selection incomplete"). Exports as `...-l3task1`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # static export → ./out
npm run typecheck  # tsc --noEmit
```

## Where things live

- `lib/routes.ts` — the day-level `CASE`, the `Route` type, and `ROUTES` (the actual
  route registry consumed by the home page and `TopBar`).
- `lib/route1.ts` / `lib/route2.ts` / `lib/route3.ts` — each route's copy, case data,
  and pure math (no React — importable anywhere).
- `lib/store.ts` — the generic Zustand + `localStorage` store (key
  `aion-greenit-day7`), shared by every route; each route namespaces its own keys
  (`r1:...`, `r2:...`, `r3:...`) so progress never collides across routes.
- `lib/routeGating.ts` — cross-route unlock keys and the `useRouteUnlocked` hook (drives
  the soft banner only, never blocks rendering).
- `lib/downloadFile.ts` — the shared `.json`/`.html` file-download export mechanism and
  filename convention.
- `components/route1/*`, `components/route2/*`, `components/route3/*` — each route's
  mechanics (task steps, and the live report/export components).
- `components/chrome/*`, `components/ui/*`, `components/icons/*` — shared chrome (top
  bar, footer, `RouteGate`), generic UI (`Reveal`, `SectionHeading`, `MaterialBlock`,
  `IndustryCallout`, `RadarChart`, `MiniStepper`, `MissingList`, `MentorFillButton`,
  `ClueToggle`, `ConfidenceHint`, `GovernanceFlowDiagram`, and the content-agnostic
  `FacilitySvg`), the single-colour icon registry, and `useAnimatedNumber` — each is
  one shared implementation used across every route that needs it, not a
  per-route fork.
