import { CATEGORIES, SIDES, VERDICT_OPTIONS } from "@/lib/route1";

/**
 * The in-context glossary for Task 1: the exact six lenses Stage A sorts into,
 * the two sides Stage D splits by, and the three verdicts Stage B chooses
 * between — rendered from the same data those stages use, so the material can
 * never drift out of sync with the choices the task offers.
 */
export function AuditLensGuide() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-caption font-semibold text-ink">The six lenses (Stage A)</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {CATEGORIES.map((c) => (
            <div key={c.id} className="rounded-xl border border-line p-3">
              <p className="text-caption font-semibold text-accent">{c.label}</p>
              <p className="mt-0.5 text-micro text-ash">{c.domain}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-line pt-4">
        <p className="text-caption font-semibold text-ink">The two sides (Stage D)</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {SIDES.map((s) => (
            <div key={s.id} className="rounded-xl border border-line p-3">
              <p className="text-caption font-semibold text-accent">{s.label}</p>
              <p className="mt-0.5 text-micro text-ash">{s.domain}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-micro italic text-ash">
          The test is one question: is this measured, or decided?
        </p>
      </div>

      <div className="border-t border-line pt-4">
        <p className="text-caption font-semibold text-ink">The three verdicts (Stage B)</p>
        <div className="mt-2 space-y-2">
          {VERDICT_OPTIONS.map((v) => (
            <div key={v.id} className="flex flex-wrap items-baseline gap-x-2 rounded-xl border border-line p-3">
              <span className="text-caption font-semibold text-accent">{v.label}</span>
              <span className="text-micro text-ash">{v.domain}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
