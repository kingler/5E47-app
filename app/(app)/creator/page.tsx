import Link from "next/link";
import {
  CalendarClock,
  Film,
  KeyRound,
  MessagesSquare,
  Sparkles,
  Users,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import {
  bookings,
  projects,
  residencies,
  studios,
  payments,
  accessEvents,
  bookingsByDay,
} from "@/lib/data";
import { PageHeader, SectionTitle } from "@/components/ui/section";
import { Stat } from "@/components/ui/stat";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TH, TR, TD } from "@/components/ui/table";
import { MiniBar } from "@/components/charts/bar";
import { formatCurrency, formatDateTime, relativeTime } from "@/lib/utils";

export default async function CreatorOverview() {
  const user = (await getCurrentUser())!;
  const myBookings = bookings.filter((b) => b.creatorId === user.id);
  const upcoming = myBookings.filter((b) => new Date(b.startsAt) > new Date());
  const myResidency = residencies.find((r) => r.creatorId === user.id);
  const myProjects = projects.filter((p) => p.creatorId === user.id);
  const myPayments = payments.filter((p) => p.userId === user.id);
  const nextDue = myPayments.find((p) => p.status === "pending");
  const myAccess = accessEvents
    .filter((e) => e.userId === user.id)
    .slice(0, 4);

  return (
    <>
      <PageHeader
        eyebrow="Creator workspace"
        title={`Welcome back, ${user.name.split(" ")[0]}.`}
        description="Your residency, bookings, projects, and payments — at a glance."
        action={
          <Link
            href="/creator/bookings"
            className="rounded-xl bg-accent text-accent-ink px-4 py-2 text-sm font-medium hover:bg-accent-muted"
          >
            Book a studio
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Stat
          tone="creator"
          label="Residency"
          value={myResidency ? myResidency.tier : "—"}
          hint={myResidency ? `Floor ${myResidency.floor} · ${formatCurrency(myResidency.monthlyFee)}/mo` : "Not yet assigned"}
        />
        <Stat
          tone="creator"
          label="Upcoming bookings"
          value={upcoming.length}
          delta={12.4}
          hint="Next 7 days"
        />
        <Stat
          tone="creator"
          label="Active projects"
          value={myProjects.length}
          hint={`${myProjects.filter((p) => p.greenlit).length} greenlit`}
        />
        <Stat
          tone="creator"
          label="Balance due"
          value={nextDue ? formatCurrency(nextDue.amount) : "$0"}
          hint={nextDue ? nextDue.description : "All paid"}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Upcoming bookings"
            hint="Studios, equipment, and stages reserved for you."
            action={
              <Link
                href="/creator/bookings"
                className="text-xs text-accent hover:underline"
              >
                Manage →
              </Link>
            }
          />
          {upcoming.length === 0 ? (
            <div className="text-sm text-ink-soft py-6 text-center">
              No upcoming bookings.
            </div>
          ) : (
            <Table>
              <THead>
                <tr>
                  <TH>Studio</TH>
                  <TH>When</TH>
                  <TH>Status</TH>
                  <TH className="text-right">Cost</TH>
                </tr>
              </THead>
              <tbody>
                {upcoming.map((b) => {
                  const studio = studios.find((s) => s.id === b.studioId)!;
                  return (
                    <TR key={b.id}>
                      <TD>
                        <div className="font-medium">{studio.name}</div>
                        <div className="text-xs text-ink-soft">
                          Floor {studio.floor} · {studio.kind}
                        </div>
                      </TD>
                      <TD>
                        <div>{formatDateTime(b.startsAt)}</div>
                        <div className="text-xs text-ink-soft">
                          {relativeTime(b.startsAt)}
                        </div>
                      </TD>
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
          )}
        </Card>

        <Card>
          <CardHeader
            title="Activity this week"
            hint="Studio hours booked"
          />
          <MiniBar data={bookingsByDay()} tone="creator" />
          <div className="grid grid-cols-7 text-[10px] text-ink-soft mt-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i} className="text-center">{d}</span>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card>
          <CardHeader
            title="Projects"
            hint="Active and recent"
            action={<Film className="size-4 text-ink-soft" />}
          />
          <div className="flex flex-col gap-2">
            {myProjects.map((p) => (
              <div
                key={p.id}
                className="rounded-lg border border-bg-border bg-bg-elev p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{p.title}</div>
                  <Badge
                    tone={
                      p.status === "in_production"
                        ? "info"
                        : p.status === "review"
                          ? "warning"
                          : p.status === "shipped"
                            ? "success"
                            : "neutral"
                    }
                  >
                    {p.status.replace("_", " ")}
                  </Badge>
                </div>
                <div className="text-xs text-ink-soft mt-1 flex items-center gap-2">
                  <span>Updated {relativeTime(p.updatedAt)}</span>
                  {p.greenlit && <Badge tone="accent">Greenlit</Badge>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Access activity"
            hint="Your recent facility taps"
            action={<KeyRound className="size-4 text-ink-soft" />}
          />
          <div className="flex flex-col gap-2">
            {myAccess.length === 0 ? (
              <div className="text-xs text-ink-soft">No recent access events.</div>
            ) : (
              myAccess.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev px-3 py-2"
                >
                  <div>
                    <div className="text-sm">{a.doorName}</div>
                    <div className="text-[11px] text-ink-soft">
                      Floor {a.floor} · {a.credential} · {relativeTime(a.at)}
                    </div>
                  </div>
                  <Badge
                    tone={
                      a.outcome === "granted"
                        ? "success"
                        : a.outcome === "denied"
                          ? "danger"
                          : "warning"
                    }
                  >
                    {a.outcome}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Discover"
            hint="AI-matched collaborators & sponsors"
            action={<Sparkles className="size-4 text-accent" />}
          />
          <div className="flex flex-col gap-2">
            <DiscoverRow icon={Users} title="Devon Park" sub="Director · 92% match" />
            <DiscoverRow icon={Users} title="Soraya Lin" sub="Editor · 88% match" />
            <DiscoverRow icon={MessagesSquare} title="Sony Music X" sub="Sponsor interested in your slate" />
            <DiscoverRow icon={CalendarClock} title="Floor 5 · Open mic" sub="Tonight, 9:00 PM" />
          </div>
        </Card>
      </div>
    </>
  );
}

function DiscoverRow({
  icon: Icon,
  title,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-bg-border bg-bg-elev px-3 py-2">
      <div className="size-8 rounded-lg bg-bg-card border border-bg-border flex items-center justify-center">
        <Icon className="size-4 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm truncate">{title}</div>
        <div className="text-[11px] text-ink-soft truncate">{sub}</div>
      </div>
      <button className="text-xs text-accent hover:underline">View</button>
    </div>
  );
}
