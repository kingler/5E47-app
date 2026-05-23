import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { can } from "@/lib/rbac";
import { ask } from "@/lib/agents/orchestrator";
import { ALL_AGENTS } from "@/lib/agents/registry";

// GET — agent roster + system status (powers the operator console header).
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  return NextResponse.json({
    agents: ALL_AGENTS.map((a) => ({
      id: a.id,
      name: a.name,
      title: a.title,
      kind: a.kind,
      canvasBlock: a.canvasBlock,
      description: a.description,
      intents: a.intents,
      tone: a.tone,
      status: "online",
    })),
    systemStatus: "nominal",
  });
}

// POST — send a message to Sam.
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!can(user.role, "agent.converse")) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as { message?: string };
  const message = (body.message ?? "").toString().trim();
  if (!message) {
    return NextResponse.json({ error: "empty_message" }, { status: 400 });
  }

  const response = await ask({
    message,
    user: { id: user.id, name: user.name, role: user.role },
  });

  return NextResponse.json(response);
}
