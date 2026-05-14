import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "5e47-app",
    ts: new Date().toISOString(),
  });
}
