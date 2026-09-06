/**
 * Route 1's export is a real file download (JSON + HTML), not the
 * window.print() flow the other routes use — deliberately, per this route's
 * "raw data for grading, formatted report for reading" requirement. No
 * library involved: a Blob, an object URL, and a throwaway anchor click.
 */
export function downloadTextFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const slugify = (v: string) =>
  v.trim().toLowerCase().replace(/\s+/g, "-").replace(/[\\/:*?"<>|]+/g, "-");

/** `{level}-{name}-day7-l{level}task{taskNumber}` e.g. `1-muchson-day7-l1task1`. */
export function day7ExportFilename(name: string, level: number, taskNumber: number): string {
  const who = slugify(name) || "learner";
  return `${level}-${who}-day7-l${level}task${taskNumber}`;
}
