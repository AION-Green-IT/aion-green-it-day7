import { CASE_BRIEF } from "@/lib/route1";

export function CaseBrief() {
  return (
    <div className="card p-5">
      <p className="text-micro font-semibold uppercase tracking-wide text-ash">Case brief</p>
      <h3 className="mt-1 text-h3 text-ink">
        {CASE_BRIEF.company} — {CASE_BRIEF.units} notebooks
      </h3>
      <p className="mt-2 text-body text-ash">{CASE_BRIEF.setup}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-line p-4">
          <p className="text-caption font-semibold text-ink">{CASE_BRIEF.vendor1.label}</p>
          <p className="text-micro font-semibold uppercase tracking-wide text-ash">{CASE_BRIEF.vendor1.headline}</p>
          <p className="mt-2 text-caption text-ash">{CASE_BRIEF.vendor1.detail}</p>
        </div>
        <div className="rounded-xl border border-accent/30 bg-accentSoft p-4">
          <p className="text-caption font-semibold text-ink">{CASE_BRIEF.vendor2.label}</p>
          <p className="text-micro font-semibold uppercase tracking-wide text-accent">{CASE_BRIEF.vendor2.headline}</p>
          <p className="mt-2 text-caption text-ash">{CASE_BRIEF.vendor2.detail}</p>
        </div>
      </div>

      <ul className="mt-4 space-y-1 border-t border-line pt-3 text-caption text-ash">
        <li>{CASE_BRIEF.stakeholders.purchasing}</li>
        <li>{CASE_BRIEF.stakeholders.it}</li>
        <li>{CASE_BRIEF.stakeholders.sustainability}</li>
      </ul>
    </div>
  );
}
