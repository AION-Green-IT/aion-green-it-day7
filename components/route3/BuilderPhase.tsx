"use client";

import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R3, LEVERS3, LOGIC_PRINCIPLES, TASK3, materialRefs } from "@/lib/route3";
import { useRoute3 } from "./useRoute3";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { PolarEdgeBrief } from "./CaseBrief";
import { TradeoffPairs } from "./TradeoffPairs";
import { ApprovalTable } from "./ApprovalTable";
import { t } from "@/lib/i18n/core";

const { phase2 } = TASK3;

export function BuilderPhase() {
  const r3 = useRoute3();
  const setNote = useProgress((s) => s.setNote);
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const choose = useProgress((s) => s.choose);

  const recommendedOptions = r3.selectedLeverIds.length > 0 ? LEVERS3.filter((l) => r3.selectedLeverIds.includes(l.id)) : LEVERS3;

  return (
    <div className="space-y-8">
      <h3 className="text-h3 text-ink">{t(phase2.heading)}</h3>
      <PolarEdgeBrief />

      <section id="r3-p2-strategic" className="space-y-2">
        <h4 className="text-caption font-semibold text-ink">{t(phase2.b1.heading)}</h4>
        <MaterialRefs refs={materialRefs(phase2.b1.material)} />
        <label className="block">
          <span className="text-caption font-semibold text-ink">{t(phase2.b1.label)}</span>
          <p className="text-micro text-ash">{t(phase2.b1.caption)}</p>
          <textarea
            value={r3.strategicRelevance}
            onChange={(e) => setNote(R3.p2.strategicRelevance, e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
          />
        </label>
      </section>

      <section id="r3-p2-decisions" className="space-y-2">
        <h4 className="text-caption font-semibold text-ink">{t(phase2.b2.heading)}</h4>
        <MaterialRefs refs={materialRefs(phase2.b2.material)} />
        <p className="text-micro text-ash">{t(phase2.b2.caption)}</p>
        <div className="space-y-2">
          {([1, 2, 3] as const).map((n) => (
            <label key={n} className="block">
              <span className="text-caption font-semibold text-ink">Decision {n}</span>
              <input
                value={r3.guidingDecisions[n - 1]}
                onChange={(e) => setNote(R3.p2.guidingDecision(n), e.target.value)}
                placeholder={`e.g. "Approve the transparency-system budget by Q2"`}
                className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
              />
            </label>
          ))}
        </div>
      </section>

      <section id="r3-p2-logic" className="space-y-2">
        <h4 className="text-caption font-semibold text-ink">{t(phase2.b3.heading)}</h4>
        <MaterialRefs refs={materialRefs(phase2.b3.material)} />
        <p className="text-micro text-ash">{t(phase2.b3.label)}</p>
        <div className="flex flex-wrap gap-1.5">
          {LOGIC_PRINCIPLES.map((p) => {
            const selected = r3.selectedPrinciples.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => toggleCheck(R3.p2.logicPrincipleSelected(p.id), !selected)}
                aria-pressed={selected}
                className={clsx(
                  "rounded-lg border px-2.5 py-1.5 text-micro font-semibold transition-colors duration-150",
                  selected ? "border-accent bg-accentSoft text-accent" : "border-line text-ink hover:border-ash",
                )}
              >
                {t(p.label)}
              </button>
            );
          })}
        </div>
        <label className="block">
          <span className="text-caption font-semibold text-ink">{t(phase2.b3.caption)}</span>
          <p className="text-micro text-ash">{t(phase2.b3.explainCaption)}</p>
          <textarea
            value={r3.logicExplain}
            onChange={(e) => setNote(R3.p2.logicExplain, e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
          />
        </label>
      </section>

      <section id="r3-p2-tradeoffs" className="space-y-2">
        <h4 className="text-caption font-semibold text-ink">{t(phase2.b4.heading)}</h4>
        <MaterialRefs refs={materialRefs(phase2.b4.material)} />
        <p className="text-micro text-ash">{t(phase2.b4.caption)}</p>
        <TradeoffPairs />
      </section>

      <section id="r3-p2-recommended" className="space-y-2">
        <h4 className="text-caption font-semibold text-ink">{t(phase2.b5.heading)}</h4>
        <MaterialRefs refs={materialRefs(phase2.b5.material)} />
        <p className="text-micro text-ash">{t(phase2.b5.label)}</p>
        <p className="text-micro text-ash">{t(phase2.b5.caption)}</p>
        <div className="flex flex-wrap gap-2">
          {recommendedOptions.map((l) => {
            const active = r3.recommendedMeasure === l.id;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => choose(R3.p2.recommendedMeasure, l.id)}
                aria-pressed={active}
                className={clsx(
                  "rounded-xl border px-3 py-2 text-caption font-semibold transition-colors duration-150",
                  active ? "border-accent bg-accent text-paper" : "border-line text-ink hover:border-ash",
                )}
              >
                {t(l.label)}
              </button>
            );
          })}
        </div>
        {r3.recommendedMeasure && (
          <label className="block">
            <span className="text-caption font-semibold text-ink">{t(phase2.b5.justifyLabel)}</span>
            <textarea
              value={r3.recommendedJustify}
              onChange={(e) => setNote(R3.p2.recommendedJustify, e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
            />
          </label>
        )}
      </section>

      <section id="r3-p2-approval" className="space-y-2">
        <h4 className="text-caption font-semibold text-ink">{t(phase2.b6.heading)}</h4>
        <MaterialRefs refs={materialRefs(phase2.b6.material)} />
        <p className="text-micro text-ash">{t(phase2.b6.caption)}</p>
        <ApprovalTable />
      </section>

      <section id="r3-p2-decisionnow" className="space-y-2">
        <h4 className="text-caption font-semibold text-ink">{t(phase2.b7.heading)}</h4>
        <MaterialRefs refs={materialRefs(phase2.b7.material)} />
        <label className="block">
          <span className="text-caption font-semibold text-ink">{t(phase2.b7.label)}</span>
          <p className="text-micro text-ash">{t(phase2.b7.caption)}</p>
          <textarea
            value={r3.decisionNow}
            onChange={(e) => setNote(R3.p2.decisionNow, e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
          />
        </label>
      </section>
    </div>
  );
}
