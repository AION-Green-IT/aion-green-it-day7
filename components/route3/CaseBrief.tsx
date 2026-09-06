import { CASE_BRIEF } from "@/lib/route3";

export function CaseBrief() {
  return (
    <div className="card p-5">
      <p className="text-micro font-semibold uppercase tracking-wide text-ash">Case brief</p>
      <h3 className="mt-1 text-h3 text-ink">{CASE_BRIEF.company}</h3>
      <p className="mt-2 text-body text-ash">{CASE_BRIEF.setup}</p>

      <ul className="mt-4 space-y-1.5 border-t border-line pt-3 text-caption text-ash">
        {CASE_BRIEF.facts.map((f, i) => (
          <li key={i} className="flex gap-2">
            <span className="tabular-nums text-ash">{i + 1}.</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
