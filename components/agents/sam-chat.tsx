"use client";

import { useRef, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Delegation = { agentId: string; agentName: string; intent: string; summary: string };
type Action = { type: string; label: string; detail?: string; status: string };

type Msg = {
  id: string;
  role: "member" | "sam";
  text: string;
  delegations?: Delegation[];
  actions?: Action[];
};

export function SamChat({
  memberName,
  greeting,
  initialSuggestions,
}: {
  memberName: string;
  greeting: string;
  initialSuggestions: string[];
}) {
  const [messages, setMessages] = useState<Msg[]>([
    { id: "m0", role: "sam", text: greeting },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>(initialSuggestions);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollToEnd() {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput("");
    setBusy(true);
    const userMsg: Msg = { id: `u_${Date.now()}`, role: "member", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    scrollToEnd();

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "error");
      setMessages((m) => [
        ...m,
        {
          id: `s_${Date.now()}`,
          role: "sam",
          text: data.reply,
          delegations: data.delegations,
          actions: data.actions,
        },
      ]);
      setSuggestions(data.suggestions ?? []);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: `e_${Date.now()}`,
          role: "sam",
          text: "Apologies — I couldn't complete that just now. Please try again, or I can route you to the house team.",
        },
      ]);
    } finally {
      setBusy(false);
      scrollToEnd();
    }
  }

  return (
    <div className="surface flex flex-col h-[calc(100vh-12rem)] min-h-[480px] overflow-hidden p-0">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 md:p-6 flex flex-col gap-4">
        {messages.map((m) => (
          <div key={m.id} className={cn("flex gap-3", m.role === "member" && "flex-row-reverse")}>
            {m.role === "sam" && (
              <div className="size-8 shrink-0 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
                <Sparkles className="size-4 text-accent" />
              </div>
            )}
            <div className={cn("max-w-[78%] flex flex-col gap-2", m.role === "member" && "items-end")}>
              <div
                className={cn(
                  "rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line",
                  m.role === "sam"
                    ? "bg-bg-elev border border-bg-border text-ink"
                    : "bg-accent text-accent-ink",
                )}
              >
                {m.text}
              </div>

              {m.delegations && m.delegations.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {m.delegations.map((d) => (
                    <Badge key={d.agentId} tone="accent" title={d.summary}>
                      <Sparkles className="size-3" /> {d.agentName} · {d.intent}
                    </Badge>
                  ))}
                </div>
              )}

              {m.actions && m.actions.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {m.actions.map((a, i) => (
                    <Badge
                      key={i}
                      tone={a.status === "done" ? "success" : a.status === "pending" ? "warning" : "info"}
                    >
                      {a.label}
                      {a.detail ? ` · ${a.detail}` : ""}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {busy && (
          <div className="flex gap-3">
            <div className="size-8 shrink-0 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
              <Sparkles className="size-4 text-accent animate-pulse" />
            </div>
            <div className="rounded-2xl px-4 py-2.5 bg-bg-elev border border-bg-border text-ink-soft text-sm">
              Sam is thinking…
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-bg-border p-3 md:p-4 flex flex-col gap-3">
        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                disabled={busy}
                className="pill hover:text-ink hover:border-ink-soft transition-colors disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message Sam — ${memberName.split(" ")[0]}, how can I help?`}
            className="flex-1 bg-bg-elev border border-bg-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-ink-soft transition-colors"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-xl bg-accent text-accent-ink p-2.5 hover:bg-accent-muted disabled:opacity-40 transition-colors"
            aria-label="Send"
          >
            <ArrowUp className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
