# ADR 006 — Structured, scoped context

**Status:** Architectural direction

## Problem
As operational knowledge grows, putting the entire company corpus into every model context increases noise, cost and accidental cross-process contamination.

## Options considered
1. Pass all available text to every task.
2. Rely on conversation history as memory.
3. Maintain structured company context and construct task-specific views.

## Decision
Evolve toward explicit context views containing only the process, participants, claims, conflicts, dependencies and open questions relevant to a task.

## Why
The production system already uses structured artifacts rather than raw conversation as the only state. Scoped views are the natural next boundary as that model grows.

## Trade-off
Context selection becomes a system in its own right and can omit relevant evidence if boundaries are wrong.

## Note
This document describes architectural direction. This public repository does not claim a completed production context-retrieval engine.