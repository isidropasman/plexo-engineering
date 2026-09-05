# ADR 002 — Claims instead of summaries

**Status:** Production-backed

## Problem
A transcript summary is easy to read but destroys the fine-grained link between a conclusion and the exact evidence that supports it. It is also difficult to update one belief without regenerating the whole summary.

## Options considered
1. Store only raw transcripts.
2. Store transcript + generated summary.
3. Extract atomic typed claims that retain quote provenance.

## Decision
Use evidence-backed claims as the durable intermediate representation. Summaries and reports are downstream projections.

## Why
Claims are independently inspectable, composable and comparable across interviews. They preserve the chain `conclusion → claim → quote → interview → participant`.

## Trade-off
The system carries more structured state and must reconcile many small artifacts instead of one convenient paragraph.