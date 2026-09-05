# Plexo Engineering Showcase Implementation Plan

> Spec: `docs/superpowers/specs/2026-09-05-plexo-showcase-design.md`

## Task 1 — Build the public evidence model
Create `src/evidence-pipeline/types.ts`, `claim-validation.ts`, and `authority.ts`. Use sanitized, compact types and algorithms that demonstrate the real production principles: quote-backed claims, rejection of unsupported evidence, confidence calibration, and authority derived per process/claim.

## Task 2 — Add synthetic end-to-end artifacts
Create three JSON files under `examples/` showing two employees describing the same process differently. The artifacts must demonstrate quote IDs, typed claims, intended vs actual reality, source metadata, and a synthesized conflict without containing real customer data.

## Task 3 — Write architecture deep dive
Create `docs/architecture.md` explaining the multi-stage pipeline, typed artifact boundaries, extraction/validation split, authority derivation, synthesis, and why these choices matter.

## Task 4 — Write reliability deep dive
Create `docs/reliability.md` covering evidence validation, weak-source handling, assent-only filtering, conflict preservation, voice reliability, provider fallback architecture at a conceptual level, eval traces, E2E testing, and observability. Keep provider names and operational details generic unless already public.

## Task 5 — Replace README
Rewrite `README.md` as the five-minute technical overview. It should lead with the engineering problem, show an architecture diagram, surface the hardest technical problems and decisions, link to the code/examples/docs, and include a concise 'What I worked on' section that is defensible from the actual project history.

## Verification
- Re-fetch every created file from GitHub.
- Validate JSON examples are syntactically valid by inspection of fetched content.
- Search the public repository for likely secret/customer markers before completion.
- Review every statement against the private Plexo source material used for the showcase.
