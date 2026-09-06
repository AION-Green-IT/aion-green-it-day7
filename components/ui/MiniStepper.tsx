import clsx from "clsx";
import { Check } from "@/components/icons/LineIcons";

/** Task-local progress: which steps are done, and which is next. Generic across routes. */
export function MiniStepper({ steps }: { steps: { label: string; done: boolean }[] }) {
  const firstIncomplete = steps.findIndex((s) => !s.done);
  const current = firstIncomplete === -1 ? steps.length : firstIncomplete + 1;

  return (
    <ol className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-paper p-2">
      {steps.map((s, i) => {
        const n = i + 1;
        const active = n === current;
        return (
          <li
            key={s.label}
            className={clsx(
              "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-caption font-semibold transition-colors duration-200",
              active ? "bg-accent text-paper" : s.done ? "text-accent" : "text-ash",
            )}
          >
            {s.done ? <Check className="h-3.5 w-3.5" /> : <span className="tabular-nums">{n}</span>}
            <span className="hidden sm:inline">{s.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
