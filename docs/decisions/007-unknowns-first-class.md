# ADR 007 — Unknowns are first-class state

**Status:** Architectural direction

## Problem
A knowledge system that stores only confident conclusions cannot distinguish “false” from “we have not established this yet.” Missing ownership, weak evidence and unresolved conflicts disappear from view.

## Options considered
1. Store only accepted conclusions.
2. Encode uncertainty only in prose.
3. Represent unresolved questions and weak/contradictory areas explicitly.

## Decision
Evolve the operational context toward explicit unknown state that can drive future investigation.

## Why
Knowing what is missing is actionable. A missing process owner or unresolved contradiction can become a targeted question in a later interview instead of remaining an invisible hole in the model.

## Trade-off
The system must manage the lifecycle of questions and uncertainty rather than only accumulating facts.

## Note
This is architectural direction built on the current evidence/conflict model; it is not presented here as a finished production subsystem.