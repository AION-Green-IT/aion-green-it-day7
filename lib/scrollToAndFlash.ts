type FlashKind = "warn" | "ref";

const CLASS: Record<FlashKind, string> = {
  warn: "anim-flash-warn",
  ref: "anim-flash-ref",
};

/**
 * Scrolls an element into view and briefly flashes it. `warn` (red) points at
 * something still missing; `ref` (accent) points at material a task step draws
 * on — arriving somewhere you asked to go is not a warning.
 */
export function scrollToAndFlash(id: string, kind: FlashKind = "warn") {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  const cls = CLASS[kind];
  el.classList.remove(cls);
  // Force reflow so the animation restarts if it's already flashing.
  void el.offsetWidth;
  el.classList.add(cls);
  window.setTimeout(() => el.classList.remove(cls), 1200);
}
