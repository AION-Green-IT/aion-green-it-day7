"use client";

import { useMemo } from "react";
import { useRoute1 } from "./useRoute1";
import { ZONES, CASE_BRIEF, type ZoneId } from "@/lib/route1";

export type AuditMappingDocData = {
  name: string;
  date: string;
  caseReference: string;
  diagnostics: { zone: string; answer: string }[];
  classification: { zone: string; impact: string; horizon: string }[];
  priorityZone: string;
  improvementApproach: string;
};

/** Joins Route 1's state hook to the zone content to assemble the Task 1a report shape. */
export function useAuditMappingDocData(): AuditMappingDocData {
  const r1 = useRoute1();

  return useMemo(() => {
    const diagnostics = ZONES.filter((z) => r1.zoneAnswers[z.id]).map((z) => {
      const choice = z.choices.find((c) => c.id === r1.zoneAnswers[z.id]);
      return { zone: z.label, answer: choice?.label ?? "" };
    });

    const classification = ZONES.filter((z) => r1.zoneImpact[z.id] || r1.zoneHorizon[z.id]).map((z) => ({
      zone: z.label,
      impact: r1.zoneImpact[z.id] === "technical" ? "Technical" : r1.zoneImpact[z.id] === "governance" ? "Governance / architectural" : "—",
      horizon: r1.zoneHorizon[z.id] === "short" ? "Short-term" : r1.zoneHorizon[z.id] === "medium" ? "Medium-term" : "—",
    }));

    const priorityZone = ZONES.find((z) => z.id === (r1.priorityZone as ZoneId))?.label ?? "";

    return {
      name: r1.name || "Learner",
      date: new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }),
      caseReference: CASE_BRIEF.company,
      diagnostics,
      classification,
      priorityZone,
      improvementApproach: r1.improvementApproach,
    };
  }, [r1]);
}
