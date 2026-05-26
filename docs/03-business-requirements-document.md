# 5E47 — Business Requirements Document (BRD)

**Project:** 5E47 Multi-Agent Operating System (Sam, the Concierge Agent)
**Document type:** Business Requirements Document
**Version:** 2.1 · **Status:** Aligned to deck v5.2; operational vocabulary in plain industry-standard terms · **Owner:** Hasenpfeffer Ventures LLC (Product & Operations)
**Related docs:** Business Model Canvas (01), Business Plan (02), PRD (04), Software Development Plan (05)

> **Terminology note.** The investor deck uses brand-coined names (Volume, 47 Slate, Sovereignty Protocol, Circle of Trust, Dark Floor Policy, Genesis Node). This document uses industry-standard equivalents (Production Cycle, Project Slate, Confidentiality & Security Protocol, Mutual NDA with Liquidated Damages, Closed-Set Policy, Flagship Location). See the canvas (doc 01) for the full glossary.

---

## 1. Purpose & Background

5E47 operates **Private Cultural Infrastructure** at 5 East 47th Street, New York City — a four-story vertical engine (Floors 4–7) that turns raw talent into institutional-grade luxury IP. The building runs as 90-day **Production Cycles** (100 residents per cycle, 4 cycles per year, $3,500 non-refundable per-resident entry, 24-hour acceptance window).

The investor narrative (deck v5.2) sells the factory. This BRD specifies the **operating layer** beneath it: a multi-agent system fronted by **Sam, the Concierge Agent** — the single conversational surface every resident interacts with throughout their cycle. Sam delegates to specialist subagents that run selection logistics, in-cycle bookings, dues, access, sponsor activations, Project Slate administration, and ongoing facility operations — at near-zero marginal concierge cost.

The existing platform is a Next.js multi-tenant codebase with role-scoped workspaces (resident, operator, sponsor, capital partner), RBAC, an event bus, and a mock data layer designed to swap to production services. This BRD defines the requirements to evolve it into the production operating system for the Flagship Location.

## 2. Business Objectives

| # | Objective | Success measure |
|---|---|---|
| BO-1 | Provide a single conversational concierge (Sam) for every resident interaction | ≥80% of resident requests resolved in-conversation without human handoff |
| BO-2 | Automate Production Cycle orchestration via subagents (selection logistics, bookings, dues, access) | Reduce manual concierge/ops effort per resident vs. headcount-scaled baseline |
| BO-3 | Protect the cycle's scarcity discipline | 100 residents per cycle cap never exceeded; 24-hour acceptance window enforced |
| BO-4 | Run predictive selection & marketing models | Each cycle produces a data-backed selection-pressure recommendation with rationale |
| BO-5 | Enforce the Confidentiality & Security Protocol | Closed-Set Policy, private-entry protocol, Mutual NDA, and data quarantine enforced in code |
| BO-6 | Administer the Project Slate cleanly | 100% chain-of-title integrity; quarterly auditable Sponsor Royalty Pool accounting |
| BO-7 | Maintain margin as the Flagship Location scales and replicates | Cycle + Location growth decoupled from concierge/ops headcount |
| BO-8 | Offer **AI Studio as a Service** — on-prem creative-domain agents (Music, Video, 3D, Animation) directable through Sam | Baseline AI Studio adoption by ≥75% of cycle residents; ≥70% gross margin on metered GPU-hours above baseline |

## 3. Scope

### 3.1 In scope

- **Sam orchestration agent** — intent classification, delegation, single synthesized response, guardrail enforcement.
- **Subagents** — Membership, Predictive, Booking, Access, Finance, Sponsor, IP Catalog (Project Slate), Programming, Growth, Operations, and the **AI Studio creative-domain agents** (Music, Video, 3D, Animation).
- **Resident-facing conversational interface** ("Talk to Sam") covering the full cycle lifecycle: selection acceptance → onboarding → in-cycle bookings → close + Project Slate opt-in.
- **Predictive layer** — selection-pressure modeling, cycle oversubscription forecasting, brand-heat measurement, sponsor-anchor pipeline, dues-tier signal within scarcity guardrails.
- **Operator-facing agent console** — Production Cycle control panel, agent roster, live delegation/activity, predictive dashboard, human-in-the-loop committee ratification.
- **Confidentiality & Security primitives** — Closed-Set Policy enforcement (capture detection / restrictions), private-entry protocol (vehicle routing, timed access), Mutual NDA digital execution + breach logging, data-residency quarantines for resident SLMs.
- **Project Slate administration** — opt-in workflow, project-level Participation Agreement execution (70/20/10), chain-of-title registry, distribution-window scheduling, quarterly royalty-pool accounting.
- **Integration with existing domain model** — Production Cycles, residents, suites/floors, bookings, dues, access events, sponsor anchors, Slate projects, the event bus, RBAC.
- **Auditability** — every agent decision, delegation, and Slate transaction recorded as a domain event.

