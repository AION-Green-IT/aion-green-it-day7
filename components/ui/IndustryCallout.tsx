import { Info } from "@/components/icons/LineIcons";

export function IndustryCallout({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-accent/25 bg-accentSoft p-4">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <div>
        <p className="text-micro font-semibold uppercase tracking-wide text-accent">{label}</p>
        <p className="mt-1 text-caption text-ink">{text}</p>
      </div>
    </div>
  );
}
