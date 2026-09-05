import Link from "next/link";
import { CASE, LEVELS } from "@/lib/module3";
import { LeafMark } from "@/components/chrome/Icons";
import { ArrowRight, Lock } from "@/components/icons/LineIcons";

export default function ModuleLanding() {
  return (
    <div className="py-12">
      {/* Hero */}
      <div className="max-w-prose">
        <p className="mb-2 flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-accent">
          <LeafMark className="h-4 w-4" />
          {CASE.module}
        </p>
        <h1 className="text-display text-ink">{CASE.moduleTitle}</h1>
        <p className="mt-4 text-body text-ash">
          One case, three levels. You work {CASE.company} — a mid-size industrial
          technology company — from reading its IT strategy, to choosing with the
          numbers in front of you, to deciding under real constraint. Each level
          lives on its own route and ends in a document a professional would
          actually produce.
        </p>
      </div>

      {/* Level cards */}
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {LEVELS.map((lv) => {
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-readout font-semibold text-paper">
                  {lv.n}
                </span>
                {lv.available ? (
                  <span className="rounded-full bg-accentSoft px-2.5 py-1 text-micro font-semibold uppercase tracking-wide text-accent">
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-micro font-semibold uppercase tracking-wide text-ash">
                    <Lock className="h-3.5 w-3.5" /> Locked
                  </span>
                )}
              </div>

              <p className="mt-4 text-micro font-semibold uppercase tracking-wide text-ash">
                {lv.tag}
              </p>
              <h2 className="mt-1 text-h2 text-ink">{lv.cardTitle}</h2>
              <p className="mt-2 flex-1 text-body text-ash">{lv.cardBlurb}</p>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <span className="text-caption text-ash">
                  Deliverable:{" "}
                  <span className="font-semibold text-ink">{lv.deliverable}</span>
                </span>
                {lv.available ? (
                  <span className="inline-flex items-center gap-1.5 text-caption font-semibold text-accent">
                    Open <ArrowRight className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="text-caption text-ash">Not yet</span>
                )}
              </div>
            </>
          );

          const cls =
            "flex h-full flex-col rounded-2xl border bg-paper p-6 shadow-sm";

          return lv.available ? (
            <Link
              key={lv.slug}
              href={lv.href}
              className={`${cls} border-line transition-all duration-150 hover:-translate-y-0.5 hover:border-accent hover:shadow-md`}
            >
              {inner}
            </Link>
          ) : (
            <div key={lv.slug} className={`${cls} border-dashed border-line opacity-80`}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
