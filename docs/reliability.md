# Reliability

Plexo has two very different reliability problems:

1. **Epistemic reliability** — are operational conclusions actually supported by what people said?
2. **Realtime reliability** — did the voice system behave correctly while collecting that evidence?

Treating both as “LLM quality” hides the useful engineering boundaries.

## 1. Evidence reliability

### No quote, no accepted claim

Extraction is probabilistic. Evidence existence is not.

A proposed claim must resolve to evidence that exists. Structural failures are rejected in code rather than delegated to another model.

The public example is in [`../src/evidence-pipeline/claim-validation.ts`](../src/evidence-pipeline/claim-validation.ts).

### Assent is not evidence

Responses such as “yes”, “exactly”, or “correct” can confirm context conversationally without independently supporting a detailed operational claim. The validator treats assent-only evidence differently from substantive evidence.

### Uncertainty should reduce certainty

Hearsay, vague language and explicit uncertainty should not become high-confidence observed reality. The production validation layer can reject weak cases or cap confidence rather than letting extraction output pass unchanged.

### Source proximity matters

A participant describing work they execute every day is a different source from someone repeating what another team supposedly does. This is especially important for claims about actual execution.

## 2. Authority reliability

Correct evidence can still produce a bad company model if the wrong source dominates reconciliation.

That is why authority is contextual:

```text
participant × process × claim relationship
```

rather than a single global rank.

The production design evolved after an earlier seniority-oriented heuristic performed poorly against declared process ownership in an internal sample. See [`things-we-got-wrong.md`](things-we-got-wrong.md).

## 3. Conflict reliability

A reliable system should not manufacture consensus.

If one source describes intended policy and another describes observed execution, both claims can remain valid artifacts with separate evidence. Synthesis can then surface the gap instead of averaging it away.

This is a reliability property because silently resolving disagreement creates confident but unauditable company context.

## 4. Voice reliability

Voice systems fail on a temporal axis that text evals do not capture.

A transcript can look fine while the experience was broken: the agent spoke too early, stayed muted after a pause, cut off the participant, or skipped a required checkpoint.

The production project includes deterministic evaluation over voice traces for classes of failures including:

- pause/resume behavior,
- mute-after-resume,
- `your_turn` emitted before participant audio actually ended,
- truncated participant responses,
- required-question/checkpoint issues,
- timing and state-transition failures.

### Why traces?

A trace lets us ask concrete questions about sequence and timing:

```text
participant_audio_start
participant_audio_end
agent_turn_signal
pause
resume
checkpoint
...
```

When a failure is an invariant over those events, a deterministic evaluator is more useful than asking a model whether the conversation “felt natural.”

## 5. Provider resilience

Realtime voice introduces infrastructure dependency risk. During production client work, a failure involved both voice-detection/turn behavior and an upstream provider outage. Restoring the interview operation required debugging across those boundaries rather than assuming the prompt was the problem.

A multi-provider fallback approach was subsequently implemented so a single provider failure would not stop the whole interview operation.

This public repository intentionally keeps provider names, routing details and production configuration private. The engineering lesson is the boundary:

```text
Interview state
      ↓
provider adapter / routing boundary
      ↓
realtime provider
```

The interview state should not be conceptually owned by one provider.

## 6. Deterministic checks vs semantic evals

Not every quality question belongs in the same evaluator.

| Question | Best boundary |
|---|---|
| Did the referenced quote exist? | deterministic code |
| Did the session remain muted after resume? | deterministic trace check |
| Was turn signaling temporally invalid? | deterministic trace check |
| Did a required checkpoint happen? | deterministic state/trace check |
| Is this quote genuinely evidence for the claim? | extraction + validation rules; semantic evaluation where needed |
| Did synthesis capture the operational meaning correctly? | semantic/pipeline eval |

The rule is simple: **make deterministic what can be deterministic.** Reserve model judgment for the questions that are actually semantic.

## 7. E2E evaluation

The production project also contains end-to-end checks around the pipeline and browser voice flow, including artifacts such as traces, video/screenshots and scorecards/audits.

The goal is to test boundaries together:

```text
voice behavior
→ interview state
→ evidence
→ claims
→ synthesis
→ operational output
```

Unit tests catch local regressions. E2E runs catch failures caused by the composition of individually reasonable components.

## Reliability philosophy

We do not expect probabilistic systems to become deterministic.

We try to put deterministic boundaries **around** them:

```text
probabilistic generation
        ↓
observable artifacts
        ↓
deterministic invariants where possible
        ↓
semantic evaluation where necessary
```

That is the pattern behind evidence validation, voice traces, contextual authority and the broader context architecture.