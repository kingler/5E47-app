# 5E47 — Product Requirements Document (PRD)

**Product:** 5E47 Multi-Agent Operating System — **Sam, the Concierge Agent**
**Version:** 2.1 · **Status:** Baseline for build, aligned to deck v5.2; operational vocabulary in plain industry-standard terms · **Owner:** Product · **Entity:** Hasenpfeffer Ventures LLC
**Related:** BMC (01), Business Plan (02), BRD (03), Software Development Plan (05)

> **Terminology note.** The investor deck uses brand-coined names. This document uses industry-standard equivalents (Production Cycle, Project Slate, Mutual NDA, etc.). See doc 01 for the full glossary.

---

## 1. Product Vision

> *5E47 runs itself like a private bank that produces culture — instant, discreet, with chain-of-title on every artifact.*

Sam is the single face of 5E47's operating layer. Residents talk to Sam from the moment they're selected into a Production Cycle through to alumni status: accept the selection, pay the $3,500 entry, onboard, book suites and render time, manage dues, opt projects into the Project Slate, and exit clean. Sam orchestrates a team of specialist subagents that run the four-floor production system, and continuously runs predictive models so each cycle stays at — or above — full selection pressure.

The deck sells the **factory**. Sam runs it.

## 2. Goals & Non-Goals

**Goals**
- One conversational surface (Sam) for every resident interaction across the 90-day cycle.
- Specialist subagents that execute the building, the cycle engine, and the Project Slate.
- A predictive layer that protects cycle scarcity, measures brand heat, and signals dues tiers within guardrails.
- An operator console for cycle oversight, selection ratification, Slate pipeline review, and security audit.
- Full auditability of every agent action and every Slate transaction.

**Non-Goals (this release)**
- Live external vendor integrations (kept as interface-boundary stubs).
- Native mobile apps.
- Fully autonomous selection (committee ratification retained).
- Multi-Location deployment (Flagship Location only; LA/London/Tokyo is Phase II).

## 3. Personas

| Persona | Role | Primary jobs-to-be-done |
|---|---|---|
| **Selected resident — Maya** (Music, 40% slot) | resident | Accept selection within 24 hours, book Floor-7 Recording Studios, manage dues, opt project into Project Slate |
| **Prospect (referred)** | invited | Understand the Production Cycle, learn the Project Participation Agreement, complete the Mutual NDA |
| **Jules — Operator / Committee chair** | operator | Oversee cycles, ratify selections, hold the Confidentiality & Security Protocol, review Slate greenlights |
| **Priya — Sponsor anchor** | sponsor | Secure category-exclusive anchor slot, see Sponsor Royalty Pool reporting, run Sponsor Activation Lab sprints |
| **Henry — Capital partner / LP** | investor | See cycle fill, Slate pipeline, royalty distributions, revenue floor + IP upside |
| **Media partner — Reza** | media | View first-look windows on Slate projects, schedule distribution |

## 4. The Agent System

### 4.1 Sam — Orchestration Agent (the Concierge Agent)

**Role:** the only agent residents talk to directly. Sam classifies intent, delegates to the right subagent(s), enforces brand and security guardrails, and returns a single private-bank-grade response.

**Responsibilities**
- Classify intent (residency lifecycle, booking, finance, access, sponsorship, Slate, predictive/insight, general).
- Delegate to subagents and synthesize their results into one reply.
- Enforce hard guardrails: 100-resident cap, 24-hour acceptance, no public funnel, no discount below floor, Closed-Set Policy, Mutual NDA, default-to-100%-resident-ownership.
- Surface predictive insight contextually (e.g., "this cycle is oversubscribed at 1.6×; your slot is being held for 24 hours").
- Escalate to humans with full context when needed.

**Tone:** warm, precise, discreet. Private-bank vocabulary, not creator-economy noise. Confidentiality assumed; never salesy; never effusive.

### 4.2 Subagents

