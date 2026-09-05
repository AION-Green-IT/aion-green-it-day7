import { MATERIAL } from "@/lib/route1";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaterialBlock } from "./MaterialBlock";
import { TcoRevealBar } from "./TcoRevealBar";
import { ManufacturingUsePhaseStack } from "./ManufacturingUsePhaseStack";
import { RepairVsRecycleTimeline } from "./RepairVsRecycleTimeline";
import { CertificationTrustChecker } from "./CertificationTrustChecker";
import { RLadderSidebar } from "./RLadderSidebar";

export function Material() {
  const [tco, carbon, rladder, regulatory] = MATERIAL;

  return (
    <div className="space-y-14">
      <SectionHeading
        kicker="Material"
        title="Four frameworks before you touch the case"
        intro="About an hour of reading and exploring. Each block pairs an official framework with a live comparison you can manipulate."
      />

      <MaterialBlock block={tco}>
        <TcoRevealBar />
      </MaterialBlock>

      <MaterialBlock block={carbon}>
        <ManufacturingUsePhaseStack />
      </MaterialBlock>

      <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
        <MaterialBlock block={rladder}>
          <RepairVsRecycleTimeline />
        </MaterialBlock>
        <RLadderSidebar />
      </div>

      <MaterialBlock block={regulatory}>
        <CertificationTrustChecker />
      </MaterialBlock>
    </div>
  );
}
