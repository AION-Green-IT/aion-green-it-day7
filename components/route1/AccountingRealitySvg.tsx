"use client";

import { useState } from "react";

const INK = "#16191D";
const ASH = "#5E6670";
const ACCENT = "#0E7A5A";
const LINE = "#E2E5E9";
const WARN = "#B87514";

const W = 760;
const H = 260;
const PAD_L = 40;
const PAD_R = 20;
const PAD_T = 20;
const PAD_B = 34;
const CHART_W = W - PAD_L - PAD_R;
const CHART_H = H - PAD_T - PAD_B;

/** Illustrative physical-grid fossil intensity by hour: highest overnight, lowest around midday solar peak. */
function fossilIntensity(hour: number): number {
  return 55 + 35 * Math.cos(((hour - 14) / 24) * 2 * Math.PI);
}

const HOURS = Array.from({ length: 25 }, (_, i) => i % 24 === 0 && i > 0 ? 24 : i);
const xFor = (h: number) => PAD_L + (h / 24) * CHART_W;
const yFor = (pct: number) => PAD_T + CHART_H - (pct / 100) * CHART_H;

/** Block 3 — annual certificate matching (flat 100%) overlaid on the physical grid's actual hourly carbon intensity. Hover to inspect any hour. */
export function AccountingRealitySvg() {
  const [hoverHour, setHoverHour] = useState<number | null>(null);

  const fossilPoints = Array.from({ length: 49 }, (_, i) => i / 2).map((h) => `${xFor(h)},${yFor(fossilIntensity(h))}`).join(" ");
  const certY = yFor(100);

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = W / rect.width;
    const px = (e.clientX - rect.left) * scaleX;
    const hour = Math.max(0, Math.min(24, ((px - PAD_L) / CHART_W) * 24));
    setHoverHour(Math.round(hour));
  };

  const activeHour = hoverHour ?? 2;
  const activeFossil = fossilIntensity(activeHour);

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full cursor-crosshair"
        role="img"
        aria-label="Physical grid carbon intensity by hour versus flat annual certificate coverage"
        onMouseMove={onMove}
        onMouseLeave={() => setHoverHour(null)}
      >
        {[0, 25, 50, 75, 100].map((pct) => (
          <g key={pct}>
            <line x1={PAD_L} y1={yFor(pct)} x2={W - PAD_R} y2={yFor(pct)} stroke={LINE} strokeWidth={1} />
            <text x={PAD_L - 8} y={yFor(pct) + 3} textAnchor="end" fontSize="9" fill={ASH}>{pct}%</text>
          </g>
        ))}
        {[0, 6, 12, 18, 24].map((h) => (
          <text key={h} x={xFor(h)} y={H - 10} textAnchor="middle" fontSize="9" fill={ASH}>
            {String(h).padStart(2, "0")}:00
          </text>
        ))}

        {/* Certificate coverage — flat 100% */}
        <line x1={PAD_L} y1={certY} x2={W - PAD_R} y2={certY} stroke={ACCENT} strokeWidth={2.2} strokeDasharray="7 5" />
        <text x={W - PAD_R} y={certY - 6} textAnchor="end" fontSize="9.5" fontWeight={700} fill={ACCENT}>
          Certificate coverage (annual match)
        </text>

        {/* Physical grid fossil intensity */}
        <polyline points={fossilPoints} fill="none" stroke={WARN} strokeWidth={2.2} />
        <text x={xFor(2)} y={yFor(fossilIntensity(2)) - 10} textAnchor="middle" fontSize="9.5" fontWeight={700} fill={WARN}>
          Physical grid — fossil-heavy overnight
        </text>

        {/* Hover marker */}
        <line x1={xFor(activeHour)} y1={PAD_T} x2={xFor(activeHour)} y2={H - PAD_B} stroke={INK} strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
        <circle cx={xFor(activeHour)} cy={yFor(activeFossil)} r={4} fill={WARN} />
        <circle cx={xFor(activeHour)} cy={certY} r={4} fill={ACCENT} />
      </svg>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-canvas px-3.5 py-2 text-caption">
        <span className="text-ash">
          Hour <span className="font-semibold tabular-nums text-ink">{String(activeHour).padStart(2, "0")}:00</span> — move your cursor over the chart to inspect any hour.
        </span>
        <span className="tabular-nums">
          <span className="font-semibold" style={{ color: WARN }}>Grid ≈ {Math.round(activeFossil)}% fossil-heavy</span>
          <span className="text-ash"> · </span>
          <span className="font-semibold" style={{ color: ACCENT }}>Certificates: 100% covered</span>
        </span>
      </div>
    </div>
  );
}
