import { MATERIAL } from "@/lib/route1";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaterialBlock } from "@/components/ui/MaterialBlock";
import { EnergyFlowSvg } from "./EnergyFlowSvg";
import { PueCalculator } from "./PueCalculator";
import { PathwaysComparison } from "./PathwaysComparison";
import { AccountingRealitySvg } from "./AccountingRealitySvg";
import { PueGaugeSvg } from "./PueGaugeSvg";
import { BlindSpotsGrid } from "./BlindSpotsGrid";

const [anatomy, pathways, accounting, benchmarks, blindspots] = MATERIAL;

export function Material() {
  return (
    <div className="space-y-14">
      <SectionHeading
        kicker="Material"
        title="Five ideas before you touch the case"
        intro="About 60 minutes of reading and exploring. Each block pairs a framework with something you can click, hover, or calculate yourself."
      />

      <MaterialBlock block={anatomy}>
        <EnergyFlowSvg />
        <div className="mt-6 border-t border-line pt-5">
          <PueCalculator />
        </div>
      </MaterialBlock>

      <MaterialBlock block={pathways}>
        <PathwaysComparison />
      </MaterialBlock>

      <MaterialBlock block={accounting}>
        <AccountingRealitySvg />
      </MaterialBlock>

      <MaterialBlock block={benchmarks}>
        <PueGaugeSvg />
      </MaterialBlock>

      <MaterialBlock block={blindspots}>
        <BlindSpotsGrid />
      </MaterialBlock>
    </div>
  );
}
