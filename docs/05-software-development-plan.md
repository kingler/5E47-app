# 5E47 — Software Development Plan & Cost Estimate

**Project:** 5E47 Multi-Agent Operating System (Sam, the Concierge Agent)
**Version:** 2.1 · **Status:** Aligned to deck v5.2; operational vocabulary in plain industry-standard terms · **Owner:** Platform / Engineering · **Entity:** Hasenpfeffer Ventures LLC
**Related:** BMC (01), Business Plan (02), BRD (03), PRD (04)

> **Terminology note.** The investor deck uses brand-coined names. This document uses industry-standard equivalents (Production Cycle, Project Slate, Mutual NDA, etc.). See doc 01 for the full glossary.

---

## 1. Overview

This plan describes how Hasenpfeffer Ventures LLC evolves its existing Next.js platform into the production operating system for the Flagship Location at 5 East 47th Street. The system is orchestrated by **Sam, the Concierge Agent** — the single resident-facing conversational surface — and a team of subagents that run the Production Cycle engine, the four-floor production system, the Project Slate, and the Confidentiality & Security Protocol.

The guiding engineering principle inherited from the existing codebase: **stub at the interface boundary.** External services (Stripe, Clerk/Auth0, Kisi, Mux, OpenAI/Anthropic, on-prem GPU compute) are accessed through interfaces so the demo runs deterministically today and production providers swap in without changing call sites. The agent system follows the same discipline — Sam's reasoning sits behind an `LLMProvider` boundary with a deterministic local provider as the default. The architecture is **location-ready**: the same operating system will deploy to LA, London, and Tokyo in Phase II without refactor.

## 2. Architecture

### 2.1 Layered view (extends the existing architecture)

```
Experience    →  app/(app)/concierge (resident chat) · app/(app)/operator/agents (console)
                 app/(app)/sponsor · app/(app)/lp
Agents        →  lib/agents/{orchestrator,subagents,registry,predictive,llm,catalog,types}
Application   →  lib/{auth,rbac,events,security,types}
Operations    →  app/api/{agent,bookings,access,events,slate,security}
Data & AI     →  lib/data.ts (mock) → swap for Supabase/pgvector + on-prem inference
Security      →  lib/security/{mutual-nda,closed-set,private-entry,quarantine}
Infra         →  Next.js 15 · Tailwind · edge-ready · on-prem GPU node for resident SLMs
```

### 2.2 Agent topology

```
                          ┌─────────────────────────┐
        Resident ───────▶ │   Sam  (Orchestrator)   │
                          │   intent → delegate →   │
                          │   enforce guardrails →  │
                          │   synthesize reply      │
                          └───────────┬─────────────┘
        ┌──────────┬──────────┬───────┼────────┬──────────┬───────────┬──────────┐
        ▼          ▼          ▼       ▼        ▼          ▼           ▼          ▼
   Membership  Booking   Operations  Finance  Access  Sponsor    IP Catalog Programming
                                                                 (Project Slate)
        +     Predictive                       +    Growth
        └──────────┴──────────┴───────┴────────┴──────────┴───────────┴──────────┘
                read/write via domain model + event bus
                (cycles, residents, suites, bookings, dues, sponsor anchors,
                slate projects, security events, users) → audit log + catalog registry
```

### 2.3 Key design decisions

- **Deterministic-first reasoning.** Sam ships with a rule-based intent classifier + handlers behind an `LLMProvider` interface; an LLM (Claude/OpenAI) is a drop-in upgrade. Testable, auditable, demoable with no API keys, and resilient when external inference is degraded.
- **Capability-scoped agents.** Every agent action is checked against the requester's RBAC capabilities and the active cycle's state — no privilege escalation through the conversational surface.
- **Event-sourced auditability.** Each message, delegation, Slate transaction, and security event is emitted to the existing event bus as a domain event; the IP Catalog registry is a projection.
- **Pure predictive functions.** Selection-pressure, brand-heat, dues-tier signal, and Slate-readiness models are pure functions over the domain data — deterministic, unit-testable, explainable.
- **Security by construction.** Resident model weights and outputs are stored on-prem and accessed via a quarantine boundary; every cross-boundary call is logged. Private-entry protocol and Closed-Set Policy enforcement are first-class domain events.
- **No vendor lock-in.** Interface boundaries for identity, payments, access, media, LLM, and compute.
- **Location-ready.** All cycle-specific state is namespaced; the operating system deploys per-Location without code changes.

