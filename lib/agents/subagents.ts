// Subagent handlers. Each owns one Business Model Canvas block, reads/writes
// the domain model, and returns a reply fragment plus any actions. Sam
// (orchestrator) selects and composes these. Handlers are capability-aware:
// they never act outside the requester's RBAC scope.

import {
  acquisitionChannels,
  bookings,
  campaigns,
  masterclasses,
  payments,
  PROGRAM_TOPIC_LABEL,
  residencies,
  studios,
} from "@/lib/data";
import { bus } from "@/lib/events";
import { can } from "@/lib/rbac";
import { formatCurrency, relativeTime } from "@/lib/utils";
import type { Booking, MasterclassEvent, ProgramTopic } from "@/lib/types";
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
    reply: `All systems are nominal across the four floors. There ${
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
    reply: `Your credential opens the entry, the recording studios, and your home Floor ${residency.floor}. The LED volume stage on Floor 6 and the Listening Lounge & Salon on Floor 5 open for booked sessions and programming nights. Tap your phone at any door — if something's locked that shouldn't be, tell me and I'll grant it.`,
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

// ── Programming (Curator) ───────────────────────────────────────────────
const TOPIC_KEYWORDS: Record<ProgramTopic, string[]> = {
  content: ["content", "short-form", "podcast", "audience-building"],
  music: ["music", "mixing", "audio", "song", "record", "verse"],
  video: ["video", "film", "edit", "stage", "volume", "cinema", "directing"],
  marketing: ["marketing", "brand", "branding", "story", "positioning"],
  operations: ["business", "operation", "ops", "founder", "scaling", "raise", "finance"],
  creativity: ["creativity", "creative", "ideation", "art", "design", "idea"],
};

function detectTopic(msg: string): ProgramTopic {
  let best: ProgramTopic = "creativity";
  let bestScore = 0;
  for (const [topic, words] of Object.entries(TOPIC_KEYWORDS) as [ProgramTopic, string[]][]) {
    const score = words.reduce((s, w) => (msg.includes(w) ? s + 1 : s), 0);
    if (score > bestScore) {
      bestScore = score;
      best = topic;
    }
  }
  return best;
}

const day = 24 * 60 * 60 * 1000;

export function handleProgramming(ctx: AgentContext): AgentTurn {
  const msg = ctx.message.toLowerCase();
  const isStaff = ctx.user.role === "operator" || ctx.user.role === "super_admin";
  const wantsCreate = /\b(create|add|schedule|programme?|launch|set up|new)\b/.test(msg);

  if (isStaff && wantsCreate) {
    const topic = detectTopic(msg);
    const event: MasterclassEvent = {
      id: `mc_${Math.random().toString(36).slice(2, 8)}`,
      title: `New ${PROGRAM_TOPIC_LABEL[topic]} Masterclass`,
      topic,
      host: "to be confirmed",
      startsAt: new Date(Date.now() + 14 * day).toISOString(),
      capacity: 18,
      rsvps: 0,
      promoted: false,
      channels: [],
    };
    masterclasses.unshift(event);
    bus.emit("programming.created", event, ctx.user.id);
    return {
      agentId: "programming",
      intent: "programming",
      summary: `Created a ${PROGRAM_TOPIC_LABEL[topic]} masterclass.`,
      reply: `Programmed a ${PROGRAM_TOPIC_LABEL[topic]} masterclass for two weeks out (capacity ${event.capacity}). I've left the host as "to be confirmed" — tell me who you'd like, and I can have Herald promote it across our social and luxury channels.`,
      actions: [
        {
          type: "info",
          label: `Masterclass created · ${PROGRAM_TOPIC_LABEL[topic]}`,
          status: "done",
          detail: "Ready to promote",
        },
      ],
    };
  }

  const upcoming = masterclasses
    .filter((m) => new Date(m.startsAt) > new Date())
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt))
    .slice(0, 4);

  if (upcoming.length === 0) {
    return {
      agentId: "programming",
      intent: "programming",
      summary: "No upcoming programming.",
      reply: "There's nothing on the calendar just now — I'll let you know the moment the next masterclass is set.",
    };
  }

  const lines = upcoming
    .map(
      (m) =>
        `· ${m.title} — ${PROGRAM_TOPIC_LABEL[m.topic]}, with ${m.host}, ${relativeTime(
          m.startsAt,
        )} (${m.capacity - m.rsvps} place${m.capacity - m.rsvps === 1 ? "" : "s"} left)`,
    )
    .join("\n");

  return {
    agentId: "programming",
    intent: "programming",
    summary: `Promoted ${upcoming.length} upcoming masterclass(es).`,
    reply: `Here's what's coming up at 5E47 — closed-door masterclasses and salons across our pillars:\n${lines}\nWant me to hold a place for you at any of these?`,
    actions: upcoming
      .filter((m) => m.capacity - m.rsvps <= 4)
      .map((m) => ({
        type: "info" as const,
        label: `${m.title} — almost full`,
        status: "pending" as const,
      })),
  };
}

