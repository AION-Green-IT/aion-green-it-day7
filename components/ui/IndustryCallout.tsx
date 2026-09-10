"use client";

import { Info } from "@/components/icons/LineIcons";
import { RichText } from "./RichText";
import { useT } from "@/lib/i18n";

export function IndustryCallout({ label, text }: { label: string; text: string }) {
  const t = useT();
  return (
    <div className="flex gap-3 rounded-xl border border-accent/25 bg-accentSoft p-4">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <div>
        <p className="text-micro font-semibold uppercase tracking-wide text-accent">{t(label)}</p>
        <p className="mt-1 text-caption text-ink"><RichText text={t(text)} /></p>
      </div>
    </div>
  );
}
