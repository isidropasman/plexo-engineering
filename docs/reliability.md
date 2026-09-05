# Reliability

AI systems that interact with employees and reconstruct operations fail in more ways than “the model gave a bad answer.” Plexo treats reliability as a set of observable failure modes across evidence, reasoning, and voice interaction.

## Evidence reliability

The production extraction layer follows a strict principle:

> **No direct quote, no claim.**

An LLM can propose a claim, but code checks whether its cited evidence actually exists before the claim becomes part of the operational model.

The validator also guards against subtler failure modes.

### Assent is not evidence

A voice interviewer can accidentally introduce a conclusion and then ask for confirmation:

> “So approvals are the bottleneck, right?”
>
> “Yes, exactly.”

The participant's answer is a real utterance, but it does not independently contain the substance of the claim. Treating it as evidence would let the interviewer manufacture its own confirmation.

Plexo therefore detects assent-only evidence and rejects claims that rely exclusively on it.

### Weak sources are treated differently

A specific first-hand example from someone doing the work is not equivalent to “I heard that this sometimes happens” from someone far from the process.

Source metadata includes proximity to the work and relationship to the process. Reality claims backed only by weak, distant, hearsay evidence can be rejected rather than promoted into the company model.

### Uncertainty changes confidence

Language such as “I think,” “probably,” or “I'm not sure” is not discarded automatically. Depending on the claim, it can cap confidence or cause a quantified claim to be rejected when there is not enough context.

The simplified public validator lives in [`claim-validation.ts`](../src/evidence-pipeline/claim-validation.ts).

## Reasoning reliability

### Preserve disagreement

When two interviews disagree, forcing a single answer can be worse than returning uncertainty.

Plexo explicitly distinguishes intended process from observed reality. If a process owner describes how purchasing should work and an operator gives direct evidence that execution differs, synthesis can preserve a design-vs-reality conflict.

That conflict is itself valuable operational information.

### Contextual authority

Authority is not a property of a person's job title alone. A person can own one process and merely observe another.

The system therefore derives relationship-to-process at a more local level and combines declared process roles with other signals instead of giving every statement from a senior participant the same weight.

## Voice reliability

Voice introduces a separate class of engineering problems: turn timing, interruption, silence, pause/resume behavior, audio truncation, state synchronization, and provider failures.

The production project has a deterministic voice-eval layer built around observable traces rather than subjective “this conversation felt good” evaluation. Trace events can represent stage changes, checkpoints, UI/audio state, participant speech, and tool activity. The evaluator can then produce findings tied back to event indexes.

Current classes of checks in the production system include:

- pause/resume behavior,
- sessions that remain silent after resume,
- UI turn state changing before agent audio has actually finished,
- truncated participant responses,
- required questions being asked, answered, and recorded,
- missing, early, duplicate, or unresolved checkpoints.

The same evaluation idea can be used against a mock transport, a browser E2E session, or a real provider.

## Provider failure strategy

A production voice system should not assume that one external provider is permanently available. Plexo's reliability work includes designing the voice layer so provider-specific transport concerns are isolated from higher-level interview state, making fallback and recovery possible without rewriting the interview logic.

The public repository intentionally keeps provider routing details out; the important architectural property is the separation between **interview state**, **observable trace**, and **transport/provider implementation**.

## E2E evaluation

The private codebase includes end-to-end evaluation that exercises the interview and downstream pipeline, plus browser-level voice runs that retain debugging artifacts such as traces, screenshots/video on failure, scorecards, and interview audits.

This matters because many failures only emerge across boundaries:

```text
question generation
      ↓
voice turn
      ↓
transcript
      ↓
claim extraction
      ↓
validation
      ↓
synthesis
```

A unit test can prove each function works in isolation while the overall interview still loses an answer or produces a misleading report.

## Reliability philosophy

The pattern across the system is consistent:

1. Make important state observable.
2. Preserve provenance across agent boundaries.
3. Convert subjective failure modes into explicit invariants where possible.
4. Let probabilistic models propose; enforce hard product rules in code.
5. Prefer an unresolved conflict over a confident unsupported conclusion.

That is the difference between a convincing AI demo and an AI system that can be trusted with operational knowledge.
