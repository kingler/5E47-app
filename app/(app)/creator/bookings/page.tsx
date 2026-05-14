import { redirect } from "next/navigation";
import { CalendarClock } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { bookings, studios } from "@/lib/data";
import { bus } from "@/lib/events";
import { can } from "@/lib/rbac";
import { PageHeader, SectionTitle } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TH, TR, TD } from "@/components/ui/table";
import { formatCurrency, formatDateTime, relativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

async function createBooking(formData: FormData) {
  "use server";
  const studioId = String(formData.get("studioId") ?? "");
  const creatorId = String(formData.get("creatorId") ?? "");
  const hours = Number(formData.get("hours") ?? 2);
  if (!studioId || !creatorId) return;
  const studio = studios.find((s) => s.id === studioId);
  if (!studio) return;
  const startsAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const endsAt = new Date(startsAt.getTime() + hours * 60 * 60 * 1000);
  const booking = {
    id: `bk_${Math.random().toString(36).slice(2, 8)}`,
    studioId,
    creatorId,
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
    status: "confirmed" as const,
    cost: studio.hourlyRate * hours,
  };
  bookings.unshift(booking);
  bus.emit("booking.created", booking, creatorId);
  redirect("/creator/bookings");
}

export default async function CreatorBookings() {
  const user = (await getCurrentUser())!;
  const mine = bookings.filter((b) => b.creatorId === user.id);

  return (
    <>
      <PageHeader
        eyebrow="Bookings"
        title="Studios & equipment"
        description="Reserve audio, video, podcast, edit, photo, stage, and VR resources across all floors."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Your bookings" hint="Past, current, and upcoming" />
          {mine.length === 0 ? (
            <div className="text-sm text-ink-soft py-6 text-center">
              No bookings yet — pick a studio on the right.
            </div>
          ) : (
            <Table>
              <THead>
                <tr>
                  <TH>Studio</TH>
                  <TH>Window</TH>
                  <TH>Status</TH>
                  <TH className="text-right">Cost</TH>
                </tr>
              </THead>
              <tbody>
                {mine.map((b) => {
                  const studio = studios.find((s) => s.id === b.studioId)!;
                  return (
                    <TR key={b.id}>
                      <TD>
                        <div className="font-medium">{studio.name}</div>
                        <div className="text-xs text-ink-soft">
                          {studio.kind} · Floor {studio.floor}
                        </div>
                      </TD>
                      <TD>
                        <div>{formatDateTime(b.startsAt)}</div>
                        <div className="text-xs text-ink-soft">{relativeTime(b.startsAt)}</div>
                      </TD>
                      <TD>
                        <Badge
                          tone={
                            b.status === "confirmed"
                              ? "success"
                              : b.status === "pending"
                                ? "warning"
                                : b.status === "completed"
                                  ? "neutral"
                                  : "danger"
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
            title="Reserve a studio"
            hint="Live availability"
            action={<CalendarClock className="size-4 text-accent" />}
          />
          {!can(user.role, "studio.book") ? (
            <div className="text-xs text-ink-soft">
              Your role can't book studios.
            </div>
          ) : (
            <form action={createBooking} className="flex flex-col gap-3">
              <input type="hidden" name="creatorId" value={user.id} />
              <label className="flex flex-col gap-1">
                <span className="label">Studio</span>
                <select
                  name="studioId"
                  required
                  className="bg-bg-elev border border-bg-border rounded-lg px-3 py-2 text-sm"
                >
                  {studios.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} · {formatCurrency(s.hourlyRate)}/hr
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1">
                <span className="label">Hours</span>
                <input
                  type="number"
                  name="hours"
                  defaultValue={2}
                  min={1}
                  max={12}
                  className="bg-bg-elev border border-bg-border rounded-lg px-3 py-2 text-sm"
                />
              </label>
              <Button type="submit" variant="primary">
                Confirm reservation
              </Button>
              <p className="text-[11px] text-ink-soft">
                Payment captured via Stripe on completion. Bookings emit{" "}
                <code className="text-accent">booking.created</code> on the
                event bus.
              </p>
            </form>
          )}
        </Card>
      </div>

      <div className="mt-6">
        <SectionTitle hint="Across all floors">Available studios</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {studios.map((s) => (
            <div key={s.id} className="surface p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">{s.name}</div>
                <Badge tone="creator">{s.kind}</Badge>
              </div>
              <div className="text-xs text-ink-soft mt-1">
                Floor {s.floor} · Capacity {s.capacity} · {formatCurrency(s.hourlyRate)}/hr
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.equipment.map((e) => (
                  <span key={e} className="pill text-[10px]">{e}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