| Subagent | Canvas block | Capabilities | Example resident ask |
|---|---|---|---|
| **Membership** | Segments, Relationships | Selection acceptance, onboarding, lifecycle status, referrals | "I was just selected — what do I need to do?" |
| **Predictive** | Activities (selection / scarcity) | Pipeline scoring, oversubscription forecast, fill/hold/escalate per slot | (operator) "What's the Music slot looking like for cycle 03?" |
| **Booking** | Key Activities | Suite, render time, Virtual Production Stage, Private Member Locker, listening session reservations | "Book the Vocal Isolation Booth Wednesday afternoon." |
| **Operations** | Activities / Cost | Facility status, cycle open/close, exceptions, general ops | "Is Floor 6 active tonight?" |
| **Finance** | Revenue Streams | $3,500 entry, monthly dues balance, dues-tier signal, royalty distributions | "What's my dues status this cycle?" |
| **Access** | Key Resources | Floor grants, private-entry protocol scheduling, vehicle routing | "I'm arriving via Madison side at 9pm with one guest." |
| **Sponsor** | Partnerships | Anchor slot management, Royalty Pool reporting, Sponsor Activation Lab scheduling | (sponsor) "Show me Q3 royalty distribution." |
| **IP Catalog (Project Slate)** | Key Activities (Slate) | Opt-in workflow, Participation Agreement execution, chain-of-title, distribution windows | "I want to take my cycle 02 EP into the Slate." |
| **Programming** | Channels — programming | Floor-5 salons, listening sessions, sponsor receptions | "What's on the Floor-5 calendar this week?" |
| **Growth** | Channels — acquisition | Referral cultivation, partner-network sourcing, brand-heat amplification | (operator) "Generate the cycle 04 referral packet." |
| **Music** *(AI Studio)* | Activities — creative generation | Production, arrangement, sound design, mastering against on-prem audio models (Stable Audio Open, MusicGen) and the resident's audio SLM | "Draft three vocal-forward arrangement options in my style for the bridge." |
| **Video** *(AI Studio)* | Activities — creative generation | Shot generation, cut-down, color, editorial assembly against on-prem video models (Wan 2.2, HunyuanVideo, LTX-Video) and the Virtual Production Stage | "Cut a 30-second teaser from today's stage capture, color-matched to my reference." |
| **3D** *(AI Studio)* | Activities — creative generation | Mesh and scene generation, texturing, render direction against on-prem 3D models (TRELLIS, Hunyuan3D-2) and the LED-volume pipeline | "Generate a photoreal interior set from this floor plan; export for Unreal." |
| **Animation** *(AI Studio)* | Activities — creative generation | Motion generation, keyframe interpolation, character animation against on-prem motion models (AnimateDiff family) and a motion-style SLM | "Animate this character cycle in my reference style; 24fps, 4 seconds." |

### 4.3 Orchestration flow

```
Resident ──▶ Sam (the Concierge Agent)
              │  1. classify intent (+ confidence)
              │  2. select subagent(s) by intent × capability × cycle state
              ├──▶ Subagent.handle(context) ──▶ result + actions
              │  3. consult predictive layer if relevant
              │  4. enforce guardrails (cap, 24-hr window, security,
              │     no-discount, Slate default-ownership)
              │  5. synthesize one reply in 5E47 voice
              ▼
        Reply + actions + delegation trace
        (logged as domain events; Slate transactions also entered into the IP Catalog registry)
```

## 5. Predictive Layer (Selection, Brand Heat, Dues)

The Predictive Agent computes, from the live domain data:

| Output | Definition | Use |
|---|---|---|
| **Cycle fill** | seats filled ÷ 100, per resident-mix slot (Music 40 / Content-AI 30 / Film-TV 20 / Ops 10) | Core scarcity metric |
| **Selection-pressure index** (0–100) | composite of oversubscription ratio + referral momentum + brand-heat | Scarcity signal per cycle |
| **Oversubscription ratio** | qualified prospects in pipeline ÷ open slots | Demand intensity |
| **Brand-heat index** | momentum from sponsor reach, editorial signal, salon attendance, partner-network introductions | Marketing performance |
| **Recommendation** | per-slot `fill N` / `hold` / `escalate-selection` with rationale | Cycle decision (committee-ratified) |
| **Dues-tier signal** | residency-dues multiplier in **[1.00, 1.25]** per tier, never below floor | Dynamic in-cycle pricing |
| **Churn / disengagement risk** | per-resident signal from booking recency, output progress, dues status | Mid-cycle intervention |
| **Slate-readiness score** | per-project signal at Day 60–80 from output telemetry + curator review | Greenlight prioritization |

