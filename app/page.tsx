import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { Logo } from "@/components/shell/logo";
import { Reveal } from "@/components/landing/reveal";
import { FilmStill } from "@/components/landing/film-still";
import { Portrait } from "@/components/landing/portrait";
import { BuildingElevation } from "@/components/landing/building-elevation";
import { HouseGlyph } from "@/components/landing/house-glyph";

// Set USE_PHOTOS=true once /public/landing/ is populated. See the README
// there for the exact filenames expected.
const USE_PHOTOS = process.env.NEXT_PUBLIC_USE_LANDING_PHOTOS === "true";
const heroSrc = USE_PHOTOS ? "/landing/hero.jpg" : undefined;
const portraitSrc = (i: number) =>
  USE_PHOTOS ? `/landing/portraits/${String((i % 32) + 1).padStart(2, "0")}.jpg` : undefined;
const houseSrc = (k: "music" | "video" | "masterclass" | "founders") =>
  USE_PHOTOS ? `/landing/houses/${k}.jpg` : undefined;

const HOUSES = [
  {
    tag: "I",
    name: "Music",
    body: "Mixing rooms, vocal booths, and quiet nights for artists building catalogs that will outlive the cycle.",
    glyph: "music" as const,
  },
  {
    tag: "II",
    name: "Video Production",
    body: "An LED volume, edit bays, and a stage configured for short-form, long-form, and the thing in between.",
    glyph: "video" as const,
  },
  {
    tag: "III",
    name: "Masterclass",
    body: "Closed-door instruction from operators who would rather teach a room of seven than a room of seven hundred.",
    glyph: "masterclass" as const,
  },
  {
    tag: "IV",
    name: "Founders",
    body: "Writers' rooms for entrepreneurs — quiet floors, sharp peers, a kitchen, and a door that closes.",
    glyph: "founders" as const,
  },
];

