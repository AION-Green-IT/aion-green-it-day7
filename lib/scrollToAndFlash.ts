/** Scrolls an element into view and briefly flashes it — used to point at what's missing without navigating away. */
export function scrollToAndFlash(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.remove("anim-flash-warn");
  // Force reflow so the animation restarts if it's already flashing.
  void el.offsetWidth;
  el.classList.add("anim-flash-warn");
  window.setTimeout(() => el.classList.remove("anim-flash-warn"), 1200);
}
