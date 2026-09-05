import { STORY_INTRO } from "@/lib/module3";
import { NetworkMotif } from "@/components/visuals/NetworkMotif";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 1 — editorial story intro. The verbatim case text sits beside an
 * abstract network motif whose sustainability node is greyed out and only
 * loosely tethered, visually stating the disconnection before the learner
 * reads a word about it. Fades up on scroll.
 */
export function StoryIntro() {
  return (
    <Reveal as="section" className="py-10">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="mb-3 text-micro font-semibold uppercase tracking-wide text-accent">
            {STORY_INTRO.kicker}
          </p>
          <div className="max-w-prose space-y-4">
            {STORY_INTRO.paragraphs.map((p, i) => (
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
          <NetworkMotif className="w-full" />
          <p className="mt-3 border-t border-line pt-3 text-caption text-ash">
            IT systems are wired to each other. Sustainability sits apart —
            stated, but not connected to how decisions are made.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
