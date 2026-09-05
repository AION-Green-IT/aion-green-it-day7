import Link from "next/link";
import type { Level } from "@/lib/module3";
import { CASE, LEVELS } from "@/lib/module3";
import { LeafMark } from "@/components/chrome/Icons";
import { ArrowRight, Lock } from "@/components/icons/LineIcons";

/**
 * A separated but not-yet-authored level route. It carries only the level's
 * framing (tag, deliverable, discipline) — no task content is invented here.
 * The three levels each live on their own route; this is the shell for the two
 * that are built later.
 */
export function LevelPlaceholder({ level }: { level: Level }) {
  const prev = LEVELS.find((l) => l.n === level.n - 1);

  return (
    <div className="py-14">
      <div className="max-w-prose">
        <p className="mb-2 flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-accent">
          <LeafMark className="h-4 w-4" />
          {level.tag}
        </p>
        <h1 className="text-h1 text-ink">{level.title}</h1>
        <p className="mt-4 text-body text-ash">{level.cardBlurb}</p>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-dashed border-line bg-mist/50 p-5">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-ash" />
          <div>
            <p className="text-body font-semibold text-ink">
              This level is on its own route, but not built yet.
            </p>
            <p className="mt-1 text-caption text-ash">
              Same case — {CASE.company} — carried forward. It will produce a{" "}
              <span className="font-semibold text-ink">{level.deliverable}</span>
              {prev ? (
                <>
                  {" "}and build on the {prev.deliverable} from {prev.tag}.
                </>
              ) : (
                "."
              )}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/module-3/level-1" className="btn-accent inline-flex items-center gap-1.5">
            Go to Level 1 <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/" className="btn-ghost">
            Module overview
          </Link>
        </div>
      </div>
    </div>
  );
}
