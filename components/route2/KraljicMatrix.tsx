"use client";

import { useEffect, useRef, useState } from "react";

/** The Kraljic 2x2 grid with one animated position dot + trail. risk/impact are 0-100. */
export function KraljicMatrix({
  risk,
  impact,
  label,
}: {
  risk: number;
  impact: number;
  label?: string;
}) {
  const size = 240;
  const pad = 16;
  const plot = size - pad * 2;
  const x = pad + (impact / 100) * plot;
  const y = pad + plot - (risk / 100) * plot;

  const [trail, setTrail] = useState<{ x: number; y: number } | null>(null);
  const prevRef = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    if (prevRef.current) setTrail(prevRef.current);
    prevRef.current = { x, y };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [risk, impact]);

  return (
    <div>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full" role="img" aria-label="Kraljic matrix: supply risk vs. business impact">
        <line x1={pad} y1={size / 2} x2={size - pad} y2={size / 2} stroke="#E2E5E9" strokeWidth={1.5} />
        <line x1={size / 2} y1={pad} x2={size / 2} y2={size - pad} stroke="#E2E5E9" strokeWidth={1.5} />
        <rect x={pad} y={pad} width={plot} height={plot} fill="none" stroke="#E2E5E9" strokeWidth={1.5} />

        <text x={pad + 6} y={pad + 16} fontSize="9.5" fontWeight={600} fill="#5E6670">Bottleneck</text>
        <text x={size - pad - 6} y={pad + 16} textAnchor="end" fontSize="9.5" fontWeight={600} fill="#5E6670">Strategic</text>
        <text x={pad + 6} y={size - pad - 8} fontSize="9.5" fontWeight={600} fill="#5E6670">Non-critical</text>
        <text x={size - pad - 6} y={size - pad - 8} textAnchor="end" fontSize="9.5" fontWeight={600} fill="#5E6670">Leverage</text>

        <text x={size / 2} y={size - 2} textAnchor="middle" fontSize="9" fill="#5E6670">Business impact →</text>
        <text x={10} y={size / 2} textAnchor="middle" fontSize="9" fill="#5E6670" transform={`rotate(-90 10 ${size / 2})`}>Supply risk →</text>

        {trail && (
          <line
            x1={trail.x}
            y1={trail.y}
            x2={x}
            y2={y}
            stroke="#0E7A5A"
            strokeWidth={1.5}
            strokeDasharray="3 3"
            className="reveal-in"
          />
        )}
        <circle
          cx={x}
          cy={y}
          r={7}
          fill="#0E7A5A"
          stroke="#FFFFFF"
          strokeWidth={2}
          style={{ transition: "cx 0.7s ease, cy 0.7s ease" }}
        />
      </svg>
      {label && <p className="reveal-in mt-2 text-center text-caption font-semibold text-ink">{label}</p>}
    </div>
  );
}
