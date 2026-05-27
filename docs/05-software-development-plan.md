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
| Compute (resident SLMs) | n/a | On-prem GPU node inside 5E47 (Floor 6 Post-Production & AI — see §3A.1 for hardware tiers) |
| AI Studio creative agents | n/a | Music / Video / 3D / Animation agents driving on-prem open-weight models (see §3A.2 for the model stack) |
| Infra | Vercel/edge | + AWS, Cloudflare, Datadog/Grafana; on-prem hybrid for security-bound workloads |

## 3A. Floor-6 AI Studio — Hardware & Model Stack

> **Canonical source.** This section is the single source of truth for AI Studio hardware tiers (§3A.1), the on-prem model stack (§3A.2), and the AI Studio commercial layer (§3A.3). Other docs (BMC §9, Business Plan §9.5, BRD §5.11, PRD R6, DesignThru §3.4) summarize these for reading-in-context and reference back here for the canonical definition.

The AI Studio is the on-prem creative-compute platform that hosts the Music, Video, 3D, and Animation agents and the per-resident fine-tuned SLMs. Three hardware buildouts are documented; the selection is an investor-stage decision sized to launch ambition.

### 3A.1 Hardware tiers (one-time capex)

| Tier | Compute | Storage & networking | Capex | Capacity |
|---|---|---|---|---|
| **Conservative** | 2× M5 Mac Studio (Ultra) **or** RTX 6000 Ada workstations (creator seats) + 1× 4-GPU **L40S** inference server | 80TB NVMe + 200TB NAS; 10GbE; rack UPS | ~$150K–$250K | ~25 concurrent residents on inference; per-resident SLM fine-tunes queued overnight; primarily LLM + audio/animation workloads |
| **Standard (recommended)** | **5× M5 Mac Studio (Ultra) creator seats + cinema displays** + 2× 8-GPU **H100 / H200** servers (one inference, one fine-tuning) | Tiered NVMe (240TB hot) + 500TB NAS; 25GbE; redundant UPS | ~$500K–$900K | All 100 residents per cycle on inference with headroom; fine-tuning runs in parallel with production; video and 3D models served at near-real-time |
| **Aggressive** | 2–4 node **H200** cluster (16–32× H200) + dedicated 8× H200 fine-tuning rig | Multi-PB tiered storage; 100GbE; N+1 cooling and power; redundant networking | ~$1.2M–$2.5M | Multi-cycle headroom; production-scale video and 3D serving; Phase II Location templating built in |

**Recurring (all tiers).** Power, HVAC, hardware support contracts, replacement parts. Standard tier ≈ **$60K–$120K/yr** in run-rate (depreciation + power + support); see §7.2.

**Creator workstation standard.** Each creator seat is an **M5 Mac Studio (Ultra)** paired with a cinema-grade display (Apple Pro Display XDR / Studio Display) for color-accurate editing and grading; the recommended Standard tier provisions **5× M5 Mac Studio seats**. The Mac Studios run the creative suites (DaVinci Resolve, Logic, Adobe, Nuke) and local LLM/image inference via unified memory, while heavy diffusion/video generation and per-resident SLM fine-tuning run on the H100/H200 servers. Workstation capex (5× M5 Mac Studio + cinema displays ≈ $45K–$85K) is included within the Standard tier capex above.

### 3A.2 On-prem model stack

These open-weight models are the **reasoning core — the "brain" — of the human-facing creative agents** (Music, Video, 3D, Animation): a resident describes what they're making and the agents reason and generate on top of these models. The stack below is **representative and extensible, not a fixed catalog** — it grows with domain-specific models fine-tuned to particular creative-workflow tasks, and the named models are current examples. All models run inside the Floor-6 quarantine boundary; no request or weight crosses the boundary to a third-party API.

| Category | Models | Used by |
|---|---|---|
| General reasoning / code | **DeepSeek-V3** (production reasoning); **DeepSeek-R1** (chain-of-thought); **Llama 3.x / 4** (general + tool-use) | Sam orchestrator (on-prem mode); all subagents for high-discretion workloads; resident direct-endpoint use |
| Multimodal + multilingual | **Qwen3-235B** (text); **Qwen2.5-VL** (vision); **Qwen2.5-Coder** | Sam; Music / Video / 3D / Animation agents; Multi-Format Distribution Pipeline |
| Audio (Music Agent) | **Stable Audio Open**, **MusicGen** | Stem generation, score sketches, sound design, mastering candidates |
| Video (Video Agent) | **Wan 2.2**, **HunyuanVideo**, **LTX-Video** | Shot generation, cut-down, color, multi-format versioning |
| 3D (3D Agent) | **TRELLIS**, **Hunyuan3D-2** | Mesh and scene generation, texturing, LED-volume asset prep |
| Animation (Animation Agent) | **AnimateDiff** family | Motion generation, keyframe interpolation, character animation |
| **Per-resident SLMs** | 7B–32B base (Qwen2.5 or Llama derivatives) fine-tuned during the cycle on each resident's catalog | Called by Music / Video / 3D / Animation agents to bias generations to the resident's style. Weights stored on Floor 6 only; resident owns the weights. |

