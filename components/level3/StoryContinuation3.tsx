import { STORY3 } from "@/lib/level3";
import { NetworkMotif } from "@/components/visuals/NetworkMotif";
import { Reveal } from "@/components/ui/Reveal";
import { Level3References } from "./Level3References";

/**
 * Section 1 — final story continuation. The network is now wired; a dashed
 * "Board Decision" node pulses, waiting for the learner's memo. Below sit both
 * of the learner's own prior notes, read-only.
 */
export function StoryContinuation3() {
  return (
    <Reveal as="section" className="py-10">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="mb-3 text-micro font-semibold uppercase tracking-wide text-accent">{STORY3.kicker}</p>
          <div className="max-w-prose space-y-4">
            {STORY3.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "text-body leading-relaxed text-ink" : "text-body leading-relaxed text-ash"}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="card p-5 lg:sticky lg:top-24">
          <NetworkMotif className="w-full" boardDecision />
          <p className="mt-3 border-t border-line pt-3 text-caption text-ash">
            Everything is wired. One node is still open — the board decision only you can complete.
          </p>
        </div>
      </div>

      <Level3References />
    </Reveal>
  );
}
