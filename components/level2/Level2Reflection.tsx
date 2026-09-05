"use client";

import { TASK2 } from "@/lib/level2";
import { useProgress } from "@/lib/store";
import { useLevel2 } from "./useLevel2";
import { Lock } from "@/components/icons/LineIcons";

/**
 * Section 3.4 — judged reflection. Unlocked once all three panels have been
 * opened and every readiness slider has been set.
 */
export function Level2Reflection() {
  const { reflectionUnlocked } = useLevel2();

  if (!reflectionUnlocked) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-dashed border-line bg-mist/50 p-5 text-ash">
        <Lock className="h-5 w-5 shrink-0" />
        <p className="text-body">{TASK2.reflection.lockedLabel}</p>
      </div>
    );
  }

  return (
    <div className="reveal-in space-y-5">
      <Field
        noteKey={TASK2.reflection.fieldA.key}
        label={TASK2.reflection.fieldA.label}
        hint={TASK2.reflection.fieldA.hint}
        placeholder={TASK2.reflection.fieldA.placeholder}
        rows={4}
      />
      <Field
        noteKey={TASK2.reflection.fieldB.key}
        label={TASK2.reflection.fieldB.label}
        hint={TASK2.reflection.fieldB.hint}
        placeholder={TASK2.reflection.fieldB.placeholder}
        rows={4}
      />
    </div>
  );
}

/**
 * `hint` is the "how to answer" instruction — kept visible as a caption under
 * the label the whole time, instead of living in the placeholder where it
 * disappears the moment the learner starts typing.
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