### 3.2 Out of scope (this phase)

- Replacing stubbed external integrations (Stripe, Clerk/Auth0, Kisi, Mux, on-prem GPU compute) with live credentials — interface boundaries remain; swap-in is a later phase.
- Native mobile applications.
- Multi-Location expansion beyond the Flagship Location (architecture is location-ready; LA/London/Tokyo deployment is Phase II).
- Fully autonomous selection (committee ratification is retained by design).

## 4. Stakeholders

| Stakeholder | Interest |
|---|---|
| Residents (cycle cohort: 40% Music / 30% Content-AI / 20% Film-TV / 10% Ops) | Fast, discreet, private-bank-grade service via Sam across the 90-day cycle |
| Selection committee / operators | Cohort quality, cycle scarcity, security enforcement, exception handling |
| Sponsor anchors | Royalty Pool participation, ROI reporting, category exclusivity |
| Capital partners / LPs | Cycle entry + dues + Slate House share + sponsor activations as a defensible recurring base |
| Media & tech partners | First-look windows on Project Slate output (media); embedded compute & tooling inside the building (tech) |
| Hasenpfeffer Ventures LLC / founders | Brand integrity, margin protection, multi-location replication readiness |
| Platform / engineering | Maintainable, auditable, swappable agent architecture |

## 5. Business Requirements

### 5.1 Cycle orchestration & residency lifecycle (Sam + Membership Agent)

- **BR-1** Prospects and residents shall interact with 5E47 through Sam — the single conversational surface — from invitation through alumni status.
- **BR-2** Sam shall manage the full cycle lifecycle stages: invited → selected → accepted-and-paid → onboarded → resident → output-reviewed → Slate opt-in (if applicable) → alumni.
- **BR-3** Sam shall enforce **selection precedes payment, payment precedes entry** — there is no public-facing application funnel.
- **BR-4** Sam shall enforce the **24-hour acceptance window**: a selected resident has 24 hours to accept and pay the $3,500 non-refundable entry; otherwise the seat reverts.
- **BR-5** Selection shall remain **human-in-the-loop**: Sam pre-scores and packages applicants; the committee ratifies.

### 5.2 In-cycle bookings & services (Booking Agent)

- **BR-6** Residents shall book suites, render time, Virtual Production Stage hours, listening sessions, and Private Member Locker reservations by asking Sam in natural language.
- **BR-7** Sam shall respect role capabilities, dues-tier entitlements, and floor-access tiers (only eligible residents can book restricted resources).
- **BR-8** Sam shall return cost, time, confirmation, and record the booking against the resident's active cycle in the domain model.

### 5.3 Operations (Operations Agent)

- **BR-9** Sam shall handle day-to-day operational requests (access questions, facility status, exception handling, cycle open/close transitions) and escalate when human action is required.

### 5.4 Predictive selection & marketing (Predictive Agent)

- **BR-10** The system shall compute, per resident-mix slot (Music / Content-AI / Film-TV / Ops) and overall, current cycle fill against the 100-seat cap and a **selection-pressure index**.
- **BR-11** The system shall forecast next-cycle application pressure from brand-heat signals (referrals, sponsor reach, editorial momentum, salon attendance).
- **BR-12** The system shall recommend a per-slot **fill / hold / escalate-selection** action for the next cycle, with rationale.
- **BR-13** The system shall produce a dynamic **monthly residency dues** signal bounded by scarcity guardrails (raise under pressure; never discount below tier floor).
- **BR-14** All recommendations shall include human-readable rationale and link to the underlying data.

### 5.5 Finance (Finance Agent)

- **BR-15** Sam shall surface a resident's $3,500 cycle entry status, monthly dues, balance, and answer billing questions.
- **BR-16** Sam shall handle sponsor anchor invoicing and quarterly Sponsor Royalty Pool distributions on Project Slate projects.
- **BR-17** Dues-tier changes shall honor the guardrails in BR-13 and require operator confirmation before taking effect.

### 5.6 Access & Confidentiality & Security Protocol (Access Agent)

- **BR-18** Sam shall answer access questions and (where authorized) record access grants consistent with floor/credential tiers.
- **BR-19** The system shall support **private-entry protocol** — non-public vehicle routing, timed access, and identity masking for high-profile residents.
- **BR-20** The system shall enforce the **Closed-Set Policy** — no unauthorized filming or photography inside the building; violations are logged and trigger committee review (no warnings).
- **BR-21** The system shall execute and enforce the **Mutual NDA with Liquidated Damages** — signed digitally at onboarding by every resident, sponsor, and staff member, with enforceable damages per verified breach.
- **BR-22** The system shall **quarantine resident model weights and outputs** from third-party APIs (on-prem inference, isolated storage), with audit logging of any cross-boundary access.

