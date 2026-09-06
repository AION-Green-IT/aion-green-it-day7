"use client";

import { useState } from "react";
import { useProgress } from "@/lib/store";
import { R3, TENSION_NODES, TENSION_EDGES, type TensionNodeId } from "@/lib/route3";

const NODE_POS: Record<TensionNodeId, { x: number; y: number }> = {
  purchasing: { x: 150, y: 20 },
  it: { x: 264, y: 103 },
  sustainability: { x: 221, y: 237 },
  suppliers: { x: 79, y: 237 },
  management: { x: 36, y: 103 },
};

/** Step 1 — a network diagram (not a linear timeline) showing where tension actually sits. */
export function TensionMap() {
  const markSeen = useProgress((s) => s.markSeen);
  const [openNode, setOpenNode] = useState<TensionNodeId | null>(null);
  const [openEdge, setOpenEdge] = useState<string | null>(null);

  const clickNode = (id: TensionNodeId) => {
    markSeen(R3.tensionNodesSeen, id);
    setOpenEdge(null);
    setOpenNode((cur) => (cur === id ? null : id));
  };
  const clickEdge = (id: string) => {
    markSeen(R3.tensionEdgesSeen, id);
    setOpenNode(null);
    setOpenEdge((cur) => (cur === id ? null : id));
  };

  const nodeDetail = TENSION_NODES.find((n) => n.id === openNode);
  const edgeDetail = TENSION_EDGES.find((e) => e.id === openEdge);

  return (
    <div>
      <svg
        viewBox="0 0 300 280"
        className="mx-auto w-full max-w-md"
        role="img"
        aria-label="Governance tension network: Purchasing, IT, Sustainability Team, Suppliers, Management"
      >
        {TENSION_EDGES.map((e) => {
          const a = NODE_POS[e.a];
          const b = NODE_POS[e.b];
          const isOpen = openEdge === e.id;
          return (
            <line
              key={e.id}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={e.level === "high" ? "#B23B3B" : "#C7CBD1"}
              strokeWidth={e.level === "high" ? (isOpen ? 6 : 4) : isOpen ? 3 : 1.5}
              strokeLinecap="round"
              className="cursor-pointer transition-[stroke-width] duration-150"
              onClick={() => clickEdge(e.id)}
            />
          );
        })}
        {TENSION_NODES.map((n) => {
          const p = NODE_POS[n.id];
          const isOpen = openNode === n.id;
          return (
            <g
              key={n.id}
              className="group cursor-pointer outline-none"
              role="button"
              tabIndex={0}
              aria-label={`${n.label} node`}
              onClick={() => clickNode(n.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  clickNode(n.id);
                }
              }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={isOpen ? 30 : 26}
                fill={isOpen ? "#0E7A5A" : "#16191D"}
                stroke="#FFFFFF"
                strokeWidth={3}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                className="transition-all duration-200 group-hover:scale-105"
              />
              <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="10" fontWeight={600} fill="#FFFFFF">
                {n.label.split(" ")[0]}
              </text>
            </g>
          );
        })}
      </svg>

      {nodeDetail && (
        <div className="reveal-in mt-3 rounded-xl border border-line bg-canvas p-4">
          <p className="text-micro font-semibold uppercase tracking-wide text-ash">{nodeDetail.label}</p>
          <p className="mt-1 text-caption text-ink">{nodeDetail.detail}</p>
        </div>
      )}
      {edgeDetail && (
        <div className="reveal-in mt-3 rounded-xl border border-warn/30 bg-canvas p-4">
          <p className="text-micro font-semibold uppercase tracking-wide text-warn">
            {TENSION_NODES.find((n) => n.id === edgeDetail.a)?.label} ↔{" "}
            {TENSION_NODES.find((n) => n.id === edgeDetail.b)?.label}
          </p>
          <p className="mt-1 text-caption text-ink">{edgeDetail.reason}</p>
        </div>
      )}
    </div>
  );
}
