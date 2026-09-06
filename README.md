# AION Green IT — Day 6

**Data Center Efficiency, Trade-offs & Governance** — the interactive working companion
for Day 6. Three routes, each its own case and its own deliverable, built on the same
shared chrome, state, and export conventions established in Day 5.

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
| `/route-1-the-audit` | Diagnostic Mapping & Priority Decision | **built** |
| `/route-2-the-tradeoff` | Trade-off Analysis | **built** |
| `/route-3-the-boardroom` | Board Proposal | **built** |

Each route is a separate page and its own independent case study — see `lib/routes.ts`
for the shared route registry (`CASE`, `Route`, `ROUTES`) consumed by the home page and
the top-bar nav rail. Every route is always reachable: `lib/routeGating.ts` /
`components/chrome/RouteGate.tsx` never hides a route's content, it only shows a
non-blocking banner recommending the previous route's export be submitted first
(tracked via a `checks["rN:exported"]` flag set the moment that route's "Download as
PDF" fires) — see [`UX-STANDARDS.md`](./UX-STANDARDS.md) standard #6.

**Export filenames** follow `<day>-<name>-day<day>-<suffix>` — e.g.
`6-muchson-day6-audit-mapping`. Built in `lib/exportFilename.ts` (`suffix` is either a
descriptive string or a `taskN` number); export itself is the browser's native print
dialog (`window.print()`, "Save as PDF") — there is no PDF library in this project by
design.

## Route 1 — The Audit (built)

Case: **CoreAxis Data Services**, a mid-size facility that grew organically for a
decade and has never had a technical efficiency audit — 18% average utilization, a PUE
of 1.9 against a 1.56 global average, no continuous monitoring, Tier IV-equivalent 2N
redundancy everywhere, and an 11-week decommission process.

1. **Material** — six sections (why data centers matter, the IT-load/facility-load
   split, common inefficiency patterns, technical levers, PUE/monitoring with a live
   worked-example calculator, and Uptime Institute Tier classification including its
   2009 percentage removal), anchored by the shared "Anatomy of a Data Center" SVG.
2. **Task 1a — Diagnostic Mapping**: click all 6 zones on the facility map, each with a
   forced-choice reasoning question (nothing is graded on click), then a
   Categorization & Prioritization panel — classify every zone (technical vs.
   governance, short- vs. medium-term), pick one zone to prioritize, and describe the
   improvement approach. Exports as `...-audit-mapping`.
3. **Task 1b — Priority Simulator**: two sliders (Budget Available, Risk Tolerance)
   re-weight a 6-axis radar (reusing `RadarChart`'s existing weights mechanic) across
   three funding options, then commit to one with a justification, a follow-on
   decision, and two named risks. Exports as `...-priority-decision`.

## Route 2 — The Trade-off (built)

Case: **DeltaGrid Hosting GmbH** — the learner is promoted from field analyst to
senior consultant. Materi covers the TCO/CapEx/OpEx/Cost-of-Risk framework, Uptime
Institute downtime-cost figures, why technical fixes regress without governance, ISO
50001's PDCA loop, and a conceptual "governance sweet spot" cost curve. The facility
SVG is evolved (not rebuilt) with per-rack build-generation badges and a cost-of-risk
marker — see `components/ui/FacilitySvg.tsx`.

**Task 2 — The DeltaGrid Case**:
- Step 1 — exploratory Scenario Dials (Utilization / Cooling / Transparency), never
  graded, projecting directional (not fake-precise) Energy Cost / Risk / Investment
  trends.
- Step 2 — Structured Analysis: pick 4 of 7 levers with a justification each,
  drag-to-reorder them with a full undo/redo history stack
  (`components/route2/LeverRanking.tsx`), choose a management-framed first step,
  classify each lever's time horizon, and name information gaps. Exports as
  `...-tradeoff-analysis`.

## Route 3 — The Boardroom (built)

Case: **NovaCore Infrastructure Group** — the capstone; the learner becomes strategic
advisor building a decision-ready board proposal. Materi covers decision architecture
vs. a technical checklist, no-regret decisions under uncertainty, the RACI model, the
2026 CSRD/Omnibus I scope narrowing, and board-level goal conflicts. The facility SVG
gets a third evolution layer — a "Board Decision Points" overlay of 3 clickable
flag/tooltip pins — plus a second static diagram, `AccountabilityFlow`, showing the
Board → CTO → Infrastructure Lead → Operations Team mandate/review loop.

**Task 3 — The Board Proposal**: a form-left/live-document-right board memo builder —
Strategic Relevance, three key 12-month decisions, prioritization logic, goal-conflict
selection (curated 5, pick ≥2, justify each), a first-priority path, a dropdown RACI
grid (4 decision types × 4 roles, `components/route3/RaciGrid.tsx`, validated for
exactly one Accountable per row), and incomplete-data reasoning — plus a non-blocking
"boardroom readiness" self-check before export. Exports as `...-board-proposal`, and
the export *is* the live document, unchanged.

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
  `aion-greenit-day6`), shared by every route.
- `lib/routeGating.ts` — cross-route unlock keys and the `useRouteUnlocked` hook (drives
  the soft banner only, never blocks rendering).
- `components/route1/*`, `components/route2/*`, `components/route3/*` — each route's
  mechanics (task steps, and the report/export/print components).
- `components/chrome/*`, `components/ui/*`, `components/icons/*` — shared chrome (top
  bar, footer, `RouteGate`), generic UI (`Reveal`, `SectionHeading`, `MaterialBlock`,
  `IndustryCallout`, `RadarChart`, `MiniStepper`, `MissingList`, `MentorFillButton`,
  and the content-agnostic `FacilitySvg` — the one facility diagram all three routes
  evolve), the single-colour icon registry, and `useAnimatedNumber` — all reused across
  routes.
