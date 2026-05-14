import { Activity } from "lucide-react";
import { bus } from "@/lib/events";
import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { relativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function EventStreamPage() {
  const events = bus.recent(200);
  return (
    <>
      <PageHeader
        eyebrow="Event-driven architecture"
        title="Domain event stream"
        description="Every meaningful state transition emits a domain event that downstream workflows, analytics, AI processors, and notifications subscribe to."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card>
          <CardHeader title="Routing" hint="Subscribers fan out" />
          <ul className="text-xs text-ink-muted space-y-2">
            {[
              ["creator.applied", "→ operator queue · email"],
              ["creator.approved", "→ access provisioning · billing"],
              ["booking.created", "→ payment intent · calendar"],
              ["payment.completed", "→ ledger · sponsor allocation"],
              ["studio.accessed", "→ telemetry · security"],
              ["project.greenlit", "→ sponsor portal · CRM"],
              ["sponsor.asset.generated", "→ MAM · approvals"],
              ["invoice.overdue", "→ collections · operator alert"],
            ].map(([k, v]) => (
              <li
                key={k}
                className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev px-3 py-2"
              >
                <code className="text-accent">{k}</code>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader
            title="Live tail"
            hint={`${events.length} most recent events`}
            action={<Activity className="size-4 text-emerald-400" />}
          />
          {events.length === 0 ? (
            <div className="text-sm text-ink-soft text-center py-10">
              No events in the buffer yet. Try booking a studio or approving a residency.
            </div>
          ) : (
            <ul className="font-mono text-xs flex flex-col">
              {events.map((e) => (
                <li
                  key={e.id}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-bg-border last:border-0 py-2"
                >
                  <span className="text-ink-soft">{relativeTime(e.at)}</span>
                  <span className="text-accent truncate">{e.type}</span>
                  <Badge tone="neutral">{e.id}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
