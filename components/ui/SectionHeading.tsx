"use client";

import clsx from "clsx";
import { useT } from "@/lib/i18n";

/** Consistent block header: an accent kicker, a title, and an intro line. */
export function SectionHeading({
  kicker,
  title,
  intro,
  className,
}: {
  kicker: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  const t = useT();
  return (
    <div className={clsx("max-w-prose", className)}>
      <p className="mb-2 text-micro font-semibold uppercase tracking-wide text-accent">
        {t(kicker)}
      </p>
      <h2 className="text-h2 text-ink">{t(title)}</h2>
      {intro ? <p className="mt-3 text-body text-ash">{t(intro)}</p> : null}
    </div>
  );
}
