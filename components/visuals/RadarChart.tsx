"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 5-axis readiness radar. Values 1..max. The filled shape tweens toward new
 * values over ~300ms (rAF) so the redraw reads as a calculation, not a snap;
 * reduced-motion jumps straight to the target.
 */
export function RadarChart({
  axes,
  max = 5,
  className,
}: {
  axes: { label: string; value: number }[];
  max?: number;
  className?: string;
}) {
  const target = axes.map((a) => a.value);
  const values = useTween(target);

  const W = 320;
  const H = 264;
  const cx = W / 2;
  const cy = 128;
  const R = 88;
  const n = axes.length;

  const angleFor = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pt = (i: number, r: number): [number, number] => {
    const a = angleFor(i);
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };

  const rings = Array.from({ length: max }, (_, i) => ((i + 1) / max) * R);
  const shape = values
    .map((v, i) => pt(i, (Math.max(0, Math.min(max, v)) / max) * R).join(","))
    .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Readiness profile across five areas" className={className} style={{ maxWidth: 420 }}>
      {/* rings */}
      {rings.map((r, i) => (
        <polygon
          key={i}
          points={Array.from({ length: n }, (_, k) => pt(k, r).join(",")).join(" ")}
          fill="none"
          stroke="#E2E5E9"
          strokeWidth="1"
        />
      ))}
      {/* spokes */}
      {axes.map((_, i) => {
        const [x, y] = pt(i, R);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#E2E5E9" strokeWidth="1" />;
      })}

      {/* filled value shape */}
      <polygon points={shape} fill="#0E7A5A" fillOpacity="0.16" stroke="#0E7A5A" strokeWidth="1.8" strokeLinejoin="round" />
      {values.map((v, i) => {
        const [x, y] = pt(i, (Math.max(0, Math.min(max, v)) / max) * R);
        return <circle key={i} cx={x} cy={y} r="3.2" fill="#0E7A5A" />;
      })}

      {/* labels */}
      {axes.map((a, i) => {
        const [x, y] = pt(i, R + 16);
        const c = Math.cos(angleFor(i));
        const anchor = c > 0.3 ? "start" : c < -0.3 ? "end" : "middle";
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize="10.5"
            fill="#5E6670"
            fontFamily="Segoe UI, Helvetica Neue, Arial, sans-serif"
          >
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}

/** Eases an array of numbers toward `target` over ~300ms via rAF. */
function useTween(target: number[], duration = 300): number[] {
  const [values, setValues] = useState<number[]>(target);
  const fromRef = useRef<number[]>(target);
  const rafRef = useRef<number | null>(null);
  const key = target.join("|");

  useEffect(() => {
    const reduce =
      typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = fromRef.current;
    if (reduce || from.length !== target.length) {
      fromRef.current = target;
      setValues(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const cur = target.map((to, i) => from[i] + (to - from[i]) * e);
      setValues(cur);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      fromRef.current = values;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return values;
}
