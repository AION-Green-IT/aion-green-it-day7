"use client";

import { PATHWAYS, type PathwayLevel } from "@/lib/route1";
import { t } from "@/lib/i18n/core";

const LEVEL_WIDTH: Record<PathwayLevel, string> = { low: "33%", medium: "66%", high: "100%" };
const LEVEL_LABEL: Record<PathwayLevel, string> = { low: "Low", medium: "Medium", high: "High" };

/** Block 2 — five pathways, each with a qualitative control-level and typical-scale bar for at-a-glance comparison. */
export function PathwaysComparison() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {PATHWAYS.map((p) => (
        <div key={p.id} className="flex flex-col rounded-xl border border-line p-3.5">
          <p className="text-caption font-semibold text-ink">{t(p.label)}</p>
          <p className="mt-1 flex-1 text-micro text-ash">{t(p.detail)}</p>

          <div className="mt-3 space-y-2.5">
            <LevelBar label="Control level" level={p.control} />
            <LevelBar label="Typical scale" level={p.scale} />
          </div>
          <p className="mt-2 text-micro italic text-ash">{t(p.scaleLabel)}</p>
          <a
            href={p.reference.url}
            target="_blank"
            rel="noopener noreferrer"
            title={t(p.reference.label)}
            className="mt-2.5 inline-flex items-center gap-1 text-micro font-semibold text-accent hover:text-accentHi"
          >
            Real-world example ↗
          </a>
        </div>
      ))}
    </div>
  );
}

function LevelBar({ label, level }: { label: string; level: PathwayLevel }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-micro text-ash">{label}</span>
        <span className="text-micro font-semibold text-ink">{LEVEL_LABEL[level]}</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-mist">
        <div className="h-full rounded-full bg-accent transition-all duration-300" style={{ width: LEVEL_WIDTH[level] }} />
      </div>
    </div>
  );
}
