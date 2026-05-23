# 5E47 · Agent-Operated Creator Residency

The 5E47 platform — an invitation-only luxury creator residency run by a
**multi-agent system** orchestrated by **Sam, the 5E47 Agent**. Members hold
one conversation with Sam to become members, book space and services, and
manage their membership. Sam delegates day-to-day operations to specialist
subagents and runs predictive models that hold the brand inside its scarcity
band.

Underneath, it remains a multi-tenant creator infrastructure operating system
covering identity, residencies, payments, bookings, smart access, sponsor
analytics, and investor reporting.

This repo is a working Next.js 15 app scaffold that demonstrates the
architecture end-to-end. Real integrations (Stripe, Clerk/Auth0, Kisi,
Supabase, Mux, Temporal, and the LLM behind Sam) are stubbed at the interface
boundary and can be swapped in without changing call sites.

## Documentation

Business and product docs live in [`/docs`](./docs):

- [Business Model Canvas](./docs/01-business-model-canvas.md)
- [Business Plan](./docs/02-business-plan.md) (marketing strategy + financials)
- [Business Requirements Document](./docs/03-business-requirements-document.md)
- [Product Requirements Document](./docs/04-product-requirements-document.md)
- [Software Development Plan & Cost](./docs/05-software-development-plan.md)

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
