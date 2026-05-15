import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { Logo } from "@/components/shell/logo";

const HOUSES = [
  {
    tag: "I",
    name: "Music",
    body: "Mixing rooms, vocal booths, and quiet nights for artists building catalogs that will outlive the cycle.",
    accent: "from-[#7c5cff]/30 to-transparent",
  },
  {
    tag: "II",
    name: "Video Production",
    body: "An LED volume, edit bays, and a stage configured for short-form, long-form, and the thing in between.",
    accent: "from-[#fb923c]/30 to-transparent",
  },
  {
    tag: "III",
    name: "Masterclass",
    body: "Closed-door instruction from operators who would rather teach a room of seven than a room of seven hundred.",
    accent: "from-[#e6ff3d]/25 to-transparent",
  },
  {
    tag: "IV",
    name: "Founders",
    body: "Writers' rooms for entrepreneurs — quiet floors, sharp peers, a kitchen, and a door that closes.",
    accent: "from-[#60a5fa]/30 to-transparent",
  },
];

const FLOORS = [
  { n: 1, name: "Lobby & Lounge", note: "Members and invited guests" },
  { n: 2, name: "Audio Rooms", note: "Two control rooms · vocal booth" },
  { n: 3, name: "Podcast & Writers' Floor", note: "Quiet — phones face-down" },
  { n: 4, name: "Edit Bays & Founders' Wing", note: "Resident keys only" },
  { n: 5, name: "Stage · LED Volume", note: "Closed shoots & premieres" },
  { n: 6, name: "Salons & Events", note: "Programming nights only" },
];

const PROGRAMMING = [
  { date: "Thu", month: "May 22", title: "Mixing the Verse", host: "with a Grammy-nominated engineer", tag: "Masterclass · Music" },
  { date: "Sat", month: "May 24", title: "Volume Stage Open House", host: "for resident filmmakers", tag: "Production" },
  { date: "Tue", month: "May 27", title: "The Quiet Founder", host: "a salon for builders shipping in private", tag: "Founders" },
  { date: "Fri", month: "May 30", title: "Late Listen · Vol. 03", host: "unreleased work, no phones", tag: "Salon" },
];

