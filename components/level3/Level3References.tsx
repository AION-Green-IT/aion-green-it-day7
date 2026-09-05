"use client";

import { useState } from "react";
import clsx from "clsx";
import { BUCKETS } from "@/lib/module3";
import { STORY3 } from "@/lib/level3";
import { OPTION_A, OPTION_B, OPTION_C, TASK2, eur } from "@/lib/level2";
import { useLevel1Note } from "@/lib/level1";
import { useLevel2 } from "@/components/level2/useLevel2";
import { BucketBarChart } from "@/components/visuals/BucketBarChart";
import { ChevronDown } from "@/components/icons/LineIcons";
import { useProgress } from "@/lib/store";

/** Two collapsed, read-only cards showing the learner's own Level 1 and Level 2 work. */
export function Level3References() {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      <RefCard title={STORY3.refL1Title} hint={STORY3.refL1Hint}>
        <DiagnosticRef />
      </RefCard>
      <RefCard title={STORY3.refL2Title} hint={STORY3.refL2Hint}>
        <CalculationRef />
      </RefCard>
    </div>
  );
}

function RefCard({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex w-full items-center gap-3 p-4 text-left">
        <span className="flex-1">
          <span className="text-h3 text-ink">{title}</span>
          <span className="mt-0.5 block text-caption text-ash">{hint}</span>
        </span>
        <ChevronDown className={clsx("h-5 w-5 shrink-0 text-ash transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open ? <div className="reveal-in border-t border-line p-4">{children}</div> : null}
    </div>
  );
}

function DiagnosticRef() {
  const note = useLevel1Note();
  if (!note.hasNote) return <p className="text-body text-ash">No saved Diagnostic Note.</p>;
  return (
    <div className="space-y-3">
      <BucketBarChart buckets={BUCKETS} counts={note.counts} />
      <div>
        <p className="text-caption font-semibold text-ink">Three biggest strategic gaps</p>
        <p className="mt-1 whitespace-pre-wrap text-caption text-ash">{note.gaps}</p>
      </div>
    </div>
  );
}

function CalculationRef() {
  const l2 = useLevel2();
  const priority = useProgress((s) => s.notes[TASK2.reflection.fieldA.key] ?? "");
  const notFix = useProgress((s) => s.notes[TASK2.reflection.fieldB.key] ?? "");
  const r = l2.results;
  const rows = [
    { o: "A", n: OPTION_A.key, b: eur(r.a.budget) },
    { o: "B", n: OPTION_B.key, b: eur(r.b.budget) },
    { o: "C", n: OPTION_C.key, b: eur(r.c.budget) },
  ];
  return (
    <div className="space-y-3">
      <table className="w-full border-collapse text-caption">
        <tbody>
          {rows.map((row) => (
            <tr key={row.o} className="border-b border-line last:border-0">
              <td className="py-1.5"><span className="font-semibold text-ink">{row.o}</span> <span className="text-ash">{row.n}</span></td>
              <td className="py-1.5 text-right font-semibold tabular-nums text-ink">{row.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p className="text-caption font-semibold text-ink">Chosen priority</p>
        <p className="mt-1 whitespace-pre-wrap text-caption text-ash">{priority}</p>
      </div>
      <div>
        <p className="text-caption font-semibold text-ink">What it doesn't fix</p>
        <p className="mt-1 whitespace-pre-wrap text-caption text-ash">{notFix}</p>
      </div>
    </div>
  );
}
