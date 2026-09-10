"use client";

import clsx from "clsx";
import { LOCALES, useLocale, useSetLocale } from "@/lib/i18n";

/** EN | DE segmented control. English is the default; the choice persists. */
export function LanguageSwitcher() {
  const locale = useLocale();
  const setLocale = useSetLocale();

  return (
    <div
      role="group"
      aria-label="Language / Sprache"
      className="flex shrink-0 items-center gap-0.5 rounded-full bg-paper/10 p-0.5"
    >
      {LOCALES.map((l) => {
        const active = locale === l.id;
        return (
          <button
            key={l.id}
            type="button"
            onClick={() => setLocale(l.id)}
            aria-pressed={active}
            title={l.name}
            className={clsx(
              "rounded-full px-2.5 py-1 text-micro font-semibold transition-colors duration-150",
              active ? "bg-paper text-slate" : "text-paper/70 hover:text-paper",
            )}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
