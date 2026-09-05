# AION Green IT — Day 5

**Sustainable IT Lifecycle & Circular Procurement** — the interactive working companion
for Day 5. Three routes, each its own case and its own deliverable, built on the same
shared chrome, state, and export conventions.

- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · Zustand
- **State:** `localStorage` only — no backend, no auth, no accounts
- **Output:** static export (`out/`), deploy-ready to any static host

---

## Routes

| Route | Deliverable | Status |
|---|---|---|
| `/` | Day overview | — | built |
| `/route-1-lifecycle-foundations` | Lifecycle Impact Mapper | **built** |
| `/route-2-decision-tradeoffs` | Procurement Decision Matrix | planned |
| `/route-3-management-governance` | Governance Diagnostic & Executive Proposal | planned |

Each route is a separate page and (once built) its own independent case study —
see `lib/routes.ts` for the shared route registry (`CASE`, `Route`, `ROUTES`) consumed
by the home page and the top-bar nav rail.

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
- `lib/route1.ts` — all Route 1 copy, case data, and the pure lifecycle-carbon/cost
  math (no React — importable anywhere).
- `lib/store.ts` — the generic Zustand + `localStorage` store (key
  `aion-greenit-day5`), shared by every route.
- `components/route1/*` — Route 1's mechanics: the material blocks and their
  visualizers, the stage explorer, the tag pool, the calculator, the analysis panel,
  the pushback modal, and the report/export/print components.
- `components/chrome/*`, `components/ui/*`, `components/icons/*` — shared chrome
  (top bar, footer), generic UI (reveal-on-scroll, section heading, confirm dialog),
  and the single-colour icon registry, reused across all three routes.
