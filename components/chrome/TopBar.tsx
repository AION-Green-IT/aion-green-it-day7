"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { AionLogo } from "./Icons";
import { CASE, LEVELS } from "@/lib/module3";
import { Lock } from "@/components/icons/LineIcons";

/**
 * Persistent top bar across every route. Shows the module and a compact rail
 * of the three levels: the active one is highlighted, unavailable ones show a
 * lock. The rail is the module's spine — the three levels live on separate
 * routes and this is how the learner moves between the ones that are open.
 */
export function TopBar() {
  const pathname = usePathname() ?? "";

  return (
    <header className="sticky top-0 z-30 bg-slate text-paper print:hidden">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <AionLogo className="h-6 w-20 shrink-0 text-paper" />
            <span className="hidden min-w-0 truncate text-caption text-paper/70 sm:inline md:text-body">
              {CASE.module} — {CASE.moduleTitle}
            </span>
          </Link>

          <nav aria-label="Module levels" className="ml-auto">
            <ol className="flex items-center gap-1.5">
              {LEVELS.map((lv) => {
                const active = pathname.includes(`/${lv.slug}`);
                const cls = clsx(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-caption font-semibold transition-colors duration-200",
                  active
                    ? "bg-accent text-paper"
                    : lv.available
                      ? "text-paper/80 hover:bg-paper/10 hover:text-paper"
                      : "cursor-not-allowed text-paper/35",
                );
                const inner = (
                  <>
                    <span className="tabular-nums">{lv.n}</span>
                    <span className="hidden md:inline">
                      {lv.tag.replace(/^Level \d+ — /, "")}
                    </span>
                    {!lv.available && <Lock className="h-3.5 w-3.5" />}
                  </>
                );
                return (
                  <li key={lv.slug}>
                    {lv.available ? (
                      <Link href={lv.href} className={cls} aria-current={active ? "page" : undefined}>
                        {inner}
                      </Link>
                    ) : (
                      <span className={cls} aria-disabled="true" title="Not available yet">
                        {inner}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </header>
  );
}
