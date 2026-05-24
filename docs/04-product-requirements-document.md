# 5E47 — Product Requirements Document (PRD)

**Product:** 5E47 Multi-Agent Operating System — **Sam, the 5E47 Agent**
**Version:** 1.0 · **Status:** Baseline for build · **Owner:** Product
**Related:** BMC (01), Business Plan (02), BRD (03), Software Development Plan (05)

---

## 1. Product Vision

> *5E47 runs itself like a great concierge who never sleeps, never forgets a member, and never lets the room get too crowded.*

Sam is the single face of 5E47. Members talk to Sam to become members, book space and services, and manage their membership. Sam orchestrates a team of specialist subagents that run the club's day-to-day operations, and continuously runs predictive models so the club stays inside the scarcity band that makes membership valuable.

## 2. Goals & Non-Goals

**Goals**
- One conversational surface (Sam) for every member need.
- Specialist subagents that execute the nine blocks of the Business Model Canvas.
- A predictive layer that protects scarcity (occupancy band) and reads marketing performance.
- An operator console for oversight, delegation visibility, and human-in-the-loop control.
- Full auditability of agent actions.

**Non-Goals (this release)**
- Live external vendor integrations (kept as interface-boundary stubs).
- Native mobile apps.
- Fully autonomous admissions (committee ratification retained).
- Multi-city expansion.

## 3. Personas

| Persona | Role | Primary jobs-to-be-done |
|---|---|---|
| **Maya (Anchor member)** | creator | Book studios, manage projects, get introductions, pay dues — fast and discreet |
| **Prospect** | applicant | Understand the club, apply, check status |
| **Jules (Operator)** | operator | Oversee agents, ratify admissions, hold the scarcity band, handle exceptions |
| **Priya (Sponsor)** | sponsor | Secure activation slots, get ROI reporting |
| **Henry (Investor)** | investor | See occupancy, retention, revenue, and brand-health signals |

## 4. The Agent System

### 4.1 Sam — Orchestration Agent

**Role:** the only agent members talk to directly. Sam understands intent, delegates to the right subagent(s), enforces brand guardrails, and returns a single, luxury-grade response.

**Responsibilities**
- Classify member intent (membership, booking, operations, finance, access, sponsorship, predictive/insight, general).
- Delegate to subagents and synthesize their results into one reply.
- Enforce strategic guardrails: scarcity-first, no discounting, discretion, human-in-loop admissions.
- Surface predictive insight when relevant (e.g., waitlist status framed as scarcity, not as a hard "no").
- Escalate to humans with full context when needed.

**Tone:** warm, discreet, precise, never salesy. Member-first. Confidentiality assumed.

### 4.2 Subagents

| Subagent | Canvas block | Capabilities | Example member ask |
|---|---|---|---|
| **Concierge / Membership** | Segments, Relationships | Explain tiers/fees, start & track applications, referrals, waitlist status | "How do I become a member?" |
| **Booking** | Key Activities | Reserve studios/stages/equipment, quote cost, confirm | "Book Audio A for 4 hours tomorrow." |
| **Operations** | Activities / Cost | Facility status, exceptions, general ops | "Is the LED stage free Friday night?" |
| **Marketing & Predictive** | Activities (scarcity) | Occupancy vs. cap, exclusivity index, demand forecast, admit/hold/raise | "How full is the Music House?" (internal/operator) |
| **Finance** | Revenue Streams | Balance, dues, payments, pricing signal within guardrails | "What's my balance?" |
| **Access** | Key Resources | Access questions, authorized door grants | "Can I get into Floor 5 tonight?" |
| **Sponsorship** | Partnerships | Activation slots, campaign ROI | (sponsor) "What activation slots are open?" |
| **Programming (Curator)** | Channels — programming | Create & promote masterclasses/events across six pillars; match to members | "What masterclasses are coming up?" / (operator) "Schedule a marketing masterclass" |
| **Growth (Herald)** | Channels — acquisition | Attract members via social + exclusive luxury platforms; amplify programming | (operator) "Promote the next masterclass" / "How is acquisition performing?" |

### 4.3 Orchestration flow

```
Member ──▶ Sam
            │  1. classify intent (+ confidence)
            │  2. select subagent(s) by intent × capability
            ├──▶ Subagent.handle(context) ──▶ result + actions
            │  3. consult predictive layer if relevant
            │  4. enforce guardrails (scarcity, no-discount, discretion)
            │  5. synthesize one reply
            ▼
        Reply + actions + delegation trace (logged as domain events)
```

## 5. Predictive Layer (Scarcity & Marketing)

The Marketing & Predictive Agent computes, from the live domain data:

