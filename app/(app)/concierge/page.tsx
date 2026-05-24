import { getCurrentUser } from "@/lib/auth";
import { masterclasses, PROGRAM_TOPIC_LABEL, residencies } from "@/lib/data";
import { PageHeader } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { SamChat } from "@/components/agents/sam-chat";
import { SUBAGENTS } from "@/lib/agents/registry";
import { relativeTime } from "@/lib/utils";

export default async function ConciergePage() {
  const user = (await getCurrentUser())!;
  const residency = residencies.find((r) => r.creatorId === user.id);
  const isMember = residency?.status === "active";

  const greeting = isMember
    ? `Welcome back, ${user.name.split(" ")[0]}. I'm Sam, the 5E47 agent. I can book a room, check your access or dues, or make an introduction — just say the word.`
    : `Hello ${user.name.split(" ")[0]} — I'm Sam, the 5E47 agent. I can tell you about membership, start an application, or help you find your way in. What brings you to 5E47?`;

  const suggestions = isMember
    ? ["What masterclasses are coming up?", "Book Audio A for 4 hours", "What's my balance?"]
    : ["How do I become a member?", "What masterclasses are coming up?", "Can I apply with a referral?"];

  const upcoming = masterclasses
    .filter((m) => m.promoted && new Date(m.startsAt) > new Date())
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt))
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Concierge"
        title="Talk to Sam"
        description="One conversation for membership, bookings, access, and dues. Sam delegates to the house specialists behind the scenes."
        action={<Badge tone="accent">5E47 Agent · online</Badge>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
        <SamChat memberName={user.name} greeting={greeting} initialSuggestions={suggestions} />

        <aside className="hidden lg:flex flex-col gap-3">
          {upcoming.length > 0 && (
            <div className="surface p-4">
              <div className="label mb-3">This month at 5E47</div>
              <div className="flex flex-col gap-3">
                {upcoming.map((m) => (
                  <div key={m.id} className="flex flex-col gap-0.5">
                    <div className="text-sm text-ink font-medium leading-snug">{m.title}</div>
                    <div className="text-[11px] text-ink-soft">
                      {PROGRAM_TOPIC_LABEL[m.topic]} · {relativeTime(m.startsAt)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="surface p-4">
            <div className="label mb-3">Sam delegates to</div>
            <div className="flex flex-col gap-3">
              {SUBAGENTS.map((a) => (
                <div key={a.id} className="flex flex-col gap-0.5">
                  <div className="text-sm text-ink font-medium">{a.name}</div>
                  <div className="text-[11px] text-ink-soft leading-snug">{a.title}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="surface-soft p-4 text-xs text-ink-soft leading-relaxed">
            Conversations are confidential. Sam never discounts membership and
            holds the Houses to their caps — scarcity is part of the membership.
          </div>
        </aside>
      </div>
    </>
  );
}