## 3. Technology Stack

| Layer | Current (demo) | Production target |
|---|---|---|
| Frontend | Next.js 15, React 19, Tailwind, lucide-react | + Zustand, Supabase Realtime |
| Agent reasoning | Deterministic local provider behind `LLMProvider` | Claude / OpenAI via same interface; on-prem SLMs for resident-trained models |
| Backend | Next.js route handlers | + FastAPI/NestJS, Temporal for long-running workflows (cycle orchestration, Slate distribution) |
| Data | `lib/data.ts` mock + in-process event bus | Postgres/Supabase, pgvector, NATS/Kafka event log |
| Identity | cookie demo auth | Clerk / Auth0 (SSO, MFA) |
| Payments | stub | Stripe Billing/Connect (entries, dues, royalty distributions) |
| Access | stub | Kisi / Openpath / Brivo + private-entry protocol orchestration |
| Media | n/a | Mux / Cloudflare Stream + on-prem capture restriction |
| Compute (resident SLMs) | n/a | On-prem GPU node inside 5E47 (Floor 6 Post-Production & AI) |
| Infra | Vercel/edge | + AWS, Cloudflare, Datadog/Grafana; on-prem hybrid for security-bound workloads |

## 4. Delivery Phases & Milestones

### Phase 0 — Foundations (this PR)
- Agent type system, registry, `LLMProvider` interface + deterministic provider.
- Sam orchestrator (intent → delegation → synthesis → guardrails).
- Subagent handlers wired to the domain model + event bus.
- Production Cycle lifecycle model (states, transitions, 24-hour acceptance enforcement).
- Predictive layer (selection pressure, brand heat, dues-tier signal, churn).
- `POST/GET /api/agent`; resident "Talk to Sam" surface; operator agent console.
- Docs (BMC, Business Plan, BRD, PRD, this plan) aligned to deck v5.2 in plain industry-standard vocabulary.

### Phase 1 — Concierge & Booking hardening
- Conversation persistence, multi-turn context, richer NLU.
- In-cycle booking edge cases (suite conflicts, render-time scheduling, Private Member Locker assignment).
- 24-hour acceptance state machine with idempotent retries and audit.

### Phase 2 — Predictive & Console depth
- Cycle-based selection workflow with per-slot ratify/override.
- Brand-heat ingestion (referrals, partner-network introductions, salon attendance, sponsor reach).
- Dues-tier signal application workflow (operator-confirmed).
- Cycle control panel + Slate pipeline kanban.

### Phase 3 — Finance, Access, Confidentiality & Security
- Stripe swap-in for $3,500 entries + monthly dues + quarterly royalty distributions.
- Kisi/Openpath swap-in + private-entry protocol orchestration.
- Closed-Set Policy enforcement (capture restrictions, violation logging).
- Mutual NDA digital execution + breach-review workflow.
- Resident model-weight quarantine boundary with audit logging.

### Phase 4 — Project Slate & Sponsorship
- IP Catalog Agent: opt-in workflow at cycle close (Day 81–90).
- Project-level Participation Agreement (70/20/10) digital execution.
- Tamper-evident chain-of-title registry.
- Sponsor Royalty Pool quarterly accounting + reporting.
- Sponsor Activation Lab sprint scheduling.

### Phase 5 — LLM swap-in & production hardening
- Provider swap to Claude/OpenAI behind the existing `LLMProvider` interface.
- Agent evals + guardrail test suite (cycle cap, 24-hour window, security, Slate default-ownership).
- Audit export; observability; security review.
- Location-readiness gate for Phase II (LA).

## 5. Schedule (indicative)

