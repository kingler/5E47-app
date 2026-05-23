// LLM provider boundary.
//
// Sam's reasoning sits behind this interface so a hosted model (Claude /
// OpenAI) drops in without changing any call site — the same discipline the
// rest of the platform uses for Stripe, Kisi, Mux, etc. The default is a
// deterministic local provider so the system runs, is testable, and is fully
// auditable with no API keys. To go live, implement `complete()` against a
// provider and return it from `getLLMProvider()`.

export interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LLMProvider {
  id: string;
  complete(messages: LLMMessage[]): Promise<string>;
}

// Deterministic provider: composes the reply from the subagent fragments the
// orchestrator already produced. No generation, no network — predictable
// output that mirrors the shape a hosted model would return.
export const localProvider: LLMProvider = {
  id: "local-deterministic",
  async complete(messages) {
    const last = messages[messages.length - 1];
    return last?.content ?? "";
  },
};

export function getLLMProvider(): LLMProvider {
  // When OPENAI_API_KEY / ANTHROPIC_API_KEY is present, a hosted provider
  // implementing LLMProvider would be returned here. Kept deterministic by
  // default.
  return localProvider;
}
