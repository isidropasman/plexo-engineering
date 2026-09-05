# Plexo Engineering Showcase Design

## Goal
Create a compact public engineering showcase that demonstrates why Plexo is technically substantial without publishing the production repository or sensitive implementation details.

## Audience
Technical evaluators reviewing Isidro Pasman's GitHub, especially engineers assessing system design, reliability, agent architecture, and practical AI engineering depth.

## Core story
Plexo turns messy employee conversations into an evidence-backed operational model of a company. The showcase should make clear that this is not a thin LLM wrapper: the system has typed artifacts, evidence validation, role-aware authority, cross-interview synthesis, deterministic checks, voice reliability work, and explicit failure handling.

## Public structure
- `README.md`: primary narrative, architecture, hard problems, engineering decisions, reliability, selected stack, and individual contribution framing.
- `docs/architecture.md`: deeper technical walkthrough of the pipeline and data flow.
- `docs/reliability.md`: evidence validation, conflict handling, voice reliability, evals, and testing strategy.
- `examples/interview-input.json`: synthetic interview data with no customer information.
- `examples/extracted-claims.json`: synthetic evidence-backed claims.
- `examples/synthesized-output.json`: synthetic cross-interview synthesis with disagreement preserved.
- `src/evidence-pipeline/types.ts`: sanitized public types that explain the model.
- `src/evidence-pipeline/claim-validation.ts`: simplified but faithful evidence validation logic.
- `src/evidence-pipeline/authority.ts`: simplified role-aware authority derivation.

## Constraints
- Do not copy secrets, customer data, production configuration, internal prompts, credentials, or proprietary business logic that is unnecessary to demonstrate engineering depth.
- Every public claim must be traceable to the actual private Plexo codebase.
- Prefer small, readable modules over broad code dumps.
- Keep the public repository understandable in under five minutes, with optional deeper reading.
- No license is added in this pass.

## Technical themes to highlight
1. Multi-stage agent pipeline rather than one giant agent.
2. Structured artifacts as source of truth instead of chat history.
3. Evidence-first claims: no valid quote, no claim.
4. Code-level validation of weak evidence, assent-only answers, hearsay, and uncertainty.
5. Role-aware authority derived per claim/process rather than globally per participant.
6. Preservation of intended-process vs actual-process disagreements.
7. LLM proposes; deterministic code validates or ranks where possible.
8. Voice-specific reliability, E2E tests, provider benchmarking, and eval traces.

## Success criteria
A technical reviewer should be able to answer these questions after reading the repo:
- What hard technical problem does Plexo solve?
- Why is the architecture multi-stage?
- How does Plexo reduce hallucinated operational conclusions?
- How are conflicting interviews handled?
- What happens when evidence is weak?
- What reliability work exists around voice and the pipeline?
- What specific technical areas can Isidro defend in an interview?