### 3A.3 AI Studio as a Service (commercial layer)

- **Billing model.** Baseline subscription **$400/mo per resident** during the 90-day cycle (covers a fixed GPU-hour envelope, the per-resident SLM fine-tune, and Music / Video / 3D / Animation agent access). Metered GPU-hours above the envelope are billed through the Finance Agent at a published rate.
- **Quotas & fairness.** A scheduler enforces per-resident envelopes, per-cycle global capacity, and a fairness queue during peak hours.
- **Provenance.** Every generation emits an IP Catalog event (resident, agent, base model, SLM hash, prompt, output hash, timestamp). Slate opt-in inherits this provenance chain.
- **Quarantine.** All inference and fine-tuning happen on Floor 6. Cross-boundary calls are logged via the existing quarantine boundary (see §9 Security).
- **Direct endpoint access (personal laptops, BYOD).** Distinct from the creative agents, residents may connect their own **personal laptops** to the shared inference server's **OpenAI-compatible model endpoints** (e.g., DeepSeek, Qwen, Llama, and the domain-specific models) while on the Floor-6 network. Endpoints are exposed only inside the quarantine boundary, authenticated per resident, capability-scoped to the resident's AI-Studio tier, metered on the same GPU-hour envelope, and provenance-logged. No endpoint is reachable from outside Floor 6; model weights are **served, not downloadable**, so they never leave the building, while a resident's own prompts and generations may be pulled to their laptop consistent with 100% resident ownership.

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

### Phase 6 — AI Studio as a Service
- Floor-6 hardware install (tier per §3A.1) and rack acceptance test.
- On-prem model deployment: DeepSeek-V3 / R1, Qwen3-235B / Qwen2.5-VL, Llama 3.x / 4, plus domain-specific models (audio, video, 3D, animation). See §3A.2 for the canonical model identifiers and roles.
- **Music, Video, 3D, Animation** agents implemented against the same orchestration interface as the existing subagents.
- Per-resident SLM fine-tuning pipeline (opt-in at onboarding; trains during the cycle; weights stored on Floor 6 only).
- AI Studio billing path: baseline subscription + metered GPU-hours via the Finance Agent.
- Provenance logging into the IP Catalog for every generation.
- Operator console adds an AI Studio utilization view (per-agent, per-resident, GPU-hour, capacity headroom).

## 5. Schedule (indicative)

| Phase | Duration | Cumulative |
|---|---|---|
| 0 — Foundations | 2–3 weeks | ~3 wks |
| 1 — Concierge & Booking | 3–4 weeks | ~7 wks |
| 2 — Predictive & Console | 4 weeks | ~11 wks |
| 3 — Finance/Access/Security | 4 weeks | ~15 wks |
| 4 — Project Slate & Sponsorship | 3–4 weeks | ~18.5 wks |
| 5 — LLM & hardening | 3–4 weeks | ~22 wks |
| 6 — AI Studio (parallelizable with 4–5) | 4–6 weeks (overlaps) | ~24–26 wks |

~5.5 months to a production-hardened v1 (Phases 0–5). Phase 6 (AI Studio as a Service) runs partially in parallel with Phases 4–5 once Floor-6 hardware is racked; total wall-clock with AI Studio is ~6 months.

## 6. Team & Roles

| Role | Allocation |
|---|---|
| Tech lead / architect | 1.0 |
| Full-stack engineers (Next.js/TS) | 2.0 |
| AI/agent engineer (orchestration, evals, predictive) | 1.0 |
| ML/AI Studio engineer (creative-domain agents, on-prem model serving, fine-tune pipeline) | 0.75 |
| Backend / data engineer (events, Slate registry, compute boundary) | 1.0 |
| Product designer | 0.5 |
| Product manager | 0.5 |
| QA / SDET | 0.5 (ramping) |
| DevOps / platform (cloud + Floor-6 GPU cluster) | 0.6 |
| IP & legal liaison (Mutual NDA, Participation Agreement templates) | 0.25 (advisory) |

