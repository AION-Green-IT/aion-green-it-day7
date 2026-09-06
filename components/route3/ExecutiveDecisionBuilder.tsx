"use client";

import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R3, TASK3, RACI_ROLES, FIRST_STEP_OPTIONS } from "@/lib/route3";
import { useRoute3 } from "./useRoute3";
import { GovernanceMaturityLadder } from "./GovernanceMaturityLadder";
import { ConflictMatrix } from "./ConflictMatrix";
import { RaciGrid } from "./RaciGrid";

const S3 = TASK3.phase2.step3;

/** Step 3 — six interactive sub-blocks, not one long textarea. */
export function ExecutiveDecisionBuilder() {
  return (
    <div className="space-y-8">
      <StrategicRelevance />
      <CoreDecisions />
      <section>
        <h4 className="text-caption font-semibold text-ink">{S3.conflictQuestion}</h4>
        <p className="mt-1 text-caption text-ash">{S3.conflictInstructions}</p>
        <div className="mt-3">
          <ConflictMatrix />
        </div>
      </section>
      <FirstStepChoice />
      <section>
        <h4 className="text-caption font-semibold text-ink">{S3.governanceQuestion}</h4>
        <div className="mt-3">
          <RaciGrid mode="build" />
        </div>
      </section>
      <IncompleteInfo />
    </div>
  );
}

function StrategicRelevance() {
  const setNote = useProgress((s) => s.setNote);
  const r3 = useRoute3();
  return (
    <section>
      <h4 className="text-caption font-semibold text-ink">{S3.relevanceQuestion}</h4>
      <p className="mt-1 text-caption text-ash">{S3.relevanceInstructions}</p>
      <div className="mt-3 max-w-md">
        <GovernanceMaturityLadder
          selectable
          selectedId={r3.strategicLadderPosition}
          onSelect={(id) => setNote(R3.strategicLadderPosition, id)}
        />
      </div>
      <textarea
        value={r3.strategicRelevance}
        onChange={(e) => setNote(R3.strategicRelevance, e.target.value)}
        rows={2}
        placeholder="2-3 sentences on why this position matters strategically..."
        className="mt-3 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
      />
    </section>
  );
}

function CoreDecisions() {
  const setNote = useProgress((s) => s.setNote);
  const choose = useProgress((s) => s.choose);
  const r3 = useRoute3();
  return (
    <section>
      <h4 className="text-caption font-semibold text-ink">{S3.coreDecisionsQuestion}</h4>
      <div className="mt-3 space-y-3">
        {([1, 2, 3] as const).map((n, i) => (
          <div key={n} className="rounded-xl border border-line p-3">
            <textarea
              value={r3.coreDecisions[i].text}
              onChange={(e) => setNote(R3.coreDecision(n), e.target.value)}
              rows={2}
              placeholder={`Decision ${n}...`}
              className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-body text-ink"
            />
            <label className="mt-2 flex items-center gap-2 text-caption text-ash">
              Accountable:
              <select
                value={r3.coreDecisions[i].accountable}
                onChange={(e) => choose(R3.coreDecisionRaci(n), e.target.value)}
                className="rounded-lg border border-line bg-paper px-2 py-1 text-caption text-ink"
              >
                <option value="">Choose...</option>
                {RACI_ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}

function FirstStepChoice() {
  const choose = useProgress((s) => s.choose);
  const setNote = useProgress((s) => s.setNote);
  const r3 = useRoute3();
  return (
    <section>
      <h4 className="text-caption font-semibold text-ink">{S3.firstStepQuestion}</h4>
      <div className="mt-2 space-y-2">
        {FIRST_STEP_OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => choose(R3.firstStep, o.id)}
            aria-pressed={r3.firstStep === o.id}
            className={clsx(
              "w-full rounded-xl border p-3 text-left text-caption font-semibold transition-colors duration-150",
              r3.firstStep === o.id ? "border-accent bg-accentSoft text-accent" : "border-line text-ink hover:border-ash",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
      <label className="mt-3 block">
        <span className="text-caption font-semibold text-ink">{S3.firstStepJustifyLabel}</span>
        <textarea
          value={r3.firstStepJustify}
          onChange={(e) => setNote(R3.firstStepJustify, e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
        />
      </label>
    </section>
  );
}

function IncompleteInfo() {
  const setNote = useProgress((s) => s.setNote);
  const r3 = useRoute3();
  const short = r3.incompleteInfo.trim().length > 0 && r3.incompleteInfo.trim().length < 40;
  return (
    <section>
      <h4 className="text-caption font-semibold text-ink">{S3.incompleteQuestion}</h4>
      <textarea
        value={r3.incompleteInfo}
        onChange={(e) => setNote(R3.incompleteInfo, e.target.value)}
        rows={3}
        className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
      />
      {short && <p className="mt-1 text-micro text-warn">A board memo usually needs more than a one-liner here.</p>}
    </section>
  );
}
