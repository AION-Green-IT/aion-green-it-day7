/**
 * Day 5 route registry. Each route is its own case study, so unlike the
 * previous day's single-case module, there is no shared "CASE" business
 * name here — only the day-level program identity. Route-specific content
 * (e.g. Route 1's LogicSphere Solutions case) lives in that route's own
 * lib/routeN.ts.
 */

export const CASE = {
  company: "AION Green IT",
  module: "Day 5",
  moduleTitle: "Sustainable IT Lifecycle & Circular Procurement",
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
    slug: "route-1-lifecycle-foundations",
    href: "/route-1-lifecycle-foundations",
    tag: "Route 1 — Lifecycle Foundations",
    title: "Route 1 — Lifecycle Foundations",
    cardTitle: "Lifecycle Foundations",
    cardBlurb:
      "TCO, embodied carbon, the circular-economy R-ladder, and EU regulation — then defend a 300-unit procurement call under pressure.",
    deliverable: "Lifecycle Impact Mapper",
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
