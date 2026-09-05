import type { ClaimSource, Confidence, ProposedClaim, Quote } from "./types";

const REALITY_CLAIMS = new Set([
  "actual_process",
  "bottleneck",
  "manual_work",
  "handoff",
  "metric",
]);

const UNCERTAINTY = ["i think", "probably", "not sure", "creo", "supongo", "no estoy seguro"];
const HEARSAY = ["they say", "i heard", "dicen que", "me contaron", "tengo entendido"];
const ASSENT = new Set([
  "yes", "yeah", "exactly", "correct", "right", "ok", "sure",
  "si", "sí", "exacto", "correcto", "claro", "dale", "bien",
]);

function normalized(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function isAssentOnly(text: string): boolean {
  const words = normalized(text)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  return words.length === 0 || words.every((word) => ASSENT.has(word));
}

function containsAny(text: string, markers: string[]): boolean {
  const value = normalized(text);
  return markers.some((marker) => value.includes(normalized(marker)));
}

export type ValidationResult =
  | { verdict: "accept"; quoteIds: string[]; confidence: Confidence }
  | { verdict: "reject"; reason: "no_direct_quote" | "too_generic" | "weak_source" | "insufficient_context" };

/**
 * A deliberately small public version of Plexo's production validation layer.
 * The LLM proposes a claim; deterministic code decides whether the evidence is admissible.
 */
export function validateClaim(
  proposed: ProposedClaim,
  quotes: Quote[],
  source: ClaimSource,
): ValidationResult {
  const quoteById = new Map(quotes.map((quote) => [quote.quoteId, quote.text]));
  const quoteIds = proposed.quoteIds.filter((id) => quoteById.has(id));
  if (quoteIds.length === 0) return { verdict: "reject", reason: "no_direct_quote" };

  if (proposed.type === "process_owner" && !proposed.processName?.trim()) {
    return { verdict: "reject", reason: "too_generic" };
  }

  const texts = quoteIds.map((id) => quoteById.get(id) ?? "");
  if (texts.every(isAssentOnly)) return { verdict: "reject", reason: "no_direct_quote" };

  const allUncertain = texts.every((text) => containsAny(text, UNCERTAINTY));
  if (proposed.type === "metric" && allUncertain) {
    return { verdict: "reject", reason: "insufficient_context" };
  }

  const distant = source.proximityToWork === "rarely_involved" || source.proximityToWork === "unknown";
  const hearsay = texts.some((text) => containsAny(text, HEARSAY));
  if (REALITY_CLAIMS.has(proposed.type) && distant && hearsay) {
    return { verdict: "reject", reason: "weak_source" };
  }

  let confidence = proposed.confidence;
  if (allUncertain || proposed.specificity === "vague") confidence = "low";
  if (proposed.specificity === "general_statement" && confidence === "high") confidence = "medium";

  return { verdict: "accept", quoteIds, confidence };
}
