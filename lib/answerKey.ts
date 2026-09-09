/**
 * Shared shape for a mentor-facing answer key: every question, its correct
 * choice and why, plus — for every other option — why it wasn't the answer.
 * Each route builds its own `AnswerKeySection[]` from its own content; this
 * file only knows how to render that into one standalone HTML document.
 */

export type AnswerKeyOption = { label: string; correct: boolean; reason: string };
export type AnswerKeyQuestion = { prompt: string; options: AnswerKeyOption[] };
export type AnswerKeySection = { heading: string; questions: AnswerKeyQuestion[] };

/**
 * For a "classify this item into one of N labelled buckets" exercise, builds
 * one reason per bucket: the correct one states why it fits, every other one
 * states what that bucket actually covers and that this item isn't it — using
 * a stable one-line "domain" description per bucket rather than bespoke prose
 * per item, so every option always gets a real, specific reason.
 */
export function classificationOptions<Id extends string>(
  correctId: Id,
  correctWhy: string,
  buckets: { id: Id; label: string; domain: string }[],
): AnswerKeyOption[] {
  const correct = buckets.find((b) => b.id === correctId);
  return buckets.map((b) =>
    b.id === correctId
      ? { label: b.label, correct: true, reason: correctWhy }
      : { label: b.label, correct: false, reason: `Not this — "${b.label}" is about ${b.domain}, and that's not what this one is describing. It belongs under "${correct?.label}" instead.` },
  );
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function buildAnswerKeyHtml(opts: { routeLabel: string; docHeading: string; sections: AnswerKeySection[] }): string {
  const sectionsHtml = opts.sections
    .map((section) => {
      const questionsHtml = section.questions
        .map((q, qi) => {
          const optionsHtml = q.options
            .map(
              (o) =>
                `<li class="${o.correct ? "correct" : "wrong"}"><span class="mark">${o.correct ? "✓" : "✗"}</span> <strong>${esc(o.label)}</strong> — ${esc(o.reason)}</li>`,
            )
            .join("");
          return `<div class="question"><p class="prompt"><span class="qnum">${qi + 1}.</span> ${esc(q.prompt)}</p><ul class="options">${optionsHtml}</ul></div>`;
        })
        .join("");
      return `<h2>${esc(section.heading)}</h2>${questionsHtml}`;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(opts.docHeading)} — Answer Key</title>
<style>
  body { font-family: "Segoe UI", Arial, sans-serif; color: #16191D; max-width: 760px; margin: 40px auto; padding: 0 20px; line-height: 1.5; }
  h1 { font-size: 22px; margin-bottom: 4px; }
  h2 { font-size: 15px; text-transform: uppercase; letter-spacing: 0.04em; color: #5E6670; margin-top: 32px; border-bottom: 1px solid #E2E5E9; padding-bottom: 4px; }
  .meta { color: #5E6670; font-size: 13px; margin-bottom: 20px; }
  .kicker { text-transform: uppercase; letter-spacing: 0.06em; font-size: 11px; color: #5E6670; }
  .question { margin-top: 18px; }
  .prompt { font-size: 14px; font-weight: 600; margin-bottom: 6px; }
  .qnum { color: #5E6670; font-weight: 700; }
  .options { list-style: none; margin: 0; padding: 0; }
  .options li { font-size: 13px; padding: 4px 0 4px 4px; border-left: 3px solid transparent; padding-left: 10px; margin-bottom: 2px; }
  .options li.correct { border-left-color: #0E7A5A; background: #E7F2EC; }
  .options li.wrong { color: #5E6670; }
  .mark { display: inline-block; width: 14px; }
  .options li.correct .mark { color: #0E7A5A; font-weight: 700; }
  .options li.wrong .mark { color: #B23B3B; }
  @media print { body { margin: 0; max-width: none; } }
</style>
</head>
<body>
  <p class="kicker">AION Green IT · Day 7 · Mentor-only</p>
  <h1>${esc(opts.docHeading)} — Answer Key</h1>
  <p class="meta">${esc(opts.routeLabel)} · every correct choice, and why each other option was ruled out.</p>
  ${sectionsHtml}
</body>
</html>`;
}
