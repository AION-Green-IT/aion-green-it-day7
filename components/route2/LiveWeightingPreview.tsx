"use client";

import { useRef, useState } from "react";
import { useProgress } from "@/lib/store";
import { R2, CRITERIA, DEMO_OPTION_X, DEMO_OPTION_Y, evenWeights, redistributeWeights } from "@/lib/route2";
import { RadarChart } from "@/components/ui/RadarChart";

const AXES = CRITERIA.map((c) => ({ id: c.id, label: c.label }));

/** Impact Delta Visualizer — Block 4 (demo only). One weight slider reshapes both option polygons live. */
export function LiveWeightingPreview() {
  const markSeen = useProgress((s) => s.markSeen);
  const touchedRef = useRef(false);
  const base = evenWeights();
  const [envWeight, setEnvWeight] = useState(base.environmentalImpact);

  const weights = redistributeWeights(base, "environmentalImpact", envWeight);

  return (
    <div>
      <div className="mx-auto max-w-sm">
        <RadarChart
          axes={AXES}
          weights={weights}
          series={[
            { id: "x", label: "Option X", color: "#16191D", scores: DEMO_OPTION_X },
            { id: "y", label: "Option Y", color: "#0E7A5A", scores: DEMO_OPTION_Y },
          ]}
        />
      </div>
      <div className="mt-3 flex items-center justify-center gap-4 text-caption">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-ink" /> Option X</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-accent" /> Option Y</span>
      </div>

      <div className="mx-auto mt-4 max-w-sm">
        <div className="flex items-baseline justify-between">
          <span className="text-caption font-semibold text-ash">Environmental Impact weight</span>
          <span className="tabular-nums text-caption text-ink">{weights.environmentalImpact}%</span>
        </div>
        <input
          type="range"
          min={10}
          max={40}
          step={1}
          value={envWeight}
          onChange={(e) => {
            if (!touchedRef.current) {
              touchedRef.current = true;
              markSeen(R2.material, "weighting");
            }
            setEnvWeight(Number(e.target.value));
          }}
          aria-label="Environmental impact weight, 10 to 40 percent"
          className="h-2 w-full cursor-pointer accent-accent"
        />
        <div className="mt-1 flex justify-between text-micro text-ash">
          <span>10%</span>
          <span>40%</span>
        </div>
        <p className="mt-2 text-micro text-ash">
          Demo only — Task 2 uses your own three models and all seven weights.
        </p>
      </div>
    </div>
  );
}
