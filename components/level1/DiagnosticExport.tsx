"use client";

import { useEffect, useState } from "react";
import { TASK1 } from "@/lib/module3";
import { useProgress, useHydrated } from "@/lib/store";
import { L1, useLevel1 } from "@/lib/level1";
import { exportFilename, printAsFile } from "@/lib/exportFilename";
import { DiagnosticDoc } from "./DiagnosticDoc";
import { useDocData } from "./useDocData";
import { Close, Lock } from "@/components/icons/LineIcons";

/**
 * Section 3.3 — the export control. A learner-name field plus a button that is
 * disabled until both reflection fields are written; opening it shows a live
 * one-page preview of the Diagnostic Note, which "Download as PDF" prints via
 * the browser's Save-as-PDF. The content is already persisted in the store,
 * so it survives the session and is available to Level 2.
 */
export function DiagnosticExport() {
  const hydrated = useHydrated();
  const { reflectionComplete } = useLevel1();
  const name = useProgress((s) => s.notes[L1.nameKey] ?? "");
  const setNote = useProgress((s) => s.setNote);
  const [open, setOpen] = useState(false);
  const data = useDocData();

  const canExport = hydrated && reflectionComplete;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const download = () => {
    printAsFile(exportFilename(name, 1));
  };

  return (
    <div className="card p-5">
      <h3 className="text-h3 text-ink">{TASK1.export.controlsTitle}</h3>
      <p className="mt-1 max-w-prose text-body text-ash">{TASK1.export.controlsIntro}</p>

      <label className="mt-4 block max-w-xs">
        <span className="mb-1 block text-caption font-semibold text-ink">
          {TASK1.export.nameLabel}
        </span>
        <input
          type="text"
          value={hydrated ? name : ""}
          onChange={(e) => setNote(L1.nameKey, e.target.value)}
          placeholder={TASK1.export.namePlaceholder}
          className="w-full rounded-xl border border-line bg-paper p-2.5 text-body text-ink placeholder:text-ash/60 focus:border-accent"
        />
      </label>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!canExport}
          onClick={() => setOpen(true)}
          className="btn-accent"
        >
          {TASK1.export.openLabel}
        </button>
        {!canExport ? (
          <span className="inline-flex items-center gap-1.5 text-caption text-ash">
            <Lock className="h-4 w-4" /> {TASK1.export.disabledHint}
          </span>
        ) : null}
      </div>

      {open ? (
        <ExportModal
          data={data}
          onClose={() => setOpen(false)}
          onDownload={download}
        />
      ) : null}
    </div>
  );
}

function ExportModal({
  data,
  onClose,
  onDownload,
}: {
  data: ReturnType<typeof useDocData>;
  onClose: () => void;
  onDownload: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 print:hidden"
      style={{ backgroundColor: "var(--backdrop)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={TASK1.export.docHeading}
        className="my-8 w-full max-w-3xl rounded-2xl bg-paper shadow-lg"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          <p className="text-h3 text-ink">Preview</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onDownload} className="btn-accent px-3 py-2 text-caption">
              {TASK1.export.downloadLabel}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={TASK1.export.closeLabel}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-ink hover:border-ash"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* The one-page document, on a paper card. */}
        <div className="max-h-[70vh] overflow-y-auto bg-mist/50 p-4 sm:p-6">
          <div className="mx-auto max-w-[720px] rounded-lg bg-paper p-6 shadow-sm sm:p-8">
            <DiagnosticDoc data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
