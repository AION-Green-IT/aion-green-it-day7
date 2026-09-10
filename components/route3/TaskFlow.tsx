"use client";

import { TASK3 } from "@/lib/route3";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Info } from "@/components/icons/LineIcons";
import { NameField } from "./CaseBrief";
import { DiagnosticPhase } from "./DiagnosticPhase";
import { BuilderPhase } from "./BuilderPhase";
import { BoardMemoPanel } from "./BoardMemoPanel";
import { ExportBar } from "./ExportBar";
import { t } from "@/lib/i18n/core";

export function TaskFlow() {
  return (
    <section id="task" className="space-y-8">
      <SectionHeading kicker={t(TASK3.kicker)} title={t(TASK3.heading)} intro={t(TASK3.subtext)} />

      <div className="flex items-start gap-3 rounded-xl border border-line bg-canvas p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-ash" />
        <p className="text-caption text-ash">{t(TASK3.orderBanner)}</p>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_360px] lg:items-start lg:gap-8">
        <div className="space-y-12">
          <NameField />
          <DiagnosticPhase />
          <hr className="border-line" />
          <BuilderPhase />
        </div>

        <div className="mt-8 lg:mt-0">
          <BoardMemoPanel />
        </div>
      </div>

      <ExportBar />
    </section>
  );
}
