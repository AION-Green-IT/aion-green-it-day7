"use client";

import clsx from "clsx";
import {
  FIELDS,
  COMPONENT_COLORS,
  STAGE_GATES,
  SUPPLIER_CADENCE,
  REVIEW_CADENCE,
  TARGET_YEARS,
  isGenericRole,
  type ComponentKey,
} from "@/lib/level3";
import { useProgress } from "@/lib/store";
import { useHydrated } from "@/lib/store";
import { Check } from "@/components/icons/LineIcons";

export function MemoFields() {
  return (
    <div className="space-y-4">
      <TargetField />
      <GovernanceField />
      <InvestmentField />
      <SupplierField />
      <AccountabilityField />
    </div>
  );
}

// --- shared bound inputs ----------------------------------------------------

function useNote(key: string): [string, (v: string) => void] {
  const hydrated = useHydrated();
  const value = useProgress((s) => s.notes[key] ?? "");
  const setNote = useProgress((s) => s.setNote);
  return [hydrated ? value : "", (v) => setNote(key, v)];
}
function useChoice(key: string): [string, (v: string) => void] {
  const hydrated = useHydrated();
  const value = useProgress((s) => s.choices[key] ?? "");
  const choose = useProgress((s) => s.choose);
  return [hydrated ? value : "", (v) => choose(key, v)];
}

const inputCls =
  "w-full rounded-lg border border-line bg-paper p-2.5 text-body text-ink placeholder:text-ash/60 focus:border-accent";

