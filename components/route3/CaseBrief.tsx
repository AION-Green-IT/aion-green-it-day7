"use client";

import { useProgress } from "@/lib/store";
import { R3, AEROPULSE_BRIEF, POLAREDGE_BRIEF } from "@/lib/route3";
import { t } from "@/lib/i18n/core";

export function AeroPulseBrief() {
  return (
    <div className="card p-5">
      <p className="text-micro font-semibold uppercase tracking-wide text-ash">Case brief — Diagnostic</p>
      <h3 className="mt-1 text-h3 text-ink">{t(AEROPULSE_BRIEF.company)}</h3>
      <p className="mt-2 text-body text-ash">{t(AEROPULSE_BRIEF.setup)}</p>
    </div>
  );
}

export function PolarEdgeBrief() {
  return (
    <div className="card p-5">
      <p className="text-micro font-semibold uppercase tracking-wide text-ash">Case brief — Builder</p>
      <h3 className="mt-1 text-h3 text-ink">{t(POLAREDGE_BRIEF.company)}</h3>
      <p className="mt-2 text-body text-ash">{t(POLAREDGE_BRIEF.role)}</p>
      <ul className="mt-3 space-y-1 text-caption text-ash">
        {POLAREDGE_BRIEF.constraints.map((c, i) => (
          <li key={i} className="flex gap-2">
            <span className="tabular-nums text-ash">{i + 1}.</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NameField() {
  const name = useProgress((s) => s.notes[R3.name] ?? "");
  const setNote = useProgress((s) => s.setNote);
  return (
    <div id="r3-name" className="card p-5">
      <label className="block max-w-xs">
        <span className="text-caption font-semibold text-ink">Your name</span>
        <p className="text-micro text-ash">Used to label the exported memo — e.g. "1-jane-day7-l3task1".</p>
        <input
          value={name}
          onChange={(e) => setNote(R3.name, e.target.value)}
          placeholder="Full name"
          className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-body text-ink"
        />
      </label>
    </div>
  );
}
