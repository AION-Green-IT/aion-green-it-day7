import type { Metadata } from "next";
import { LEVELS, MATERIAL, TASK1 } from "@/lib/module3";
import { LeafMark } from "@/components/chrome/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoryIntro } from "@/components/level1/StoryIntro";
import { MaterialCards, MaterialProgress } from "@/components/level1/MaterialCards";
import { TaskGate } from "@/components/level1/TaskGate";
import { SortingBoard } from "@/components/level1/SortingBoard";
import { Reflection } from "@/components/level1/Reflection";
import { DiagnosticExport } from "@/components/level1/DiagnosticExport";
import { DiagnosticNotePrint } from "@/components/level1/DiagnosticNotePrint";
import { Level1Reset } from "@/components/level1/Level1Reset";

const LEVEL = LEVELS[0];

export const metadata: Metadata = {
  title: `AION Green IT — ${LEVEL.tag}`,
};

export default function Level1Page() {
  return (
    <>
      <div className="print:hidden">
        {/* Header */}
        <div className="max-w-prose py-10">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-accent">
              <LeafMark className="h-4 w-4" />
              {LEVEL.tag}
            </p>
            <Level1Reset />
          </div>
          <h1 className="text-h1 text-ink">{LEVEL.title}</h1>
        </div>

        <StoryIntro />

        <hr className="border-line" />

        {/* Section 2 — material */}
        <section className="py-10">
          <SectionHeading
            kicker={MATERIAL.kicker}
            title={MATERIAL.title}
            intro={MATERIAL.intro}
            className="mb-6"
          />
          <MaterialCards />
        </section>

        <hr className="border-line" />

        {/* Section 3 — task */}
        <section id="task" className="scroll-mt-24 py-10">
          <SectionHeading
            kicker={TASK1.kicker}
            title={TASK1.heading}
            intro={TASK1.subtext}
            className="mb-4"
          />
          <div className="mb-6">
            <MaterialProgress />
          </div>

          <TaskGate>
            <div className="space-y-10">
              <SortingBoard />
              <Reflection />
              <DiagnosticExport />
            </div>
          </TaskGate>
        </section>
      </div>

      {/* Print-only output, outside the print:hidden wrapper. */}
      <DiagnosticNotePrint />
    </>
  );
}
