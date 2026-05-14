import { Sparkles } from "lucide-react";
import { residencies, userById } from "@/lib/data";
import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DiscoveryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Creator discovery"
        title="AI-matched creators"
        description="Vector search + creator metadata surface the best fits for your campaign brief."
      />

      <Card>
        <CardHeader
          title="Matched candidates"
          hint="Spring Slate · Emerging Voices"
          action={<Sparkles className="size-4 text-accent" />}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {residencies.map((r, idx) => {
            const c = userById(r.creatorId);
            if (!c) return null;
            const score = 95 - idx * 4;
            return (
              <div
                key={r.id}
                className="rounded-xl border border-bg-border bg-bg-elev p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-br from-role-sponsor to-role-creator text-bg flex items-center justify-center text-sm font-bold">
                    {c.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{c.name}</div>
                    <div className="text-xs text-ink-soft truncate">
                      {r.tier} · Floor {r.floor}
                    </div>
                  </div>
                  <Badge tone="accent">{score}%</Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
                  {["music", "production", "live"].map((t) => (
                    <span key={t} className="pill">{t}</span>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="primary" className="flex-1">
                    Invite
                  </Button>
                  <Button size="sm" variant="secondary">
                    Profile
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}