function FieldCard({ component, complete, children }: { component: ComponentKey; complete: boolean; children: React.ReactNode }) {
  const color = COMPONENT_COLORS[component];
  return (
    <div className="card p-4" style={{ borderLeftWidth: 3, borderLeftColor: color }}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full px-2 py-0.5 text-micro font-semibold uppercase tracking-wide" style={{ backgroundColor: color + "1A", color }}>
          {FIELDS[component].label}
        </span>
        {complete ? (
          <span className="inline-flex items-center gap-1 text-caption font-semibold" style={{ color }}>
            <Check className="h-4 w-4" /> Set
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

/**
 * `hint`, when given, is the "how to answer" instruction — shown as a small
 * caption right under the label so it stays visible the whole time the
 * learner is typing, instead of living in the placeholder where it
 * disappears the moment they start.
 */
function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <span className="mb-1 block">
      <span className="block text-caption font-semibold text-ink">{children}</span>
      {hint ? <span className="mt-0.5 block text-caption font-normal text-ash">{hint}</span> : null}
    </span>
  );
}

// --- Target Picture ---------------------------------------------------------

function TargetField() {
  const F = FIELDS.target;
  const [baseline, setBaseline] = useNote(F.baselineKey);
  const [pct, setPct] = useNote(F.pctKey);
  const [year, setYear] = useChoice(F.yearKey);
  const [rationale, setRationale] = useNote(F.rationaleKey);
  const complete = !!(baseline && pct && year);
  return (
    <FieldCard component="target" complete={complete}>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block"><Label>{F.baselineLabel}</Label>
          <input type="number" min={0} value={baseline} onChange={(e) => setBaseline(e.target.value)} className={inputCls} placeholder="e.g. 1200" />
        </label>
        <label className="block"><Label>{F.pctLabel}</Label>
          <input type="number" min={0} max={100} value={pct} onChange={(e) => setPct(e.target.value)} className={inputCls} placeholder="e.g. 30" />
        </label>
        <label className="block"><Label>{F.yearLabel}</Label>
          <select value={year} onChange={(e) => setYear(e.target.value)} className={inputCls}>
            <option value="">Select…</option>
            {TARGET_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
      </div>
      <label className="mt-3 block"><Label hint={F.rationaleHint}>{F.rationaleLabel}</Label>
        <textarea value={rationale} onChange={(e) => setRationale(e.target.value)} rows={2} className={clsx(inputCls, "resize-y")} placeholder={F.rationalePlaceholder} />
      </label>
    </FieldCard>
  );
}

// --- Governance -------------------------------------------------------------

function GovernanceField() {
  const F = FIELDS.governance;
  const [owner, setOwner] = useNote(F.ownerKey);
  const [cadence, setCadence] = useChoice(F.cadenceKey);
  const [escalation, setEscalation] = useNote(F.escalationKey);
  const ownerInvalid = !!owner && isGenericRole(owner);
  const complete = !!owner && !ownerInvalid && !!cadence && !!escalation;
  return (
    <FieldCard component="governance" complete={complete}>
      <label className="block"><Label>{F.ownerLabel}</Label>
        <input value={owner} onChange={(e) => setOwner(e.target.value)} className={clsx(inputCls, ownerInvalid && "border-danger")} placeholder={F.ownerPlaceholder} />
        {ownerInvalid ? <span className="mt-1 block text-caption text-danger">{FIELDS.accountability.invalidMessage}</span> : null}
      </label>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block"><Label>{F.cadenceLabel}</Label>
          <select value={cadence} onChange={(e) => setCadence(e.target.value)} className={inputCls}>
            <option value="">Select…</option>
            {REVIEW_CADENCE.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="block"><Label hint={F.escalationHint}>{F.escalationLabel}</Label>
          <input value={escalation} onChange={(e) => setEscalation(e.target.value)} className={inputCls} placeholder={F.escalationPlaceholder} />
        </label>
      </div>
      <p className="mt-2 text-caption text-ash">{F.oneAccountableNote}</p>
    </FieldCard>
  );
}

// --- Investment Logic -------------------------------------------------------

function InvestmentField() {
  const F = FIELDS.investment;
  const [stage, setStage] = useChoice(F.stageKey);
  const [rationale, setRationale] = useNote(F.rationaleKey);
  const complete = !!stage && !!rationale;
  return (
    <FieldCard component="investment" complete={complete}>
      <Label>{F.stageLabel}</Label>
      <div className="flex flex-wrap gap-1.5">
        {STAGE_GATES.map((s) => (
          <button key={s} type="button" aria-pressed={stage === s} onClick={() => setStage(s)}
            className={clsx("rounded-lg border px-3 py-1.5 text-caption font-semibold transition-colors duration-150", stage === s ? "border-accent bg-accent text-paper" : "border-line text-ink hover:border-ash")}>
            {s}
          </button>
        ))}
      </div>
      <label className="mt-3 block"><Label hint={F.rationaleHint}>{F.rationaleLabel}</Label>
        <textarea value={rationale} onChange={(e) => setRationale(e.target.value)} rows={2} className={clsx(inputCls, "resize-y")} placeholder={F.rationalePlaceholder} />
      </label>
    </FieldCard>
  );
}

// --- Supplier Control -------------------------------------------------------

function SupplierField() {
  const F = FIELDS.supplier;
  const [cadence, setCadence] = useChoice(F.cadenceKey);
  const [rationale, setRationale] = useNote(F.rationaleKey);
  const complete = !!cadence && !!rationale;
  return (
    <FieldCard component="supplier" complete={complete}>
      <Label>{F.cadenceLabel}</Label>
      <div className="flex flex-wrap gap-1.5">
        {SUPPLIER_CADENCE.map((c) => (
          <button key={c} type="button" aria-pressed={cadence === c} onClick={() => setCadence(c)}
            className={clsx("rounded-lg border px-3 py-1.5 text-caption font-semibold transition-colors duration-150", cadence === c ? "border-accent bg-accent text-paper" : "border-line text-ink hover:border-ash")}>
            {c}
          </button>
        ))}
      </div>
      <label className="mt-3 block"><Label hint={F.rationaleHint}>{F.rationaleLabel}</Label>
        <textarea value={rationale} onChange={(e) => setRationale(e.target.value)} rows={2} className={clsx(inputCls, "resize-y")} placeholder={F.rationalePlaceholder} />
      </label>
    </FieldCard>
  );
}

// --- Accountability ---------------------------------------------------------

function AccountabilityField() {
  const F = FIELDS.accountability;
  const [role, setRole] = useNote(F.roleKey);
  const invalid = !!role && isGenericRole(role);
  const complete = !!role && !invalid;
  return (
    <FieldCard component="accountability" complete={complete}>
      <label className="block"><Label hint={F.roleHint}>{F.roleLabel}</Label>
        <input value={role} onChange={(e) => setRole(e.target.value)} className={clsx(inputCls, invalid && "border-danger")} placeholder={F.rolePlaceholder} />
        {invalid ? <span className="mt-1 block text-caption text-danger">{F.invalidMessage}</span> : null}
      </label>
    </FieldCard>
  );
}
