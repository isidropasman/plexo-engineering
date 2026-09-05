# ADR 005 — Contradictions are data

**Status:** Production-backed

## Problem
Different employees can give conflicting but locally correct descriptions of the same process. Collapsing them into one answer can erase the difference between policy and reality.

## Options considered
1. Pick the most senior source.
2. Average or summarize conflicting statements.
3. Preserve conflicting claims with provenance and relationship to the process.

## Decision
Keep disagreement explicit when the evidence supports multiple views, especially intended versus observed process reality.

## Why
The gap between “how this should work” and “how this actually works” is often the operational finding Plexo is trying to surface.

## Trade-off
Downstream stages must reason over unresolved state instead of receiving one convenient truth.