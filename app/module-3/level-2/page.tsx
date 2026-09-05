import type { Metadata } from "next";
import { LEVELS } from "@/lib/module3";
import { LEVEL2_TITLE, MATERIAL2, SCORECARD, TASK2 } from "@/lib/level2";
import { LeafMark } from "@/components/chrome/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoryContinuation } from "@/components/level2/StoryContinuation";
import { Level2Material } from "@/components/level2/Level2Material";
import { ReadinessScorecard } from "@/components/level2/ReadinessScorecard";
import { ConsequenceSimulator } from "@/components/level2/ConsequenceSimulator";
import { ComparisonTable } from "@/components/level2/ComparisonTable";
import { Level2Reflection } from "@/components/level2/Level2Reflection";
import { CalculationExport } from "@/components/level2/CalculationExport";
import { CalculationNotePrint } from "@/components/level2/CalculationNotePrint";

const LEVEL = LEVELS[1];

export const metadata: Metadata = {
  title: `AION Green IT — ${LEVEL.tag}`,
};

export default function Level2Page() {
  return (
    <>
      <div className="print:hidden">
        <div className="max-w-prose py-10">
          <p className="mb-2 flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-accent">
            <LeafMark className="h-4 w-4" />
            {LEVEL.tag}
          </p>
          <h1 className="text-h1 text-ink">{LEVEL2_TITLE}</h1>
        </div>

        <>
          <StoryContinuation />

          <hr className="border-line" />

          <section className="py-10">
            <SectionHeading kicker={MATERIAL2.kicker} title={MATERIAL2.title} intro={MATERIAL2.intro} className="mb-6" />
            <Level2Material />
          </section>

          <hr className="border-line" />

          <section id="task" className="scroll-mt-24 py-10">
            <SectionHeading kicker={TASK2.kicker} title={TASK2.heading} intro={TASK2.subtext} className="mb-8" />

            <div className="space-y-12">
              <div>
                <SectionHeading kicker={SCORECARD.kicker} title={SCORECARD.title} intro={SCORECARD.intro} className="mb-5" />
                <ReadinessScorecard />
              </div>

              <div>
                <SectionHeading kicker={TASK2.simulatorKicker} title={TASK2.simulatorTitle} className="mb-5" />
                <ConsequenceSimulator />
              </div>

              <div>
                <SectionHeading kicker={TASK2.tableKicker} title={TASK2.tableTitle} className="mb-5" />
                <ComparisonTable />
              </div>

              <div>
                <SectionHeading kicker={TASK2.reflection.kicker} title="Commit, then name the cost" className="mb-5" />
                <Level2Reflection />
              </div>

              <CalculationExport />
            </div>
          </section>
        </>
      </div>

      <CalculationNotePrint />
    </>
  );
}
