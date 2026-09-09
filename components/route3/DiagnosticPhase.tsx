import { TASK3, materialRefs } from "@/lib/route3";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { AeroPulseBrief } from "./CaseBrief";
import { PerspectiveScan } from "./PerspectiveScan";
import { LeverSelection } from "./LeverSelection";

const { phase1 } = TASK3;

export function DiagnosticPhase() {
  return (
    <div className="space-y-6">
      <h3 className="text-h3 text-ink">{phase1.heading}</h3>
      <AeroPulseBrief />

      <div>
        <h4 className="text-caption font-semibold text-ink">{phase1.scanHeading}</h4>
        <p className="mt-1 text-micro text-ash">{phase1.scanInstructions}</p>
        <MaterialRefs refs={materialRefs(phase1.scanMaterial)} />
        <div className="mt-3">
          <PerspectiveScan />
        </div>
      </div>

      <LeverSelection />
    </div>
  );
}
