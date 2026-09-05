import { BUCKETS, CASE, SIGNALS, TASK1, type Signal } from "@/lib/module3";
import { BucketBarChart } from "@/components/visuals/BucketBarChart";

export type DocData = {
  name: string;
  date: string;
  placements: Record<string, string>;
  counts: Record<string, number>;
  fieldA: string;
  fieldB: string;
};

const SIGNAL_BY_ID = Object.fromEntries(SIGNALS.map((s) => [s.id, s])) as Record<string, Signal>;

/**
 * The one-page Diagnostic Note. Rendered twice from the same markup: styled in
 * the on-screen preview modal, and again inside the hidden `.print-note` for
 * "Save as PDF". Purely presentational — all values arrive as props.
 */
export function DiagnosticDoc({ data }: { data: DocData }) {
  const { name, date, placements, counts, fieldA, fieldB } = data;

  return (
    <div className="text-ink">
      <p className="text-micro font-semibold uppercase tracking-wide text-ash">
        {TASK1.export.docWatermark}
      </p>
      <h1 className="mt-1 text-h1 text-ink">{TASK1.export.docHeading}</h1>
      <p className="text-h3 font-normal text-ash">{TASK1.export.docSubheading}</p>

      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-1 border-y border-line py-2 text-caption text-ash">
        <p>
          Company: <span className="font-semibold text-ink">{CASE.company}</span>
        </p>
        <p>
          Learner:{" "}
          <span className="font-semibold text-ink">{name || "—"}</span>
        </p>
        <p>
          Date: <span className="font-semibold text-ink">{date}</span>
        </p>
      </div>

      {/* Chart + the sort behind it */}
      <h2 className="mb-2 mt-6 text-h3 text-ink">{TASK1.export.docChartTitle}</h2>
      <BucketBarChart buckets={BUCKETS} counts={counts} />

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {BUCKETS.map((b) => {
          const items = SIGNALS.filter((s) => placements[s.id] === b.id);
          return (
            <div key={b.id} className="rounded-xl border border-line p-3">
              <p className="text-caption font-semibold text-ink">
                {b.label} · {items.length}
              </p>
              {items.length ? (
                <ul className="mt-1 space-y-0.5">
                  {items.map((s) => (
                    <li key={s.id} className="text-caption text-ash">
                      {s.n}. {s.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-caption text-ash/70">—</p>
              )}
            </div>
          );
        })}
      </div>

      <h2 className="mb-1 mt-6 text-h3 text-ink">{TASK1.export.docFieldATitle}</h2>
      <p className="whitespace-pre-wrap text-body text-ash">
        {fieldA.trim() || TASK1.export.docNotFilled}
      </p>

      <h2 className="mb-1 mt-5 text-h3 text-ink">{TASK1.export.docFieldBTitle}</h2>
      <p className="whitespace-pre-wrap text-body text-ash">
        {fieldB.trim() || TASK1.export.docNotFilled}
      </p>
    </div>
  );
}
