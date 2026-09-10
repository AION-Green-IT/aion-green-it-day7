"use client";

import { setActiveLocale } from "@/lib/i18n/core";
import { useLocale } from "@/lib/i18n";

/**
 * Owns the rendering locale for everything below it. Sets the module-level
 * locale during render (so `t()` is correct for the children rendered in this
 * same pass) and keys the subtree on it, so switching language remounts the
 * page in the new language. English until hydration, which is what keeps the
 * statically exported markup and the first client paint identical.
 */
export function LocaleBoundary({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  setActiveLocale(locale);
  return (
    <div key={locale} className="contents">
      {children}
    </div>
  );
}