### 5.7 Sponsorship (Sponsor Agent)

- **BR-23** The system shall manage capped sponsor anchor slots per cycle, category exclusivity, and the Sponsor Royalty Pool participation governed under the Project Participation Agreement.
- **BR-24** The system shall report campaign / activation impact and **quarterly royalty distributions** to sponsors.

### 5.8 Project Slate administration (IP Catalog Agent)

- **BR-25** At cycle close (Day 81–90), Sam shall surface to residents the option to opt their project into the **Project Slate**.
- **BR-26** Opt-in shall trigger a **project-level Participation Agreement** (70 Resident / 20 House / 10 Sponsor Royalty Pool), executed digitally, and a chain-of-title registry entry.
- **BR-27** The system shall maintain a queryable **IP Catalog** of all Slate projects with provenance, contributors, sponsor associations, distribution windows, and royalty accounting.
- **BR-28** Default position is **100% resident ownership** of work made on premises. The Participation Agreement applies only to Slate-elected projects.

### 5.9 Programming & convening (Programming Agent)

- **BR-29** The Programming Agent shall plan and operate Floor-5 cultural salons, sponsor receptions, and listening sessions across the cycle.
- **BR-30** Convening shall be **by invitation only**; no public RSVPs; attendee identities subject to the Confidentiality & Security Protocol.

### 5.10 Growth & demand sourcing (Growth Agent)

- **BR-31** The Growth Agent shall cultivate referrals, partner-network introductions, and editorial brand-heat signals that feed selection pressure for upcoming cycles — never the door.
- **BR-32** All acquisition channels shall measure **qualified prospect contribution** (not raw reach) and flow into the brand-heat input of the predictive layer.

### 5.11 AI Studio as a Service (Music / Video / 3D / Animation Agents)

- **BR-AS-1** Residents shall be able to direct on-prem creative-domain agents — Music, Video, 3D, and Animation — through Sam in natural language, scoped to their cycle and dues/AI-Studio tier.
- **BR-AS-2** Each agent shall execute against the on-prem model stack: open-weight base models (DeepSeek-V3 / R1, Qwen3-235B / Qwen2.5-VL) plus domain-specific models (audio: Stable Audio Open, MusicGen; video: Wan 2.2, HunyuanVideo, LTX-Video; 3D: TRELLIS, Hunyuan3D-2; animation: AnimateDiff family). No request shall reach a third-party API. *(Canonical model identifiers and roles: SDP §3A.2.)*
- **BR-AS-3** A **per-resident SLM** shall be fine-tuned during the cycle on the resident's own catalog and creative work, with explicit opt-in, and called by the creative agents to bias generations toward the resident's style. The resident owns the weights; the weights never leave Floor 6.
- **BR-AS-4** Every AI Studio generation shall be logged into the IP Catalog with provenance (resident, agent, base model, SLM hash, prompt, timestamp) so chain-of-title remains intact when work enters the Project Slate.
- **BR-AS-5** AI Studio access shall be billed as a **separate revenue stream**: a baseline subscription ($400/mo per resident during the cycle) covering a GPU-hour envelope, plus metered GPU-hours above the envelope. Sam shall surface balance, envelope remaining, and projected overage on request.
- **BR-AS-6** Outputs shall default to **100% resident ownership** (consistent with BR-28); inclusion in the Project Slate remains an explicit opt-in.

### 5.12 Oversight & governance (cross-cutting)

- **BR-33** Operators shall have a console showing cycle state, the agent roster, live delegations, predictive outputs, and Slate pipeline status.
- **BR-34** Every agent message, delegation, decision, Slate transaction, and security event shall be recorded as an auditable domain event.
- **BR-35** Sam shall enforce the strategic guardrails (cycle cap, 24-hour acceptance, no public funnel, no discounting below floor, Confidentiality & Security Protocol, human-in-loop selection) as hard constraints regardless of how a request is phrased.

## 6. Non-Functional Requirements

| # | Category | Requirement |
|---|---|---|
| NFR-1 | Security | Least-privilege RBAC; agent actions scoped to the requester's capabilities; on-prem isolation for resident model weights |
| NFR-2 | Privacy | Resident identity/activity confidential by default; no cross-resident data leakage; private-entry protocol |
| NFR-3 | Auditability | All agent actions and Slate transactions logged with actor, intent, delegation, outcome, and rationale |
| NFR-4 | Performance | Conversational responses feel instant (target < 2s perceived) |
| NFR-5 | Reliability | Graceful human fallback when an agent cannot complete a request; cycle-critical operations have idempotent retries |
| NFR-6 | Maintainability | Agent reasoning behind a provider interface (swap rules ↔ LLM without changing call sites); location-ready architecture for Phase II |
| NFR-7 | Brand integrity | Tone and decisions consistent with private-bank-grade discretion |
| NFR-8 | Scalability | Resident + sponsor + Location growth must not require proportional concierge/ops headcount |
| NFR-9 | IP integrity | Project Slate chain-of-title is tamper-evident; quarterly royalty calculations are reproducible from the event log |

