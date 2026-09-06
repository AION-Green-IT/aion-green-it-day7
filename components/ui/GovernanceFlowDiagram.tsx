/** Board → CIO/CTO → IT Ops → Finance approval chain — shared across Route 2 and Route 3. */
export function GovernanceFlowDiagram() {
  const roles = [
    { id: "board", label: "Board / Exec Committee", concern: "Strategic risk & budget ceiling" },
    { id: "cio", label: "CIO / CTO / Head of Infra", concern: "Owns the trade-off analysis" },
    { id: "itops", label: "IT Operations", concern: "Feasibility & availability veto" },
    { id: "finance", label: "Finance", concern: "Economic viability sign-off" },
  ];
  return (
    <div>
      <div className="space-y-2.5">
        {roles.map((r, i) => (
          <div key={r.id}>
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line p-3">
              <span className="text-caption font-semibold text-ink">{r.label}</span>
              <span className="text-micro text-ash">{r.concern}</span>
            </div>
            {i < roles.length - 1 && (
              <div className="flex justify-center gap-6 py-1 text-micro text-ash">
                <span>↓ recommendation</span>
                <span>↑ feedback / objection</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-micro text-ash">
        Then back to the Board for final approval, with a reporting loop down once implemented — feeding the
        disclosure obligations above.
      </p>
    </div>
  );
}
