# Hit House — SPV Capitalization Strategy

**Company:** Hasenpfeffer Ventures LLC (operating as **Hit House**)
**Document type:** Capital structure & special-purpose-vehicle (SPV) financing strategy for an asset-light, lease-led, multi-location creator membership network
**Version:** 2.0 · **Horizon:** 5 years · **Aligned to:** the Leased Network Pivot Strategy (doc 08) · Business Plan (doc 02) §9 · Business Model Canvas (doc 01)
**Prepared for:** Founders, the board, prospective capital partners (private equity, family offices, strategic capital), and counsel

> **Pivot note (v2.0).** Hit House leases rather than owns. There is no real-estate-owning **PropCo**: the building at 5 East 47th Street is gone, and real estate is now an operating lease expense, not an owned asset. This version replaces the PropCo with **per-market Leasehold/OpCo SPVs** (which hold each market's leases and run its cycles) and replaces the per-building **AI Studio Equipment SPV** with a single shared **Central Compute SPV** (colo/cloud core + portable rigs). The Leased Network Pivot Strategy (doc 08) governs the model; this document is how it is capitalized.

> **Terminology note.** Like the rest of `/docs`, this document uses industry-standard vocabulary. Where the investor deck uses brand-coined names (Volume, 47 Slate, 47 Equity Pact, Genesis Node), the operating equivalents are used here (Production Cycle, Project Slate, Project Participation Agreement, Location). See the canvas (doc 01) glossary.

> **Illustrative & not advice.** Every structure, percentage, and term below is an illustrative planning model anchored to the deck's operating constants (100 residents/cycle, 4 cycles/year, $3,500 entry, 70/20/10 Project Participation split, the AI Studio capex tiers in business-plan §9.5). Nothing here is legal, tax, securities, or investment advice. Final entity, securities-exemption, and tax structuring must be set with qualified counsel and the company's accountants before any capital is raised.

---

## 1. Why SPVs at all

5E47 is not one asset. It is a **stack of distinguishable assets with different risk, duration, and investor profiles**, all currently implied to sit inside a single operating LLC:

- **Leaseholds** — the leased, interchangeable House-Standard spaces in each market. Medium-duration, opex-driven; the liability is the lease commitment, not an owned building.
- **The operating business** — Production Cycles, dues, the Sam + Scout agent platform, hospitality. Medium-duration, cash-generative, scarcity-capped.
- **Shared compute** — the central colo/cloud GPU core plus portable on-site inference rigs that serve every location. Depreciating/leasable, financeable on its own, amortized across the network.
- **The IP catalog** — the Project Slate. Long-tail, optionality-heavy, uncorrelated to the operating business; behaves like a film/music slate.
- **Per-location expansion** — NY, LA, London, Tokyo, then Atlanta / Dubai / Riyadh / Abu Dhabi. Each a fresh capped scarcity market with its own lease and its own underwriting.

Forcing all of these into one balance sheet does three bad things: it **commingles risk** (a Slate write-down bleeds into a lease covenant; a location that underperforms drags the catalog), it **forces every investor into the same instrument** when a family office wants a market's leasehold-backed operating cash flow and a strategic wants the IP, and it **caps replication** because every new city has to be financed off the parent's balance sheet.

SPVs solve all three. Each SPV is a **bankruptcy-remote, single-purpose entity** that ring-fences one asset, carries its own capital stack, and lets the right capital meet the right risk. This is the same architecture used in real estate (PropCo/OpCo), film slate financing, and infrastructure project finance — applied to a cultural-infrastructure network.

This strategy keeps the deck's promise to capital partners intact — *"fixed revenue floor (cycle entry + dues) + compounding IP upside (Project Slate); multi-location replication engineered in"* (canvas §1) — while making each of those three things separately investable.

## 2. Entity architecture (the SPV map)

The recommended structure is a **HoldCo / ManagementCo over a family of asset SPVs**, with Hasenpfeffer Ventures LLC repositioned from a do-everything operating company into the holding and management apex.

```
                    Hasenpfeffer Ventures LLC  (HoldCo / ManagementCo, GP)
                    · brand & IP licensor · Sam + Scout platform owner · GP / manager
                    · holds carried interest & management contracts
                                       │
        ┌───────────────────┬──────────┼───────────────┬─────────────────────┐
        │                   │          │               │                     │
  ┌───────────────┐  ┌────────────┐ ┌───────────┐ ┌────────────┐   ┌─────────────────┐
  │ Leasehold/OpCo │  │ Central     │ │ Project    │ │ Sponsor    │   │ more Leasehold/  │
  │ SPV — NY       │  │ Compute     │ │ Slate      │ │ Royalty    │   │ OpCo SPVs        │
  │ · holds lease  │  │ SPV         │ │ Finance    │ │ Pool SPV   │   │ (LA / London /   │
  │ · runs cycles  │  │ (colo/cloud │ │ SPV(s)     │ │ (10% pool, │   │  Tokyo …) —      │
  │ · light fit-out│  │  core +     │ │ (IP catalog│ │ sponsor    │   │  one per market  │
  │   to House Std │  │  rigs)      │ │ + slate $) │ │ LPs)       │   │                  │
  └───────────────┘  └────────────┘ └───────────┘ └────────────┘   └─────────────────┘
        │
   leases space from a 3rd-party landlord; licenses brand + Sam + Scout from HoldCo;
   buys compute as a service from the Central Compute SPV
```

| SPV | Holds / does | Why it is separate | Typical capital |
|---|---|---|---|
| **HoldCo / ManagementCo** (Hasenpfeffer Ventures LLC) | Brand, trademarks, the Sam + Scout platform IP, management & licensing contracts, carry | Apex value accrual; keeps brand/platform out of any single asset's creditors | Founder equity + a small strategic/platform round |
| **Leasehold / OpCo SPV** (one per market) | That market's lease(s), light fit-out, and the operating business — cycles, dues, hospitality, bookings | Ring-fences the **lease liability** and operating risk per city, so a bad lease or soft market can't cross to other markets or the HoldCo | Mostly LP + network equity, plus a working-capital line; licenses brand/Sam/Scout from HoldCo; **no mortgage** |
| **Central Compute SPV** | The shared colo/cloud GPU core + portable on-site inference rigs serving every location (doc 08 §7) | Depreciating compute is financeable/leasable on its own and amortizes across all markets; isolates obsolescence risk | Equipment debt / lease + equity; bills each Leasehold/OpCo per the §9 AI-Studio-as-a-Service model |
| **Project Slate Finance SPV(s)** | Greenlit Slate projects' production financing, chain-of-title, and royalty receivables | Slate is uncorrelated, long-tail, and the prime upside; isolates IP from operating creditors | Slate equity, revolving production facility, possible securitization later |
| **Sponsor Royalty Pool SPV** | The 10% Sponsor Royalty Pool and its quarterly distributions | Gives sponsors an auditable, bankruptcy-remote claim on Slate output | Sponsor capital → pool units; no leverage |

Each new market is simply another **Leasehold/OpCo SPV** spun from the same template — underwritten and capitalized on its own selection pressure, sharing the brand, Sam + Scout, the Central Compute SPV, and the Slate catalog.

The two non-negotiable design rules that make this a real SPV structure and not just nested LLCs:

1. **Bankruptcy remoteness / non-recourse ring-fencing.** Each SPV's obligations — including its **lease guaranty** — are recourse only to that SPV's assets. A separateness covenant (own books, own bank account, no commingling, independent decision on insolvency filing) keeps a creditor or landlord of one SPV from reaching another or the HoldCo.
2. **Arm's-length intercompany terms.** HoldCo licenses brand + Sam + Scout to each Leasehold/OpCo SPV at a market royalty; the Central Compute SPV bills each market at the §9 AI-Studio-as-a-Service rate. (There is no intercompany rent — each Leasehold SPV leases directly from a third-party landlord.) These flows are how value moves up to HoldCo *and* how each SPV's standalone economics stay legible to its own investors.

## 3. The capital stack, per SPV

Different assets justify different stacks. The strategy matches instrument to asset duration and volatility.

| SPV | Senior debt | Mezz / preferred | Common equity | Rationale |
|---|---|---|---|---|
| **Leasehold / OpCo (per market)** | Working-capital line only — **no mortgage** | optional bridge | Mostly network + local LP equity | Leases (not owns); the obligations are the lease deposit, light fit-out, and make-good. Don't lever the operating/brand engine; keep each market's lease liability ring-fenced |
| **Central Compute** | Equipment lease / loan, 60–75% of cost | — | 25–40% equity | Compute is collateral; lease aligns cost with the depreciation curve and avoids stranding obsolete GPUs; one core amortizes across all markets |
| **Project Slate Finance** | Revolving production facility (borrowing-base on greenlit projects) | Slate preferred | Slate common / carry | Mirrors film-slate finance: debt against contracted receivables, equity for the long-tail upside |
| **Sponsor Royalty Pool** | None | — | Pool units | Sponsors convert marketing spend to asset participation; leverage would defeat the auditable-claim purpose |

Equity inside each SPV is itself tiered so that the GP, founders, early capital, and later capital sit in the right place:

- **Class A — Preferred LP units.** Capital partners' money. Carries a **preferred return (hurdle)**, e.g. 8% cumulative, and **return-of-capital priority** in the waterfall. This is the deck's *"fixed revenue floor."*
- **Class B — Common / founder units.** Held by HoldCo and founders. Takes residual upside after the preferred is satisfied — this is where the *"compounding IP upside"* concentrates.
- **Carried interest** to the GP (HoldCo) above the hurdle, typically 20% — standard for the manager who sources, builds, and operates.
- **Management fee** to HoldCo for running the SPV (e.g. ~1.5–2% of committed/deployed capital, or a fixed services fee), keeping the manager funded between distributions.

## 4. The distribution waterfall

Each cash-generating SPV distributes on a standard four-tier waterfall. Illustrative for a Leasehold/OpCo SPV:

1. **Return of capital** — 100% to Class A LPs until they have their invested capital back.
2. **Preferred return** — to Class A LPs until the cumulative hurdle (e.g. 8%/yr) is met.
3. **GP catch-up** — to HoldCo until the GP has its target share of profits above return-of-capital (so carry is on the *whole* profit, not just the slice above the hurdle).
4. **Carried-interest split** — thereafter, e.g. **80% to equity holders pro rata / 20% carried interest to HoldCo (GP).**

The **Project Slate** layers the deck's project-level economics *underneath* this. At the project level the Project Participation Agreement (the deck's *47 Equity Pact*) splits gross Slate economics **70% resident / 20% House (Hasenpfeffer) / 10% Sponsor Royalty Pool** (business-plan §9.1, canvas §5). The **House 20%** is the cash that flows up into the Project Slate Finance SPV and then through *its* waterfall to Slate investors; the **Sponsor 10%** flows to the Sponsor Royalty Pool SPV and out to sponsor unit-holders. Resident ownership (the default 100%, with Participation opt-in only on greenlit projects — canvas §4) is never an SPV asset; it stays with the resident.

