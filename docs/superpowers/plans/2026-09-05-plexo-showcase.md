# Plexo Context-First Engineering Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn `plexo-engineering` into a polished technical case study centered on Plexo's evolving operational context engine, hard engineering decisions, measured failures, reliability systems, and Isidro's individual contribution.

**Architecture:** Keep the production codebase private and expose only a faithful, sanitized engineering narrative plus small selected implementations. The README is the five-minute entry point; deeper documents explain context architecture, ADRs, failures, and reliability; synthetic artifacts show one end-to-end context update without customer data.

**Tech Stack:** Markdown, Mermaid, TypeScript, JSON, GitHub.

**Spec:** `docs/superpowers/specs/2026-09-05-plexo-showcase-design.md`

## Global Constraints
- Every public technical claim must be traceable to production code or directly confirmed project history.
- Never publish customer data, credentials, internal prompts, provider keys, production configuration, or confidential business logic.
- Mark future architectural direction explicitly; never present it as current production behavior.
- Keep one coherent synthetic scenario across examples and documentation.
- Optimize the first five minutes for Puentes technical evaluation: technical depth, product taste, hard problems, evolution, and individual contribution.
- No license is added in this pass.

---

### Task 1: Reframe the README around the Context Engine

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: current public examples and sanitized evidence-pipeline modules.
- Produces: the primary navigation and conceptual vocabulary used by all deeper docs.

- [ ] **Step 1: Replace the opening with explicit repo/product positioning**

Use the heading `# Plexo — Engineering Deep Dive` and state immediately that Plexo is the product, production is private, and this repository is Isidro's public technical case study.

- [ ] **Step 2: Add the thesis `The real product is context`**

Explain that voice is a collection mechanism, reports are a delivery mechanism, and the durable technical asset is the evolving operational model between them. Include the line: `Context is not a prompt.`

- [ ] **Step 3: Replace the linear architecture with one feedback architecture**

The Mermaid diagram must visibly contain `Interview Layer`, `Evidence Layer`, `Context Engine`, `Cross-Interview Synthesis`, `Operational Model`, and a loop from updated context back to future interviews. Reliability/evals should appear as a cross-cutting concern rather than another serial stage.

- [ ] **Step 4: Add `How context evolves`**

Show the five admissible outcomes for new evidence: strengthen existing knowledge, contradict it, extend the model, alter contextual authority, or remain unresolved/uncertain.

- [ ] **Step 5: Add `Hard engineering decisions`**

Surface seven decisions with one-line trade-offs and links to `docs/decisions/` rather than framework names.

- [ ] **Step 6: Add `Things we got wrong`**

Lead with the verified authority/seniority measurement and link to the deeper failure analysis.

- [ ] **Step 7: Strengthen `What I personally worked on`**

Use first-person, defensible contribution language for production voice debugging, provider fallback, evidence-backed reconstruction architecture, and interview-to-operational-knowledge system decisions. Do not imply sole authorship of Plexo.

- [ ] **Step 8: Review the first-screen experience**

Verify that a reviewer can identify what Plexo is, why this repo exists, and the context-engine thesis without scrolling through implementation detail.

- [ ] **Step 9: Commit**

```bash
git add README.md
git commit -m "docs: make context engine the Plexo showcase thesis"
```

---

### Task 2: Document the Context Engine

**Files:**
- Create: `docs/context-engine.md`
- Modify: `docs/architecture.md`

**Interfaces:**
- Consumes: the vocabulary established by README and existing production-backed claim/evidence/authority concepts.
- Produces: the detailed model referenced by ADRs and synthetic context-update example.

- [ ] **Step 1: Write the seven context layers**

Document Raw Evidence → Claims → Entities → Relationships → Conflicts → Derived Knowledge → Unknowns. Clearly label any layer that is conceptual rather than verified production implementation.

- [ ] **Step 2: Explain provenance**

Use the chain `Conclusion → Claim → Quote → Interview → Participant` and explain why a summary alone cannot preserve this property.

- [ ] **Step 3: Explain context selection**

Describe the design principle that a task should receive the smallest relevant context slice: target process, relevant participants, existing claims, conflicts, and open questions. Do not claim a production retrieval algorithm unless verified.

- [ ] **Step 4: Explain context evolution**

Document how new evidence may strengthen, challenge, extend, or leave existing state unresolved. Explain why intended and observed reality can coexist.

- [ ] **Step 5: Rewrite `docs/architecture.md` as a feedback system**

Retain the verified multi-stage extraction/validation/synthesis architecture but connect it to the context model and explicitly separate current implementation from architectural direction.

- [ ] **Step 6: Commit**

```bash
git add docs/context-engine.md docs/architecture.md
git commit -m "docs: explain Plexo context architecture"
```

---

### Task 3: Add Architecture Decision Records

**Files:**
- Create: `docs/decisions/001-multi-agent-boundaries.md`
- Create: `docs/decisions/002-claims-not-summaries.md`
- Create: `docs/decisions/003-llm-proposes-code-validates.md`
- Create: `docs/decisions/004-contextual-authority.md`
- Create: `docs/decisions/005-preserve-conflicts.md`
- Create: `docs/decisions/006-structured-scoped-context.md`
- Create: `docs/decisions/007-unknowns-first-class.md`

