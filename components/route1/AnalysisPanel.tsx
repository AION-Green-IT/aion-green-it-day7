"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R1, TAGS, TASK1, CASE_BRIEF, type ClassifyColumn, type StageId } from "@/lib/route1";
import { useRoute1 } from "./useRoute1";
import { LifecycleReportPreview } from "./LifecycleReportPreview";

const RISK_FIELDS = [
  { key: R1.risk1, label: TASK1.step4.riskPrompts[0] },
  { key: R1.risk2, label: TASK1.step4.riskPrompts[1] },
  { key: R1.risk3, label: TASK1.step4.riskPrompts[2] },
];

/** Step 4 — split-screen: builder on the left, the live report assembling on the right. */
export function AnalysisPanel() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(340px,42%)]">
      <div className="min-w-0 space-y-8">
        <RiskFields />
        <CriteriaChecklist />
        <ClassificationBoard />
        <RecommendationField />
      </div>
      <div id="r1-report" className="min-w-0 scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
        <LifecycleReportPreview />
      </div>
    </div>
  );
}

function RiskFields() {
  const notes = useProgress((s) => s.notes);
  const setNote = useProgress((s) => s.setNote);
  return (
    <section className="space-y-3">
      <h3 className="text-h3 text-ink">Risk identification</h3>
      <p className="text-caption text-ash">
        Name one concrete risk per box — reference a specific vendor, lifecycle stage, or number from the case, not a
        generic worry.
      </p>
      {RISK_FIELDS.map(({ key, label }, i) => (
        <label key={key} className="block">
          <span className="text-caption font-semibold text-ink">{label}</span>
          <textarea
            value={notes[key] ?? ""}
            onChange={(e) => setNote(key, e.target.value)}
            rows={2}
            placeholder={`Risk ${i + 1} relates to [stage/vendor] because...`}
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
          />
        </label>
      ))}
    </section>
  );
}

