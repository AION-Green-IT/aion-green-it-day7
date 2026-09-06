/**
 * Day 6 route registry. Each route is its own case study, so unlike a
 * single-case module, there is no shared "CASE" business name here — only
 * the day-level program identity. Route-specific content (e.g. Route 1's
 * CoreAxis Data Services case) lives in that route's own lib/routeN.ts.
 *
 * moduleTitle covers Route 1's confirmed scope (data center technical
 * efficiency); revise it once Route 2/3's own subjects are set, since this
 * label is meant to span the whole day, not just Route 1.
 */

export const CASE = {
  company: "AION Green IT",
  module: "Day 6",
  moduleTitle: "Data Center Efficiency, Trade-offs & Governance",
} as const;

/** Icon keys resolved by components/icons/LineIcons.tsx. */
export type IconKey =
  | "coins"
  | "factory"
  | "recycleLoop"
  | "gavel"
  | "supplier"
  | "shield"
  | "target"
  | "certificate"
  | "link"
  | "layers";

export type Route = {
  n: 1 | 2 | 3;
  slug: string;
  href: string;
  tag: string; // "Route 1 — Lifecycle Foundations"
  title: string; // page H1
  cardTitle: string; // landing card title
  cardBlurb: string; // landing card one-liner
  deliverable: string; // what the route produces
  available: boolean;
};

export const ROUTES: Route[] = [
  {
    n: 1,
    slug: "route-1-the-audit",
    href: "/route-1-the-audit",
    tag: "Route 1 — The Audit",
    title: "Route 1 — The Audit",
    cardTitle: "The Audit",
    cardBlurb:
      "PUE, Uptime Institute tiers, and ASHRAE thermal limits — then diagnose a real facility and simulate which fix to fund first.",
    deliverable: "Diagnostic Mapping & Priority Decision",
    available: true,
  },
  {
    n: 2,
    slug: "route-2-decision-tradeoffs",
    href: "/route-2-decision-tradeoffs",
    tag: "Route 2 — Decision Trade-offs",
    title: "Route 2 — Decision Trade-offs",
    cardTitle: "Decision Trade-offs",
    cardBlurb:
      "Kraljic positioning, CapEx vs. DaaS, vendor lock-in risk, and weighted scoring across three procurement models.",
    deliverable: "Procurement Decision Matrix",
    available: true,
  },
  {
    n: 3,
    slug: "route-3-management-governance",
    href: "/route-3-management-governance",
    tag: "Route 3 — Management & Governance",
    title: "Route 3 — Management & Governance",
    cardTitle: "Management & Governance",
    cardBlurb:
      "ISO 20400, binding award criteria, RACI accountability, and an executive proposal that survives a board challenge.",
    deliverable: "Governance Diagnostic & Executive Proposal",
    available: true,
  },
];
