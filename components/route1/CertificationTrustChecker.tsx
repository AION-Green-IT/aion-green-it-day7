"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { useProgress } from "@/lib/store";
import { R1, CERTIFICATIONS } from "@/lib/route1";
import { Check, Info } from "@/components/icons/LineIcons";

/** Impact Delta Visualizer — Block 4. Click a card to see who actually audits the claim. */
export function CertificationTrustChecker() {
  const markSeen = useProgress((s) => s.markSeen);
  const touchedRef = useRef(false);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const flip = (id: string) => {
    if (!touchedRef.current) {
      touchedRef.current = true;
      markSeen(R1.material, "regulatory");
    }
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      <p className="text-caption font-semibold text-ash">Click a card to check who actually verifies it.</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((c) => {
          const isFlipped = flipped.has(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => flip(c.id)}
              aria-pressed={isFlipped}
              aria-label={`${c.name}, ${isFlipped ? "showing audit detail" : "tap for audit detail"}`}
              className="flip-card h-44 text-left"
            >
              <div className={clsx("flip-card-inner h-full w-full", isFlipped && "is-flipped")}>
                <div
                  className={clsx(
                    "flip-card-face flex h-full w-full flex-col justify-between rounded-xl border p-4",
                    c.verified ? "border-accent/40 bg-accentSoft" : "border-line bg-mist",
                  )}
                >
                  <span
                    className={clsx(
                      "inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-micro font-semibold uppercase tracking-wide",
                      c.verified ? "bg-accent text-paper" : "border border-ash text-ash",
                    )}
                  >
                    {c.verified ? <Check className="h-3 w-3" /> : <Info className="h-3 w-3" />}
                    {c.verified ? "Verified" : "Unverified"}
                  </span>
                  <p className="text-h3 text-ink">{c.name}</p>
                  <p className="text-micro text-ash">Tap for audit detail</p>
                </div>
                <div className="flip-card-face flip-card-face-back flex h-full w-full flex-col gap-1 rounded-xl border border-line bg-paper p-4">
                  <p className="text-micro font-semibold uppercase tracking-wide text-ash">Audited by</p>
                  <p className="text-caption text-ink">{c.auditor}</p>
                  <p className="mt-1 text-micro font-semibold uppercase tracking-wide text-ash">Criteria checked</p>
                  <p className="text-caption text-ink">{c.criteria}</p>
                  <p className="mt-auto text-micro text-ash">{c.version}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
