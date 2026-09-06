"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R3, RACI_ROLES, RACI_DECISIONS, RACI_CONFLICT_SEED, type RaciValue } from "@/lib/route3";

const CYCLE: RaciValue[] = ["R", "A", "C", "I", null];
const CELL_STYLE: Record<string, string> = {
  A: "border-accent bg-accent text-paper",
  R: "border-ink bg-ink text-paper",
  C: "border-ash bg-mist text-ink",
  I: "border-line text-ash",
};

function countAccountable(grid: Record<string, RaciValue>) {
  return Object.values(grid).filter((v) => v === "A").length;
}

/**
 * Impact Delta Visualizer — Block 3 ("resolve" mode: pre-seeded conflicts to fix)
 * and reused in Step 3.5 ("build" mode: an empty grid the learner fills from scratch).
 */
export function RaciGrid({ mode }: { mode: "resolve" | "build" }) {
  const markSeen = useProgress((s) => s.markSeen);
  const choices = useProgress((s) => s.choices);
  const choose = useProgress((s) => s.choose);
  const touchedRef = useRef(false);

  const [localGrid, setLocalGrid] = useState<Record<string, Record<string, RaciValue>>>(() =>
    JSON.parse(JSON.stringify(RACI_CONFLICT_SEED)),
  );
  const [explain, setExplain] = useState<string | null>(null);

  const valueAt = (decisionId: string, roleId: string): RaciValue =>
    mode === "resolve" ? localGrid[decisionId][roleId] : ((choices[R3.raciBuild(decisionId, roleId)] as RaciValue) ?? null);

  const touch = () => {
    if (!touchedRef.current) {
      touchedRef.current = true;
      markSeen(R3.material, "raci");
    }
  };

  const resolveClick = (decisionId: string, roleId: string) => {
    touch();
    if (localGrid[decisionId][roleId] !== "A") return;
    if (countAccountable(localGrid[decisionId]) < 2) return;
    const roleLabel = RACI_ROLES.find((r) => r.id === roleId)?.label;
    setExplain(
      `Two "Accountable" owners for the same decision creates deadlock. ${roleLabel} stays Accountable; the other becomes Consulted.`,
    );
    setLocalGrid((prev) => {
      const next = { ...prev, [decisionId]: { ...prev[decisionId] } };
      for (const r of RACI_ROLES) {
        if (r.id !== roleId && next[decisionId][r.id] === "A") next[decisionId][r.id] = "C";
      }
      return next;
    });
  };

  const buildClick = (decisionId: string, roleId: string) => {
    touch();
    const current = valueAt(decisionId, roleId);
    const idx = CYCLE.indexOf(current);
    const next = CYCLE[(idx + 1) % CYCLE.length];
    choose(R3.raciBuild(decisionId, roleId), next ?? "");
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 text-micro text-ash">
        <span><span className="font-semibold text-ink">R</span> Responsible</span>
        <span><span className="font-semibold text-ink">A</span> Accountable</span>
        <span><span className="font-semibold text-ink">C</span> Consulted</span>
        <span><span className="font-semibold text-ink">I</span> Informed</span>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-caption">
          <thead>
            <tr>
              <th className="p-2 text-left text-micro font-semibold text-ash">Decision</th>
              {RACI_ROLES.map((r) => (
                <th key={r.id} className="p-2 text-center text-micro font-semibold text-ash">
                  {r.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RACI_DECISIONS.map((d) => {
              const grid = mode === "resolve" ? localGrid[d.id] : Object.fromEntries(RACI_ROLES.map((r) => [r.id, valueAt(d.id, r.id)]));
              const aCount = countAccountable(grid);
              const isConflicted = mode === "resolve" && aCount > 1;
              const buildInvalid = mode === "build" && aCount !== 1;
              return (
                <tr key={d.id} className="border-t border-line">
                  <td className="p-2 font-semibold text-ink">
                    {d.label}
                    {buildInvalid && <p className="text-micro font-normal text-warn">Needs exactly one Accountable</p>}
                  </td>
                  {RACI_ROLES.map((r) => {
                    const value = valueAt(d.id, r.id);
                    return (
                      <td key={r.id} className="p-1 text-center">
                        <button
                          type="button"
                          onClick={() => (mode === "resolve" ? resolveClick(d.id, r.id) : buildClick(d.id, r.id))}
                          aria-label={`${d.label}, ${r.label}, currently ${value ?? "unset"}`}
                          className={clsx(
                            "h-9 w-9 rounded-lg border text-caption font-semibold transition-colors duration-150",
                            value ? CELL_STYLE[value] : "border-dashed border-line text-ash hover:border-ash",
                            isConflicted && value === "A" && "ring-2 ring-warn",
                          )}
                        >
                          {value ?? "–"}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {mode === "resolve" && explain && (
        <p className="reveal-in mt-3 rounded-xl border border-warn/30 bg-canvas p-3 text-caption text-ink">{explain}</p>
      )}
      {mode === "build" && (
        <p className="mt-2 text-micro text-ash">Click a cell to cycle through R → A → C → I → unset.</p>
      )}
    </div>
  );
}
