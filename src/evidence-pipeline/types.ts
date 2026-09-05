export type ClaimType =
  | "actual_process"
  | "intended_process"
  | "bottleneck"
  | "manual_work"
  | "handoff"
  | "metric"
  | "process_owner";

export type Confidence = "low" | "medium" | "high";
export type RelationshipToProcess = "process_owner" | "executor" | "observer" | "unknown";
export type Seniority = "executive" | "department_head" | "process_owner" | "individual_contributor";

export type Quote = {
  quoteId: string;
  text: string;
};

export type ClaimSource = {
  participantId: string;
  participantRole: string;
  seniority: Seniority;
  relationshipToProcess: RelationshipToProcess;
  proximityToWork: "daily" | "frequent" | "rarely_involved" | "unknown";
};

export type Claim = {
  claimId: string;
  type: ClaimType;
  text: string;
  processName?: string;
  quoteIds: string[];
  confidence: Confidence;
  specificity: "vague" | "general_statement" | "specific_example";
  source: ClaimSource;
};

export type ProposedClaim = Omit<Claim, "claimId" | "source">;

export type DeclaredProcessRole = {
  participantId: string;
  processName: string;
  role: "owner" | "approver" | "operator" | "observer";
};
