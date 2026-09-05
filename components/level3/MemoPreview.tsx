"use client";

import { TASK3 } from "@/lib/level3";
import { MemoDoc } from "./MemoDoc";
import { useMemoData } from "./useMemoData";

/** The live-assembling memo, styled as memo paper. Right side of the split. */
export function MemoPreview() {
  const data = useMemoData();
  return (
    <div className="rounded-2xl border border-line bg-paper shadow-sm">
      <div className="border-b border-line px-5 py-3">
        <p className="text-micro font-semibold uppercase tracking-wide text-ash">{TASK3.memoTitle}</p>
      </div>
      <div className="max-h-[75vh] overflow-y-auto p-5 sm:p-6">
        <MemoDoc data={data} live />
      </div>
    </div>
  );
}
