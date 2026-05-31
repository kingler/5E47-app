# 5E47 · the Flagship deployment of Sam

**Sam** is a **DesignThru Studio** multi-agent operating system for Private
Cultural Infrastructure Operators. **5E47** is the Flagship Operator instance
— an invitation-only luxury creator residency at 5 East 47th Street, NYC,
run by Sam (the concierge agent). Members hold one conversation with Sam to
become members, book space and services, and manage their membership. Sam
delegates day-to-day operations to specialist subagents and runs predictive
models that hold the brand inside its scarcity band.

Underneath, Sam is a multi-tenant creator infrastructure operating system
covering identity, residencies, payments, bookings, smart access, sponsor
analytics, and investor reporting — multi-Operator and multi-Location by
design.

This repo is a working Next.js 15 app scaffold that demonstrates the
architecture end-to-end against the 5E47 Flagship configuration. Real
integrations (Stripe, Clerk/Auth0, Kisi, Supabase, Mux, Temporal, and the
LLM behind Sam) are stubbed at the interface boundary and can be swapped
in without changing call sites.

## Documentation

Business and product docs live in [`/docs`](./docs) and are published as a
browsable site at the **`/docs` route** (statically generated, on-brand):

**5E47 instance docs** (the Flagship Operator)
- [DesignThru Studio Proposal](./docs/06-designthru-studio-proposal.md) — equity-for-build SOW between DesignThru & Hasenpfeffer (5E47)
- [Business Model Canvas](./docs/01-business-model-canvas.md) — 5E47 BMC
- [Business Plan](./docs/02-business-plan.md) — 5E47 BP (marketing, financials, multi-Location)

**Sam platform docs** (DesignThru product, with 5E47 as Flagship Operator instance)
- [Sam — Business Requirements Document](./docs/03-business-requirements-document.md)
- [Sam — Product Requirements Document](./docs/04-product-requirements-document.md)
- [Sam — Software Development Plan & Cost](./docs/05-software-development-plan.md)

## The agent system

**Sam** (orchestrator) classifies member intent, delegates to a subagent,
enforces strategic guardrails (scarcity-first, no discounting, discretion,
human-in-the-loop admissions), and replies in one voice. Subagents:

| Agent | Canvas block | Owns |
|---|---|---|
| Concierge | Segments & Relationships | Membership, applications, referrals |
| Atelier | Key Activities | Studio/stage/equipment bookings |
| House | Activities / Cost | Day-to-day operations |
| Oracle | Activities — scarcity | Predictive occupancy, demand, admit/hold/raise |
| Ledger | Revenue Streams | Balances, dues, dynamic pricing within guardrails |
| Threshold | Key Resources | Access & credentials |
| Patron | Key Partnerships | Sponsor activations & ROI |
| Curator | Channels — programming | Masterclasses & events across six pillars |
| Herald | Channels — acquisition | Member growth via social & luxury platforms |

Code: `lib/agents/{orchestrator,subagents,registry,predictive,llm,types}`.
Surfaces: `/concierge` (member chat) · `/operator/agents` (ops console).
API: `POST /api/agent` (talk to Sam) · `GET /api/agent` (roster + status).

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000 and sign in as any seeded persona.

## Landing imagery

The landing page renders self-contained SVG art by default. To use real
photography, drop files into `/public/landing/` (see the README there for
exact filenames) and set `NEXT_PUBLIC_USE_LANDING_PHOTOS=true`.

## Architecture

```
Experience  →  app/(app)/{concierge,creator,operator,sponsor,investor}
Agents      →  lib/agents/{orchestrator,subagents,registry,predictive,llm,types}
Application →  lib/{auth,rbac,events,types}
Operations  →  app/api/{agent,bookings,access,events}
Data & AI   →  lib/data.ts (mock) → swap for Supabase/pgvector
Infra       →  Next.js 15 · Tailwind · edge-ready
```

## Role experiences

- **Creator** — residency, bookings, projects, access, payments
- **Operator** — command, residencies, studios, access, billing, analytics, event stream
- **Sponsor** — campaigns, creator discovery, asset pipeline, ROI reports
- **Investor** — financials, operations, network map

## Stack (target)

Frontend: Next.js 15 · ShadCN · Tailwind · Zustand · Supabase Realtime
Backend: FastAPI/NestJS · Temporal · Clerk/Auth0 · Postgres/Supabase · R2 · Meilisearch
Payments: Stripe Billing/Connect/Terminal/Identity/Tax
Access: Kisi · Openpath · Brivo · HID
Media: Mux · Cloudflare Stream · custom DAM
AI: OpenAI embeddings · pgvector/Pinecone
Infra: Vercel · AWS · Kubernetes · Cloudflare · Datadog · Grafana/Loki
