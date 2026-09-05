# Plexo Engineering Showcase Design

## Goal
Turn `plexo-engineering` into a public engineering case study that makes a technical evaluator understand, in minutes, that Plexo is not a voice-interview wrapper or a linear LLM pipeline. Plexo is an evolving operational context system: new evidence continuously updates a structured, machine-readable representation of how a company works.

## Audience
Primary audience: technical evaluators reviewing Isidro Pasman's GitHub for Puentes. The repo must answer the criteria Gadi explicitly emphasized: what was built, whether the product shows taste, where the hard engineering work was, how the system evolved, and what Isidro is individually good at.

Secondary audience: technical founders and engineers evaluating Plexo's system design.

## Positioning
The repository must make the relationship to Plexo explicit in the first screen:

- Plexo is the product.
- The production repository is private.
- `plexo-engineering` is Isidro's public technical deep dive into the architecture, engineering decisions, failures, reliability systems, context-management philosophy, and selected sanitized implementations behind Plexo.

The repo is not an open-source version of Plexo, a demo implementation, or marketing documentation.

## Core technical thesis
Plexo's core technical asset is not the voice layer and not the report. It is the evolving operational context between them.

Voice is one collection mechanism. Reports are one delivery mechanism. The core system continuously transforms raw human evidence into structured context that can be updated, challenged, reconciled, selectively retrieved, and used to drive the next best question or downstream decision.

The central line for the showcase is:

> Context is not a prompt. Context is a structured, evolving model with provenance, uncertainty, authority, conflicts, and explicit unknowns.

## System model
The architecture must be presented as a feedback system, not as a one-way pipeline.

### Loop 1 — Interview feedback
Existing context informs what the next interview should ask. The system should reason over what is known, missing, uncertain, contradictory, or underexplored. New answers become evidence and update the context.

### Loop 2 — Cross-interview feedback
A new claim can strengthen existing knowledge, contradict it, add a new entity/process, change source authority, or remain unresolved due to weak evidence. Context evolves rather than being regenerated from scratch.

### Loop 3 — Operational feedback
Longer term, recommendations and agents can produce real-world outcomes that become new evidence. The model therefore has a path from understanding operations to learning from interventions.

The public repo must clearly distinguish Loop 3 as architectural direction unless a concrete production implementation is verified.

## Context layers
The showcase should describe context as layered structured state:

1. **Raw evidence** — transcripts, quotes, checkpoints, corrections.
2. **Claims** — atomic typed statements with provenance, confidence, process, source, and evidence quality.
3. **Entities** — people/roles, departments, processes, tools.
4. **Relationships** — owns, executes, approves, receives, depends on, participates in.
5. **Conflicts** — intended vs actual, source disagreement, unresolved claims.
6. **Derived knowledge** — process models, bottlenecks, opportunities, asymmetries, recommendations.
7. **Unknowns** — missing ownership, low-confidence areas, unresolved conflicts, information still requiring verification.

The critical design principle is that uncertainty and unknowns are part of the model, not discarded metadata.

## Context-management decisions to highlight

### Structured artifacts over conversational memory
Do not make raw conversation history the canonical state. Each stage emits typed artifacts that downstream components can validate, inspect, and reuse independently.

### Claims over summaries
Summaries destroy provenance and are difficult to update incrementally. Atomic claims preserve the chain from conclusion to claim to quote to interview to participant.

### Context selection over context dumping
A task should receive the smallest relevant slice of company context instead of the entire company corpus. Relevant context may include the target process, related participants, existing claims, unresolved conflicts, and open questions.

### Preserve uncertainty
The system should retain low-confidence evidence, unresolved disagreements, and missing information where appropriate instead of forcing a single confident answer.

### Context evolves rather than being overwritten
New evidence should strengthen, challenge, supersede, or contextualize existing knowledge. Historical or intended state may coexist with current observed reality.

## Hard engineering decisions
The public case study should center on decisions and trade-offs, not on the framework list.

### Decision 01 — Multiple bounded agents instead of one giant agent
Reason: interviewing, extraction, evidence validation, synthesis, bottleneck analysis, and report generation have different failure modes and require independent evaluation.

### Decision 02 — Claims instead of transcript summaries
Reason: preserve provenance, incremental updates, composability, and inspectability.

### Decision 03 — LLM proposes; code validates
Reason: invariants such as quote existence, assent-only evidence, weak hearsay, and deterministic structural checks should not depend on another probabilistic judgment.

### Decision 04 — Authority is contextual
Authority is derived per participant/process/claim rather than globally from job title. The case study should include the measured failure of the earlier seniority heuristic and the redesign that followed.

### Decision 05 — Contradictions are data
Intended process and observed process can both be true descriptions of different layers of the organization. Preserve the conflict and its provenance rather than average it away.

### Decision 06 — Context is structured and scoped
The model should expose task-specific context views rather than stuffing everything into a model context window.

