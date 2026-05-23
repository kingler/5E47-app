// Predictive scarcity & marketing models.
//
// Pure, deterministic functions over the domain data. They power the
// Marketing & Predictive agent ("Oracle") and the operator console. The
// brand rule they enforce: demand must exceed supply. Occupancy is steered
// into a target band; pricing rises under scarcity and never discounts.

import { bookings, campaigns, houseCensus, payments, users } from "@/lib/data";
import type {
  ChurnSignal,
  HouseScarcity,
  PricingSignal,
  ScarcityRecommendation,
  ScarcityReport,
} from "./types";

// Target occupancy band that protects exclusivity without leaving money on
// the table. Tunable business inputs.
export const TARGET_BAND = { low: 0.85, high: 0.92 } as const;
const BAND_MID = (TARGET_BAND.low + TARGET_BAND.high) / 2;

const clamp = (n: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, n));

/**
 * Brand-heat index (0..100) — marketing performance momentum derived from
 * live sponsor campaigns (impressions + curated creator reach).
 */
export function brandHeat(): number {
  const impressions = campaigns.reduce((s, c) => s + c.impressions, 0);
  const reach = campaigns.reduce((s, c) => s + c.creatorReach, 0);
  const score = (impressions / 5_000_000) * 60 + (reach / 40) * 40;
  return Math.round(clamp(score, 0, 1) * 100);
}

/**
 * Exponentially-weighted forecast of next-cycle applications. Recent cycles
 * dominate; a light trend term projects momentum forward.
 */
function forecastApplications(history: number[]): number {
  if (history.length === 0) return 0;
  const alpha = 0.5;
  let ewma = history[0];
  for (let i = 1; i < history.length; i++) {
    ewma = alpha * history[i] + (1 - alpha) * ewma;
  }
  const trend = history.length >= 2 ? history[history.length - 1] - history[history.length - 2] : 0;
  return Math.max(0, Math.round(ewma + 0.5 * trend));
}

function recommendForHouse(
  occupancy: number,
  openSlots: number,
  waitlistPressure: number,
  cap: number,
  active: number,
): ScarcityRecommendation {
  if (occupancy > TARGET_BAND.high) {
    return {
      action: "raise",
      rationale:
        "Above the scarcity band — hold admissions and let pricing reflect the waitlist. Protect exclusivity over volume.",
    };
  }
  if (occupancy < TARGET_BAND.low) {
    const target = Math.floor(cap * BAND_MID);
    const room = Math.max(0, target - active);
    // Never admit more than the qualified waitlist can supply.
    const count = Math.max(1, Math.min(room, Math.round(openSlots * 0.6)));
    return {
      action: "admit",
      count,
      rationale: `Below band — admit up to ${count} curated applicant(s) from the waitlist to reach the target occupancy without diluting the room.`,
    };
  }
  if (waitlistPressure >= 3) {
    return {
      action: "raise",
      rationale:
        "In band with deep waitlist pressure — a candidate for a pricing increase at the next cycle. Demand comfortably exceeds supply.",
    };
  }
  return {
    action: "hold",
    rationale: "Comfortably in band — hold admissions and pricing; maintain the waitlist.",
  };
}

function houseScarcity(): HouseScarcity[] {
  const heat = brandHeat();
  return houseCensus.map((h) => {
    const occupancy = h.active / h.cap;
    const openSlots = Math.max(0, h.cap - h.active);
    const waitlistPressure = h.waitlist / Math.max(openSlots, 1);
    const exclusivityIndex = Math.round(
      100 *
        (0.45 * occupancy +
          0.35 * clamp(waitlistPressure / 5) +
          0.2 * (heat / 100)),
    );
    return {
      house: h.house,
      label: h.label,
      cap: h.cap,
      active: h.active,
      openSlots,
      occupancy,
      waitlist: h.waitlist,
      waitlistPressure: Math.round(waitlistPressure * 10) / 10,
      exclusivityIndex,
      forecastNextCycle: forecastApplications(h.applications),
      recommendation: recommendForHouse(occupancy, openSlots, waitlistPressure, h.cap, h.active),
    };
  });
}

