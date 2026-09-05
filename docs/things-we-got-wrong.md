# Things We Got Wrong

Good architecture is usually the residue of wrong assumptions that became measurable.

This page documents failures that changed how we think about Plexo. It is intentionally narrower than a retrospective: only stories we can defend from production work belong here.

## 01 — We treated seniority as too strong a proxy for authority

### Original assumption

A reasonable first heuristic was that senior participants were more likely to be authoritative about process ownership and design.

That sounds sensible. It is also incomplete.

A director may understand why a process exists while an analyst actually owns it. A manager may know the official flow while an operator knows every exception that makes the real flow different.

### Measurement

An internal comparison documented alongside the production authority logic tested the earlier seniority-oriented gate against declared process ownership.

In that sample, the heuristic agreed only about **66%** of the time.

The useful part was not just the number. The error pattern was asymmetric: the heuristic was missing real process owners rather than producing a clean random spread of mistakes.

### Why this was dangerous

Extraction could be perfectly accurate and the final model could still be wrong.

```text
correct quote
   ↓
correct claim
   ↓
wrong authority assignment
   ↓
wrong operational conclusion
```

This made authority a context-model problem, not merely an extraction problem.

### Architectural change

We moved away from treating seniority as the dominant proxy and toward authority derived in context:

```text
participant
+ process
+ claim relationship
+ declared process role
        ↓
contextual authority
```

For example, an owner can be a strong source for intended process design while an executor can be the better source for observed execution and exceptions.

### Lesson

**Who should we believe?** is not a property of a person. It is a property of a person relative to a process and a claim.

That insight now influences how we think about the entire context engine: context quality depends not only on collecting evidence, but on preserving where that evidence came from and why a source should matter for this particular question.

---

## Why keep this page public?

Because the interesting engineering story is not that the current architecture looks reasonable in hindsight.

It is that a reasonable assumption failed, we measured the failure, and the data forced a better abstraction.

More failure stories will only be added here when they are backed by production evidence or a directly defensible incident.