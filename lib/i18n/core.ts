import type { Locale } from "@/lib/store";
import { DE } from "./de";

export type { Locale };

export const LOCALES: { id: Locale; label: string; name: string }[] = [
  { id: "en", label: "EN", name: "English" },
  { id: "de", label: "DE", name: "Deutsch" },
];

/**
 * Translation is keyed by the English source string, so `lib/routeN.ts` stays
 * the single readable source of content and a missing German entry falls back
 * to English instead of showing a key. `DE` is the only place translations
 * live; `npm run i18n:coverage` reports what is still untranslated.
 *
 * Deliberately not a "use client" module: a client-only module's exports are
 * replaced by client references when a server component imports them, which
 * makes `t` uncallable during the static export. The hooks live next door in
 * index.ts; this file stays plain so anything can call it.
 */
export function translateTo(locale: Locale, en: string): string {
  if (locale === "en") return en;
  return DE[en] ?? en;
}

/**
 * The locale the tree is currently rendering in. A module value rather than a
 * per-call store read, so `t()` works anywhere — including export builders and
 * other non-React code — and so the first paint can be forced to English no
 * matter what localStorage holds, which is what keeps the statically exported
 * markup and the first client paint identical. `LocaleBoundary` owns it.
 */
let activeLocale: Locale = "en";

export function setActiveLocale(locale: Locale) {
  activeLocale = locale;
}

export function getActiveLocale(): Locale {
  return activeLocale;
}

/** Translate one English source string into the locale currently rendering. */
export function t(en: string): string {
  return translateTo(activeLocale, en);
}

/** Translate a list — material rules, scope bullets, constraint lists. */
export function tAll(items: readonly string[]): string[] {
  return items.map(t);
}