This two-level design is the point: **investors buy into the House and Sponsor shares of slate output via the SPVs, without ever touching resident ownership** — which is what makes "an asset class, not an amenity" legally true rather than just a tagline.

## 5. Replication — the Location SPV template

The business plan's expansion thesis (doc 02 §10) is that *"each new Location is a fresh capped scarcity market … underwritten only on proven local selection pressure and partner depth."* SPVs are what make that financeable without betting the parent:

- **One template, many closings.** The NY Leasehold/OpCo SPV is the blueprint. Each new city is a single SPV spun from the same documents — same waterfall, same brand/Sam/Scout license from HoldCo, same lease-guaranty and separateness covenants — so legal and underwriting cost amortizes across the network, and **Scout's pipeline (doc 08 §4) feeds the space into the SPV**.
- **Underwrite locally, raise on the network.** A Leasehold/OpCo SPV is greenlit only on its own selection pressure (the predictive layer recalibrates per market) and a signed-or-sourced lease, but capital is sourced from both local partners and the network's existing LPs, who get **per-deal allocation** rather than a blind pool.
- **Capital follows proof, not ambition.** New-market SPVs close only once selection pressure and a House-Standard lease are in hand — so a slow market can't drain the network, and an opportunistic space can be taken quickly because the raise is light (no buildout).
- **HoldCo compounds across all of them.** Every Leasehold/OpCo SPV pays brand + Sam + Scout license fees and carry up to HoldCo, and buys compute from the Central Compute SPV. The catalog (Project Slate) is one queryable asset across markets, so the Slate SPV's value compounds with each new production engine while each market's lease risk stays local.

