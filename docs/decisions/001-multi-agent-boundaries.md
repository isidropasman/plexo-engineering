# ADR 001 — Bounded stages instead of one giant agent

**Status:** Production-backed

## Problem
Interviewing, extracting evidence, assigning authority, reconciling sources, analyzing bottlenecks and writing a report have different failure modes. One agent doing all of them makes failures difficult to localize or evaluate.

## Options considered
1. One large agent with the full transcript and one final output.
2. Multiple agents but free-form text between stages.
3. Bounded stages with structured artifacts between them.

## Decision
Use bounded stages with explicit artifacts/contracts between major transformations.

## Why
A bad final conclusion can be traced to a stage: evidence, extraction, validation, authority, synthesis or presentation. Intermediate outputs can be tested and rejected independently.

## Trade-off
More orchestration, more schemas and more interfaces to maintain. We accept that complexity in exchange for inspectability and failure isolation.