import clsx from "clsx";

/** Consistent block header: an accent kicker, a title, and an intro line. */
export function SectionHeading({
  kicker,
  title,
  intro,
  className,
}: {
  kicker: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={clsx("max-w-prose", className)}>
      <p className="mb-2 text-micro font-semibold uppercase tracking-wide text-accent">
        {kicker}
      </p>
      <h2 className="text-h2 text-ink">{title}</h2>
      {intro ? <p className="mt-3 text-body text-ash">{intro}</p> : null}
    </div>
  );
}
