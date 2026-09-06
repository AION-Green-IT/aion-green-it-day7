import { Icon } from "@/components/icons/LineIcons";
import { Reveal } from "@/components/ui/Reveal";
import { IndustryCallout } from "./IndustryCallout";
import type { IconKey } from "@/lib/routes";

export type MaterialBlockContent = {
  icon: IconKey;
  kicker: string;
  title: string;
  definition: string;
  insight: string;
  takeaway: string;
  callout: { label: string; text: string };
};

/** One material block: header, deep prose (definition/insight/takeaway), a visualizer slot, and a callout. */
export function MaterialBlock({
  block,
  children,
}: {
  block: MaterialBlockContent;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="space-y-5">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accentSoft text-accent">
          <Icon name={block.icon} className="h-5 w-5" />
        </span>
        <div>
          <p className="text-micro font-semibold uppercase tracking-wide text-accent">
            {block.kicker}
          </p>
          <h2 className="text-h2 text-ink">{block.title}</h2>
        </div>
      </div>

      <div className="max-w-prose space-y-3 text-body text-ash">
        <p>
          <span className="font-semibold text-ink">Definition. </span>
          {block.definition}
        </p>
        <p>
          <span className="font-semibold text-ink">Insight. </span>
          {block.insight}
        </p>
        <p>
          <span className="font-semibold text-ink">Practical takeaway. </span>
          {block.takeaway}
        </p>
      </div>

      <div className="card p-5">{children}</div>

      <IndustryCallout label={block.callout.label} text={block.callout.text} />
    </Reveal>
  );
}
