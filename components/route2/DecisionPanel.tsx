"use client";

import { useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R2, CASE_BRIEF, TASK2 } from "@/lib/route2";
import { useRoute2 } from "./useRoute2";
import { ProcurementReportPreview } from "./ProcurementReportPreview";

const MODELS = ["modelA", "modelB", "modelC"] as const;
const MODEL_LABEL: Record<string, string> = {
  modelA: CASE_BRIEF.modelA.label,
  modelB: CASE_BRIEF.modelB.label,
  modelC: CASE_BRIEF.modelC.label,
};

/** Step 4 — split-screen: ranking + justification + stakeholder/risk fields on the left, the live report on the right. */
export function DecisionPanel() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(340px,42%)]">
      <div className="min-w-0 space-y-8">
        <RankingBoard />
        <JustificationFields />
        <StakeholderFields />
        <RiskFields />
      </div>
      <div id="r2-report" className="min-w-0 scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
        <ProcurementReportPreview />
      </div>
    </div>
  );
}

function RankingBoard() {
  const choose = useProgress((s) => s.choose);
  const r2 = useRoute2();
  const [selected, setSelected] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overSlot, setOverSlot] = useState<number | null>(null);

  const place = (model: string, rank: number) => {
    const prevRank = r2.ranks[model];
    const displaced = MODELS.find((m) => m !== model && r2.ranks[m] === rank);
    if (displaced) choose(R2.rank(displaced), prevRank ? String(prevRank) : "");
    choose(R2.rank(model), String(rank));
    setSelected(null);
  };

  const unplaced = MODELS.filter((m) => !r2.ranks[m]);

  return (
    <section className="space-y-3">
      <h3 className="text-h3 text-ink">{TASK2.step4.rankLabel}</h3>
      <p className="text-caption text-ash">{TASK2.step4.rankInstructions}</p>

      {unplaced.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {unplaced.map((m) => (
            <div
              key={m}
              draggable
              role="button"
              tabIndex={0}
              aria-pressed={selected === m}
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", m);
                e.dataTransfer.effectAllowed = "move";
                setDragId(m);
              }}
              onDragEnd={() => setDragId(null)}
              onClick={() => setSelected((c) => (c === m ? null : m))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected((c) => (c === m ? null : m));
                }
              }}
              className={clsx(
                "cursor-grab rounded-xl border bg-paper px-4 py-2 text-caption font-semibold shadow-sm transition-all duration-150 active:cursor-grabbing",
                dragId === m && "is-dragging",
                selected === m ? "border-accent text-accent ring-2 ring-accent/30" : "border-line text-ink hover:border-ash",
              )}
            >
              {MODEL_LABEL[m]}
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        {[1, 2, 3].map((rank) => {
          const modelHere = MODELS.find((m) => r2.ranks[m] === rank);
          const isOver = overSlot === rank;
          return (
            <div
              key={rank}
              onDragOver={(e) => {
                e.preventDefault();
                if (overSlot !== rank) setOverSlot(rank);
              }}
              onDragLeave={() => setOverSlot((c) => (c === rank ? null : c))}
              onDrop={(e) => {
                e.preventDefault();
                const m = e.dataTransfer.getData("text/plain");
                setOverSlot(null);
                if (m) place(m, rank);
              }}
              onClick={() => {
                if (selected) place(selected, rank);
              }}
              className={clsx(
                "min-h-[68px] rounded-xl border p-3 transition-colors duration-150",
                isOver ? "border-accent bg-accentSoft" : selected ? "border-dashed border-accent/60" : "border-line",
              )}
            >
              <p className="text-micro font-semibold uppercase tracking-wide text-ash">Priority {rank}</p>
              {modelHere && <p className="reveal-in mt-1 text-caption font-semibold text-ink">{MODEL_LABEL[modelHere]}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function JustificationFields() {
  const notes = useProgress((s) => s.notes);
  const setNote = useProgress((s) => s.setNote);
  return (
    <section className="space-y-3">
      <h3 className="text-h3 text-ink">Justify your decision despite incomplete information</h3>
      <label className="block">
        <span className="text-caption font-semibold text-ink">{TASK2.step4.justifyScoreLabel}</span>
        <textarea
          value={notes[R2.justifyScore] ?? ""}
          onChange={(e) => setNote(R2.justifyScore, e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
        />
      </label>
      <label className="block">
        <span className="text-caption font-semibold text-ink">{TASK2.step4.justifyRiskLabel}</span>
        <textarea
          value={notes[R2.justifyRisk] ?? ""}
          onChange={(e) => setNote(R2.justifyRisk, e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
        />
      </label>
    </section>
  );
}

function StakeholderFields() {
  const notes = useProgress((s) => s.notes);
  const setNote = useProgress((s) => s.setNote);
  return (
    <section className="space-y-3">
      <h3 className="text-h3 text-ink">{TASK2.step4.stakeholderLabel}</h3>
      {TASK2.step4.stakeholders.map((s) => (
        <label key={s.id} className="block">
          <span className="text-caption font-semibold text-ink">{s.label}</span>
          <textarea
            value={notes[R2.stakeholder(s.id)] ?? ""}
            onChange={(e) => setNote(R2.stakeholder(s.id), e.target.value)}
            rows={2}
            placeholder={`What must ${s.label} decide next?`}
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
          />
        </label>
      ))}
    </section>
  );
}

function RiskFields() {
  const notes = useProgress((s) => s.notes);
  const setNote = useProgress((s) => s.setNote);
  return (
    <section className="space-y-3">
      <h3 className="text-h3 text-ink">{TASK2.step4.riskLabel}</h3>
      {([1, 2] as const).map((n) => (
        <textarea
          key={n}
          value={notes[R2.risk(n)] ?? ""}
          onChange={(e) => setNote(R2.risk(n), e.target.value)}
          rows={2}
          placeholder={`Risk ${n}...`}
          className="w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
        />
      ))}
    </section>
  );
}