const FLOORS = [
  { n: 7, name: "Recording Studios", note: "High-fidelity suites · vocal isolation booth" },
  { n: 6, name: "Post-Production & AI Studio", note: "LED volume · on-prem model cluster · edit bays" },
  { n: 5, name: "Listening Lounge & Member Salon", note: "Reference room · lockers · programming nights" },
  { n: 4, name: "Business & Deal Floor", note: "IP admin · chain-of-title · resident keys" },
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
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-bg/60 border-b border-bg-border/50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 text-[12.5px] tracking-wide text-ink-muted">
            <a href="#houses" className="hover:text-ink transition-colors">The Houses</a>
            <a href="#building" className="hover:text-ink transition-colors">The Building</a>
            <a href="#programming" className="hover:text-ink transition-colors">Programming</a>
            <a href="#residence" className="hover:text-ink transition-colors">In Residence</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-[12.5px] text-ink-muted hover:text-ink transition-colors hidden sm:inline"
            >
              Member sign-in
            </Link>
            <Link
              href="/apply"
              className="rounded-full bg-accent text-accent-ink px-4 py-1.5 text-[12.5px] font-medium hover:bg-accent-muted transition-colors"
            >
              Request membership
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[100svh] overflow-hidden flex items-end isolate">
        {/* Film-still backdrop with Ken Burns */}
        <div className="absolute inset-0 -z-20">
          <FilmStill className="w-full h-full animate-kenburns" src={heroSrc} />
        </div>
        {/* Color grade + grain over the still */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 [background:radial-gradient(70%_60%_at_18%_30%,rgba(230,255,61,0.10),transparent_60%),radial-gradient(60%_60%_at_85%_70%,rgba(124,92,255,0.16),transparent_60%),linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.65)_60%,rgba(0,0,0,0.92)_100%)]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.10] mix-blend-overlay" aria-hidden>
            <filter id="grain-h">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain-h)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-40 pb-20 md:pb-28">
          <Reveal>
            <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.28em] text-ink-soft mb-10">
              <Lock className="size-3" />
              <span>By invitation</span>
              <span className="text-bg-border">·</span>
              <span>New York</span>
              <span className="text-bg-border">·</span>
              <span>Est. MMXXVI</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="font-serif font-normal text-[clamp(2.6rem,7.6vw,6.5rem)] leading-[0.94] max-w-5xl text-balance">
              A members-only home
              <br />
              for music, film, mastery,
              <br />
              <span className="text-ink-muted italic">and the people building</span>
              <br />
              <span className="text-ink-muted italic">what's next.</span>
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-12 max-w-xl text-ink-muted text-[15px] md:text-[17px] leading-[1.7]">
              Four floors in Midtown Manhattan. Closed studios, closed salons,
              a closed room of peers. Membership is by invitation or referral.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="group inline-flex items-center gap-2 rounded-full bg-accent text-accent-ink px-6 py-3 text-sm font-medium hover:bg-accent-muted transition-colors shadow-glow"
              >
                Request membership
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-bg-border bg-bg-elev/50 backdrop-blur px-6 py-3 text-sm text-ink hover:border-ink-soft transition-colors"
              >
                Member sign-in
              </Link>
            </div>
          </Reveal>

          {/* Frame markers — bottom */}
          <div className="absolute left-6 md:left-10 right-6 md:right-10 bottom-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ink-soft/70 font-mono">
            <span>5E47 · A · 47°FIFTH</span>
            <span className="hidden sm:inline">f/2.0 · 1/60 · ISO 800</span>
            <span>SCROLL ↓</span>
          </div>
        </div>
      </section>

      {/* Houses */}
      <section id="houses" className="relative border-t border-bg-border/60 bg-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36">
          <div className="grid md:grid-cols-12 gap-10 mb-20">
            <Reveal className="md:col-span-4">
              <div className="label mb-4">§ 01 · The Houses</div>
            </Reveal>
            <Reveal delay={120} className="md:col-span-8">
              <h2 className="font-serif text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] text-balance">
                Four houses, one address.
                <br />
                <span className="text-ink-muted italic">You belong to one — and to all of them.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bg-border">
            {HOUSES.map((h, i) => (
              <Reveal as="article" key={h.name} delay={i * 120} className="bg-bg group">
                <div className="grid grid-cols-1 sm:grid-cols-5">
                  <div className="sm:col-span-2 aspect-[5/4] sm:aspect-auto overflow-hidden">
                    <div className="w-full h-full transition-transform duration-1000 group-hover:scale-[1.04]">
                      <HouseGlyph kind={h.glyph} src={houseSrc(h.glyph)} />
                    </div>
                  </div>
                  <div className="sm:col-span-3 p-10 md:p-12 flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[10.5px] text-ink-soft tracking-[0.28em] mb-6">
                        HOUSE · {h.tag}
                      </div>
                      <h3 className="font-serif text-3xl md:text-4xl leading-[1.05]">
                        {h.name}
                      </h3>
                      <p className="mt-6 text-ink-muted text-[14.5px] leading-[1.75] max-w-md">
                        {h.body}
                      </p>
                    </div>
                    <div className="mt-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                      <span className="h-px w-8 bg-bg-border" />
                      Capped per cohort
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Building */}
      <section id="building" className="relative border-t border-bg-border/60 bg-[#06060a]">
        <div className="absolute inset-0 -z-10 [background:radial-gradient(60%_50%_at_85%_30%,rgba(230,255,61,0.06),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36">
          <div className="grid md:grid-cols-12 gap-10 mb-20">
            <Reveal className="md:col-span-4">
              <div className="label mb-4">§ 02 · The Building</div>
            </Reveal>
            <Reveal delay={120} className="md:col-span-8">
              <h2 className="font-serif text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] text-balance">
                Four floors.
                <br />
                <span className="text-ink-muted italic">Each one earns its quiet.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-12 gap-10 items-start">
            <Reveal className="md:col-span-3 hidden md:block">
              <div className="surface-soft p-6 sticky top-28">
                <BuildingElevation className="w-full h-auto" highlightFloor={5} />
                <div className="mt-4 text-[11px] text-ink-soft text-center font-mono tracking-widest">
                  47°FIFTH · ELEV. 01
                </div>
              </div>
            </Reveal>
            <div className="md:col-span-9">
              <div className="border border-bg-border rounded-2xl overflow-hidden">
                {FLOORS.map((f, i) => (
                  <Reveal
                    key={f.n}
                    delay={i * 80}
                    className={`grid grid-cols-12 gap-4 items-center px-6 md:px-10 py-7 md:py-8 ${
                      i !== 0 ? "border-t border-bg-border" : ""
                    } hover:bg-bg-elev/40 transition-colors group cursor-default`}
                  >
                    <div className="col-span-2 md:col-span-1 font-serif text-3xl md:text-5xl text-ink-soft tabular-nums group-hover:text-ink transition-colors">
                      {f.n}
                    </div>
                    <div className="col-span-10 md:col-span-5">
                      <div className="font-serif text-xl md:text-2xl">{f.name}</div>
                    </div>
                    <div className="hidden md:block md:col-span-5 text-ink-muted text-sm">
                      {f.note}
                    </div>
                    <div className="col-span-12 md:col-span-1 text-right">
                      <span className="font-mono text-[10px] text-ink-soft tracking-widest">
                        FL/{String(f.n).padStart(2, "0")}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In Residence */}
      <section id="residence" className="relative border-t border-bg-border/60 bg-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36">
          <div className="grid md:grid-cols-12 gap-10 mb-20">
            <Reveal className="md:col-span-4">
              <div className="label mb-4">§ 03 · In Residence</div>
            </Reveal>
            <Reveal delay={120} className="md:col-span-8">
              <h2 className="font-serif text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] text-balance">
                A small room of peers.
                <br />
                <span className="text-ink-muted italic">Names withheld at the door.</span>
              </h2>
              <p className="mt-8 text-ink-muted text-[15px] leading-[1.75] max-w-2xl">
                Grammy nominees, festival directors, founders mid-raise, and the engineers, editors,
                and writers who quietly make their work possible. Membership is capped per house.
              </p>
            </Reveal>
          </div>

          {/* Editorial portrait wall */}
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-px bg-bg-border rounded-2xl overflow-hidden">
            {Array.from({ length: 32 }).map((_, i) => (
              <Reveal
                key={i}
                delay={(i % 8) * 60}
                className="aspect-square bg-bg-elev relative overflow-hidden group"
              >
                <Portrait index={i} src={portraitSrc(i)} />
                {/* Member ID overlay */}
                <div className="absolute inset-0 flex items-end justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="font-mono text-[9px] text-ink-soft tracking-widest">
                    M·{String(i + 1).padStart(3, "0")}
                  </span>
                  <span className="font-mono text-[9px] text-accent tracking-widest">
                    {["MUS", "VID", "MAS", "FND"][i % 4]}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                ["210", "Active members"],
                ["4", "Houses"],
                ["38", "Rooms & stages"],
                ["1", "Door"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-serif text-[clamp(2.2rem,5vw,3.4rem)] tabular-nums">{v}</div>
                  <div className="mt-2 text-[10.5px] uppercase tracking-[0.22em] text-ink-soft">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Programming */}
      <section id="programming" className="relative border-t border-bg-border/60 bg-[#06060a]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36">
          <div className="flex items-end justify-between mb-16 gap-6 flex-wrap">
            <div>
              <Reveal>
                <div className="label mb-4">§ 04 · This Month</div>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="font-serif text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] text-balance">
                  Programming.
                  <br />
                  <span className="text-ink-muted italic">Closed-door, open ears.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <Link
                href="/login"
                className="text-sm text-ink-muted hover:text-ink inline-flex items-center gap-2 group"
              >
                Members see the full calendar
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>

          <div className="border-t border-bg-border">
            {PROGRAMMING.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 100}
                className="grid grid-cols-12 gap-4 items-baseline border-b border-bg-border py-7 md:py-8 hover:bg-bg-elev/30 transition-colors px-2 group"
              >
                <div className="col-span-3 md:col-span-2">
                  <div className="font-serif text-2xl md:text-3xl">{p.date}</div>
                  <div className="text-[10.5px] uppercase tracking-[0.22em] text-ink-soft mt-1">
                    {p.month}
                  </div>
                </div>
                <div className="col-span-9 md:col-span-7">
                  <div className="font-serif text-xl md:text-2xl group-hover:text-ink transition-colors">
                    {p.title}
                  </div>
                  <div className="text-sm text-ink-muted mt-1.5">{p.host}</div>
                </div>
                <div className="hidden md:flex col-span-3 justify-end">
                  <span className="pill">{p.tag}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-bg-border/60 bg-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <Reveal>
            <div className="text-center">
              <div className="label mb-10">In quiet partnership with</div>
              <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
                {PARTNERS.map((p) => (
                  <span
                    key={p}
                    className="font-serif text-lg md:text-xl text-ink-muted/60 hover:text-ink-muted transition-colors tracking-wide"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="relative border-t border-bg-border/60 bg-[#06060a] overflow-hidden">
        <div className="absolute inset-0 -z-10 [background:radial-gradient(60%_80%_at_50%_120%,rgba(230,255,61,0.10),transparent_60%)]" />
        {/* Drifting dust motes */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {[15, 32, 55, 70, 88].map((left, i) => (
            <span
              key={i}
              className="absolute size-1 rounded-full bg-accent/40 animate-drift"
              style={{
                left: `${left}%`,
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 1.2}s`,
              }}
            />
          ))}
        </div>
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-32 md:py-40 text-center">
          <Reveal>
            <div className="label mb-8">§ 05 · Apply</div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.0] text-balance">
              Membership is by
              <br />
              <span className="italic text-ink-muted">invitation or referral.</span>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-10 text-ink-muted text-[15px] md:text-[17px] leading-[1.7] max-w-xl mx-auto">
              Tell us who you are and what you're making. We read every
              application — and reply within ten days.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-12">
              <Link
                href="/apply"
                className="group inline-flex items-center gap-2 rounded-full bg-accent text-accent-ink px-7 py-3.5 font-medium hover:bg-accent-muted shadow-glow"
              >
                Begin your application
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-bg-border/60 bg-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
          <div className="flex flex-wrap items-end justify-between gap-10">
            <div>
              <Logo />
              <div className="mt-5 text-xs text-ink-soft max-w-xs leading-[1.7]">
                5E47 · A members-only creative residency. 47 Fifth, New York.
                Music · Film · Mastery · Founders.
              </div>
            </div>

            <div className="flex flex-wrap gap-x-12 gap-y-4 text-xs">
              <div>
                <div className="label mb-3">Members</div>
                <Link href="/login" className="block text-ink-muted hover:text-ink py-0.5">Sign in</Link>
                <Link href="/apply" className="block text-ink-muted hover:text-ink py-0.5">Apply</Link>
              </div>
              <div>
                <div className="label mb-3">Visit</div>
                <span className="block text-ink-muted py-0.5">47 Fifth Avenue</span>
                <span className="block text-ink-muted py-0.5">New York · NY</span>
              </div>
              <div>
                <div className="label mb-3">Network</div>
                <Link href="/login" className="block text-ink-muted hover:text-ink py-0.5">Sponsor portal</Link>
                <Link href="/login" className="block text-ink-muted hover:text-ink py-0.5">Investor portal</Link>
                <Link href="/docs" className="block text-ink-muted hover:text-ink py-0.5">Documentation</Link>
                <Link href="/login" className="block text-ink-muted hover:text-ink py-0.5">Operate this network →</Link>
              </div>
            </div>
          </div>

          <div className="mt-14 pt-6 border-t border-bg-border/60 flex flex-wrap justify-between gap-3 text-[10.5px] text-ink-soft tracking-wider">
            <span>© MMXXVI · 5E47 Holdings</span>
            <span className="font-mono">v0.1 · est. 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
