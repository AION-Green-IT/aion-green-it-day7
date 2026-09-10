"use client";

import { useProgress, useHydrated, type Locale } from "@/lib/store";
import { t } from "./core";

export { t, tAll, translateTo, setActiveLocale, getActiveLocale, LOCALES } from "./core";
export type { Locale };

/** Hook form, for components that want to re-render on their own when the language changes. */
export function useT() {
  useLocale();
  return t;
}

/** The locale actually in effect for rendering (English until hydrated). */
export function useLocale(): Locale {
  const hydrated = useHydrated();
  const locale = useProgress((s) => s.locale);
  return hydrated ? locale : "en";
}

export function useSetLocale() {
  return useProgress((s) => s.setLocale);
}
