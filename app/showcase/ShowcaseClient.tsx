"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  Archive,
  ArrowLeft,
  ArrowRight,
  Bell,
  Bot,
  Briefcase,
  Building2,
  CalendarClock,
  Check,
  ChevronRight,
  Cpu,
  CreditCard,
  Disc3,
  DoorOpen,
  EyeOff,
  Film,
  Gauge,
  Headphones,
  Home,
  KeyRound,
  Languages,
  Lock,
  Mic,
  MessagesSquare,
  Megaphone,
  Moon,
  Plus,
  Scale,
  Scan,
  Search,
  Settings,
  ShieldCheck,
  Signal,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  User,
  Users,
  Wifi,
  Wallet,
  Video,
  Volume2,
} from "lucide-react";

type Screen = {
  id: string;
  title: string;
  tag: string;
  desc: string;
  render: () => React.ReactNode;
};

const MEMBER_SCREENS: Screen[] = [
  {
    id: "01",
    title: "Home",
    tag: "The Volume · Today",
    desc:
      "The resident's day inside the 90-day Volume. Sam opens the day with a single prompt and routes them through the vertical engine — Pressure Chamber, Force Multiplier, Social Heart, War Room.",
    render: ScreenHome,
  },
  {
    id: "sam-chat",
    title: "Talk to Sam",
    tag: "Concierge · the 5E47 Agent",
    desc:
      "One conversation runs the residency. A member asks in plain language; Sam classifies intent, delegates to a specialist subagent, and confirms — holding the room and charging the Volume in a single turn.",
    render: ScreenSamChat,
  },
  {
    id: "sam-join",
    title: "Becoming a member",
    tag: "Sam · membership",
    desc:
      "Sam handles the way in. Tiers, the cap, the waitlist — framed as scarcity, not rejection. Referrals move you up the list. Admissions stay human-in-the-loop; Sam only opens the door the committee allows.",
    render: ScreenSamJoin,
  },
  {
    id: "02",
    title: "Resident identity",
    tag: "Cohort credential",
    desc:
      "The credential inside a cohort of 100. Scarcity is the mechanism, not the constraint. Carries floor permissions, Pressure Chamber hours, and a Spirit Locker assignment on Floor 05.",
    render: ScreenResidency,
  },
  {
    id: "03",
    title: "Reserve a room",
    tag: "Vertical engine",
    desc:
      "Reservation surface for the four floors of the machine — Botanical Recording Lab (07), Generative Media Factory (06), Japanese Archival Sanctuary (05), Professional Commons (04). One Volume clock; one queue.",
    render: ScreenBook,
  },
  {
    id: "04",
    title: "The Superman Booth",
    tag: "Floor 07 · Pressure Chamber",
    desc:
      "Danish-engineered HEPA-filtered isolation, controlled acoustics, biological environment design. This is where sound becomes IP — and the booking flow that puts a resident inside it.",
    render: ScreenStudio,
  },
  {
    id: "05",
    title: "Production schedule",
    tag: "Volume cadence",
    desc:
      "A resident's bookings across the vertical engine. The Volume has a defined start, a defined close, and a defined output — the schedule is how that contract is enforced.",
    render: ScreenMyBookings,
  },
  {
    id: "06",
    title: "Sovereignty Protocol",
    tag: "Controlled access",
    desc:
      "Identity-shielded ingress and audited credentials at the threshold. Private-bank-grade access control — engineered to the discretion of a private bank, not the noise of a creative venue.",
    render: ScreenAccess,
  },
  {
    id: "07",
    title: "Asset pipeline",
    tag: "Output · measured",
    desc:
      "The resident's work as the factory sees it. State A — 100% creator ownership by default. State B — projects elected into the 47 Slate. Either way, output is the unit of account.",
    render: ScreenProjects,
  },
  {
    id: "08",
    title: "47 Slate · Equity Pact",
    tag: "Greenlight surface",
    desc:
      "Where a project opts in: 70% creator · 20% House · 10% sponsor royalty pool. Chain of title, milestones, and distribution registered through the War Room on Floor 04.",
    render: ScreenProjectDetail,
  },
  {
    id: "09",
    title: "Volume terms",
    tag: "Financial filter",
    desc:
      "$3,500 per resident per Volume — non-negotiable, non-refundable, 24-hour acceptance window. Production charges and 47 Slate royalty distributions clear through the same surface.",
    render: ScreenPayments,
  },
  {
    id: "10",
    title: "The Sanctuary calendar",
    tag: "Floor 05 · Social Heart",
    desc:
      "Audio Altar listening sessions, cultural salons, sponsor receptions. Sparse, controlled, by invitation only. Access becomes trust — this is the calendar where that conversion happens.",
    render: ScreenProgramming,
  },
  {
    id: "11",
    title: "Audio Altar invitation",
    tag: "One artifact at a time",
    desc:
      "Reference listening, archival lighting, closed doors. Where deals are softened and unreleased work is previewed — and the RSVP that gates the room.",
    render: ScreenEventRSVP,
  },
  {
    id: "12",
    title: "Cohort matching",
    tag: "40 / 30 / 20 / 10",
    desc:
      "Inter-floor collaboration across the resident mix — Music, Content/AI, Film/TV, Ops. The infrastructure manufactures collaboration; the data compounds into the archive.",
    render: ScreenDiscover,
  },
  {
    id: "13",
    title: "Circle of Trust",
    tag: "Discretion · contractual",
    desc:
      "Resident comms inside a binding legal instrument — not a courtesy. Liquidated damages per verified breach. Phones are governed under the Dark Floor Policy from this surface up.",
    render: ScreenMessages,
  },
  {
    id: "14",
    title: "The cohort",
    tag: "Capped per Volume",
    desc:
      "100 residents, identity-shielded by default. Not everyone gets in. Not everyone stays. No one gets to spectate. The room only works if the room is protected.",
    render: ScreenDirectory,
  },
  {
    id: "15",
    title: "Resident dossier",
    tag: "Output measured",
    desc:
      "Volume-by-Volume record of structured creative output. Every cycle closes with measurable deliverables — the dossier is the receipt the House holds against the Pact.",
    render: ScreenProfile,
  },
  {
    id: "16",
    title: "The Rules",
    tag: "Protect the product",
    desc:
      "Dark Floor Policy, identity shielding, Spirit Locker, Circle of Trust, data sovereignty. The six rules that protect the product — surfaced as a single control panel.",
    render: ScreenSettings,
  },
];

const OPERATOR_SCREENS: Screen[] = [
  {
    id: "op-console",
    title: "Agent operations",
    tag: "Sam · orchestrator",
    desc:
      "The control plane. Sam orchestrates nine specialist subagents — each owning one block of the Business Model Canvas — and runs the house at software economics, not headcount economics.",
    render: ScreenAgentConsole,
  },
  {
    id: "op-predict",
    title: "Predictive scarcity",
    tag: "Oracle · the engine",
    desc:
      "Occupancy steered into the 85–92% band, per House. Exclusivity index and brand-heat read demand and marketing performance so the room is always harder to enter than to want.",
    render: ScreenPredictive,
  },
  {
    id: "op-reco",
    title: "Cycle recommendation",
    tag: "Admit · hold · raise",
    desc:
      "Each cycle Sam recommends an action with rationale and a bounded pricing signal that never discounts. The committee ratifies or overrides — admissions and pricing are never applied autonomously.",
    render: ScreenRecommendation,
  },
  {
    id: "op-curator",
    title: "Programming",
    tag: "Curator · six pillars",
    desc:
      "Sam's Curator agent schedules and promotes masterclasses across content, music, video, marketing & branding, business operations, and creativity — the retention engine and the discovery surface.",
    render: ScreenCurator,
  },
  {
    id: "op-herald",
    title: "Growth & acquisition",
    tag: "Herald · channels",
    desc:
      "The Herald agent attracts members through brand-led social reach and exclusive luxury platforms — measured by qualified waitlist contribution, feeding desire without diluting the room.",
    render: ScreenHerald,
  },
  {
    id: "op-audit",
    title: "Delegation trace",
    tag: "Audit · event log",
    desc:
      "Every message, delegation, and action Sam takes is recorded as a domain event. Operators get a live, capability-scoped audit trail — discretion and oversight, by construction.",
    render: ScreenDelegationTrace,
  },
];

