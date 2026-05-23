// Subagent handlers. Each owns one Business Model Canvas block, reads/writes
// the domain model, and returns a reply fragment plus any actions. Sam
// (orchestrator) selects and composes these. Handlers are capability-aware:
// they never act outside the requester's RBAC scope.

import { bookings, campaigns, payments, residencies, studios } from "@/lib/data";
import { bus } from "@/lib/events";
import { can } from "@/lib/rbac";
import { formatCurrency } from "@/lib/utils";
import type { Booking } from "@/lib/types";
import { scarcityReport } from "./predictive";
import type { AgentContext, AgentTurn } from "./types";

const TIER_FEES: Record<string, number> = {
  explorer: 800,
  resident: 1400,
  anchor: 2400,
};

// ── Membership / Concierge ──────────────────────────────────────────────
export function handleMembership(ctx: AgentContext): AgentTurn {
  const residency = residencies.find((r) => r.creatorId === ctx.user.id);
  const isMember = ctx.user.role === "creator" && residency?.status === "active";
  const report = scarcityReport();

  if (isMember && residency) {
    return {
      agentId: "membership",
      intent: "membership",
      summary: "Returned active membership status.",
      reply: `You're an active ${residency.tier} member on Floor ${residency.floor}, at ${formatCurrency(
        residency.monthlyFee,
      )}/month. Your standing is in good order — I can help with bookings, access, or an introduction whenever you'd like.`,
    };
  }

  if (residency && residency.status === "in_review") {
    return {
      agentId: "membership",
      intent: "membership",
      summary: "Returned application status (in review).",
      reply:
        "Your application is with the committee. They meet weekly and reply within ten days — sooner if a member referral is on file. I'll let you know the moment there's news.",
      actions: [
        { type: "info", label: "Application in review", status: "pending", detail: "Committee decision pending" },
      ],
    };
  }

  return {
    agentId: "membership",
    intent: "membership",
    summary: "Explained membership tiers and the application path.",
    reply: `Membership is by invitation or referral, capped per House to keep the room small. The tiers are Explorer (${formatCurrency(
      TIER_FEES.explorer,
    )}/mo), Resident (${formatCurrency(TIER_FEES.resident)}/mo) and Anchor (${formatCurrency(
      TIER_FEES.anchor,
    )}/mo). We're currently at ${(report.overall.occupancy * 100).toFixed(
      0,
    )}% across the four Houses, so places are limited — I'd be glad to start an application and note any member who can refer you.`,
    actions: [
      { type: "application_started", label: "Begin application", status: "info", detail: "Visit /apply or tell me your House" },
    ],
  };
}

// ── Booking ───────────────────────────────────────────────────────────────
export function handleBooking(ctx: AgentContext): AgentTurn {
  if (!can(ctx.user.role, "studio.book")) {
    return {
      agentId: "booking",
      intent: "booking",
      summary: "Declined — requester lacks booking entitlement.",
      reply:
        "Studio bookings are reserved for active members. Once your membership is active I can hold any room in the building for you in seconds.",
    };
  }

  const msg = ctx.message.toLowerCase();
  const hoursMatch = msg.match(/(\d+)\s*(hours?|hrs?|h)\b/);
  const hours = Math.max(1, Math.min(12, hoursMatch ? parseInt(hoursMatch[1], 10) : 2));

  const studio =
    studios.find((s) => msg.includes(s.name.toLowerCase().split(" ·")[0])) ??
    studios.find((s) => msg.includes(s.kind)) ??
    studios.find((s) => s.kind === "audio");

  if (!studio) {
    return {
      agentId: "booking",
      intent: "booking",
      summary: "No studio matched the request.",
      reply:
        "Tell me which room you'd like — Audio A or B, the LED volume stage, the podcast studio, an edit bay, or the cyclorama — and for how long, and I'll hold it.",
    };
  }

  const startsAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const endsAt = new Date(startsAt.getTime() + hours * 60 * 60 * 1000);
  const cost = studio.hourlyRate * hours;
  const booking: Booking = {
    id: `bk_${Math.random().toString(36).slice(2, 8)}`,
    studioId: studio.id,
    creatorId: ctx.user.id,
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
    status: "confirmed",
    cost,
    notes: "Reserved via Sam.",
  };
  bookings.unshift(booking);
  bus.emit("booking.created", booking, ctx.user.id);

  return {
    agentId: "booking",
    intent: "booking",
    summary: `Booked ${studio.name} for ${hours}h.`,
    reply: `Done — I've held ${studio.name} on Floor ${studio.floor} for ${hours} hour${
      hours > 1 ? "s" : ""
    } tomorrow. That's ${formatCurrency(cost)} at ${formatCurrency(
      studio.hourlyRate,
    )}/hr, added to your account. You'll have access at the door.`,
    actions: [
      {
        type: "booking_created",
        label: `${studio.name} · ${hours}h`,
        status: "done",
        detail: `${formatCurrency(cost)} · Floor ${studio.floor}`,
      },
    ],
  };
}

