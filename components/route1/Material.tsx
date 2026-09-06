"use client";

import { useState } from "react";
import { useProgress } from "@/lib/store";
import { MATERIAL, ZONES, CASE_BRIEF, type ZoneId } from "@/lib/route1";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaterialBlock } from "@/components/ui/MaterialBlock";
import { MasterFacilitySvg } from "./MasterFacilitySvg";
import { PueCalculator } from "./PueCalculator";
import { Check } from "@/components/icons/LineIcons";

const [whyMatters, anatomy, usualSuspects, levers, monitoring, tension] = MATERIAL;

export function Material() {
  return (
    <div className="space-y-14">
      <SectionHeading
        kicker="Material"
        title="Six ideas before you touch the case"
        intro="About 45 minutes of reading and exploring. Each section pairs a real framework with something you can click through or calculate yourself."
      />

      <MaterialBlock block={whyMatters}>
        <ScaleComparison />
      </MaterialBlock>

      <MaterialBlock block={anatomy}>
        <FacilityMapExplainer />
      </MaterialBlock>

      <MaterialBlock block={usualSuspects}>
        <UsualSuspectsList />
      </MaterialBlock>

      <MaterialBlock block={levers}>
        <LeversSplit />
      </MaterialBlock>

      <MaterialBlock block={monitoring}>
        <PueCalculator />
      </MaterialBlock>

      <MaterialBlock block={tension}>
        <TierTable />
      </MaterialBlock>
    </div>
  );
}

function ScaleComparison() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-line p-4 text-center">
        <p className="text-micro font-semibold uppercase tracking-wide text-ash">A mid-size facility</p>
        <p className="mt-1 text-h2 text-ink">1–5 MW</p>
        <p className="mt-1 text-caption text-ash">typical continuous draw</p>
      </div>
      <div className="rounded-xl border border-accent/30 bg-accentSoft p-4 text-center">
        <p className="text-micro font-semibold uppercase tracking-wide text-accent">Roughly comparable to</p>
        <p className="mt-1 text-h2 text-ink">a small town</p>
        <p className="mt-1 text-caption text-ash">of several thousand households</p>
      </div>
    </div>
  );
}

/** Read-only, click-a-zone-for-a-fact version of the master SVG — same asset the task reuses. */
function FacilityMapExplainer() {
  const markSeen = useProgress((s) => s.markSeen);
  const seen = useProgress((s) => s.seen["r1:material:zones"] ?? []);
  const [activeZoneId, setActiveZoneId] = useState<ZoneId | null>(null);
  const active = ZONES.find((z) => z.id === activeZoneId);

  const handleClick = (id: ZoneId) => {
    setActiveZoneId(id);
    markSeen("r1:material:zones", id);
  };

  return (
    <div>
      <MasterFacilitySvg title={`${CASE_BRIEF.company} Facility Map`} flaggedZones={seen as ZoneId[]} activeZoneId={activeZoneId} onZoneClick={handleClick} />
      <p className="mt-3 text-micro text-ash">Click any zone to see what's actually known about it at CoreAxis. This is context, not a quiz.</p>
      {active && (
        <div className="reveal-in mt-3 rounded-xl border border-accent/25 bg-accentSoft p-4">
          <p className="text-caption font-semibold text-accent">{active.label}</p>
          <p className="mt-1 text-caption text-ink">{active.fact}</p>
        </div>
      )}
    </div>
  );
}

function UsualSuspectsList() {
  const items = [
    "Low server utilization with no consolidation",
    "Legacy systems left running past their useful purpose",
    "Absent or one-off monitoring instead of continuous measurement",
    "Over-cooling relative to current ASHRAE guidance",
    "Permanent unused backup/redundant capacity",
  ];
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2 text-caption text-ink">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mist text-ash">
            <Check className="h-3 w-3" />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}

function LeversSplit() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-line p-4">
        <p className="text-micro font-semibold uppercase tracking-wide text-ash">Attacks IT load</p>
        <ul className="mt-2 space-y-1.5 text-caption text-ink">
          <li>Consolidation &amp; virtualization</li>
          <li>Load optimization</li>
          <li>Decommissioning unused systems</li>
        </ul>
      </div>
      <div className="rounded-xl border border-accent/30 bg-accentSoft p-4">
        <p className="text-micro font-semibold uppercase tracking-wide text-accent">Attacks facility load</p>
        <ul className="mt-2 space-y-1.5 text-caption text-ink">
          <li>Hot/cold aisle containment</li>
          <li>ASHRAE-aligned temperature management</li>
          <li>Modern power components (UPS/PDU)</li>
        </ul>
      </div>
    </div>
  );
}

function TierTable() {
  const rows = [
    { tier: "Tier I", pct: "99.671%" },
    { tier: "Tier II", pct: "99.741%" },
    { tier: "Tier III", pct: "99.982%" },
    { tier: "Tier IV", pct: "99.995%" },
  ];
  return (
    <div>
      <table className="w-full text-caption">
        <thead>
          <tr className="border-b border-line text-left text-ash">
            <th className="py-1 font-semibold">Classification</th>
            <th className="font-semibold">Commonly-cited availability</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.tier} className="border-b border-line last:border-0">
              <td className="py-1.5 font-semibold text-ink">{r.tier}</td>
              <td className="tabular-nums text-ash">{r.pct}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-micro text-ash">
        Uptime Institute formally removed these percentages from the official Tier Standard in 2009 — operational
        discipline affects real uptime more than physical design alone.
      </p>
    </div>
  );
}
