"use client";

import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R3, CONFLICT_OPTIONS, TASK3 } from "@/lib/route3";
import { useRoute3 } from "./useRoute3";
import { RaciGrid } from "./RaciGrid";
import { Info } from "@/components/icons/LineIcons";

export function BoardProposalForm() {
  return (
    <div className="space-y-8">
      <StrategicRelevance />
      <KeyDecisions />
      <PrioritizationLogic />
      <GoalConflicts />
      <FirstPriorityPath />
      <div id="r3-raci">
        <h3 className="text-h3 text-ink">{TASK3.s6.heading}</h3>
        <p className="mt-1 text-micro text-ash">{TASK3.s6.caption}</p>
        <div className="mt-3">
          <RaciGrid />
        </div>
      </div>
      <IncompleteData />
      <SelfCheck />
    </div>
  );
}

function StrategicRelevance() {
  const r3 = useRoute3();
  const setNote = useProgress((s) => s.setNote);
  return (
    <section id="r3-strategic" className="space-y-2">
      <h3 className="text-h3 text-ink">{TASK3.s1.heading}</h3>
      <label className="block">
        <span className="text-caption font-semibold text-ink">{TASK3.s1.label}</span>
        <p className="text-micro text-ash">{TASK3.s1.caption}</p>
        <textarea
          value={r3.strategicRelevance}
          onChange={(e) => setNote(R3.strategicRelevance, e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
        />
      </label>
    </section>
  );
}

function KeyDecisions() {
  const r3 = useRoute3();
  const setNote = useProgress((s) => s.setNote);
  return (
    <section id="r3-keydecisions" className="space-y-2">
      <h3 className="text-h3 text-ink">{TASK3.s2.heading}</h3>
      <p className="text-micro text-ash">{TASK3.s2.caption}</p>
      <div className="space-y-2">
        {([1, 2, 3] as const).map((n) => (
          <label key={n} className="block">
            <span className="text-caption font-semibold text-ink">Decision {n}</span>
            <input
              value={r3.keyDecisions[n - 1]}
              onChange={(e) => setNote(R3.keyDecision(n), e.target.value)}
              placeholder={`e.g. "Approve baseline monitoring investment by Q2"`}
              className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
            />
          </label>
        ))}
      </div>
    </section>
  );
}

function PrioritizationLogic() {
  const r3 = useRoute3();
  const setNote = useProgress((s) => s.setNote);
  return (
    <section id="r3-prioritization" className="space-y-2">
      <h3 className="text-h3 text-ink">{TASK3.s3.heading}</h3>
      <label className="block">
        <span className="text-caption font-semibold text-ink">{TASK3.s3.label}</span>
        <p className="text-micro text-ash">{TASK3.s3.caption}</p>
        <textarea
          value={r3.prioritizationLogic}
          onChange={(e) => setNote(R3.prioritizationLogic, e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
        />
      </label>
    </section>
  );
}

function GoalConflicts() {
  const r3 = useRoute3();
  const toggleCheck = useProgress((s) => s.toggleCheck);
  const setNote = useProgress((s) => s.setNote);
  return (
    <section id="r3-conflicts" className="space-y-2">
      <h3 className="text-h3 text-ink">{TASK3.s4.heading}</h3>
      <p className="text-micro text-ash">{TASK3.s4.caption}</p>
      <div className="space-y-2">
        {CONFLICT_OPTIONS.map((c) => {
          const selected = r3.selectedConflictIds.includes(c.id);
          return (
            <div key={c.id} className={clsx("rounded-xl border p-3", selected ? "border-accent bg-accentSoft" : "border-line")}>
              <label className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={(e) => toggleCheck(R3.conflictSelected(c.id), e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-accent"
                />
                <span className="text-caption font-semibold text-ink">{c.label}</span>
              </label>
              {selected && (
                <label className="mt-2 block pl-6">
                  <span className="text-micro text-ash">Why does this matter for NovaCore specifically?</span>
                  <textarea
                    value={r3.conflictJustify[c.id] ?? ""}
                    onChange={(e) => setNote(R3.conflictJustify(c.id), e.target.value)}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-body text-ink"
                  />
                </label>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FirstPriorityPath() {
  const r3 = useRoute3();
  const setNote = useProgress((s) => s.setNote);
  return (
    <section id="r3-firstpriority" className="space-y-2">
      <h3 className="text-h3 text-ink">{TASK3.s5.heading}</h3>
      <label className="block">
        <span className="text-caption font-semibold text-ink">{TASK3.s5.label}</span>
        <p className="text-micro text-ash">{TASK3.s5.caption}</p>
        <textarea
          value={r3.firstPriorityPath}
          onChange={(e) => setNote(R3.firstPriorityPath, e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
        />
      </label>
    </section>
  );
}

function IncompleteData() {
  const r3 = useRoute3();
  const setNote = useProgress((s) => s.setNote);
  return (
    <section id="r3-incomplete" className="space-y-2">
      <h3 className="text-h3 text-ink">{TASK3.s7.heading}</h3>
      <label className="block">
        <span className="text-caption font-semibold text-ink">{TASK3.s7.label}</span>
        <p className="text-micro text-ash">{TASK3.s7.caption}</p>
        <textarea
          value={r3.incompleteData}
          onChange={(e) => setNote(R3.incompleteData, e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
        />
      </label>
    </section>
  );
}

function SelfCheck() {
  return (
    <section className="rounded-xl border border-line bg-canvas p-4">
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-ash" />
        <p className="text-micro font-semibold uppercase tracking-wide text-ash">Boardroom readiness — a nudge, not a gate</p>
      </div>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-caption text-ash">
        {TASK3.selfCheck.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ul>
    </section>
  );
}