// ── Operations ──────────────────────────────────────────────────────────
export function handleOperations(ctx: AgentContext): AgentTurn {
  const upcoming = bookings.filter((b) => new Date(b.startsAt) > new Date()).length;
  return {
    agentId: "operations",
    intent: "operations",
    summary: "Reported facility status.",
    reply: `All systems are nominal across the six floors. There ${
      upcoming === 1 ? "is" : "are"
    } ${upcoming} confirmed booking${upcoming === 1 ? "" : "s"} upcoming. If you need a specific room held or have an issue on a floor, tell me and I'll handle it or route it to the house team.`,
  };
}

// ── Finance ───────────────────────────────────────────────────────────────
export function handleFinance(ctx: AgentContext): AgentTurn {
  const mine = payments.filter((p) => p.userId === ctx.user.id);
  const pending = mine.filter((p) => p.status === "pending");
  const due = pending.reduce((s, p) => s + p.amount, 0);

  if (mine.length === 0) {
    return {
      agentId: "finance",
      intent: "finance",
      summary: "No payment history for requester.",
      reply: "You have no charges on file at the moment. I'll keep your account current and flag anything before it's due.",
    };
  }

  return {
    agentId: "finance",
    intent: "finance",
    summary: `Reported balance: ${formatCurrency(due)} due.`,
    reply:
      due > 0
        ? `Your current balance is ${formatCurrency(due)} across ${pending.length} item${
            pending.length > 1 ? "s" : ""
          } — ${pending.map((p) => p.description).join(", ")}. I can take care of it whenever you're ready. (Membership fees hold at the tier rate; we don't discount.)`
        : "Your account is fully settled — nothing outstanding. Thank you.",
    actions:
      due > 0
        ? [{ type: "info", label: `${formatCurrency(due)} due`, status: "pending" }]
        : undefined,
  };
}

// ── Access ────────────────────────────────────────────────────────────────
export function handleAccess(ctx: AgentContext): AgentTurn {
  const residency = residencies.find((r) => r.creatorId === ctx.user.id);
  if (!residency) {
    return {
      agentId: "access",
      intent: "access",
      summary: "No residency — access limited to lobby/escorted.",
      reply:
        "Without an active residency, access is limited to the lobby and invited programming with an escort. Once you're a member, your credential opens the floors your House and tier allow.",
    };
  }
  return {
    agentId: "access",
    intent: "access",
    summary: `Explained access for Floor ${residency.floor} resident.`,
    reply: `Your credential opens the lobby, the audio rooms, and your home Floor ${residency.floor}. The LED volume stage on Floor 5 and Salons on Floor 6 open for booked sessions and programming nights. Tap your phone at any door — if something's locked that shouldn't be, tell me and I'll grant it.`,
  };
}

