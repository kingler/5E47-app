// The 5E47 agent roster. Sam orchestrates; every subagent owns one block of
// the Business Model Canvas and answers a defined set of intents.

import type { AgentDefinition, AgentId, Intent } from "./types";

export const SAM: AgentDefinition = {
  id: "sam",
  name: "Sam",
  title: "The 5E47 Agent",
  kind: "orchestrator",
  canvasBlock: "Customer Relationships (orchestration)",
  description:
    "The single concierge members speak with. Understands intent, delegates to specialists, enforces the brand's scarcity guardrails, and replies in one discreet voice.",
  intents: [],
  tone: "orchestrator",
};

export const SUBAGENTS: AgentDefinition[] = [
  {
    id: "membership",
    name: "Concierge",
    title: "Membership & Concierge Agent",
    kind: "subagent",
    canvasBlock: "Customer Segments & Relationships",
    description:
      "Explains tiers, fees and the referral path, starts and tracks applications, and frames the waitlist as scarcity rather than rejection.",
    intents: ["membership"],
    tone: "creator",
  },
  {
    id: "booking",
    name: "Atelier",
    title: "Booking Agent",
    kind: "subagent",
    canvasBlock: "Key Activities — space & service",
    description:
      "Reserves studios, stages and equipment, quotes cost and time, and confirms — respecting each member's entitlements.",
    intents: ["booking"],
    tone: "creator",
  },
  {
    id: "operations",
    name: "House",
    title: "Operations Agent",
    kind: "subagent",
    canvasBlock: "Key Activities / Cost Structure",
    description:
      "Handles day-to-day facility questions, availability and exceptions, and escalates to humans with full context.",
    intents: ["operations"],
    tone: "operator",
  },
  {
    id: "marketing",
    name: "Oracle",
    title: "Marketing & Predictive Agent",
    kind: "subagent",
    canvasBlock: "Key Activities — admissions & scarcity",
    description:
      "Runs the predictive models: occupancy vs. cap, exclusivity index, demand forecast and the admit/hold/raise recommendation that holds the scarcity band.",
    intents: ["insight"],
    tone: "operator",
  },
  {
    id: "finance",
    name: "Ledger",
    title: "Finance Agent",
    kind: "subagent",
    canvasBlock: "Revenue Streams",
    description:
      "Surfaces balances, dues and payments, and proposes pricing within luxury guardrails — raising under scarcity, never discounting below floor.",
    intents: ["finance"],
    tone: "operator",
  },
  {
    id: "access",
    name: "Threshold",
    title: "Access Agent",
    kind: "subagent",
    canvasBlock: "Key Resources — access",
    description:
      "Answers access questions and records authorized door grants consistent with floor and credential tiers.",
    intents: ["access"],
    tone: "operator",
  },
  {
    id: "sponsorship",
    name: "Patron",
    title: "Sponsorship Agent",
    kind: "subagent",
    canvasBlock: "Key Partnerships",
    description:
      "Manages capped activation slots and reports campaign ROI — impressions, reach and asset output.",
    intents: ["sponsorship"],
    tone: "sponsor",
  },
  {
    id: "programming",
    name: "Curator",
    title: "Programming Agent",
    kind: "subagent",
    canvasBlock: "Channels & Relationships — programming",
    description:
      "Creates and promotes masterclasses and special events across the six pillars — content, music, video, marketing & branding, business operations and creativity — and matches them to members.",
    intents: ["programming"],
    tone: "creator",
  },
  {
    id: "growth",
    name: "Herald",
    title: "Growth & Acquisition Agent",
    kind: "subagent",
    canvasBlock: "Channels — acquisition",
    description:
      "Attracts members through brand-led social reach and exclusive luxury platforms, feeding the curated waitlist without diluting the room, and amplifies programming externally.",
    intents: ["growth"],
    tone: "sponsor",
  },
];

export const ALL_AGENTS: AgentDefinition[] = [SAM, ...SUBAGENTS];

export function agentById(id: AgentId): AgentDefinition {
  return ALL_AGENTS.find((a) => a.id === id) ?? SAM;
}

export function agentForIntent(intent: Intent): AgentDefinition {
  return SUBAGENTS.find((a) => a.intents.includes(intent)) ?? SAM;
}
