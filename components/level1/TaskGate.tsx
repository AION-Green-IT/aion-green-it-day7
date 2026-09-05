"use client";

import clsx from "clsx";
import { useLevel1 } from "@/lib/level1";

/**
 * Keeps the whole task section visually locked — reduced opacity, no
 * interaction — until every study card has been opened at least once.
 */
export function TaskGate({ children }: { children: React.ReactNode }) {
  const { allRead, hydrated } = useLevel1();
  const locked = hydrated && !allRead;

  return (
    <div
      aria-disabled={locked}
      className={clsx(
        "transition-opacity duration-300",
        locked && "pointer-events-none select-none opacity-50",
      )}
    >
      {children}
    </div>
  );
}
