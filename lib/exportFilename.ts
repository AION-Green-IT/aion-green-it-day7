/**
 * Every export on this page goes through `window.print()` (Save as PDF),
 * which has no filename parameter — browsers suggest `document.title` as
 * the default filename instead. This is the one place that builds that
 * title and swaps it in/out, so every export gets the same
 * "{taskNumber}-{name}-{taskLabel}" naming without duplicating the dance.
 * The number is just the block's own place in the day (1, 2, 3) — never a
 * separate field to fill in.
 */
const slugify = (v: string) =>
  v.trim().toLowerCase().replace(/\s+/g, "-").replace(/[\\/:*?"<>|]+/g, "-");

/**
 * Filename pattern requested by the class: `<number>.<name>-day4-materi<number>`
 * e.g. `1.muchson-day4-materi1`. The number is the level's place in the day.
 */
export function exportFilename(name: string, taskNumber: number): string {
  const who = slugify(name) || "learner";
  return `${taskNumber}.${who}-day4-materi${taskNumber}`;
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
