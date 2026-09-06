# AION Green IT — Day 5

**Sustainable IT Lifecycle & Circular Procurement** — the interactive working companion
for Day 5. Three routes, each its own case and its own deliverable, built on the same
shared chrome, state, and export conventions.

- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · Zustand
- **State:** `localStorage` only — no backend, no auth, no accounts
- **Output:** static export (`out/`), deploy-ready to any static host

See [`UX-STANDARDS.md`](./UX-STANDARDS.md) for the 10 interaction/UX conventions every
route — on this day and every future day built from this folder — is expected to follow.

---

## Routes

| Route | Deliverable | Status |
|---|---|---|
| `/` | Day overview | — | built |
| `/route-1-lifecycle-foundations` | Lifecycle Impact Mapper | **built** |
| `/route-2-decision-tradeoffs` | Procurement Decision Matrix | **built** |
| `/route-3-management-governance` | Governance Diagnostic & Executive Proposal | **built** |

Each route is a separate page and its own independent case study — see `lib/routes.ts`
for the shared route registry (`CASE`, `Route`, `ROUTES`) consumed by the home page and
the top-bar nav rail. Routes 2 and 3 are additionally gated at runtime by
`lib/routeGating.ts` / `components/chrome/RouteGate.tsx`: a route stays locked until the
previous route's export has actually been downloaded (tracked via a `checks["rN:exported"]`
flag set the moment the export button's "Download as PDF" fires).

**Export filenames** follow `<day>-<name>-day<day>-task<n>` — e.g.
`5-muchson-day5-task1`. Built in `lib/exportFilename.ts`; export itself is the browser's
native print dialog (`window.print()`, "Save as PDF") — there is no PDF library in this
project by design.

## Route 1 — Lifecycle Foundations (built)

Case: **LogicSphere Solutions**, choosing between two notebook vendors for a 300-unit
fleet — one cheaper with a 3-year replacement cycle, one 18% more expensive with a
6-year cycle and real lifecycle service.

1. **Material** — four blocks (TCO vs. purchase price, embodied carbon, the
   circular-economy R-ladder, EU regulatory context), each pairing a real framework
   with an "Impact Delta Visualizer": a TCO Reveal Bar, a manufacturing/use-phase
   stacked chart with a lifespan slider, a repair-vs-recycle cumulative-carbon
   timeline, and a certification trust checker (verified vs. self-declared claims).
2. **Task 1 — Lifecycle Impact Mapper**, five steps:
   - Step 1 — a 9-node lifecycle-stage SVG explorer (Procurement → Disposal), click
     any node for case-specific facts.
   - Step 2 — drag (or tap-to-place) 10 sustainability tags onto the stages they
     belong to; 2 are distractors. The same stage explorer, shrunk to a sticky
     sidebar, is the drop target for the rest of the task.
   - Step 3 — a lifecycle cost calculator projecting each vendor's replacement
     schedule (units × cycle × the 299 kg CO2e baseline) across a 6–15 year horizon.
   - Step 4 — a split-screen analysis panel: risk fields, a procurement-criteria
     checklist seeded from Step 2, a drag-to-classify board (purchasing vs.
     governance), and a recommendation — with the report assembling live on the
     right.
   - Step 5 — a Finance Director pushback modal that only appears once Step 4 is
     submitted; the learner must cite a number from Step 3 and pick a branching
     response.
   - Export unlocks only once all five steps are complete.

## Route 2 — Decision Trade-offs (built)

Case: **Ferrotech Dynamics**, choosing between three procurement models — cheapest/
CapEx/3-year, repairable/CapEx/6-year, and a DaaS lease with return + refurbishment.
Locked until Route 1's export is downloaded.

1. **Material** — four blocks (Kraljic Portfolio Matrix, CapEx vs. DaaS hidden costs,
   vendor lock-in risk, the weighted decision matrix), with a Kraljic quadrant-shift
   dot animation, a two-model Hidden Cost Iceberg (extends Route 1's TCO Reveal Bar),
   a dependency-risk gauge with overshoot easing, and a 7-axis radar weighting demo.
2. **Task 2 — Procurement Decision Matrix**, four steps:
   - Step 1 — the learner answers 6 branching questions; the system (not a manual
     drag) computes the Kraljic quadrant and explains it from their own answers.
   - Step 2 — set 7 criteria weights (auto-rebalancing to stay at 100%), score
     Models A/B/C 1–5 each, watch a 3-shape radar and weighted totals update live.
   - Step 3 — a 3-way Hidden Cost Iceberg (fleet-size slider) plus the dependency
     gauge fixed to Model C's lock-in risk.
   - Step 4 — split-screen: drag all three models into a priority ranking, justify
     with a Step 2 number and a Step 3 number/risk level, stakeholder next-steps,
     and two risk statements — with the report assembling live on the right.
   - Export unlocks only once all four steps are complete.

## Route 3 — Management & Governance (built)

Two cases in one continuous arc, locked until Route 2's export is downloaded. Phase 1:
**Proxima Digital Systems GmbH** (diagnostic — you're the consultant). Phase 2:
**Helion Systems Group** (executive proposal — you're the CIO presenting to the board).

1. **Material** — four blocks (ISO 20400 governance framework, binding vs. optional
   award criteria, RACI role governance, short-term vs. structural decisions), with a
   4-rung Governance Maturity Ladder, a 5-vendor ranking that re-sorts when a criterion
   becomes scored, a RACI grid with pre-seeded Accountable-conflicts to resolve, and a
   drag-to-horizon card sorter.
2. **Task 3 — Governance Diagnostic & Executive Proposal**, two phases, four steps:
   - Step 1 — a 5-node network diagram (not a linear timeline) of Purchasing/IT/
     Sustainability/Suppliers/Management; click nodes for goals, click edges for why
     the tension exists.
   - Step 2 — force-rank 4 of 6 leverage-point candidates (the other 2 fall to "Not
     prioritized" automatically), then justify the #1 pick. Completing this triggers a
     one-time "level up" transition into Phase 2.
   - Step 3 — six interactive sub-blocks: mark Helion's position on a mini Governance
     Ladder, three core decisions each tagged with a RACI-accountable owner, a free 2D
     drag placement of conflict statements onto a Cost-Discipline-vs-Sustainability-
     Ambition matrix, a first-step choice justified against the Step 2 ranking, a RACI
     grid built from scratch (exactly one Accountable per decision), and an
     incomplete-information call.
   - Step 4 — a board-challenge modal (once Step 3 is submitted) with three response
     strategies, plus a 3-sentence executive summary.
   - The export is styled as a formal board memo (Executive Summary first, numbered
     sections after) and combines both phases in one document.

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
  `aion-greenit-day5`), shared by every route.
- `lib/routeGating.ts` — cross-route unlock keys and the `useRouteUnlocked` hook.
- `components/route1/*`, `components/route2/*`, `components/route3/*` — each route's
  mechanics (visualizers, task steps, and the report/export/print components).
- `components/chrome/*`, `components/ui/*`, `components/icons/*` — shared chrome (top
  bar, footer, `RouteGate`), generic UI (reveal-on-scroll, section heading, confirm
  dialog, `MaterialBlock`, `IndustryCallout`, `RadarChart`, `MiniStepper`), the
  single-colour icon registry, and `useAnimatedNumber` — all reused across routes.
