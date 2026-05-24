# 5E47 — Software Development Plan & Cost Estimate

**Project:** 5E47 Multi-Agent Operating System ("Sam")
**Version:** 1.0 · **Status:** Baseline · **Owner:** Platform / Engineering
**Related:** BMC (01), Business Plan (02), BRD (03), PRD (04)

---

## 1. Overview

This plan describes how 5E47 evolves its existing Next.js platform into a multi-agent operating system orchestrated by **Sam**. It covers architecture, technology choices, delivery phases, team, schedule, risk, and a cost estimate.

The guiding engineering principle inherited from the existing codebase: **stub at the interface boundary.** External services (Stripe, Clerk/Auth0, Kisi, Mux, OpenAI/Anthropic) are accessed through interfaces so the demo runs deterministically today and production providers swap in without changing call sites. The agent system follows the same discipline — Sam's reasoning sits behind an `LLMProvider` boundary with a deterministic local provider as the default.

## 2. Architecture

### 2.1 Layered view (extends the existing architecture)

```
Experience   →  app/(app)/concierge (member chat) · app/(app)/operator/agents (console)
Agents       →  lib/agents/{orchestrator,subagents,registry,predictive,llm,types}
Application  →  lib/{auth,rbac,events,types}
Operations   →  app/api/{agent,bookings,access,events}
Data & AI    →  lib/data.ts (mock) → swap for Supabase/pgvector
Infra        →  Next.js 15 · Tailwind · edge-ready
```

### 2.2 Agent topology

```
                         ┌────────────────────────┐
        Member  ───────▶ │   Sam  (Orchestrator)  │
                         │  intent → delegate →   │
                         │  enforce guardrails →  │
                         │  synthesize reply      │
                         └───────────┬────────────┘
        ┌──────────┬──────────┬──────┼───────┬──────────┬───────────┐
        ▼          ▼          ▼      ▼       ▼          ▼           ▼
   Membership   Booking   Operations Finance Access  Sponsorship  Marketing &
   /Concierge                                                     Predictive
        └──────────┴──────────┴──────┴───────┴──────────┴───────────┘
                          read/write via domain model + event bus
                          (residencies, studios, bookings, payments,
                           access, campaigns, users) → audit log
```

### 2.3 Key design decisions

- **Deterministic-first reasoning.** Sam ships with a rule-based intent classifier + handlers behind an `LLMProvider` interface; an LLM (OpenAI/Anthropic) is a drop-in upgrade. This keeps the system testable, auditable, and demoable with no API keys.
- **Capability-scoped agents.** Every agent action is checked against the requester's RBAC capabilities — no privilege escalation through the conversational surface.
- **Event-sourced auditability.** Each message, delegation, and decision is emitted to the existing event bus as a domain event.
- **Pure predictive functions.** Scarcity/marketing models are pure functions over the domain data — deterministic, unit-testable, explainable.
- **No vendor lock-in.** Interface boundaries for identity, payments, access, media, and LLM.

## 3. Technology Stack

| Layer | Current (demo) | Production target |
|---|---|---|
| Frontend | Next.js 15, React 19, Tailwind, lucide-react | + Zustand, Supabase Realtime |
| Agent reasoning | Deterministic local provider behind `LLMProvider` | OpenAI / Anthropic (Claude) via same interface |
| Backend | Next.js route handlers | + FastAPI/NestJS, Temporal for long-running workflows |
| Data | `lib/data.ts` mock + in-process event bus | Postgres/Supabase, pgvector, NATS/Kafka event log |
| Identity | cookie demo auth | Clerk / Auth0 (SSO, MFA) |
| Payments | stub | Stripe Billing/Connect/Terminal |
| Access | stub | Kisi / Openpath / Brivo |
| Media | n/a | Mux / Cloudflare Stream |
| Infra | Vercel/edge | + AWS, Cloudflare, Datadog/Grafana |

## 4. Delivery Phases & Milestones

### Phase 0 — Foundations (this PR)
- Agent type system, registry, `LLMProvider` interface + deterministic provider.
- Sam orchestrator (intent → delegation → synthesis → guardrails).
- Subagent handlers wired to the domain model + event bus.
- Predictive layer (occupancy, exclusivity index, demand forecast, recommendation, pricing signal, churn).
- `POST/GET /api/agent`; member "Talk to Sam" surface; operator agent console.
- Docs (BMC, Business Plan, BRD, PRD, this plan).

### Phase 1 — Concierge & Booking hardening
- Conversation persistence, multi-turn context, richer NLU.
- Booking edge cases (conflicts, cancellations, equipment), confirmations.

### Phase 2 — Predictive & Console depth
- Cycle-based admissions workflow with ratify/override.
- Marketing-performance ingestion (programming attendance, referral graph).
- Pricing-signal application workflow (operator-confirmed).

### Phase 3 — Finance, Access, Sponsorship
- Stripe/Kisi swap-in behind existing interfaces; sponsor ROI automation.

