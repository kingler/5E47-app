// Sam — the 5E47 orchestration agent.
//
// Sam classifies a member's intent, delegates to the right subagent,
// enforces the brand's strategic guardrails, synthesizes a single reply, and
// records the delegation trace as auditable domain events.

import { bus } from "@/lib/events";
import { agentForIntent } from "./registry";
import { getLLMProvider } from "./llm";
import {
  handleAccess,
  handleBooking,
  handleFinance,
  handleGeneral,
  handleGrowth,
  handleInsight,
  handleMembership,
  handleOperations,
  handleProgramming,
  handleSponsorship,
} from "./subagents";
import type {
  AgentAction,
  AgentContext,
  AgentResponse,
  AgentTurn,
  Delegation,
  Intent,
} from "./types";

const INTENT_KEYWORDS: Record<Exclude<Intent, "general">, string[]> = {
  membership: ["member", "join", "apply", "application", "referral", "tier", "fee", "waitlist", "invite", "cost to join"],
  booking: ["book", "reserve", "studio", "stage", "room", "session", "edit bay", "podcast", "volume", "cyclorama", "hold a"],
  finance: ["balance", "owe", "due", "invoice", "pay", "payment", "bill", "charge", "discount", "refund"],
  access: ["access", "door", "key", "credential", "get in", "let me in", "floor", "badge"],
  sponsorship: ["sponsor", "activation", "partnership", "roi"],
  growth: ["promote", "social", "instagram", "tiktok", "youtube", "linkedin", "attract", "audience", "outreach", "amplify", "luxury platform", "acquisition", "grow membership"],
  programming: ["masterclass", "master class", "workshop", "salon", "class", "lecture", "programming", "program", "event", "learn", "teach", "what's on", "calendar"],
  insight: ["occupancy", "scarcity", "forecast", "demand", "how full", "exclusivity", "recommend", "predict", "pricing", "performance", "market"],
  operations: ["status", "available", "availability", "facility", "issue", "broken", "hours", "open"],
};

export function classifyIntent(message: string): { intent: Intent; confidence: number } {
  const msg = message.toLowerCase();
  const scores = new Map<Intent, number>();
  for (const [intent, words] of Object.entries(INTENT_KEYWORDS) as [Intent, string[]][]) {
    let score = 0;
    for (const w of words) if (msg.includes(w)) score += 1;
    if (score > 0) scores.set(intent, score);
  }
  if (scores.size === 0) return { intent: "general", confidence: 0.4 };
  const sorted = [...scores.entries()].sort((a, b) => b[1] - a[1]);
  const [intent, top] = sorted[0];
  const total = [...scores.values()].reduce((s, n) => s + n, 0);
  return { intent, confidence: Math.min(0.99, 0.5 + (top / (total + 1)) * 0.5) };
}

function runHandler(intent: Intent, ctx: AgentContext): AgentTurn {
  switch (intent) {
    case "membership":
      return handleMembership(ctx);
    case "booking":
      return handleBooking(ctx);
    case "operations":
      return handleOperations(ctx);
    case "finance":
      return handleFinance(ctx);
    case "access":
      return handleAccess(ctx);
    case "sponsorship":
      return handleSponsorship(ctx);
    case "programming":
      return handleProgramming(ctx);
    case "growth":
      return handleGrowth(ctx);
    case "insight":
      return handleInsight(ctx);
    default:
      return handleGeneral(ctx);
  }
}

// Strategic guardrails Sam enforces regardless of how a request is phrased.
function applyGuardrails(message: string, reply: string): string {
  const msg = message.toLowerCase();
  const asksDiscount = /(discount|cheaper|lower (the )?(price|fee)|deal|comp\b|free month|waive)/.test(msg);
  if (asksDiscount && !/don't discount|tier rate/i.test(reply)) {
    return `${reply}\n\nOn pricing — membership holds at the tier rate. We don't discount; the value is the room, and keeping it scarce is part of what you're paying for.`;
  }
  return reply;
}

function suggestionsFor(intent: Intent): string[] {
  switch (intent) {
    case "membership":
      return ["What are the membership tiers?", "Can I apply with a referral?", "Book a studio"];
    case "booking":
      return ["Book Audio A for 4 hours", "Is the LED stage free?", "What's my balance?"];
    case "finance":
      return ["What's my balance?", "Show my recent payments", "Book a studio"];
    case "insight":
      return ["How full is the Music House?", "Cycle recommendation", "Pricing signal"];
    case "programming":
      return ["What masterclasses are coming up?", "Hold me a place", "Tell me about the Music House"];
    case "growth":
      return ["How is acquisition performing?", "Promote the next masterclass", "Refer a member"];
    default:
      return ["What masterclasses are coming up?", "Book a studio", "How do I become a member?"];
  }
}

export async function ask(ctx: AgentContext): Promise<AgentResponse> {
  const { intent, confidence } = classifyIntent(ctx.message);

  bus.emit("agent.message", { from: ctx.user.id, message: ctx.message, intent }, ctx.user.id);

  const turn = runHandler(intent, ctx);
  const agent = agentForIntent(turn.intent);

  const delegations: Delegation[] =
    agent.id === "sam"
      ? []
      : [{ agentId: agent.id, agentName: agent.name, intent: turn.intent, summary: turn.summary }];

  if (delegations.length > 0) {
    bus.emit(
      "agent.delegated",
      { to: agent.id, intent: turn.intent, summary: turn.summary },
      ctx.user.id,
    );
  }

  const actions: AgentAction[] = turn.actions ?? [];
  if (actions.length > 0) {
    bus.emit("agent.action", { actions, by: agent.id }, ctx.user.id);
  }

  // Synthesis seam — a hosted LLM would rephrase here; the deterministic
  // provider returns the composed fragment as-is.
  const provider = getLLMProvider();
  const composed = await provider.complete([
    { role: "system", content: "You are Sam, the 5E47 concierge agent. Discreet, warm, precise." },
    { role: "assistant", content: turn.reply },
    { role: "user", content: turn.reply },
  ]);

  const reply = applyGuardrails(ctx.message, composed || turn.reply);

  return {
    reply,
    intent: turn.intent,
    confidence,
    delegations,
    actions,
    suggestions: suggestionsFor(turn.intent),
  };
}