This is the deck's *Genesis Node → global blueprint* expressed as a capital structure: **the leasehold is local and unlevered, the operating company is local and equity-funded, and the brand/platform/IP/compute is shared and compounds at the top** — interchangeable by design.

## 6. Securities, investor eligibility & governance

5E47 is *invitation-only* on the membership side; the capital side should mirror that discipline.

- **Private placement, accredited only.** Raise each SPV as a private placement under a Reg D exemption (e.g. **506(b)** for an existing-relationship, no-general-solicitation raise — which fits the referral-and-discretion culture; **506(c)** only if the company wants to publicly market a raise and verify accredited status). Foreign LPs raise additional Reg S / blocker questions (below).
- **Accredited / qualified investors.** Capital partners are, per the canvas, *"private equity, family offices, strategic capital."* Keep each SPV under the relevant beneficial-owner counts (e.g. the 3(c)(1) 100-investor / qualifying-venture thresholds) to avoid being treated as an investment company, or structure intentionally as a fund with the right exemption.
- **Closed allocation.** The canvas already commits to *"closed allocation in Hasenpfeffer Ventures LLC"* — preserve that: capped raises, no rolling open-ended subscription, scarcity on the cap table to match scarcity in the cohort.
- **Information rights & reporting.** The platform already has an **investor experience** (`/investor`: financials, operations, network map) and a **Finance Agent** for "royalty-pool accounting … investor reporting" (canvas §5). SPV LPs get quarterly statements, the waterfall position, and Slate distribution reporting through that surface — the product is the reporting layer.
- **Governance.** HoldCo (GP) controls day-to-day; major decisions (sale, refinance, new debt, related-party changes) carry LP consent thresholds. Each SPV keeps an independent decision-maker for insolvency to preserve bankruptcy remoteness.

