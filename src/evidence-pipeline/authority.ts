import type { Claim, DeclaredProcessRole } from "./types";

const OWNER_LEANING = new Set(["executive", "department_head", "process_owner"]);
const INTENDED = new Set(["intended_process", "process_owner"]);
const REALITY = new Set(["actual_process", "bottleneck", "manual_work", "handoff", "metric"]);

function key(participantId: string, processName?: string): string {
  return `${participantId}|${(processName ?? "general").trim().toLowerCase()}`;
}

/**
 * Authority is contextual. Someone can own one process and execute another,
 * so Plexo derives authority per participant + process instead of assigning
 * one global authority level to a person.
 */
export function deriveAuthority(
  claims: Claim[],
  declaredRoles: DeclaredProcessRole[] = [],
): Claim[] {
  const declaredOwners = new Set(
    declaredRoles
      .filter((entry) => entry.role === "owner" || entry.role === "approver")
      .map((entry) => key(entry.participantId, entry.processName)),
  );

  const relationship = new Map<string, "process_owner" | "executor">();

  for (const claim of claims) {
    const claimKey = key(claim.source.participantId, claim.processName);
    const ownerSignal = OWNER_LEANING.has(claim.source.seniority) || declaredOwners.has(claimKey);
    if (INTENDED.has(claim.type) && ownerSignal) relationship.set(claimKey, "process_owner");
  }

  for (const claim of claims) {
    const claimKey = key(claim.source.participantId, claim.processName);
    if (REALITY.has(claim.type) && !relationship.has(claimKey)) relationship.set(claimKey, "executor");
  }

  return claims.map((claim) => {
    if (claim.source.relationshipToProcess !== "unknown") return claim;
    const derived = relationship.get(key(claim.source.participantId, claim.processName));
    return derived
      ? { ...claim, source: { ...claim.source, relationshipToProcess: derived } }
      : claim;
  });
}
