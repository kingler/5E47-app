import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarClock,
  CreditCard,
  KeyRound,
  Megaphone,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { Logo } from "@/components/shell/logo";
import { Badge } from "@/components/ui/badge";

const PILLARS = [
  {
    icon: Users,
    title: "Creator workspaces",
    body: "Onboarding, residencies, profile + portfolio, project tracking, collaboration discovery.",
  },
  {
    icon: CalendarClock,
    title: "Booking engine",
    body: "Studios, equipment, events. Recurring reservations, priority access, waitlists.",
  },
  {
    icon: CreditCard,
    title: "Payments & billing",
    body: "Stripe Billing / Connect / Terminal / Identity / Tax for AR, AP, royalties, payouts.",
  },
  {
    icon: ShieldCheck,
    title: "Smart access",
    body: "Mobile credentials, QR passes, elevator permissions, VIP routing, lockdowns.",
  },
  {
    icon: Megaphone,
    title: "Sponsor portal",
    body: "Campaign management, creator discovery, approvals, ROI analytics.",
  },
  {
    icon: BarChart3,
    title: "Investor reporting",
    body: "ARR, occupancy, EBITDA, retention, expansion KPIs.",
  },
  {
    icon: Workflow,
    title: "Event-driven core",
    body: "Domain events fan out to workflows, analytics, AI, notifications.",
  },
  {
    icon: Network,
    title: "Multi-city ready",
    body: "Multi-tenant from day one — every facility becomes a node in the network.",
  },
];

const ROLES = [
  {
    href: "/login?as=creator",
    tone: "creator" as const,
    title: "Creator",
    desc: "Apply, book studios, manage projects, get paid.",
  },
  {
    href: "/login?as=operator",
    tone: "operator" as const,
    title: "Operator",
    desc: "Approvals, scheduling, billing, floor and access control.",
  },
  {
    href: "/login?as=sponsor",
    tone: "sponsor" as const,
    title: "Sponsor",
    desc: "Campaigns, creator discovery, approvals, ROI.",
  },
  {
    href: "/login?as=investor",
    tone: "investor" as const,
    title: "Investor",
    desc: "Financial dashboards, utilization, expansion KPIs.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 md:px-10 h-16 flex items-center justify-between border-b border-bg-border">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 text-sm text-ink-muted">
          <a href="#system" className="hover:text-ink">Platform</a>
          <a href="#roles" className="hover:text-ink">Roles</a>
          <a href="#stack" className="hover:text-ink">Stack</a>
          <Link
            href="/login"
            className="rounded-lg bg-accent text-accent-ink px-3 py-1.5 font-medium hover:bg-accent-muted"
          >
            Enter platform
          </Link>
        </nav>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 [background:radial-gradient(60%_60%_at_50%_-10%,rgba(230,255,61,0.15),transparent_60%)]" />
        <div className="px-6 md:px-10 pt-16 pb-20 max-w-6xl mx-auto">
          <Badge tone="accent" className="mb-5">
            <span className="size-1.5 rounded-full bg-accent" />
            Creator Infrastructure OS
          </Badge>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl">
            5E47 is not a building.
            <br />
            <span className="text-ink-muted">It is an operating system for creators.</span>
          </h1>
          <p className="mt-5 text-ink-muted max-w-2xl text-base md:text-lg">
            Identity, residencies, payments, bookings, smart access, sponsor
            analytics, and investor reporting — unified into a single
            multi-tenant control plane.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-accent text-accent-ink px-5 py-3 font-medium hover:bg-accent-muted shadow-glow"
            >
              Enter the platform <ArrowRight className="size-4" />
            </Link>
            <a
              href="#roles"
              className="inline-flex items-center gap-2 rounded-xl border border-bg-border bg-bg-elev px-5 py-3 text-ink hover:border-ink-soft"
            >
              See role experiences
            </a>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              ["6", "Floors instrumented"],
              ["38", "Studios online"],
              ["210", "Active creators"],
              ["$4.9M", "ARR"],
            ].map(([v, l]) => (
              <div key={l} className="surface-soft p-4">
                <div className="text-2xl font-semibold tracking-tight">{v}</div>
                <div className="text-xs text-ink-soft mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="system" className="px-6 md:px-10 py-16 max-w-6xl mx-auto w-full">
        <div className="label">Platform modules</div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">
          A nervous system for creator infrastructure.
        </h2>
        <p className="text-ink-muted mt-2 max-w-2xl">
          Five layers, one platform: Experience → Application → Operations →
          Data & AI → Infrastructure & Security.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="surface p-5">
              <div className="size-9 rounded-lg bg-bg-elev border border-bg-border flex items-center justify-center mb-3">
                <Icon className="size-4 text-accent" />
              </div>
              <div className="font-medium text-sm">{title}</div>
              <p className="text-xs text-ink-soft mt-1.5 leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="roles" className="px-6 md:px-10 py-16 max-w-6xl mx-auto w-full">
        <div className="label">Role experiences</div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">
          Every persona gets a workspace tuned to their job.
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          {ROLES.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              className="surface p-6 group hover:border-ink-soft transition-colors"
            >
              <div className="flex items-center justify-between">
                <Badge tone={r.tone}>{r.title}</Badge>
                <ArrowRight className="size-4 text-ink-soft group-hover:text-ink transition-colors" />
              </div>
              <p className="mt-4 text-ink-muted">{r.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="stack" className="px-6 md:px-10 py-16 max-w-6xl mx-auto w-full">
        <div className="label">Core stack</div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">
          Built for institutional scale.
        </h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            "Next.js 15",
            "Supabase",
            "Stripe Connect",
            "Clerk / Auth0",
            "Temporal",
            "Cloudflare R2",
            "Mux",
            "Kisi / Openpath",
            "Meilisearch",
            "pgvector",
            "dbt",
            "Datadog",
          ].map((t) => (
            <div
              key={t}
              className="surface-soft px-3 py-2 text-xs text-ink-muted text-center"
            >
              {t}
            </div>
          ))}
        </div>

        <div className="mt-12 surface p-6 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="size-5 text-accent" />
            <div>
              <div className="font-medium">Ready to operate?</div>
              <div className="text-xs text-ink-soft">
                Sign in as any persona to explore the live workspace.
              </div>
            </div>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-accent text-accent-ink px-4 py-2 font-medium hover:bg-accent-muted"
          >
            Choose a persona <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <footer className="mt-auto px-6 md:px-10 py-8 border-t border-bg-border text-xs text-ink-soft flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Building2 className="size-3.5" />
          5E47 Holdings · NYC · Multi-tenant tenant: 5e47.app
        </div>
        <div className="flex items-center gap-3">
          <KeyRound className="size-3.5" />
          SOC2 in progress · RBAC · MFA enforced
        </div>
      </footer>
    </div>
  );
}