## 7. Assumptions & Constraints

- The existing Next.js domain model (extended to Production Cycles, residents, Slate projects, security events) is authoritative and will back the agents.
- External services remain interface-boundary stubs this phase; the agent layer must not hard-couple to any vendor.
- Selection committee ratification remains mandatory; Sam never executes an unratified selection.
- Cycle cap is fixed at 100 residents (40 Music / 30 Content-AI / 20 Film-TV / 10 Ops); the cycle cadence is 4/year.
- $3,500 entry is non-refundable and non-negotiable; the 24-hour acceptance window is operationally enforced.
- The Project Participation Agreement (70/20/10) applies only to projects elected into the Project Slate; default ownership is 100% resident.

## 8. Success Criteria & KPIs

- Cycle cap of 100 residents never exceeded; 24-hour acceptance window enforced 100%.
- ≥80% of resident requests resolved by Sam without human handoff.
- Every cycle produces a data-backed selection-pressure recommendation with rationale.
- 100% of agent actions auditable; 100% of Slate projects have intact chain-of-title.
- Resident-perceived service quality maintained at private-bank-grade while concierge headcount stays flat as additional cycles (and Locations) come online.
- Zero verified Confidentiality & Security breaches; or where breaches occur, full audit and Mutual NDA enforcement applied.

## 9. Risks & Dependencies

- **Dependency:** existing RBAC, event bus, and data layer; Confidentiality & Security infrastructure (no-capture suites, private-entry access systems).
- **Risk:** agent over-reach → mitigated by capability scoping, human-in-the-loop selection, and full audit.
- **Risk:** scarcity erosion via over-selection → mitigated by hard 100-resident cap and predictive guardrails.
- **Risk:** Confidentiality & Security breach → mitigated by Closed-Set enforcement, Mutual NDA liquidated damages, on-prem data quarantine.
- **Risk:** Slate chain-of-title dispute → mitigated by project-level Participation Agreement signed before Slate execution and tamper-evident registry.
- **Risk:** vendor lock-in → mitigated by provider interface boundaries.

## 10. Glossary

- **5E47** — the brand and the address: **5 E**ast **47**th Street, New York City.
- **Hasenpfeffer Ventures LLC** — the operating entity.
- **Sam, the Concierge Agent** — the orchestration agent; the single resident-facing conversational surface.
- **Subagent** — a specialist agent Sam delegates to (Membership, Predictive, Booking, Access, Finance, Sponsor, IP Catalog, Programming, Growth, Operations) — and the four creative-domain agents in the AI Studio: Music, Video, 3D, Animation.
- **AI Studio as a Service** — the on-prem creative-agent offering on Floor 6. Music / Video / 3D / Animation agents run against quarantined open-weight models (DeepSeek, Qwen, plus domain-specific) and per-resident fine-tuned SLMs. Sold as a separate revenue stream; outputs default to 100% resident ownership.
- **Production Cycle** — a 90-day production period of 100 residents; 4 cycles per year. *(Deck term: Volume.)*
- **Project Slate** — the opt-in IP pipeline for projects produced inside a cycle. *(Deck term: 47 Slate.)*
- **Project Participation Agreement** — the project-level rights instrument for Slate projects: 70 Resident / 20 House / 10 Sponsor Royalty Pool. *(Deck term: 47 Equity Pact.)*
- **Confidentiality & Security Protocol** — the bundle of controls (Closed-Set Policy, private-entry protocol, Mutual NDA, data quarantine) that delivers private-bank-grade discretion. *(Deck term: Sovereignty Protocol.)*
- **Mutual NDA with Liquidated Damages** — the binding confidentiality instrument. *(Deck term: Circle of Trust.)*
- **Closed-Set Policy** — no unauthorized filming/photography inside the building. *(Deck term: Dark Floor Policy.)*
- **IP Catalog** — the queryable archive of Project Slate output. *(Deck term: the Archive.)*
- **Flagship Location** — the New York site; the first node of the multi-location blueprint. *(Deck term: Genesis Node.)* Phase II: LA, London, Tokyo; Phase III: Atlanta, Dubai, Riyadh, Abu Dhabi.
- **Selection-pressure index** — composite metric of oversubscription, referral momentum, and brand heat used by the predictive layer.
