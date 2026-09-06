"use client";

import { useState } from "react";
import clsx from "clsx";
import { ENEFG_2023_ENACTED, ENEFG_2026_DRAFT, PUE_BENCHMARKS } from "@/lib/route1";

const INK = "#16191D";
const ASH = "#5E6670";
const ACCENT = "#0E7A5A";
const LINE = "#E2E5E9";
const WARN = "#B87514";
const DANGER = "#B23B3B";

const W = 800;
const BAR_Y = 110;
const PAD_L = 50;
const PAD_R = 50;
const CHART_W = W - PAD_L - PAD_R;
const MIN_V = 1.0;
const MAX_V = 3.0;
const xFor = (v: number) => PAD_L + ((v - MIN_V) / (MAX_V - MIN_V)) * CHART_W;

type Year = "2023" | "2026";

/** Block 4 — PUE 1.0–3.0 gauge with fixed industry/hyperscale zones, plus a toggle between the enacted and draft EnEfG thresholds. */
export function PueGaugeSvg() {
  const [year, setYear] = useState<Year>("2023");
  const t = year === "2023" ? ENEFG_2023_ENACTED : ENEFG_2026_DRAFT;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-micro font-semibold uppercase tracking-wide text-ash">EnEfG threshold set</p>
        <div className="inline-flex rounded-full border border-line p-0.5">
          {(["2023", "2026"] as Year[]).map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYear(y)}
              aria-pressed={year === y}
              className={clsx(
                "rounded-full px-3 py-1 text-micro font-semibold transition-colors duration-150",
                year === y ? "bg-accent text-paper" : "text-ash hover:text-ink",
              )}
            >
              {y === "2023" ? "2023 enacted law" : "2026 draft amendment"}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${W} 220`} className="w-full" role="img" aria-label="PUE benchmark gauge from 1.0 to 3.0">
        {/* Base bar with zone shading */}
        <rect x={PAD_L} y={BAR_Y - 8} width={CHART_W} height={16} rx={8} fill={LINE} />
        <rect x={xFor(PUE_BENCHMARKS.hyperscaleLow)} y={BAR_Y - 8} width={xFor(PUE_BENCHMARKS.hyperscaleHigh) - xFor(PUE_BENCHMARKS.hyperscaleLow)} height={16} rx={4} fill={ACCENT} opacity={0.35} />
        <rect x={xFor(2.0)} y={BAR_Y - 8} width={xFor(3.0) - xFor(2.0)} height={16} rx={4} fill={DANGER} opacity={0.3} />

        {/* Scale ticks */}
        {[1.0, 1.5, 2.0, 2.5, 3.0].map((v) => (
          <g key={v}>
            <line x1={xFor(v)} y1={BAR_Y - 12} x2={xFor(v)} y2={BAR_Y + 12} stroke={ASH} strokeWidth={1} opacity={0.4} />
            <text x={xFor(v)} y={BAR_Y + 26} textAnchor="middle" fontSize="9.5" fill={ASH}>{v.toFixed(1)}</text>
          </g>
        ))}

        {/* Below-bar zones: theoretical min, hyperscale, industry average, legacy/poor */}
        <ZoneLabel x={xFor(MIN_V)} y={BAR_Y + 44} color={INK} title="1.0" sub="Theoretical min" />
        <ZoneLabel x={(xFor(PUE_BENCHMARKS.hyperscaleLow) + xFor(PUE_BENCHMARKS.hyperscaleHigh)) / 2} y={BAR_Y + 44} color={ACCENT} title="1.1–1.2" sub="Hyperscale best-in-class" />
        <ZoneLabel x={xFor((PUE_BENCHMARKS.industryAverageLow + PUE_BENCHMARKS.industryAverageHigh) / 2)} y={BAR_Y + 44} color={WARN} title="~1.56" sub="Industry average" />
        <ZoneLabel x={(xFor(2.0) + xFor(3.0)) / 2} y={BAR_Y + 44} color={DANGER} title="2.0+" sub="Legacy / poor" />
        <line
          x1={xFor((PUE_BENCHMARKS.industryAverageLow + PUE_BENCHMARKS.industryAverageHigh) / 2)}
          y1={BAR_Y + 8}
          x2={xFor((PUE_BENCHMARKS.industryAverageLow + PUE_BENCHMARKS.industryAverageHigh) / 2)}
          y2={BAR_Y + 24}
          stroke={WARN}
          strokeWidth={1.4}
        />

        {/* Above-bar: EnEfG thresholds, staggered rows so the cluster stays legible */}
        <ThresholdMarker x={xFor(t.newFacility)} row={0} value={t.newFacility} label="New facilities" />
        <ThresholdMarker x={xFor(t.existing2030)} row={1} value={t.existing2030} label="Existing DCs, 2030" />
        <ThresholdMarker x={xFor(t.existing2027)} row={2} value={t.existing2027} label="Existing DCs, 2027" />
      </svg>
      <p className="mt-1 text-center text-micro text-ash">
        {year === "2023"
          ? "Currently the enacted law (in force since 18 November 2023, BGBl. 2023 I Nr. 309)."
          : "A draft published 9 April 2026 — not yet law. Shown here for comparison only."}
      </p>
    </div>
  );
}

function ZoneLabel({ x, y, color, title, sub }: { x: number; y: number; color: string; title: string; sub: string }) {
  return (
    <g>
      <text x={x} y={y} textAnchor="middle" fontSize="11" fontWeight={700} fill={color}>{title}</text>
      <text x={x} y={y + 13} textAnchor="middle" fontSize="8.5" fill={ASH}>{sub}</text>
    </g>
  );
}

function ThresholdMarker({ x, row, value, label }: { x: number; row: number; value: number; label: string }) {
  const labelY = BAR_Y - 22 - row * 26;
  return (
    <g>
      <line x1={x} y1={BAR_Y - 8} x2={x} y2={labelY + 4} stroke={ACCENT} strokeWidth={1.2} strokeDasharray="2 3" />
      <circle cx={x} cy={BAR_Y - 8} r={3} fill={ACCENT} />
      <text x={x} y={labelY} textAnchor="middle" fontSize="9.5" fontWeight={700} fill={ACCENT}>
        {value.toFixed(1)}
      </text>
      <text x={x} y={labelY - 11} textAnchor="middle" fontSize="8" fill={ASH}>
        {label}
      </text>
    </g>
  );
}
