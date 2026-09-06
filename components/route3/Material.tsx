import { MATERIAL } from "@/lib/route3";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaterialBlock } from "@/components/ui/MaterialBlock";
import { GovernanceMaturityLadder } from "./GovernanceMaturityLadder";
import { BindingCriteriaSimulator } from "./BindingCriteriaSimulator";
import { RaciGrid } from "./RaciGrid";
import { HorizonSorterPreview } from "./HorizonSorterPreview";

export function Material() {
  const [iso20400, bindingCriteria, raci, horizon] = MATERIAL;

  return (
    <div className="space-y-14">
      <SectionHeading
        kicker="Material"
        title="Four frameworks before you touch the case"
        intro="About an hour of reading and exploring. Each block pairs an official framework with a live comparison you can manipulate."
      />

      <MaterialBlock block={iso20400}>
        <GovernanceMaturityLadder />
      </MaterialBlock>

      <MaterialBlock block={bindingCriteria}>
        <BindingCriteriaSimulator />
      </MaterialBlock>

      <MaterialBlock block={raci}>
        <RaciGrid mode="resolve" />
      </MaterialBlock>

      <MaterialBlock block={horizon}>
        <HorizonSorterPreview />
      </MaterialBlock>
    </div>
  );
}
