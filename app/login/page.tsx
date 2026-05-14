import Link from "next/link";
import { redirect } from "next/navigation";
import { Fingerprint, KeyRound, ShieldCheck } from "lucide-react";
import { setActiveUser, signOut, listDemoUsers } from "@/lib/auth";
import { homeForRole, ROLE_LABEL } from "@/lib/rbac";
import { bus } from "@/lib/events";
import { Logo } from "@/components/shell/logo";
import { Badge } from "@/components/ui/badge";
import type { Role } from "@/lib/types";

export const dynamic = "force-dynamic";

async function activate(formData: FormData) {
  "use server";
  const userId = String(formData.get("userId") ?? "");
  if (!userId) return;
  await setActiveUser(userId);
  const user = listDemoUsers().find((u) => u.id === userId);
  if (user) {
    bus.emit("creator.applied", { userId: user.id, role: user.role }, user.id);
    redirect(homeForRole(user.role));
  }
}

async function logout() {
  "use server";
  await signOut();
  redirect("/login");
}

const ROLE_ORDER: Role[] = ["creator", "operator", "sponsor", "investor"];
const ROLE_TONE: Record<Role, "creator" | "operator" | "sponsor" | "investor"> = {
  creator: "creator",
  operator: "operator",
  sponsor: "sponsor",
  investor: "investor",
  super_admin: "operator",
  vip_guest: "creator",
  vendor: "operator",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ as?: string }>;
}) {
  return <LoginInner searchParams={searchParams} />;
}

async function LoginInner({
  searchParams,
}: {
  searchParams: Promise<{ as?: string }>;
}) {
  const params = await searchParams;
  const preferred = params.as as Role | undefined;

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-10 border-r border-bg-border relative overflow-hidden">
        <div className="absolute inset-0 -z-10 [background:radial-gradient(80%_80%_at_0%_0%,rgba(230,255,61,0.10),transparent_60%)]" />
        <Logo />
        <div>
          <Badge tone="accent" className="mb-4">
            Multi-tenant control plane
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            Sign in as the persona you operate as today.
          </h1>
          <p className="text-ink-muted mt-3 max-w-md">
            In production we federate identity via Clerk / Auth0 (SSO, MFA,
            magic links, biometrics). For this demo, choose a seeded user to
            walk through their workspace.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-ink-soft">
            <span className="pill"><ShieldCheck className="size-3" /> RBAC</span>
            <span className="pill"><KeyRound className="size-3" /> Org-scoped</span>
            <span className="pill"><Fingerprint className="size-3" /> MFA-ready</span>
          </div>
        </div>
        <div className="text-xs text-ink-soft">
          © 5E47 Holdings · v0.1 · Edge-resident
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h2 className="text-2xl font-semibold">Choose a persona</h2>
          <p className="text-sm text-ink-muted mt-1">
            Each persona gets a scoped workspace, capabilities, and
            entitlements.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            {ROLE_ORDER.map((role) => {
              const candidates = listDemoUsers(role);
              if (candidates.length === 0) return null;
              const highlight = preferred === role;
              return (
                <div
                  key={role}
                  className={`surface p-4 ${highlight ? "border-accent/40 shadow-glow" : ""}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Badge tone={ROLE_TONE[role]}>{ROLE_LABEL[role]}</Badge>
                    <span className="text-[10px] text-ink-soft uppercase tracking-wider">
                      {candidates.length} seeded
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {candidates.map((u) => (
                      <form key={u.id} action={activate}>
                        <input type="hidden" name="userId" value={u.id} />
                        <button
                          type="submit"
                          className="w-full flex items-center justify-between gap-3 rounded-lg border border-bg-border bg-bg-elev hover:border-ink-soft px-3 py-2.5 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-gradient-to-br from-ink to-ink-soft text-bg flex items-center justify-center text-xs font-bold">
                              {u.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                            </div>
                            <div>
                              <div className="text-sm">{u.name}</div>
                              <div className="text-[11px] text-ink-soft">{u.email}</div>
                            </div>
                          </div>
                          <span className="text-xs text-accent">Continue →</span>
                        </button>
                      </form>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-ink-soft">
            <Link href="/" className="hover:text-ink">← Back to landing</Link>
            <form action={logout}>
              <button className="hover:text-ink">Clear session</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
