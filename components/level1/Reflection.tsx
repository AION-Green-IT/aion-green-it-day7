"use client";

import { TASK1 } from "@/lib/module3";
import { useProgress } from "@/lib/store";
import { useLevel1 } from "@/lib/level1";
import { Lock } from "@/components/icons/LineIcons";

/**
 * Section 3.2 — the judged written reflection. Locked until every signal has
 * been sorted; the two fields feed straight into the exported Diagnostic Note.
 */
export function Reflection() {
  const { allSorted } = useLevel1();

  if (!allSorted) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-dashed border-line bg-mist/50 p-5 text-ash">
        <Lock className="h-5 w-5 shrink-0" />
        <p className="text-body">{TASK1.reflection.lockedLabel}</p>
      </div>
    );
  }

  return (
    <div className="reveal-in space-y-5">
      <div className="max-w-prose">
        <p className="text-micro font-semibold uppercase tracking-wide text-accent">
          {TASK1.reflection.kicker}
        </p>
        <p className="mt-1 text-body text-ash">{TASK1.reflection.intro}</p>
      </div>

      <Field
        noteKey={TASK1.reflection.fieldA.key}
        label={TASK1.reflection.fieldA.label}
        hint={TASK1.reflection.fieldA.hint}
        placeholder={TASK1.reflection.fieldA.placeholder}
        rows={4}
      />
      <Field
        noteKey={TASK1.reflection.fieldB.key}
        label={TASK1.reflection.fieldB.label}
        hint={TASK1.reflection.fieldB.hint}
        placeholder={TASK1.reflection.fieldB.placeholder}
        rows={5}
      />
    </div>
  );
}

/**
 * `hint` is the "how to answer" instruction — it stays visible as a caption
 * under the label the whole time the learner is typing, instead of living in
 * the placeholder where it disappears the moment they start.
 */
function Field({
  noteKey,
  label,
  hint,
  placeholder,
  rows,
}: {
  noteKey: string;
  label: string;
  hint: string;
  placeholder: string;
  rows: number;
}) {
  const value = useProgress((s) => s.notes[noteKey] ?? "");
  const setNote = useProgress((s) => s.setNote);

  return (
    <label className="block">
      <span className="block text-body font-semibold text-ink">{label}</span>
      <span className="mb-1.5 mt-0.5 block text-caption text-ash">{hint}</span>
      <textarea
        value={value}
        onChange={(e) => setNote(noteKey, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-y rounded-xl border border-line bg-paper p-3 text-body text-ink placeholder:text-ash/60 focus:border-accent"
      />
    </label>
  );
}
