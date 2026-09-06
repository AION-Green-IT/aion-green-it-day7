import { CASE_PROXIMA, CASE_HELION } from "@/lib/route3";

export function ProximaBrief() {
  return (
    <div className="card p-5">
      <p className="text-micro font-semibold uppercase tracking-wide text-ash">Case brief — Phase 1</p>
      <h3 className="mt-1 text-h3 text-ink">
        {CASE_PROXIMA.company} · {CASE_PROXIMA.employees} employees
      </h3>
      <p className="mt-2 text-body text-ash">{CASE_PROXIMA.setup}</p>
    </div>
  );
}

export function HelionBrief() {
  return (
    <div className="card border-accent/30 bg-accentSoft p-5">
      <p className="text-micro font-semibold uppercase tracking-wide text-accent">Case brief — Phase 2</p>
      <h3 className="mt-1 text-h3 text-ink">{CASE_HELION.company}</h3>
      <p className="mt-2 text-body text-ash">{CASE_HELION.setup}</p>
    </div>
  );
}
