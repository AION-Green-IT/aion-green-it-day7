import { Fragment } from "react";

/**
 * Renders material prose that may carry inline `[label](url)` references to an
 * outside source — a standard, a directive, an initiative — so a learner can
 * follow up any term the material names but doesn't define in full. No
 * markdown library: one regex, external links only, always a new tab.
 */
export function RichText({ text }: { text: string }) {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <a
        key={`${match.index}-${match[2]}`}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-accent underline decoration-accent/40 underline-offset-2 transition-colors duration-150 hover:text-accentHi hover:decoration-accent"
      >
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>{p}</Fragment>
      ))}
    </>
  );
}
