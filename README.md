# 5E47 · Creator Infrastructure OS

The 5E47 platform — a multi-tenant creator infrastructure operating system
covering identity, residencies, payments, bookings, smart access, sponsor
analytics, and investor reporting.

This repo is a working Next.js 15 app scaffold that demonstrates the
architecture end-to-end. Real integrations (Stripe, Clerk/Auth0, Kisi,
Supabase, Mux, Temporal) are stubbed at the interface boundary and can be
swapped in without changing call sites.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000 and sign in as any seeded persona.

## Architecture

```
Experience  →  app/(app)/{creator,operator,sponsor,investor}
Application →  lib/{auth,rbac,events,types}
Operations  →  app/api/{bookings,access,events}
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
