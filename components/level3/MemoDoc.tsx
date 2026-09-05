import clsx from "clsx";
import { CASE } from "@/lib/module3";
import type { MemoData } from "./useMemoData";

/**
 * The assembled decision memo, in natural reading order — the same markup used
 * for the live right-hand preview and for section 3 of the exported portfolio.
 * Sections appear only once they have content, so the memo assembles itself as
 * the builder is filled. `live` turns on the per-section fade for the preview.
 */
export function MemoDoc({ data, live = false }: { data: MemoData; live?: boolean }) {
  const d = data;
  const hasContext = !!(d.l1gaps.trim() || d.l2priority.trim());
  const govSentence =
    d.governance.owner || d.governance.cadence || d.governance.escalation
      ? `${d.governance.owner || "[owner]"} is accountable for sustainability outcomes, with ${d.governance.cadence || "[cadence]"} reviews. Escalation is triggered when ${d.governance.escalation || "[trigger]"}.`
      : "";
  const accSentence = d.accountability.role ? `${d.accountability.role} holds named accountability for the outcome.` : "";

  return (
    <div className="text-ink">
      {/* header */}
      <div className="space-y-0.5 text-caption">
        <p><span className="text-ash">To:</span> <span className="font-semibold">Board of Directors, {CASE.company}</span></p>
        <p><span className="text-ash">From:</span> <span className="font-semibold">{d.name || "[your name]"} — CIO recommendation</span></p>
        <p><span className="text-ash">Subject:</span> <span className="font-semibold">Sustainable IT Strategy &amp; Procurement — Recommendation</span></p>
        <p><span className="text-ash">Date:</span> <span className="font-semibold">{d.date}</span></p>
      </div>
      <hr className="my-3 border-line" />

      {hasContext ? (
        <Section live show heading="Context — carried forward">
          {d.l1gaps.trim() ? (
            <p className="text-caption text-ash"><span className="font-semibold text-ink">From the Diagnostic Note: </span>{d.l1gaps}</p>
          ) : null}
          {d.l2priority.trim() ? (
            <p className="mt-1 text-caption text-ash"><span className="font-semibold text-ink">From the Calculation Note: </span>{d.l2priority}</p>
          ) : null}
        </Section>
      ) : null}

      <Section live show={!!d.targetSentence} heading="1. Target picture">
        <p className="text-body">{d.targetSentence}</p>
        {d.targetRationale ? <p className="mt-1 text-caption text-ash">{d.targetRationale}</p> : null}
      </Section>

      <Section live show={!!(govSentence || accSentence)} heading="2. Governance & accountability">
        {govSentence ? <p className="text-body">{govSentence}</p> : null}
        {accSentence ? <p className="mt-1 text-body">{accSentence}</p> : null}
      </Section>

      <Section live show={!!d.investment.stage} heading="3. Investment logic">
        <p className="text-body">The sustainability check becomes mandatory at the <span className="font-semibold">{d.investment.stage}</span> stage. {d.investment.rationale}</p>
      </Section>

      <Section live show={!!d.supplier.cadence} heading="4. Supplier control">
        <p className="text-body">Suppliers are reviewed on a <span className="font-semibold">{d.supplier.cadence}</span> basis. {d.supplier.rationale}</p>
      </Section>

      <Section live show={d.funded.length > 0} heading="5. Budget">
        <ul className="space-y-0.5 text-body">
          {d.funded.map((f, i) => (
            <li key={i} className="flex justify-between gap-4">
              <span>{f.label}</span>
              <span className="tabular-nums">{d.eur(f.amount)}</span>
            </li>
          ))}
        </ul>
        <p className={clsx("mt-1 text-caption font-semibold", d.overBudget ? "text-danger" : "text-ash")}>
          Committed {d.eur(d.spent)} of €120,000 · {d.overBudget ? `over by ${d.eur(-d.remaining)}` : `${d.eur(d.remaining)} remaining`}
        </p>
      </Section>

      <Section live show={d.roadmap.some((c) => c.items.length > 0)} heading="6. Implementation roadmap">
        <div className="grid gap-3 sm:grid-cols-3">
          {d.roadmap.map((col) => (
            <div key={col.label}>
              <p className="text-caption font-semibold text-ink">{col.label}</p>
              <ul className="mt-1 space-y-0.5">
                {col.items.length ? col.items.map((it, i) => (
                  <li key={i} className="text-caption text-ash">• {it}</li>
                )) : <li className="text-caption text-ash/70">—</li>}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section live show={!!d.postponed.trim()} heading="7. Consciously postponed">
        <p className="whitespace-pre-wrap text-body text-ash">{d.postponed}</p>
      </Section>
    </div>
  );
}

function Section({ heading, show, live, children }: { heading: string; show: boolean; live?: boolean; children: React.ReactNode }) {
  if (!show) return null;
  return (
    <section className={clsx("mt-4", live && "reveal-in")}>
      <h3 className="mb-1 text-h3 text-ink">{heading}</h3>
      {children}
    </section>
  );
}