## 7. Tax structuring (illustrative)

- **Pass-through by default.** LLC SPVs are pass-through for US tax, so income is taxed once at the investor level — efficient for the PE/family-office base.
- **Blocker corporations** where needed. Tax-exempt LPs (endowments, foundations) avoiding UBTI, and non-US LPs avoiding ECI/US filing, invest through a **C-corp blocker** above the SPV. The deck's Phase III markets (Dubai, Riyadh, Abu Dhabi, Tokyo, London) make non-US capital likely, so build the blocker option into the template.
- **Leases.** Rent is currently deductible operating expense at each Leasehold/OpCo SPV; light fit-out / leasehold improvements are depreciated (or expensed where eligible) at the SPV that incurs them. There is no owned building to carry depreciation or a mortgage-interest shield — the trade-off for the lower capital intensity and flexibility of the leased model.
- **IP.** Centralize trademarks and the Sam platform in HoldCo as the licensor so brand royalties accrue at the apex; keep Slate chain-of-title clean at the Slate SPV (the canvas already requires per-project chain-of-title registration).

## 8. Illustrative inaugural raise

Mapping to business-plan §9.5 *use of funds* (four-floor buildout, the Floor-6 AI Studio, security infrastructure, the Sam platform, Slate legal/registry, 18-month runway), a launch capitalization could be split across three vehicles rather than one blended round:

| Vehicle | Funds | Rough size (illustrative) | Instrument |
|---|---|---|---|
| **HoldCo (platform)** | Sam + Scout platform, brand, Slate legal & registry, security protocol, 18-month operating runway | Operating raise | Founder + strategic equity |
| **NY Leasehold/OpCo SPV** | Lease deposit + light/portable fit-out to House Standard + working capital for the first cycles | Light — deposit + fit-out, not a buildout | Mostly equity; working-capital line; **no mortgage** |
| **Central Compute SPV** | Shared colo/cloud GPU core (Standard tier ~$500K–$900K per §9.5) + portable on-site inference rigs | ~$0.6M–$1.0M | Equipment lease/loan + equity |

