"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bot,
  Building2,
  CalendarClock,
  CreditCard,
  DollarSign,
  Film,
  Gauge,
  KeyRound,
  LineChart,
  Megaphone,
  MessagesSquare,
  Network,
  PieChart,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/types";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

type Group = { label: string; items: NavItem[] };

const NAV: Record<"creator" | "operator" | "sponsor" | "investor", Group[]> = {
  creator: [
    {
      label: "Workspace",
      items: [
        { href: "/creator", label: "Overview", icon: Gauge },
        { href: "/concierge", label: "Concierge · Sam", icon: MessagesSquare },
        { href: "/creator/bookings", label: "Bookings", icon: CalendarClock },
        { href: "/creator/projects", label: "Projects", icon: Film },
        { href: "/creator/access", label: "Access", icon: KeyRound },
        { href: "/creator/payments", label: "Payments", icon: CreditCard },
      ],
    },
  ],
  operator: [
    {
      label: "Operations",
      items: [
        { href: "/operator", label: "Command", icon: Gauge },
        { href: "/operator/residencies", label: "Residencies", icon: Users },
        { href: "/operator/studios", label: "Studios", icon: Building2 },
        { href: "/operator/access", label: "Access Control", icon: ShieldCheck },
        { href: "/operator/billing", label: "Billing", icon: DollarSign },
      ],
    },
    {
      label: "Intelligence",
      items: [
        { href: "/operator/agents", label: "Agents · Sam", icon: Bot },
        { href: "/operator/analytics", label: "Analytics", icon: BarChart3 },
        { href: "/operator/events", label: "Event Stream", icon: Activity },
      ],
    },
  ],
  sponsor: [
    {
      label: "Campaigns",
      items: [
        { href: "/sponsor", label: "Overview", icon: Gauge },
        { href: "/sponsor/campaigns", label: "Campaigns", icon: Megaphone },
        { href: "/sponsor/discovery", label: "Creator Discovery", icon: Sparkles },
        { href: "/sponsor/assets", label: "Assets", icon: Film },
        { href: "/sponsor/reports", label: "Reports", icon: ScrollText },
      ],
    },
  ],
  investor: [
    {
      label: "Portfolio",
      items: [
        { href: "/investor", label: "Overview", icon: Gauge },
        { href: "/investor/financials", label: "Financials", icon: LineChart },
        { href: "/investor/operations", label: "Operations", icon: PieChart },
        { href: "/investor/network", label: "Network", icon: Network },
      ],
    },
  ],
};

const ROLE_TONE: Record<Role, string> = {
  super_admin: "operator",
  operator: "operator",
  creator: "creator",
  sponsor: "sponsor",
  investor: "investor",
  vip_guest: "creator",
  vendor: "operator",
};

export function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const scope = (
    role === "super_admin" ? "operator" : role === "vip_guest" || role === "vendor" ? "creator" : role
  ) as keyof typeof NAV;
  const groups = NAV[scope];
  const tone = ROLE_TONE[role];

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col gap-6 border-r border-bg-border bg-bg-elev/40 p-5 sticky top-0 h-screen">
      <Logo />

      <div className={cn("surface-soft p-3 flex items-center gap-3")}>
        <div
          className={cn(
            "size-8 rounded-lg border flex items-center justify-center",
            tone === "creator" && "bg-role-creator/15 border-role-creator/40",
            tone === "operator" && "bg-role-operator/15 border-role-operator/40",
            tone === "sponsor" && "bg-role-sponsor/15 border-role-sponsor/40",
            tone === "investor" && "bg-role-investor/15 border-role-investor/40",
          )}
        >
          <Wrench
            className={cn(
              "size-4",
              tone === "creator" && "text-role-creator",
              tone === "operator" && "text-role-operator",
              tone === "sponsor" && "text-role-sponsor",
              tone === "investor" && "text-role-investor",
            )}
          />
        </div>
        <div className="text-xs">
          <div className="text-ink font-medium capitalize">{scope} workspace</div>
          <div className="text-ink-soft">Tenant: 5E47 NYC</div>
        </div>
      </div>

      <nav className="flex flex-col gap-5 overflow-y-auto pr-1 -mr-1">
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-1">
            <div className="label px-2 mb-1">{group.label}</div>
            {group.items.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== `/${scope}` && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-ink-muted transition-colors",
                    "hover:text-ink hover:bg-bg-elev",
                    active && "bg-bg-card text-ink shadow-[inset_0_0_0_1px_#23232b]",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 transition-colors",
                      active
                        ? tone === "creator"
                          ? "text-role-creator"
                          : tone === "operator"
                            ? "text-role-operator"
                            : tone === "sponsor"
                              ? "text-role-sponsor"
                              : "text-role-investor"
                        : "text-ink-soft group-hover:text-ink-muted",
                    )}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="mt-auto surface-soft p-3 text-xs text-ink-soft">
        <div className="flex items-center gap-2 text-ink">
          <Activity className="size-3.5 text-emerald-400" />
          All systems nominal
        </div>
        <div className="mt-1">Edge · NYC1 · 28ms</div>
      </div>
    </aside>
  );
}
