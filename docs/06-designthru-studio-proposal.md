# Proposal — Designing & Building Sam

**The 5E47 Multi-Agent System**

**Prepared by:** DesignThru Studio
**Prepared for:** 5E47 Holdings
**Date:** 24 May 2026 · **Validity:** 60 days · **Document:** Statement of Work & Investment Proposal · **Version:** 1.0

---

## About DesignThru Studio

DesignThru Studio is a design-and-engineering practice that builds AI products for brands where the *experience* is the business. We pair luxury-grade product design with applied AI engineering — orchestration, predictive modeling, and agent systems — and we ship production software, not prototypes.

We were drawn to 5E47 because it is a rare brief: an exclusive, scarcity-led membership brand that wants to be *run* by an agent without ever feeling automated. That tension — high-touch experience, near-zero marginal concierge cost — is exactly the kind of problem we design through.

> **DesignThru** — *we design through the experience to the system beneath it, and through the system back to the experience.*

## 1. Executive Summary

DesignThru Studio proposes to design and build **Sam, the 5E47 Agent** — a multi-agent operating system that becomes the single surface members talk to, and the operating layer that runs the club day-to-day.

Members hold one conversation with Sam to become members, book space and services, and manage their membership. Behind Sam, specialist subagents execute the nine blocks of 5E47's Business Model Canvas, and a predictive layer continuously protects the brand's scarcity band based on live demand and marketing performance.

We propose a **fixed-scope, phased engagement** delivering a production-hardened v1 in **~4.5 months**, for a total build investment of **~$603K**, with a post-launch run-rate of **~$84K–$243K/year** (primarily LLM inference and infrastructure). A working architecture already exists and is proven end-to-end; this engagement hardens it into production and swaps the stubbed integrations for live services.

## 2. Our Understanding of 5E47

- **The product is exclusivity.** The cap, the waitlist, and the discretion *are* what members pay for. Growth that dilutes the room destroys value.
- **The club should run like a great concierge** — instant, discreet, personal — but at software economics, not headcount economics.
- **Scarcity must be actively managed**, not assumed. Admissions, pricing, and programming have to be steered into a deliberate occupancy band using real demand and marketing-performance data.
- **Brand voice is non-negotiable.** Every agent interaction must feel like 5E47: warm, precise, never salesy, never discounting.

Our solution is built around these truths, and the strategic guardrails they imply are encoded into the system as hard constraints — not left to prompt-time discretion.

## 3. Proposed Solution — The Multi-Agent System

### 3.1 Sam, the orchestrator

A single conversational agent that classifies member intent, delegates to the right specialist, enforces 5E47's strategic guardrails, and replies in one voice. Sam's reasoning sits behind a swappable `LLMProvider` boundary — deterministic by default, hosted-model (Claude) ready — so the system is testable, auditable, and never locked to a vendor.

### 3.2 The subagents

| Agent | Canvas block | Responsibility |
|---|---|---|
| **Concierge** | Segments & Relationships | Membership, applications, referrals, lifecycle |
| **Atelier** | Key Activities | Studio / stage / equipment bookings |
| **House** | Activities / Cost | Day-to-day facility operations & exceptions |
| **Oracle** | Activities — scarcity | Predictive occupancy, demand, admit/hold/raise |
| **Ledger** | Revenue Streams | Balances, dues, dynamic pricing within guardrails |
| **Threshold** | Key Resources | Access & credentials |
| **Patron** | Key Partnerships | Sponsor activations & ROI |
| **Curator** | Channels — programming | Masterclasses & events across six pillars |
| **Herald** | Channels — acquisition | Member growth via social & luxury platforms |

### 3.3 The predictive scarcity layer

Pure, explainable models that compute occupancy vs. cap, an exclusivity index, brand-heat (marketing momentum incl. acquisition-channel waitlist contribution), an EWMA demand forecast, and a rationale-backed **admit / hold / raise** recommendation each cycle — plus a **bounded dynamic-pricing signal that never discounts below the tier floor.**

### 3.4 Guardrails encoded into the system

1. **Scarcity-first** — target occupancy band, never exceed the cap.
2. **No discounting** — fees only rise under scarcity.
3. **Discretion always** — confidentiality by default; no cross-member data leakage.
4. **Human-in-the-loop admissions** — Sam recommends; the committee ratifies.

### 3.5 Experience surfaces

- **Member concierge** — "Talk to Sam," with promoted programming and one-tap actions.
- **Operator console** — agent roster, live delegation trace, predictive dashboard, and a ratify/override control.

