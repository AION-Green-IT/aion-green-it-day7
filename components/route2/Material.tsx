import { MATERIAL } from "@/lib/route2";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaterialBlock } from "@/components/ui/MaterialBlock";
import { KraljicQuadrantShift } from "./KraljicQuadrantShift";
import { HiddenCostIcebergDemo } from "./HiddenCostIceberg";
import { DependencyRiskMeter } from "./DependencyRiskMeter";
import { LiveWeightingPreview } from "./LiveWeightingPreview";

export function Material() {
  const [kraljic, hiddenCost, lockIn, weighting] = MATERIAL;

  return (
    <div className="space-y-14">
      <SectionHeading
        kicker="Material"
        title="Four frameworks before you touch the case"
        intro="About an hour of reading and exploring. Each block pairs an official framework with a live comparison you can manipulate."
      />

      <MaterialBlock block={kraljic}>
        <KraljicQuadrantShift />
      </MaterialBlock>

      <MaterialBlock block={hiddenCost}>
        <HiddenCostIcebergDemo />
      </MaterialBlock>

      <MaterialBlock block={lockIn}>
        <DependencyRiskMeter />
      </MaterialBlock>

      <MaterialBlock block={weighting}>
        <LiveWeightingPreview />
      </MaterialBlock>
    </div>
  );
}
