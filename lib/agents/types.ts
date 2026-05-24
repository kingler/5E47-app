// 5E47 — Multi-agent system types.
//
// Sam is the orchestration agent and the only surface members talk to.
// Sam classifies intent, delegates to specialist subagents, enforces the
// brand's strategic guardrails, and synthesizes a single reply.

import type { HouseId, Role } from "@/lib/types";

export type AgentId =
  | "sam"
  | "membership"
  | "booking"
  | "operations"
  | "marketing"
  | "finance"
  | "access"
  | "sponsorship"
  | "programming"
  | "growth";

export type Intent =
  | "membership"
  | "booking"
  | "operations"
  | "finance"
  | "access"
  | "sponsorship"
  | "insight"
  | "programming"
  | "growth"
  | "general";

export type AgentTone =
  | "orchestrator"
  | "creator"
  | "operator"
  | "sponsor"
  | "investor";

export interface AgentDefinition {
  id: AgentId;
  /** Human name members/operators see (Sam is the orchestrator). */
  name: string;
  title: string;
  kind: "orchestrator" | "subagent";
  /** Business Model Canvas block this agent owns. */
  canvasBlock: string;
  description: string;
  /** Intents this subagent answers (empty for the orchestrator). */
  intents: Intent[];
  tone: AgentTone;
}

export type ChatRole = "member" | "sam";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  /** Which agent produced an assistant message (always "sam" to the member). */
  text: string;
  at: string;
}

/** A record of Sam handing a turn to a subagent. */
export interface Delegation {
  agentId: AgentId;
  agentName: string;
  intent: Intent;
  summary: string;
}

export interface AgentAction {
  type: "booking_created" | "application_started" | "info" | "escalation" | "recommendation";
  label: string;
  detail?: string;
  status: "done" | "pending" | "info";
}

/** One subagent's contribution to a turn. */
export interface AgentTurn {
  agentId: AgentId;
  intent: Intent;
  /** Short delegation summary for the audit/operator trace. */
  summary: string;
  /** Reply fragment Sam weaves into the final response. */
  reply: string;
  actions?: AgentAction[];
}

/** The full response Sam returns for one member message. */
export interface AgentResponse {
  reply: string;
  intent: Intent;
  confidence: number;
  delegations: Delegation[];
  actions: AgentAction[];
  suggestions: string[];
}

export interface AgentContext {
  message: string;
  user: {
    id: string;
    name: string;
    role: Role;
  };
}

// ── Predictive layer ────────────────────────────────────────────────────

export interface HouseScarcity {
  house: HouseId;
  label: string;
  cap: number;
  active: number;
  openSlots: number;
  occupancy: number; // 0..1
  waitlist: number;
  waitlistPressure: number; // applicants per open slot
  exclusivityIndex: number; // 0..100
  forecastNextCycle: number; // projected applications next cycle
  recommendation: ScarcityRecommendation;
}

export type ScarcityAction = "admit" | "hold" | "raise";

export interface ScarcityRecommendation {
  action: ScarcityAction;
  count?: number; // members to admit when action === "admit"
  rationale: string;
}

export interface PricingSignal {
  multiplier: number; // 1.00 .. 1.25, never below floor
  note: string;
}

export interface ScarcityReport {
  overall: {
    cap: number;
    active: number;
    occupancy: number;
    exclusivityIndex: number;
    band: { low: number; high: number };
    inBand: boolean;
    brandHeat: number; // 0..100
  };
  houses: HouseScarcity[];
  pricing: PricingSignal;
  recommendation: ScarcityRecommendation;
}

export interface ChurnSignal {
  userId: string;
  name: string;
  risk: number; // 0..100
  reason: string;
}
