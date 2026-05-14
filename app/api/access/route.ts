import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { accessEvents } from "@/lib/data";
import { bus } from "@/lib/events";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const scoped =
    user.role === "operator" || user.role === "super_admin"
      ? accessEvents
      : accessEvents.filter((e) => e.userId === user.id);
  return NextResponse.json({ events: scoped });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as {
    doorId?: string;
    doorName?: string;
    floor?: number;
    credential?: "mobile" | "qr" | "card" | "biometric";
  };
  const event = {
    id: `ax_${Math.random().toString(36).slice(2, 8)}`,
    userId: user.id,
    doorId: body.doorId ?? "door_unknown",
    doorName: body.doorName ?? "Unknown door",
    floor: body.floor ?? 1,
    outcome: "granted" as const,
    at: new Date().toISOString(),
    credential: body.credential ?? "mobile",
  };
  accessEvents.unshift(event);
  bus.emit("studio.accessed", event, user.id);
  return NextResponse.json({ event }, { status: 201 });
}
