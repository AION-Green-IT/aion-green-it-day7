import { Icon } from "@/components/icons/LineIcons";
import { Reveal } from "@/components/ui/Reveal";
import { IndustryCallout } from "./IndustryCallout";
import { RichText } from "./RichText";
import { materialAnchorId } from "@/lib/materialAnchor";
import type { IconKey } from "@/lib/routes";

export type MaterialBlockContent = {
  id: string;
  icon: IconKey;
  kicker: string;
  title: string;
  definition: string;
  insight: string;
  takeaway: string;
  /** Decision rules phrased the way the task will need them — prose explains, rules tell you how to answer. */
  reasoning: string[];
  callout: { label: string; text: string };
};

/** One material block: header, deep prose, the decision rules, a visualizer slot, and a callout. */
export function MaterialBlock({
  block,
  children,
}: {
  block: MaterialBlockContent;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" id={materialAnchorId(block.id)} className="scroll-mt-24 space-y-5">
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
          <RichText text={block.definition} />
        </p>
        <p>
          <span className="font-semibold text-ink">Insight. </span>
          <RichText text={block.insight} />
        </p>
        <p>
          <span className="font-semibold text-ink">Practical takeaway. </span>
          <RichText text={block.takeaway} />
        </p>
      </div>

      <div className="rounded-xl border border-line bg-canvas p-4">
        <p className="text-micro font-semibold uppercase tracking-wide text-ash">
          How to decide when this comes up in the task
        </p>
        <ul className="mt-2 space-y-1.5">
          {block.reasoning.map((rule, i) => (
            <li key={i} className="flex gap-2 text-caption text-ink">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span><RichText text={rule} /></span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-5">{children}</div>

      <IndustryCallout label={block.callout.label} text={block.callout.text} />
    </Reveal>
  );
}