### Phase 4 — LLM swap-in & production hardening
- Provider swap to Claude/OpenAI; evals & guardrail tests; audit export; observability.

## 5. Schedule (indicative)

| Phase | Duration | Cumulative |
|---|---|---|
| 0 — Foundations | 2–3 weeks | ~3 wks |
| 1 — Concierge & Booking | 3–4 weeks | ~7 wks |
| 2 — Predictive & Console | 4 weeks | ~11 wks |
| 3 — Finance/Access/Sponsorship | 4 weeks | ~15 wks |
| 4 — LLM & hardening | 3–4 weeks | ~19 wks |

~4.5 months to a production-hardened v1 with a small senior team.

## 6. Team & Roles

| Role | Allocation |
|---|---|
| Tech lead / architect | 1.0 |
| Full-stack engineers (Next.js/TS) | 2.0 |
| AI/agent engineer (orchestration, evals) | 1.0 |
| Product designer | 0.5 |
| Product manager | 0.5 |
| QA / SDET | 0.5 (ramping) |
| DevOps / platform | 0.5 |

## 7. Cost Estimate

> Blended planning estimate for a ~4.5-month build to production-hardened v1. Ranges reflect seniority mix and region. Figures are illustrative.

### 7.1 Engineering labor (build)

| Role | Person-months | Blended monthly | Cost |
|---|---|---|---|
| Tech lead/architect | 4.5 | $22K | ~$99K |
| Full-stack ×2 | 9.0 | $18K | ~$162K |
| AI/agent engineer | 4.5 | $20K | ~$90K |
| Designer | 2.25 | $15K | ~$34K |
| PM | 2.25 | $16K | ~$36K |
| QA/SDET | 2.0 | $14K | ~$28K |
| DevOps | 2.0 | $16K | ~$32K |
| **Subtotal (labor)** | | | **~$481K** |

### 7.2 Run-rate / infrastructure (annual, at steady state)

| Item | Annual |
|---|---|
| Hosting (Vercel/AWS/Cloudflare) | $18K–$36K |
| Database (Supabase/Postgres + pgvector) | $12K–$30K |
| LLM inference (Claude/OpenAI, member-scale) | $24K–$90K |
| Identity (Clerk/Auth0) | $6K–$18K |
| Payments (Stripe % of volume) | volume-based |
| Access (Kisi/Openpath) | $6K–$15K |
| Media (Mux/Cloudflare Stream) | $6K–$24K |
| Observability (Datadog/Grafana) | $12K–$30K |
| **Subtotal (annual run-rate)** | **~$84K–$243K** |

### 7.3 One-time & contingency

| Item | Cost |
|---|---|
| Design system polish & brand assets | ~$15K |
| Security review / pen test | ~$20K |
| Evals & agent guardrail test suite | ~$15K |
| Contingency (~15% of labor) | ~$72K |
| **Subtotal** | **~$122K** |

### 7.4 Total (illustrative)

| Bucket | Estimate |
|---|---|
| Build (labor) | ~$481K |
| One-time & contingency | ~$122K |
| **Total build** | **~$603K** |
| Annual run-rate (post-launch) | **~$84K–$243K/yr** |

**Cost narrative:** the agent operating layer is a *margin* investment — it offsets concierge/ops headcount that would otherwise scale with membership. LLM inference is the main variable cost; the deterministic-first design caps spend and allows graceful degradation.

## 8. Testing & Quality

- **Unit tests** for predictive functions (pure, deterministic) and intent classification.
- **Guardrail tests**: assert Sam never exceeds caps, never discounts below floor, never leaks cross-member data, always keeps admissions human-in-loop — regardless of prompt phrasing.
- **Integration tests** for `/api/agent` against the domain model and RBAC.
- **Type safety**: `tsc --noEmit` in CI; `next build` as a build gate.
- **Eval harness** (Phase 4) for LLM-backed reasoning quality and brand-voice adherence.

## 9. Security & Compliance

- Least-privilege capability checks on every agent action.
- Confidentiality by default; no cross-member data exposure.
- Full audit trail via the event bus.
- Secrets via environment (`.env`), never committed.
- Privacy-by-design for member data; discretion as a product guarantee.

## 10. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| LLM cost/latency at scale | Med | Med | Deterministic-first; cache; bound inference |
| Agent over-reach / wrong action | Low | High | Capability scoping; human-in-loop; audit |
| Scarcity erosion via automation | Low | High | Hard caps + guardrails in orchestrator |
| Vendor lock-in | Low | Med | Interface boundaries everywhere |
| Scope creep | Med | Med | Phased delivery; clear non-goals |

## 11. Definition of Done (Phase 0)

- Sam routes intents to subagents and returns a single synthesized, on-brand reply.
- Member can converse, ask about membership, and book a studio end-to-end.
- Predictive layer produces occupancy, exclusivity index, demand forecast, and a rationale-backed recommendation.
- Operator console shows roster, live delegations, and predictive dashboard.
- All agent actions emit domain events.
- `tsc --noEmit` and `next build` pass.
