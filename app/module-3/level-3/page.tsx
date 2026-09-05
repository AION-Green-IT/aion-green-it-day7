import type { Metadata } from "next";
import { LEVELS } from "@/lib/module3";
import { LEVEL3_TITLE, MATERIAL3, TASK3 } from "@/lib/level3";
import { LeafMark } from "@/components/chrome/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoryContinuation3 } from "@/components/level3/StoryContinuation3";
import { Level3Material } from "@/components/level3/Level3Material";
import { Level3Builder } from "@/components/level3/Level3Builder";
import { PortfolioPrint } from "@/components/level3/PortfolioPrint";

const LEVEL = LEVELS[2];

export const metadata: Metadata = {
  title: `AION Green IT — ${LEVEL.tag}`,
};

export default function Level3Page() {
  return (
    <>
      <div className="print:hidden">
        <div className="max-w-prose py-10">
          <p className="mb-2 flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-accent">
            <LeafMark className="h-4 w-4" />
            {LEVEL.tag}
          </p>
          <h1 className="text-h1 text-ink">{LEVEL3_TITLE}</h1>
        </div>

        <>
          <StoryContinuation3 />

          <hr className="border-line" />

          <section className="py-10">
            <SectionHeading kicker={MATERIAL3.kicker} title={MATERIAL3.title} intro={MATERIAL3.intro} className="mb-6" />
            <Level3Material />
          </section>

          <hr className="border-line" />

          <section id="task" className="scroll-mt-24 py-10">
            <SectionHeading kicker={TASK3.kicker} title={TASK3.heading} intro={TASK3.subtext} className="mb-8" />
            <Level3Builder />
          </section>
        </>
      </div>

      <PortfolioPrint />
    </>
  );
}
