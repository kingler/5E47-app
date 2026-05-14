import { Film } from "lucide-react";
import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ASSETS = [
  { name: "Spring Slate · Hero Edit v3", kind: "video", status: "approval", duration: "1:42" },
  { name: "Vol. Stage · BTS Stills", kind: "stills", status: "approved", duration: "24 frames" },
  { name: "Podcast Drop · Ep. 04", kind: "audio", status: "delivered", duration: "48:10" },
  { name: "Audio A · Sponsor Cut", kind: "audio", status: "draft", duration: "3:14" },
  { name: "Floor 5 Premiere Recap", kind: "video", status: "approved", duration: "2:08" },
  { name: "Creator Profile · Maya O.", kind: "video", status: "draft", duration: "0:45" },
];

const tones: Record<string, "neutral" | "warning" | "success" | "info"> = {
  draft: "neutral",
  approval: "warning",
  approved: "success",
  delivered: "info",
};

export default function AssetsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media asset management"
        title="Sponsor asset pipeline"
        description="Versioned media indexed by Mux + Cloudflare Stream. Approve, brand, and route to channels."
      />

      <Card>
        <CardHeader
          title="Active assets"
          hint={`${ASSETS.length} items`}
          action={<Film className="size-4 text-ink-soft" />}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ASSETS.map((a) => (
            <div
              key={a.name}
              className="rounded-xl border border-bg-border bg-bg-elev overflow-hidden"
            >
              <div className="h-32 bg-[radial-gradient(circle_at_20%_20%,rgba(251,146,60,0.25),rgba(124,92,255,0.15)_60%,transparent_70%)] flex items-end p-3">
                <Badge tone={tones[a.status] ?? "neutral"}>{a.status}</Badge>
              </div>
              <div className="p-3">
                <div className="font-medium text-sm">{a.name}</div>
                <div className="text-xs text-ink-soft mt-0.5">
                  {a.kind} · {a.duration}
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="primary" className="flex-1">
                    Review
                  </Button>
                  <Button size="sm" variant="secondary">
                    Share
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
