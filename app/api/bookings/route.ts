import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { bookings, studios } from "@/lib/data";
import { bus } from "@/lib/events";
import { can } from "@/lib/rbac";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const scoped =
    user.role === "operator" || user.role === "super_admin"
      ? bookings
      : bookings.filter((b) => b.creatorId === user.id);
  return NextResponse.json({ bookings: scoped });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!can(user.role, "studio.book")) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    studioId?: string;
    hours?: number;
  };
  const studio = studios.find((s) => s.id === body.studioId);
  if (!studio) return NextResponse.json({ error: "studio_not_found" }, { status: 404 });
  const hours = Math.max(1, Math.min(12, body.hours ?? 2));
  const startsAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const endsAt = new Date(startsAt.getTime() + hours * 60 * 60 * 1000);
  const booking = {
    id: `bk_${Math.random().toString(36).slice(2, 8)}`,
    studioId: studio.id,
    creatorId: user.id,
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
    status: "confirmed" as const,
    cost: studio.hourlyRate * hours,
  };
  bookings.unshift(booking);
  bus.emit("booking.created", booking, user.id);
  return NextResponse.json({ booking }, { status: 201 });
}
