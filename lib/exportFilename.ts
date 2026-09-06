/**
 * Every export on this page goes through `window.print()` (Save as PDF),
 * which has no filename parameter — browsers suggest `document.title` as
 * the default filename instead. This is the one place that builds that
 * title and swaps it in/out, so every export gets the same
 * "{day}-{name}-day{day}-{suffix}" naming without duplicating the dance.
 */
const slugify = (v: string) =>
  v.trim().toLowerCase().replace(/\s+/g, "-").replace(/[\\/:*?"<>|]+/g, "-");

const DAY_NUMBER = 6;

/**
 * Filename pattern requested by the class: `<day>-<name>-day<day>-<suffix>`
 * e.g. `6-muchson-day6-task1` or `6-muchson-day6-audit-mapping`. A numeric
 * `taskNumber` becomes `task<n>` (routes 2/3's convention); a string is used
 * as the suffix as-is (Route 1's deliverable-named exports).
 */
export function exportFilename(name: string, taskNumberOrSuffix: number | string): string {
  const who = slugify(name) || "learner";
  const suffix = typeof taskNumberOrSuffix === "number" ? `task${taskNumberOrSuffix}` : taskNumberOrSuffix;
  return `${DAY_NUMBER}-${who}-day${DAY_NUMBER}-${suffix}`;
}

/** Sets document.title to the export filename, prints, then restores it once the print dialog closes. */
export function printAsFile(filename: string) {
  const original = document.title;
  document.title = filename;
  const restore = () => {
    document.title = original;
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);
  setTimeout(() => window.print(), 50);
}