/**
 * Dynamic membership-fee signal. Bounded to [1.00, 1.25] — the brand never
 * discounts below the tier floor; scarcity only pushes price up.
 */
function pricingSignal(exclusivityIndex: number): PricingSignal {
  const multiplier = 1 + 0.25 * clamp((exclusivityIndex - 60) / 40);
  const pct = Math.round((multiplier - 1) * 1000) / 10;
  return {
    multiplier: Math.round(multiplier * 1000) / 1000,
    note:
      pct <= 0
        ? "Hold fees at the tier floor — no discounting under any condition."
        : `Scarcity supports up to +${pct}% over the tier floor at the next cycle (operator-ratified).`,
  };
}

export function scarcityReport(): ScarcityReport {
  const houses = houseScarcity();
  const cap = houses.reduce((s, h) => s + h.cap, 0);
  const active = houses.reduce((s, h) => s + h.active, 0);
  const occupancy = active / cap;
  const heat = brandHeat();
  const totalWaitlistPressure =
    houses.reduce((s, h) => s + h.waitlistPressure, 0) / houses.length;
  const exclusivityIndex = Math.round(
    100 * (0.45 * occupancy + 0.35 * clamp(totalWaitlistPressure / 5) + 0.2 * (heat / 100)),
  );
  const inBand = occupancy >= TARGET_BAND.low && occupancy <= TARGET_BAND.high;

  // Overall recommendation favors the tightest action across houses.
  const tightest =
    houses.find((h) => h.recommendation.action === "admit") ??
    houses.find((h) => h.recommendation.action === "raise") ??
    houses[0];

  const overallRec: ScarcityRecommendation = inBand
    ? {
        action: houses.some((h) => h.recommendation.action === "raise") ? "raise" : "hold",
        rationale: `Overall occupancy ${(occupancy * 100).toFixed(
          1,
        )}% is inside the ${TARGET_BAND.low * 100}–${TARGET_BAND.high * 100}% band. ${
          houses.some((h) => h.recommendation.action === "raise")
            ? "Selective pricing increases warranted where waitlists are deepest."
            : "Hold the line — scarcity is healthy."
        }`,
      }
    : tightest.recommendation;

  return {
    overall: {
      cap,
      active,
      occupancy,
      exclusivityIndex,
      band: TARGET_BAND,
      inBand,
      brandHeat: heat,
    },
    houses,
    pricing: pricingSignal(exclusivityIndex),
    recommendation: overallRec,
  };
}

/**
 * Per-member churn risk from booking recency/frequency and outstanding dues.
 * Higher = more attention needed.
 */
export function churnSignals(): ChurnSignal[] {
  const now = Date.now();
  const creators = users.filter((u) => u.role === "creator");
  return creators
    .map((u) => {
      const mine = bookings.filter((b) => b.creatorId === u.id);
      const last = mine
        .map((b) => new Date(b.startsAt).getTime())
        .sort((a, b) => b - a)[0];
      const daysSince = last ? (now - last) / 86_400_000 : 999;
      const pending = payments.filter(
        (p) => p.userId === u.id && p.status === "pending",
      ).length;

      let risk = 30;
      if (mine.length === 0) risk += 35;
      else if (mine.length <= 1) risk += 15;
      if (daysSince > 21) risk += 25;
      else if (daysSince > 10) risk += 12;
      risk += pending * 12;
      risk = Math.max(0, Math.min(100, risk));

      const reason =
        mine.length === 0
          ? "No bookings on record — low facility engagement."
          : daysSince > 21
            ? `Last booking ~${Math.round(daysSince)}d ago — engagement cooling.`
            : pending > 0
              ? `${pending} payment(s) outstanding.`
              : "Healthy engagement.";

      return { userId: u.id, name: u.name, risk, reason };
    })
    .sort((a, b) => b.risk - a.risk);
}