| Phase | Duration | Cumulative |
|---|---|---|
| 0 — Foundations | 2–3 weeks | ~3 wks |
| 1 — Concierge & Booking | 3–4 weeks | ~7 wks |
| 2 — Predictive & Console | 4 weeks | ~11 wks |
| 3 — Finance/Access/Security | 4 weeks | ~15 wks |
| 4 — Project Slate & Sponsorship | 3–4 weeks | ~18.5 wks |
| 5 — LLM & hardening | 3–4 weeks | ~22 wks |

~5.5 months to a production-hardened v1 with a small senior team, including the Project Slate and Confidentiality & Security primitives that distinguish 5E47 from a generic concierge platform.

## 6. Team & Roles

| Role | Allocation |
|---|---|
| Tech lead / architect | 1.0 |
| Full-stack engineers (Next.js/TS) | 2.0 |
| AI/agent engineer (orchestration, evals, predictive) | 1.0 |
| Backend / data engineer (events, Slate registry, compute boundary) | 1.0 |
| Product designer | 0.5 |
| Product manager | 0.5 |
| QA / SDET | 0.5 (ramping) |
| DevOps / platform (cloud + on-prem GPU node) | 0.5 |
| IP & legal liaison (Mutual NDA, Participation Agreement templates) | 0.25 (advisory) |

## 7. Cost Estimate

> Blended planning estimate for a ~5.5-month build to production-hardened v1, including Project Slate and Confidentiality & Security implementation. Ranges reflect seniority mix and region. Figures are illustrative.

### 7.1 Engineering labor (build)

| Role | Person-months | Blended monthly | Cost |
|---|---|---|---|
| Tech lead/architect | 5.5 | $22K | ~$121K |
| Full-stack ×2 | 11.0 | $18K | ~$198K |
| AI/agent engineer | 5.5 | $20K | ~$110K |
| Backend/data engineer | 5.5 | $19K | ~$105K |
| Designer | 2.75 | $15K | ~$41K |
| PM | 2.75 | $16K | ~$44K |
| QA/SDET | 2.5 | $14K | ~$35K |
| DevOps | 2.5 | $16K | ~$40K |
| IP/legal liaison (advisory) | 1.4 | $20K | ~$28K |
| **Subtotal (labor)** | | | **~$722K** |

### 7.2 Run-rate / infrastructure (annual, at steady state)

| Item | Annual |
|---|---|
| Hosting (Vercel/AWS/Cloudflare) | $24K–$48K |
| Database (Supabase/Postgres + pgvector) | $18K–$36K |
| LLM inference (Claude/OpenAI, resident-scale) | $30K–$108K |
| On-prem GPU node (Floor 6, depreciation + power) | $60K–$120K |
| Identity (Clerk/Auth0) | $6K–$18K |
| Payments (Stripe % of volume — entries, dues, royalties) | volume-based |
| Access (Kisi/Openpath + private-entry protocol) | $12K–$30K |
| Media (Mux/Cloudflare Stream + capture restriction systems) | $12K–$36K |
| Observability (Datadog/Grafana) | $12K–$30K |
| Slate / IP registry, chain-of-title infrastructure | $12K–$24K |
| **Subtotal (annual run-rate)** | **~$186K–$450K** |

### 7.3 One-time & contingency

| Item | Cost |
|---|---|
| Design system polish & brand assets | ~$18K |
| Security review / pen test (private-bank grade) | ~$35K |
| Agent evals & guardrail test suite | ~$20K |
| Mutual NDA / Participation Agreement legal template work | ~$25K |
| Contingency (~15% of labor) | ~$108K |
| **Subtotal** | **~$206K** |

### 7.4 Total (illustrative)

| Bucket | Estimate |
|---|---|
| Build (labor) | ~$722K |
| One-time & contingency | ~$206K |
| **Total build** | **~$928K** |
| Annual run-rate (post-launch) | **~$186K–$450K/yr** |

