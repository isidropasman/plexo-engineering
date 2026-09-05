# ADR 003 — LLM proposes; code validates

**Status:** Production-backed

## Problem
An LLM can generate a plausible operational claim that is structurally invalid or weakly supported. Asking another LLM to judge simple invariants keeps deterministic questions probabilistic.

## Options considered
1. Trust extraction output.
2. Use a second LLM as a universal judge.
3. Let the model propose claims, then enforce deterministic evidence invariants in code.

## Decision
Use probabilistic extraction followed by deterministic validation where the rule can be expressed in code.

## Why
Questions such as “does this quote ID exist?” or “is this answer only assent?” should not require another model call. Code can reject unsupported references and calibrate known evidence-quality cases consistently.

## Trade-off
Strict gates can discard information that is useful but weakly evidenced. We prefer a false negative to silently manufacturing operational certainty.