## 4. Scope & Deliverables

- Sam orchestrator + all nine subagents, capability-scoped and audited.
- Predictive scarcity, marketing, pricing, and churn models.
- Member and operator surfaces (responsive, on-brand).
- `LLMProvider` boundary with a hosted-model implementation (Claude) and a deterministic fallback.
- Production integrations swapped in behind existing boundaries: identity (Clerk/Auth0), payments (Stripe), access (Kisi/Openpath), data (Supabase/Postgres + pgvector), media (Mux).
- Auditability via the event log; full guardrail test suite and agent evals.
- This documentation set, kept current, published as a living docs site.
- Handover: source, runbooks, and an enablement session for the 5E47 team.

**Explicitly out of scope (this engagement):** native mobile apps; multi-city rollout (architecture is multi-tenant-ready; rollout is a follow-on); fully autonomous admissions.

## 5. Approach & Methodology

We work in tight, demonstrable increments. Each phase ends with something real you can use, not a status report.

| Phase | Focus | Outcome |
|---|---|---|
| **0 · Discovery & Design** (2–3 wks) | Brand voice, agent UX, guardrail definition, data model | Signed-off design + agent specs |
| **1 · Concierge & Booking** (3–4 wks) | Sam + Concierge + Atelier; member chat; audit | Members converse & book end-to-end |
| **2 · Predictive & Console** (4 wks) | Oracle + operator console; ratify/override | Scarcity steered with human-in-loop |
| **3 · Finance, Access, Sponsorship, Programming, Growth** (4 wks) | Remaining subagents; live integrations | Full operating layer |
| **4 · LLM Swap-in & Hardening** (3–4 wks) | Hosted model, evals, security, observability | Production-hardened v1 |

Total: **~4.5 months** to production-hardened v1.

## 6. Team

| Role | Allocation |
|---|---|
| Engagement lead / architect (DesignThru) | 1.0 |
| Full-stack engineers (Next.js / TS) | 2.0 |
| AI / agent engineer (orchestration, evals) | 1.0 |
| Product designer (luxury / brand) | 0.5 |
| Product manager | 0.5 |
| QA / SDET | 0.5 |
| DevOps / platform | 0.5 |

## 7. Investment

> Fixed-scope, phased. Invoiced per phase on acceptance. Figures align with the Software Development Plan (doc 05).

### 7.1 Build (one-time)

| Phase | Investment |
|---|---|
| 0 · Discovery & Design | $78K |
| 1 · Concierge & Booking | $128K |
| 2 · Predictive & Console | $132K |
| 3 · Finance / Access / Sponsorship / Programming / Growth | $138K |
| 4 · LLM Swap-in & Hardening | $105K |
| Security review, evals & contingency | $22K |
| **Total build** | **~$603K** |

### 7.2 Post-launch run-rate (annual)

| Item | Annual |
|---|---|
| Hosting, database, observability | $42K–$96K |
| LLM inference (member-scale) | $24K–$90K |
| Identity, access, media, payments | $18K–$57K |
| **Run-rate** | **~$84K–$243K/yr** |

### 7.3 Optional retainer

Ongoing product partnership (feature work, model tuning, multi-city readiness): from **$18K/month**.

## 8. Why DesignThru

- **We've already de-risked it.** A working end-to-end architecture exists and is proven; we're hardening, not exploring.
- **Design and AI under one roof.** No handoff gap between the experience and the system beneath it.
- **Deterministic-first engineering.** Auditable, testable, vendor-neutral — your brand guardrails are enforced in code.
- **Luxury sensibility.** We protect scarcity and discretion as first principles, not afterthoughts.

## 9. Assumptions & Terms

- 5E47 provides timely access to brand guidelines, committee decision rules, and accounts for the production integrations (Stripe, Clerk/Auth0, Kisi, Mux, Supabase, LLM provider).
- Per-House caps and the target occupancy band are 5E47 business inputs.
- Human committee ratification of admissions is retained.
- IP in the delivered system transfers to 5E47 Holdings on final payment.
- Pricing valid 60 days from the date above.

## 10. Next Steps

1. Alignment call and scope confirmation.
2. Countersign this Statement of Work; Phase 0 begins within two weeks.
3. Discovery & Design sprint kicks off.

## Acceptance

| | DesignThru Studio | 5E47 Holdings |
|---|---|---|
| Name | | |
| Title | | |
| Signature | | |
| Date | | |

---

*Prepared by DesignThru Studio for 5E47 Holdings. Confidential.*
