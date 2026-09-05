import type { IconKey } from "@/lib/module3";

/**
 * Single-colour line icons. Every glyph is stroke-only on a 24x24 grid using
 * currentColor, so one accent (or ink) drives them all and none carries
 * photographic weight. No fills, no gradients.
 */

type P = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// --- Card + bucket glyphs --------------------------------------------------

function Compass({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" />
    </svg>
  );
}

function Puzzle({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M10 4h4a1 1 0 0 1 1 1v1.5a1.5 1.5 0 1 0 3 0V5h1.5a1 1 0 0 1 1 1v4h-1.5a1.5 1.5 0 1 0 0 3H21v4a1 1 0 0 1-1 1h-4v-1.5a1.5 1.5 0 1 0-3 0V20H9a1 1 0 0 1-1-1v-4H6.5a1.5 1.5 0 1 1 0-3H8V6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function LinkIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M8 12 6.3 13.7a3.3 3.3 0 0 0 4.6 4.6L12.6 16.6" />
      <path d="M16 12l1.7-1.7a3.3 3.3 0 0 0-4.6-4.6L11.4 7.4" />
    </svg>
  );
}

function GearLeaf({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 4.2v1.6M12 18.2v1.6M4.2 12h1.6M18.2 12h1.6M6.5 6.5l1.1 1.1M16.4 16.4l1.1 1.1M17.5 6.5l-1.1 1.1M7.6 16.4l-1.1 1.1" />
      <path d="M15.5 9.5c1.2 1.2 1.2 3.4-.4 5s-3.8 1.6-5 .4c1.2-1.6 1.6-2.6 2.5-3.5s1.9-1.3 2.9-1.9Z" />
    </svg>
  );
}

function Shield({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5 19 6v5.5c0 4-3 7-7 9-4-2-7-5-7-9V6l7-2.5Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function Cart({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M3 4h2l2 11h10l2-7H6.5" />
      <circle cx="9" cy="19" r="1.3" />
      <circle cx="17" cy="19" r="1.3" />
    </svg>
  );
}

function Lever({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 16h16" />
      <path d="M7 16l9-6" />
      <circle cx="17" cy="9" r="2" />
      <path d="M12 16v-3" />
    </svg>
  );
}

function Target({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.8" />
      <circle cx="12" cy="12" r="1.4" />
    </svg>
  );
}

function Gavel({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M8 9.5 13 4.5l3 3-5 5Z" />
      <path d="M11 12.5 6.5 17a1.8 1.8 0 0 1-2.6-2.5L8.5 10" />
      <path d="M13.5 15 20 21" transform="translate(-2 -2)" />
      <path d="M14 20h6" />
    </svg>
  );
}

function Coins({ className }: P) {
  return (
    <svg {...base} className={className}>
      <ellipse cx="9" cy="7.5" rx="5" ry="2.3" />
      <path d="M4 7.5v4c0 1.3 2.2 2.3 5 2.3s5-1 5-2.3v-4" />
      <path d="M14 12.5c.9.3 2 .5 3 .5 2.8 0 5-1 5-2.3" />
      <ellipse cx="17" cy="10.7" rx="5" ry="2.3" />
      <path d="M12 15.5c0 1.3 2.2 2.3 5 2.3s5-1 5-2.3v-4" />
    </svg>
  );
}

function Layers({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5 21 8l-9 4.5L3 8l9-4.5Z" />
      <path d="m3 12 9 4.5 9-4.5" />
      <path d="m3 16 9 4.5 9-4.5" />
    </svg>
  );
}

function Scale({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5v17M7 5.5h10" />
      <path d="M7 5.5 3.5 12.5a3.5 3.5 0 0 0 7 0L7 5.5Z" />
      <path d="M17 5.5 13.5 12.5a3.5 3.5 0 0 0 7 0L17 5.5Z" />
      <path d="M9 20.5h6" />
    </svg>
  );
}

function Supplier({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 8.5 12 5l8.5 3.5L12 12 3.5 8.5Z" />
      <path d="M3.5 8.5v7L12 19l8.5-3.5v-7" />
      <path d="M12 12v7" />
      <path d="M14.5 15.8l2 2 3.5-3.5" transform="translate(0 -3.2)" />
    </svg>
  );
}

const REGISTRY: Record<IconKey, (p: P) => JSX.Element> = {
  compass: Compass,
  puzzle: Puzzle,
  link: LinkIcon,
  gearLeaf: GearLeaf,
  shield: Shield,
  cart: Cart,
  lever: Lever,
  target: Target,
  gavel: Gavel,
  coins: Coins,
  supplier: Supplier,
  layers: Layers,
  scale: Scale,
};

export function Icon({ name, className }: { name: IconKey; className?: string }) {
  const C = REGISTRY[name];
  return <C className={className ?? "h-6 w-6"} />;
}

// --- UI utility icons ------------------------------------------------------

export function DragHandle({ className }: P) {
  return (
    <svg {...base} className={className ?? "h-4 w-4"}>
      <circle cx="9" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="18" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Check({ className }: P) {
  return (
    <svg {...base} className={className ?? "h-4 w-4"}>
      <path d="M5 12.5 10 17 19 7" />
    </svg>
  );
}

export function Lock({ className }: P) {
  return (
    <svg {...base} className={className ?? "h-4 w-4"}>
      <rect x="5" y="10.5" width="14" height="9" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}

export function ArrowRight({ className }: P) {
  return (
    <svg {...base} className={className ?? "h-4 w-4"}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Close({ className }: P) {
  return (
    <svg {...base} className={className ?? "h-5 w-5"}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Plus({ className }: P) {
  return (
    <svg {...base} className={className ?? "h-4 w-4"}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Help({ className }: P) {
  return (
    <svg {...base} className={className ?? "h-4 w-4"}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.2a2.4 2.4 0 1 1 3.3 2.2c-.7.3-1 .8-1 1.6v.3" />
      <circle cx="11.9" cy="16.4" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Info({ className }: P) {
  return (
    <svg {...base} className={className ?? "h-4 w-4"}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="7.6" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ChevronDown({ className }: P) {
  return (
    <svg {...base} className={className ?? "h-4 w-4"}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
