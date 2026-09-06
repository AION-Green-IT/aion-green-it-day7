"use client";

import { useState } from "react";
import clsx from "clsx";
import { DEPENDENCY_SCENARIOS, RISK_ANGLE } from "@/lib/route2";

/**
 * Impact Delta Visualizer — Block 3 (selectable demo mode), also reused fixed
 * to a single scenario in Step 3. The needle uses a CSS back-ease curve for
 * a swing-with-overshoot feel, entirely in CSS (no animation library).
 */
export function DependencyRiskMeter({
  selectable = true,
  fixedScenarioId,
  onFirstInteract,
}: {
  selectable?: boolean;
  fixedScenarioId?: string;
  onFirstInteract?: () => void;
}) {
  const [selectedId, setSelectedId] = useState(fixedScenarioId ?? DEPENDENCY_SCENARIOS[0].id);
  const scenario = DEPENDENCY_SCENARIOS.find((s) => s.id === selectedId) ?? DEPENDENCY_SCENARIOS[0];
  const angle = RISK_ANGLE[scenario.risk];

  return (
    <div>
      <svg viewBox="0 0 240 130" className="mx-auto w-full max-w-xs" role="img" aria-label={`Dependency risk gauge, currently ${scenario.risk}`}>
        <path d="M30 120 A90 90 0 0 1 210 120" fill="none" stroke="#E2E5E9" strokeWidth={16} strokeLinecap="round" />
        <text x={38} y={112} fontSize="10" fontWeight={600} fill="#0E7A5A">Low</text>
        <text x={120} y={18} fontSize="10" fontWeight={600} fill="#B87514" textAnchor="middle">Medium</text>
        <text x={202} y={112} fontSize="10" fontWeight={600} fill="#B23B3B" textAnchor="end">High</text>
        <line
          x1={120}
          y1={120}
          x2={120}
          y2={38}
          stroke="#16191D"
          strokeWidth={4}
          strokeLinecap="round"
          style={{
            transformOrigin: "120px 120px",
            transform: `rotate(${angle}deg)`,
            transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
        <circle cx={120} cy={120} r={6} fill="#16191D" />
      </svg>

      {selectable && (
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {DEPENDENCY_SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                onFirstInteract?.();
                setSelectedId(s.id);
              }}
              aria-pressed={selectedId === s.id}
              className={clsx(
                "rounded-xl border p-3 text-left text-caption font-semibold transition-colors duration-150",
                selectedId === s.id ? "border-accent bg-accentSoft text-accent" : "border-line text-ink hover:border-ash",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-accent/30 bg-accentSoft p-3">
          <p className="text-micro font-semibold uppercase tracking-wide text-accent">What you gain</p>
          <p className="mt-1 text-caption text-ink">{scenario.gain}</p>
        </div>
        <div className="rounded-xl border border-warn/30 bg-canvas p-3">
          <p className="text-micro font-semibold uppercase tracking-wide text-warn">What you risk</p>
          <p className="mt-1 text-caption text-ink">{scenario.loss}</p>
        </div>
      </div>
    </div>
  );
}
