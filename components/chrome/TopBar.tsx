"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { AionLogo } from "./Icons";
import { CASE, ROUTES } from "@/lib/routes";
import { Lock } from "@/components/icons/LineIcons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useT } from "@/lib/i18n";

/**
 * Persistent top bar across every page. Shows the day and a compact rail of
 * the three routes: the active one is highlighted, routes not yet built show
 * a lock (every route is otherwise always reachable — recommended order is a
 * soft, in-page note, not a nav block). The rail is the day's spine — the
 * three routes live on separate pages and this is how the learner moves
 * between them.
 */
export function TopBar() {
  const pathname = usePathname() ?? "";
  const t = useT();

  return (
    <header className="sticky top-0 z-30 bg-slate text-paper print:hidden">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <AionLogo className="h-6 w-20 shrink-0 text-paper" />
            <span className="hidden min-w-0 truncate text-caption text-paper/70 sm:inline md:text-body">
              {t(CASE.module)} — {t(CASE.moduleTitle)}
            </span>
          </Link>

          <nav aria-label="Routes" className="ml-auto">
            <ol className="flex items-center gap-1.5">
              {ROUTES.map((rt) => {
                const active = pathname.includes(`/${rt.slug}`);
                const reachable = rt.available;
                const cls = clsx(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-caption font-semibold transition-colors duration-200",
                  active
                    ? "bg-accent text-paper"
                    : reachable
                      ? "text-paper/80 hover:bg-paper/10 hover:text-paper"
                      : "cursor-not-allowed text-paper/35",
                );
                const inner = (
                  <>
                    <span className="tabular-nums">{rt.n}</span>
                    <span className="hidden md:inline">
                      {t(rt.tag).replace(/^Route \d+ — /, "")}
                    </span>
                    {!reachable && <Lock className="h-3.5 w-3.5" />}
                  </>
                );
                return (
                  <li key={rt.slug}>
                    {reachable ? (
                      <Link href={rt.href} className={cls} aria-current={active ? "page" : undefined}>
                        {inner}
                      </Link>
                    ) : (
                      <span className={cls} aria-disabled="true" title={t("Not available yet")}>
                        {inner}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