**Cost narrative:** the agent operating layer is the **margin engine** — it offsets concierge/ops headcount that would otherwise scale linearly with residents and Locations. The biggest variable cost shifts (vs. v1.0 of this plan) are the on-prem GPU node required for resident-SLM quarantine (security by construction) and the private-bank-grade security posture. Both are deck-canonical commitments, not optional features.

## 8. Testing & Quality

- **Unit tests** for predictive functions (pure, deterministic) and intent classification.
- **Guardrail tests:** assert Sam never exceeds the 100-resident cycle cap, never bypasses the 24-hour acceptance window, never discounts below the dues-tier floor, never auto-opts a project into the Project Slate, never leaks cross-resident data, always keeps selection human-in-loop — regardless of prompt phrasing.
- **Security tests:** assert capture-restriction enforcement, private-entry protocol correctness, Mutual NDA digital signature validity, quarantine-boundary audit completeness.
- **Slate integrity tests:** assert chain-of-title is tamper-evident, royalty calculations reproducible from the event log.
- **Integration tests** for `/api/agent`, `/api/slate/*`, and `/api/security/*` against the domain model and RBAC.
- **Type safety:** `tsc --noEmit` in CI; `next build` as a build gate.
- **Eval harness** (Phase 5) for LLM-backed reasoning quality and 5E47 brand-voice adherence (private-bank-grade, never salesy).

## 9. Security & Compliance

- Least-privilege capability checks on every agent action.
- Confidentiality by default; no cross-resident data exposure.
- Full audit trail via the event bus; tamper-evident IP Catalog registry.
- Secrets via environment (`.env`), never committed.
- On-prem isolation for resident model weights; quarantine boundary with full logging.
- Private-entry protocol orchestration; capture restriction in no-capture suites.
- Mutual NDA digital execution + breach evidence chain.
- Privacy-by-design across the resident, sponsor, and capital surfaces.

## 10. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| LLM cost/latency at scale | Med | Med | Deterministic-first; cache; bound inference; on-prem SLMs for repeatable workloads |
| Agent over-reach / wrong action | Low | High | Capability scoping; human-in-loop selection; full audit |
| Scarcity erosion via automation | Low | High | Hard 100-resident cap + guardrails in orchestrator |
| Confidentiality & Security breach | Low | Very high | Closed-Set enforcement, Mutual NDA liquidated damages, on-prem quarantine, audit |
| Slate chain-of-title dispute | Low | High | Project-level Participation Agreement signed before Slate execution; tamper-evident registry |
| Vendor lock-in | Low | Med | Interface boundaries everywhere |
| Scope creep (Project Slate, Sponsor portal) | Med | Med | Phased delivery; clear non-goals |
| On-prem compute fragility | Med | Med | Hot-spare GPU capacity; graceful degradation to cloud inference for non-security workloads |

## 11. Definition of Done (Phase 0)

- Sam routes intents to subagents and returns a single synthesized, on-brand reply.
- Resident can converse, accept a selection, pay the $3,500 entry within the 24-hour window, and book a Floor-7 Recording Studio suite end-to-end.
- Predictive layer produces selection pressure, brand heat, dues-tier signal, and a rationale-backed recommendation per cycle.
- Operator console shows cycle control panel, roster, live delegations, and predictive dashboard.
- All agent actions emit domain events.
- `tsc --noEmit` and `next build` pass.

## 12. Location-Readiness for Phase II

The architecture is location-ready by design. To deploy the operating system to LA (the Phase II first location):

- All cycle-, resident-, sponsor-, and Slate-scoped state is namespaced per Location.
- The Confidentiality & Security primitives (Closed-Set, private-entry, Mutual NDA, quarantine) are configurable per Location without code changes.
- The Project Slate IP Catalog is **shared globally** across Locations — one queryable registry; per-Location provenance metadata.
- The agent operating system deploys as a new tenant; no linear concierge/ops headcount per Location.
- Cross-location access (residents authorized to operate across Locations within one cycle cohort) is a Phase II workflow built on the same primitives.

Phase II deployment is **gated on Flagship Location stabilization at Production Cycle 03** (per deck v5.2, Section IX).