export default function MemberScreensShowcase() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const isLight = theme === "light";
  return (
    <div
      className={`min-h-screen bg-bg text-ink transition-colors ${isLight ? "theme-light" : ""}`}
    >
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-bg-border/60 backdrop-blur-md bg-bg/70">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[12.5px] text-ink-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span className="hidden sm:inline">Back to site</span>
          </Link>
          <div className="font-mono text-[10.5px] tracking-[0.28em] text-ink-soft uppercase hidden md:block">
            5E47 · Sam · member + operator
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(isLight ? "dark" : "light")}
              aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
              aria-pressed={isLight}
              className="inline-flex items-center gap-1.5 rounded-full border border-bg-border bg-bg-elev/60 px-3 py-1 text-[11px] text-ink-muted hover:text-ink hover:border-ink-soft transition-colors"
            >
              {isLight ? (
                <>
                  <Sun className="size-3.5 text-accent" />
                  <span>Lite</span>
                </>
              ) : (
                <>
                  <Moon className="size-3.5" />
                  <span>Dark</span>
                </>
              )}
            </button>
            <Link
              href="/login"
              className="text-[12.5px] text-ink-muted hover:text-ink transition-colors hidden sm:inline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* Heading */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-10">
        <div className="label mb-5">§ Sam · the 5E47 Agent · v0.2</div>
        <h1 className="font-serif text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] text-balance max-w-3xl">
          One agent runs the house — for members, and for the people who operate it.
        </h1>
        <p className="mt-6 text-ink-muted text-[15px] leading-[1.75] max-w-2xl">
          Sam is the single surface members talk to — to become members, book the
          vertical engine, and manage access and dues. Behind Sam, nine specialist
          subagents execute the day-to-day and a predictive layer holds the scarcity
          band. These screens show both sides: the member's concierge and the
          operator's control plane.
        </p>
        <div className="mt-6 font-mono text-[10.5px] text-ink-soft tracking-widest uppercase">
          5 East 47th Street · NYC · Hasenpfeffer Ventures · v5.2
        </div>
      </section>

      {/* Member ↔ Sam */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="label">Member ↔ Sam</div>
          <span className="h-px flex-1 bg-bg-border/60" />
          <span className="font-mono text-[10px] text-ink-soft tracking-widest">
            {String(MEMBER_SCREENS.length).padStart(2, "0")} screens
          </span>
        </div>
        <ScreenGrid screens={MEMBER_SCREENS} prefix="M" />
      </section>

      {/* Operator ↔ Sam */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="label">Operator &amp; Admin ↔ Sam</div>
          <span className="h-px flex-1 bg-bg-border/60" />
          <span className="font-mono text-[10px] text-ink-soft tracking-widest">
            {String(OPERATOR_SCREENS.length).padStart(2, "0")} screens
          </span>
        </div>
        <ScreenGrid screens={OPERATOR_SCREENS} prefix="O" />
      </section>

      <footer className="border-t border-bg-border/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-wrap justify-between gap-3 text-[10.5px] text-ink-soft tracking-wider">
          <span>© MMXXVI · Hasenpfeffer Ventures LLC · Confidential</span>
          <span className="font-mono">Sam · member + operator · orchestrated · Genesis Node</span>
        </div>
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Phone frame                                                                */
/* -------------------------------------------------------------------------- */

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[260px]">
      <div className="relative rounded-[36px] border border-bg-border bg-[#0d0d11] p-[6px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.02)]">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[30px] bg-bg">
          {/* Status bar */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-2 pb-1 text-[10px] font-mono text-ink-muted">
            <span className="tabular-nums">9:41</span>
            <div className="flex items-center gap-1">
              <Signal className="size-2.5" />
              <Wifi className="size-2.5" />
              <span className="ml-0.5 inline-block h-2 w-3.5 rounded-[2px] border border-ink-muted/70 relative">
                <span className="absolute inset-[1px] right-0.5 bg-ink-muted/80 rounded-[1px]" />
              </span>
            </div>
          </div>
          {/* Notch */}
          <div className="absolute left-1/2 top-1.5 z-30 h-4 w-16 -translate-x-1/2 rounded-full bg-black/95" />
          {/* Screen content */}
          <div className="absolute inset-0 pt-7 pb-5 text-ink">{children}</div>
          {/* Home indicator */}
          <div className="absolute bottom-1.5 left-1/2 z-20 h-1 w-20 -translate-x-1/2 rounded-full bg-ink/50" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Reusable mini-primitives                                                   */
/* -------------------------------------------------------------------------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[8px] uppercase tracking-[0.24em] text-ink-soft">
      {children}
    </div>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return <div className="font-serif text-[15px] leading-tight">{children}</div>;
}

function Tile({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-lg border border-bg-border bg-bg-elev/80 p-2 ${className}`}
    >
      {children}
    </div>
  );
}

function Dot({ tone = "soft" }: { tone?: "accent" | "creator" | "soft" }) {
  const cls =
    tone === "accent"
      ? "bg-accent"
      : tone === "creator"
        ? "bg-role-creator"
        : "bg-ink-soft";
  return <span className={`inline-block size-1.5 rounded-full ${cls}`} />;
}

function TabBar({
  items,
  active,
  tone = "accent",
}: {
  items: { icon: React.ComponentType<{ className?: string }>; label: string }[];
  active: number;
  tone?: "accent" | "operator";
}) {
  const activeCls = tone === "operator" ? "text-role-operator" : "text-accent";
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between border-t border-bg-border bg-bg/95 px-3 py-2 backdrop-blur">
      {items.map((it, i) => (
        <div
          key={it.label}
          className={`flex flex-col items-center gap-0.5 ${i === active ? activeCls : "text-ink-soft"}`}
        >
          <it.icon className="size-3.5" />
          <span className="text-[7.5px] tracking-wider">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

const MEMBER_TABS = [
  { icon: Home, label: "TODAY" },
  { icon: CalendarClock, label: "RESERVE" },
  { icon: Users, label: "COHORT" },
  { icon: User, label: "ME" },
  { icon: Sparkles, label: "SAM" },
];

const OPERATOR_TABS = [
  { icon: Gauge, label: "CONSOLE" },
  { icon: TrendingUp, label: "PREDICT" },
  { icon: Megaphone, label: "GROWTH" },
  { icon: Activity, label: "AUDIT" },
];

/* Chat bubble shared by Sam screens. */
function Bubble({
  from,
  children,
}: {
  from: "sam" | "me";
  children: React.ReactNode;
}) {
  return (
    <div className={`flex ${from === "me" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[84%] rounded-2xl px-2.5 py-1.5 text-[9px] leading-snug ${
          from === "sam"
            ? "bg-bg-elev border border-bg-border text-ink"
            : "bg-accent text-accent-ink"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/* Small delegation / action chips inside a Sam bubble. */
function Chip({
  tone = "accent",
  children,
}: {
  tone?: "accent" | "done";
  children: React.ReactNode;
}) {
  const cls =
    tone === "done"
      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
      : "bg-accent/10 text-accent border-accent/30";
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full border px-1.5 py-px text-[7px] ${cls}`}
    >
      {children}
    </span>
  );
}

/* Sam screen header (member + operator chat surfaces). */
function SamHeader({
  sub,
  tone = "accent",
}: {
  sub: string;
  tone?: "accent" | "operator";
}) {
  const ring =
    tone === "operator"
      ? "bg-role-operator/15 border-role-operator/40 text-role-operator"
      : "bg-accent/15 border-accent/30 text-accent";
  return (
    <div className="flex items-center gap-2">
      <div className={`size-7 rounded-lg border flex items-center justify-center ${ring}`}>
        <Sparkles className="size-3.5" />
      </div>
      <div className="min-w-0">
        <div className="font-serif text-[14px] leading-none">Sam</div>
        <div className="text-[8px] text-ink-soft mt-0.5 flex items-center gap-1">
          <span className="size-1 rounded-full bg-emerald-400 inline-block" /> {sub}
        </div>
      </div>
    </div>
  );
}

function ScreenGrid({ screens, prefix }: { screens: Screen[]; prefix: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-14">
      {screens.map((s, i) => (
        <figure key={s.id} className="group flex flex-col">
          <PhoneFrame>{s.render()}</PhoneFrame>
          <figcaption className="mt-5">
            <div className="flex items-baseline justify-between gap-3">
              <div className="font-mono text-[10px] text-ink-soft tracking-widest">
                § {prefix}
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                {s.tag}
              </div>
            </div>
            <div className="font-serif text-[17px] leading-tight mt-2 text-balance">
              {s.title}
            </div>
            <p className="mt-2.5 text-[11.5px] leading-[1.65] text-ink-muted">
              {s.desc}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 01 · Home                                                                  */
/* -------------------------------------------------------------------------- */

function ScreenHome() {
  return (
    <div className="relative h-full px-3.5 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <Eyebrow>Volume 01 · Day 24 / 90</Eyebrow>
          <div className="font-serif text-[16px] leading-tight mt-0.5">
            Inside the engine.
          </div>
        </div>
        <div className="size-7 rounded-full bg-role-creator/70 border border-bg-border" />
      </div>

      <div className="mt-2 h-1 rounded-full bg-bg-border overflow-hidden">
        <div className="h-full bg-accent" style={{ width: "26.6%" }} />
      </div>

      <div className="mt-3 rounded-xl border border-accent/30 bg-accent/[0.06] p-2.5">
        <div className="flex items-center justify-between">
          <Eyebrow>Next session · 14:00</Eyebrow>
          <span className="text-[8px] font-mono text-accent">FL/07</span>
        </div>
        <div className="font-serif text-[13px] mt-1 leading-tight">
          Pressure Chamber · Suite A
        </div>
        <div className="text-[9.5px] text-ink-muted mt-0.5 italic">
          Sound becomes IP.
        </div>
      </div>

      <button className="mt-3 w-full flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/[0.05] px-2.5 py-2 text-left">
        <Sparkles className="size-3.5 text-accent shrink-0" />
        <span className="text-[9px] text-ink-muted flex-1 leading-snug">
          Ask Sam — hold a room, settle dues, make an intro…
        </span>
        <ArrowRight className="size-3 text-accent" />
      </button>

      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <Tile className="text-center">
          <div className="font-serif text-[13px] tabular-nums">16</div>
          <div className="text-[7.5px] text-ink-soft mt-0.5">CHAMBER HRS</div>
        </Tile>
        <Tile className="text-center">
          <div className="font-serif text-[13px] tabular-nums">2</div>
          <div className="text-[7.5px] text-ink-soft mt-0.5">47 SLATE</div>
        </Tile>
        <Tile className="text-center">
          <div className="font-serif text-[13px] tabular-nums">FL/05</div>
          <div className="text-[7.5px] text-ink-soft mt-0.5">LOCKER #23</div>
        </Tile>
      </div>

      <Eyebrow>The week ahead</Eyebrow>
      <div className="mt-1.5 space-y-1.5">
        {[
          { d: "FRI", t: "Virtual Stage · Force Multiplier", h: "10:00", f: "06" },
          { d: "SAT", t: "Audio Altar · listening", h: "20:00", f: "05" },
          { d: "MON", t: "War Room · Pact signing", h: "11:00", f: "04" },
        ].map((r) => (
          <div
            key={r.t}
            className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1.5"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[8px] text-ink-soft w-6">{r.d}</span>
              <span className="text-[9.5px] truncate">{r.t}</span>
            </div>
            <span className="text-[8px] font-mono text-accent">FL/{r.f}</span>
          </div>
        ))}
      </div>

      <TabBar items={MEMBER_TABS} active={0} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 02 · Residency / Member card                                               */
/* -------------------------------------------------------------------------- */

function ScreenResidency() {
  return (
    <div className="relative h-full px-3.5 pb-12">
      <Eyebrow>Volume 01 · Lane · Music</Eyebrow>
      <div className="font-serif text-[15px] mt-0.5">Resident credential</div>

      <div className="mt-3 rounded-xl border border-bg-border bg-[#0f0f14] p-3 overflow-hidden relative">
        <div className="absolute inset-0 -z-0 [background:radial-gradient(60%_60%_at_20%_20%,rgba(230,255,61,0.10),transparent_60%),radial-gradient(60%_60%_at_85%_80%,rgba(124,92,255,0.18),transparent_60%)]" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] text-ink-soft tracking-[0.24em]">
              M·047 / V·01
            </span>
            <ShieldCheck className="size-3 text-accent" />
          </div>
          <div className="mt-5 font-serif text-[17px] leading-tight">
            Mara Iyele
          </div>
          <div className="text-[9.5px] text-ink-muted mt-0.5">
            Music lane · 40% cohort mix
          </div>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <Eyebrow>Status</Eyebrow>
              <div className="font-serif text-[12px]">In residence</div>
            </div>
            <div className="text-right">
              <Eyebrow>Day</Eyebrow>
              <div className="font-mono text-[10px] mt-0.5">24 / 90</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2.5 py-1.5">
          <div className="flex items-center gap-2">
            <KeyRound className="size-3 text-accent" />
            <span className="text-[9.5px]">Floor access</span>
          </div>
          <span className="text-[9px] text-ink-soft font-mono">04 · 05 · 06 · 07</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2.5 py-1.5">
          <div className="flex items-center gap-2">
            <Mic className="size-3 text-accent" />
            <span className="text-[9.5px]">Pressure Chamber</span>
          </div>
          <span className="text-[9px] text-ink-soft font-mono">16 / 40 hrs</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2.5 py-1.5">
          <div className="flex items-center gap-2">
            <Archive className="size-3 text-accent" />
            <span className="text-[9.5px]">Spirit Locker</span>
          </div>
          <span className="text-[9px] text-ink-soft font-mono">FL/05 · #23</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2.5 py-1.5">
          <div className="flex items-center gap-2">
            <Lock className="size-3 text-accent" />
            <span className="text-[9.5px]">Circle of Trust</span>
          </div>
          <span className="text-[9px] text-accent">Signed</span>
        </div>
      </div>

      <TabBar items={MEMBER_TABS} active={3} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 03 · Book a studio                                                         */
/* -------------------------------------------------------------------------- */

function ScreenBook() {
  return (
    <div className="relative h-full px-3.5 pb-12">
      <Eyebrow>Vertical engine</Eyebrow>
      <div className="font-serif text-[15px] mt-0.5">Reserve a room</div>

      <div className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-bg-border bg-bg-elev px-2 py-1.5">
        <Search className="size-3 text-ink-soft" />
        <span className="text-[10px] text-ink-soft">Search the four floors…</span>
      </div>

      <div className="mt-3 space-y-1.5">
        {[
          {
            f: "07",
            id: "Pressure Chamber",
            sub: "Botanical Recording Lab",
            op: "Sound becomes IP.",
            icon: Mic,
            status: "2 suites · 18 / 24h",
          },
          {
            f: "06",
            id: "Force Multiplier",
            sub: "Generative Media Factory",
            op: "Ideas become visual proof.",
            icon: Cpu,
            status: "4 zones · open",
          },
          {
            f: "05",
            id: "Social Heart",
            sub: "Archival Sanctuary",
            op: "Access becomes trust.",
            icon: Volume2,
            status: "Audio Altar · 21:00",
          },
          {
            f: "04",
            id: "War Room",
            sub: "Professional Commons",
            op: "Output becomes opportunity.",
            icon: Briefcase,
            status: "Boardroom · 2 slots",
          },
        ].map((s) => (
          <div
            key={s.id}
            className="rounded-lg border border-bg-border bg-bg-elev/80 p-2"
          >
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-md bg-bg-card border border-bg-border flex items-center justify-center">
                <s.icon className="size-3.5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="text-[10.5px] leading-tight truncate">
                    {s.id}
                  </div>
                  <span className="font-mono text-[8.5px] text-accent">
                    FL/{s.f}
                  </span>
                </div>
                <div className="text-[8.5px] text-ink-soft mt-0.5">{s.sub}</div>
              </div>
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-[8.5px] text-ink-muted italic">{s.op}</span>
              <span className="text-[8.5px] text-accent">{s.status}</span>
            </div>
          </div>
        ))}
      </div>

      <TabBar items={MEMBER_TABS} active={1} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 04 · Studio detail                                                         */
/* -------------------------------------------------------------------------- */

function ScreenStudio() {
  return (
    <div className="relative h-full pb-12">
      <div className="relative h-28 mx-3.5 rounded-xl overflow-hidden border border-bg-border bg-gradient-to-br from-role-creator/40 via-bg-card to-bg-elev">
        <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_30%_30%,rgba(230,255,61,0.14),transparent_60%),radial-gradient(60%_60%_at_80%_70%,rgba(45,212,191,0.18),transparent_60%)]" />
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
          <span className="font-mono text-[8px] text-ink-soft tracking-[0.24em]">
            FL/07 · PRESSURE CHAMBER
          </span>
          <span className="font-mono text-[8px] text-accent">3·3·3</span>
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <div className="font-serif text-[15px] leading-tight">
            The Superman Booth
          </div>
          <div className="text-[8.5px] text-ink-muted italic mt-0.5">
            Sound becomes IP.
          </div>
        </div>
      </div>

      <div className="px-3.5 mt-3">
        <Eyebrow>Mirrored suites · today</Eyebrow>
        <div className="mt-1.5 grid grid-cols-2 gap-1.5">
          <div className="rounded-md border border-accent/40 bg-accent/10 px-2 py-1.5">
            <div className="text-[9.5px] font-medium">Suite A</div>
            <div className="text-[8px] text-accent mt-0.5">Open · 14:00</div>
          </div>
          <div className="rounded-md border border-bg-border bg-bg-elev px-2 py-1.5">
            <div className="text-[9.5px] text-ink-soft">Suite B</div>
            <div className="text-[8px] text-ink-soft mt-0.5">Booked · Vol 01</div>
          </div>
        </div>

        <Eyebrow>Specifications</Eyebrow>
        <div className="mt-1 space-y-1">
          <div className="flex items-center justify-between text-[9.5px]">
            <span className="text-ink-soft">Danish HEPA isolation</span>
            <Check className="size-3 text-accent" />
          </div>
          <div className="flex items-center justify-between text-[9.5px]">
            <span className="text-ink-soft">Greenhouse-integrated</span>
            <Check className="size-3 text-accent" />
          </div>
          <div className="flex items-center justify-between text-[9.5px]">
            <span className="text-ink-soft">Controlled acoustics</span>
            <Check className="size-3 text-accent" />
          </div>
        </div>

        <div className="mt-2.5 rounded-lg border border-bg-border bg-bg-elev/80 p-2">
          <div className="flex items-center justify-between text-[9.5px]">
            <span>3 hrs · 14:00 – 17:00</span>
            <span className="font-mono text-accent">Chamber credit</span>
          </div>
        </div>

        <button className="mt-2.5 w-full rounded-lg bg-accent text-accent-ink text-[11px] font-medium py-2">
          Hold Suite A
        </button>
      </div>

      <TabBar items={MEMBER_TABS} active={1} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 05 · My bookings                                                           */
/* -------------------------------------------------------------------------- */

function ScreenMyBookings() {
  return (
    <div className="relative h-full px-3.5 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <Eyebrow>Volume 01 · Day 24 / 90</Eyebrow>
          <div className="font-serif text-[15px] mt-0.5">Production schedule</div>
        </div>
        <div className="size-6 rounded-full border border-accent/40 bg-accent/10 flex items-center justify-center">
          <Plus className="size-3 text-accent" />
        </div>
      </div>

      <div className="mt-2 flex gap-1.5 text-[9px]">
        <span className="rounded-full px-2 py-0.5 border border-accent/40 bg-accent/10 text-accent">
          Upcoming
        </span>
        <span className="rounded-full px-2 py-0.5 border border-bg-border text-ink-muted">
          Closed
        </span>
      </div>

      <div className="mt-3 space-y-1.5">
        {[
          { day: "TODAY", t: "Pressure Chamber · Suite A", h: "14:00 – 17:00", f: "07", s: "Held" },
          { day: "FRI 23", t: "Virtual Stage · Force Multiplier", h: "10:00 – 14:00", f: "06", s: "Held" },
          { day: "SAT 24", t: "Audio Altar · listening session", h: "20:00 – 22:00", f: "05", s: "RSVP" },
          { day: "MON 26", t: "War Room · Pact signing", h: "11:00 – 12:00", f: "04", s: "Held" },
        ].map((b) => (
          <div
            key={b.t}
            className="rounded-lg border border-bg-border bg-bg-elev/80 p-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8.5px] text-ink-soft tracking-widest">
                {b.day} · FL/{b.f}
              </span>
              <span
                className={`text-[8.5px] rounded-full px-1.5 py-px ${b.s === "RSVP" ? "bg-yellow-500/10 text-yellow-300/90" : "bg-accent/10 text-accent"}`}
              >
                {b.s}
              </span>
            </div>
            <div className="text-[10px] mt-1 leading-tight">{b.t}</div>
            <div className="text-[8.5px] text-ink-soft mt-0.5 font-mono">{b.h}</div>
          </div>
        ))}
      </div>

      <div className="mt-2 text-center text-[8.5px] text-ink-soft italic">
        Output is expected by Day 90.
      </div>

      <TabBar items={MEMBER_TABS} active={1} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 06 · Door access                                                           */
/* -------------------------------------------------------------------------- */

function ScreenAccess() {
  return (
    <div className="relative h-full px-3.5 pb-12 text-center">
      <Eyebrow>Sovereignty Protocol</Eyebrow>
      <div className="font-serif text-[15px] mt-0.5">Hold to unlock</div>

      <div className="mt-3 relative mx-auto size-28">
        <div className="absolute inset-0 rounded-full border border-accent/30 animate-pulse" />
        <div className="absolute inset-3 rounded-full border border-accent/20" />
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-accent/30 to-role-creator/40 border border-accent/40 flex flex-col items-center justify-center">
          <ShieldCheck className="size-5 text-accent" />
          <div className="text-[8px] text-ink mt-1 font-mono">FL/07</div>
        </div>
      </div>

      <div className="mt-2 text-[10px] text-ink-muted">
        Pressure Chamber · Suite A
      </div>
      <div className="text-[8.5px] text-ink-soft mt-0.5 font-mono">
        BLE · NFC · M·047 / V·01
      </div>

      <div className="mt-2 flex items-center justify-center gap-1.5 text-[8.5px] text-ink-soft">
        <EyeOff className="size-2.5" />
        <span>Zero-capture · identity-shielded</span>
      </div>

      <Eyebrow>Recent taps</Eyebrow>
      <div className="mt-1.5 space-y-1 text-left">
        {[
          { d: "Pressure Chamber · FL/07", t: "11:02", o: "granted" },
          { d: "Sanctuary · FL/05", t: "Yesterday", o: "granted" },
          { d: "War Room · FL/04", t: "Day 21", o: "escorted" },
        ].map((a) => (
          <div
            key={a.d + a.t}
            className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1.5"
          >
            <div>
              <div className="text-[9.5px] leading-tight">{a.d}</div>
              <div className="text-[8px] text-ink-soft mt-0.5">{a.t}</div>
            </div>
            <span
              className={`text-[8px] ${a.o === "escorted" ? "text-yellow-300/90" : "text-accent"}`}
            >
              {a.o}
            </span>
          </div>
        ))}
      </div>

      <TabBar items={MEMBER_TABS} active={0} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 07 · Projects                                                              */
/* -------------------------------------------------------------------------- */

function ScreenProjects() {
  return (
    <div className="relative h-full px-3.5 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <Eyebrow>Output · measured</Eyebrow>
          <div className="font-serif text-[15px] mt-0.5">Asset pipeline</div>
        </div>
        <Scan className="size-3.5 text-ink-soft" />
      </div>

      <div className="mt-2 flex gap-1.5 text-[9px]">
        <span className="rounded-full px-2 py-0.5 border border-accent/40 bg-accent/10 text-accent">
          All
        </span>
        <span className="rounded-full px-2 py-0.5 border border-bg-border text-ink-muted">
          State A
        </span>
        <span className="rounded-full px-2 py-0.5 border border-bg-border text-ink-muted">
          47 Slate
        </span>
      </div>

      <div className="mt-2.5 space-y-1.5">
        {[
          { t: "Polaroid · LP Vol. II", s: "State A", a: 64, h: "Sonic identity · Chamber", own: "100%" },
          { t: "Bose · 48hr Beta Sprint", s: "47 Slate", a: 88, h: "Pact executed · sponsor", own: "70%" },
          { t: "Synthetic · 6-market versioning", s: "State A", a: 32, h: "Force Multiplier · pipeline", own: "100%" },
        ].map((p) => (
          <div
            key={p.t}
            className="rounded-xl border border-bg-border bg-bg-elev/80 p-2"
          >
            <div className="flex items-center justify-between">
              <div className="text-[10.5px] font-medium leading-tight">
                {p.t}
              </div>
              <span
                className={`text-[8px] rounded-full px-1.5 py-px ${p.s === "47 Slate" ? "bg-accent/10 text-accent border border-accent/30" : "bg-bg-border/60 text-ink-soft"}`}
              >
                {p.s}
              </span>
            </div>
            <div className="text-[9px] text-ink-soft mt-0.5">{p.h}</div>
            <div className="mt-1.5 h-1 rounded-full bg-bg-border overflow-hidden">
              <div className="h-full bg-accent" style={{ width: `${p.a}%` }} />
            </div>
            <div className="mt-1 flex items-center justify-between text-[8px] text-ink-soft">
              <span className="font-mono">Creator · {p.own}</span>
              <span className="font-mono tabular-nums">{p.a}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 text-center text-[8px] text-ink-soft italic">
        Spectators are not residents.
      </div>

      <TabBar items={MEMBER_TABS} active={3} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 08 · Project detail                                                        */
/* -------------------------------------------------------------------------- */

function ScreenProjectDetail() {
  return (
    <div className="relative h-full px-3.5 pb-12">
      <div className="flex items-center gap-1.5 text-ink-soft text-[9px]">
        <ArrowLeft className="size-3" />
        Asset pipeline
      </div>
      <Eyebrow>47 Slate · Pact executed</Eyebrow>
      <div className="font-serif text-[14px] mt-0.5 leading-tight">
        Bose · 48hr Beta Sprint
      </div>

      <div className="mt-1.5 flex items-center gap-1">
        <span className="text-[8.5px] rounded-full px-1.5 py-px bg-accent/10 text-accent border border-accent/30">
          Greenlit
        </span>
        <span className="text-[8.5px] text-ink-soft">·</span>
        <span className="text-[8.5px] text-ink-soft">FL/04 War Room</span>
      </div>

      <Eyebrow>Equity Pact · split</Eyebrow>
      <div className="mt-1 rounded-lg border border-bg-border bg-bg-elev/80 p-2">
        <div className="flex h-2 rounded overflow-hidden">
          <div className="bg-accent" style={{ width: "70%" }} />
          <div className="bg-role-creator" style={{ width: "20%" }} />
          <div className="bg-role-sponsor" style={{ width: "10%" }} />
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[8px]">
          <span className="text-accent">Creator · 70</span>
          <span className="text-role-creator">House · 20</span>
          <span className="text-role-sponsor">Sponsor pool · 10</span>
        </div>
      </div>

      <Eyebrow>Chain of title</Eyebrow>
      <div className="mt-1 space-y-1">
        {[
          { t: "Brief · sponsor scope", d: "Day 12", done: true },
          { t: "48hr Sprint · FL/06", d: "Day 18", done: true },
          { t: "Pact registered · FL/04", d: "Day 24", done: false, active: true },
          { t: "Sync placement · 47 Slate", d: "Day 60", done: false },
        ].map((m) => (
          <div
            key={m.t}
            className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1"
          >
            <div className="flex items-center gap-2">
              <span
                className={`size-3 rounded-full flex items-center justify-center ${m.done ? "bg-accent" : m.active ? "border border-accent" : "border border-bg-border"}`}
              >
                {m.done && <Check className="size-2 text-accent-ink" />}
              </span>
              <span className="text-[9.5px]">{m.t}</span>
            </div>
            <span className="text-[8px] text-ink-soft font-mono">{m.d}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        <button className="flex-1 rounded-lg bg-accent text-accent-ink text-[10px] font-medium py-1.5">
          Open registry
        </button>
        <button className="rounded-lg border border-bg-border text-ink-muted text-[10px] px-3 py-1.5">
          Pact PDF
        </button>
      </div>

      <TabBar items={MEMBER_TABS} active={3} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 09 · Payments                                                              */
/* -------------------------------------------------------------------------- */

function ScreenPayments() {
  return (
    <div className="relative h-full px-3.5 pb-12">
      <Eyebrow>Financial filter</Eyebrow>
      <div className="font-serif text-[15px] mt-0.5">Volume terms</div>

      <div className="mt-2.5 rounded-xl border border-bg-border bg-[#0f0f14] p-3 relative overflow-hidden">
        <div className="absolute inset-0 [background:radial-gradient(50%_80%_at_80%_20%,rgba(230,255,61,0.14),transparent_60%)]" />
        <div className="relative">
          <Eyebrow>Volume 01 · Tuition</Eyebrow>
          <div className="mt-1 font-serif text-[22px] tabular-nums">$3,500</div>
          <div className="text-[9px] text-ink-muted mt-0.5">
            Non-negotiable · non-refundable · per resident
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[8.5px] text-ink-muted">
              <CreditCard className="size-3" />
              Cleared · Day 0
            </div>
            <span className="text-[8.5px] rounded-full bg-accent/10 text-accent border border-accent/30 px-2 py-0.5">
              Paid
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <Tile>
          <Eyebrow>47 Slate · YTD</Eyebrow>
          <div className="font-serif text-[13px] mt-0.5 tabular-nums text-accent">
            +$4,200
          </div>
        </Tile>
        <Tile>
          <Eyebrow>Royalty cycle</Eyebrow>
          <div className="font-mono text-[10px] mt-0.5">Q3 · audited</div>
        </Tile>
      </div>

      <Eyebrow>Ledger</Eyebrow>
      <div className="mt-1.5 space-y-1">
        {[
          { t: "Sponsor royalty · Bose pool", d: "Day 22", a: "+$4,200.00", s: "earned" },
          { t: "Chamber credit · Suite A", d: "Day 18", a: "—", s: "credit" },
          { t: "47 Slate · Pact filing", d: "Day 12", a: "-$0.00", s: "house" },
          { t: "Volume 01 · Tuition", d: "Day 0", a: "-$3,500.00", s: "paid" },
        ].map((p) => (
          <div
            key={p.t + p.d}
            className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1"
          >
            <div>
              <div className="text-[9.5px] leading-tight">{p.t}</div>
              <div className="text-[8px] text-ink-soft mt-0.5">{p.d}</div>
            </div>
            <div
              className={`text-[9.5px] font-mono tabular-nums ${p.s === "earned" ? "text-accent" : "text-ink"}`}
            >
              {p.a}
            </div>
          </div>
        ))}
      </div>

      <TabBar items={MEMBER_TABS} active={3} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 10 · Programming                                                           */
/* -------------------------------------------------------------------------- */

function ScreenProgramming() {
  return (
    <div className="relative h-full px-3.5 pb-12">
      <Eyebrow>FL/05 · Social Heart</Eyebrow>
      <div className="font-serif text-[15px] mt-0.5">Sanctuary calendar</div>
      <div className="text-[9px] text-ink-muted italic mt-0.5">
        Access becomes trust.
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-[9px] overflow-hidden">
        {["All", "Audio Altar", "Salon", "Sponsor"].map((c, i) => (
          <span
            key={c}
            className={`rounded-full px-2 py-0.5 border whitespace-nowrap ${i === 0 ? "border-accent/40 bg-accent/10 text-accent" : "border-bg-border text-ink-muted"}`}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="mt-2.5 space-y-1.5">
        {[
          { day: "THU", date: "Day 26", t: "Audio Altar · Vol. 03", h: "One artifact · unreleased", tag: "Audio Altar" },
          { day: "SAT", date: "Day 28", t: "Sponsor reception · Bose", h: "Brand Beta · invitation only", tag: "Sponsor" },
          { day: "TUE", date: "Day 31", t: "The Quiet Founder · salon", h: "Founders · Ops lane", tag: "Salon" },
          { day: "FRI", date: "Day 34", t: "Spirit Locker assignment", h: "Volume 02 intake briefing", tag: "House" },
        ].map((e) => (
          <div
            key={e.t}
            className="flex items-start gap-2.5 rounded-lg border border-bg-border bg-bg-elev/80 p-2"
          >
            <div className="text-center w-12 shrink-0">
              <div className="font-serif text-[11px] tabular-nums leading-none">
                {e.date.replace("Day ", "")}
              </div>
              <div className="text-[7.5px] text-ink-soft tracking-widest mt-0.5">
                DAY
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] leading-tight truncate">{e.t}</div>
              <div className="text-[8.5px] text-ink-soft mt-0.5">{e.h}</div>
              <div className="text-[7.5px] mt-1 text-accent tracking-widest uppercase">
                {e.tag}
              </div>
            </div>
          </div>
        ))}
      </div>

      <TabBar items={MEMBER_TABS} active={2} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 11 · Event RSVP                                                            */
/* -------------------------------------------------------------------------- */

function ScreenEventRSVP() {
  return (
    <div className="relative h-full pb-12">
      <div className="relative h-24 mx-3.5 rounded-xl overflow-hidden border border-bg-border bg-gradient-to-br from-bg-card to-[#0a0a0d]">
        <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_70%_30%,rgba(230,255,61,0.18),transparent_60%),radial-gradient(60%_60%_at_20%_80%,rgba(124,92,255,0.22),transparent_60%)]" />
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
          <span className="font-mono text-[8px] text-ink-soft tracking-[0.24em]">
            FL/05 · AUDIO ALTAR
          </span>
          <Volume2 className="size-3 text-accent" />
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <Eyebrow>Day 26 · 21:00</Eyebrow>
          <div className="font-serif text-[14px] leading-tight mt-0.5">
            Audio Altar · Vol. 03
          </div>
        </div>
      </div>

      <div className="px-3.5 mt-2.5">
        <p className="text-[9.5px] text-ink-muted leading-[1.55]">
          One artifact at a time. Reference listening under archival
          lighting, behind closed doors. By invitation only.
        </p>

        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between text-[9.5px]">
            <span className="text-ink-soft">Where</span>
            <span>FL/05 · Sanctuary</span>
          </div>
          <div className="flex items-center justify-between text-[9.5px]">
            <span className="text-ink-soft">Phones</span>
            <span className="text-accent">Dark Floor Policy</span>
          </div>
          <div className="flex items-center justify-between text-[9.5px]">
            <span className="text-ink-soft">Spirit Locker</span>
            <span className="font-mono">#23 · assigned</span>
          </div>
          <div className="flex items-center justify-between text-[9.5px]">
            <span className="text-ink-soft">Capacity</span>
            <span className="font-mono">22 of 30 · governed</span>
          </div>
        </div>

        <Eyebrow>In the room</Eyebrow>
        <div className="mt-1 flex items-center gap-1">
          <div className="flex -space-x-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="size-5 rounded-full bg-role-creator/70 border border-bg-card"
              />
            ))}
          </div>
          <span className="text-[8.5px] text-ink-soft ml-1">+17 residents</span>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5">
          <button className="flex-1 rounded-lg bg-accent text-accent-ink text-[10px] font-medium py-1.5">
            Accept · 24h
          </button>
          <button className="rounded-lg border border-bg-border text-ink-muted text-[10px] px-3 py-1.5">
            Decline
          </button>
        </div>
      </div>

      <TabBar items={MEMBER_TABS} active={2} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 12 · Discover                                                              */
/* -------------------------------------------------------------------------- */

function ScreenDiscover() {
  return (
    <div className="relative h-full px-3.5 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <Eyebrow>Cohort · Volume 01</Eyebrow>
          <div className="font-serif text-[15px] mt-0.5">Lane matching</div>
        </div>
        <Users className="size-3.5 text-accent" />
      </div>

      <div className="mt-2.5 rounded-lg border border-bg-border bg-bg-elev/80 p-2">
        <Eyebrow>Resident mix</Eyebrow>
        <div className="mt-1 flex h-2 rounded overflow-hidden">
          <div className="bg-accent" style={{ width: "40%" }} />
          <div className="bg-role-creator" style={{ width: "30%" }} />
          <div className="bg-role-sponsor" style={{ width: "20%" }} />
          <div className="bg-role-investor" style={{ width: "10%" }} />
        </div>
        <div className="mt-1 flex items-center justify-between text-[7.5px] text-ink-soft">
          <span>40 MUS</span>
          <span>30 AI</span>
          <span>20 FILM</span>
          <span>10 OPS</span>
        </div>
      </div>

      <div className="mt-2.5 rounded-xl border border-accent/30 bg-accent/[0.06] p-2">
        <Eyebrow>Inter-lane match · 94%</Eyebrow>
        <div className="font-serif text-[12px] leading-tight mt-1">
          M·112 · Film lane
        </div>
        <div className="text-[9px] text-ink-muted mt-0.5">
          Cutting a doc that overlaps your Chamber output.
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <button className="text-[9px] rounded-full bg-accent text-accent-ink px-2 py-0.5 font-medium">
            Open thread
          </button>
          <button className="text-[9px] rounded-full border border-bg-border text-ink-muted px-2 py-0.5">
            Skip
          </button>
        </div>
      </div>

      <Eyebrow>Near your asset pipeline</Eyebrow>
      <div className="mt-1.5 space-y-1">
        {[
          { n: "M·088 · AI lane", r: "Synthetic versioning · 88%", icon: Cpu },
          { n: "M·203 · Music lane", r: "Producer · 81%", icon: Disc3 },
          { n: "Bose Pro · sponsor", r: "Brand Beta open · royalty pool", icon: Star },
        ].map((d) => (
          <div
            key={d.n}
            className="flex items-center gap-2 rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1.5"
          >
            <div className="size-7 rounded-md bg-bg-card border border-bg-border flex items-center justify-center">
              <d.icon className="size-3 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9.5px] leading-tight truncate">{d.n}</div>
              <div className="text-[8px] text-ink-soft mt-0.5 truncate">
                {d.r}
              </div>
            </div>
            <ChevronRight className="size-3 text-ink-soft" />
          </div>
        ))}
      </div>

      <TabBar items={MEMBER_TABS} active={2} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 13 · Messages                                                              */
/* -------------------------------------------------------------------------- */

function ScreenMessages() {
  return (
    <div className="relative h-full px-3.5 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <Eyebrow>Circle of Trust</Eyebrow>
          <div className="font-serif text-[15px] mt-0.5">Threads</div>
        </div>
        <Lock className="size-3.5 text-accent" />
      </div>

      <div className="mt-2 rounded-lg border border-accent/30 bg-accent/[0.06] px-2 py-1.5">
        <div className="text-[8.5px] text-accent flex items-center gap-1.5">
          <ShieldCheck className="size-3" />
          Binding instrument · liquidated damages per breach.
        </div>
      </div>

      <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-bg-border bg-bg-elev px-2 py-1.5">
        <Search className="size-3 text-ink-soft" />
        <span className="text-[10px] text-ink-soft">Search residents, threads…</span>
      </div>

      <div className="mt-2 space-y-1">
        {[
          { n: "M·112 · Film", t: "Cut overlaps your Chamber session.", h: "2m", u: true, tone: "creator" as const },
          { n: "Sam · 5E47 Agent", t: "Atelier held Suite A · 14:00 · FL/07.", h: "1h", u: true, tone: "accent" as const },
          { n: "War Room · IP Admin", t: "Pact registered. Chain of title clean.", h: "3h", u: false, tone: "soft" as const },
          { n: "M·047 (you) → M·088", t: "Synthetic versioning · 6 markets?", h: "1d", u: false, tone: "soft" as const },
          { n: "Bose Pro · sponsor", t: "Royalty pool draft attached.", h: "2d", u: false, tone: "soft" as const },
        ].map((m) => (
          <div
            key={m.n}
            className="flex items-center gap-2 rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1.5"
          >
            <div className="size-6 rounded-full bg-role-creator/60 border border-bg-card flex items-center justify-center">
              <span className="text-[7.5px]">{m.n.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[9.5px] truncate font-medium">{m.n}</div>
                <div className="text-[8px] text-ink-soft font-mono">{m.h}</div>
              </div>
              <div className="text-[8.5px] text-ink-soft mt-0.5 truncate">
                {m.t}
              </div>
            </div>
            {m.u && <Dot tone={m.tone} />}
          </div>
        ))}
      </div>

      <TabBar items={MEMBER_TABS} active={2} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 14 · Member directory                                                      */
/* -------------------------------------------------------------------------- */

function ScreenDirectory() {
  return (
    <div className="relative h-full px-3.5 pb-12">
      <Eyebrow>Volume 01 · 100 / 100</Eyebrow>
      <div className="font-serif text-[15px] mt-0.5">The cohort</div>
      <div className="text-[8.5px] text-ink-soft mt-0.5 italic">
        Names withheld at the door.
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-[9px]">
        {["All", "MUS", "AI", "FILM", "OPS"].map((c, i) => (
          <span
            key={c}
            className={`rounded-full px-2 py-0.5 border ${i === 0 ? "border-accent/40 bg-accent/10 text-accent" : "border-bg-border text-ink-muted"}`}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="mt-2.5 grid grid-cols-4 gap-1">
        {Array.from({ length: 16 }).map((_, i) => {
          const lane = ["MUS", "AI", "FILM", "OPS"][i % 4];
          return (
            <div
              key={i}
              className="aspect-square rounded-md bg-bg-elev border border-bg-border relative overflow-hidden"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(${(i * 53) % 360}deg, rgba(124,92,255,0.4), rgba(230,255,61,0.25))`,
                  opacity: 0.5 + ((i * 7) % 10) / 30,
                }}
              />
              <div className="absolute inset-0 backdrop-blur-[2px] bg-black/10" />
              <div className="absolute inset-x-0 bottom-0 px-1 py-0.5 flex items-center justify-between text-[6.5px] text-ink-soft bg-black/50 font-mono tracking-widest">
                <span>M·{String(i + 12).padStart(3, "0")}</span>
                <span className="text-accent/90">{lane}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <Tile className="text-center">
          <div className="font-serif text-[12px] tabular-nums">100</div>
          <div className="text-[7.5px] text-ink-soft mt-0.5">PER VOLUME</div>
        </Tile>
        <Tile className="text-center">
          <div className="font-serif text-[12px] tabular-nums">04 / yr</div>
          <div className="text-[7.5px] text-ink-soft mt-0.5">CADENCE</div>
        </Tile>
      </div>

      <TabBar items={MEMBER_TABS} active={2} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 15 · Profile                                                               */
/* -------------------------------------------------------------------------- */

function ScreenProfile() {
  return (
    <div className="relative h-full px-3.5 pb-12">
      <div className="flex items-center gap-2.5 mt-1">
        <div className="size-11 rounded-full bg-gradient-to-br from-role-creator to-accent/70 border border-bg-border" />
        <div className="min-w-0">
          <div className="font-serif text-[14px] leading-tight">M·047</div>
          <div className="text-[9px] text-ink-soft mt-0.5">
            Volume 01 · Music lane
          </div>
          <div className="text-[8.5px] text-accent mt-0.5 flex items-center gap-1">
            <ShieldCheck className="size-2.5" /> In Circle of Trust
          </div>
        </div>
      </div>

      <Eyebrow>Output · measured</Eyebrow>
      <div className="mt-1 grid grid-cols-3 gap-1.5 text-center">
        <Tile>
          <div className="font-serif text-[13px] tabular-nums">16</div>
          <div className="text-[7.5px] text-ink-soft mt-0.5">CHAMBER HRS</div>
        </Tile>
        <Tile>
          <div className="font-serif text-[13px] tabular-nums">3</div>
          <div className="text-[7.5px] text-ink-soft mt-0.5">IP DELIVERED</div>
        </Tile>
        <Tile>
          <div className="font-serif text-[13px] tabular-nums">1</div>
          <div className="text-[7.5px] text-ink-soft mt-0.5">47 SLATE</div>
        </Tile>
      </div>

      <Eyebrow>Volume history</Eyebrow>
      <div className="mt-1 space-y-1">
        <div className="flex items-center justify-between rounded-lg border border-accent/30 bg-accent/[0.05] px-2 py-1">
          <span className="text-[9.5px]">Volume 01 · current</span>
          <span className="font-mono text-[8px] text-accent">Day 24/90</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1">
          <span className="text-[9.5px] text-ink-muted">Volume 00 · intake</span>
          <span className="font-mono text-[8px] text-ink-soft">archived</span>
        </div>
      </div>

      <Eyebrow>Dossier · recent assets</Eyebrow>
      <div className="mt-1 grid grid-cols-3 gap-1">
        {["LP·II", "BETA", "SYN·6"].map((label, i) => (
          <div
            key={i}
            className="aspect-square rounded-md border border-bg-border relative overflow-hidden"
            style={{
              background: `linear-gradient(${i * 90 + 35}deg, rgba(124,92,255,0.35), rgba(230,255,61,0.18))`,
            }}
          >
            <span className="absolute bottom-0.5 left-1 font-mono text-[7px] text-ink-soft">
              {label}
            </span>
          </div>
        ))}
      </div>

      <TabBar items={MEMBER_TABS} active={3} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 16 · Settings                                                              */
/* -------------------------------------------------------------------------- */

function ScreenSettings() {
  const rules: { icon: React.ComponentType<{ className?: string }>; label: string; v: string }[] = [
    { icon: ShieldCheck, label: "01 · Access curated", v: "Selection precedes payment" },
    { icon: EyeOff, label: "02 · Phones governed", v: "Dark Floor Policy" },
    { icon: Users, label: "03 · Guests limited", v: "Identity shielded" },
    { icon: Scan, label: "04 · Output expected", v: "Volume-close audit" },
    { icon: Scale, label: "05 · Discretion contractual", v: "Circle of Trust" },
    { icon: Cpu, label: "06 · Data sovereign", v: "Weights quarantined" },
  ];
  return (
    <div className="relative h-full px-3.5 pb-12">
      <Eyebrow>The Rules</Eyebrow>
      <div className="font-serif text-[15px] mt-0.5">Protect the product</div>
      <div className="text-[8.5px] text-ink-soft mt-0.5 italic">
        The culture is the product.
      </div>

      <div className="mt-2.5 rounded-lg border border-bg-border bg-bg-elev/80 divide-y divide-bg-border">
        {rules.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between px-2 py-1.5"
          >
            <div className="flex items-center gap-2 min-w-0">
              <r.icon className="size-3 text-accent shrink-0" />
              <span className="text-[9.5px] truncate">{r.label}</span>
            </div>
            <span className="text-[8px] text-ink-soft ml-2 shrink-0">{r.v}</span>
          </div>
        ))}
      </div>

      <Eyebrow>Resident controls</Eyebrow>
      <div className="mt-1 rounded-lg border border-bg-border bg-bg-elev/80 divide-y divide-bg-border">
        {[
          { icon: Archive, label: "Spirit Locker", v: "FL/05 · #23" },
          { icon: KeyRound, label: "Credentials", v: "BLE · NFC" },
          { icon: Building2, label: "Genesis Node", v: "5 E 47th · NYC" },
          { icon: Sparkles, label: "Sam · 5E47 Agent", v: "online" },
        ].map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between px-2 py-1.5"
          >
            <div className="flex items-center gap-2">
              <r.icon className="size-3 text-ink-soft" />
              <span className="text-[9.5px]">{r.label}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[8px] text-ink-soft">{r.v}</span>
              <ChevronRight className="size-3 text-ink-soft" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 text-center text-[7.5px] text-ink-soft font-mono tracking-widest">
        Hasenpfeffer Ventures · v5.2
      </div>

      <TabBar items={MEMBER_TABS} active={3} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* M · Talk to Sam (member concierge chat)                                    */
/* -------------------------------------------------------------------------- */

function ScreenSamChat() {
  return (
    <div className="relative h-full flex flex-col pb-12">
      <div className="px-3.5">
        <SamHeader sub="The 5E47 Agent · online" />
      </div>
      <div className="flex-1 px-3.5 mt-2.5 space-y-1.5 overflow-hidden">
        <Bubble from="sam">Evening, Mara. How can I help tonight?</Bubble>
        <Bubble from="me">Hold the Pressure Chamber, Suite A — 3 hours tomorrow.</Bubble>
        <Bubble from="sam">
          Done — Suite A on FL/07 held 14:00–17:00, charged to your Volume. You&apos;ll
          tap in at the door.
          <div className="mt-1 flex flex-wrap gap-1">
            <Chip>
              <Sparkles className="size-2" /> Atelier · booking
            </Chip>
            <Chip tone="done">
              <Check className="size-2" /> Suite A · FL/07
            </Chip>
          </div>
        </Bubble>
        <Bubble from="me">And my balance?</Bubble>
        <Bubble from="sam">
          All clear — tuition settled, nothing outstanding. (Fees hold at the tier
          rate; we don&apos;t discount.)
          <div className="mt-1 flex flex-wrap gap-1">
            <Chip>
              <Sparkles className="size-2" /> Ledger · finance
            </Chip>
          </div>
        </Bubble>
      </div>
      <div className="px-3.5 pt-1">
        <div className="flex flex-wrap gap-1 mb-1.5">
          {["Tonight at the Altar?", "Match a collaborator"].map((c) => (
            <span
              key={c}
              className="rounded-full border border-bg-border bg-bg-elev px-2 py-0.5 text-[8px] text-ink-muted"
            >
              {c}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-bg-border bg-bg-elev px-2.5 py-1.5">
          <span className="text-[9px] text-ink-soft flex-1">Message Sam…</span>
          <span className="size-5 rounded-full bg-accent text-accent-ink flex items-center justify-center">
            <ArrowRight className="size-3" />
          </span>
        </div>
      </div>
      <TabBar items={MEMBER_TABS} active={4} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* M · Becoming a member (Sam · membership)                                   */
/* -------------------------------------------------------------------------- */

function ScreenSamJoin() {
  return (
    <div className="relative h-full flex flex-col pb-12">
      <div className="px-3.5">
        <SamHeader sub="Membership · by invitation" />
      </div>
      <div className="flex-1 px-3.5 mt-2.5 space-y-1.5 overflow-hidden">
        <Bubble from="me">How do I become a member?</Bubble>
        <Bubble from="sam">
          By invitation or referral, capped per House to keep the room small. Tiers
          run Explorer, Resident, Anchor — we&apos;re ~89% full, so places are limited.
          <div className="mt-1 flex flex-wrap gap-1">
            <Chip>
              <Sparkles className="size-2" /> Concierge · membership
            </Chip>
          </div>
        </Bubble>
        <Bubble from="me">Can a member refer me?</Bubble>
        <Bubble from="sam">
          Yes — a referral moves you up the waitlist and is read first by the
          committee. I&apos;ll start your application and note who&apos;s vouching.
          <div className="mt-1 flex flex-wrap gap-1">
            <Chip tone="done">
              <Check className="size-2" /> Application started
            </Chip>
          </div>
        </Bubble>
      </div>
      <div className="px-3.5 pt-1">
        <div className="flex flex-wrap gap-1 mb-1.5">
          {["What are the tiers?", "Begin application"].map((c) => (
            <span
              key={c}
              className="rounded-full border border-bg-border bg-bg-elev px-2 py-0.5 text-[8px] text-ink-muted"
            >
              {c}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-bg-border bg-bg-elev px-2.5 py-1.5">
          <span className="text-[9px] text-ink-soft flex-1">Tell Sam what you&apos;re making…</span>
          <span className="size-5 rounded-full bg-accent text-accent-ink flex items-center justify-center">
            <ArrowRight className="size-3" />
          </span>
        </div>
      </div>
      <TabBar items={MEMBER_TABS} active={4} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* O · Agent operations console                                               */
/* -------------------------------------------------------------------------- */

function ScreenAgentConsole() {
  const subs = [
    { n: "Concierge", r: "Membership" },
    { n: "Atelier", r: "Bookings" },
    { n: "Oracle", r: "Predictive" },
    { n: "Ledger", r: "Finance" },
    { n: "Threshold", r: "Access" },
    { n: "Patron", r: "Sponsors" },
    { n: "Curator", r: "Programming" },
    { n: "Herald", r: "Growth" },
  ];
  return (
    <div className="relative h-full px-3.5 pb-12">
      <Eyebrow>Operator · 5E47</Eyebrow>
      <div className="font-serif text-[15px] mt-0.5">Agent operations</div>

      <div className="mt-2.5 rounded-xl border border-role-operator/30 bg-role-operator/[0.06] p-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Bot className="size-3.5 text-role-operator" />
            <span className="text-[11px]">Sam · The 5E47 Agent</span>
          </div>
          <span className="text-[8px] rounded-full bg-role-operator/15 text-role-operator border border-role-operator/40 px-1.5 py-px">
            in band
          </span>
        </div>
        <div className="text-[8.5px] text-ink-soft mt-1">
          Orchestrating · 9 subagents · all systems nominal
        </div>
      </div>

      <Eyebrow>Subagent roster</Eyebrow>
      <div className="mt-1.5 grid grid-cols-2 gap-1.5">
        {subs.map((s) => (
          <div
            key={s.n}
            className="rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1.5 flex items-center justify-between"
          >
            <div className="min-w-0">
              <div className="text-[9.5px] leading-tight truncate">{s.n}</div>
              <div className="text-[7.5px] text-ink-soft truncate">{s.r}</div>
            </div>
            <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
          </div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-3 gap-1.5">
        <Tile className="text-center">
          <div className="font-serif text-[13px] tabular-nums text-role-operator">214</div>
          <div className="text-[7px] text-ink-soft mt-0.5">DELEGATIONS·24H</div>
        </Tile>
        <Tile className="text-center">
          <div className="font-serif text-[13px] tabular-nums text-role-operator">92%</div>
          <div className="text-[7px] text-ink-soft mt-0.5">RESOLVED BY SAM</div>
        </Tile>
        <Tile className="text-center">
          <div className="font-serif text-[13px] tabular-nums text-role-operator">0</div>
          <div className="text-[7px] text-ink-soft mt-0.5">CAP BREACHES</div>
        </Tile>
      </div>

      <TabBar items={OPERATOR_TABS} active={0} tone="operator" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* O · Predictive scarcity                                                    */
/* -------------------------------------------------------------------------- */

function ScreenPredictive() {
  const houses = [
    { n: "Music", o: 91, w: 34 },
    { n: "Video Production", o: 90, w: 26 },
    { n: "Masterclass", o: 85, w: 19 },
    { n: "Founders", o: 91, w: 29 },
  ];
  return (
    <div className="relative h-full px-3.5 pb-12">
      <Eyebrow>Oracle · predictive</Eyebrow>
      <div className="font-serif text-[15px] mt-0.5">Scarcity</div>

      <div className="mt-2 grid grid-cols-3 gap-1.5">
        <Tile className="text-center">
          <div className="font-serif text-[14px] tabular-nums">89.4%</div>
          <div className="text-[7px] text-ink-soft mt-0.5">OCCUPANCY</div>
        </Tile>
        <Tile className="text-center">
          <div className="font-serif text-[14px] tabular-nums">88</div>
          <div className="text-[7px] text-ink-soft mt-0.5">EXCLUSIVITY</div>
        </Tile>
        <Tile className="text-center">
          <div className="font-serif text-[14px] tabular-nums">79</div>
          <div className="text-[7px] text-ink-soft mt-0.5">BRAND HEAT</div>
        </Tile>
      </div>

      <div className="mt-2 rounded-lg border border-role-operator/30 bg-role-operator/[0.05] px-2 py-1.5 flex items-center justify-between">
        <span className="text-[8.5px] text-ink-muted">Target band</span>
        <span className="text-[8.5px] text-role-operator font-mono">85–92% · in band</span>
      </div>

      <Eyebrow>By House</Eyebrow>
      <div className="mt-1.5 space-y-1.5">
        {houses.map((h) => (
          <div key={h.n} className="rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9.5px] truncate">{h.n}</span>
              <span className="text-[8px] text-ink-soft font-mono tabular-nums shrink-0">
                {h.o}% · wl {h.w}
              </span>
            </div>
            <div className="mt-1 h-1 rounded-full bg-bg-border overflow-hidden">
              <div className="h-full bg-role-operator" style={{ width: `${h.o}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 text-center text-[8px] text-ink-soft italic">
        Demand must exceed supply.
      </div>

      <TabBar items={OPERATOR_TABS} active={1} tone="operator" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* O · Cycle recommendation (human-in-the-loop)                               */
/* -------------------------------------------------------------------------- */

function ScreenRecommendation() {
  return (
    <div className="relative h-full px-3.5 pb-12">
      <Eyebrow>Oracle · this cycle</Eyebrow>
      <div className="font-serif text-[15px] mt-0.5">Recommendation</div>

      <div className="mt-2.5 rounded-xl border border-role-operator/30 bg-role-operator/[0.06] p-3">
        <div className="flex items-center justify-between">
          <Eyebrow>Action</Eyebrow>
          <span className="text-[8px] rounded-full bg-role-operator/15 text-role-operator border border-role-operator/40 px-2 py-0.5 tracking-widest">
            RAISE
          </span>
        </div>
        <div className="mt-1 text-[9px] text-ink-muted leading-snug">
          89.4% inside the band with deep waitlists. Hold admissions; raise pricing
          where demand is deepest. Protect exclusivity over volume.
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[8.5px]">
          <span className="text-ink-soft">Pricing signal</span>
          <span className="font-mono text-role-operator">×1.156 · ≤ +25%</span>
        </div>
        <div className="text-[7.5px] text-ink-soft mt-0.5 italic">
          Never below the tier floor. No discounting.
        </div>
      </div>

      <div className="mt-2 rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1.5 text-[8.5px] text-ink-soft flex items-center gap-1.5">
        <ShieldCheck className="size-3 text-role-operator shrink-0" /> Sam recommends · the
        committee ratifies.
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        <button className="flex-1 rounded-lg bg-role-operator text-bg text-[10px] font-medium py-1.5 flex items-center justify-center gap-1">
          <Check className="size-3" /> Ratify
        </button>
        <button className="flex-1 rounded-lg border border-bg-border text-ink-muted text-[10px] py-1.5">
          Override
        </button>
      </div>

      <Eyebrow>Per-House calls</Eyebrow>
      <div className="mt-1 space-y-1">
        {[
          { n: "Music", a: "raise" },
          { n: "Video Production", a: "raise" },
          { n: "Masterclass", a: "hold" },
          { n: "Founders", a: "raise" },
        ].map((r) => (
          <div
            key={r.n}
            className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1"
          >
            <span className="text-[9.5px]">{r.n}</span>
            <span
              className={`text-[8px] rounded-full px-1.5 py-px border ${
                r.a === "hold"
                  ? "border-bg-border text-ink-soft"
                  : "border-role-operator/40 bg-role-operator/10 text-role-operator"
              }`}
            >
              {r.a}
            </span>
          </div>
        ))}
      </div>

      <TabBar items={OPERATOR_TABS} active={1} tone="operator" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* O · Curator · programming                                                  */
/* -------------------------------------------------------------------------- */

function ScreenCurator() {
  const events = [
    { t: "Mixing the Verse", p: "Music", r: "11/14", promoted: true },
    { t: "Directing on the Volume", p: "Video", r: "9/18", promoted: true },
    { t: "Brand as Story", p: "Marketing", r: "16/24", promoted: true },
    { t: "The Quiet Founder", p: "Operations", r: "13/20", promoted: false },
    { t: "The Shape of an Idea", p: "Creativity", r: "7/16", promoted: false },
  ];
  return (
    <div className="relative h-full px-3.5 pb-12">
      <Eyebrow>Curator · programming</Eyebrow>
      <div className="font-serif text-[15px] mt-0.5">Masterclasses</div>

      <div className="mt-2 flex items-center gap-1 text-[7.5px] overflow-hidden">
        {["Content", "Music", "Video", "Marketing", "Ops", "Creativity"].map((p, i) => (
          <span
            key={p}
            className={`rounded-full px-1.5 py-0.5 border whitespace-nowrap ${
              i === 0
                ? "border-role-operator/40 bg-role-operator/10 text-role-operator"
                : "border-bg-border text-ink-muted"
            }`}
          >
            {p}
          </span>
        ))}
      </div>

      <div className="mt-2 space-y-1.5">
        {events.map((e) => (
          <div key={e.t} className="rounded-lg border border-bg-border bg-bg-elev/80 p-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] leading-tight truncate">{e.t}</span>
              <span
                className={`text-[7.5px] rounded-full px-1.5 py-px shrink-0 ${
                  e.promoted
                    ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                    : "bg-bg-border/60 text-ink-soft"
                }`}
              >
                {e.promoted ? "promoted" : "draft"}
              </span>
            </div>
            <div className="mt-0.5 flex items-center justify-between text-[8px] text-ink-soft">
              <span className="uppercase tracking-widest text-role-operator/90">{e.p}</span>
              <span className="font-mono tabular-nums">RSVP {e.r}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-2 w-full rounded-lg bg-role-operator text-bg text-[10px] font-medium py-1.5 flex items-center justify-center gap-1">
        <Plus className="size-3" /> New masterclass · Herald promotes
      </button>

      <TabBar items={OPERATOR_TABS} active={2} tone="operator" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* O · Herald · growth & acquisition                                          */
/* -------------------------------------------------------------------------- */

function ScreenHerald() {
  const social: [string, number][] = [
    ["Instagram", 38],
    ["TikTok", 19],
    ["YouTube", 11],
    ["LinkedIn", 14],
  ];
  const luxury: [string, number][] = [
    ["A Small World", 22],
    ["Quintessentially", 17],
    ["Amex Centurion", 9],
    ["Sotheby's", 6],
  ];
  return (
    <div className="relative h-full px-3.5 pb-12">
      <Eyebrow>Herald · acquisition</Eyebrow>
      <div className="font-serif text-[15px] mt-0.5">Channels</div>

      <div className="mt-2 rounded-xl border border-role-operator/30 bg-role-operator/[0.06] p-2.5 flex items-center justify-between">
        <div>
          <Eyebrow>Waitlist · last cycle</Eyebrow>
          <div className="font-serif text-[18px] tabular-nums text-role-operator mt-0.5">
            +136
          </div>
        </div>
        <div className="text-right text-[8px] text-ink-soft leading-snug">
          Feeds the waitlist,
          <br />
          never the door.
        </div>
      </div>

      <Eyebrow>Social</Eyebrow>
      <div className="mt-1 grid grid-cols-2 gap-1">
        {social.map(([n, v]) => (
          <div
            key={n}
            className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1"
          >
            <span className="text-[9px] truncate">{n}</span>
            <span className="text-[8.5px] font-mono text-role-operator shrink-0">+{v}</span>
          </div>
        ))}
      </div>

      <Eyebrow>Exclusive luxury</Eyebrow>
      <div className="mt-1 space-y-1">
        {luxury.map(([n, v]) => (
          <div
            key={n}
            className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1"
          >
            <span className="text-[9px]">{n}</span>
            <span className="text-[8.5px] font-mono text-accent">+{v}</span>
          </div>
        ))}
      </div>

      <button className="mt-2 w-full rounded-lg bg-role-operator text-bg text-[10px] font-medium py-1.5 flex items-center justify-center gap-1">
        <Megaphone className="size-3" /> Launch outreach
      </button>

      <TabBar items={OPERATOR_TABS} active={2} tone="operator" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* O · Live delegation trace (audit)                                          */
/* -------------------------------------------------------------------------- */

function ScreenDelegationTrace() {
  const events = [
    { e: "agent.message", d: "M·047 → Sam · hold Suite A", t: "2m" },
    { e: "agent.delegated", d: "Sam → Atelier · booking", t: "2m" },
    { e: "agent.action", d: "Suite A held · FL/07 · $720", t: "2m" },
    { e: "scarcity.recomputed", d: "Occupancy 89.4% · in band", t: "9m" },
    { e: "programming.created", d: "Curator · Marketing masterclass", t: "21m" },
    { e: "growth.campaign", d: "Herald · outreach · social + luxury", t: "34m" },
    { e: "agent.delegated", d: "Sam → Ledger · balance", t: "1h" },
  ];
  return (
    <div className="relative h-full px-3.5 pb-12">
      <Eyebrow>Audit · event log</Eyebrow>
      <div className="font-serif text-[15px] mt-0.5">Delegation trace</div>
      <div className="mt-0.5 text-[8.5px] text-ink-soft italic">
        Every action audited · capability-scoped.
      </div>

      <div className="mt-2 space-y-1">
        {events.map((ev, i) => (
          <div key={i} className="rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[7.5px] text-role-operator">{ev.e}</span>
              <span className="font-mono text-[7.5px] text-ink-soft">{ev.t}</span>
            </div>
            <div className="text-[9px] text-ink mt-0.5 leading-snug truncate">{ev.d}</div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-role-operator/30 bg-role-operator/[0.05] px-2 py-1.5 text-[8px] text-ink-muted">
        <Lock className="size-3 text-role-operator shrink-0" /> Confidential by default · no
        cross-member leakage.
      </div>

      <TabBar items={OPERATOR_TABS} active={3} tone="operator" />
    </div>
  );
}
