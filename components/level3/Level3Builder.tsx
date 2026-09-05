"use client";

import { TASK3 } from "@/lib/level3";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BudgetAllocator } from "./BudgetAllocator";
import { MemoFields } from "./MemoFields";
import { SequencingWidget } from "./SequencingWidget";
import { ClosingField } from "./ClosingField";
import { PortfolioExport } from "./PortfolioExport";
import { MemoPreview } from "./MemoPreview";
import { ArrowRight } from "@/components/icons/LineIcons";

/**
 * The split-screen: builder controls on the left, the live memo on the right
 * (sticky on desktop). On narrow screens they stack builder-above / memo-below,
 * with a sticky "Preview memo" button that jumps to the assembled memo.
 */
export function Level3Builder() {
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(340px,42%)]">
        {/* LEFT — builder */}
        <div className="min-w-0 space-y-10">
          <BudgetAllocator />

          <div>
            <SectionHeading kicker={TASK3.fieldsTitle} title="Fill each memo component" className="mb-4" />
            <MemoFields />
          </div>

          <div>
            <SectionHeading kicker={TASK3.seqTitle} title="Sequence the rollout" intro={TASK3.seqIntro} className="mb-4" />
            <SequencingWidget />
          </div>

          <div>
            <SectionHeading kicker={TASK3.closingTitle} title="Name what you postpone" className="mb-4" />
            <ClosingField />
          </div>

          <PortfolioExport />
        </div>

        {/* RIGHT — live memo */}
        <div id="memo" className="min-w-0 scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
          <MemoPreview />
        </div>
      </div>

      {/* Mobile jump-to-memo */}
      <a
        href="#memo"
        className="btn-accent fixed bottom-4 right-4 z-40 inline-flex items-center gap-1.5 shadow-lg lg:hidden"
      >
        {TASK3.previewToggle} <ArrowRight className="h-4 w-4" />
      </a>
    </>
  );
}