**Interfaces:**
- Consumes: verified architecture and context-engine design principles.
- Produces: reviewer-readable technical reasoning and trade-offs linked from README.

- [ ] **Step 1: Use one ADR format for all decisions**

Each file must contain: `Problem`, `Options considered`, `Decision`, `Why`, `Trade-off`, and `Status`. `Status` must say either `Production-backed` or `Architectural direction`.

- [ ] **Step 2: Write ADRs 001–005 from production-backed behavior**

Keep claims bounded to actual multi-stage boundaries, atomic quote-backed claims, deterministic validation, contextual authority, and conflict preservation.

- [ ] **Step 3: Write ADRs 006–007 conservatively**

If scoped context selection and explicit unknown-state storage are not verified in production, mark them `Architectural direction` and explain why they follow from the current artifact model rather than pretending they are shipped behavior.

- [ ] **Step 4: Cross-link ADRs from README and context-engine doc**

No ADR should be orphaned.

- [ ] **Step 5: Commit**

```bash
git add docs/decisions README.md docs/context-engine.md
git commit -m "docs: add Plexo architecture decisions"
```

---

### Task 4: Show a Context Update End-to-End

**Files:**
- Create: `examples/context-update.json`
- Modify: `examples/interview-input.json`
- Modify: `examples/extracted-claims.json`
- Modify: `examples/synthesized-output.json`

**Interfaces:**
- Consumes: public claim/source types and the context-evolution model.
- Produces: one synthetic story that README and docs can point to.

- [ ] **Step 1: Keep one fictitious process across all examples**

Use the existing synthetic purchase-approval scenario unless changing it materially improves clarity. Never use a real customer, employee, amount, or quote.

- [ ] **Step 2: Make the initial state explicit**

The example should establish an intended approval path with quote-backed evidence.

- [ ] **Step 3: Add contradictory observed evidence**

A second synthetic participant should describe the actual execution differently with its own provenance.

- [ ] **Step 4: Create `context-update.json`**

Represent `before`, `newEvidence`, `decision`, and `after`. The update should preserve both intended and observed claims and create a conflict rather than overwrite either claim.

- [ ] **Step 5: Validate JSON syntax**

Parse all four JSON files with a JSON parser before committing.

- [ ] **Step 6: Commit**

```bash
git add examples
git commit -m "docs: demonstrate an evolving Plexo context"
```

---

### Task 5: Add the Failure Story and Strengthen Reliability

**Files:**
- Create: `docs/things-we-got-wrong.md`
- Modify: `docs/reliability.md`

**Interfaces:**
- Consumes: verified production authority notes, voice-eval behavior, E2E evidence, and provider-fallback project history.
- Produces: evidence that the architecture evolved through measurement and real failures.

- [ ] **Step 1: Write the authority failure story**

Structure it as `Original assumption → Measurement → Failure pattern → Architectural change → Lesson`. Include the ~66% result only with the exact caveat documented in production source.

- [ ] **Step 2: Explain why this matters for context**

Show that bad authority assignment corrupts the company model even if extraction itself is accurate.

- [ ] **Step 3: Strengthen voice reliability documentation**

Document trace-based checks for pause/resume, mute-after-resume, premature turn signaling, truncated participant responses, required questions/checkpoints, and the conceptual provider-fallback boundary.

- [ ] **Step 4: Separate deterministic checks from model evals**

Make clear which failures are temporal/state-machine invariants and which require semantic judgment.

- [ ] **Step 5: Commit**

```bash
git add docs/things-we-got-wrong.md docs/reliability.md
git commit -m "docs: show Plexo failures and reliability lessons"
```

---

### Task 6: Verify Technical Honesty, Security, and Presentation

**Files:**
- Review: all public repository files changed by Tasks 1–5.

**Interfaces:**
- Consumes: complete showcase.
- Produces: publication-ready main branch with no unsupported technical claims or sensitive information.

- [ ] **Step 1: Re-fetch every changed file from GitHub**

Confirm the committed content matches the intended structure and links resolve to real paths.

- [ ] **Step 2: Search for sensitive markers**

Search the public repository for likely credentials, real customer names, production provider keys/config, internal prompts, and known confidential identifiers. Remove anything suspicious before completion.

- [ ] **Step 3: Audit every production claim**

For each sentence that says or implies `Plexo does X`, verify it against the private repository or directly confirmed project history. Reword unverified mechanisms as `design direction`, `we are exploring`, or remove them.

- [ ] **Step 4: Audit individual-contribution language**

Ensure first-person claims are specific and defensible but do not attribute teammates' work to Isidro.

- [ ] **Step 5: Perform a 20-second reviewer test**

The first screen should answer: `What is Plexo?`, `Why is this repo public?`, `What is technically unusual?`, and `Why should I keep reading?`

- [ ] **Step 6: Perform a 20-minute reviewer test**

A technical interviewer should have enough substance to ask about provenance, deterministic validation, contextual authority, contradictions, feedback loops, voice reliability, eval design, and trade-offs.

- [ ] **Step 7: Final commit if verification requires edits**

```bash
git add README.md docs examples src
git commit -m "docs: polish Plexo engineering deep dive"
```
