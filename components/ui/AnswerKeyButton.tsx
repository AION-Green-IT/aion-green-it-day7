"use client";

import { useState } from "react";
import clsx from "clsx";
import { MENTOR_PASSCODE } from "@/lib/mentorPasscode";

/**
 * Mentor-only tool: generates and downloads a full answer key — every
 * question's correct choice plus why each other option was ruled out — so a
 * mentor can explain answers without re-deriving the reasoning live. Same
 * convenience gate as MentorFillButton, same passcode, separate action.
 */
export function AnswerKeyButton({ onGenerate }: { onGenerate: () => void }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const submit = () => {
    if (code === MENTOR_PASSCODE) {
      onGenerate();
      setOpen(false);
      setCode("");
      setError(false);
      setDone(true);
      window.setTimeout(() => setDone(false), 2500);
    } else {
      setError(true);
    }
  };

  return (
    <div className="mb-6 flex justify-end">
      {done && <p className="reveal-in mr-3 self-center text-micro font-semibold text-accent">Answer key downloaded.</p>}
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full border border-dashed border-line px-3 py-1 text-micro font-semibold text-ash transition-colors duration-150 hover:border-ash hover:text-ink"
        >
          Mentor: generate answer key
        </button>
      ) : (
        <div className="flex items-center gap-2 rounded-full border border-line bg-paper px-2 py-1 shadow-sm">
          <input
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder="Passcode"
            autoFocus
            className={clsx(
              "w-28 rounded-full border bg-paper px-2 py-0.5 text-micro text-ink",
              error ? "border-danger" : "border-line",
            )}
          />
          <button type="button" onClick={submit} className="text-micro font-semibold text-accent">
            Go
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setCode("");
              setError(false);
            }}
            aria-label="Cancel"
            className="text-micro text-ash hover:text-ink"
          >
            ×
          </button>
        </div>
      )}
      {error && <p className="ml-2 self-center text-micro text-danger">Wrong passcode.</p>}
    </div>
  );
}