function CriteriaChecklist() {
  const r1 = useRoute1();
  const checks = useProgress((s) => s.checks);
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const notes = useProgress((s) => s.notes);
  const setNote = useProgress((s) => s.setNote);

  const validatedTags = useMemo(
    () =>
      TAGS.filter((t) => {
        const stage = r1.tagPlacements[t.id];
        return stage && (t.validStages as StageId[]).includes(stage as StageId);
      }),
    [r1.tagPlacements],
  );

  return (
    <section className="space-y-3">
      <h3 className="text-h3 text-ink">Procurement criteria builder</h3>
      <p className="text-caption text-ash">Seeded from the tags you placed correctly in Step 2.</p>
      <div className="space-y-2">
        {validatedTags.map((t) => (
          <label key={t.id} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2">
            <input
              type="checkbox"
              checked={!!checks[R1.criteria(t.id)]}
              onChange={(e) => toggleCheck(R1.criteria(t.id), e.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            <span className="text-caption text-ink">{t.label}</span>
          </label>
        ))}
        {validatedTags.length === 0 && (
          <p className="text-caption text-ash">Place at least one valid tag in Step 2 to seed criteria here.</p>
        )}
      </div>
      <label className="block">
        <span className="text-caption font-semibold text-ink">Additional criterion (optional)</span>
        <p className="text-micro text-ash">
          Phrase it as something a tender could actually score — e.g. "Warranty length ≥ 3 years," not just a topic.
        </p>
        <input
          value={notes[R1.criteriaCustom] ?? ""}
          onChange={(e) => setNote(R1.criteriaCustom, e.target.value)}
          placeholder="Any other criterion this tender should score"
          className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
        />
      </label>
    </section>
  );
}

function ClassificationBoard() {
  const r1 = useRoute1();
  const choose = useProgress((s) => s.choose);
  const [selected, setSelected] = useState<string | null>(null);
  const [dragKey, setDragKey] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<ClassifyColumn | null>(null);

  const items = [
    { key: R1.risk1, text: r1.risk1.trim() },
    { key: R1.risk2, text: r1.risk2.trim() },
    { key: R1.risk3, text: r1.risk3.trim() },
  ].filter((it) => it.text.length > 0);

  const place = (key: string, col: ClassifyColumn) => {
    choose(R1.classify(key), col);
    setSelected(null);
  };

  const unplaced = items.filter((it) => !r1.classify[it.key]);
  const columnItems = (col: ClassifyColumn) => items.filter((it) => r1.classify[it.key] === col);
  const truncate = (t: string) => (t.length > 90 ? `${t.slice(0, 90)}…` : t);

  return (
    <section className="space-y-3">
      <h3 className="text-h3 text-ink">Classify your own findings</h3>
      <p className="text-caption text-ash">{TASK1.step4.classifyInstructions}</p>
      {items.length === 0 && (
        <p className="text-caption text-ash">Fill in the three risks above first — they'll show up here to classify.</p>
      )}

      {unplaced.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {unplaced.map((it) => (
            <div
              key={it.key}
              draggable
              role="button"
              tabIndex={0}
              aria-pressed={selected === it.key}
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", it.key);
                e.dataTransfer.effectAllowed = "move";
                setDragKey(it.key);
              }}
              onDragEnd={() => setDragKey(null)}
              onClick={() => setSelected((cur) => (cur === it.key ? null : it.key))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected((cur) => (cur === it.key ? null : it.key));
                }
              }}
              className={clsx(
                "max-w-xs cursor-grab rounded-xl border bg-paper px-3 py-2 text-caption shadow-sm transition-all duration-150 active:cursor-grabbing",
                dragKey === it.key && "is-dragging",
                selected === it.key ? "border-accent ring-2 ring-accent/30" : "border-line hover:border-ash",
              )}
            >
              {truncate(it.text)}
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {(["purchasing", "governance"] as ClassifyColumn[]).map((col) => (
          <div
            key={col}
            onDragOver={(e) => {
              e.preventDefault();
              if (overCol !== col) setOverCol(col);
            }}
            onDragLeave={() => setOverCol((c) => (c === col ? null : c))}
            onDrop={(e) => {
              e.preventDefault();
              const key = e.dataTransfer.getData("text/plain");
              setOverCol(null);
              if (key) place(key, col);
            }}
            onClick={() => {
              if (selected) place(selected, col);
            }}
            className={clsx(
              "min-h-[110px] rounded-xl border p-3 transition-colors duration-150",
              overCol === col ? "border-accent bg-accentSoft" : selected ? "border-dashed border-accent/60" : "border-line",
            )}
          >
            <p className="text-micro font-semibold uppercase tracking-wide text-ash">
              {col === "purchasing" ? "Purchasing-level decision" : "Management/Governance-level decision"}
            </p>
            <div className="mt-2 space-y-1.5">
              {columnItems(col).map((it) => (
                <div key={it.key} className="reveal-in rounded-lg bg-paper px-2 py-1.5 text-micro text-ink shadow-sm">
                  {truncate(it.text)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecommendationField() {
  const choose = useProgress((s) => s.choose);
  const r1 = useRoute1();
  const options = [
    { id: "vendor1", label: CASE_BRIEF.vendor1.label },
    { id: "vendor2", label: CASE_BRIEF.vendor2.label },
    { id: "phased", label: "Phased approach" },
  ];
  return (
    <section className="space-y-3">
      <h3 className="text-h3 text-ink">{TASK1.step4.recommendationLabel}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => choose(R1.recommendation, o.id)}
            aria-pressed={r1.recommendation === o.id}
            className={clsx(
              "rounded-xl border px-4 py-2 text-caption font-semibold transition-colors duration-150",
              r1.recommendation === o.id ? "border-accent bg-accent text-paper" : "border-line text-ink hover:border-ash",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </section>
  );
}
