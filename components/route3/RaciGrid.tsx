"use client";

import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R3, RACI_DECISIONS, RACI_ROLES, type RaciValue } from "@/lib/route3";
import { useRoute3 } from "./useRoute3";

const OPTIONS: { value: RaciValue; label: string }[] = [
  { value: "", label: "—" },
  { value: "R", label: "R" },
  { value: "A", label: "A" },
  { value: "C", label: "C" },
  { value: "I", label: "I" },
];

/** Task 3, Section 6 — dropdown RACI grid (no drag-and-drop, per the stack convention). */
export function RaciGrid() {
  const r3 = useRoute3();
  const choose = useProgress((s) => s.choose);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px] text-caption">
          <thead>
            <tr className="text-left text-ash">
              <th className="pb-2 font-semibold">Decision type</th>
              {RACI_ROLES.map((r) => (
                <th key={r.id} className="pb-2 pl-2 font-semibold">{r.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RACI_DECISIONS.map((d) => {
              const missingAccountable = r3.raciMissingAccountable.includes(d.id);
              return (
                <tr key={d.id} id={`r3-raci-${d.id}`} className="border-t border-line scroll-mt-24">
                  <td className="py-2 pr-2 font-semibold text-ink">
                    {d.label}
                    {missingAccountable && <span className="ml-1.5 text-micro font-normal text-warn">needs an Accountable</span>}
                  </td>
                  {RACI_ROLES.map((role) => (
                    <td key={role.id} className="py-2 pl-2">
                      <select
                        value={r3.raci[d.id][role.id]}
                        onChange={(e) => choose(R3.raci(d.id, role.id), e.target.value)}
                        aria-label={`${d.label} — ${role.label}`}
                        className={clsx(
                          "w-14 rounded-lg border bg-paper px-1.5 py-1 text-center text-caption font-semibold text-ink",
                          r3.raci[d.id][role.id] === "A" ? "border-accent bg-accentSoft" : "border-line",
                        )}
                      >
                        {OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-micro text-ash">R = Responsible · A = Accountable (exactly one per row) · C = Consulted · I = Informed</p>
    </div>
  );
}
