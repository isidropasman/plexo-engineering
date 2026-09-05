# ADR 004 — Authority is contextual

**Status:** Production-backed

## Problem
Job seniority is a weak proxy for operational knowledge. A manager may know intended policy while an operator is the better source for actual execution and exceptions.

## Options considered
1. Give every participant equal weight.
2. Assign one global authority score from title/seniority.
3. Derive authority from participant + process + claim relationship, incorporating declared process roles.

## Decision
Authority is contextual rather than global.

## Why
The source that should dominate an `intended_process` claim may be different from the source that should dominate an `actual_process` claim. Production work also showed that seniority alone missed real process owners.

## Trade-off
Reconciliation becomes more complex: the same participant can carry different authority across processes and claim types. That complexity reflects the organization rather than hiding it.