const PARTNERS = ["Sony Music X", "A24 Residency", "Nike Studio Lab", "Bose Pro", "Arri", "Universal"];

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur bg-bg/70 border-b border-bg-border/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 text-[13px] text-ink-muted">
            <a href="#houses" className="hover:text-ink transition-colors">The Houses</a>
            <a href="#building" className="hover:text-ink transition-colors">The Building</a>
            <a href="#programming" className="hover:text-ink transition-colors">Programming</a>
            <a href="#residence" className="hover:text-ink transition-colors">In Residence</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-[13px] text-ink-muted hover:text-ink transition-colors hidden sm:inline"
            >
              Member sign-in
            </Link>
            <Link
              href="/apply"
              className="rounded-full bg-accent text-accent-ink px-4 py-1.5 text-[13px] font-medium hover:bg-accent-muted transition-colors"
            >
              Request membership
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[100svh] overflow-hidden flex items-end">
        {/* Cinematic backdrop: layered gradients + grain */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 [background:radial-gradient(70%_60%_at_20%_30%,rgba(230,255,61,0.10),transparent_60%),radial-gradient(60%_60%_at_85%_70%,rgba(124,92,255,0.18),transparent_60%),linear-gradient(180deg,#0a0a0b_0%,#06060a_60%,#000_100%)]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.08] mix-blend-overlay" aria-hidden>
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>
          {/* faint geometric room sketches */}
          <svg className="absolute right-[-10%] bottom-[-5%] w-[70%] h-[70%] opacity-[0.07]" viewBox="0 0 600 600" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="0.6">
              <rect x="60" y="60" width="480" height="480" />
              <rect x="120" y="120" width="360" height="360" />
              <rect x="200" y="60" width="200" height="200" />
              <line x1="60" y1="300" x2="540" y2="300" />
              <line x1="300" y1="60" x2="300" y2="540" />
              <circle cx="300" cy="300" r="180" />
              <circle cx="300" cy="300" r="80" />
            </g>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-40 pb-20 md:pb-28">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink-soft mb-8">
            <Lock className="size-3" />
            <span>By invitation · New York</span>
            <span className="text-bg-border">—</span>
            <span>Est. MMXXVI</span>
          </div>

          <h1 className="font-serif font-normal tracking-tight text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] max-w-5xl">
            A members-only home
            <br />
            for music, film, mastery,
            <br />
            <span className="text-ink-muted italic">and the people building</span>
            <br />
            <span className="text-ink-muted italic">what's next.</span>
          </h1>

          <p className="mt-10 max-w-xl text-ink-muted text-base md:text-lg leading-relaxed">
            Six floors in lower Manhattan. Closed studios, closed salons, a closed room of peers.
            Membership is by invitation or referral.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="group inline-flex items-center gap-2 rounded-full bg-accent text-accent-ink px-6 py-3 text-sm font-medium hover:bg-accent-muted transition-colors shadow-glow"
            >
              Request membership
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-bg-border bg-bg-elev/50 px-6 py-3 text-sm text-ink hover:border-ink-soft transition-colors backdrop-blur"
            >
              Member sign-in
            </Link>
          </div>
        </div>
      </section>

      {/* Houses */}
      <section id="houses" className="border-t border-bg-border/60 bg-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-4">
              <div className="label mb-4">§ 01 · The Houses</div>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-[1.05]">
                Four houses, one address.
                <br />
                <span className="text-ink-muted italic">You belong to one — and to all of them.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bg-border">
            {HOUSES.map((h) => (
              <article
                key={h.name}
                className="relative bg-bg p-10 md:p-12 overflow-hidden group"
              >
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${h.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="font-mono text-[11px] text-ink-soft tracking-widest mb-6">
                  HOUSE · {h.tag}
                </div>
                <h3 className="font-serif text-3xl md:text-4xl tracking-tight">{h.name}</h3>
                <p className="mt-6 text-ink-muted text-[15px] leading-relaxed max-w-md">
                  {h.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Building */}
      <section id="building" className="border-t border-bg-border/60 bg-[#06060a]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-4">
              <div className="label mb-4">§ 02 · The Building</div>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-[1.05]">
                Six floors.
                <br />
                <span className="text-ink-muted italic">Each one earns its quiet.</span>
              </h2>
            </div>
          </div>

          <div className="border border-bg-border rounded-2xl overflow-hidden">
            {FLOORS.slice().reverse().map((f, i) => (
              <div
                key={f.n}
                className={`grid grid-cols-12 gap-4 items-center px-6 md:px-10 py-7 md:py-8 ${i !== 0 ? "border-t border-bg-border" : ""} hover:bg-bg-elev/40 transition-colors`}
              >
                <div className="col-span-2 md:col-span-1 font-serif text-3xl md:text-5xl text-ink-soft tabular-nums">
                  {f.n}
                </div>
                <div className="col-span-10 md:col-span-5">
                  <div className="font-serif text-xl md:text-2xl tracking-tight">{f.name}</div>
                </div>
                <div className="hidden md:block md:col-span-5 text-ink-muted text-sm">
                  {f.note}
                </div>
                <div className="col-span-12 md:col-span-1 text-right">
                  <span className="font-mono text-[10px] text-ink-soft tracking-widest">FL/{String(f.n).padStart(2, "0")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In Residence */}
      <section id="residence" className="border-t border-bg-border/60 bg-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-4">
              <div className="label mb-4">§ 03 · In Residence</div>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-[1.05]">
                A small room of peers.
                <br />
                <span className="text-ink-muted italic">Names withheld at the door.</span>
              </h2>
              <p className="mt-6 text-ink-muted max-w-2xl">
                Grammy nominees, festival directors, founders mid-raise, and the engineers, editors,
                and writers who quietly make their work possible. Membership is capped per house.
              </p>
            </div>
          </div>

          {/* Silhouette grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-px bg-bg-border rounded-2xl overflow-hidden">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-bg-elev flex items-center justify-center relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    background: `radial-gradient(circle at 50% 35%, rgba(255,255,255,0.${(i % 7) + 2}) 0%, transparent 30%), linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6))`,
                  }}
                />
                <span className="relative font-mono text-[10px] text-ink-soft">
                  M·{String(i + 1).padStart(3, "0")}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              ["210", "Active members"],
              ["4", "Houses"],
              ["38", "Rooms & stages"],
              ["1", "Door"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-serif text-4xl md:text-5xl tracking-tight">{v}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink-soft">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programming */}
      <section id="programming" className="border-t border-bg-border/60 bg-[#06060a]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
            <div>
              <div className="label mb-4">§ 04 · This Month</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-[1.05]">
                Programming.
                <br />
                <span className="text-ink-muted italic">Closed-door, open ears.</span>
              </h2>
            </div>
            <Link
              href="/login"
              className="text-sm text-ink-muted hover:text-ink inline-flex items-center gap-2"
            >
              Members see the full calendar
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="border-t border-bg-border">
            {PROGRAMMING.map((p) => (
              <div
                key={p.title}
                className="grid grid-cols-12 gap-4 items-baseline border-b border-bg-border py-6 md:py-7 hover:bg-bg-elev/30 transition-colors px-2"
              >
                <div className="col-span-3 md:col-span-2">
                  <div className="font-serif text-2xl md:text-3xl tracking-tight">{p.date}</div>
                  <div className="text-[11px] uppercase tracking-widest text-ink-soft">{p.month}</div>
                </div>
                <div className="col-span-9 md:col-span-7">
                  <div className="font-serif text-xl md:text-2xl tracking-tight">{p.title}</div>
                  <div className="text-sm text-ink-muted mt-1">{p.host}</div>
                </div>
                <div className="hidden md:flex col-span-3 justify-end">
                  <span className="pill">{p.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-bg-border/60 bg-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="text-center">
            <div className="label mb-8">In quiet partnership with</div>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {PARTNERS.map((p) => (
                <span
                  key={p}
                  className="font-serif text-lg md:text-xl text-ink-muted/70 hover:text-ink-muted transition-colors tracking-wide"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="border-t border-bg-border/60 bg-[#06060a] relative overflow-hidden">
        <div className="absolute inset-0 -z-10 [background:radial-gradient(60%_80%_at_50%_120%,rgba(230,255,61,0.10),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-28 md:py-36 text-center">
          <div className="label mb-6">§ 05 · Apply</div>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.0]">
            Membership is by
            <br />
            <span className="italic text-ink-muted">invitation or referral.</span>
          </h2>
          <p className="mt-8 text-ink-muted max-w-xl mx-auto">
            Tell us who you are and what you're making. We read every application —
            and reply within ten days.
          </p>
          <div className="mt-10">
            <Link
              href="/apply"
              className="group inline-flex items-center gap-2 rounded-full bg-accent text-accent-ink px-7 py-3.5 font-medium hover:bg-accent-muted shadow-glow"
            >
              Begin your application
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-bg-border/60 bg-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <Logo />
              <div className="mt-4 text-xs text-ink-soft max-w-xs leading-relaxed">
                5E47 · A members-only creative residency. 47 Fifth, New York.
                Music · Film · Mastery · Founders.
              </div>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-4 text-xs">
              <div>
                <div className="label mb-2">Members</div>
                <Link href="/login" className="block text-ink-muted hover:text-ink py-0.5">Sign in</Link>
                <Link href="/apply" className="block text-ink-muted hover:text-ink py-0.5">Apply</Link>
              </div>
              <div>
                <div className="label mb-2">Visit</div>
                <a className="block text-ink-muted py-0.5">47 Fifth Avenue</a>
                <a className="block text-ink-muted py-0.5">New York · NY</a>
              </div>
              <div>
                <div className="label mb-2">Network</div>
                <Link href="/login" className="block text-ink-muted hover:text-ink py-0.5">Sponsor portal</Link>
                <Link href="/login" className="block text-ink-muted hover:text-ink py-0.5">Investor portal</Link>
                <Link href="/login" className="block text-ink-muted hover:text-ink py-0.5">Operate this network →</Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-bg-border/60 flex flex-wrap justify-between gap-3 text-[11px] text-ink-soft">
            <span>© MMXXVI · 5E47 Holdings</span>
            <span className="font-mono tracking-wider">v0.1 · est. 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