// ── Sponsorship ───────────────────────────────────────────────────────────
const QUARTERLY_ACTIVATION_SLOTS = 8;
export function handleSponsorship(ctx: AgentContext): AgentTurn {
  const active = campaigns.filter((c) => c.status === "active").length;
  const open = Math.max(0, QUARTERLY_ACTIVATION_SLOTS - active);

  if (ctx.user.role !== "sponsor" && ctx.user.role !== "operator" && ctx.user.role !== "super_admin") {
    return {
      agentId: "sponsorship",
      intent: "sponsorship",
      summary: "Redirected non-sponsor sponsorship query.",
      reply:
        "Brand partnerships run through our partnerships desk. If you'd like an introduction to a sponsor for your work, I can note your interest and pass it along discreetly.",
    };
  }

  const totalReach = campaigns.reduce((s, c) => s + c.creatorReach, 0);
  const totalImpressions = campaigns.reduce((s, c) => s + c.impressions, 0);
  return {
    agentId: "sponsorship",
    intent: "sponsorship",
    summary: `Reported ${open} open activation slot(s).`,
    reply: `There ${open === 1 ? "is" : "are"} ${open} activation slot${
      open === 1 ? "" : "s"
    } open this quarter (we cap at ${QUARTERLY_ACTIVATION_SLOTS} to keep partnerships scarce and on-brand). Current campaigns have reached ${totalReach} curated creators and ${(
      totalImpressions / 1_000_000
    ).toFixed(1)}M impressions. I can prepare a tailored activation proposal.`,
    actions: [{ type: "info", label: `${open} activation slots open`, status: "info" }],
  };
}

// ── Marketing & Predictive (insight) ───────────────────────────────────────
export function handleInsight(ctx: AgentContext): AgentTurn {
  const report = scarcityReport();
  const isOperator = ctx.user.role === "operator" || ctx.user.role === "super_admin";

  if (!isOperator) {
    // Members get scarcity framed as desirability, never raw internals.
    return {
      agentId: "marketing",
      intent: "insight",
      summary: "Framed scarcity for a member.",
      reply: `The Houses are running near capacity — about ${(report.overall.occupancy * 100).toFixed(
        0,
      )}% full, with a healthy waitlist behind every open place. It's a good room to be in, and an intentionally small one.`,
    };
  }

  const lines = report.houses
    .map(
      (h) =>
        `· ${h.label}: ${(h.occupancy * 100).toFixed(0)}% (${h.active}/${h.cap}), waitlist ${
          h.waitlist
        }, exclusivity ${h.exclusivityIndex}, forecast ${h.forecastNextCycle} apps → ${h.recommendation.action}`,
    )
    .join("\n");

  return {
    agentId: "marketing",
    intent: "insight",
    summary: `Scarcity report: ${(report.overall.occupancy * 100).toFixed(1)}% overall, ${
      report.recommendation.action
    }.`,
    reply: `Predictive read — overall occupancy ${(report.overall.occupancy * 100).toFixed(
      1,
    )}% (${report.overall.inBand ? "in band" : "out of band"}), exclusivity index ${
      report.overall.exclusivityIndex
    }/100, brand heat ${report.overall.brandHeat}/100.\n${lines}\nRecommendation: ${report.recommendation.action.toUpperCase()} — ${
      report.recommendation.rationale
    } Pricing: ${report.pricing.note}`,
    actions: [
      {
        type: "recommendation",
        label: `Cycle recommendation: ${report.recommendation.action.toUpperCase()}`,
        status: "info",
        detail: report.recommendation.rationale,
      },
    ],
  };
}

// ── General ─────────────────────────────────────────────────────────────
export function handleGeneral(ctx: AgentContext): AgentTurn {
  return {
    agentId: "sam",
    intent: "general",
    summary: "General concierge response.",
    reply: `Hello ${ctx.user.name.split(" ")[0]} — I'm Sam, the 5E47 agent. I can help you become a member, book a studio or stage, check access and dues, or make an introduction. What would you like to do?`,
    actions: [],
  };
}