| Output | Definition | Use |
|---|---|---|
| **Occupancy** | active members ÷ cap, per House and overall | Core scarcity metric |
| **Exclusivity index** (0–100) | composite of occupancy tightness + waitlist pressure + brand heat | Brand-health signal |
| **Waitlist pressure** | applicants in review ÷ open slots | Demand intensity |
| **Demand forecast** | EWMA/weighted-trend projection of next-cycle applications from marketing momentum | Plan admissions |
| **Brand-heat index** | momentum from sponsor reach/impressions growth | Marketing performance |
| **Recommendation** | `admit N` / `hold` / `raise pricing` with rationale | Cycle decision (operator-ratified) |
| **Pricing signal** | fee multiplier in **[1.00, 1.25]** per tier, never below floor | Dynamic luxury pricing |
| **Churn risk** | per-member signal from booking recency/frequency + payment status | Retention |

**Guardrails encoded:** target occupancy band **85–92%**; never exceed cap; never discount below tier floor; admissions recommendations are advisory until ratified.

## 6. Functional Requirements & User Stories

### Member — Concierge
- **US-1** As a prospect, I can ask Sam how to join and get tiers, fees, and the referral path.
- **US-2** As a prospect, I can start an application through Sam and later check its status.
- **US-3** As a member, I get answers framed in 5E47's discreet, luxury voice.

### Member — Booking
- **US-4** As a member, I can ask Sam to book a specific studio for N hours and receive a cost + confirmation.
- **US-5** As a member, booking respects my entitlements; ineligible requests are declined gracefully.

### Member — Finance / Access
- **US-6** As a member, I can ask Sam my balance and what's due.
- **US-7** As a member, I can ask about access to a floor and get an answer consistent with my tier.

### Member — Programming
- **US-P1** As a member, I can ask Sam what masterclasses and special events are coming up and get a curated list matched to my House.
- **US-P2** As a prospect, promoted programming gives me a taste of the room before I apply.

### Operator — Programming & Growth
- **US-P3** As an operator, I can ask Sam (Curator) to create a masterclass on any of the six pillars (content, music, video, marketing & branding, business operations, creativity).
- **US-P4** As an operator, I can ask Sam (Herald) to promote a masterclass or open House across social media and exclusive luxury platforms.
- **US-P5** As an operator, I can see acquisition-channel performance measured by qualified waitlist contribution, and how it feeds the brand-heat input of the scarcity model.

### Operator — Oversight
- **US-8** As an operator, I can see the agent roster and what each subagent is doing.
- **US-9** As an operator, I can see live predictive outputs (occupancy, exclusivity index, demand forecast, recommendation).
- **US-10** As an operator, I can review Sam's admit/hold/raise recommendation and ratify or override it (human-in-the-loop).
- **US-11** As an operator, I can audit a trace of agent delegations and decisions.

### Cross-cutting
- **US-12** As any user, every agent action I trigger is recorded as a domain event.
- **US-13** As 5E47, Sam never violates the strategic guardrails regardless of how a request is phrased.

## 7. UX & Surfaces

- **"Talk to Sam" (member concierge)** — `/(app)/concierge`: chat interface, suggested prompts, delegation chips showing which subagent answered, action confirmations (e.g., booking created).
- **Agent Operations Console (operator)** — `/(app)/operator/agents`: agent roster with status, live delegation feed, predictive scarcity dashboard (occupancy by House, exclusivity index, demand forecast, recommendation card with ratify/override).
- **Brand voice** — reuse the existing dark, editorial design system (serif display, accent `#e6ff3d`, role tones). Sam's surface should feel like a concierge desk, not a chatbot widget.

## 8. API Surface

- `POST /api/agent` — body `{ message, conversationId? }`; returns `{ reply, intent, delegations[], actions[], suggestions[] }`. Scoped to the authenticated user's role/capabilities.
- `GET /api/agent` — returns `{ agents[], systemStatus }` (roster + health) for the console.
- (Predictive outputs are computed server-side and surfaced via the orchestrator and the operator console.)

## 9. Success Metrics

| Metric | Target |
|---|---|
| Requests resolved by Sam without handoff | ≥ 80% |
| Occupancy band adherence | within 85–92% |
| Cap breaches | 0 |
| Predictive cycle coverage | 100% of cycles produce a rationale-backed recommendation |
| Agent action auditability | 100% |
| Perceived response latency | < 2s |

## 10. Release Plan (product view)

- **R1 — Concierge & Booking:** Sam + Membership + Booking agents; member chat; events/audit.
- **R2 — Predictive & Console:** Marketing/Predictive agent; operator console; scarcity dashboard; recommendation with ratify/override.
- **R3 — Finance, Access, Sponsorship:** remaining subagents; dynamic pricing signal; sponsor ROI.
- **R4 — Hardening:** LLM provider swap-in behind the interface; analytics polish; audit export.

## 11. Open Questions

- Final per-House caps (business input).
- Whether dynamic pricing signal auto-applies after ratification or always requires per-change confirmation (default: per-change confirmation).
- Programming attendance as a first-class marketing-performance input (data source TBD).
