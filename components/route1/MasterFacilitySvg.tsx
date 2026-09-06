"use client";

import clsx from "clsx";
import { ZONES, type ZoneId } from "@/lib/route1";

const INK = "#16191D";
const ASH = "#5E6670";
const ACCENT = "#0E7A5A";
const LINE = "#E2E5E9";
const PAPER = "#FFFFFF";

const RACK_X = [115, 213, 311, 409, 507, 605];
const RACK_Y = 150;
const RACK_W = 80;
const RACK_H = 110;

/**
 * Shared "Anatomy of a Data Center" diagram — one SVG, reused at full width
 * in Materi (read-only, click a zone for a fact) and in Task 1a (click a
 * zone to answer its diagnostic question). Every group carries a `data-zone`
 * attribute matching a ZoneId from lib/route1.ts.
 */
export function MasterFacilitySvg({
  title = "CoreAxis Facility Map",
  flaggedZones = [],
  activeZoneId = null,
  onZoneClick,
}: {
  title?: string;
  flaggedZones?: ZoneId[];
  activeZoneId?: ZoneId | null;
  onZoneClick?: (id: ZoneId) => void;
}) {
  const isFlagged = (id: ZoneId) => flaggedZones.includes(id);

  const zoneGroupProps = (id: ZoneId) => ({
    "data-zone": id,
    role: "button" as const,
    tabIndex: onZoneClick ? 0 : -1,
    "aria-pressed": activeZoneId === id,
    className: clsx("group", onZoneClick && "cursor-pointer focus-visible:outline-none"),
    onClick: () => onZoneClick?.(id),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (!onZoneClick) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onZoneClick(id);
      }
    },
  });

  const zoneStroke = (id: ZoneId) => (activeZoneId === id ? ACCENT : INK);

  const label = (id: ZoneId, x: number, y: number) => {
    const z = ZONES.find((zz) => zz.id === id)!;
    return (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        fontSize="11"
        fontWeight={600}
        fill={activeZoneId === id ? ACCENT : INK}
        className="transition-colors duration-150 group-hover:fill-current"
      >
        {z.label}
      </text>
    );
  };

  const badge = (id: ZoneId, x: number, y: number) =>
    isFlagged(id) && (
      <g transform={`translate(${x}, ${y})`}>
        <circle r="8" fill={ACCENT} />
        <path d="M-3.5 0 L-1 2.8 L3.8 -3" stroke={PAPER} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    );

  return (
    <svg viewBox="0 0 800 400" className="w-full" role="img" aria-label={title}>
      <text x="400" y="20" textAnchor="middle" fontSize="12" fontWeight={600} fill={ASH} className="uppercase tracking-wide">
        {title}
      </text>

      {/* --- Redundancy (backup power path) -------------------------------- */}
      <g {...zoneGroupProps("redundancy")}>
        <line x1={50} y1={100} x2={647} y2={100} stroke={zoneStroke("redundancy")} strokeWidth={1.4} strokeDasharray="5 4" opacity={0.75} />
        {RACK_X.map((x) => (
          <line key={x} x1={x + 40} y1={100} x2={x + 40} y2={RACK_Y} stroke={zoneStroke("redundancy")} strokeWidth={1.2} strokeDasharray="4 3" opacity={0.55} />
        ))}
        <circle cx={670} cy={100} r={13} fill="none" stroke={zoneStroke("redundancy")} strokeWidth={1.6} />
        <text x={670} y={104} textAnchor="middle" fontSize="9.5" fontWeight={700} fill={zoneStroke("redundancy")}>
          2N
        </text>
        {label("redundancy", 670, 128)}
        {badge("redundancy", 686, 88)}
      </g>

      {/* --- Power path: Utility -> UPS -> PDU -> racks --------------------- */}
      <g {...zoneGroupProps("power")}>
        <circle cx={50} cy={55} r={18} fill="none" stroke={zoneStroke("power")} strokeWidth={1.8} />
        <path d="M53 46 L44 58 L50 58 L47 66 L58 52 L51 52 Z" fill={zoneStroke("power")} />
        <line x1={68} y1={55} x2={170} y2={55} stroke={zoneStroke("power")} strokeWidth={1.8} />
        <rect x={170} y={35} width={64} height={40} rx={6} fill={PAPER} stroke={zoneStroke("power")} strokeWidth={1.8} />
        <text x={202} y={59} textAnchor="middle" fontSize="11" fontWeight={700} fill={zoneStroke("power")}>UPS</text>
        <line x1={234} y1={55} x2={350} y2={55} stroke={zoneStroke("power")} strokeWidth={1.8} />
        <rect x={350} y={35} width={64} height={40} rx={6} fill={PAPER} stroke={zoneStroke("power")} strokeWidth={1.8} />
        <text x={382} y={59} textAnchor="middle" fontSize="11" fontWeight={700} fill={zoneStroke("power")}>PDU</text>
        {RACK_X.map((x) => (
          <path
            key={x}
            d={`M382 75 C 382 115, ${x + 40} 115, ${x + 40} ${RACK_Y}`}
            fill="none"
            stroke={zoneStroke("power")}
            strokeWidth={1}
            opacity={0.5}
          />
        ))}
        {label("power", 30, 90)}
        {badge("power", 18, 40)}
      </g>

      {/* --- Cooling loop: CRAC (left) <-> CRAH (right) --------------------- */}
      <g {...zoneGroupProps("cooling")}>
        <rect x={15} y={145} width={55} height={120} rx={6} fill={PAPER} stroke={zoneStroke("cooling")} strokeWidth={1.8} />
        <text x={42} y={210} textAnchor="middle" fontSize="10" fontWeight={700} fill={zoneStroke("cooling")}>CRAC</text>
        <rect x={730} y={145} width={55} height={120} rx={6} fill={PAPER} stroke={zoneStroke("cooling")} strokeWidth={1.8} />
        <text x={757} y={210} textAnchor="middle" fontSize="10" fontWeight={700} fill={zoneStroke("cooling")}>CRAH</text>
        <path
          d="M42 145 C 42 88, 757 88, 757 145"
          fill="none"
          stroke={zoneStroke("cooling")}
          strokeWidth={1.6}
          className="anim-dash-loop"
          markerEnd="url(#coolArrow)"
        />
        <path
          d="M757 265 C 757 322, 42 322, 42 265"
          fill="none"
          stroke={zoneStroke("cooling")}
          strokeWidth={1.6}
          strokeDasharray="6 6"
          opacity={0.6}
          markerEnd="url(#coolArrow)"
        />
        {label("cooling", 400, 70)}
        {badge("cooling", 70, 152)}
      </g>

      {/* --- Server racks (utilization) -------------------------------------- */}
      <g {...zoneGroupProps("utilization")}>
        {RACK_X.map((x) => (
          <g key={x}>
            <rect x={x} y={RACK_Y} width={RACK_W} height={RACK_H} rx={5} fill={PAPER} stroke={zoneStroke("utilization")} strokeWidth={1.6} />
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1={x + 8} y1={RACK_Y + 12 + i * 16} x2={x + RACK_W - 8} y2={RACK_Y + 12 + i * 16} stroke={LINE} strokeWidth={2} />
            ))}
            <rect x={x + 8} y={RACK_Y + RACK_H - 14} width={RACK_W - 16} height={7} rx={3} fill={LINE} />
            <rect x={x + 8} y={RACK_Y + RACK_H - 14} width={(RACK_W - 16) * 0.18} height={7} rx={3} fill="#B87514" className="motif-pulse" />
          </g>
        ))}
        {label("utilization", 400, RACK_Y + RACK_H + 22)}
        <text x={400} y={RACK_Y + RACK_H + 36} textAnchor="middle" fontSize="9" fill={ASH}>
          ~18% average utilization
        </text>
        {badge("utilization", 690, RACK_Y - 8)}
      </g>

      {/* --- Monitoring hub --------------------------------------------------- */}
      <g {...zoneGroupProps("monitoring")}>
        <line x1={155} y1={RACK_Y} x2={370} y2={120} stroke={zoneStroke("monitoring")} strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
        <line x1={645} y1={RACK_Y} x2={430} y2={120} stroke={zoneStroke("monitoring")} strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
        <rect x={362} y={100} width={76} height={30} rx={7} fill={PAPER} stroke={zoneStroke("monitoring")} strokeWidth={1.8} />
        <circle cx={378} cy={115} r={4} fill={zoneStroke("monitoring")} className="motif-pulse" />
        <text x={404} y={119} textAnchor="middle" fontSize="9" fontWeight={700} fill={zoneStroke("monitoring")}>
          PUE?
        </text>
        {label("monitoring", 400, 88)}
        {badge("monitoring", 446, 94)}
      </g>

      {/* --- Operations & change control --------------------------------------- */}
      <g {...zoneGroupProps("operations")}>
        <rect x={340} y={335} width={120} height={44} rx={8} fill={PAPER} stroke={zoneStroke("operations")} strokeWidth={1.8} />
        <rect x={354} y={345} width={16} height={22} rx={2} fill="none" stroke={zoneStroke("operations")} strokeWidth={1.4} />
        <line x1={358} y1={350} x2={366} y2={350} stroke={zoneStroke("operations")} strokeWidth={1.2} />
        <line x1={358} y1={355} x2={366} y2={355} stroke={zoneStroke("operations")} strokeWidth={1.2} />
        <line x1={358} y1={360} x2={366} y2={360} stroke={zoneStroke("operations")} strokeWidth={1.2} />
        <text x={362} y={366} fontSize="10" fontWeight={600} fill={zoneStroke("operations")}>
          Operations &amp;
        </text>
        <text x={382} y={378} textAnchor="middle" fontSize="9.5" fontWeight={600} fill={zoneStroke("operations")}>
          Change Control
        </text>
        {badge("operations", 452, 340)}
      </g>

      <defs>
        <marker id="coolArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={INK} opacity={0.6} />
        </marker>
      </defs>
    </svg>
  );
}
