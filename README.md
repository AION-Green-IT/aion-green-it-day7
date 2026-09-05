# AION Green IT — Module 3, Day 4

**Green IT in IT Strategy & Procurement** — the interactive working companion for
Module 3. One business case (fictional **Solenne Industrial Technik AG**) is
carried through three levels, each on its own route and each producing a document
a professional would actually hand over.

- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · Zustand
- **State:** `localStorage` only — no backend, no auth, no accounts
- **Output:** static export (`out/`), deploy-ready to any static host

---

## Routes

| Route | Level | Deliverable | Status |
|---|---|---|---|
| `/` | Module overview | — | built |
| `/module-3/level-1` | L1 — Knowledge | Diagnostic Note | **built** |
| `/module-3/level-2` | L2 — Application | Calculation Note | **built** |
| `/module-3/level-3` | L3 — Management decision | Decision Memo + Portfolio | **built** |

The three levels are deliberately separate routes, and each is **independently
accessible** — no level is locked behind another, so learners can jump around.
They still chain by content: Level 2 pulls in Level 1's Diagnostic Note and
Level 3 pulls in both, showing an empty-state reference when a prior note isn't
saved yet.

**Export filenames** follow `<n>.<name>-day4-materi<n>` — e.g.
`1.muchson-day4-materi1`, `2.muchson-day4-materi2`, `3.muchson-day4-materi3`.

**Free-text fields:** the "how to answer" instruction is a small caption under
the field's title (always visible), never only inside the placeholder — a
placeholder disappears the moment a learner starts typing, so it can't double
as a format to copy. Placeholders are kept short (a sentence starter like
`Gap 1 relates to [bucket] because...`).

## Level 1 — Knowledge (built)

`Level 1 — Knowledge: Reading Solenne's IT Strategy`

1. **Story intro** — the case, beside a network motif whose "sustainability"
   node is greyed out and only loosely tethered (fade-in on scroll).
2. **Study material** — 11 expand cards, grouped into the module's two stated
   halves (**Part A — Sustainable IT strategy**, **Part B — Sustainable
   procurement**), one card per bullet of the class's Knowledge Input
   checklist (see table below). Each card is a full knowledge unit, not a
   one-liner: a dense framework/definition, a concrete real-world example
   with a number where one is verifiably known, a custom SVG diagram (drawn
   in, not decorative), a one-line career/academic-readiness note, and 1–2
   external references (real standards/frameworks — ISO 20400, GHG Protocol,
   COBIT, TCO Certified, EPEAT, RBA, EU GPP/CSRD, WEEE, SBTi) opening in a
   new tab. 11 progress dots gate the task, which stays locked until all
   cards are opened.

   | Card | Knowledge Input bullet covered |
   |---|---|
   | A1 What makes an IT strategy sustainable | "What characterises a sustainable IT strategy" + "sustainability as part of the IT target vision, architecture, investment logic and governance" |
   | A2 Single action vs. strategic embedding | "Difference between individual measures and strategic anchoring" |
   | A3 Corporate strategy ↔ sustainability goals ↔ IT strategy | "Relationship between corporate strategy, sustainability goals and IT strategy" |
   | A4 Typical fields of action | "Typical fields of action: infrastructure, procurement, life cycle, operations, software, governance, metrics" |
   | A5 Not just an environmental topic | "Why a sustainable IT strategy is not only an environmental topic, but also a risk, cost and competitiveness topic" |
   | B1 Introduction to sustainable procurement | "Introduction to sustainable procurement in IT" |
   | B2 Procurement criteria beyond price/performance | "Considering procurement not only in terms of price and performance, but also life cycle, repairability, energy efficiency, origin, supply chain and disposability" |
   | B3 Supplier requirements & minimum standards | "Importance of supplier requirements, selection criteria and minimum standards" |
   | B4 Tenders, specifications & guidelines | "Role of tenders, specification documents and procurement guidelines" |
   | B5 Trade-offs | "Trade-offs between cost, availability, standardisation, sustainability ambition and time pressure" |
   | B6 Procurement as a management lever | "Why sustainable procurement is a management lever for long-term impact" |

3. **Task 1 — Diagnostic Note**
   - Sorting board: 10 draggable signals → 5 buckets (Target Picture,
     Governance, Investment Logic, Procurement, Supplier Control), with a live
     horizontal bar chart. Drag **or** tap-to-select + tap-to-place. Each bucket
     header has a **"?" info popover** — a one-line definition, a small SVG
     diagram of the concept, and example signals — so a learner can decide
     where a card belongs without guessing from the label alone. Nothing is
     marked on drop; once all ten are sorted, an optional **"Check placements"**
     shows each card's most common bucket + why (a re-checkable guidance loop),
     never a hard score.
   - Written reflection (judged): two fields, unlocked once all 10 are sorted.
   - Export: a one-page **Diagnostic Note** (preview modal → Save as PDF),
     persisted to this browser and available to Level 2.

