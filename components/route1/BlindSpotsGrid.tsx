const ASH = "#5E6670";
const INK = "#16191D";
const DANGER = "#B23B3B";
const ACCENT = "#0E7A5A";

const ICON_PATHS: Record<string, string> = {
  renewable: "M16 4C9 4 4.5 7.5 4.5 13.5c0 .8.1 1.5.3 2.2C6 12 9 9.5 13.5 8.5 10 10.5 7.8 13 7 16.5c6 .8 9-3 9-9V4Z",
  carbon: "M7 16a3.6 3.6 0 0 1-.4-7.2A5 5 0 0 1 16 8a4 4 0 0 1-1 7.9H7Z",
  utilisation: "M12 3.5a8.5 8.5 0 1 0 8.5 8.5M12 3.5v4M12 12l5-3",
  water: "M12 3.5C8 9 5.5 12.7 5.5 15.7A6.5 6.5 0 0 0 12 22a6.5 6.5 0 0 0 6.5-6.3C18.5 12.7 16 9 12 3.5Z",
  embodied: "M12 3.5 20 8l-8 4.5L4 8l8-4.5Z M4 8v8l8 4.5V12.5 M20 8v8l-8 4.5",
};

const BLIND_SPOTS = [
  { id: "renewable", label: "Renewable share", text: "A facility can post an excellent PUE while running on 100% coal power. PUE says nothing about the electricity source." },
  { id: "carbon", label: "Carbon intensity of the grid", text: "The same PUE value can represent very different carbon footprints depending on where the facility sits." },
  { id: "utilisation", label: "Utilisation / idle waste", text: "A facility full of idle, under-used servers can still report a \"good\" PUE — it only measures overhead against whatever load exists." },
  { id: "water", label: "Water usage", text: "Cooling strategies that lower PUE (e.g. evaporative cooling) can significantly raise water use — captured separately by WUE." },
  { id: "embodied", label: "Total footprint / embodied carbon", text: "PUE says nothing about emissions embedded in building materials, hardware manufacturing, or total absolute energy draw." },
] as const;

function GlyphIcon({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={ASH} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={ICON_PATHS[id]} />
    </svg>
  );
}

/** Block 5 — five things PUE cannot tell you, contrasted with the one thing it does. */
export function BlindSpotsGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {BLIND_SPOTS.map((b) => (
        <div key={b.id} className="flex flex-col gap-2 rounded-xl border border-line p-3.5">
          <div className="flex items-center justify-between">
            <GlyphIcon id={b.id} />
            <span className="rounded-full px-2 py-0.5 text-micro font-semibold" style={{ color: DANGER, backgroundColor: "#F7E7E7" }}>
              ✕ not captured by PUE
            </span>
          </div>
          <p className="text-caption font-semibold text-ink">{b.label}</p>
          <p className="text-micro text-ash">{b.text}</p>
        </div>
      ))}

      <div className="flex flex-col gap-2 rounded-xl border border-accent/30 bg-accentSoft p-3.5">
        <div className="flex items-center justify-between">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M8.2 12.3 11 15l5-6" />
          </svg>
          <span className="rounded-full px-2 py-0.5 text-micro font-semibold" style={{ color: ACCENT, backgroundColor: "#D9EEE4" }}>
            ✓ captured by PUE
          </span>
        </div>
        <p className="text-caption font-semibold text-ink">Facility overhead ratio</p>
        <p className="text-micro" style={{ color: INK }}>The one thing PUE measures precisely: how much energy overhead sits on top of whatever IT load exists.</p>
      </div>
    </div>
  );
}
