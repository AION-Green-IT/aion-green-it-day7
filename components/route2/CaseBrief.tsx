import { CASE_BRIEF } from "@/lib/route2";

export function CaseBrief() {
  const models = [CASE_BRIEF.modelA, CASE_BRIEF.modelB, CASE_BRIEF.modelC];
  return (
    <div className="card p-5">
      <p className="text-micro font-semibold uppercase tracking-wide text-ash">Case brief</p>
      <h3 className="mt-1 text-h3 text-ink">{CASE_BRIEF.company}</h3>
      <p className="mt-2 text-body text-ash">{CASE_BRIEF.setup}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {models.map((m) => (
          <div key={m.label} className="rounded-xl border border-line p-4">
            <p className="text-caption font-semibold text-ink">{m.label}</p>
            <p className="text-micro font-semibold uppercase tracking-wide text-ash">{m.headline}</p>
            <p className="mt-2 text-caption text-ash">{m.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
