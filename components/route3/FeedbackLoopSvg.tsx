"use client";

import { useState } from "react";
import { t } from "@/lib/i18n/core";

const INK = "#16191D";
const ASH = "#5E6670";
const ACCENT = "#0E7A5A";
const PAPER = "#FFFFFF";

const NODES = [
  { id: "energy", label: "Energy Source", detail: "What you actually buy or generate: grid, PPA, GoO, on-site." },
  { id: "efficiency", label: "Efficiency / PUE", detail: "How much of that energy reaches useful IT work." },
  { id: "transparency", label: "Load & Transparency", detail: "Whether you actually know your consumption structure well enough to interpret the first two elements." },
  { id: "communication", label: "Communication", detail: "What you tell the board, investors, regulators, and the public — traceable back to the first three." },
  { id: "governance", label: "Governance Review", detail: "A periodic, structured re-examination of all four together, feeding back into Energy Source." },
];

const SIZE = 420;
const CX = SIZE / 2;
const CY = SIZE / 2 - 10;
const R = 150;

/** 5-node feedback loop. Hover or tap a node to dim the rest and highlight its two adjacent connections. */
export function FeedbackLoopSvg() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const n = NODES.length;
  const angleFor = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pos = (i: number) => {
    const a = angleFor(i);
    return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
  };

  const isAdjacentEdge = (i: number, j: number) => {
    if (activeIdx === null) return true;
    const next = (activeIdx + 1) % n;
    const prev = (activeIdx - 1 + n) % n;
    return (i === activeIdx && j === next) || (i === activeIdx && j === prev) || (j === activeIdx && i === next) || (j === activeIdx && i === prev);
  };

  const active = activeIdx !== null ? NODES[activeIdx] : null;

  return (
    <div>
      <svg viewBox={`0 0 ${SIZE} ${SIZE - 40}`} className="w-full" role="img" aria-label="Five-element feedback loop: Energy Source, Efficiency/PUE, Load & Transparency, Communication, Governance Review">
        <defs>
          <marker id="loopArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={ASH} />
          </marker>
          <marker id="loopArrowActive" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={ACCENT} />
          </marker>
        </defs>

        {NODES.map((_, i) => {
          const j = (i + 1) % n;
          const a = pos(i);
          const b = pos(j);
          const emphasized = isAdjacentEdge(i, j);
          const mx = (a.x + b.x) / 2 + (CX - (a.x + b.x) / 2) * 0.18;
          const my = (a.y + b.y) / 2 + (CY - (a.y + b.y) / 2) * 0.18;
          return (
            <path
              key={`edge-${i}`}
              d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
              fill="none"
              stroke={emphasized ? ACCENT : ASH}
              strokeWidth={emphasized ? 2.2 : 1.4}
              opacity={activeIdx === null || emphasized ? 1 : 0.25}
              markerEnd={emphasized ? "url(#loopArrowActive)" : "url(#loopArrow)"}
            />
          );
        })}

        {NODES.map((node, i) => {
          const { x, y } = pos(i);
          const isActive = activeIdx === i;
          const dimmed = activeIdx !== null && !isActive;
          return (
            <g
              key={node.id}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              className="cursor-pointer"
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => setActiveIdx((cur) => (cur === i ? null : i))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveIdx((cur) => (cur === i ? null : i));
                }
              }}
              opacity={dimmed ? 0.35 : 1}
            >
              <circle cx={x} cy={y} r={38} fill={isActive ? ACCENT : PAPER} stroke={isActive ? ACCENT : INK} strokeWidth={1.6} />
              <text x={x} y={y - 2} textAnchor="middle" fontSize="9.5" fontWeight={700} fill={isActive ? PAPER : INK}>
                {i + 1}
              </text>
              <text x={x} y={y + (y > CY ? 54 : -46)} textAnchor="middle" fontSize="10" fontWeight={600} fill={isActive ? ACCENT : INK}>
                {t(node.label)}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="rounded-xl border border-accent/25 bg-accentSoft p-4">
        <p className="text-micro font-semibold uppercase tracking-wide text-accent">
          {active ? active.label : "Hover or tap a node"}
        </p>
        <p className="mt-1 text-caption text-ink">
          {active ? active.detail : "Each element only feeds forward correctly if the one before it is sound — that's what the loop is for."}
        </p>
      </div>
    </div>
  );
}