// ── Growth & Acquisition (Herald) ──────────────────────────────────────────
export function handleGrowth(ctx: AgentContext): AgentTurn {
  const msg = ctx.message.toLowerCase();
  const isStaff = ctx.user.role === "operator" || ctx.user.role === "super_admin";

  if (!isStaff) {
    return {
      agentId: "growth",
      intent: "growth",
      summary: "Framed acquisition as member advocacy.",
      reply:
        "The best way into 5E47 is through a member, so the most powerful thing you can do is refer someone whose work you admire — I'll fast-track anyone you put forward. We keep our public presence deliberately quiet; the room sells itself.",
    };
  }

  const social = acquisitionChannels.filter((c) => c.kind === "social");
  const luxury = acquisitionChannels.filter((c) => c.kind === "luxury");
  const totalWaitlist = acquisitionChannels.reduce((s, c) => s + c.waitlistContribution, 0);
  const wantsLaunch = /\b(promote|launch|run|push|campaign|amplify)\b/.test(msg);

  if (wantsLaunch) {
    const toPromote = masterclasses.find((m) => !m.promoted) ?? masterclasses[0];
    if (toPromote) {
      toPromote.promoted = true;
      toPromote.channels = Array.from(
        new Set([...toPromote.channels, "Instagram", "A Small World"]),
      );
      bus.emit("growth.campaign", { eventId: toPromote.id, channels: toPromote.channels }, ctx.user.id);
    }
    return {
      agentId: "growth",
      intent: "growth",
      summary: `Launched outreach${toPromote ? ` for "${toPromote.title}"` : ""}.`,
      reply: `Outreach is live${
        toPromote ? ` for "${toPromote.title}"` : ""
      }. I'm running it brand-first across social (${social
        .map((c) => c.name)
        .join(", ")}) and our exclusive luxury platforms (${luxury
        .map((c) => c.name)
        .join(", ")}) — building desire and feeding the waitlist, never discounting or opening the door wider than the caps allow.`,
      actions: [
        { type: "info", label: "Outreach campaign live", status: "done", detail: "Social + luxury platforms" },
      ],
    };
  }

  return {
    agentId: "growth",
    intent: "growth",
    summary: `Reported acquisition: ${totalWaitlist} waitlist adds last cycle.`,
    reply: `Acquisition is brand-led and feeding the waitlist, not the door. Last cycle our channels added ${totalWaitlist} qualified applicants:\n· Social — ${social
      .map((c) => `${c.name} (+${c.waitlistContribution})`)
      .join(", ")}\n· Exclusive luxury — ${luxury
      .map((c) => `${c.name} (+${c.waitlistContribution})`)
      .join(", ")}\nI can launch an outreach push for any masterclass or open House on demand.`,
    actions: [
      { type: "info", label: `${totalWaitlist} waitlist adds`, status: "info", detail: "Social + luxury platforms" },
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