**Guardrails encoded:** Cycle cap = 100, immutable. 24-hour acceptance window, immutable. Dues never below tier floor. Selection recommendations are advisory until ratified.

## 6. Functional Requirements & User Stories

### Resident — Selection & Onboarding
- **US-1** As a selected resident, I receive Sam's notification, accept and pay the $3,500 entry, and complete the Mutual NDA signing — all in one conversation, within 24 hours.
- **US-2** As a prospect, I can ask Sam to explain how Production Cycles work, what the Project Participation Agreement means, and what the Confidentiality & Security Protocol requires.
- **US-3** As a resident, I get answers framed in 5E47's discreet, private-bank-grade voice.

### Resident — In-cycle Bookings & Access
- **US-4** As a resident, I can ask Sam to book the Vocal Isolation Booth, the Virtual Production Stage, render time, or a Private Member Locker for N hours/days and receive a cost + confirmation.
- **US-5** As a resident, booking respects my dues-tier entitlements and floor-access tiers; ineligible requests are declined gracefully.
- **US-6** As a high-profile resident, I can schedule private-entry protocol arrival (vehicle route, time window) through Sam.

### Resident — Finance & Dues
- **US-7** As a resident, I can ask Sam my $3,500 entry status, current monthly dues balance, and remaining cycle days.
- **US-8** As a sponsor, I can ask Sam for my Q[n] Sponsor Royalty Pool distribution.

### Resident — AI Studio as a Service
- **US-AS-1** As a resident, I can ask Sam to direct the Music / Video / 3D / Animation Agent in natural language (e.g., *"draft three vocal arrangement options in my style"*). Sam routes to the right creative agent, returns the result inline, and logs provenance into the IP Catalog.
- **US-AS-2** As a resident, I can opt my catalog into a **per-resident SLM fine-tune** at onboarding; the SLM trains during the cycle on Floor 6 and is called by the creative agents to bias generations to my style. I own the weights; they never leave the building.
- **US-AS-3** As a resident, I can ask Sam for my AI Studio balance: included GPU-hour envelope used, metered overage so far, projected end-of-cycle cost.
- **US-AS-4** As an operator, I can see AI Studio utilization (per-agent, per-resident, GPU-hour) on the operator console and forecast capex headroom against the active hardware tier.

### Resident — Project Slate Opt-In
- **US-9** As a resident at Day 81–90, I can ask Sam to opt my project into the Project Slate; Sam walks me through the project-level Participation Agreement (70/20/10), chain-of-title metadata, and distribution windows.
- **US-10** As a resident, I retain 100% ownership by default; Sam never auto-opts a project into the Slate.

### Operator — Cycle Oversight
- **US-11** As an operator, I can see the live cycle state: fill per slot, selection pressure, days remaining, exception queue, Slate pipeline.
- **US-12** As an operator, I can review Sam's per-slot selection recommendation and ratify or override it (human-in-the-loop).
- **US-13** As an operator, I can review and greenlight Slate opt-ins at cycle close.
- **US-14** As an operator, I can audit a trace of agent delegations, decisions, and Slate transactions.

### Operator — Confidentiality & Security
- **US-15** As an operator, I can see security events (Closed-Set flags, private-entry protocol usage, Mutual NDA executions, data-quarantine boundary crossings) on a single audit pane.
- **US-16** As an operator, I can initiate a Mutual NDA breach review with one click; Sam packages the evidence chain.

### Sponsor & Capital
- **US-17** As a sponsor, I can see my anchor slot, Sponsor Royalty Pool participation, and Sponsor Activation Lab sprint calendar.
- **US-18** As a capital partner, I can see cycle fill history, Slate pipeline depth, royalty distributions, and a fixed-revenue-floor view.

### Cross-cutting
- **US-19** As any user, every agent action I trigger is recorded as a domain event; Slate-related actions also produce an IP Catalog registry entry.
- **US-20** As 5E47, Sam never violates the strategic guardrails (cycle cap, 24-hour window, no public funnel, no discount below floor, Confidentiality & Security Protocol, default 100% resident ownership) regardless of how a request is phrased.

