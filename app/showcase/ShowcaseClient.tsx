"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarClock,
  Check,
  ChevronRight,
  CreditCard,
  Disc3,
  DoorOpen,
  Film,
  Headphones,
  Home,
  KeyRound,
  Lock,
  Mic,
  MessagesSquare,
  Moon,
  Plus,
  Search,
  Settings,
  Signal,
  Sparkles,
  Star,
  Sun,
  User,
  Users,
  Wifi,
  Wallet,
  Video,
} from "lucide-react";

const SCREENS: {
  id: string;
  title: string;
  tag: string;
  desc: string;
  render: () => React.ReactNode;
}[] = [
  {
    id: "01",
    title: "Home",
    tag: "The Volume · Today",
    desc:
      "The resident's day inside the 90-day Volume. Routes them through the vertical engine — Pressure Chamber, Force Multiplier, Social Heart, War Room. Output is expected; the day is structured against it.",
    render: ScreenHome,
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
            5E47 · Member app · v0.1
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
        <div className="label mb-5">§ Resident interface · v0.1</div>
        <h1 className="font-serif text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] text-balance max-w-3xl">
          The operating surface of a 90-day Volume.
        </h1>
        <p className="mt-6 text-ink-muted text-[15px] leading-[1.75] max-w-2xl">
          Sixteen screens carry a resident through the vertical engine — Pressure Chamber,
          Force Multiplier, Social Heart, War Room. The app is the membrane between
          structured creative output and the rules that protect the product.
        </p>
        <div className="mt-6 font-mono text-[10.5px] text-ink-soft tracking-widest uppercase">
          5 East 47th Street · NYC · Hasenpfeffer Ventures · v5.2
        </div>
      </section>

      {/* 4×4 grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-14">
          {SCREENS.map((s) => (
            <figure key={s.id} className="group flex flex-col">
              <PhoneFrame>{s.render()}</PhoneFrame>
              <figcaption className="mt-5">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-mono text-[10px] text-ink-soft tracking-widest">
                    § {s.id}
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
      </section>

      <footer className="border-t border-bg-border/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-wrap justify-between gap-3 text-[10.5px] text-ink-soft tracking-wider">
          <span>© MMXXVI · Hasenpfeffer Ventures LLC · Confidential</span>
          <span className="font-mono">Resident interface · 16/16 · Genesis Node</span>
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
}: {
  items: { icon: React.ComponentType<{ className?: string }>; label: string }[];
  active: number;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between border-t border-bg-border bg-bg/95 px-3 py-2 backdrop-blur">
      {items.map((it, i) => (
        <div
          key={it.label}
          className={`flex flex-col items-center gap-0.5 ${i === active ? "text-accent" : "text-ink-soft"}`}
        >
          <it.icon className="size-3.5" />
          <span className="text-[7.5px] tracking-wider">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

const MEMBER_TABS = [
  { icon: Home, label: "HOME" },
  { icon: CalendarClock, label: "BOOK" },
  { icon: Sparkles, label: "DISCOVER" },
  { icon: User, label: "ME" },
];

/* -------------------------------------------------------------------------- */
/* 01 · Home                                                                  */
/* -------------------------------------------------------------------------- */

function ScreenHome() {
  return (
    <div className="relative h-full px-3.5 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <Eyebrow>Thu · May 22</Eyebrow>
          <div className="font-serif text-[18px] leading-tight mt-0.5">
            Evening, Mara.
          </div>
        </div>
        <div className="size-7 rounded-full bg-role-creator/70 border border-bg-border" />
      </div>

      <div className="mt-3 rounded-xl border border-accent/30 bg-accent/[0.06] p-2.5">
        <div className="flex items-center justify-between">
          <Eyebrow>Next up · 19:30</Eyebrow>
          <span className="text-[8px] font-mono text-accent">FL/02</span>
        </div>
        <div className="font-serif text-[13px] mt-1 leading-tight">
          Studio B · Vocal booth
        </div>
        <div className="text-[10px] text-ink-muted mt-0.5">2 hrs · with Soraya</div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <Tile className="text-center">
          <div className="font-serif text-[14px] tabular-nums">3</div>
          <div className="text-[8px] text-ink-soft mt-0.5">BOOKINGS</div>
        </Tile>
        <Tile className="text-center">
          <div className="font-serif text-[14px] tabular-nums">2</div>
          <div className="text-[8px] text-ink-soft mt-0.5">PROJECTS</div>
        </Tile>
        <Tile className="text-center">
          <div className="font-serif text-[14px] tabular-nums">$0</div>
          <div className="text-[8px] text-ink-soft mt-0.5">DUE</div>
        </Tile>
      </div>

      <Eyebrow>This week</Eyebrow>
      <div className="mt-1.5 space-y-1.5">
        {[
          { d: "FRI", t: "Mix review · Studio B", h: "14:00" },
          { d: "SAT", t: "Volume stage open house", h: "17:00" },
          { d: "TUE", t: "The Quiet Founder · salon", h: "20:00" },
        ].map((r) => (
          <div
            key={r.t}
            className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1.5"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[8px] text-ink-soft w-6">{r.d}</span>
              <span className="text-[10px] truncate">{r.t}</span>
            </div>
            <span className="text-[9px] font-mono text-ink-soft">{r.h}</span>
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
      <Eyebrow>House · I · Music</Eyebrow>
      <div className="font-serif text-[16px] mt-0.5">Residency</div>

      <div className="mt-3 rounded-xl border border-bg-border bg-[#0f0f14] p-3 overflow-hidden relative">
        <div className="absolute inset-0 -z-0 [background:radial-gradient(60%_60%_at_20%_20%,rgba(230,255,61,0.10),transparent_60%),radial-gradient(60%_60%_at_85%_80%,rgba(124,92,255,0.18),transparent_60%)]" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] text-ink-soft tracking-[0.24em]">
              M·047
            </span>
            <Lock className="size-3 text-ink-soft" />
          </div>
          <div className="mt-6 font-serif text-[18px] leading-tight">
            Mara Iyele
          </div>
          <div className="text-[10px] text-ink-muted mt-0.5">
            Music · Founders' wing
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <Eyebrow>Tier</Eyebrow>
              <div className="font-serif text-[13px]">Resident · A</div>
            </div>
            <div className="text-right">
              <Eyebrow>Since</Eyebrow>
              <div className="font-mono text-[10px] mt-0.5">MMXXVI</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2.5 py-2">
          <div className="flex items-center gap-2">
            <KeyRound className="size-3 text-accent" />
            <span className="text-[10px]">Floor access</span>
          </div>
          <span className="text-[9px] text-ink-soft">1 · 2 · 3 · 4</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2.5 py-2">
          <div className="flex items-center gap-2">
            <Disc3 className="size-3 text-accent" />
            <span className="text-[10px]">Studio credits</span>
          </div>
          <span className="text-[9px] text-ink-soft font-mono">24 / 40 hrs</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2.5 py-2">
          <div className="flex items-center gap-2">
            <Users className="size-3 text-accent" />
            <span className="text-[10px]">Guest list</span>
          </div>
          <span className="text-[9px] text-ink-soft">2 of 4 left</span>
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
      <Eyebrow>Bookings</Eyebrow>
      <div className="font-serif text-[16px] mt-0.5">Book a studio</div>

      <div className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-bg-border bg-bg-elev px-2 py-1.5">
        <Search className="size-3 text-ink-soft" />
        <span className="text-[10px] text-ink-soft">Rooms, stages, gear…</span>
      </div>

      <div className="mt-2 flex gap-1.5 overflow-hidden">
        {["All", "Audio", "Video", "Stage", "Edit"].map((c, i) => (
          <span
            key={c}
            className={`text-[9px] rounded-full px-2 py-0.5 border ${i === 0 ? "border-accent/40 bg-accent/10 text-accent" : "border-bg-border text-ink-muted"}`}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {[
          { n: "Studio A · Mix room", f: 2, kind: "Audio", icon: Headphones, status: "Open · tonight" },
          { n: "Studio B · Vocal booth", f: 2, kind: "Audio", icon: Mic, status: "2 slots today" },
          { n: "Volume Stage", f: 5, kind: "Stage · LED", icon: Video, status: "Closed shoot" },
          { n: "Edit Bay · 04", f: 4, kind: "Edit", icon: Film, status: "Open · all day" },
        ].map((s) => (
          <div
            key={s.n}
            className="flex items-center gap-2 rounded-lg border border-bg-border bg-bg-elev/80 p-2"
          >
            <div className="size-8 rounded-md bg-bg-card border border-bg-border flex items-center justify-center">
              <s.icon className="size-3.5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10.5px] leading-tight truncate">{s.n}</div>
              <div className="text-[8.5px] text-ink-soft mt-0.5">
                FL/{String(s.f).padStart(2, "0")} · {s.kind}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[8.5px] text-accent">{s.status}</div>
              <ChevronRight className="size-3 text-ink-soft inline-block mt-0.5" />
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
        <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_30%_30%,rgba(230,255,61,0.12),transparent_60%)]" />
        <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between">
          <div>
            <Eyebrow>FL/02 · Audio</Eyebrow>
            <div className="font-serif text-[15px] leading-tight">Studio B</div>
          </div>
          <span className="font-mono text-[8px] text-ink-soft">$80 / hr</span>
        </div>
      </div>

      <div className="px-3.5 mt-3">
        <Eyebrow>Today</Eyebrow>
        <div className="mt-1.5 grid grid-cols-6 gap-1">
          {["10", "12", "14", "16", "18", "20"].map((h, i) => (
            <div
              key={h}
              className={`text-center text-[9px] py-1 rounded ${i === 4 ? "bg-accent text-accent-ink" : i === 1 ? "bg-bg-elev text-ink-soft line-through" : "border border-bg-border text-ink-muted"}`}
            >
              {h}
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-ink-soft">Vocal booth</span>
            <Check className="size-3 text-accent" />
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-ink-soft">Neumann U87</span>
            <Check className="size-3 text-accent" />
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-ink-soft">Engineer on call</span>
            <span className="text-[9px] text-ink-muted">+$40/hr</span>
          </div>
        </div>

        <div className="mt-3 rounded-lg border border-bg-border bg-bg-elev/80 p-2">
          <div className="flex items-center justify-between text-[10px]">
            <span>2 hrs · 18:00 – 20:00</span>
            <span className="font-mono text-accent">$160</span>
          </div>
        </div>

        <button className="mt-3 w-full rounded-lg bg-accent text-accent-ink text-[11px] font-medium py-2">
          Reserve studio
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
          <Eyebrow>Schedule</Eyebrow>
          <div className="font-serif text-[16px] mt-0.5">My bookings</div>
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
          Past
        </span>
      </div>

      <div className="mt-3 space-y-2">
        {[
          { day: "TODAY", t: "Studio B · Vocal booth", h: "18:00 – 20:00", s: "Confirmed" },
          { day: "FRI 23", t: "Edit Bay · 04", h: "10:00 – 14:00", s: "Confirmed" },
          { day: "SAT 24", t: "Volume Stage · walk-thru", h: "17:00 – 18:00", s: "Pending" },
          { day: "MON 26", t: "Studio A · Mix", h: "13:00 – 17:00", s: "Confirmed" },
        ].map((b, i) => (
          <div
            key={b.t}
            className="rounded-lg border border-bg-border bg-bg-elev/80 p-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8.5px] text-ink-soft tracking-widest">
                {b.day}
              </span>
              <span
                className={`text-[8.5px] rounded-full px-1.5 py-px ${b.s === "Pending" ? "bg-yellow-500/10 text-yellow-300/90" : "bg-accent/10 text-accent"}`}
              >
                {b.s}
              </span>
            </div>
            <div className="text-[10.5px] mt-1 leading-tight">{b.t}</div>
            <div className="text-[9px] text-ink-soft mt-0.5 font-mono">{b.h}</div>
          </div>
        ))}
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
      <Eyebrow>Access</Eyebrow>
      <div className="font-serif text-[16px] mt-0.5">Hold to unlock</div>

      <div className="mt-4 relative mx-auto size-32">
        <div className="absolute inset-0 rounded-full border border-accent/30 animate-pulse" />
        <div className="absolute inset-3 rounded-full border border-accent/20" />
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-accent/30 to-role-creator/40 border border-accent/40 flex flex-col items-center justify-center">
          <DoorOpen className="size-6 text-accent" />
          <div className="text-[8.5px] text-ink mt-1 font-mono">FL/02</div>
        </div>
      </div>

      <div className="mt-3 text-[10px] text-ink-muted">
        Studio B · Vocal booth
      </div>
      <div className="text-[9px] text-ink-soft mt-0.5 font-mono">
        BLE · KISI · M·047
      </div>

      <Eyebrow>Recent taps</Eyebrow>
      <div className="mt-1.5 space-y-1 text-left">
        {[
          { d: "Lobby · FL/01", t: "18:02", o: "granted" },
          { d: "Mixing · FL/02", t: "17:14", o: "granted" },
          { d: "Stage · FL/05", t: "Yesterday", o: "denied" },
        ].map((a) => (
          <div
            key={a.d + a.t}
            className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1.5"
          >
            <div>
              <div className="text-[10px] leading-tight">{a.d}</div>
              <div className="text-[8.5px] text-ink-soft mt-0.5">{a.t}</div>
            </div>
            <span
              className={`text-[8.5px] ${a.o === "denied" ? "text-red-400" : "text-accent"}`}
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
          <Eyebrow>Work</Eyebrow>
          <div className="font-serif text-[16px] mt-0.5">Projects</div>
        </div>
        <Film className="size-3.5 text-ink-soft" />
      </div>

      <div className="mt-3 space-y-2">
        {[
          { t: "Polaroid EP · Vol. II", s: "in production", a: 64, h: "Mix · 4 of 7 done" },
          { t: "Documentary · Quiet Hours", s: "review", a: 88, h: "Cut review with Devon" },
          { t: "Live session · May 30", s: "drafting", a: 18, h: "Booking the Volume Stage" },
        ].map((p) => (
          <div
            key={p.t}
            className="rounded-xl border border-bg-border bg-bg-elev/80 p-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-medium leading-tight">{p.t}</div>
              <span
                className={`text-[8.5px] rounded-full px-1.5 py-px ${p.s === "review" ? "bg-yellow-500/10 text-yellow-300/90" : p.s === "in production" ? "bg-role-creator/10 text-role-creator" : "bg-bg-border/60 text-ink-soft"}`}
              >
                {p.s}
              </span>
            </div>
            <div className="text-[9.5px] text-ink-soft mt-1">{p.h}</div>
            <div className="mt-2 h-1 rounded-full bg-bg-border overflow-hidden">
              <div
                className="h-full bg-accent"
                style={{ width: `${p.a}%` }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[8.5px] text-ink-soft">
              <div className="flex -space-x-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-3.5 rounded-full bg-role-creator/60 border border-bg-card"
                  />
                ))}
              </div>
              <span className="font-mono tabular-nums">{p.a}%</span>
            </div>
          </div>
        ))}
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
        Projects
      </div>
      <Eyebrow>In production</Eyebrow>
      <div className="font-serif text-[15px] mt-0.5 leading-tight">
        Polaroid EP · Vol. II
      </div>

      <div className="mt-2 flex items-center gap-1">
        <span className="text-[8.5px] rounded-full px-1.5 py-px bg-accent/10 text-accent border border-accent/30">
          Greenlit
        </span>
        <span className="text-[8.5px] text-ink-soft">·</span>
        <span className="text-[8.5px] text-ink-soft">House I</span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-1.5">
        <Tile>
          <Eyebrow>Budget</Eyebrow>
          <div className="font-serif text-[13px] mt-0.5">$24.0k</div>
        </Tile>
        <Tile>
          <Eyebrow>Spent</Eyebrow>
          <div className="font-serif text-[13px] mt-0.5">$15.3k</div>
        </Tile>
      </div>

      <Eyebrow>Milestones</Eyebrow>
      <div className="mt-1.5 space-y-1.5">
        {[
          { t: "Writing", d: "Apr 18", done: true },
          { t: "Tracking", d: "May 04", done: true },
          { t: "Mix · 4 of 7", d: "May 24", done: false, active: true },
          { t: "Master · Sterling", d: "Jun 06", done: false },
        ].map((m) => (
          <div
            key={m.t}
            className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1.5"
          >
            <div className="flex items-center gap-2">
              <span
                className={`size-3 rounded-full flex items-center justify-center ${m.done ? "bg-accent" : m.active ? "border border-accent" : "border border-bg-border"}`}
              >
                {m.done && <Check className="size-2 text-accent-ink" />}
              </span>
              <span className="text-[10px]">{m.t}</span>
            </div>
            <span className="text-[8.5px] text-ink-soft font-mono">{m.d}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <button className="flex-1 rounded-lg bg-accent text-accent-ink text-[10.5px] font-medium py-1.5">
          Book session
        </button>
        <button className="rounded-lg border border-bg-border text-ink-muted text-[10.5px] px-3 py-1.5">
          Share
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
      <Eyebrow>Wallet</Eyebrow>
      <div className="font-serif text-[16px] mt-0.5">Payments</div>

      <div className="mt-3 rounded-xl border border-bg-border bg-[#0f0f14] p-3 relative overflow-hidden">
        <div className="absolute inset-0 [background:radial-gradient(50%_80%_at_80%_20%,rgba(230,255,61,0.12),transparent_60%)]" />
        <div className="relative">
          <Eyebrow>Due Jun 1</Eyebrow>
          <div className="mt-1 font-serif text-[22px] tabular-nums">$1,800.00</div>
          <div className="text-[9.5px] text-ink-muted mt-0.5">
            June residency · House I · Tier A
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[9px] text-ink-muted">
              <CreditCard className="size-3" />
              Visa · 4242
            </div>
            <button className="text-[9.5px] rounded-full bg-accent text-accent-ink px-2.5 py-1 font-medium">
              Pay now
            </button>
          </div>
        </div>
      </div>

      <Eyebrow>Recent</Eyebrow>
      <div className="mt-1.5 space-y-1.5">
        {[
          { t: "Studio B · 2 hrs", d: "May 18", a: "-$160.00", s: "paid" },
          { t: "Edit Bay 04 · 4 hrs", d: "May 14", a: "-$200.00", s: "paid" },
          { t: "May residency", d: "May 01", a: "-$1,800.00", s: "paid" },
          { t: "Sponsor brief · Bose", d: "Apr 28", a: "+$4,200.00", s: "earned" },
        ].map((p) => (
          <div
            key={p.t + p.d}
            className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1.5"
          >
            <div>
              <div className="text-[10px] leading-tight">{p.t}</div>
              <div className="text-[8.5px] text-ink-soft mt-0.5">{p.d}</div>
            </div>
            <div
              className={`text-[10px] font-mono tabular-nums ${p.s === "earned" ? "text-accent" : "text-ink"}`}
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
      <Eyebrow>This month</Eyebrow>
      <div className="font-serif text-[16px] mt-0.5">Programming</div>

      <div className="mt-2 flex items-center gap-1.5 text-[9px] overflow-hidden">
        {["All", "Masterclass", "Salon", "Production"].map((c, i) => (
          <span
            key={c}
            className={`rounded-full px-2 py-0.5 border whitespace-nowrap ${i === 0 ? "border-accent/40 bg-accent/10 text-accent" : "border-bg-border text-ink-muted"}`}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {[
          { day: "THU", date: "22", t: "Mixing the Verse", h: "Grammy engineer", tag: "Masterclass" },
          { day: "SAT", date: "24", t: "Volume Stage Open House", h: "Resident filmmakers", tag: "Production" },
          { day: "TUE", date: "27", t: "The Quiet Founder", h: "Salon · Founders", tag: "Salon" },
          { day: "FRI", date: "30", t: "Late Listen · Vol. 03", h: "Unreleased work", tag: "Salon" },
        ].map((e) => (
          <div
            key={e.t}
            className="flex items-start gap-2.5 rounded-lg border border-bg-border bg-bg-elev/80 p-2"
          >
            <div className="text-center">
              <div className="font-serif text-[14px] tabular-nums leading-none">
                {e.date}
              </div>
              <div className="text-[8px] text-ink-soft tracking-widest mt-0.5">
                {e.day}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10.5px] leading-tight truncate">{e.t}</div>
              <div className="text-[8.5px] text-ink-soft mt-0.5">{e.h}</div>
              <div className="text-[8px] mt-1 text-accent tracking-widest uppercase">
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
        <div className="absolute bottom-2 left-2 right-2">
          <Eyebrow>Fri · May 30 · 21:00</Eyebrow>
          <div className="font-serif text-[15px] leading-tight mt-0.5">
            Late Listen · Vol. 03
          </div>
        </div>
      </div>

      <div className="px-3.5 mt-3">
        <p className="text-[10px] text-ink-muted leading-[1.6]">
          Unreleased work from the residency, played loud and once.
          Phones face-down. Drinks on the room.
        </p>

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-ink-soft">Where</span>
            <span>Floor 6 · Salon</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-ink-soft">Dress</span>
            <span>No code</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-ink-soft">Capacity</span>
            <span className="font-mono">38 of 60</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-ink-soft">Guests</span>
            <span>+1 allowed</span>
          </div>
        </div>

        <Eyebrow>Going</Eyebrow>
        <div className="mt-1.5 flex items-center gap-1">
          <div className="flex -space-x-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="size-5 rounded-full bg-role-creator/70 border border-bg-card"
              />
            ))}
          </div>
          <span className="text-[9px] text-ink-soft ml-1">+33</span>
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <button className="flex-1 rounded-lg bg-accent text-accent-ink text-[10.5px] font-medium py-2">
            RSVP · Yes
          </button>
          <button className="rounded-lg border border-bg-border text-ink-muted text-[10.5px] px-3 py-2">
            Maybe
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
          <Eyebrow>For you</Eyebrow>
          <div className="font-serif text-[16px] mt-0.5">Discover</div>
        </div>
        <Sparkles className="size-3.5 text-accent" />
      </div>

      <div className="mt-3 rounded-xl border border-accent/30 bg-accent/[0.06] p-2.5">
        <Eyebrow>AI-matched · 94%</Eyebrow>
        <div className="font-serif text-[13px] leading-tight mt-1">
          Devon Park · Director
        </div>
        <div className="text-[9.5px] text-ink-muted mt-0.5">
          Editing a documentary that overlaps your sound.
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <button className="text-[9.5px] rounded-full bg-accent text-accent-ink px-2.5 py-0.5 font-medium">
            Connect
          </button>
          <button className="text-[9.5px] rounded-full border border-bg-border text-ink-muted px-2.5 py-0.5">
            Skip
          </button>
        </div>
      </div>

      <Eyebrow>People near your slate</Eyebrow>
      <div className="mt-1.5 space-y-1.5">
        {[
          { n: "Soraya Lin", r: "Editor · 88% match", icon: Film },
          { n: "Imani Cole", r: "Producer · 81%", icon: Disc3 },
          { n: "Sony Music X", r: "Sponsor interested", icon: Star },
        ].map((d) => (
          <div
            key={d.n}
            className="flex items-center gap-2 rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1.5"
          >
            <div className="size-7 rounded-md bg-bg-card border border-bg-border flex items-center justify-center">
              <d.icon className="size-3 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] leading-tight truncate">{d.n}</div>
              <div className="text-[8.5px] text-ink-soft mt-0.5 truncate">
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
          <Eyebrow>Inbox</Eyebrow>
          <div className="font-serif text-[16px] mt-0.5">Messages</div>
        </div>
        <MessagesSquare className="size-3.5 text-ink-soft" />
      </div>

      <div className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-bg-border bg-bg-elev px-2 py-1.5">
        <Search className="size-3 text-ink-soft" />
        <span className="text-[10px] text-ink-soft">Search peers, threads…</span>
      </div>

      <div className="mt-2.5 space-y-1.5">
        {[
          { n: "Devon Park", t: "Pulled a rough cut — listening tonight?", h: "2m", u: true, tone: "creator" as const },
          { n: "Concierge · 5E47", t: "Studio B confirmed for 18:00.", h: "1h", u: true, tone: "accent" as const },
          { n: "Soraya Lin", t: "Sending the stems by EOD.", h: "3h", u: false, tone: "soft" as const },
          { n: "House I · Music", t: "Late Listen · capacity now 60.", h: "1d", u: false, tone: "soft" as const },
          { n: "Bose Pro", t: "Brief attached. Any availability next wk?", h: "2d", u: false, tone: "soft" as const },
        ].map((m) => (
          <div
            key={m.n}
            className="flex items-center gap-2 rounded-lg border border-bg-border bg-bg-elev/80 px-2 py-1.5"
          >
            <div className="size-7 rounded-full bg-role-creator/60 border border-bg-card flex items-center justify-center">
              <span className="text-[8px]">{m.n.split(" ").map((w) => w[0]).join("")}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[10px] truncate font-medium">{m.n}</div>
                <div className="text-[8.5px] text-ink-soft font-mono">{m.h}</div>
              </div>
              <div className="text-[9px] text-ink-soft mt-0.5 truncate">
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
      <Eyebrow>The room</Eyebrow>
      <div className="font-serif text-[16px] mt-0.5">Members</div>

      <div className="mt-2 flex items-center gap-1.5 text-[9px]">
        {["All", "MUS", "VID", "MAS", "FND"].map((c, i) => (
          <span
            key={c}
            className={`rounded-full px-2 py-0.5 border ${i === 0 ? "border-accent/40 bg-accent/10 text-accent" : "border-bg-border text-ink-muted"}`}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1">
        {Array.from({ length: 12 }).map((_, i) => (
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
            <div className="absolute inset-x-0 bottom-0 px-1 py-0.5 flex items-center justify-between text-[7px] text-ink-soft bg-black/40 font-mono tracking-widest">
              <span>M·{String(i + 12).padStart(3, "0")}</span>
              <span className="text-accent/90">
                {["MUS", "VID", "MAS", "FND"][i % 4]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between text-[9px] text-ink-soft">
        <span>210 active members</span>
        <span className="font-mono">capped per cohort</span>
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
        <div className="size-12 rounded-full bg-gradient-to-br from-role-creator to-accent/70 border border-bg-border" />
        <div className="min-w-0">
          <div className="font-serif text-[15px] leading-tight">Mara Iyele</div>
          <div className="text-[9.5px] text-ink-soft mt-0.5">
            M·047 · House I · Music
          </div>
          <div className="text-[8.5px] text-accent mt-0.5">Verified resident</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5 text-center">
        <Tile>
          <div className="font-serif text-[13px] tabular-nums">12</div>
          <div className="text-[8px] text-ink-soft mt-0.5">PROJECTS</div>
        </Tile>
        <Tile>
          <div className="font-serif text-[13px] tabular-nums">84</div>
          <div className="text-[8px] text-ink-soft mt-0.5">SESSIONS</div>
        </Tile>
        <Tile>
          <div className="font-serif text-[13px] tabular-nums">7</div>
          <div className="text-[8px] text-ink-soft mt-0.5">COLLABS</div>
        </Tile>
      </div>

      <Eyebrow>About</Eyebrow>
      <p className="text-[10px] text-ink-muted leading-[1.6] mt-1">
        Singer-producer working between Lagos and New York. Currently mixing
        Polaroid EP · Vol. II.
      </p>

      <Eyebrow>Recent work</Eyebrow>
      <div className="mt-1.5 grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="aspect-square rounded-md border border-bg-border"
            style={{
              background: `linear-gradient(${i * 90 + 35}deg, rgba(124,92,255,0.35), rgba(230,255,61,0.18))`,
            }}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <button className="flex-1 rounded-lg border border-bg-border text-[10.5px] text-ink py-1.5">
          Edit profile
        </button>
        <button className="rounded-lg border border-bg-border text-ink-muted text-[10.5px] px-3 py-1.5">
          Share
        </button>
      </div>

      <TabBar items={MEMBER_TABS} active={3} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 16 · Settings                                                              */
/* -------------------------------------------------------------------------- */

function ScreenSettings() {
  const groups: { title: string; rows: { icon: React.ComponentType<{ className?: string }>; label: string; v?: string }[] }[] = [
    {
      title: "Account",
      rows: [
        { icon: User, label: "Profile" },
        { icon: Wallet, label: "Payment methods", v: "Visa · 4242" },
        { icon: Bell, label: "Notifications", v: "Quiet hours on" },
      ],
    },
    {
      title: "Access",
      rows: [
        { icon: KeyRound, label: "Door credentials", v: "BLE · NFC" },
        { icon: Lock, label: "Privacy", v: "Names withheld" },
      ],
    },
    {
      title: "App",
      rows: [
        { icon: Settings, label: "Preferences" },
        { icon: MessagesSquare, label: "Concierge" },
      ],
    },
  ];
  return (
    <div className="relative h-full px-3.5 pb-12">
      <Eyebrow>Account</Eyebrow>
      <div className="font-serif text-[16px] mt-0.5">Settings</div>

      <div className="mt-3 space-y-3">
        {groups.map((g) => (
          <div key={g.title}>
            <div className="text-[8.5px] uppercase tracking-[0.24em] text-ink-soft mb-1">
              {g.title}
            </div>
            <div className="rounded-lg border border-bg-border bg-bg-elev/80 divide-y divide-bg-border">
              {g.rows.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between px-2 py-1.5"
                >
                  <div className="flex items-center gap-2">
                    <r.icon className="size-3 text-ink-soft" />
                    <span className="text-[10px]">{r.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {r.v && (
                      <span className="text-[9px] text-ink-soft">{r.v}</span>
                    )}
                    <ChevronRight className="size-3 text-ink-soft" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="w-full text-[9.5px] text-ink-soft py-1">
          Sign out
        </button>
        <div className="text-center text-[8px] text-ink-soft font-mono tracking-widest">
          5E47 · v0.1 · est. MMXXVI
        </div>
      </div>

      <TabBar items={MEMBER_TABS} active={3} />
    </div>
  );
}
