"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  OPTION_A,
  OPTION_B,
  OPTION_C,
  L2,
  eur,
} from "@/lib/level2";
import { useProgress } from "@/lib/store";
import { useLevel2 } from "./useLevel2";
import { ChevronDown, Info, Plus } from "@/components/icons/LineIcons";

export function ConsequenceSimulator() {
  const { panelsOpened, aScope, bTier, cUnits, results } = useLevel2();
  const markSeen = useProgress((s) => s.markSeen);
  const choose = useProgress((s) => s.choose);
  const [open, setOpen] = useState<Record<string, boolean>>({ a: false, b: false, c: false });

  const togglePanel = (id: string) => {
    const next = !open[id];
    setOpen((o) => ({ ...o, [id]: next }));
    if (next && !panelsOpened.includes(id)) markSeen(L2.panelsKey, id);
  };

  return (
    <div className="space-y-3">
      {/* Panel A */}
      <Panel id="a" tag="Option A" title={OPTION_A.label} open={open.a} onToggle={() => togglePanel("a")}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-caption font-semibold text-ink">Scope:</span>
          {(["basic", "full"] as const).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={aScope === s}
              onClick={() => choose(L2.aScope, s)}
              className={clsx(
                "rounded-lg border px-3 py-1.5 text-caption font-semibold transition-colors duration-150",
                aScope === s ? "border-accent bg-accent text-paper" : "border-line text-ink hover:border-ash",
              )}
            >
              {s === "basic" ? OPTION_A.input.basicLabel : OPTION_A.input.fullLabel}
            </button>
          ))}
        </div>

        <OutputGrid>
          <Output label="Budget" value={eur(results.a.budget)} formula={`${aScope === "basic" ? "Basic" : "Full"} scope`} />
          <Output label="CO₂ impact" value={results.a.co2Label} info={OPTION_A.co2Info} small />
          <Output label="Time to implement" value={`${results.a.timeMonths} months`} />
        </OutputGrid>
        <RiskFlag text={results.a.risk} />
      </Panel>

      {/* Panel B */}
      <Panel id="b" tag="Option B" title={OPTION_B.label} open={open.b} onToggle={() => togglePanel("b")}>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-caption font-semibold text-ink">Minimum efficiency tier required</span>
            <span className="tabular-nums text-readout text-accent">Tier {bTier}</span>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={1}
            value={bTier}
            onChange={(e) => choose(L2.bTier, e.target.value)}
            aria-label="Minimum efficiency tier"
            className="h-2 w-full cursor-pointer accent-accent"
          />
          <div className="mt-1 flex justify-between text-micro text-ash">
            <span>Tier 1</span>
            <span>Tier 2</span>
            <span>Tier 3</span>
          </div>
        </div>

        <OutputGrid>
          <Output label="Suppliers failing to qualify" value={`${results.b.suppliersFailingPct}%`} formula={`Tier ${bTier}`} />
          <Output label="Price premium on new contracts" value={`+${results.b.pricePremiumPct}%`} formula={`Tier ${bTier}`} />
          <Output label="Budget (tender rework)" value={eur(results.b.budget)} formula="fixed, any tier" />
          <Output label="CO₂ (new-purchase footprint)" value={`~${results.b.co2Pct}%`} formula={`Tier ${bTier}`} />
          <Output label="Time to implement" value={`${results.b.timeMonths} months`} />
        </OutputGrid>
        <RiskFlag text={results.b.risk} />
      </Panel>

      {/* Panel C */}
      <Panel id="c" tag="Option C" title={OPTION_C.label} open={open.c} onToggle={() => togglePanel("c")}>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-caption font-semibold text-ink">Number of devices replaced</span>
            <span className="tabular-nums text-readout text-accent">{cUnits}</span>
          </div>
          <input
            type="range"
            min={OPTION_C.min}
            max={OPTION_C.max}
            step={OPTION_C.step}
            value={cUnits}
            onChange={(e) => choose(L2.cUnits, e.target.value)}
            aria-label="Number of devices replaced"
            className="h-2 w-full cursor-pointer accent-accent"
          />
          <div className="mt-1 flex justify-between text-micro text-ash">
            <span>0</span>
            <span>500</span>
          </div>
        </div>

        <OutputGrid>
          <Output label="Budget" value={eur(results.c.budget)} formula={`${cUnits} × €800 = ${eur(results.c.budget)}`} />
          <Output
            label="CO₂ saved"
            value={`${results.c.co2Tons} t/year`}
            formula={`${cUnits} × 0.18 t = ${results.c.co2Tons} t/year`}
          />
          <Output
            label="Payback period"
            value={results.c.paybackMonths !== null ? `${results.c.paybackMonths} months` : "—"}
            formula="budget ÷ (CO₂ × €40/t)"
          />
          <Output label="Time to implement" value={`${results.c.timeMonths} months`} formula="2 months / 100 units" />
        </OutputGrid>
        <RiskFlag text={results.c.risk} />
      </Panel>
    </div>
  );
}

/** Accordion panel with a smooth grid-rows height transition. */
function Panel({
  id,
  tag,
  title,
  open,
  onToggle,
  children,
}: {
  id: string;
  tag: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("card overflow-hidden", open && "border-accent")}>
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center gap-3 p-4 text-left">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink text-caption font-bold uppercase text-paper">
          {id}
        </span>
        <span className="flex-1">
          <span className="block text-micro font-semibold uppercase tracking-wide text-ash">{tag}</span>
          <span className="block text-h3 leading-snug text-ink">{title}</span>
        </span>
        {open ? (
          <ChevronDown className="h-5 w-5 shrink-0 rotate-180 text-accent transition-transform duration-200" />
        ) : (
          <Plus className="h-5 w-5 shrink-0 text-ash transition-transform duration-200" />
        )}
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-[250ms] ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 border-t border-line p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

function OutputGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function Output({
  label,
  value,
  formula,
  info,
  small = false,
}: {
  label: string;
  value: string;
  formula?: string;
  info?: string;
  small?: boolean;
}) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="rounded-lg border border-line bg-mist/40 p-3">
      <div className="flex items-center gap-1.5">
        <p className="text-caption text-ash">{label}</p>
        {info ? (
          <button
            type="button"
            aria-label={`About ${label}`}
            onClick={() => setShowInfo((v) => !v)}
            className="text-ash hover:text-ink"
          >
            <Info className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>
      <p className={clsx("mt-0.5 font-semibold text-ink", small ? "text-body" : "text-readout")}>{value}</p>
      {formula ? <p className="mt-0.5 font-mono text-micro text-ash">{formula}</p> : null}
      {info && showInfo ? (
        <p className="reveal-in mt-2 rounded-md bg-paper p-2 text-micro text-ash">{info}</p>
      ) : null}
    </div>
  );
}

function RiskFlag({ text }: { text: string }) {
  if (!text) return null;
  return (
    <p className="flex items-start gap-2 rounded-lg border-l-4 border-warn bg-warn/10 p-3 text-caption text-ink">
      <span aria-hidden="true" className="font-bold text-warn">!</span>
      <span>{text}</span>
    </p>
  );
}
