"use client";

import { TASK1 } from "@/lib/route1";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Info } from "@/components/icons/LineIcons";
import { CaseBrief } from "./CaseBrief";
import { EvidenceSorter } from "./EvidenceSorter";
import { PueValidityCheck } from "./PueValidityCheck";
import { GapFinder } from "./GapFinder";
import { TechGovSplit } from "./TechGovSplit";
import { AuditReportPanel } from "./AuditReportPanel";
import { ExportBar } from "./ExportBar";

export function TaskFlow() {
  return (
    <section id="task" className="space-y-8">
      <SectionHeading kicker={TASK1.kicker} title={TASK1.heading} intro={TASK1.subtext} />

      <div className="flex items-start gap-3 rounded-xl border border-line bg-canvas p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-ash" />
        <p className="text-caption text-ash">{TASK1.orderBanner}</p>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_360px] lg:items-start lg:gap-8">
        <div className="space-y-10">
          <CaseBrief />

          <div id="r1-stageA">
            <h3 className="text-h3 text-ink">{TASK1.stageA.heading}</h3>
            <p className="mt-1 text-caption text-ash">{TASK1.stageA.instructions}</p>
            <div className="mt-4">
              <EvidenceSorter />
            </div>
          </div>

          <div id="r1-stageB">
            <h3 className="text-h3 text-ink">{TASK1.stageB.heading}</h3>
            <p className="mt-1 text-caption text-ash">{TASK1.stageB.instructions}</p>
            <div className="mt-4">
              <PueValidityCheck />
            </div>
          </div>

          <div id="r1-stageC">
            <h3 className="text-h3 text-ink">{TASK1.stageC.heading}</h3>
            <p className="mt-1 text-caption text-ash">{TASK1.stageC.instructions}</p>
            <div className="mt-4">
              <GapFinder />
            </div>
          </div>

          <div id="r1-stageD">
            <h3 className="text-h3 text-ink">{TASK1.stageD.heading}</h3>
            <p className="mt-1 text-caption text-ash">{TASK1.stageD.instructions}</p>
            <div className="mt-4">
              <TechGovSplit />
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <AuditReportPanel />
        </div>
      </div>

      <ExportBar />
    </section>
  );
}
