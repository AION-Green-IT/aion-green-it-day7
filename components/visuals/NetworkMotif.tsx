/**
 * Abstract corporate/IT network motif for the story intro: a cluster of
 * live IT-system nodes wired together, and one greyed-out "Sustainability"
 * node sitting apart — connected only by a dashed, faded line, to imply the
 * disconnection the learner is about to diagnose. Single-colour line work;
 * the sustainability node is the only muted element.
 */
export function NetworkMotif({
  className,
  pulseProcurement = false,
  boardDecision = false,
}: {
  className?: string;
  /** Level 2: add a faintly pulsing Procurement node to hint the recurring lever. */
  pulseProcurement?: boolean;
  /** Level 3: the network is wired; one dashed "Board Decision" node pulses, waiting. */
  boardDecision?: boolean;
}) {
  const nodes = [
    { id: "systems", x: 96, y: 60, label: "Systems" },
    { id: "platforms", x: 176, y: 40, label: "Platforms" },
    { id: "devices", x: 236, y: 96, label: "Devices" },
    { id: "cloud", x: 168, y: 128, label: "Cloud" },
    { id: "erp", x: 84, y: 132, label: "ERP" },
  ];
  const links: [string, string][] = [
    ["systems", "platforms"],
    ["platforms", "devices"],
    ["devices", "cloud"],
    ["cloud", "erp"],
    ["erp", "systems"],
    ["systems", "cloud"],
    ["platforms", "cloud"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const sustain = { x: 300, y: 176 };
  const nearest = byId["devices"];
  const proc = { x: 150, y: 182 };

  return (
    <svg
      viewBox="0 0 340 210"
      role="img"
      aria-label="IT systems wired together, with a faded, disconnected sustainability node"
      className={className}
    >
      {/* live links */}
      <g stroke="#0E7A5A" strokeWidth="1.4" strokeLinecap="round" opacity="0.55">
        {links.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />
        ))}
      </g>

      {/* the bridge to sustainability — faded in L1/L2, solid once the memo lands */}
      <line
        x1={nearest.x}
        y1={nearest.y}
        x2={sustain.x}
        y2={sustain.y}
        stroke={boardDecision ? "#0E7A5A" : "#B7BEC6"}
        strokeWidth="1.4"
        strokeDasharray={boardDecision ? undefined : "3 5"}
        strokeLinecap="round"
        opacity={boardDecision ? 0.55 : 1}
      />

      {/* live nodes */}
      <g>
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="8" fill="#FFFFFF" stroke="#0E7A5A" strokeWidth="1.6" />
            <circle cx={n.x} cy={n.y} r="2.4" fill="#0E7A5A" />
            <text
              x={n.x}
              y={n.y - 14}
              textAnchor="middle"
              fontSize="10"
              fill="#5E6670"
              fontFamily="Segoe UI, Helvetica Neue, Arial, sans-serif"
            >
              {n.label}
            </text>
          </g>
        ))}
      </g>

      {/* Level 2 only: the recurring Procurement lever, pulsing faintly */}
      {pulseProcurement ? (
        <g>
          <line x1={byId["erp"].x} y1={byId["erp"].y} x2={proc.x} y2={proc.y} stroke="#0E7A5A" strokeWidth="1.4" opacity="0.5" strokeLinecap="round" />
          <line x1={byId["cloud"].x} y1={byId["cloud"].y} x2={proc.x} y2={proc.y} stroke="#0E7A5A" strokeWidth="1.4" opacity="0.5" strokeLinecap="round" />
          <g className="motif-pulse" style={{ transformOrigin: `${proc.x}px ${proc.y}px` }}>
            <circle cx={proc.x} cy={proc.y} r="14" fill="#0E7A5A" opacity="0.12" />
            <circle cx={proc.x} cy={proc.y} r="8" fill="#FFFFFF" stroke="#0E7A5A" strokeWidth="1.8" />
            <circle cx={proc.x} cy={proc.y} r="2.6" fill="#0E7A5A" />
          </g>
          <text x={proc.x} y={proc.y + 26} textAnchor="middle" fontSize="10" fill="#0E7A5A" fontFamily="Segoe UI, Helvetica Neue, Arial, sans-serif">
            Procurement
          </text>
        </g>
      ) : null}

      {/* sustainability node — greyed and apart in L1/L2, connected once the memo lands */}
      <g>
        <circle
          cx={sustain.x}
          cy={sustain.y}
          r="11"
          fill={boardDecision ? "#FFFFFF" : "#EEF1F3"}
          stroke={boardDecision ? "#0E7A5A" : "#B7BEC6"}
          strokeWidth="1.6"
        />
        <path
          d="M304 172c-4 0-6.6 2-6.6 5.4 0 .5 0 .9.2 1.3.8-2.2 2.5-3.6 5.1-4.2-2 1.2-3.3 2.6-3.7 4.6 3.4.5 5-1.7 5-5.1V172Z"
          fill="none"
          stroke={boardDecision ? "#0E7A5A" : "#9AA1AA"}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <text
          x={sustain.x}
          y={sustain.y + 26}
          textAnchor="middle"
          fontSize="10"
          fill={boardDecision ? "#5E6670" : "#9AA1AA"}
          fontFamily="Segoe UI, Helvetica Neue, Arial, sans-serif"
        >
          Sustainability
        </text>
      </g>

      {/* Level 3: the dashed, pulsing "Board Decision" node — waiting to be completed */}
      {boardDecision ? (
        <g>
          <line x1={byId["erp"].x} y1={byId["erp"].y} x2={150} y2={168} stroke="#0E7A5A" strokeWidth="1.4" strokeDasharray="4 3" opacity="0.6" />
          <line x1={byId["cloud"].x} y1={byId["cloud"].y} x2={150} y2={168} stroke="#0E7A5A" strokeWidth="1.4" strokeDasharray="4 3" opacity="0.6" />
          <g className="motif-pulse" style={{ transformOrigin: "150px 168px" }}>
            <circle cx={150} cy={168} r="13" fill="#FFFFFF" stroke="#0E7A5A" strokeWidth="1.8" strokeDasharray="4 3" />
            <path d="M144 168h12M150 162v12" stroke="#0E7A5A" strokeWidth="1.4" strokeLinecap="round" />
          </g>
          <text x={150} y={194} textAnchor="middle" fontSize="10" fill="#0E7A5A" fontWeight={600} fontFamily="Segoe UI, Helvetica Neue, Arial, sans-serif">
            Board Decision
          </text>
        </g>
      ) : null}
    </svg>
  );
}