## 7. UX & Surfaces

- **"Talk to Sam" (resident concierge)** — `/(app)/concierge`: chat interface, suggested prompts contextual to cycle state (Day 5 prompts ≠ Day 85 prompts), delegation chips showing which subagent answered, action confirmations (booking created, dues paid, Slate opt-in executed).
- **Agent Operations Console (operator)** — `/(app)/operator/agents`: cycle control panel (fill per slot, days remaining), agent roster with status, live delegation feed, predictive dashboard (selection pressure, brand heat, recommendation card with ratify/override), security audit pane, Slate pipeline kanban.
- **Sponsor Portal** — `/(app)/sponsor`: anchor slot status, Royalty Pool reporting, Sponsor Activation Lab calendar.
- **Capital Portal** — `/(app)/lp`: cycle history, Slate pipeline, revenue-floor view, royalty distribution log.
- **Brand voice & visual.** Editorial dark surface, serif display, restrained accent. Sam's surface feels like a concierge desk at a private bank, not a chatbot widget.

## 8. API Surface

- `POST /api/agent` — body `{ message, conversationId?, cycleId? }`; returns `{ reply, intent, delegations[], actions[], suggestions[] }`. Scoped to the authenticated user's role and active cycle.
- `GET /api/agent` — returns `{ agents[], systemStatus, cycleState }` for the operator console.
- `POST /api/slate/optin` — opt-in workflow; emits Participation Agreement execution + chain-of-title entry.
- `GET /api/slate/registry` — queryable IP Catalog (capabilities-scoped).
- `POST /api/security/event` — Closed-Set / Mutual NDA event ingest (system + operator entry points).
- (Predictive outputs are computed server-side and surfaced via the orchestrator and operator/sponsor/LP consoles.)

## 9. Success Metrics

| Metric | Target |
|---|---|
| Requests resolved by Sam without handoff | ≥ 80% |
| 24-hour acceptance window compliance | 100% |
| Cycle cap breaches | 0 |
| Predictive cycle coverage | 100% of cycles produce a rationale-backed recommendation |
| Agent action auditability | 100% |
| Slate chain-of-title integrity | 100% (tamper-evident) |
| Verified Confidentiality & Security breaches | 0 (or fully audited + adjudicated when they occur) |
| Perceived response latency | < 2s |

## 10. Release Plan (product view)

- **R1 — Concierge & Booking:** Sam + Membership + Booking subagents; resident chat; cycle lifecycle events; audit log.
- **R2 — Predictive & Console:** Predictive Agent; operator console; cycle control panel; selection-pressure dashboard; ratify/override.
- **R3 — Finance, Access, Confidentiality & Security:** Finance, Access subagents; Closed-Set Policy enforcement; private-entry protocol; Mutual NDA execution; data-quarantine boundary.
- **R4 — Project Slate & Sponsorship:** IP Catalog Agent; opt-in workflow; Participation Agreement digital execution; chain-of-title registry; Sponsor Royalty Pool reporting; Sponsor Activation Lab scheduling.
- **R5 — Programming, Growth & Hardening:** programming + growth subagents; LLM provider swap-in behind the interface; agent evals; analytics polish; audit export; location-readiness review for Phase II.
- **R6 — AI Studio as a Service:** Music / Video / 3D / Animation agents wired to on-prem model stack (DeepSeek-V3 / R1, Qwen3-235B / Qwen2.5-VL, plus domain-specific models — see SDP §3A.2); per-resident SLM fine-tune workflow on Floor 6 GPU compute; IP Catalog provenance logging; AI Studio metering, billing, and operator utilization view.

## 11. Open Questions

- Exact dues-tier ladder during the 90-day cycle (input from Finance / operations).
- Whether the dues-tier signal auto-applies after operator ratification or always requires per-change confirmation (default: per-change confirmation).
- Salon attendance and partner-network introduction events as first-class brand-heat inputs (data sources TBD).
- Exact Slate greenlight criteria (operator + committee input; Sam pre-scores).
- Cross-location access UX shape for Phase II (deferred).
