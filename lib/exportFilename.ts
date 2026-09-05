/**
 * Every export on this page goes through `window.print()` (Save as PDF),
 * which has no filename parameter — browsers suggest `document.title` as
 * the default filename instead. This is the one place that builds that
 * title and swaps it in/out, so every export gets the same
 * "{day}-{name}-day{day}-task{n}" naming without duplicating the dance.
 */
const slugify = (v: string) =>
  v.trim().toLowerCase().replace(/\s+/g, "-").replace(/[\\/:*?"<>|]+/g, "-");

const DAY_NUMBER = 5;

/**
 * Filename pattern requested by the class: `<day>-<name>-day<day>-task<n>`
 * e.g. `5-muchson-day5-task1`. `taskNumber` is the route's place in the day.
 */
export function exportFilename(name: string, taskNumber: number): string {
  const who = slugify(name) || "learner";
  return `${DAY_NUMBER}-${who}-day${DAY_NUMBER}-task${taskNumber}`;
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
