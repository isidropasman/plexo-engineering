# The Context Engine

Plexo's hardest problem is not collecting more text. It is deciding what information deserves to become durable company context, how strongly to believe it, and what should happen when the next person says something different.

> **Context is not a prompt.** It is structured state with provenance, uncertainty and relationships.

## Production foundation vs architectural direction

This document intentionally separates what exists in the current system from where the architecture is going.

**Production-backed today:** structured interview state, normalized quote evidence, typed claims, deterministic evidence validation, process-aware authority, cross-interview synthesis, conflict preservation, structured downstream artifacts, and voice/pipeline evaluation.

**Architectural direction:** make explicit unknowns and task-scoped context views increasingly central to deciding what future interviews and agents should investigate. These ideas extend the existing artifact model; this public repository does not claim a finished production retrieval engine for them.

## The layers

### 1. Raw evidence — production-backed

The lowest layer is what a person actually said. Quotes retain stable identity and source metadata so downstream conclusions can point back to evidence instead of relying on a free-form summary.

### 2. Claims — production-backed

Extraction turns evidence into atomic typed claims: actual process, intended process, bottleneck, manual work, handoff, metric, process owner, and related operational facts.

Claims retain quote references, source information, evidence quality and confidence.

### 3. Entities and process structure — production-backed

Claims become useful when they are attached to operational structure: participants, roles, processes and other company artifacts. The important property is that the transcript is not the canonical interface between every downstream stage.

### 4. Relationships and authority — production-backed

The same person can be authoritative about one process and distant from another. Authority therefore cannot be a global participant score.

Plexo derives authority in context: participant + process + claim relationship. Declared roles such as owner/executor can provide stronger signal than seniority alone.

### 5. Conflicts — production-backed

Disagreement is preserved instead of silently resolved. An intended process and an observed process can coexist because they answer different questions.

### 6. Derived operational knowledge — production-backed

Synthesis and later stages operate on structured artifacts to derive cross-interview conclusions, bottlenecks and reportable operational findings.

### 7. Unknowns — architectural direction

An operational model should eventually represent not only what is believed, but what remains unresolved: missing owners, weak evidence, contradictions that need another source, and areas not yet explored.

This turns missing context into an input to future investigation instead of an invisible absence.

## Provenance is the invariant

The useful direction of travel is backwards:

```text
Operational conclusion
        ↓
      Claim
        ↓
      Quote
        ↓
    Interview
        ↓
   Participant
```

A readable summary compresses this graph. Compression is useful for humans, but it is dangerous as the system's only state: you cannot reliably tell which sentence supported which conclusion, update one belief independently, or distinguish two conflicting sources.

That is why the system works with evidence-backed claims before it works with polished prose.

## What happens when context changes?

Consider an existing intended-process claim:

```text
Finance approves purchase requests before an order is created.
```

A later interview produces evidence that operations regularly creates urgent orders first and obtains approval afterwards.

The new evidence should not simply overwrite the old claim. The useful state is:

```text
Purchase approval
├── intended: approval before order creation
├── observed: urgent orders can precede approval
└── conflict: policy and execution diverge
```

Now the disagreement itself is operational knowledge.

See [`../examples/context-update.json`](../examples/context-update.json) for a synthetic representation of this update.

## Context selection, not context dumping

**Status: architectural direction.**

As the company model grows, passing everything to every model call becomes the wrong abstraction. A task about purchase approvals should need a bounded view such as:

```text
target process
+ relevant participants
+ evidence-backed claims
+ unresolved conflicts
+ nearby dependencies
+ open questions
```

rather than the complete company corpus.

The goal is not simply token reduction. Scoped context reduces irrelevant evidence, accidental cross-process contamination, and the tendency for a model to invent coherence across unrelated information.

## The feedback loops

### Interview loop

```text
current context
      ↓
what is missing / weak / contradictory?
      ↓
future investigation
      ↓
new evidence
      ↓
validated context update
```

The current production system already maintains structured interview state and evidence artifacts. Using the full accumulated company context to drive the next-best investigation is an architectural direction built on top of that foundation.

### Cross-interview loop

```text
new claim
├── supports existing knowledge
├── contradicts it
├── extends the model
├── changes contextual authority
└── remains uncertain
```

The important property is monotonic evidence history: new information can change what the system believes without erasing why it previously believed something else.

### Operational loop — longer-term direction

```text
operational model
      ↓
recommendation / agent action
      ↓
real-world outcome
      ↓
new evidence
      ↓
updated operational model
```

This is where context becomes infrastructure for agents rather than merely an input to a report.

## Why this matters for agents

Executing company work requires more than retrieving documents. An agent needs to understand process reality, ownership, rules, exceptions, dependencies, uncertainty and evidence.

Plexo's context model is our attempt to build that substrate.

## Related decisions

- [001 — Bounded agent boundaries](decisions/001-multi-agent-boundaries.md)
- [002 — Claims, not summaries](decisions/002-claims-not-summaries.md)
- [003 — LLM proposes; code validates](decisions/003-llm-proposes-code-validates.md)
- [004 — Contextual authority](decisions/004-contextual-authority.md)
- [005 — Preserve conflicts](decisions/005-preserve-conflicts.md)
- [006 — Structured, scoped context](decisions/006-structured-scoped-context.md)
- [007 — Unknowns as first-class state](decisions/007-unknowns-first-class.md)