### Decision 07 — Unknowns are first-class state
What Plexo does not know is useful because it determines what should be investigated next.

### Decision 08 — Voice requires its own observable reliability layer
Temporal voice failures require traces and deterministic invariants around pause/resume, silence, truncated responses, checkpoints, turn timing, and provider behavior.

## Things we got wrong
This section is mandatory. It should show engineering growth rather than a perfect retrospective.

Minimum story:

### Authority via seniority was a weak proxy
The production code documents an internal measurement where the original seniority-based gate matched declared process ownership only ~66% of the time, with error concentrated in missing real process owners. The architecture was changed to incorporate declared process roles while preserving per-claim authority reasoning.

Other failure stories may be included only if they are verified from the production code or directly confirmed by Isidro.

## Public architecture visual
The README should show a system diagram with these areas:

- Interview layer
  - voice/realtime interface
  - structured interview state
  - adaptive questioning / context-informed questions
- Evidence layer
  - normalized quotes
  - extraction
  - deterministic validation
- Context engine
  - typed claims
  - entities/relationships
  - authority
  - conflicts/unknowns
  - context selection
- Cross-interview synthesis
  - consensus
  - contradictions
  - asymmetries
- Operational model
  - processes
  - bottlenecks
  - opportunities
- Reliability/evals as a cross-cutting layer

The visual must communicate loops back from updated context to future interviews.

## README narrative
The README should follow this order:

1. **What this repo is** — explicit product/private-repo/public-case-study relationship.
2. **The real product is context** — one-screen thesis.
3. **System architecture** — visual feedback architecture.
4. **How context evolves** — what happens when new evidence arrives.
5. **Context model** — layers and provenance chain.
6. **Hard engineering problems** — evidence, authority, contradictions, voice, incremental context.
7. **Technical decisions** — concise ADR cards with alternatives, decision, why, and trade-off.
8. **Things we got wrong** — measured redesigns.
9. **Reliability and evals** — production-backed examples.
10. **Selected sanitized code** — links to small modules.
11. **What I personally worked on** — individual technical contribution.
12. **Where this goes** — operational context as prerequisite for future agents.

## Public repository structure

```text
plexo-engineering/
├── README.md
├── docs/
│   ├── architecture.md
│   ├── context-engine.md
│   ├── reliability.md
│   ├── decisions/
│   │   ├── 001-multi-agent-boundaries.md
│   │   ├── 002-claims-not-summaries.md
│   │   ├── 003-llm-proposes-code-validates.md
│   │   ├── 004-contextual-authority.md
│   │   ├── 005-preserve-conflicts.md
│   │   ├── 006-structured-scoped-context.md
│   │   └── 007-unknowns-first-class.md
│   └── things-we-got-wrong.md
├── examples/
│   ├── interview-input.json
│   ├── extracted-claims.json
│   ├── synthesized-output.json
│   └── context-update.json
└── src/
    └── evidence-pipeline/
        ├── types.ts
        ├── claim-validation.ts
        └── authority.ts
```

## Sanitization constraints
- Never publish customer data, credentials, provider keys, internal prompts, production deployment configuration, or confidential business logic.
- Synthetic examples must use fictitious companies, people, process names, and values.
- Public code should be faithful enough to explain the technical decision but simplified where publishing the production implementation adds no educational value.
- Do not claim that a future architecture exists in production. Mark architectural direction explicitly.
- No license is added in this pass.

## Product taste requirement
Because Puentes explicitly evaluates whether candidates can build polished product, the repository itself must demonstrate taste:

- clean first screen,
- strong information hierarchy,
- one excellent architecture diagram instead of many weak diagrams,
- concise prose,
- readable tables and decision cards,
- no generic badges or decorative clutter,
- examples that tell one coherent story end-to-end.

A separate short product demo may be added later, but this spec is scoped to the engineering showcase repository.

## Individual contribution requirement
The repo must avoid hiding Isidro behind collective language. A dedicated section must describe technical areas he personally worked on, using only claims he can defend in an interview.

Current confirmed areas to frame:
- production voice failure debugging and recovery under time pressure,
- multi-provider voice fallback design/implementation,
- evidence-backed process reconstruction architecture and system decisions,
- turning interviews into structured operational knowledge.

Do not attribute the entire production codebase to Isidro.

## Success criteria
A technical evaluator should leave the repo able to say:

- Plexo is a real product; this repo is the public technical case study.
- Plexo's core asset is an evolving operational context model, not a report generator.
- The system models provenance, authority, conflicts, uncertainty, and unknowns explicitly.
- New evidence updates the model and can influence what the system investigates next.
- The architecture contains deterministic safeguards around probabilistic model outputs.
- The team measures failures and changes architecture based on evidence.
- Voice reliability is treated as an observable engineering system, not a demo concern.
- Isidro can explain specific architecture decisions, trade-offs, failure cases, and technical work he personally contributed.