Sequencing: **HoldCo first** (so the brand, Sam + Scout, and operating runway exist), the **NY Leasehold/OpCo SPV once Scout has a House-Standard lease**, the **Central Compute SPV at fit-out**, and the **Project Slate Finance SPV and Sponsor Royalty Pool SPV stood up in Year 2** when the first projects are greenlit (matching the §9.2 trajectory where the Slate matures and the royalty pool goes active in Years 2–3). Additional **Leasehold/OpCo SPVs** open per market as Scout sources leases and selection pressure proves out — no longer gated as a distant "Phase II."

## 9. Risks specific to the SPV structure

| Risk | Mitigation |
|---|---|
| Separateness breaks (veil-pierce) and ring-fencing fails | Strict separateness covenants: own books/accounts, arm's-length intercompany agreements, independent insolvency decision-maker, no commingling |
| Intercompany terms challenged as non-arm's-length | Benchmark brand royalty, rent, and AI-Studio billing to third-party comps; document and review annually |
| Cap-table sprawl across many SPVs | One master template + the `/investor` reporting surface; standardized waterfall and docs so every SPV reads the same |
| Lease liability / over-commitment at a Leasehold SPV | Ladder short-to-medium leases with break options; ring-fence the lease guaranty in the market's own SPV; keep operations unlevered (see doc 08 §9) |
| Compute obsolescence / over-leverage at Central Compute SPV | Conservative financing; lease (don't buy) where possible; one shared core kept utilized across markets |
| Investment Company Act / fund-status exposure | Stay within 3(c)(1)/qualifying-venture thresholds per SPV, or structure deliberately as a fund with counsel |
| Slate underperforms and Slate SPV can't service its facility | Borrowing-base sized only to contracted/greenlit receivables; equity, not debt, carries the long-tail bet |
| Non-US / tax-exempt capital creates UBTI/ECI | Blocker corps built into the template from day one |

## 10. Document checklist — what we need to draft

Standing up the structure in §2 is a paperwork exercise as much as a financing one. The documents fall into eight groups. The **"Per"** column says how many copies you draft: **once** (network-wide), **per SPV** (every vehicle gets its own), or **per raise** (every capital event). Bankruptcy remoteness is *created by these documents* — the separateness covenants and arm's-length intercompany agreements are what make the SPV map in §2 real rather than decorative.

### A. Entity formation — *per SPV*

| Document | Purpose |
|---|---|
| Certificate of Formation / Articles of Organization | Files the SPV into existence (Delaware LLC is the usual default) |
| **Operating Agreement** (LLC) or **Limited Partnership Agreement** (LP) | The core governance + economics doc: unit classes, waterfall, GP authority, transfer restrictions, separateness covenants |
| Initial member/manager consent & organizational resolutions | Authorizes the bank account, the manager, the opening transactions |
| EIN / tax registration | Federal tax ID for each entity |
| Foreign qualification | Registers the SPV to do business in NY (and each Location's state/country) |
| Registered-agent appointment | Required for service of process in the state of formation |

### B. Securities & offering — *per raise*

| Document | Purpose |
|---|---|
| **Private Placement Memorandum (PPM)** | Discloses the opportunity, terms, and risk factors to prospective LPs |
| Term sheet | The headline economics before full docs are drawn |
| **Subscription Agreement** | The contract by which an LP commits capital and makes reps |
| Accredited-investor questionnaire / verification | Establishes Reg D eligibility (verification is mandatory under 506(c)) |
| **Form D** (SEC) + blue-sky / state notice filings | The federal exemption notice and per-state filings |
| Side letters | Bespoke terms for anchor or strategic LPs (fee, co-invest, MFN) |

### C. Capital structure & governance — *once (templates) + per SPV*

| Document | Purpose |
|---|---|
| Cap table | Live record of units, classes, and ownership per SPV |
| Unit/class designations | Defines Class A preferred vs Class B common rights (§3) |
| Distribution-waterfall schedule | The four-tier waterfall (§4) as an exhibit to the Operating Agreement |
| **Management Agreement** | HoldCo's authority, scope, and management fee for running each SPV |
| Carried-interest / GP economics terms | How carry vests and is paid to HoldCo (§3) |

### D. Intercompany agreements — *per SPV (these create the ring-fence)*

| Document | Between |
|---|---|
| **Brand & IP License** | HoldCo → each Leasehold/OpCo SPV (market royalty for the Hit House marks) |
| **Sam + Scout Platform / Technology License** (or SaaS agreement) | HoldCo → each Leasehold/OpCo SPV |
| **AI-Studio-as-a-Service agreement** | Central Compute SPV → each Leasehold/OpCo SPV, billed at the §9 rate |
| Management Services Agreement | HoldCo → SPVs (shared back-office) |
| Separateness / non-recourse covenants | Embedded in each agreement and Operating Agreement |

### E. Real estate (lease) & financing — *per leased location / per leveraged SPV (Compute, Slate)*

| Document | Purpose |
|---|---|
| **Commercial lease** (or managed-office / turnkey agreement) | The third-party lease for each House-Standard location; favor flexibility, break options, percentage-rent where available |
| **Lease guaranty** (entity-level, ring-fenced) | Limits landlord recourse to the market's own Leasehold SPV — keeps the lease off the network's neck |
| **Fit-out / contractor & make-good agreements** | Light fit-out to House Standard and the restoration/reinstatement obligation at exit |
| Loan / Credit Agreement + Promissory Note | Senior debt terms for the Central Compute SPV / Slate facility |
| Security Agreement + UCC-1 | Pledges compute or Slate receivables as collateral (no mortgage in the leased model) |
| Limited (non-recourse, "bad-boy" carve-out) Guaranty | Keeps any debt non-recourse to the network while deterring fraud |

### F. Project Slate & Sponsor Royalty Pool — *per project / per pool*

| Document | Purpose |
|---|---|
| **Project Participation Agreement** (the deck's *47 Equity Pact*) | Project-level 70/20/10 split; opt-in only on greenlit Slate projects |
| Chain-of-title / IP assignment docs | Clean title on each Slate asset (already required by the canvas) |
| Slate financing / borrowing-base facility | Production financing against contracted receivables |
| Royalty distribution & accounting agreement | How the Slate SPV accounts and pays out |
| **Sponsor Royalty Pool participation / unit agreement** | How a sponsor converts spend into auditable pool units (the 10%) |

### G. Tax — *as needed*

| Document | Purpose |
|---|---|
| Blocker-corp formation + tax elections | For non-US / tax-exempt LPs to avoid ECI / UBTI |
| Entity-classification & other elections | Confirm pass-through (or blocker) treatment per entity |
| Cost-segregation study | Accelerates depreciation on the PropCo buildout |

### H. Ongoing & compliance — *per period, per SPV*

| Document | Purpose |
|---|---|
| Quarterly LP statements + waterfall position | Surfaced through the `/investor` experience and the Finance Agent |
| Schedule K-1s | Annual pass-through tax reporting to each LP |
| Annual report / franchise-tax filings | Keeps each entity in good standing |
| Audited or reviewed financials | Per LP information rights / side-letter requirements |

**Sequencing.** Draft the **once** items as templates first (master Operating Agreement, Management Agreement, intercompany forms, subscription/PPM shells). Then each new market's Leasehold/OpCo SPV is a *fill-in-the-template* close rather than a bespoke legal project, which is exactly what makes the §5 replication template cheap to repeat as Scout sources each new lease.

## 11. How this maps to the rest of `/docs`

- **Leased Network Pivot Strategy (doc 08):** the governing model for this version — the lease-led, interchangeable-location business this capital structure finances. Read it first.
- **Business Model Canvas (doc 01):** this strategy is the *Key Partnerships / Cost Structure* mechanics for the line *"Capital partners — LPs in Hasenpfeffer Ventures LLC: buildout, operations, expansion."*
- **Business Plan (doc 02) §9 & §10:** the §9.5 use-of-funds and the §10 multi-location blueprint are *what* gets financed; this doc is *how* — the vehicles and the stack.
- **Product (docs 03–04):** the Finance Agent (royalty-pool accounting, investor reporting) and the `/investor` experience are the operating surface for SPV LP reporting and distributions.
- **The deck:** every brand term (47 Equity Pact, Genesis Node, the IP catalog) maps to a structure here — the deck sells the asset class; this document is the capital architecture that makes it one.

---

*Document 07 of the Hit House documentation set. Illustrative planning model only — not legal, tax, securities, or investment advice. Final structuring requires qualified counsel and the company's accountants.*
