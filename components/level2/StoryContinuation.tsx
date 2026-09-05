import { STORY2 } from "@/lib/level2";
import { NetworkMotif } from "@/components/visuals/NetworkMotif";
import { Reveal } from "@/components/ui/Reveal";
import { DiagnosticReference } from "./DiagnosticReference";

/**
 * Section 1 — story continuation. Same motif as Level 1, now with the
 * Procurement lever pulsing. Below the intro sits the learner's own Level 1
 * Diagnostic Note, shown again for reference (not restated as new content).
 */
export function StoryContinuation() {
  return (
    <Reveal as="section" className="py-10">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="mb-3 text-micro font-semibold uppercase tracking-wide text-accent">
            {STORY2.kicker}
          </p>
          <div className="max-w-prose space-y-4">
            {STORY2.paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-body leading-relaxed text-ink"
                    : "text-body leading-relaxed text-ash"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="card p-5 lg:sticky lg:top-24">
          <NetworkMotif className="w-full" pulseProcurement />
          <p className="mt-3 border-t border-line pt-3 text-caption text-ash">
            Procurement keeps surfacing as the strongest recurring lever.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <DiagnosticReference />
      </div>
    </Reveal>
  );
}