## 7. Cost Estimate

> Blended planning estimate for a ~5.5-month build to production-hardened v1, including Project Slate and Confidentiality & Security implementation. Ranges reflect seniority mix and region. Figures are illustrative.

### 7.1 Engineering labor (build)

| Role | Person-months | Blended monthly | Cost |
|---|---|---|---|
| Tech lead/architect | 6.0 | $22K | ~$132K |
| Full-stack ×2 | 12.0 | $18K | ~$216K |
| AI/agent engineer | 6.0 | $20K | ~$120K |
| **ML/AI Studio engineer** (creative-domain agents, fine-tune pipeline, on-prem model serving) | 4.5 | $22K | ~$99K |
| Backend/data engineer | 6.0 | $19K | ~$114K |
| Designer | 3.0 | $15K | ~$45K |
| PM | 3.0 | $16K | ~$48K |
| QA/SDET | 2.5 | $14K | ~$35K |
| DevOps / on-prem platform (cloud + Floor-6 cluster) | 3.5 | $16K | ~$56K |
| IP/legal liaison (advisory) | 1.4 | $20K | ~$28K |
| **Subtotal (labor)** | | | **~$893K** |

### 7.2 Run-rate / infrastructure (annual, at steady state)

| Item | Annual |
|---|---|
| Hosting (Vercel/AWS/Cloudflare) | $24K–$48K |
| Database (Supabase/Postgres + pgvector) | $18K–$36K |
| LLM inference (Claude/OpenAI fallback for non-quarantined workloads) | $18K–$60K |
| **AI Studio on-prem cluster — depreciation + power + support** (tier-dependent: Conservative $40K–$70K; Standard $90K–$160K; Aggressive $200K–$400K) | $40K–$400K |
| **AI Studio model licensing & ops** (open-weight models are free to run; line covers vector storage, model registry, monitoring) | $12K–$30K |
| Identity (Clerk/Auth0) | $6K–$18K |
| Payments (Stripe % of volume — entries, dues, royalties, AI Studio metering) | volume-based |
| Access (Kisi/Openpath + private-entry protocol) | $12K–$30K |
| Media (Mux/Cloudflare Stream + capture restriction systems) | $12K–$36K |
| Observability (Datadog/Grafana) | $12K–$30K |
| Slate / IP registry, chain-of-title infrastructure | $12K–$24K |
| **Subtotal (annual run-rate)** | **~$166K–$712K** *(low end = Conservative AI Studio tier; high end = Aggressive)* |

### 7.3 One-time & contingency

| Item | Cost |
|---|---|
| Design system polish & brand assets | ~$18K |
| Security review / pen test (private-bank grade) | ~$35K |
| Agent evals & guardrail test suite (incl. creative-agent evals) | ~$28K |
| Mutual NDA / Participation Agreement legal template work | ~$25K |
| AI Studio install, rack, network, and acceptance test | ~$25K |
| Contingency (~15% of labor) | ~$134K |
| **Subtotal** | **~$265K** |

### 7.4 Floor-6 AI Studio hardware (capex, one-time)

Selected at the investor stage per §3A.1:

| Tier | Hardware capex |
|---|---|
| Conservative | ~$150K–$250K |
| Standard (recommended) | ~$500K–$900K |
| Aggressive | ~$1.2M–$2.5M |

### 7.5 Total (illustrative)

| Bucket | Estimate |
|---|---|
| Build (labor) | ~$893K |
| One-time & contingency | ~$265K |
| **Software build subtotal** | **~$1.16M** |
| AI Studio hardware capex (tier-dependent) | $150K–$2.5M |
| **Total build — Conservative tier** | **~$1.31M–$1.41M** |
| **Total build — Standard tier (recommended)** | **~$1.66M–$2.06M** |
| **Total build — Aggressive tier** | **~$2.36M–$3.66M** |
| Annual run-rate (post-launch, tier-dependent) | **~$166K–$712K/yr** |

**Cost narrative.** The agent operating layer is the **margin engine** — it offsets concierge/ops headcount that would otherwise scale linearly with residents and Locations. The biggest variable cost shifts (vs. v1.0 of this plan) are the **Floor-6 AI Studio buildout** (which adds AI Studio as a Service as a 7th revenue stream — see Business Plan §9) and the on-prem GPU compute required for resident-SLM quarantine and the private-bank-grade security posture. Both are deck-canonical commitments — they protect data sovereignty and turn Floor 6 into a billable production surface rather than pure cost.

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
