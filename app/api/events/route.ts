import { NextResponse } from "next/server";
import { bus } from "@/lib/events";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ events: bus.recent(50) });
}
