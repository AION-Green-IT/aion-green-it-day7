"use client";

import { useState } from "react";
import clsx from "clsx";
import type { Bucket } from "@/lib/module3";
import { BucketDiagram } from "@/components/visuals/BucketDiagrams";
import { Help, Close } from "@/components/icons/LineIcons";

/**
 * The "?" affordance on a bucket header: what this bucket means, in one line,
 * a small diagram, and a few example items — so a learner can decide where a
 * signal belongs without guessing from the label alone. Same click-to-toggle
 * pattern as the readiness-scorecard anchor tooltips in Level 2.
 */
export function BucketInfo({ bucket }: { bucket: Bucket }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={`What belongs in ${bucket.label}`}
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={clsx(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-150",
          open ? "border-accent bg-accentSoft text-accent" : "border-line text-ash hover:border-ash",
        )}
      >
        <Help className="h-3.5 w-3.5" />
      </button>

      {open ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="reveal-in absolute right-0 top-8 z-20 w-72 rounded-xl border border-line bg-paper p-3 text-left shadow-lg sm:w-80"
        >
          <div className="mb-2 flex items-start justify-between gap-2">
            <p className="text-caption font-semibold text-ink">{bucket.label}</p>
            <button
              type="button"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="-mr-1 -mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-ash hover:text-ink"
            >
              <Close className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mb-2 rounded-lg border border-line bg-mist/40 p-2 text-accent">
            <BucketDiagram id={bucket.id} className="w-full" />
          </div>

          <p className="text-caption text-ash">{bucket.blurb}</p>

          <p className="mb-1 mt-2 text-micro font-semibold uppercase tracking-wide text-ash">
            Looks like
          </p>
          <ul className="space-y-0.5">
            {bucket.examples.map((ex, i) => (
              <li key={i} className="flex gap-1.5 text-caption text-ash">
                <span className="text-accent">•</span>
                <span>{ex}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
