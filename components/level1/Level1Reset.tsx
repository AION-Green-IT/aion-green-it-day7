"use client";

import { useState } from "react";
import { useProgress } from "@/lib/store";
import { L1, useLevel1 } from "@/lib/level1";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

/**
 * Clears Level 1's work only — opened cards, the sort, and both reflection
 * fields — while leaving the learner name (shared across the module) in place.
 */
export function Level1Reset() {
  const resetSection = useProgress((s) => s.resetSection);
  const { openedCount, sortedCount } = useLevel1();
  const [open, setOpen] = useState(false);

  const touched = openedCount > 0 || sortedCount > 0;
  if (!touched) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-caption font-semibold text-ash underline-offset-2 hover:text-ink hover:underline"
      >
        Start Level 1 over
      </button>
      <ConfirmDialog
        open={open}
        title="Start Level 1 over?"
        body="This clears the material you have opened, the signal sort, and both reflection fields. Your name is kept. This cannot be undone."
        confirmLabel="Clear Level 1"
        onConfirm={() => {
          resetSection(L1.materialKey, [L1.sortPrefix, "l1:"]);
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
