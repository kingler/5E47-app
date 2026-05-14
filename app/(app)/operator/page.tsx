import Link from "next/link";
import { Activity, AlertTriangle, Building2, Users } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import {
  accessEvents,
  bookings,
  bookingsByDay,
  payments,
  residencies,
  studios,
  userById,
  utilizationSeries,
} from "@/lib/data";
import { bus } from "@/lib/events";
import { PageHeader, SectionTitle } from "@/components/ui/section";
import { Stat } from "@/components/ui/stat";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TH, TR, TD } from "@/components/ui/table";
import { MiniBar, Sparkline } from "@/components/charts/bar";
import { formatCurrency, formatDateTime, relativeTime } from "@/lib/utils";

export default async function OperatorOverview() {
  const user = (await getCurrentUser())!;
  const inReview = residencies.filter((r) => r.status === "in_review");
  const activeResidencies = residencies.filter((r) => r.status === "active");
  const todays = bookings.slice(0, 5);
  const deniedAccess = accessEvents.filter((e) => e.outcome === "denied");
  const recentEvents = bus.recent(8);

  return (
    <>
      <PageHeader
        eyebrow="Operator command"
        title="Operations control plane"
        description="Live state of the building — residencies, studios, access, billing, and the event stream."
        action={
          <>
            <Link
              href="/operator/residencies"
              className="rounded-xl border border-bg-border bg-bg-elev px-4 py-2 text-sm hover:border-ink-soft"
            >
              Review queue · {inReview.length}
            </Link>
            <Link
              href="/operator/events"
              className="rounded-xl bg-accent text-accent-ink px-4 py-2 text-sm font-medium hover:bg-accent-muted"
            >
              Event stream
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat tone="operator" label="Active residents" value={activeResidencies.length} delta={4.1} />
        <Stat tone="operator" label="Studio utilization" value="84%" delta={2.6} hint="Trailing 7 days" />
        <Stat tone="operator" label="MRR" value={formatCurrency(payments.filter((p) => p.status === "succeeded").reduce((s, p) => s + p.amount, 0))} delta={9.3} />
        <Stat tone="operator" label="Open alerts" value={deniedAccess.length} hint="Access denials" delta={-1.2} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Floor utilization" hint="Last 12 weeks" />
          <Sparkline data={utilizationSeries()} tone="operator" height={120} />
          <div className="grid grid-cols-6 gap-2 mt-3">
            {[1, 2, 3, 4, 5, 6].map((f) => (
              <div key={f} className="surface-soft p-3">
                <div className="text-[10px] text-ink-soft">Floor {f}</div>
                <div className="text-sm font-semibold">{60 + f * 5}%</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Live event stream" hint={`Last ${recentEvents.length} events`} action={<Activity className="size-4 text-emerald-400" />} />
          {recentEvents.length === 0 ? (
            <div className="text-xs text-ink-soft text-center py-8">
              No events yet. Trigger one in the creator workspace.
            </div>
          ) : (
            <ul className="flex flex-col">
              {recentEvents.map((e) => (
                <li
                  key={e.id}
                  className="flex items-center justify-between border-b border-bg-border last:border-0 py-2"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-accent truncate">
                      {e.type}
                    </div>
                    <div className="text-[10px] text-ink-soft">
                      {relativeTime(e.at)}
                    </div>
                  </div>
                  <Badge tone="neutral">evt</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Bookings today"
            hint="Across all studios"
            action={
              <Link href="/operator/studios" className="text-xs text-accent hover:underline">
                Studio grid →
              </Link>
            }
          />
          <Table>
            <THead>
              <tr>
                <TH>Studio</TH>
                <TH>Creator</TH>
                <TH>Window</TH>
                <TH>Status</TH>
                <TH className="text-right">Revenue</TH>
              </tr>
            </THead>
            <tbody>
              {todays.map((b) => {
                const studio = studios.find((s) => s.id === b.studioId)!;
                const creator = userById(b.creatorId);
                return (
                  <TR key={b.id}>
                    <TD>
                      <div className="font-medium">{studio.name}</div>
                      <div className="text-xs text-ink-soft">Floor {studio.floor}</div>
                    </TD>
                    <TD>{creator?.name ?? b.creatorId}</TD>
                    <TD>{formatDateTime(b.startsAt)}</TD>
                    <TD>
                      <Badge
                        tone={
                          b.status === "confirmed"
                            ? "success"
                            : b.status === "pending"
                              ? "warning"
                              : "neutral"
                        }
                      >
                        {b.status}
                      </Badge>
                    </TD>
                    <TD className="text-right">{formatCurrency(b.cost)}</TD>
                  </TR>
                );
              })}
            </tbody>
          </Table>
        </Card>

        <Card>
          <CardHeader
            title="Residency review queue"
            hint="Awaiting operator decision"
            action={<Users className="size-4 text-ink-soft" />}
          />
          {inReview.length === 0 ? (
            <div className="text-xs text-ink-soft">Queue clear.</div>
          ) : (
            <div className="flex flex-col gap-2">
              {inReview.map((r) => {
                const c = userById(r.creatorId);
                return (
                  <div
                    key={r.id}
                    className="rounded-lg border border-bg-border bg-bg-elev p-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{c?.name}</div>
                        <div className="text-[11px] text-ink-soft">
                          {r.tier} · Floor {r.floor} · {formatCurrency(r.monthlyFee)}/mo
                        </div>
                      </div>
                      <Link
                        href="/operator/residencies"
                        className="text-xs text-accent hover:underline"
                      >
                        Review →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card>
          <CardHeader title="Bookings this week" />
          <MiniBar data={bookingsByDay()} tone="operator" />
        </Card>
        <Card>
          <CardHeader
            title="Security alerts"
            hint="Access denials & anomalies"
            action={<AlertTriangle className="size-4 text-amber-400" />}
          />
          {deniedAccess.length === 0 ? (
            <div className="text-xs text-ink-soft">No alerts.</div>
          ) : (
            <ul className="flex flex-col">
              {deniedAccess.map((a) => {
                const u = userById(a.userId);
                return (
                  <li
                    key={a.id}
                    className="flex items-center justify-between border-b border-bg-border last:border-0 py-2"
                  >
                    <div>
                      <div className="text-sm">{a.doorName}</div>
                      <div className="text-[11px] text-ink-soft">
                        {u?.name} · {relativeTime(a.at)}
                      </div>
                    </div>
                    <Badge tone="danger">denied</Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
        <Card>
          <CardHeader
            title="Building load"
            hint="Live tenant signals"
            action={<Building2 className="size-4 text-ink-soft" />}
          />
          <div className="flex flex-col gap-2">
            {[
              ["Active sessions", "47"],
              ["HVAC mode", "Day · auto"],
              ["Network egress", "1.2 Gbps"],
              ["Helpdesk tickets", "3 open"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev px-3 py-2 text-sm"
              >
                <span className="text-ink-soft">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