## Level 2 — Application (built)

`Level 2 — Application: Where Should Solenne Move First?`

- **Story continuation** — same motif with the Procurement lever pulsing, plus a
  collapsible read-only copy of the learner's own Diagnostic Note. Opening it
  unlocks two otherwise-locked sliders.
- **6 deep material cards**, same standard as Level 1 (framework + real example
  + diagram + career-readiness note + verified references), each tagged with
  the task part it feeds: readiness vs. importance (2×2 matrix), the marginal
  abatement cost curve behind Option C's diminishing returns, why procurement
  compounds, TCO vs. sticker price, why a strategy still needs governance, and
  capital rationing under a hard ceiling.
- **Task 2 — Calculation Note**
  - Readiness Scorecard: 5 sliders (1–5) with 1/3/5 anchor tooltips and a live
    5-axis radar; Procurement & Governance stay locked until the note is reviewed.
  - Consequence Simulator: 3 accordion panels (A toggle / B tier slider / C
    device slider) with transparent inline formulas. Panel C hides a
    "CO₂-per-euro" risk flag that only appears past 250 units.
  - Live comparison table against a fixed €120,000 budget ceiling.
  - Judged 2-field reflection, unlocked once all panels are opened and every
    slider is set.
  - Export: a one-page **Calculation Note** (radar + comparison + answers),
    persisted for Level 3.

## Level 3 — Management Decision (built)

`Level 3 — Management Decision: What Do You Tell the Board?`

- **Story continuation** — the motif is now fully wired with a dashed, pulsing
  "Board Decision" node; below it, both prior notes are shown read-only.
- **7 deep material cards** — the 5 original ones (colour-tagged to a memo
  field: target timeline, RACI org-chart, stage-gate, supplier cycle,
  accountability) deepened to Level 1's standard, plus **2 new ones** closing
  a real coverage gap: the budget allocator and the sequencing widget
  previously had no dedicated material at all. Added: capital rationing
  across simultaneous commitments (budget allocator) and impact/effort
  sequencing (implementation roadmap) — each with its own diagram and
  verified references.
- **Task 3 — Decision Memo (split-screen builder)**
  - Left = builder, right = the memo assembling live in reading order, opening by
    quoting the learner's own Level 1 gaps and Level 2 priority.
  - Budget allocator against the €120,000 ceiling; the bar and remaining balance
    turn red and block submit when over budget.
  - Five colour-coded component fields (Target / Governance / Investment /
    Supplier / Accountability) with validation ("name a role, not a department").
  - Sequencing widget: drag/tap 9 actions into Short / Medium / Structural; the
    order feeds the memo's roadmap silently.
  - Mandatory "measure you postponed" closing field.
  - **Submit** → a combined three-note **Portfolio** PDF (Diagnostic +
    Calculation + Decision Memo) under one header.

## Time budget

The class allocates 2h / 1.5h / 1.5h to Levels 1/2/3. Rough estimate for a
learner engaging seriously with the deepened material (reading each card's
framework + example, not skimming) plus the task itself:

| Level | Material (reading) | Task (interacting + writing) | Total | Allocated |
|---|---|---|---|---|
| 1 | ~35–45 min (11 cards) | ~60–80 min (sort + check + 2 reflections) | ~95–125 min | 120 min |
| 2 | ~20–25 min (6 cards) | ~50–70 min (scorecard + 3 panels + table + 2 reflections) | ~70–95 min | 90 min |
| 3 | ~28–35 min (7 cards) | ~60–85 min (budget + 5 fields + sequencing + closing) | ~90–120 min | 90 min |

This was the check behind deepening Level 2/3's material from one-line
summaries to Level 1's standard (framework + example + diagram + reference):
shallow material was the actual shortfall against the allocated time, not the
task mechanics, which were already interactive and multi-part.

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

- `lib/module3.ts` — all Level 1 copy (verbatim), the case, and the level list.
- `lib/level1.ts` — maps Level 1's mechanics onto the generic progress store.
- `lib/store.ts` — the generic Zustand + `localStorage` store (key
  `aion-greenit-day4`).
- `components/level1/*` — the Level 1 mechanics (cards, sorting board,
  reflection, export).
- `components/visuals/*` — the network motif and the bucket bar chart.
