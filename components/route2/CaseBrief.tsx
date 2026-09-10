"use client";

import { useProgress } from "@/lib/store";
import { R2, CASE_BRIEF, OPTIONS } from "@/lib/route2";
import { t } from "@/lib/i18n/core";

export function CaseBrief() {
  const name = useProgress((s) => s.notes[R2.name] ?? "");
  const setNote = useProgress((s) => s.setNote);

  return (
    <div className="card p-5">
      <p className="text-micro font-semibold uppercase tracking-wide text-ash">Case brief</p>
      <h3 className="mt-1 text-h3 text-ink">{t(CASE_BRIEF.company)}</h3>
      <p className="mt-2 text-body text-ash">{t(CASE_BRIEF.setup)}</p>

      <p className="mt-4 text-caption font-semibold text-ink">Constraints</p>
      <ul className="mt-1.5 space-y-1 text-caption text-ash">
        {CASE_BRIEF.constraints.map((c, i) => (
          <li key={i} className="flex gap-2">
            <span className="tabular-nums text-ash">{i + 1}.</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-caption font-semibold text-ink">The three options on the table</p>
      <p className="text-micro text-ash">
        Each option is funded exactly as scoped below — including what it deliberately does not do. Score them on
        this, not on what they could become if extra work were added.
      </p>
      <div className="mt-2 grid gap-2.5 sm:grid-cols-3">
        {OPTIONS.map((o) => (
          <div key={o.id} className="flex flex-col rounded-xl border border-line p-3">
            <p className="text-micro font-semibold uppercase tracking-wide text-accent">Option {o.id} — {t(o.short)}</p>
            <p className="mt-1 text-caption font-semibold text-ink">{t(o.label)}</p>
            <p className="mt-1 text-micro text-ash">{t(o.detail)}</p>

            <p className="mt-3 text-micro font-semibold text-ink">What this funds</p>
            <ul className="mt-1 space-y-1">
              {o.includes.map((line, i) => (
                <li key={i} className="flex gap-1.5 text-micro text-ash">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{t(line)}</span>
                </li>
              ))}
            </ul>

            <p className="mt-2.5 text-micro font-semibold text-ink">What it does not include</p>
            <ul className="mt-1 space-y-1">
              {o.excludes.map((line, i) => (
                <li key={i} className="flex gap-1.5 text-micro text-ash">
                  <span className="mt-0.5 shrink-0 font-semibold text-danger">×</span>
                  <span>{t(line)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div id="r2-name" className="mt-4 border-t border-line pt-4">
        <label className="block max-w-xs">
          <span className="text-caption font-semibold text-ink">Your name</span>
          <p className="text-micro text-ash">Used to label the exported memo — e.g. "1-jane-day7-l2task1".</p>
          <input
            value={name}
            onChange={(e) => setNote(R2.name, e.target.value)}
            placeholder="Full name"
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
          />
        </label>
      </div>
    </div>
  );
}
